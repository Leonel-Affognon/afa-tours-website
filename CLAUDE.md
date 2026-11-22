# Site AFA TOURS : comment le modifier avec Claude

Le site public (`index.html`) est GÉNÉRÉ. Ne pas le modifier à la main.
- Sources : dossier `tools/` (`gen.js`, `prod.js`, `engine.js`, `extra*.js`, `en.json`).
- Reconstruire : copier `tools/` dans un dossier de travail, puis `node gen.js && node prod.js` ; `prod.js` écrit `index.html` (ajuster `ROOT` si besoin).
- Textes anglais : toute phrase française visible doit avoir sa traduction dans `tools/en.json`.
- Pages du site : `extra9.js` (4 pages : Voyager, S'inspirer, Pratique, AFA Tours + barre fixe).
- Admin : `admin.html`, `admin*.js` (modifiables directement). PDF : `afa-pdf.js` (+ `vendor/jspdf.umd.min.js`). Proposition client : `proposition.html`.
- Base : Supabase (projet AFA-TOURS-PRODUCTION). Contenu (circuits, prix, partenaires, blog) : se modifie dans l'admin, sans Claude.
- Après modification : tester, `git commit`, `git push origin main` (GitHub Pages publie en 1 à 2 minutes).
