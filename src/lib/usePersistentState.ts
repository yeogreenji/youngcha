import { useCallback, useState } from 'react';
import { readStored, writeStored } from './storage';

/** localStorage에 저장되는 useState. 새로고침해도 '내 설정'은 남습니다. */
export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStored<T>(key, fallback));

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
        writeStored(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
