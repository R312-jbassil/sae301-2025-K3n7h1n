import PocketBase from 'pocketbase';

// Initialiser PocketBase avec l'URL du serveur local
export const pb = new PocketBase('http://127.0.0.1:8090');

// Activer l'auto-annulation pour les requêtes en attente
pb.autoCancellation(false);

// Restaurer la session depuis le localStorage au chargement
if (typeof window !== 'undefined') {
  console.log('🔵 Initialisation PocketBase...');
  const storedAuth = localStorage.getItem('pocketbase_auth');
  
  if (storedAuth) {
    console.log('🔵 Session trouvée dans localStorage');
    try {
      const authData = JSON.parse(storedAuth);
      
      // Vérifier que les données sont valides
      if (authData.token && authData.model) {
        pb.authStore.save(authData.token, authData.model);
        console.log('✅ Session restaurée:', authData.model);
        
        // Vérifier la validité du token en faisant une requête test
        pb.collection('users').authRefresh().catch(() => {
          console.log('⚠️ Token expiré, nettoyage de la session');
          pb.authStore.clear();
          localStorage.removeItem('pocketbase_auth');
        });
      } else {
        console.log('⚠️ Session corrompue (données manquantes), nettoyage');
        localStorage.removeItem('pocketbase_auth');
      }
    } catch (e) {
      console.error('❌ Erreur de restauration de session:', e);
      localStorage.removeItem('pocketbase_auth');
      pb.authStore.clear();
    }
  } else {
    console.log('⚠️ Aucune session trouvée dans localStorage');
  }

  // Sauvegarder automatiquement les changements d'auth dans le localStorage
  pb.authStore.onChange((token, model) => {
    console.log('🔄 Changement d\'auth détecté:', { token: token ? 'présent' : 'absent', model });
    if (token && model) {
      localStorage.setItem('pocketbase_auth', JSON.stringify({ token, model }));
      console.log('💾 Session sauvegardée dans localStorage');
    } else {
      localStorage.removeItem('pocketbase_auth');
      console.log('🗑️ Session supprimée du localStorage');
    }
  });
}

// Fonction pour vérifier si l'utilisateur est connecté
export function isAuthenticated() {
  // Vérifier à la fois que le token est valide ET que l'utilisateur existe
  return pb.authStore.isValid && pb.authStore.model !== null;
}

// Fonction pour obtenir l'utilisateur actuel
export function getCurrentUser() {
  return pb.authStore.model;
}

// Fonction pour se déconnecter
export function logout() {
  pb.authStore.clear();
  window.location.href = '/';
}

// Connexion classique
export async function login(email, password) {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    
    // Vérifier si l'email est vérifié
    if (authData.record.verified === false) {
      throw new Error('Veuillez vérifier votre email avant de continuer.');
    }
    
    return authData;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
}

// Inscription
export async function register(email, password, passwordConfirm, name) {
  try {
    const data = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      name: name,
      emailVisibility: true,
    };
    
    const record = await pb.collection('users').create(data);
    
    // Envoyer l'email de vérification
    await pb.collection('users').requestVerification(email);
    
    return record;
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    throw error;
  }
}

// Connexion avec Google OAuth
export async function loginWithGoogle() {
  return new Promise((resolve, reject) => {
    console.log('🔵 Démarrage de l\'authentification Google...');
    console.log('🔵 PocketBase URL:', pb.baseUrl);
    
    try {
      // Ouvrir la popup manuellement et attendre la fin de l'auth
      pb.collection('users').authWithOAuth2({ 
        provider: 'google',
        createData: {
          emailVisibility: true,
        }
      })
      .then((authData) => {
        console.log('✅ Authentification Google réussie:', authData);
        console.log('✅ Utilisateur:', authData.record);
        console.log('✅ Token:', authData.token ? 'Présent' : 'Absent');
        resolve(authData);
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion Google:', error);
        console.error('❌ Détails de l\'erreur:', {
          status: error.status,
          message: error.message,
          data: error.data,
          response: error.response,
          isAbort: error.isAbort,
          originalError: error.originalError
        });
        console.error('❌ Objet complet:', JSON.stringify(error, null, 2));
        
        // Si l'utilisateur ferme la popup, c'est considéré comme une annulation
        if (error.message && error.message.includes('popup')) {
          reject(new Error('Connexion Google annulée'));
        } else {
          reject(error);
        }
      });
    } catch (error) {
      console.error('❌ Erreur de connexion Google (catch):', error);
      reject(error);
    }
  });
}

// Demander la réinitialisation du mot de passe
export async function requestPasswordReset(email) {
  try {
    await pb.collection('users').requestPasswordReset(email);
  } catch (error) {
    console.error('Erreur de réinitialisation:', error);
    throw error;
  }
}

// Sauvegarder une configuration de lunettes
export async function saveLunette(lunetteData) {
  try {
    console.log('💾 Sauvegarde de la lunette:', lunetteData);
    
    // Vérifier que l'utilisateur est connecté
    if (!pb.authStore.model) {
      throw new Error('Vous devez être connecté pour sauvegarder une lunette');
    }
    
    const data = {
      nom_modele: lunetteData.signature,
      largeur_pont_mm: lunetteData.largeurPont || null,
      largeur_verre_mm: lunetteData.largeurVerre || null,
      hauteur_verre_mm: lunetteData.hauteurVerre || null,
      longueur_branche_mm: lunetteData.longueurBranche || null,
      taille_monture: lunetteData.size || null,
      couleur_monture_hex: lunetteData.colors.monture || '#000000',
      couleur_branche_hex: lunetteData.colors.branches || '#000000',
      couleur_verre_hex: lunetteData.colors.verres || '#000000',
      prix: lunetteData.prix || 0,
      user: pb.authStore.model.id // Lier à l'utilisateur connecté
    };
    
    const record = await pb.collection('lunette').create(data);
    console.log('✅ Lunette sauvegardée:', record);
    return record;
  } catch (error) {
    console.error('❌ Erreur de sauvegarde:', error);
    throw error;
  }
}

// Récupérer toutes les lunettes de l'utilisateur
export async function getUserLunettes() {
  try {
    const records = await pb.collection('lunette').getFullList({
      sort: '-created',
    });
    return records;
  } catch (error) {
    console.error('Erreur de récupération des lunettes:', error);
    throw error;
  }
}

// Supprimer une lunette
export async function deleteLunette(id) {
  try {
    await pb.collection('lunette').delete(id);
    console.log('🗑️ Lunette supprimée:', id);
  } catch (error) {
    console.error('Erreur de suppression:', error);
    throw error;
  }
}

// Récupérer tous les matériaux
export async function getMateriaux() {
  try {
    const records = await pb.collection('materiau').getFullList({
      sort: 'prix',
    });
    console.log('📦 Matériaux récupérés:', records);
    return records;
  } catch (error) {
    console.error('❌ Erreur de récupération des matériaux:', error);
    throw error;
  }
}
