import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border border-line bg-surface shadow-card', className)}>{children}</div>;
}

export function SectionTitle({
  children,
  action,
  className,
}: {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-2 flex items-baseline justify-between gap-3', className)}>
      <h2 className="text-[13px] font-bold tracking-wide text-ink-soft">{children}</h2>
      {action}
    </div>
  );
}

/** '샘플' 표시 — 실제 데이터와 섞이지 않게 항상 붙입니다. (지침 Ⅲ-13) */
export function SampleTag({ label, className }: { label?: string; className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-pill border border-accent/45 bg-accent-soft px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent-strong" />
      {label ?? t('common.sample')}
    </span>
  );
}

export function Pill({
  children,
  className,
  tone = 'neutral',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'neutral' | 'primary' | 'accent' | 'danger';
}) {
  const tones = {
    neutral: 'border-line bg-surface-2 text-ink-soft',
    primary: 'border-primary-line bg-primary-soft text-primary',
    accent: 'border-accent/45 bg-accent-soft text-accent-ink',
    danger: 'border-danger/25 bg-danger-soft text-danger',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 text-[11px] font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
