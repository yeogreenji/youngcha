/** className 병합 헬퍼 — 조건부 클래스를 읽기 쉽게 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
