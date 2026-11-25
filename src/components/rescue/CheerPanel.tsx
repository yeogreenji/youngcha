import { useRef, useState } from 'react';
import { ArrowUp, HeartHandshake, Megaphone, Radio } from 'lucide-react';
import type { Crew } from '../../types';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import { usePersistentState } from '../../lib/usePersistentState';

interface CheerState {
  count: number;
  gauge: number;
  attendance: boolean;
}

const EMPTY: CheerState = { count: 0, gauge: 0, attendance: false };

/**
 * 영차영차 응원 — 지금은 이 기기에서만 쌓이는 화면 동작입니다.
 * 서버 집계·선물 발송은 CHAT_DATABASE_URL 연결 후 붙입니다. (지침 Ⅴ)
 */
export function CheerPanel({ crew }: { crew: Crew }) {
  const { t } = useI18n();
  const [cheers, setCheers] = usePersistentState<Record<string, CheerState>>('cheers', {});
  const state = cheers[crew.id] ?? EMPTY;
  const [toast, setToast] = useState<string | null>(null);
  const [flying, setFlying] = useState(false);
  const lastHeli = useRef(0);
  const timer = useRef<number | null>(null);

  const flash = (message: string) => {
    setToast(message);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  };

  const update = (patch: Partial<CheerState>) => {
    setCheers((prev) => ({ ...prev, [crew.id]: { ...(prev[crew.id] ?? EMPTY), ...patch } }));
  };

  const cheer = () => {
    const nextGauge = Math.min(100, state.gauge + 7);
    update({ count: state.count + 1, gauge: nextGauge });
    if (nextGauge >= 100) flash(t('cheer.gaugeMax'));
  };

  const sendHeli = () => {
    const now = Date.now();
    if (now - lastHeli.current < 5000) return;
    lastHeli.current = now;
    setFlying(true);
    window.setTimeout(() => setFlying(false), 1900);
    update({ gauge: Math.min(100, state.gauge + 15) });
    flash(t('cheer.heliDone'));
  };

  const requestRescue = () => flash(t('cheer.requestSent'));

  const gifts = [
    { emoji: '☕', label: t('cheer.giftItem.coffee') },
    { emoji: '🍜', label: t('cheer.giftItem.noodle') },
    { emoji: '🐟', label: t('cheer.giftItem.bungeoppang') },
    { emoji: '🍫', label: t('cheer.giftItem.chocolate') },
  ];

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[13px] font-black text-ink">{t('cheer.title')}</h3>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">{t('cheer.desc')}</p>
        </div>
        <HeartHandshake className="size-5 shrink-0 text-accent-strong" aria-hidden="true" />
      </div>

      <div className="relative mt-3 overflow-hidden rounded-md border border-primary-line bg-primary-soft/50 p-3">
        {flying && (
          <span aria-hidden="true" className="yc-heli pointer-events-none absolute top-2 left-2 text-xl">
            🚁
          </span>
        )}
        <button
          type="button"
          onClick={cheer}
          data-testid="cheer-button"
          className="flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-3 text-[15px] font-black tracking-tight text-white shadow-card transition-transform active:scale-[0.98]"
        >
          <Megaphone className="size-4" aria-hidden="true" />
          {t('cheer.button')}
        </button>
        <p className="mt-2 text-center text-[11px] font-semibold text-primary" aria-live="polite">
          {t('cheer.count', { n: state.count })}
        </p>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[10.5px] font-bold text-ink-soft">
            <span>{t('cheer.gauge')}</span>
            <span className="tabular-nums">{t('cheer.gaugeValue', { n: state.gauge })}</span>
          </div>
          <div
            role="progressbar"
            aria-label={t('cheer.gaugeAria', { n: state.gauge })}
            aria-valuenow={state.gauge}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 w-full overflow-hidden rounded-pill bg-surface"
          >
            <div
              className="h-full rounded-pill bg-accent-strong transition-[width] duration-500"
              style={{ width: `${state.gauge}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={sendHeli}
          data-testid="cheer-heli"
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 py-2 text-[11.5px] font-bold text-ink-soft hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true">🚁</span>
          {t('cheer.heli')}
        </button>
        <button
          type="button"
          onClick={requestRescue}
          data-testid="cheer-request"
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 py-2 text-[11.5px] font-bold text-ink-soft hover:border-primary hover:text-primary"
        >
          <Radio className="size-3.5" aria-hidden="true" />
          {t('cheer.request')}
        </button>
      </div>

      <p className="mt-1 text-[10px] text-ink-muted">{t('cheer.heliHint')}</p>

      <div className="mt-3">
        <p className="text-[10.5px] font-bold text-ink-muted">{t('cheer.gift')}</p>
        <div className="mt-1 grid grid-cols-4 gap-1">
          {gifts.map((gift) => (
            <button
              key={gift.label}
              type="button"
              disabled
              title={t('common.comingSoon')}
              className="flex cursor-not-allowed flex-col items-center gap-0.5 rounded-md border border-line bg-surface-2 px-1 py-2 text-[9.5px] font-semibold text-ink-muted opacity-70"
            >
              <span aria-hidden="true" className="text-base">
                {gift.emoji}
              </span>
              {gift.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => update({ attendance: true })}
        className={cn(
          'mt-2 flex w-full items-center justify-between rounded-md border px-2.5 py-2 text-[11px] font-bold',
          state.attendance ? 'border-primary-line bg-primary-soft text-primary' : 'border-line bg-surface text-ink-soft',
        )}
      >
        <span>{t('cheer.attendance')}</span>
        <span className="inline-flex items-center gap-1 text-[10px]">
          {state.attendance ? t('cheer.attendanceDone') : <ArrowUp className="size-3" aria-hidden="true" />}
        </span>
      </button>

      <p className="mt-2 rounded-md bg-surface-2 px-2 py-1.5 text-[10px] leading-relaxed text-ink-muted">
        {t('cheer.note')}
      </p>
      <p className="mt-1 min-h-4 text-[10.5px] font-semibold text-primary" aria-live="polite">
        {toast}
      </p>
    </div>
  );
}
