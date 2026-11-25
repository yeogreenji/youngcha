import { useMemo, useState } from 'react';
import { ArrowDownUp, Calculator, Lock, RotateCcw, Wand2 } from 'lucide-react';
import type { Crew } from '../../types';
import { calculateElevator, elevatorPosition, floorOf } from '../../lib/elevator';
import { formatMoney, formatPercent, parseNumber } from '../../lib/format';
import { useI18n } from '../../i18n';
import { CharacterAvatar } from '../ui/CharacterAvatar';

/**
 * 평단가 엘리베이터 계산기 — 실제로 계산되는 위젯.
 * 입력한 숫자로만 산수하며, 시세를 가져오지 않습니다(미연결).
 * 수수료·세금·환전 비용은 반영하지 않습니다.
 */
export function ElevatorCalculator({ crew, mindGuard }: { crew: Crew; mindGuard: boolean }) {
  const { t, lang } = useI18n();
  const [avgInput, setAvgInput] = useState('');
  const [sharesInput, setSharesInput] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [targetInput, setTargetInput] = useState('');

  const avgPrice = parseNumber(avgInput);
  const shares = parseNumber(sharesInput);
  const currentPrice = parseNumber(currentInput);
  const targetPrice = parseNumber(targetInput);

  const hasInvalid =
    (avgInput.trim() !== '' && (avgPrice === null || avgPrice <= 0)) ||
    (currentInput.trim() !== '' && (currentPrice === null || currentPrice <= 0)) ||
    (sharesInput.trim() !== '' && (shares === null || shares <= 0)) ||
    (targetInput.trim() !== '' && (targetPrice === null || targetPrice <= 0));

  const result = useMemo(
    () => calculateElevator({ avgPrice, shares, currentPrice, targetPrice, floorUnit: crew.floorUnit }),
    [avgPrice, shares, currentPrice, targetPrice, crew.floorUnit],
  );

  const position = result ? elevatorPosition(currentPrice ?? 0, avgPrice ?? 1) : 0;

  const fillSample = () => {
    const floorSample = crew.badgeSamples.find((badge) => badge.type === 'floor');
    const baseFloor = floorSample && floorSample.type === 'floor' ? floorSample.floor : 10;
    const unit = crew.floorUnit;
    const sampleAvg = baseFloor * unit + unit * 0.4;
    const sampleCurrent = Math.max(unit, Math.round(baseFloor * unit * 0.93));
    const sampleShares = crew.currency === 'KRW' ? 10 : 3;
    setAvgInput(String(sampleAvg));
    setSharesInput(String(sampleShares));
    setCurrentInput(String(sampleCurrent));
    setTargetInput(String(Math.round(sampleAvg * 1.12)));
  };

  const reset = () => {
    setAvgInput('');
    setSharesInput('');
    setCurrentInput('');
    setTargetInput('');
  };

  const unitLabel = formatMoney(crew.floorUnit, crew.currency, lang);
  const moneySuffix = crew.currency === 'KRW' ? t('common.won') : t('common.usd');

  const field = (
    id: string,
    label: string,
    value: string,
    onChange: (next: string) => void,
    options?: { optional?: boolean; testId?: string; suffix?: string },
  ) => (
    <div>
      <label htmlFor={id} className="mb-1 flex items-center justify-between text-[10.5px] font-bold text-ink-soft">
        <span>{label}</span>
        {options?.optional && <span className="text-[9px] font-normal text-ink-muted">{t('common.optional')}</span>}
      </label>
      <div className="flex items-center rounded-md border border-line bg-surface-2 focus-within:border-primary focus-within:bg-surface">
        <input
          id={id}
          data-testid={options?.testId}
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="0"
          className="min-w-0 flex-1 rounded-md bg-transparent px-2.5 py-2 text-[13px] tabular-nums text-ink outline-none placeholder:text-ink-muted"
        />
        <span className="shrink-0 pr-2.5 text-[10px] font-semibold whitespace-nowrap text-ink-muted">
          {options?.suffix ?? moneySuffix}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[13px] font-black text-ink">{t('calc.title')}</h3>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">{t('calc.desc')}</p>
        </div>
        <Calculator className="size-5 shrink-0 text-primary" aria-hidden="true" />
      </div>

      <p className="mt-2 inline-flex items-center gap-1 rounded-pill border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-ink-soft">
        <ArrowDownUp className="size-3" aria-hidden="true" />
        {t('calc.floorUnit', { unit: unitLabel })}
      </p>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {field('calc-avg', t('calc.avg'), avgInput, setAvgInput, { testId: 'calc-avg' })}
        {field('calc-shares', t('calc.shares'), sharesInput, setSharesInput, {
          testId: 'calc-shares',
          suffix: t('calc.sharesUnit'),
        })}
        {field('calc-current', t('calc.current'), currentInput, setCurrentInput, { testId: 'calc-current' })}
        {field('calc-target', t('calc.target'), targetInput, setTargetInput, {
          optional: true,
          testId: 'calc-target',
        })}
      </div>

      <div className="mt-2 flex gap-1.5">
        <button
          type="button"
          onClick={fillSample}
          data-testid="calc-sample"
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-primary-line bg-primary-soft px-2 py-1.5 text-[10.5px] font-bold text-primary"
        >
          <Wand2 className="size-3" aria-hidden="true" />
          {t('calc.sampleFill')}
        </button>
        <button
          type="button"
          onClick={reset}
          data-testid="calc-reset"
          className="inline-flex items-center justify-center gap-1 rounded-md border border-line bg-surface px-2 py-1.5 text-[10.5px] font-bold text-ink-muted hover:text-ink"
        >
          <RotateCcw className="size-3" aria-hidden="true" />
          {t('calc.reset')}
        </button>
      </div>

      {hasInvalid && <p className="mt-2 text-[10.5px] font-semibold text-danger">{t('calc.invalid')}</p>}

      <div className="mt-2.5 rounded-md border border-line bg-surface p-2.5" data-testid="calc-result">
        {mindGuard ? (
          <div className="flex items-start gap-2 rounded-sm bg-surface-2 p-2.5">
            <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-[11px] leading-relaxed text-ink-soft">{t('calc.mindGuardOn')}</p>
          </div>
        ) : !result ? (
          <div className="flex items-start gap-2 rounded-sm bg-surface-2 p-2.5">
            <Lock className="mt-0.5 size-3.5 shrink-0 text-ink-muted" aria-hidden="true" />
            <p className="text-[11px] leading-relaxed text-ink-soft">{t('calc.need')}</p>
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold text-ink-muted">{t('calc.floorsToGo')}</p>
                {result.rescued ? (
                  <p className="text-[19px] leading-tight font-black text-success">{t('calc.done')}</p>
                ) : (
                  <p className="text-[19px] leading-tight font-black text-primary" data-testid="calc-floors">
                    {t('calc.floors', { n: result.floorsToGo })}
                  </p>
                )}
                <p className="mt-0.5 text-[10px] text-ink-muted">
                  {result.rescued
                    ? t('calc.doneHint')
                    : t('calc.floorMarks', { start: result.currentFloor, end: result.avgFloor })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-ink-muted">{t('calc.pnlPct')}</p>
                <p
                  className={`text-[15px] leading-tight font-black tabular-nums ${
                    result.pnl > 0 ? 'text-success' : result.pnl < 0 ? 'text-danger' : 'text-ink'
                  }`}
                  data-testid="calc-pnl"
                >
                  {formatPercent(result.pnlPct)}
                </p>
                <p className="text-[10px] tabular-nums text-ink-muted">
                  {formatMoney(result.pnl, crew.currency, lang)}
                </p>
              </div>
            </div>

            <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 border-t border-line pt-2 text-[10.5px]">
              <div className="flex justify-between gap-1">
                <dt className="text-ink-muted">{t('calc.invested')}</dt>
                <dd className="tabular-nums font-semibold text-ink">{formatMoney(result.invested, crew.currency, lang)}</dd>
              </div>
              <div className="flex justify-between gap-1">
                <dt className="text-ink-muted">{t('calc.value')}</dt>
                <dd className="tabular-nums font-semibold text-ink">{formatMoney(result.value, crew.currency, lang)}</dd>
              </div>
              <div className="flex justify-between gap-1">
                <dt className="text-ink-muted">{t('calc.avgFloor')}</dt>
                <dd className="tabular-nums font-semibold text-ink">{t('calc.floors', { n: result.avgFloor })}</dd>
              </div>
              <div className="flex justify-between gap-1">
                <dt className="text-ink-muted">{t('calc.currentFloor')}</dt>
                <dd className="tabular-nums font-semibold text-ink">{t('calc.floors', { n: result.currentFloor })}</dd>
              </div>
              {result.targetFloors !== null && (
                <div className="col-span-2 flex justify-between gap-1">
                  <dt className="text-ink-muted">{t('calc.target')}</dt>
                  <dd className="tabular-nums font-semibold text-ink">
                    {formatMoney(targetPrice ?? 0, crew.currency, lang)} · {t('calc.targetFloors', { n: result.targetFloors })}
                  </dd>
                </div>
              )}
            </dl>

            {/* 엘리베이터 그림 — 평단가를 위층, 현재가를 아래층으로 */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[9.5px] font-bold">
                <span className="text-primary">
                  {t('calc.avg')} · {t('calc.floors', { n: result.avgFloor })}
                </span>
                <span className="text-ink-soft">
                  {t('calc.current')} · {t('calc.floors', { n: result.currentFloor })}
                </span>
              </div>
              <div
                className="relative mt-1 h-28 overflow-hidden rounded-md border border-line bg-[repeating-linear-gradient(to_top,transparent_0_13px,var(--yc-line)_13px_14px)]"
                aria-label={t('calc.elevatorLabel')}
                role="img"
              >
                <div className="absolute inset-x-0 top-1.5 border-t border-dashed border-primary/70" />
                <div
                  className="absolute inset-x-0 bottom-0 bg-primary-soft/70"
                  style={{ height: `${Math.max(4, Math.min(100, position))}%` }}
                />
                <div
                  className="absolute inset-x-1.5 flex justify-end transition-[bottom] duration-500"
                  style={{ bottom: `calc(${Math.max(6, Math.min(96, position))}% - 11px)` }}
                >
                  <span className="inline-flex items-center gap-1 rounded-pill border border-primary bg-surface px-1.5 py-0.5 shadow-card">
                    <CharacterAvatar character={crew.character} size={18} />
                    <span className="text-[9px] font-black text-primary">
                      {t('calc.floors', { n: floorOf(currentPrice ?? 0, crew.floorUnit) })}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-1.5 text-[9.5px] leading-relaxed text-ink-muted">{t('calc.note')}</p>
          </>
        )}
      </div>
    </div>
  );
}
