"""Optional OpenPronounce pilot for 1–3 minute read-aloud recordings.

Never used for official grades. It must be explicitly enabled on the local
teacher computer. Whisper timestamps provide approximate chunk boundaries;
unmatched chunks are skipped rather than falsely marking words as wrong.
"""
from __future__ import annotations

import re
import subprocess
import tempfile
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

MAX_CHUNK_WORDS = 25
MAX_CHUNKS = 14


def words(text: str) -> list[str]:
    return re.findall(r"[a-z]+(?:'[a-z]+)?", str(text or "").lower())


def plan_chunks(expected_text: str, timed: list[dict[str, Any]]) -> list[dict[str, Any]]:
    expected = words(expected_text)
    heard = [words(str(row.get("word") or "")) for row in timed]
    heard = [item[0] if item else "" for item in heard]
    if not expected or not timed:
        return []
    matcher = SequenceMatcher(a=expected, b=heard, autojunk=False)
    anchors = {}
    for block in matcher.get_matching_blocks():
        for offset in range(block.size):
            anchors[block.a + offset] = block.b + offset

    chunks = []
    for start in range(0, min(len(expected), MAX_CHUNK_WORDS * MAX_CHUNKS), MAX_CHUNK_WORDS):
        stop = min(len(expected), start + MAX_CHUNK_WORDS)
        indices = [anchors[i] for i in range(start, stop) if i in anchors]
        # Avoid misleading phoneme feedback on a completely different/missing passage.
        if len(indices) < max(3, int((stop - start) * 0.50)):
            continue
        first = timed[min(indices)]
        last = timed[max(indices)]
        begin = max(0.0, float(first.get("start") or 0) - 0.20)
        end = float(last.get("end") or 0) + 0.25
        if end - begin < 1.0 or end - begin > 27.0:
            continue
        chunks.append({
            "word_offset": start,
            "expected_words": expected[start:stop],
            "start": begin,
            "duration": end - begin,
        })
    return chunks


def assess_reading(audio_path: str, expected_text: str, timed: list[dict[str, Any]],
                   enabled: bool = False) -> dict[str, Any]:
    if not enabled:
        return {"status": "disabled", "message": "OpenPronounce chưa được bật trên máy chấm."}
    # Wav2Vec2 word + phoneme models are memory-heavy. On an 8 GB Windows
    # workstation defer rather than push the OS into swapping or OOM.
    try:
        import psutil
        free_bytes = psutil.virtual_memory().available
        if free_bytes < 3_500_000_000:
            return {
                "status": "insufficient_ram",
                "message": "RAM trống dưới 3.5 GB. Đóng ứng dụng khác hoặc nâng RAM 16 GB rồi thử lại.",
                "available_ram_gb": round(free_bytes / 1e9, 1),
            }
        import torch
        torch.set_num_threads(2)
    except ImportError:
        # If torch is missing, the import below reports the missing model.
        pass
    try:
        from openpronounce import load_audio, compare_audio_with_text
    except ImportError:
        return {"status": "not_installed", "message": "Máy chấm chưa cài OpenPronounce."}

    chunks = plan_chunks(expected_text, timed)
    total = len(words(expected_text))
    if not chunks:
        return {"status": "insufficient_alignment",
                "message": "Chưa đủ bằng chứng để chấm âm. Hãy đọc đúng đoạn mẫu và thử lại.",
                "covered_words": 0, "total_words": total}

    results = []
    issues = []
    with tempfile.TemporaryDirectory(prefix="ldd-openpronounce-") as folder:
        for chunk_index, chunk in enumerate(chunks):
            wav = str(Path(folder) / f"chunk-{chunk_index}.wav")
            command = [
                "ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error",
                "-ss", str(round(chunk["start"], 3)),
                "-i", audio_path, "-t", str(round(chunk["duration"], 3)),
                "-vn", "-ac", "1", "-ar", "16000", "-y", wav,
            ]
            run = subprocess.run(command, capture_output=True, text=True, timeout=75)
            if run.returncode != 0:
                issues.append("Không tách được một đoạn âm thanh.")
                continue
            try:
                reference = " ".join(chunk["expected_words"])
                raw = compare_audio_with_text(load_audio(wav), reference, lang="en")
                score = float(raw.get("score", 0))
                if not 0 <= score <= 100:
                    raise ValueError("Invalid OpenPronounce score")
                errors = []
                for item in (raw.get("differences") or {}).get("errors") or []:
                    position = item.get("position")
                    if not isinstance(position, int) or not 0 <= position < len(chunk["expected_words"]):
                        continue
                    # Limit transcript/phone details to keep both JSON and teacher UI small.
                    errors.append({
                        "position": chunk["word_offset"] + position,
                        "word": chunk["expected_words"][position],
                        "expected": item.get("expected", [])[:30],
                        "actual": item.get("actual", [])[:30],
                        "confidence": round(float(item.get("confidence") or 0), 3),
                        "phones": [
                            {
                                "expected": p.get("expected"),
                                "heard": p.get("heard"),
                                "confidence": p.get("confidence"),
                            }
                            for p in (item.get("phones") or [])[:16]
                        ],
                    })
                results.append({"score": round(score, 1),
                                "word_count": len(chunk["expected_words"]),
                                "word_offset": chunk["word_offset"],
                                "errors": errors})
            except Exception:
                # A failure in one chunk does not manufacture a zero score.
                issues.append("Một đoạn không phân tích được.")

    covered = sum(x["word_count"] for x in results)
    if not covered:
        return {"status": "error", "message": "OpenPronounce chưa phân tích được bản thu này.",
                "covered_words": 0, "total_words": total}

    weighted = sum(x["score"] * x["word_count"] for x in results) / covered
    errors = [e for x in results for e in x["errors"]]
    return {
        "status": "scored",
        "beta": True,
        "score": round(weighted, 1),
        "covered_words": covered,
        "total_words": total,
        "errors": errors[:90],
        "chunks": len(results),
        "issues": issues[:3],
        "message": "Điểm thử nghiệm trên phần đọc đủ căn cứ; không thay thế chấm của giáo viên.",
    }
