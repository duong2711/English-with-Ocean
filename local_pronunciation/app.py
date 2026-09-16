from __future__ import annotations
import asyncio, json, os, re, time, uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any
import psutil
from fastapi import FastAPI, File, Form, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from config import (ALLOWED_ORIGINS, AUTO_PASS_SCORE, MAX_AUDIO_BYTES, QUEUE_DIR,
                    SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPPORTED_TYPES, WHISPER_MODEL,
                    WHISPER_DEVICE, JOB_RETENTION_SECONDS)
from backend import persist_result, resolve_target, validate_user
from scoring import machine_available, model_status, score_audio, unload_if_idle

jobs: dict[str,dict[str,Any]]={}
q: asyncio.Queue[str]=asyncio.Queue()
MAX_ACTIVE_PER_USER=3
MAX_GLOBAL_QUEUE=100


def _low_priority():
    try:
        p=psutil.Process(os.getpid())
        p.nice(psutil.BELOW_NORMAL_PRIORITY_CLASS if os.name=='nt' and hasattr(psutil,'BELOW_NORMAL_PRIORITY_CLASS') else 10)
    except Exception: pass


def _meta(jid:str)->Path: return QUEUE_DIR/f'{jid}.json'
def _save(job): _meta(job['id']).write_text(json.dumps(job,ensure_ascii=False,indent=2),encoding='utf-8')


def _recover()->list[str]:
    out=[]
    for p in QUEUE_DIR.glob('*.json'):
        try:
            j=json.loads(p.read_text(encoding='utf-8')); jid=str(j.get('id') or '')
            if not jid: continue
            if j.get('status') in {'queued','processing','paused'} and Path(str(j.get('audio_path') or '')).exists():
                j['status']='queued'; jobs[jid]=j; _save(j); out.append(jid)
            else: jobs[jid]=j
        except Exception: pass
    return out


def _token(header:str|None)->str:
    v=(header or '').strip()
    if not v.lower().startswith('bearer '): raise HTTPException(401,'Thiếu token đăng nhập.')
    return v[7:].strip()


def _public(j):
    x={'job_id':j['id'],'status':j.get('status'),'created_at':j.get('created_at'),'updated_at':j.get('updated_at')}
    if j.get('status')=='done': x['result']=j.get('result')
    if j.get('status')=='error': x['error']=j.get('error') or 'Không chấm được bài.'
    if j.get('status')=='paused': x['reason']=j.get('reason')
    return x


def _active_for_user(uid:str)->int:
    return sum(1 for j in jobs.values() if str(j.get('user_id'))==uid and j.get('status') in {'queued','processing','paused'})


async def _worker():
    while True:
        jid=await q.get(); j=jobs.get(jid)
        if not j: q.task_done(); continue
        try:
            while True:
                ok,reason=machine_available()
                if ok: break
                j.update(status='paused',reason=reason,updated_at=time.time()); _save(j); await asyncio.sleep(10)
            j.update(status='processing',updated_at=time.time()); j.pop('reason',None); _save(j)
            result=await asyncio.to_thread(score_audio,j['audio_path'],j['target_text'])
            await asyncio.to_thread(persist_result,j,result)
            j.update(status='done',result=result,updated_at=time.time()); _save(j)
            Path(j['audio_path']).unlink(missing_ok=True)
        except Exception as exc:
            j.update(status='error',error=str(exc)[:1200],updated_at=time.time()); _save(j)
            print('[LDD scorer] Job failed:',jid,exc)
        finally: q.task_done()


async def _janitor():
    while True:
        await asyncio.sleep(60); unload_if_idle(); now=time.time()
        for jid,j in list(jobs.items()):
            if j.get('status') in {'done','error'} and now-float(j.get('updated_at') or now)>JOB_RETENTION_SECONDS:
                jobs.pop(jid,None); _meta(jid).unlink(missing_ok=True)
                try:
                    Path(str(j.get('audio_path') or '')).unlink(missing_ok=True)
                except Exception: pass


