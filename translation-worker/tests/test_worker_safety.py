import importlib.util
import pathlib
import sys
import types
import unittest
from unittest.mock import Mock

ROOT = pathlib.Path(__file__).resolve().parents[2]
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
    def test_beninese_proper_names_are_protected_and_restored(self):
        source = "Découvrez Vodun Days à Ganvie et la Bouche du Roy avec AFA TOURS."
        protected, replacements = worker.protect_terms(source)
        self.assertNotIn("Vodun Days", protected)
        self.assertNotIn("Ganvie", protected)
        self.assertIn("ZZZAFATERM", protected)
        restored = worker.restore_terms(protected, replacements)
        self.assertIn("Vodun Days", restored)
        self.assertIn("Ganvié", restored)
        self.assertIn("Bouche du Roy", restored)
        self.assertIn("AFA TOURS", restored)

    def test_tourism_glossary_normalizes_common_errors(self):
        self.assertEqual(worker.normalize_translation("Vodun Dias em Ganvia", "pt"), "Vodun Days em Ganvié")
        self.assertEqual(worker.normalize_translation("catering y canasta", "es"), "servicio de comidas y cestería")
        self.assertEqual(worker.normalize_translation("Catering in Punjari", "de"), "Verpflegung in Pendjari")

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


    def test_merge_preserves_manual_existing_translation(self):
        latest = {"en": {"title": "Human title"}}
        proposed = {"en": {"title": "Argos title"}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest("Argos title")}}}}}}
        merged = worker.merge_translations(latest, proposed, "tours")
        self.assertEqual(merged["en"]["title"], "Human title")

    def test_merge_updates_argos_owned_translation(self):
        old = "Old machine translation"
        new = "New machine translation"
        latest = {"en": {"title": old}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest(old)}}}}}}
        proposed = {"en": {"title": new}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest(new)}}}}}}
        merged = worker.merge_translations(latest, proposed, "tours")
        self.assertEqual(merged["en"]["title"], new)

    def test_manual_blank_translation_is_not_regenerated(self):
        translations = {"en": {"title": ""}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "manual"}}}}}}
        proposed = {"en": {"title": "Generated title"}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest("Generated title")}}}}}}
        merged = worker.merge_translations(translations, proposed, "tours")
        self.assertEqual(merged["en"]["title"], "")
        self.assertEqual(merged["_meta"]["languages"]["en"]["fields"]["title"]["origin"], "manual")

    def test_merge_propagates_manual_blank_over_previous_argos_value(self):
        old = "Old generated title"
        latest = {"en": {"title": old}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest(old)}}}}}}
        proposed = {"en": {"title": ""}, "_meta": {"languages": {"en": {"fields": {"title": {"origin": "manual"}}}}}}
        merged = worker.merge_translations(latest, proposed, "tours")
        self.assertEqual(merged["en"]["title"], "")
        self.assertEqual(merged["_meta"]["languages"]["en"]["fields"]["title"]["origin"], "manual")

    def test_merge_detects_human_edit_of_argos_value(self):
        latest = {"en": {"title": "Human correction"},"_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest("Original Argos")}}}}}}
        proposed = {"en": {"title": "New Argos"},"_meta": {"languages": {"en": {"fields": {"title": {"origin": "argos", "target_hash": worker.digest("New Argos")}}}}}}
        merged = worker.merge_translations(latest, proposed, "tours")
        self.assertEqual(merged["en"]["title"], "Human correction")
        self.assertEqual(merged["_meta"]["languages"]["en"]["fields"]["title"]["origin"], "manual")

if __name__ == "__main__":
    unittest.main()
