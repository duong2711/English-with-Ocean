"""Fast safety tests for long-read segmentation; no AI model required."""
from __future__ import annotations
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from openpronounce_adapter import plan_chunks, assess_reading, words


class PlanChunksTest(unittest.TestCase):
    def test_normalizes_apostrophe(self):
        self.assertEqual(words("Don't stop. We are here!"), ["don't", "stop", "we", "are", "here"])

    def test_matching_passage_is_segmented(self):
        expected = " ".join(["apple", "banana", "teacher", "school", "english"] * 12)
        timed = [{"word": w, "start": i * .45, "end": i * .45 + .4}
                 for i, w in enumerate(words(expected))]
        chunks = plan_chunks(expected, timed)
        self.assertEqual(len(chunks), 3)
        self.assertEqual(chunks[0]["word_offset"], 0)
        self.assertEqual(chunks[1]["word_offset"], 25)
        self.assertEqual(chunks[2]["word_offset"], 50)
        self.assertTrue(all(c["duration"] < 27 for c in chunks))

    def test_wrong_reading_is_not_assessed(self):
        expected = " ".join(["english", "teacher", "learning", "practice"] * 15)
        timed = [{"word": "zebra", "start": i * .45, "end": i * .45 + .4} for i in range(60)]
        self.assertEqual(plan_chunks(expected, timed), [])

    def test_disabled_cannot_return_a_fake_score(self):
        out = assess_reading("does-not-exist.wav", "English practice", [], enabled=False)
        self.assertEqual(out["status"], "disabled")
        self.assertNotIn("score", out)


if __name__ == "__main__":
    unittest.main()
