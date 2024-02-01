import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhTranslation from './lang/zh.json';
import enTranslation from './lang/en.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    lng: localStorage.getItem('i18nextLng') || 'zh',
    debug: false,
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
