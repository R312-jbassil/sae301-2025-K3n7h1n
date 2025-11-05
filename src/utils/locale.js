import { defaultLang } from '../i18n/ui.js';

export function getLocale(locals) {
  return locals?.lang || defaultLang;
}

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'fr') return lang;
  return defaultLang;
}
