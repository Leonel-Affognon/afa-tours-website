AFA TOURS INNOVANT — SITE WEB V1
================================

CONTENU
- index.html : pages et contenu du site
- styles.css : design responsive (ordinateur, tablette, téléphone)
- script.js : changement de langue, menu mobile et formulaire WhatsApp
- assets/images/afa-tours-logo.jpg : logo fourni

LANGUES
Le site propose cinq versions intégrées : français, anglais, allemand, espagnol et portugais.
La langue du navigateur est détectée au premier accès. Le visiteur peut ensuite choisir manuellement une langue. Son choix est conservé dans son navigateur.
Aucune API de traduction payante n'est utilisée.

RÉSERVATIONS
Le formulaire prépare un message WhatsApp et l'ouvre dans une nouvelle fenêtre. Il n'enregistre pas les demandes dans une base de données et n'envoie pas d'email automatiquement. Le visiteur doit confirmer l'envoi dans WhatsApp.
Le numéro principal utilisé pour le formulaire est +229 01 97 16 56 46. Les deux numéros et l'adresse email figurent dans la section contact.

REMPLACER LES PHOTOS
Les photos de démonstration sont actuellement chargées depuis Unsplash. Pour mettre vos propres photos :
1. Copiez vos photos dans assets/images/.
2. Ouvrez styles.css.
3. Recherchez les classes .hero, .image-porto, .image-adjarra, .image-benin, .experience-photo, .gallery-one, .gallery-two, .gallery-three et .gallery-four.
4. Remplacez les URL background-image par des chemins locaux, par exemple url('assets/images/porto-novo.jpg').
Le logo peut être remplacé en gardant le nom afa-tours-logo.jpg.

MISE EN LIGNE GRATUITE AVEC CLOUDFLARE PAGES
1. Créez un compte gratuit sur https://github.com/ et un compte gratuit sur https://dash.cloudflare.com/.
2. Sur GitHub, créez un nouveau dépôt (repository) nommé afa-tours-site.
3. Décompressez le ZIP sur votre ordinateur. Ajoutez tous les fichiers et dossiers du projet au dépôt GitHub.
4. Dans Cloudflare, ouvrez Workers & Pages > Create > Pages > Connect to Git.
5. Sélectionnez le dépôt afa-tours-site.
6. Pour un site HTML statique, laissez la commande de build vide et indiquez le répertoire de sortie : / (racine).
7. Lancez le déploiement. Cloudflare fournira une adresse en .pages.dev.
8. Pour utiliser afatours.com, achetez le domaine chez un registrar après avoir vérifié disponibilité, prix de renouvellement et frais éventuels. Ajoutez ensuite ce domaine dans Custom domains sur Cloudflare Pages et suivez les instructions DNS.

COÛTS ET LIMITES
Le site est conçu sans base de données, sans abonnement de traduction et sans service payant obligatoire. Le déploiement statique sur l'offre gratuite de Cloudflare Pages peut suffire pour cette première version. Le domaine personnalisé est payant et son prix dépend du registrar et du renouvellement.

À FAIRE AVANT PUBLICATION
- Remplacer les photos de démonstration par des photos AFA Tours autorisées.
- Vérifier les textes, les noms de circuits et les informations pratiques.
- Vérifier que les deux numéros WhatsApp sont bien actifs.
- Ajouter les liens des réseaux sociaux si souhaité.
- Tester le formulaire sur un téléphone avec WhatsApp installé.
