# AFA TOURS — traduction automatique du catalogue

## Fonctionnement
- Le français reste la source.
- Le worker traduit les champs éditoriaux vers anglais, allemand, espagnol et portugais.
- Les prix, dates, identifiants, URLs, médias et coordonnées ne sont jamais traduits.
- Un champ déjà renseigné sans provenance Argos est considéré comme manuel et protégé.
- Une traduction manuelle existante n'est jamais remplacée. Une traduction Argos est recalculée seulement si le texte français source change.
- Les traductions sont stockées dans la colonne JSONB `translations`; aucune migration SQL n'est requise.

## Sécurité et activation
Le workflow est volontairement installé sur la branche de test. Il ne sera pas lancé en production par ce commit.
Pour un essai réel, ajouter dans les secrets GitHub du dépôt:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Ne jamais placer la clé service-role dans le code du site, dans un fichier versionné ou dans une conversation.
L'exécution manuelle est en mode dry-run par défaut. Le déclenchement planifié écrit dans Supabase seulement lorsque les secrets sont configurés et que le workflow est activé sur la branche concernée.

## Limites
GitHub Actions planifie une vérification toutes les 15 minutes, mais GitHub peut retarder l'exécution. Ce n'est pas une traduction instantanée à la sauvegarde.
Argos Translate est gratuit et open source, mais sa qualité n'est pas garantie au niveau de DeepL ou d'un traducteur humain. Les termes culturels, noms locaux et formulations commerciales doivent pouvoir être corrigés dans l'administration.
