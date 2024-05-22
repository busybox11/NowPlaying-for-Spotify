"use client";

import useLocales from "@/hooks/useLocales";

export default function Locales() {
  const { locales, setLocale } = useLocales();

  return (
    <div className="flex flex-row justify-center gap-3 lg:gap-4 flex-wrap">
      {locales.map((locale) => (
        <button key={locale.code} onClick={() => setLocale(locale.code)}>
          <img
            src={locale.flag}
            title={locale.name}
            className="h-8 w-8 opacity-50 hover:opacity-100 hover:scale-105 transition"
          />
        </button>
      ))}
    </div>
  );
}
