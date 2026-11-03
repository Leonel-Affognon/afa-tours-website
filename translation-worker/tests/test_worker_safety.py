import importlib.util
import pathlib
import sys
import types
import unittest
from unittest.mock import Mock

ROOT = pathlib.Path(__file__).resolve().parents[1]
worker_path = ROOT / "translation-worker" / "worker.py"

# Stub third-party imports so the safety tests run without downloading language models.
requests = types.ModuleType("requests")
requests.Session = Mock
sys.modules["requests"] = requests

argos = types.ModuleType("argostranslate")
package = types.ModuleType("argostranslate.package")
translate = types.ModuleType("argostranslate.translate")
package.update_package_index = Mock()
package.get_available_packages = Mock(return_value=[])
translate.get_installed_languages = Mock(return_value=[])
argos.package = package
argos.translate = translate
sys.modules["argostranslate"] = argos
sys.modules["argostranslate.package"] = package
sys.modules["argostranslate.translate"] = translate

spec = importlib.util.spec_from_file_location("translation_worker", worker_path)
worker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(worker)

class TranslationWorkerSafetyTests(unittest.TestCase):
    def test_digest_is_deterministic(self):
        self.assertEqual(worker.digest("Bonjour"), worker.digest("Bonjour"))
        self.assertNotEqual(worker.digest("Bonjour"), worker.digest("Bonsoir"))

    def test_supported_languages_and_fields_are_explicit(self):
        self.assertEqual(worker.LANGS, ("en", "de", "es", "pt"))
        self.assertNotIn("price_from", worker.FIELDS["tours"])
        self.assertNotIn("event_start_date", worker.FIELDS["tours"])
        self.assertNotIn("cover_image", worker.FIELDS["tours"])

    def test_manual_translation_without_worker_metadata_is_preserved(self):
        original = {"en": {"title": "My corrected title"}}
        meta = original.get("_meta", {}).get("languages", {}).get("en", {}).get("fields", {})
        self.assertEqual(meta.get("title", {}).get("origin"), None)
        self.assertEqual(original["en"]["title"], "My corrected title")

    def test_worker_edited_target_is_detectable_as_manual(self):
        edited = "A human corrected this"
        old_meta = {"origin": "argos", "target_hash": worker.digest("Machine translation")}
        self.assertNotEqual(old_meta["target_hash"], worker.digest(edited))

if __name__ == "__main__":
    unittest.main()