@asynccontextmanager
async def lifespan(_app:FastAPI):
    _low_priority(); recovered=_recover()
    worker=asyncio.create_task(_worker()); janitor=asyncio.create_task(_janitor())
    for jid in recovered: await q.put(jid)
    print(f'[LDD scorer] Ready; recovered {len(recovered)} job(s).')
    yield
    worker.cancel(); janitor.cancel(); unload_if_idle(force=True)


app=FastAPI(title='LDD Local Pronunciation Scorer',version='1.0',lifespan=lifespan)
app.add_middleware(CORSMiddleware,allow_origins=ALLOWED_ORIGINS,allow_credentials=False,
                   allow_methods=['GET','POST','OPTIONS'],allow_headers=['Authorization','Content-Type'])


@app.get('/health')
async def health():
    ok,reason=machine_available(); loaded,device=model_status()
    return {'ok':True,'configured':bool(SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY),
            'accepting':ok,'reason':reason,'queued':q.qsize(),'model':WHISPER_MODEL,
            'model_loaded':loaded,'device':device or ('cuda preferred' if WHISPER_DEVICE=='auto' else WHISPER_DEVICE),
            'pass_score':AUTO_PASS_SCORE}


@app.post('/v1/jobs')
async def create_job(audio:UploadFile=File(...),item_type:str=Form(...),item_key:str=Form(...),
                     item_label:str=Form(''),client_job_id:str=Form(''),authorization:str|None=Header(default=None)):
    uid=await validate_user(_token(authorization)); item_type=item_type.strip()
    if item_type not in SUPPORTED_TYPES: raise HTTPException(422,'Dạng bài này chưa hỗ trợ chấm tự động an toàn.')
    requested=(client_job_id or '').strip().lower()
    jid=requested if re.fullmatch(r'[a-f0-9]{32}',requested) else uuid.uuid4().hex
    existing=jobs.get(jid)
    if existing:
        if str(existing.get('user_id'))!=uid: raise HTTPException(409,'job_id đã được sử dụng.')
        return {**_public(existing),'position':max(1,q.qsize())}
    if _active_for_user(uid)>=MAX_ACTIVE_PER_USER:
        raise HTTPException(429,'Bạn đã có 3 bài đang chờ/chấm. Hãy đợi một bài hoàn tất.')
    if q.qsize()>=MAX_GLOBAL_QUEUE:
        raise HTTPException(503,'Hàng chờ máy chấm đang đầy. Vui lòng thử lại sau.')
    try: target,trusted_label=await asyncio.to_thread(resolve_target,item_type,str(item_key))
    except Exception as exc: raise HTTPException(422,str(exc)) from exc
    raw=await audio.read(MAX_AUDIO_BYTES+1)
    if len(raw)>MAX_AUDIO_BYTES: raise HTTPException(413,'File ghi âm vượt giới hạn 2MB.')
    if len(raw)<512: raise HTTPException(422,'File ghi âm quá ngắn hoặc rỗng.')
    ctype=(audio.content_type or 'audio/webm').lower()
    ext='.mp4' if 'mp4' in ctype or 'aac' in ctype else '.ogg' if 'ogg' in ctype else '.webm'
    path=QUEUE_DIR/f'{jid}{ext}'; path.write_bytes(raw); now=time.time()
    j={'id':jid,'user_id':uid,'item_type':item_type,'item_key':str(item_key)[:200],
       'item_label':str(trusted_label or item_label)[:300],'target_text':target[:1200],
       'audio_path':str(path),'status':'queued','created_at':now,'updated_at':now}
    jobs[jid]=j; _save(j); await q.put(jid)
    return {'job_id':jid,'status':'queued','position':max(1,q.qsize())}


@app.get('/v1/jobs/{job_id}')
async def get_job(job_id:str,authorization:str|None=Header(default=None)):
    uid=await validate_user(_token(authorization)); j=jobs.get(job_id)
    if not j: raise HTTPException(404,'Không tìm thấy job.')
    if str(j.get('user_id'))!=uid: raise HTTPException(403,'Bạn không có quyền xem job này.')
    return _public(j)
