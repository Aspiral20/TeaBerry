import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ro, ru, en } from './translation'

/*
* Install all modules:
* npm i i18next i18next-http-backend i18next-browser-languagedetector react-i18next --save
*/

const resources = {
  ro: {
    translation: ro
  },
  ru: {
    translation: ru
  },
  en: {
    translation: en
  },
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ro',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
