import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { es } from '../Internationalization/translation/ES';
import { en } from '../Internationalization/translation/EN';
import { uk } from '../Internationalization/translation/UK';

export const LANGUAGES = {
  EN: 'en',
  UK: 'uk',
  ES: 'es',
};

const resources = {
  [LANGUAGES.EN]: {
    translation: en,
  },
  [LANGUAGES.UK]: {
    translation: uk,
  },
  [LANGUAGES.ES]: {
    translation: es,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: LANGUAGES.EN,
    // returnObjects: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
