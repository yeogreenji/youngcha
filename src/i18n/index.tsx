import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Lang, Localized } from '../types';
import { ko, type DictKey } from './ko';
import { en } from './en';

const dicts = { ko, en } as const;

type Vars = Record<string, string | number>;

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** UI 문구: 키 + {변수} 치환 */
  t: (key: DictKey, vars?: Vars) => string;
  /** 데이터 문구(종목명·대화 등)를 현재 언어로 */
  l: (value: Localized) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = vars[key];
    return value === undefined ? match : String(value);
  });
}

export function I18nProvider({ children, initialLang = 'ko' }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((prev) => (prev === 'ko' ? 'en' : 'ko')),
      t: (key, vars) => interpolate(dicts[lang][key] ?? ko[key], vars),
      l: (localized) => localized[lang],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

export type { DictKey };
