from pathlib import Path
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / '.env')

SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://ywqbaksmmtvwbojcgsdd.supabase.co').rstrip('/')
SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY', '').strip()
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '').strip()
WHISPER_MODEL = os.getenv('WHISPER_MODEL', 'small.en').strip() or 'small.en'
WHISPER_DEVICE = os.getenv('WHISPER_DEVICE', 'auto').strip().lower()
WHISPER_COMPUTE_TYPE = os.getenv('WHISPER_COMPUTE_TYPE', 'int8_float16').strip()
AUTO_PASS_SCORE = max(0, min(100, int(os.getenv('AUTO_PASS_SCORE', '70'))))
MAX_AUDIO_BYTES = max(128 * 1024, int(os.getenv('MAX_AUDIO_BYTES', str(2 * 1024 * 1024))))
PAUSE_ON_BATTERY = os.getenv('PAUSE_ON_BATTERY', '1').lower() not in {'0', 'false', 'no'}
CPU_BUSY_LIMIT = max(20, min(100, int(os.getenv('CPU_BUSY_LIMIT', '85'))))
GPU_BUSY_LIMIT = max(20, min(100, int(os.getenv('GPU_BUSY_LIMIT', '70'))))
MODEL_IDLE_UNLOAD_SECONDS = max(120, int(os.getenv('MODEL_IDLE_UNLOAD_SECONDS', '900')))
JOB_RETENTION_SECONDS = max(300, int(os.getenv('JOB_RETENTION_SECONDS', '1800')))

DEFAULT_ORIGINS = [
    'https://lddenglish.page', 'https://www.lddenglish.page',
    'https://duong2711.github.io', 'http://127.0.0.1:3000', 'http://localhost:3000'
]
ALLOWED_ORIGINS = [x.strip() for x in os.getenv('ALLOWED_ORIGINS', ','.join(DEFAULT_ORIGINS)).split(',') if x.strip()]
QUEUE_DIR = BASE_DIR / 'queue'
QUEUE_DIR.mkdir(parents=True, exist_ok=True)
SUPPORTED_TYPES = {'ls1_qa', 'ls1_opener', 'ls2_shadow'}
