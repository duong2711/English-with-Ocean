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

import scoring
from openpronounce_adapter import assess_reading

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


def analyze_audio(path: str, target: str, fast: bool = True):
    """Keep model costs measurable and distinguish ASR from phoneme results."""
    started = time.perf_counter()
    stage = "WHISPER"
    try:
        print("[LDD TEST] WHISPER: bat dau nhan dien...")
        start_asr = time.perf_counter()
        try:
            result = scoring.score_audio(path, target, include_timing=True)
        except (RuntimeError, OSError) as first_error:
            # CTranslate2 may initialize on CUDA successfully but fail during inference
            # when cuBLAS/cuDNN runtime DLLs are missing on Windows RTX 3050.
            reason = str(first_error).lower()
            is_cuda_runtime_failure = any(part in reason for part in (
                "cublas", "cudnn", "cudart", "cuda", "cufft", "cublas64_12.dll",
            ))
            if not is_cuda_runtime_failure or scoring.WHISPER_DEVICE == "cpu":
                raise
            print("[LDD TEST] CUDA runtime chua du; fallback CPU int8:", str(first_error)[:180])
            scoring.unload_if_idle(force=True)
            scoring.WHISPER_DEVICE = "cpu"
            scoring.WHISPER_COMPUTE_TYPE = "int8"
            result = scoring.score_audio(path, target, include_timing=True)
        asr_seconds = round(time.perf_counter() - start_asr, 2)
        timed = result.pop("_word_timestamps", [])
        whisper_device = (result.get("details") or {}).get("device", "")
        print(f"[LDD TEST] WHISPER OK: {asr_seconds}s; device={whisper_device}; words={len(timed)}")
    except Exception as error:
        raise RuntimeError(f"WHISPER: {type(error).__name__}: {str(error)[:280]}") from error
    finally:
        # Free memory before loading the large phone recognizer (16GB RAM laptop).
        scoring.unload_if_idle(force=True)
        gc.collect()

    stage = "PHONE_ONLY" if fast else "OPENPRONOUNCE_FULL"
    try:
        print(f"[LDD TEST] {stage}: bat dau...")
        start_phone = time.perf_counter()
        outcome = assess_reading(path, target, timed, enabled=True, fast=fast)
        phone_seconds = round(time.perf_counter() - start_phone, 2)
        print(f"[LDD TEST] {stage}: {outcome.get('status')} sau {phone_seconds}s")
    except Exception as error:
        raise RuntimeError(f"{stage}: {type(error).__name__}: {str(error)[:280]}") from error

    result["phoneme_assessment"] = outcome
    result["asr_text_match_estimate"] = result.pop("score", None)
    result.pop("pass", None)
    result.pop("threshold", None)
    result["assessment_type"] = "private_acer_trial_no_database"
    result["whisper_device"] = whisper_device
    result["elapsed_seconds"] = round(time.perf_counter() - started, 2)
    result["timings"] = {"whisper_seconds": asr_seconds, "phoneme_seconds": phone_seconds}
    result["feedback"] = "Chỉ là chấm thử; không có điểm chính thức."
    return result


@app.post("/api/assess")
async def assess(
    audio: UploadFile = File(...),
    expected_text: str = Form(...),
    mode: str = Form("fast"),
):
    if mode not in {"fast", "full"}:
        raise HTTPException(422, "Chế độ chấm không hợp lệ.")
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
                result = await asyncio.to_thread(analyze_audio, str(path), text, mode == "fast")
            except Exception as exc:
                import traceback
                traceback.print_exc()
                print("[LDD Acer speaking test] Analysis failed:", repr(exc))
                # Error text is local-loopback only; never expose secrets or file paths.
                safe_error = str(exc).replace(str(BASE), "[app]").replace(str(Path.home()), "[home]")
                raise HTTPException(500, safe_error[:350]) from exc
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
