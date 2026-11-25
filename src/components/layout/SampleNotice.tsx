import { Info, X } from 'lucide-react';
import { useI18n } from '../../i18n';

/**
 * 샘플 모드 안내 — 처음 방문자에게 '지금 무엇이 진짜가 아닌지' 먼저 알립니다.
 * 접어도 다시 열 수 있게 본문 하단에 작은 버튼을 남깁니다.
 */
export function SampleNotice({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const { t } = useI18n();

  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="mb-3 inline-flex items-center gap-1.5 rounded-pill border border-accent/50 bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-ink"
      >
        <Info className="size-3.5" aria-hidden="true" />
        {t('notice.sample.show')}
      </button>
    );
  }

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-accent/45 bg-accent-soft/70 p-3 sm:p-3.5">
      <Info className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-bold text-accent-ink">{t('notice.sample.title')}</p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-accent-ink/85">{t('notice.sample.body')}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-label={t('notice.sample.hide')}
        className="rounded-pill p-1 text-accent-ink/70 hover:bg-accent-soft hover:text-accent-ink"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
