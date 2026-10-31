"""Switch on the teacher-only pronunciation pilot after dependency checks pass."""
from __future__ import annotations
import importlib.util
import os
import shutil
from pathlib import Path

folder = Path(__file__).resolve().parent
path = folder / '.env'
if not path.exists():
    raise SystemExit('Thiếu .env: chạy install_windows.bat trước.')
if not importlib.util.find_spec('openpronounce'):
    raise SystemExit('Chưa cài openpronounce: chạy enable_openpronounce.bat.')
if not shutil.which('ffmpeg'):
    raise SystemExit('Thiếu ffmpeg trong PATH. Cài ffmpeg trước khi bật.')
if not shutil.which('espeak-ng'):
    raise SystemExit('Thiếu espeak-ng trong PATH. Cài espeak-ng trước khi bật.')

# Prefer dependable CPU execution on an i3-10100 + GTX 1050 Ti / 8 GB RAM:
# GPU lacks room to host both large Wav2Vec2 models reliably.
os.environ.setdefault('OPENPRONOUNCE_DEVICE', 'cpu')
text = path.read_text(encoding='utf-8-sig')
new = []
found = False
for line in text.splitlines():
    if line.strip().startswith('OPENPRONOUNCE_ENABLED='):
        new.append('OPENPRONOUNCE_ENABLED=1')
        found = True
    else:
        new.append(line)
if not found:
    new.append('OPENPRONOUNCE_ENABLED=1')
# Keep Whisper on small, quantized CPU for the low-memory pilot.
# OpenPronounce uses CPU so its larger models do not compete for 4 GB VRAM.
profile = {
    'WHISPER_DEVICE': 'cpu',
    'WHISPER_COMPUTE_TYPE': 'int8',
    'OPENPRONOUNCE_DEVICE': 'cpu',
    'OMP_NUM_THREADS': '2',
    'MKL_NUM_THREADS': '2',
    'TOKENIZERS_PARALLELISM': 'false',
}
updated = []
for line in new:
    name = line.split('=', 1)[0].strip() if '=' in line else ''
    if name in profile and not line.lstrip().startswith('#'):
        continue
    updated.append(line)
new = updated + [f'{k}={v}' for k,v in profile.items()]
if not any(line.strip().startswith('PILOT_TEACHER_EMAILS=') for line in new):
    new.append('PILOT_TEACHER_EMAILS=lddbaiu@gmail.com')
path.write_text('\n'.join(new) + '\n', encoding='utf-8')
print('Đã bật thử nghiệm OpenPronounce. Khởi động lại start.bat.')
