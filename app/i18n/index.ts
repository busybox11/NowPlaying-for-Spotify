import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import * as locales from "./locales/_index";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: Object.fromEntries(
      // Set a namespace for each locale
      Object.entries(locales).map(([key, value]) => [
        key,
        { translation: value },
      ])
    ),
    fallbackLng: {
      default: ["en"],
    },

    debug: true,

    supportedLngs: Object.keys(locales),

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
