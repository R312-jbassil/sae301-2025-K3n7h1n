import pb from '../utils/pb.ts';

// Exporter pb pour compatibilité
export { pb };

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
    
    // Créer les enregistrements dans les collections intermédiaires
    if (lunetteData.materiauxIds?.monture) {
      await pb.collection('materiel_monture').create({
        id_lunette: record.id,
        id_materiau: lunetteData.materiauxIds.monture
      });
      console.log('✅ Matériau monture enregistré');
    }
    
    if (lunetteData.materiauxIds?.branches) {
      await pb.collection('materiel_branche').create({
        id_lunette: record.id,
        id_materiau: lunetteData.materiauxIds.branches
      });
      console.log('✅ Matériau branche enregistré');
    }
    
    if (lunetteData.materiauxIds?.verres) {
      await pb.collection('materiel_verre').create({
        id_lunette: record.id,
        id_materiau: lunetteData.materiauxIds.verres
      });
      console.log('✅ Matériau verre enregistré');
    }
    
    return record;
  } catch (error) {
    console.error('❌ Erreur de sauvegarde:', error);
    throw error;
  }
}

// Récupérer toutes les lunettes de l'utilisateur
export async function getUserLunettes() {
  try {
    // Vérifier que l'utilisateur est connecté
    if (!pb.authStore.model) {
      throw new Error('Vous devez être connecté pour voir vos lunettes');
    }
    
    const records = await pb.collection('lunette').getFullList({
      filter: `user = "${pb.authStore.model.id}"`,
      sort: '-created',
    });
    
    console.log('👓 Lunettes de l\'utilisateur récupérées:', records);
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

// Récupérer les matériaux pour les branches
export async function getMateriauxBranche() {
  try {
    const records = await pb.collection('materiel_branche').getFullList({
      sort: 'prix',
      expand: 'materiau',
    });
    console.log('🔧 Matériaux branches récupérés:', records);
    return records;
  } catch (error) {
    console.error('❌ Erreur de récupération des matériaux branches:', error);
    throw error;
  }
}

// Récupérer les matériaux pour les verres
export async function getMateriauxVerre() {
  try {
    const records = await pb.collection('materiel_verre').getFullList({
      sort: 'prix',
      expand: 'materiau',
    });
    console.log('👓 Matériaux verres récupérés:', records);
    return records;
  } catch (error) {
    console.error('❌ Erreur de récupération des matériaux verres:', error);
    throw error;
  }
}

// Récupérer les matériaux pour la monture
export async function getMateriauxMonture() {
  try {
    const records = await pb.collection('materiel_monture').getFullList({
      sort: 'prix',
      expand: 'materiau',
    });
    console.log('🔲 Matériaux monture récupérés:', records);
    return records;
  } catch (error) {
    console.error('❌ Erreur de récupération des matériaux monture:', error);
    throw error;
  }
}

// Ajouter une lunette au panier (créer une commande)
export async function addToCart(lunetteId) {
  try {
    console.log('🛒 Ajout au panier:', lunetteId);
    
    // Vérifier que l'utilisateur est connecté
    if (!pb.authStore.model) {
      throw new Error('Vous devez être connecté pour ajouter au panier');
    }
    
    const data = {
      id_utilisateur: pb.authStore.model.id,
      id_lunette: lunetteId
    };
    
    const record = await pb.collection('commande2').create(data);
    console.log('✅ Ajouté au panier:', record);
    return record;
  } catch (error) {
    console.error('❌ Erreur d\'ajout au panier:', error);
    throw error;
  }
}

// Récupérer le panier de l'utilisateur
export async function getCart() {
  try {
    if (!pb.authStore.model) {
      throw new Error('Vous devez être connecté');
    }
    
    const records = await pb.collection('commande2').getFullList({
      filter: `id_utilisateur = "${pb.authStore.model.id}"`,
      expand: 'id_lunette',
      sort: '-created',
    });
    
    console.log('🛒 Panier récupéré:', records);
    return records;
  } catch (error) {
    console.error('❌ Erreur de récupération du panier:', error);
    throw error;
  }
}

// Supprimer un article du panier
export async function removeFromCart(commandeId) {
  try {
    await pb.collection('commande2').delete(commandeId);
    console.log('🗑️ Retiré du panier:', commandeId);
  } catch (error) {
    console.error('❌ Erreur de suppression du panier:', error);
    throw error;
  }
}

// Récupérer les détails complets d'une lunette avec ses matériaux
export async function getLunetteDetails(lunetteId) {
  try {
    const lunette = await pb.collection('lunette').getOne(lunetteId);
    
    // Récupérer les matériaux associés
    const materiauxMonture = await pb.collection('materiel_monture').getFullList({
      filter: `id_lunette = "${lunetteId}"`,
      expand: 'id_materiau',
    });
    
    const materiauxBranche = await pb.collection('materiel_branche').getFullList({
      filter: `id_lunette = "${lunetteId}"`,
      expand: 'id_materiau',
    });
    
    const materiauxVerre = await pb.collection('materiel_verre').getFullList({
      filter: `id_lunette = "${lunetteId}"`,
      expand: 'id_materiau',
    });
    
    return {
      ...lunette,
      materiaux: {
        monture: materiauxMonture[0]?.expand?.id_materiau || null,
        branches: materiauxBranche[0]?.expand?.id_materiau || null,
        verres: materiauxVerre[0]?.expand?.id_materiau || null,
      }
    };
  } catch (error) {
    console.error('❌ Erreur de récupération des détails:', error);
    throw error;
  }
}
