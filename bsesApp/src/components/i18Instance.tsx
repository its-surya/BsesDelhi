// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import 'intl-pluralrules'; // Import polyfill

const resources = {
  en: {
    translation: require('../../assets/locales/en.json')
  },
  hin: {
    translation: require('../../assets/locales/hin.json')
  }
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng);
};

export default i18n;
