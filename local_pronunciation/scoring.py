from __future__ import annotations
import gc, re, time
from typing import Any
import psutil
from config import (AUTO_PASS_SCORE, CPU_BUSY_LIMIT, MODEL_IDLE_UNLOAD_SECONDS,
                    PAUSE_ON_BATTERY, WHISPER_COMPUTE_TYPE, WHISPER_DEVICE, WHISPER_MODEL)

_model: Any = None
_model_device = ''
_model_last_used = 0.0


def machine_available() -> tuple[bool, str]:
    if PAUSE_ON_BATTERY:
        try:
            b = psutil.sensors_battery()
            if b is not None and not b.power_plugged:
                return False, 'Laptop đang chạy pin'
        except Exception:
            pass
    try:
        cpu = psutil.cpu_percent(interval=0.12)
        if cpu >= CPU_BUSY_LIMIT:
            return False, f'CPU đang bận {cpu:.0f}%'
    except Exception:
        pass
    return True, 'ok'


def _model_get():
    global _model, _model_device, _model_last_used
    if _model is not None:
        _model_last_used = time.time(); return _model
    from faster_whisper import WhisperModel
    device = 'cuda' if WHISPER_DEVICE == 'auto' else WHISPER_DEVICE
    try:
        _model = WhisperModel(WHISPER_MODEL, device=device, compute_type=WHISPER_COMPUTE_TYPE)
        _model_device = f'{device}/{WHISPER_COMPUTE_TYPE}'
    except Exception as exc:
        if device == 'cpu': raise
        print(f'[LDD scorer] CUDA chưa dùng được ({exc}); fallback CPU int8.')
        _model = WhisperModel(WHISPER_MODEL, device='cpu', compute_type='int8')
        _model_device = 'cpu/int8'
    _model_last_used = time.time()
    print(f'[LDD scorer] Loaded {WHISPER_MODEL} on {_model_device}')
    return _model


def unload_if_idle(force: bool = False) -> None:
    global _model, _model_device
    if _model is None: return
    if not force and time.time() - _model_last_used < MODEL_IDLE_UNLOAD_SECONDS: return
    _model = None; _model_device = ''; gc.collect()
    print('[LDD scorer] Model unloaded')


def model_status() -> tuple[bool, str]:
    return _model is not None, _model_device


def _words(text: str) -> list[str]:
    return re.findall(r"[a-z]+(?:'[a-z]+)?", (text or '').lower())


def _align(a: list[str], b: list[str]) -> dict[str, Any]:
    m, n = len(a), len(b)
    d = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): d[i][0] = i
    for j in range(n+1): d[0][j] = j
    for i in range(1,m+1):
        for j in range(1,n+1):
            d[i][j] = min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]!=b[j-1]))
    i,j=m,n; ops=[]
    while i or j:
        if i and j and d[i][j] == d[i-1][j-1] + (a[i-1]!=b[j-1]):
            ops.append(('match' if a[i-1]==b[j-1] else 'sub', a[i-1], b[j-1])); i-=1; j-=1
        elif i and d[i][j] == d[i-1][j]+1:
            ops.append(('del', a[i-1], None)); i-=1
        else:
            ops.append(('ins', None, b[j-1])); j-=1
    ops.reverse()
    attempted = sum(op in {'match','sub'} for op,_,_ in ops)
    return {
        'distance': d[m][n],
        'accuracy': round(max(0,100*(1-d[m][n]/max(1,max(m,n))))),
        'completeness': round(100*attempted/max(1,m)),
        'missing': [x for op,x,_ in ops if op=='del' and x],
        'extras': [x for op,_,x in ops if op=='ins' and x],
        'substitutions': [{'expected':x,'heard':y} for op,x,y in ops if op=='sub'],
    }


def _fluency(words: list[dict[str,Any]]) -> tuple[int, dict[str,Any]]:
    if len(words)<2: return 100, {'wpm':None,'long_pauses':0,'pause_seconds':0}
    duration=max(.1,float(words[-1]['end'])-float(words[0]['start']))
    wpm=len(words)*60/duration
    speed=100 if 85<=wpm<=175 else max(45,100-(85-wpm)*.8) if wpm<85 else max(45,100-(wpm-175)*.45)
    gaps=[max(0,float(c['start'])-float(p['end'])) for p,c in zip(words,words[1:])]
    long=[g for g in gaps if g>.8]
    penalty=min(35,len(long)*6+max(0,sum(long)-len(long)*.8)*8)
    return round(max(0,min(100,speed-penalty))), {'wpm':round(wpm,1),'long_pauses':len(long),'pause_seconds':round(sum(long),2)}


def score_audio(path: str, target: str) -> dict[str,Any]:
    global _model_last_used
    model=_model_get()
    segments,_=model.transcribe(path, language='en', beam_size=3, word_timestamps=True,
                                vad_filter=True, condition_on_previous_text=False, temperature=0.0)
    texts=[]; timed=[]
    for seg in segments:
        if (seg.text or '').strip(): texts.append(seg.text.strip())
        for w in seg.words or []:
            if (w.word or '').strip():
                timed.append({'word':w.word.strip(),'start':float(w.start or 0),'end':float(w.end or 0),
                              'probability':float(getattr(w,'probability',0) or 0)})
    _model_last_used=time.time()
    transcript=' '.join(texts).strip(); al=_align(_words(target),_words(transcript))
    probs=[w['probability'] for w in timed if w['probability']>0]
    confidence=round(100*sum(probs)/len(probs)) if probs else 0
    fluency,fmeta=_fluency(timed); accuracy=int(al['accuracy']); complete=int(al['completeness'])
    if len(_words(target))<=3: overall=round(.60*accuracy+.25*complete+.15*confidence)
    else: overall=round(.50*accuracy+.20*complete+.15*fluency+.15*confidence)
    overall=max(0,min(100,overall)); notes=[]
    if al['missing'][:6]: notes.append('Thiếu: '+', '.join(al['missing'][:6]))
    if al['substitutions'][:6]: notes.append('Nghe thành: '+', '.join(f"{x['expected']}→{x['heard']}" for x in al['substitutions'][:6]))
    if al['extras'][:6]: notes.append('Thừa: '+', '.join(al['extras'][:6]))
    if confidence<60: notes.append('Độ rõ thấp; hãy nói gần micro hơn')
    if fmeta['long_pauses']>=2: notes.append('Có nhiều khoảng dừng dài')
    feedback=f'🤖 Máy chấm local (beta): {overall}/100 · Khớp câu {accuracy} · Đủ nội dung {complete} · Trôi chảy {fluency} · Độ rõ {confidence}.'
    if notes: feedback+=' '+' · '.join(notes)+'.'
    feedback+=' Điểm beta này chưa phải chấm phoneme chuyên sâu.'
    return {'score':overall,'accuracy':accuracy,'completeness':complete,'fluency':fluency,
            'confidence':confidence,'transcript':transcript,'target_text':target,
            'pass':overall>=AUTO_PASS_SCORE,'threshold':AUTO_PASS_SCORE,'feedback':feedback[:1500],
            'details':{'model':WHISPER_MODEL,'device':_model_device,'alignment':al,'fluency':fmeta}}
