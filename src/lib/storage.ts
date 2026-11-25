/**
 * 이 기기(localStorage)에만 저장하는 작은 상태들.
 * 서버·계정이 없는 뼈대 단계에서 '내 설정'만 기억합니다.
 * 저장이 막힌 브라우저(사생활 보호 모드 등)에서도 앱이 멈추지 않도록 감쌉니다.
 */
const PREFIX = 'youngcha:v1:';

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* 저장 실패는 화면 동작을 막지 않습니다. */
  }
}

export const STORAGE_KEYS = {
  lang: 'lang',
  mindGuard: 'mind-guard',
  favorites: 'favorites',
  cheers: 'cheers',
  notes: 'notes',
} as const;
