import type { Currency, Lang } from '../types';

const localeOf = (lang: Lang) => (lang === 'ko' ? 'ko-KR' : 'en-US');

export function formatNumber(value: number, lang: Lang, maximumFractionDigits = 0): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(localeOf(lang), {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatMoney(value: number, currency: Currency, lang: Lang): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(localeOf(lang), {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'KRW' ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(value);
}

/** 부호를 항상 붙인 수익률. 0은 0.00% */
export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

/** '21,400' / '21400' / '21,400원' → 21400. 비었거나 숫자가 없으면 null */
export function parseNumber(input: string): number | null {
  const cleaned = input.trim().replace(/(?:원|주|USD|KRW|달러)$/i, '').trim();
  if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$|^-?\.\d+$/.test(cleaned)) return null;
  const value = Number(cleaned.replace(/,/g, ''));
  return Number.isFinite(value) ? value : null;
}

export function formatFloorUnit(unit: number, currency: Currency, lang: Lang): string {
  return formatMoney(unit, currency, lang);
}
