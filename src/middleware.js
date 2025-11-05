import { defineMiddleware } from 'astro:middleware';
import { defaultLang } from './i18n/ui.js';

export const onRequest = defineMiddleware((context, next) => {
  // Get language from URL or cookie or default
  const url = new URL(context.request.url);
  const [, lang] = url.pathname.split('/');
  
  // Check if URL has a valid language
  if (lang === 'en' || lang === 'fr') {
    context.locals.lang = lang;
  } else {
    // Try to get from cookie
    const cookieLang = context.cookies.get('lang')?.value;
    if (cookieLang === 'en' || cookieLang === 'fr') {
      context.locals.lang = cookieLang;
    } else {
      // Use default language
      context.locals.lang = defaultLang;
    }
  }
  
  return next();
});
