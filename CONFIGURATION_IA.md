# Configuration de l'IA pour la génération de SVG

## ✅ Fichiers créés

### API Endpoints
1. **`src/pages/api/generateSVG.js`** - Génère un SVG à partir d'un prompt
2. **`src/pages/api/saveSVG.js`** - Sauvegarde un SVG dans PocketBase
3. **`src/pages/api/updateSVG.js`** - Met à jour un SVG existant

### Pages
4. **`src/pages/gallery/index.astro`** - Galerie des SVG générés
5. **`src/pages/gallery/[id].astro`** - Page d'édition d'un SVG avec chat IA

### Configuration
6. **`.env`** - Variables d'environnement

## 📋 Étapes de configuration

### 1. Configuration des variables d'environnement

Modifiez le fichier `.env` et ajoutez votre token HuggingFace :

```env
PUBLIC_HF_TOKEN=votre_token_huggingface
```

Pour obtenir un token HuggingFace :
1. Allez sur https://huggingface.co/settings/tokens
2. Créez un nouveau token (Read access suffit)
3. Copiez-le dans le fichier `.env`

### 2. Démarrage de PocketBase

```bash
cd pocketbase
./pocketbase serve
```

La collection `lunette_ia` existe déjà dans votre base de données avec les champs :
- `modele_ia` (text) - Nom du modèle SVG
- `code_svg` (text) - Code SVG généré
- `chat_history` (json) - Historique de conversation avec l'IA

### 3. Démarrage du serveur Astro

```bash
npm run dev
```

## 🎯 Fonctionnalités disponibles

### Page de génération (`/generateurIA`)
- ✅ Génération de SVG depuis un prompt texte
- ✅ Édition itérative avec historique de conversation
- ✅ Prévisualisation en temps réel
- ✅ Sauvegarde dans PocketBase

### Galerie (`/gallery`)
- ✅ Liste de tous les SVG générés
- ✅ Aperçu visuel
- ✅ Copie du code
- ✅ Accès à l'éditeur

### Éditeur (`/gallery/[id]`)
- ✅ Interface de chat pour modifier le SVG
- ✅ Historique des modifications
- ✅ Prévisualisation en temps réel
- ✅ Sauvegarde des modifications

## 🔧 Structure de la collection PocketBase

La collection `lunette_ia` existante est utilisée :

```
Collection: lunette_ia
├── modele_ia (text) - Nom du modèle SVG
├── code_svg (text) - Code SVG généré
└── chat_history (json) - Historique de conversation
```

## 📝 Exemple d'utilisation

1. Allez sur `/generateurIA`
2. Entrez un prompt : "Crée un cercle bleu avec un contour rouge"
3. Cliquez sur "Générer"
4. Vous pouvez éditer avec "Modifier" : "Rends le cercle plus grand"
5. Sauvegardez avec un nom
6. Retrouvez votre SVG dans `/gallery`
7. Cliquez sur "Modifier" pour continuer à l'éditer

## ⚠️ Notes importantes

### Authentification
Les API endpoints utilisent maintenant l'authentification par cookies. L'utilisateur doit être connecté pour :
- Sauvegarder un SVG
- Voir la galerie
- Modifier un SVG

Assurez-vous que les règles PocketBase de la collection `lunette_ia` sont configurées :
- Create rule : `@request.auth.id != ""`
- Update rule : `@request.auth.id != ""`
- View rule : `@request.auth.id != ""`
- Delete rule : `@request.auth.id != ""`

### Modèle IA
Le système utilise `meta-llama/Llama-3.1-8B-Instruct` via HuggingFace Router. 
Ce modèle est gratuit mais a des limitations de rate limiting.

Pour améliorer les performances, vous pouvez :
- Utiliser un modèle plus puissant (nécessite un abonnement HuggingFace Pro)
- Ajouter des exemples dans le prompt système
- Affiner les instructions pour le modèle

## 🐛 Debug

Si la génération ne fonctionne pas :
1. Vérifiez que PocketBase est lancé
2. Vérifiez que le token HuggingFace est valide
3. Ouvrez la console du navigateur pour voir les erreurs
4. Vérifiez les logs du serveur Astro

## 🔗 Routes ajoutées

- `/generateurIA` - Générateur principal
- `/gallery` - Liste des SVG
- `/gallery/[id]` - Éditeur d'un SVG
- `/api/generateSVG` - API de génération
- `/api/saveSVG` - API de sauvegarde
- `/api/updateSVG` - API de mise à jour
