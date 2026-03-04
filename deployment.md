# 🚀 Mettre votre App en Ligne (Automatique ou Manuel)

Pour obtenir un lien public et permettre l'installation de votre application, voici deux méthodes.

## Option A : Déploiement Automatique (Recommandé) ✨

J'ai créé un script qui fait tout le travail pour vous.

1.  **Générer un Token GitHub** :
    - Allez sur [github.com/settings/tokens](https://github.com/settings/tokens).
    - Cliquez sur **"Generate new token (classic)"**.
    - Donnez un nom (ex: "iPad Deploy") et cochez la case **"repo"**.
    - Cliquez sur **"Generate token"** et **copiez-le** (vous ne le verrez qu'une seule fois).
2.  **Lancer le script** :
    - Faites un clic droit sur le fichier `deploy_to_github.ps1` et choisissez **"Exécuter avec PowerShell"**.
    - Collez votre Token quand il vous est demandé.
3.  **C'est fini !** Votre lien sera affiché à la fin.

---

## Option B : Déploiement Manuel

## Étape 1 : Créer un Compte GitHub
Si vous n'en avez pas déjà un, créez un compte sur [github.com](https://github.com/).

## Étape 2 : Créer un Nouveau Repository
1. Cliquez sur le bouton **"+"** en haut à droite et choisissez **"New repository"**.
2. Nommez-le (par exemple : `ipad-setup`).
3. Laissez-le en **Public**.
4. Cliquez sur **"Create repository"**.

## Étape 3 : Envoyer vos Fichiers
Vous pouvez le faire directement via le navigateur :
1. Sur la page de votre nouveau repository, cliquez sur le lien **"uploading an existing file"**.
2. Glissez-déposez **tous les fichiers** de votre dossier `ipad-setup` :
   - `index.html`
   - `style.css`
   - `manifest.json`
   - `sw.js`
   - Le dossier `js` (avec `app.js` dedans)
3. Cliquez sur **"Commit changes"** en bas de la page.

## Étape 4 : Activer GitHub Pages
1. Allez dans l'onglet **"Settings"** de votre repository.
2. Dans le menu de gauche, cliquez sur **"Pages"**.
3. Sous **"Build and deployment"**, assurez-vous que la source est **"Deploy from a branch"**.
4. Sous **"Branch"**, sélectionnez `main` (ou `master`) et cliquez sur **"Save"**.

## Étape 5 : Votre Lien est Prêt !
Attendez environ 1 à 2 minutes. GitHub affichera un message en haut de la page :
> **Your site is live at https://[votre-nom].github.io/ipad-setup/**

### Comment Installer ?
- **Sur Android / Chrome PC** : Cliquez sur le bouton **"📥 Installer l'App"** qui apparaîtra dans la barre du haut.
- **Sur iPad / iPhone (Safari)** : Cliquez sur l'icône **Partager** (le carré avec une flèche vers le haut) et choisissez **"Sur l'écran d'accueil"**.

---
> [!TIP]
> Si vous préférez une méthode plus automatique (ligne de commande), je peux vous aider à configurer Git sur votre ordinateur.
