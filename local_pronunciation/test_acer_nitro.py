"""Run an entirely local, synthetic read-aloud benchmark on the Acer Nitro.

No Supabase key or Internet API call is required except initial public model
downloads and optional gTTS reference generation. Never uploads audio.
"""
from __future__ import annotations

import argparse
import importlib.util
import shutil
import subprocess
import tempfile
import time
from pathlib import Path

PASSAGE = (
    "Every morning, I practise English for a few minutes before going to school. "
    "I listen to short conversations and try to repeat the sentences clearly. "
    "When I make a mistake, I stop and read the sentence again. "
    "Learning a language takes patience, but a little practice every day makes me more confident. "
    "I enjoy learning new words because they help me explain my ideas to other people."
)


def check_dependencies() -> bool:
    ok = True
    for exe in ("ffmpeg", "espeak-ng"):
        present = bool(shutil.which(exe))
        print(f"{exe}: {'OK' if present else 'CHUA CO'}")
        ok &= present
    for pkg in ("faster_whisper", "psutil", "openpronounce", "torch"):
        present = importlib.util.find_spec(pkg) is not None
        print(f"{pkg}: {'OK' if present else 'CHUA CO'}")
        ok &= present
    try:
        import psutil
        mem = psutil.virtual_memory()
        print(f"RAM: {mem.total/1024**3:.1f} GiB total; {mem.available/1024**3:.1f} GiB available")
        if mem.available < 3_500_000_000:
            print("CANH BAO: Can it nhat 3.5 GB RAM trong truoc khi cham OpenPronounce.")
            ok = False
    except ImportError:
        pass
    print(f"O dia trong (thu muc may cham): {shutil.disk_usage(Path(__file__).parent).free/1024**3:.1f} GiB")
    return ok


def run_full() -> int:
    if not check_dependencies():
        print("CHUA DU DIEU KIEN. Cai phu thuoc/lam trong RAM roi thu lai.")
        return 2
    from scoring import score_audio, unload_if_idle
    from openpronounce_adapter import assess_reading
    with tempfile.TemporaryDirectory(prefix="ldd-nitro-check-") as tmp:
        wav = str(Path(tmp) / "synthetic_reading.wav")
        # Fully local, public-domain synthesizer voice; not a real learner's speech.
        proc = subprocess.run(
            ["espeak-ng", "-s", "128", "-w", wav, PASSAGE],
            capture_output=True, text=True, timeout=40,
        )
        if proc.returncode != 0:
            print("Khong tao duoc audio kiem thu:", proc.stderr[:300])
            return 3

        print("Dang thu Whisper voi 1 doan doc may...")
        start = time.perf_counter()
        try:
            whisper = score_audio(wav, PASSAGE, include_timing=True)
            timed = whisper.pop("_word_timestamps", [])
        except Exception as err:
            print("WHISPER LOI:", type(err).__name__, str(err)[:250])
            return 4
        finally:
            unload_if_idle(force=True)
        print(f"WHISPER: {(time.perf_counter()-start):.1f}s; {len(timed)} tu da can thoi gian.")
        if not timed:
            print("Whisper khong nhan duoc tu; khong the thu phan chinh sua tung am.")
            return 5

        print("Dang thu OpenPronounce (lan dau se tai 2 model nang)...")
        start = time.perf_counter()
        try:
            outcome = assess_reading(wav, PASSAGE, timed, enabled=True)
        except Exception as err:
            print("OPENPRONOUNCE LOI:", type(err).__name__, str(err)[:250])
            return 6
        elapsed = time.perf_counter()-start
        print("OPENPRONOUNCE:", outcome.get("status"), f"({elapsed:.1f}s)")
        print("THONG BAO:", outcome.get("message", ""))
        if outcome.get("status") != "scored":
            print("Khong co diem khi chua du can cu / RAM / model.")
            return 7
        print("DIEM THU NGHIEM:", outcome.get("score"), "/ 100")
        print("PHAN DUOC CHAM:", outcome.get("covered_words"), "/", outcome.get("total_words"), "tu")
        print("SO TU NGHI SAI:", len(outcome.get("errors", [])))
        print("LUU Y: giong may KHONG phan anh do chinh xac tren giong hoc sinh.")
        return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--full", action="store_true", help="Run local Whisper + OpenPronounce inference")
    args = parser.parse_args()
    if args.full:
        raise SystemExit(run_full())
    raise SystemExit(0 if check_dependencies() else 2)
