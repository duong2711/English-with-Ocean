from __future__ import annotations
import os, queue, re, shutil, subprocess, sys, threading, time
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen
from dotenv import load_dotenv
from supabase import create_client

BASE=Path(__file__).resolve().parent
load_dotenv(BASE/'.env')
SUPABASE_URL=os.getenv('SUPABASE_URL','https://ywqbaksmmtvwbojcgsdd.supabase.co').rstrip('/')
SERVICE=os.getenv('SUPABASE_SERVICE_ROLE_KEY','').strip()
PORT=int(os.getenv('SCORER_PORT','8765'))
CONFIG_KEY='pronunciation_server_url'
STOP=False


def require_config():
    if not SERVICE or SERVICE.startswith('PASTE_'):
        print('\n[LDD] Chưa có SUPABASE_SERVICE_ROLE_KEY trong local_pronunciation/.env')
        print('[LDD] Mở .env, điền anon key + service_role key rồi chạy lại.\n')
        raise SystemExit(2)


def publish(url:str):
    c=create_client(SUPABASE_URL,SERVICE)
    c.table('ldd_runtime_config').upsert({
        'key':CONFIG_KEY,'value':url,
        'updated_at':datetime.now(timezone.utc).isoformat()
    }).execute()
    print('[LDD] Web scorer URL:',url or '(offline)')


def wait_local(timeout=45):
    deadline=time.time()+timeout
    while time.time()<deadline:
        try:
            with urlopen(f'http://127.0.0.1:{PORT}/health',timeout=2) as r:
                if r.status==200:return True
        except Exception:time.sleep(1)
    return False


def start_server():
    cmd=[sys.executable,'-m','uvicorn','app:app','--host','127.0.0.1','--port',str(PORT),'--log-level','warning']
    return subprocess.Popen(cmd,cwd=BASE)


def start_tunnel():
    exe=shutil.which('cloudflared')
    if not exe:raise RuntimeError('Không tìm thấy cloudflared. Chạy install_windows.bat trước.')
    flags=getattr(subprocess,'CREATE_NO_WINDOW',0)
    p=subprocess.Popen([exe,'tunnel','--no-autoupdate','--url',f'http://127.0.0.1:{PORT}'],
                       cwd=BASE,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,
                       bufsize=1,creationflags=flags)
    lines:queue.Queue[str]=queue.Queue()
    def reader():
        if not p.stdout:return
        for line in p.stdout:
            print('[tunnel]',line.rstrip());lines.put(line)
    threading.Thread(target=reader,daemon=True).start()
    deadline=time.time()+45
    pattern=re.compile(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com')
    while time.time()<deadline and p.poll() is None:
        try:line=lines.get(timeout=1)
        except queue.Empty:continue
        m=pattern.search(line)
        if m:return p,m.group(0)
    p.terminate();raise RuntimeError('Cloudflare Tunnel không tạo được URL sau 45 giây.')


def shutdown(server,tunnel=None):
    try:publish('')
    except Exception as exc:print('[LDD] Không xóa được runtime URL:',exc)
    for p in (tunnel,server):
        if p and p.poll() is None:
            try:p.terminate()
            except Exception:pass


def main():
    global STOP
    require_config();server=start_server();tunnel=None
    try:
        if not wait_local():raise RuntimeError('Local scorer không khởi động được ở port 8765.')
        print('[LDD] Local scorer đã sẵn sàng.')
        while not STOP and server.poll() is None:
            try:
                tunnel,url=start_tunnel();publish(url)
                while not STOP and server.poll() is None and tunnel.poll() is None:time.sleep(1)
                if STOP or server.poll() is not None:break
                print('[LDD] Tunnel bị ngắt; tạo tunnel mới sau 5 giây...')
                try:publish('')
                except Exception:pass
                time.sleep(5)
            except Exception as exc:
                print('[LDD]',exc)
                try:publish('')
                except Exception:pass
                if not STOP:time.sleep(8)
    except KeyboardInterrupt:
        STOP=True
    finally:
        shutdown(server,tunnel)


if __name__=='__main__':main()
