export type NodeEnv = 'development' | 'staging' | 'production' | 'test';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: NodeEnv;
      readonly PORT: string;
      readonly HOST: string;
      readonly PUBLIC_BASE_URL: string;
      readonly PUBLIC_SITE_URL: string;
      readonly PUBLIC_ASSETS_URL: string;
    }
  }

  interface ImportMetaEnv {
    MODE: string;
    BASE_URL: string;
    PROD: boolean;
    DEV: boolean;
    SSR: boolean;
    PUBLIC_BASE_URL: string;
    PUBLIC_SITE_URL: string;
    PUBLIC_ASSETS_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
