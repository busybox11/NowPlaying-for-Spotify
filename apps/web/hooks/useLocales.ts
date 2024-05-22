import { useLocalStorage } from "usehooks-ts";

const locales = [
  {
    code: "en",
    name: "English",
    flag: "/flags/uk.svg",
  },
  {
    code: "fr",
    name: "Français",
    flag: "/flags/fr.svg",
  },
  {
    code: "it",
    name: "Italiano",
    flag: "/flags/it.svg",
  },
  {
    code: "es",
    name: "Español",
    flag: "/flags/es.svg",
  },
  {
    code: "ru",
    name: "Pусский",
    flag: "/flags/ru.svg",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "/flags/de.svg",
  },
  {
    code: "id",
    name: "Indonesia",
    flag: "/flags/id.svg",
  },
  {
    code: "cz",
    name: "Czech",
    flag: "/flags/cz.svg",
  },
  {
    code: "tr",
    name: "Turkish",
    flag: "/flags/tr.svg",
  },
  {
    code: "gr",
    name: "Greece",
    flag: "/flags/gr.svg",
  },
  {
    code: "zh_tw",
    name: "Traditionnal Chinese",
    flag: "/flags/zh_tw.svg",
  },
  {
    code: "ar",
    name: "Arabic",
    flag: "/flags/ar.svg",
  },
  {
    code: "eo",
    name: "Esperanto",
    flag: "/flags/eo.svg",
  },
  {
    code: "nl",
    name: "Dutch",
    flag: "/flags/nl.svg",
  },
  {
    code: "az",
    name: "Azərbaycan",
    flag: "/flags/az.png",
  },
] as const;

function getBrowserLocale() {
  if (typeof navigator === "undefined") return "en";

  return navigator.language?.split("-")[0] ?? "en";
}

function getInitialLocale() {
  const browserLocale = getBrowserLocale();
  return locales.find((locale) => locale.code === browserLocale) ?? locales[0];
}

export default function useLocales() {
  const [currentLocale, setCurrentLocale] = useLocalStorage(
    "locale",
    getInitialLocale()
  );

  const setLocale = (locale: (typeof locales)[number]["code"]) => {
    const newLocale = locales.find((l) => l.code === locale);
    if (newLocale) {
      setCurrentLocale(newLocale);
    }
  };

  return { locales, currentLocale, setLocale };
}
