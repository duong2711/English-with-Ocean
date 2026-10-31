"""Locate/install FFmpeg and eSpeak NG for LDD's Windows pronunciation lab.

Uses official WinGet package IDs; never downloads executables from arbitrary URLs.
Works around freshly-installed WinGet paths not being visible in an old terminal.
"""
from __future__ import annotations

import argparse
import os
from pathlib import Path
import shutil
import subprocess
import sys


def _user_home_env(name: str) -> Path | None:
    value = os.getenv(name, "").strip()
    return Path(value) if value else None


def _refresh_windows_path() -> None:
    """Get new user/machine PATH after WinGet changes it (no persistent changes)."""
    if os.name != "nt":
        return
    try:
        import winreg
        additions = []
        for hive, subkey in (
            (winreg.HKEY_LOCAL_MACHINE, r"SYSTEM\CurrentControlSet\Control\Session Manager\Environment"),
            (winreg.HKEY_CURRENT_USER, r"Environment"),
        ):
            try:
                with winreg.OpenKey(hive, subkey) as handle:
                    value, _ = winreg.QueryValueEx(handle, "Path")
                    additions.extend(os.path.expandvars(p.strip()) for p in value.split(";") if p.strip())
            except OSError:
                pass
        os.environ["PATH"] = os.pathsep.join(additions + [os.environ.get("PATH", "")])
    except OSError:
        pass


def _find_ffmpeg() -> Path | None:
    found = shutil.which("ffmpeg")
    if found:
        return Path(found)
    guesses = []
    local = _user_home_env("LOCALAPPDATA")
    program_data = _user_home_env("ProgramData")
    scoop = _user_home_env("SCOOP") or (Path.home() / "scoop")
    if local:
        guesses.append(local / "Microsoft" / "WinGet" / "Links" / "ffmpeg.exe")
        packages = local / "Microsoft" / "WinGet" / "Packages"
        if packages.exists():
            guesses.extend(packages.glob("Gyan.FFmpeg_*/*/bin/ffmpeg.exe"))
            guesses.extend(packages.glob("Gyan.FFmpeg_*/ffmpeg-*/bin/ffmpeg.exe"))
    if program_data:
        guesses.append(program_data / "chocolatey" / "bin" / "ffmpeg.exe")
    guesses.append(scoop / "shims" / "ffmpeg.exe")
    guesses.append(Path("C:/ffmpeg/bin/ffmpeg.exe"))
    return next((p for p in guesses if p.is_file()), None)


def _espeak_roots() -> list[Path]:
    dirs = []
    for env in ("ProgramFiles", "ProgramW6432", "ProgramFiles(x86)"):
        root = _user_home_env(env)
        if root:
            dirs += [root / "eSpeak NG", root / "eSpeak-NG"]
    dirs += [Path("C:/Program Files/eSpeak NG"), Path("C:/Program Files (x86)/eSpeak NG")]
    return list(dict.fromkeys(dirs))


def _find_espeak() -> Path | None:
    found = shutil.which("espeak-ng")
    if found:
        return Path(found)
    return next((p / "espeak-ng.exe" for p in _espeak_roots() if (p / "espeak-ng.exe").is_file()), None)


def setup_environment() -> dict[str, Path | None]:
    """Prepare PATH and phonemizer's espeak DLL path for this process only."""
    _refresh_windows_path()
    ffmpeg, espeak = _find_ffmpeg(), _find_espeak()
    additions = []
    for binary in (ffmpeg, espeak):
        if binary:
            additions.append(str(binary.parent))
    if additions:
        os.environ["PATH"] = os.pathsep.join(additions + [os.environ.get("PATH", "")])

    library = None
    for folder in ([espeak.parent] if espeak else []) + _espeak_roots():
        dll = folder / "libespeak-ng.dll"
        if dll.is_file():
            library = dll
            os.environ["PHONEMIZER_ESPEAK_LIBRARY"] = str(dll)
            data = folder / "espeak-ng-data"
            if data.is_dir():
                os.environ["PHONEMIZER_ESPEAK_DATA_PATH"] = str(data)
            break
    return {"ffmpeg": ffmpeg, "espeak-ng": espeak, "espeak_dll": library}


def _winget_install(package_id: str) -> None:
    if not shutil.which("winget"):
        print("[LDD] Khong tim thay winget. Cai 'App Installer' trong Microsoft Store, hoac cai thu cong tu trang chinh thuc.")
        return
    print(f"[LDD] Dang cai {package_id} tu WinGet...")
    cmd = [
        "winget", "install", "--exact", "--id", package_id, "--source", "winget",
        "--accept-package-agreements", "--accept-source-agreements",
    ]
    try:
        result = subprocess.run(cmd, timeout=900, check=False)
        if result.returncode:
            print(f"[LDD] WinGet tra ve ma {result.returncode} cho {package_id}.")
    except (subprocess.TimeoutExpired, OSError) as exc:
        print(f"[LDD] Khong hoan tat cai {package_id}: {type(exc).__name__}")


def ensure_audio_tools(install: bool = False) -> bool:
    result = setup_environment()
    if install:
        if not result["ffmpeg"]:
            _winget_install("Gyan.FFmpeg")
        result = setup_environment()
        if not result["espeak-ng"]:
            _winget_install("eSpeak-NG.eSpeak-NG")
        result = setup_environment()
    for name in ("ffmpeg", "espeak-ng"):
        print(f"[LDD] {name}: {result[name] or 'CHUA TIM THAY'}")
    if os.name == "nt":
        print(f"[LDD] espeak DLL: {result['espeak_dll'] or 'CHUA TIM THAY'}")
    ok = bool(result["ffmpeg"] and result["espeak-ng"])
    if os.name == "nt" and not result["espeak_dll"]:
        ok = False
    if not ok:
        print("[LDD] Thieu thu vien am thanh. Neu da cai, mo cua so CMD moi roi thu lai.")
        print("[LDD] Cai thu cong: winget install -e --id Gyan.FFmpeg")
        print("[LDD] Cai thu cong: winget install -e --id eSpeak-NG.eSpeak-NG")
    return ok


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--install", action="store_true", help="Install missing tools with official WinGet packages.")
    arguments = parser.parse_args()
    sys.exit(0 if ensure_audio_tools(arguments.install) else 2)
