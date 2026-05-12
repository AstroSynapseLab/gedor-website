// src/lib/constants.ts

import { LanguageEnum } from '../types/index';

export const isDev = process.env.NODE_ENV === 'development';
export const isStg = process.env.NODE_ENV === 'staging';
export const isProd = process.env.NODE_ENV === 'production';

export const getCurrentEnv = (): 'DEV' | 'STG' | 'PROD' => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'DEV';
    case 'staging':
      return 'STG';
    case 'production':
      return 'PROD';
    default:
      return 'DEV';
  }
};

export const getCurrentSiteUrl = () => import.meta.env.PUBLIC_SITE_URL;
export const getCurrentBaseUrl = () => {
  if (import.meta.env.PUBLIC_BASE_URL) {
    return import.meta.env.PUBLIC_BASE_URL;
  }
  return '/';
};
export const getCurrentAssetsUrl = () => '/';

export const SITE_CONFIG = {
  name: 'ArtIT',
  author: 'ArtIT',
  url: getCurrentSiteUrl(),
  defaultLocale: LanguageEnum.EN,
  locales: [LanguageEnum.EN, LanguageEnum.HR],
  title: {
    [LanguageEnum.EN]: 'ArtIT - Fast & Reactive Web and Mobile App Development',
    [LanguageEnum.HR]: 'ArtIT - Razvoj Web i Mobilnih Softverskih Rješenja',
  },
  description: {
    [LanguageEnum.EN]:
      'ArtIT is a software development company based in Zagreb, specializing in fast, reactive web applications and high-performance mobile app solutions.',
    [LanguageEnum.HR]:
      'ArtIT je OT tvrtka iz Zagreba specijalizirana za brze, reaktivne web aplikacije i moderna mobilna rješenja visokih performansi.',
  },
} as const;

// Default SEO settings
export const SEO_DEFAULTS = {
  ogType: 'website',
  ogImage: '/assets/common/images/ogp_image.png',
  twitterCard: 'summary_large_image',
} as const;

// Helper to get localized defaults (use this in Head.astro)
export const getDefaultPageMeta = (locale: LanguageEnum): PageMeta => {
  const title = SITE_CONFIG.title[locale] ?? SITE_CONFIG.title[SITE_CONFIG.defaultLocale];
  const description = SITE_CONFIG.description[locale] ?? SITE_CONFIG.description[SITE_CONFIG.defaultLocale];

  return {
    title,
    description,
    ogType: SEO_DEFAULTS.ogType,
    ogImage: SEO_DEFAULTS.ogImage,
  };
};

// Keep a safe non-breaking default (EN) for any code still using DEFAULT_PAGE_META directly
export const DEFAULT_PAGE_META: PageMeta = getDefaultPageMeta(LanguageEnum.EN);

// Path settings (environment-based URLs)
export const PATHS = {
  images: {
    favicon: `${getCurrentAssetsUrl()}assets/common/images/favicon`,
    ogp: `${getCurrentAssetsUrl()}assets/common/images/ogp_image.png`,
    appleTouchIcon: `${getCurrentAssetsUrl()}assets/common/images/apple-touch-icon.png`,
  },
} as const;

// Common type definitions
export interface PageMeta {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

// Theme settings (optional)
export const THEME_CONFIG = {
  defaultTheme: 'light',
  themeStorageKey: 'theme-preference',
} as const;

export const LANG_LOCALSTORAGE_KEY = 'lang-preference';
