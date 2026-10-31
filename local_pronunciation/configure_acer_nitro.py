"""Select the safe Acer Nitro 5 / RTX 3050 pilot profile without touching API keys.

Run after installing OpenPronounce (enable_openpronounce.bat).
Does not run models or start a public endpoint.
"""
from __future__ import annotations
import os
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ENV = ROOT / ".env"
PROFILE = {
    "WHISPER_MODEL": "small.en",
    # RTX 3050 can accelerate Whisper only if CUDA/cuDNN are installed.
    # scoring.py falls back to CPU int8 if GPU initialization fails.
    "WHISPER_DEVICE": "auto",
    "WHISPER_COMPUTE_TYPE": "int8_float16",
    # OpenPronounce's two ~1.2GB checkpoints stay on CPU; 4GB VRAM isn't enough
    # to assume they fit reliably together with a Whisper instance.
    "OPENPRONOUNCE_DEVICE": "cpu",
    "OPENPRONOUNCE_ENABLED": "1",
    "OMP_NUM_THREADS": "3",
    "MKL_NUM_THREADS": "3",
    "TOKENIZERS_PARALLELISM": "false",
    "PAUSE_ON_BATTERY": "1",
    "CPU_BUSY_LIMIT": "85",
    "GPU_BUSY_LIMIT": "70",
}


def configure(path: Path = ENV) -> None:
    if not path.is_file():
        raise SystemExit("Chua co .env. Chay install_windows.bat truoc.")
    lines = path.read_text(encoding="utf-8-sig").splitlines()
    lines = [
        line for line in lines
        if not (
            "=" in line
            and line.split("=", 1)[0].strip() in PROFILE
            and not line.lstrip().startswith("#")
        )
    ]
    lines.extend(f"{name}={value}" for name, value in PROFILE.items())
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def hardware_summary() -> None:
    try:
        import psutil
        mem = psutil.virtual_memory()
        print(f"RAM: {mem.total / (1024 ** 3):.1f} GiB total, {mem.available / (1024 ** 3):.1f} GiB available")
    except ImportError:
        print("RAM: can cai psutil de kiem tra")
    gpu = shutil.which("nvidia-smi")
    if gpu:
        try:
            res = subprocess.run(
                [gpu, "--query-gpu=name,memory.total", "--format=csv,noheader"],
                capture_output=True, text=True, timeout=6, check=False,
            )
            print("GPU: " + (res.stdout.strip() if res.returncode == 0 else "driver not responding"))
        except Exception:
            print("GPU: khong the doc nvidia-smi")
    else:
        print("GPU: nvidia-smi chua co trong PATH; Whisper tu dong du phong CPU.")


if __name__ == "__main__":
    configure()
    print("Da ap dung profile Acer Nitro 5 RTX 3050; khong thay doi SUPABASE_SERVICE_ROLE_KEY.")
    hardware_summary()
    print("Whisper: auto RTX/CPU | OpenPronounce: CPU | 1 job/lan | pause when running on battery.")
    print("Chay test_acer_nitro.bat de kiem tra bang giong doc may.")
