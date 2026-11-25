import type { FloorBadge } from '../../types';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';

/**
 * 닉네임 옆 층 배지.
 *  · 21층 / 구조 완료 / 신규 대원
 *  · 마음 보호 모드에서는 숫자를 가립니다(층수는 비교·자책의 재료가 되기 쉬워서).
 */
export function FloorBadgeChip({
  badge,
  mindGuard = false,
  size = 'sm',
  className,
}: {
  badge: FloorBadge;
  mindGuard?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const { t } = useI18n();
  const base = cn(
    'inline-flex items-center gap-1 rounded-pill border font-bold whitespace-nowrap',
    size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-[11px]',
    className,
  );

  if (mindGuard) {
    return (
      <span className={cn(base, 'border-line bg-surface-2 text-ink-muted')} title={t('badge.hidden')}>
        <span aria-hidden="true">•••</span>
        <span className="sr-only">{t('badge.hidden')}</span>
      </span>
    );
  }

  if (badge.type === 'done') {
    return <span className={cn(base, 'border-success/25 bg-success-soft text-success')}>{t('badge.done')}</span>;
  }

  if (badge.type === 'rookie') {
    return <span className={cn(base, 'border-line bg-surface-2 text-ink-soft')}>{t('badge.rookie')}</span>;
  }

  return (
    <span className={cn(base, 'border-primary-line bg-primary-soft text-primary')} data-floor={badge.floor}>
      {t('badge.floor', { n: badge.floor })}
    </span>
  );
}
