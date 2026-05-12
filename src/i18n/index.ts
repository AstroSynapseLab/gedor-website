import { LanguageEnum } from '@/types';
import en from './en.json';
import hr from './hr.json';

const dictionary = {
  [LanguageEnum.HR]: hr,
  [LanguageEnum.EN]: en,
} as const;

type Primitive = string | number | boolean | null | undefined | symbol | bigint | Date;

type Join<K extends string, P extends string> = `${K}.${P}`;

type PrevDepth = {
  0: never;
  1: 0;
  2: 1;
  3: 2;
  4: 3;
  5: 4;
  6: 5;
};

type DotKeys<T, D extends keyof PrevDepth = 4> = D extends 0
  ? never
  : T extends Primitive
    ? never
    : T extends readonly any[]
      ? never
      : {
          [K in keyof T & string]: T[K] extends Primitive | readonly any[]
            ? K
            : K | Join<K, DotKeys<T[K], PrevDepth[D]>>;
        }[keyof T & string];

export type TranslationKey = DotKeys<typeof en, 4>;

function getNestedValue(obj: unknown, path: string) {
  let cur: any = obj;
  for (const part of path.split('.')) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

export function t(locale: LanguageEnum | undefined, key: TranslationKey) {
  const lang = locale && locale in dictionary ? locale : LanguageEnum.EN;
  return getNestedValue(dictionary[lang], key) ?? key;
}

export function useTranslation(locale: string | undefined) {
  const lang = locale as LanguageEnum;
  return (key: TranslationKey) => t(lang, key);
}

export type TranslationFunctionType = (key: TranslationKey) => string;
