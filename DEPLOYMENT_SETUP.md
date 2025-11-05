# 🚀 Guide de Configuration pour le Déploiement

## ⚠️ Action Requise : Ajouter le Secret GitHub

Pour que la génération IA fonctionne sur votre site en production, vous devez ajouter le token HuggingFace comme secret GitHub.

## 📝 Étapes à suivre

### 1. Obtenir votre token HuggingFace

Votre token actuel (depuis `.env`) :
```
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
```

### 2. Ajouter le secret dans GitHub

1. **Allez sur votre repository GitHub** :
   - https://github.com/R312-jbassil/sae301-2025-K3n7h1n

2. **Accédez aux Settings** :
   - Cliquez sur l'onglet `Settings` en haut

3. **Secrets and variables** :
   - Dans le menu de gauche, cliquez sur `Secrets and variables` → `Actions`

4. **Créer un nouveau secret** :
   - Cliquez sur `New repository secret`
   - **Name** : `PUBLIC_HF_TOKEN`
   - **Secret** : `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`
   - Cliquez sur `Add secret`

### 3. Vérifier les autres secrets

Assurez-vous que ces secrets existent également :
- ✅ `HOST` - L'adresse de votre VPS
- ✅ `USER` - Le nom d'utilisateur SSH
- ✅ `SSH_PRIVATE_KEY` - Votre clé SSH privée

## 🔄 Redéployer

Une fois le secret `PUBLIC_HF_TOKEN` ajouté :

1. Commitez et pushez vos changements :
   ```bash
   git add .
   git commit -m "feat: Add HuggingFace token support in deployment"
   git push
   ```

2. Le workflow GitHub Actions va :
   - ✅ Builder le projet avec la variable d'environnement
   - ✅ Créer un fichier `.env` sur le serveur
   - ✅ Redémarrer PM2 avec les bonnes variables

## 🧪 Tester après le déploiement

1. Allez sur : https://sae301.enzo-locatelli.fr/generateurIA
2. Entrez un prompt (ex: "Draw a red circle")
3. Cliquez sur "Générer"
4. Le SVG devrait apparaître ✨

## 🐛 Débogage

Si ça ne fonctionne toujours pas :

### Vérifier les logs sur le serveur

```bash
ssh -p 22036 your_user@your_host
cd /var/www/SAE301/server
cat .env  # Vérifier que PUBLIC_HF_TOKEN est présent
pm2 logs SAE301  # Voir les logs en temps réel
```

### Vérifier l'API directement

```bash
# Test depuis le serveur
curl -X POST http://localhost:8087/api/generateSVG \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Draw a red circle"}]}'
```

## 📋 Checklist de déploiement

- [ ] Secret `PUBLIC_HF_TOKEN` ajouté dans GitHub
- [ ] Secrets `HOST`, `USER`, `SSH_PRIVATE_KEY` présents
- [ ] Code commité et pushé
- [ ] GitHub Actions workflow terminé avec succès
- [ ] Fichier `.env` créé sur le serveur (`/var/www/SAE301/server/.env`)
- [ ] PM2 redémarré avec succès
- [ ] Test de l'API `/api/generateSVG` fonctionnel
- [ ] Interface web `/generateurIA` accessible et fonctionnelle

## 🎯 Structure finale sur le serveur

```
/var/www/SAE301/
├── server/
│   ├── entry.mjs          # Point d'entrée PM2
│   ├── .env               # Variables d'environnement (créé par le workflow)
│   ├── package.json
│   └── node_modules/
└── client/
    └── _astro/            # Assets statiques
```

## ⚡ Commandes PM2 utiles

```bash
pm2 list                   # Liste des processus
pm2 logs SAE301           # Voir les logs
pm2 restart SAE301        # Redémarrer
pm2 env 0                 # Voir les variables d'environnement
pm2 describe SAE301       # Détails du processus
```

## 🔐 Sécurité

⚠️ **Important** :
- Ne JAMAIS commiter le fichier `.env` dans Git
- Le token HuggingFace doit rester secret
- Utiliser uniquement les GitHub Secrets pour les données sensibles
- Le fichier `.env` est créé automatiquement sur le serveur par le workflow
