import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const zh = new URL('../assets/lang/zh.json', import.meta.url).href;
const en = new URL('../assets/lang/en.json', import.meta.url).href;

const languages = {
  zh,
  en
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    lng: 'zh',
    debug: false,
    backend: {
      loadPath: (lng: 'zh' | 'en') => languages[lng]
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
