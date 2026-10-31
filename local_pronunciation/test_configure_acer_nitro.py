"""Test Acer Nitro profile setup without modifying real credentials or device settings."""
from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from configure_acer_nitro import PROFILE, configure


class AcerProfileTest(unittest.TestCase):
    def test_config_preserves_service_secret_and_other_options(self):
        with tempfile.TemporaryDirectory(prefix="nitro-config-") as folder:
            env = Path(folder) / ".env"
            env.write_text(
                "SUPABASE_SERVICE_ROLE_KEY=very_private_test_secret\n"
                "WHISPER_DEVICE=cpu\n"
                "OPENPRONOUNCE_ENABLED=0\n"
                "CUSTOM_SETTING=keep_me\n",
                encoding="utf-8",
            )
            configure(env)
            saved = env.read_text(encoding="utf-8")
            self.assertIn("SUPABASE_SERVICE_ROLE_KEY=very_private_test_secret", saved)
            self.assertIn("CUSTOM_SETTING=keep_me", saved)
            for key, value in PROFILE.items():
                self.assertEqual(saved.count(f"{key}="), 1)
                self.assertIn(f"{key}={value}", saved)

    def test_config_is_idempotent(self):
        with tempfile.TemporaryDirectory(prefix="nitro-config-") as folder:
            env = Path(folder) / ".env"
            env.write_text("SUPABASE_SERVICE_ROLE_KEY=test\n", encoding="utf-8")
            configure(env)
            original = env.read_text(encoding="utf-8")
            configure(env)
            self.assertEqual(env.read_text(encoding="utf-8"), original)

    def test_missing_env_fails_closed(self):
        with tempfile.TemporaryDirectory(prefix="nitro-config-") as folder:
            with self.assertRaises(SystemExit):
                configure(Path(folder) / ".env")


if __name__ == "__main__":
    unittest.main()
