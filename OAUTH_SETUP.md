# Configuration OAuth Google - Guide détaillé

## 🔴 Erreur actuelle
`ClientResponseError 400: Failed to authenticate`
→ Cela signifie que les credentials OAuth ne correspondent pas

## ✅ Solution étape par étape

### 1. Google Cloud Console

1. Allez sur : https://console.cloud.google.com/
2. Créez un NOUVEAU projet (ou sélectionnez-en un)
3. Allez dans **APIs & Services** → **Credentials**
4. Cliquez sur **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Type d'application : **Application Web**
6. Nom : `TaVue Local Dev`

### 2. Configuration des URIs

**Origines JavaScript autorisées** :
```
http://127.0.0.1:8090
http://127.0.0.1:4322
```

**URI de redirection autorisés** :
```
http://127.0.0.1:8090/api/oauth2-redirect
```

### 3. Récupérer les credentials

Après avoir cliqué sur **Créer**, vous verrez :
- **ID client** (ressemble à : `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
- **Code secret du client** (ressemble à : `GOCSPX-abcdefghijk123456789`)

**COPIEZ-LES IMMÉDIATEMENT**

### 4. Configuration PocketBase

1. Ouvrez : http://127.0.0.1:8090/_/
2. Settings → Auth providers → Google
3. Activez Google (toggle)
4. Collez **Client ID**
5. Collez **Client secret**
6. Vérifiez que l'URL est : `http://127.0.0.1:8090/api/oauth2-redirect`
7. **Save**

### 5. Test

1. Videz le cache du navigateur (Ctrl+Shift+Delete)
2. Allez sur : http://127.0.0.1:4322/connexion
3. Cliquez sur "Continuer avec Google"
4. Sélectionnez votre compte Google

## 🔍 Débogage

Si l'erreur 400 persiste :

### Vérifier dans PocketBase logs
Ouvrez PocketBase admin → Logs
Cherchez les erreurs OAuth récentes

### Vérifier le token
Dans la console du navigateur (F12), tapez :
```javascript
import('http://127.0.0.1:4322/src/JS/pocketbase.js').then(m => console.log(m.pb.authStore))
```

### Désactiver/Réactiver
1. PocketBase Admin → Settings → Auth providers → Google
2. Désactivez Google
3. Save
4. Réactivez Google
5. Save

## 📞 Support

Si rien ne fonctionne, vérifiez :
- PocketBase est bien lancé sur le port 8090
- Pas de firewall bloquant
- Navigateur à jour
- Cookies autorisés pour 127.0.0.1
