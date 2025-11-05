export const languages = {
  en: 'English',
  fr: 'Français',
};

export const defaultLang = 'fr';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.configurator': 'Configurator',
    'nav.gallery': 'My Gallery',
    'nav.cart': 'Cart',
    'nav.aiGenerator': 'AI Generator',
    'nav.svgGallery': 'SVG Gallery',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.presentation': 'Presentation',
    'nav.configure': 'Configure',
    'nav.new': 'New',
    'nav.myGlasses': 'Configure my glasses',
    
    // Footer
    'footer.slogan': 'Create your glasses, express yourself with style and originality',
    'footer.navigation': 'Navigation',
    'footer.about': 'About',
    'footer.ourStory': 'Our story',
    'footer.legal': 'Legal notice',
    'footer.terms': 'Terms of sale',
    'footer.followUs': 'Follow us',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    
    // Generator page
    'generator.title': 'AI SVG Generator',
    'generator.prompt': 'Enter your prompt',
    'generator.promptPlaceholder': 'Ex: Create a blue circle with a red border',
    'generator.generate': 'Generate',
    'generator.edit': 'Edit',
    'generator.save': 'Save',
    'generator.view': 'View',
    'generator.preview': 'Preview',
    'generator.code': 'SVG Code',
    'generator.saveName': 'Enter a name for the SVG:',
    'generator.saveSuccess': 'SVG saved successfully!',
    'generator.saveError': 'Error saving SVG',
    'generator.contentPlaceholder': 'SVG preview will appear here',
    'generator.codePlaceholder': '// SVG code will appear here',
    'generator.viewButton': 'View',
    'generator.generateButton': 'Generate',
    'generator.editButton': 'Edit',
    
    // Gallery page
    'gallery.title': 'AI Generated SVG Gallery',
    'gallery.empty': 'No SVG generated yet',
    'gallery.createFirst': 'Create your first SVG',
    'gallery.createdOn': 'Created on',
    'gallery.modify': 'Modify',
    'gallery.copyCode': 'Copy code',
    'gallery.copied': 'Copied!',
    
    // Edit page
    'edit.back': '← Back to gallery',
    'edit.preview': 'Preview',
    'edit.modifyTitle': 'Modify with AI',
    'edit.chatPrompt': 'Modification request',
    'edit.chatPlaceholder': 'Ex: Make the circle bigger and change color to red',
    'edit.modify': 'Modify',
    'edit.save': 'Save',
    'edit.code': 'SVG Code',
    'edit.copyCode': 'Copy code',
    'edit.saveSuccess': 'SVG saved successfully!',
    'edit.saveError': 'Error saving',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.configurator': 'Configurateur',
    'nav.gallery': 'Ma Galerie',
    'nav.cart': 'Panier',
    'nav.aiGenerator': 'Générateur IA',
    'nav.svgGallery': 'Galerie SVG',
    'nav.login': 'Connexion',
    'nav.register': 'Inscription',
    'nav.logout': 'Déconnexion',
    'nav.presentation': 'Présentation',
    'nav.configure': 'Configurer',
    'nav.new': 'Nouveau',
    'nav.myGlasses': 'Configurer mes lunettes',
    
    // Footer
    'footer.slogan': 'Créez vos lunettes, affirmez-vous avec style et originalité',
    'footer.navigation': 'Navigation',
    'footer.about': 'À propos',
    'footer.ourStory': 'Notre histoire',
    'footer.legal': 'Mentions légales',
    'footer.terms': 'CGV',
    'footer.followUs': 'Nous suivre',
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Politique de Confidentialité',
    
    // Generator page
    'generator.title': 'Générateur de SVG par IA',
    'generator.prompt': 'Entrez votre prompt',
    'generator.promptPlaceholder': 'Ex: Crée un cercle bleu avec un contour rouge',
    'generator.generate': 'Générer',
    'generator.edit': 'Modifier',
    'generator.save': 'Sauvegarder',
    'generator.view': 'Visualiser',
    'generator.preview': 'Aperçu',
    'generator.code': 'Code SVG',
    'generator.saveName': 'Entrez un nom pour le SVG :',
    'generator.saveSuccess': 'SVG sauvegardé avec succès !',
    'generator.saveError': 'Erreur lors de la sauvegarde',
    'generator.contentPlaceholder': 'L\'aperçu SVG apparaîtra ici',
    'generator.codePlaceholder': '// Le code SVG apparaîtra ici',
    'generator.viewButton': 'Visualiser',
    'generator.generateButton': 'Générer',
    'generator.editButton': 'Modifier',
    
    // Gallery page
    'gallery.title': 'Galerie de SVG générés par IA',
    'gallery.empty': 'Aucun SVG généré pour le moment',
    'gallery.createFirst': 'Créer votre premier SVG',
    'gallery.createdOn': 'Créé le',
    'gallery.modify': 'Modifier',
    'gallery.copyCode': 'Copier le code',
    'gallery.copied': 'Copié !',
    
    // Edit page
    'edit.back': '← Retour à la galerie',
    'edit.preview': 'Aperçu',
    'edit.modifyTitle': 'Modifier avec l\'IA',
    'edit.chatPrompt': 'Demande de modification',
    'edit.chatPlaceholder': 'Ex: Rends le cercle plus grand et change la couleur en rouge',
    'edit.modify': 'Modifier',
    'edit.save': 'Sauvegarder',
    'edit.code': 'Code SVG',
    'edit.copyCode': 'Copier le code',
    'edit.saveSuccess': 'SVG sauvegardé avec succès !',
    'edit.saveError': 'Erreur lors de la sauvegarde',
  },
};

export function useTranslations(lang = defaultLang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key] || key;
  }
}