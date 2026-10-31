"""Offline real-microphone pronunciation trial on Acer Nitro.

Binds only to 127.0.0.1:8766, does not use Supabase and never persists audio.
Run via test_live_acer_nitro.bat after setup_acer_nitro.bat.
"""
from __future__ import annotations

import asyncio
import gc
import os
import re
import tempfile
import threading
import time
import urllib.request
import webbrowser
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse

from windows_audio_tools import setup_environment

# Ensure FFmpeg, eSpeak NG and phonemizer's DLL can be found on Windows.
setup_environment()

from openpronounce_adapter import assess_reading
from scoring import score_audio, unload_if_idle

BASE = Path(__file__).resolve().parent
HTML = BASE / "live_test.html"
HOST = "127.0.0.1"
PORT = 8766
MAX_AUDIO_BYTES = 12 * 1024 * 1024
MAX_AUDIO_SECONDS = 180
lock = asyncio.Lock()
app = FastAPI(title="LDD English Acer local microphone test")


@app.middleware("http")
async def local_only(request: Request, call_next):
    # Bound to loopback and reject cross-site browser requests / DNS rebinding.
    allowed_hosts = {"127.0.0.1:8766", "localhost:8766"}
    if request.headers.get("host", "").lower() not in allowed_hosts:
        return JSONResponse({"error": "Invalid local host"}, status_code=403)
    origin = request.headers.get("origin")
    if origin and origin.lower() not in {"http://127.0.0.1:8766", "http://localhost:8766"}:
        return JSONResponse({"error": "Cross-origin blocked"}, status_code=403)
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    return response


@app.get("/", response_class=HTMLResponse)
async def home():
    return HTML.read_text(encoding="utf-8")


@app.get("/health")
async def health():
    import importlib.util
    import psutil
    v = psutil.virtual_memory()
    return {
        "ok": True,
        "mode": "offline_local_only",
        "has_openpronounce": importlib.util.find_spec("openpronounce") is not None,
        "available_ram_gb": round(v.available / 1024**3, 2),
        "busy": lock.locked(),
        "does_not_use_supabase": True,
    }


def analyze_audio(path: str, target: str):
    start = time.monotonic()
    result = score_audio(path, target, include_timing=True)
    timed = result.pop("_word_timestamps", [])
    whisper_device = (result.get("details") or {}).get("device", "")
    unload_if_idle(force=True)
    gc.collect()

    outcome = assess_reading(path, target, timed, enabled=True)
    result["phoneme_assessment"] = outcome
    result["asr_text_match_estimate"] = result.pop("score", None)
    result.pop("pass", None)
    result.pop("threshold", None)
    result["assessment_type"] = "private_acer_trial_no_database"
    result["whisper_device"] = whisper_device
    result["elapsed_seconds"] = round(time.monotonic() - start, 1)
    result["feedback"] = "Chỉ là chấm thử; không có điểm chính thức."
    return result


@app.post("/api/assess")
async def assess(
    audio: UploadFile = File(...),
    expected_text: str = Form(...),
):
    if lock.locked():
        raise HTTPException(429, "Máy đang chấm một bản ghi khác. Hãy thử lại.")
    text = re.sub(r"\s+", " ", expected_text or "").strip()
    words = re.findall(r"[a-z]+(?:'[a-z]+)?", text, flags=re.IGNORECASE)
    if not 20 <= len(words) <= 360 or len(text) > 2500:
        raise HTTPException(422, "Đoạn tiếng Anh phải có 20–360 từ.")
    if not re.fullmatch(r"[A-Za-z0-9\s,.;:!?()'\x22–—-]+", text):
        raise HTTPException(422, "Chỉ hỗ trợ đoạn văn tiếng Anh thông thường.")
    mime = (audio.content_type or "").lower()
    accepted = ("audio/webm", "audio/mp4", "audio/ogg", "audio/mpeg", "audio/wav", "audio/x-wav")
    if not mime.startswith(accepted):
        raise HTTPException(415, "Chỉ chấp nhận file WebM, MP4, OGG, MP3 hoặc WAV.")
    data = await audio.read(MAX_AUDIO_BYTES + 1)
    if len(data) > MAX_AUDIO_BYTES:
        raise HTTPException(413, "File ghi âm lớn hơn 12 MB.")
    if len(data) < 1024:
        raise HTTPException(422, "Bản ghi quá ngắn hoặc trống.")

    async with lock:
        suffix = (
            ".mp4" if "mp4" in mime else ".mp3" if "mpeg" in mime
            else ".wav" if "wav" in mime else ".ogg" if "ogg" in mime else ".webm"
        )
        with tempfile.TemporaryDirectory(prefix="ldd-acer-microphone-") as folder:
            path = Path(folder) / ("recording" + suffix)
            path.write_bytes(data)
            try:
                result = await asyncio.to_thread(analyze_audio, str(path), text)
            except Exception as exc:
                print("[LDD Acer speaking test] Analysis failed:", repr(exc))
                raise HTTPException(
                    500, "Máy chấm gặp lỗi khi phân tích. Xem cửa sổ CMD và thử lại."
                ) from exc
            finally:
                # TemporaryDirectory removes the recording automatically,
                # even when an inference exception occurs.
                pass
        return JSONResponse(result)


def _open_local_browser():
    url = f"http://{HOST}:{PORT}/"
    for _ in range(80):
        try:
            with urllib.request.urlopen(url, timeout=1) as response:
                if response.status == 200:
                    webbrowser.open(url)
                    return
        except Exception:
            time.sleep(0.25)


if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("LDD Acer Nitro: Thử nghiệm phát âm bằng micro - CHI CHẠY TRÊN LAPTOP")
    print(f"Trang thử nghiệm: http://{HOST}:{PORT}/")
    print("KHONG CAN SUPABASE KEY; khong gui audio ra website.")
    print("Bam Ctrl+C de tat. Lan dau model se tai tu Hugging Face.")
    print("=" * 60)
    threading.Thread(target=_open_local_browser, daemon=True).start()
    uvicorn.run(app, host=HOST, port=PORT, log_level="warning")
