export type ID = string | number;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type PickRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Awaited<T> = T extends Promise<infer U> ? U : T;

export type NonEmptyArray<T> = [T, ...T[]];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface BaseEntity {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export enum SizeEnum {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export type Theme = 'light' | 'dark' | 'system';

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type Language = 'en' | 'hr';

export enum LanguageEnum {
  EN = 'en',
  HR = 'hr',
}

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type EventHandler<T = globalThis.Event> = (event: T) => void;

