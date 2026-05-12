import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
};

export const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const badgeColors = [
  { bg: '#3B82F6', text: '#FFFFFF' },
  { bg: '#10B981', text: '#FFFFFF' },
  { bg: '#F59E0B', text: '#000000' },
  { bg: '#EF4444', text: '#FFFFFF' },
  { bg: '#8B5CF6', text: '#FFFFFF' },
  { bg: '#EC4899', text: '#FFFFFF' },
  { bg: '#06B6D4', text: '#000000' },
  { bg: '#84CC16', text: '#000000' },
  { bg: '#F97316', text: '#000000' },
  { bg: '#14B8A6', text: '#FFFFFF' },
];

export const getRandomColor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return badgeColors[Math.abs(hash) % badgeColors.length];
};
