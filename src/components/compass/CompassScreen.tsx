import { ArrowUpRight, CalendarDays, Info, Lock, Star } from 'lucide-react';
import type { SignalKey } from '../../types';
import { compassSignals } from '../../data/signals';
import { earningsEvents } from '../../data/earnings';
import { crews, findCrew } from '../../data/crews';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import type { DictKey } from '../../i18n/ko';
import { CharacterAvatar } from '../ui/CharacterAvatar';
import { Card, Pill, SampleTag, SectionTitle } from '../ui/Card';

const signalStyle: Record<SignalKey, string> = {
  buy: 'border-signal-buy/30 bg-signal-buy-soft text-signal-buy',
  wait: 'border-signal-wait/30 bg-signal-wait-soft text-signal-wait',
  sell: 'border-signal-sell/30 bg-signal-sell-soft text-signal-sell',
  heated: 'border-signal-heated/30 bg-signal-heated-soft text-signal-heated',
  crisis: 'border-signal-crisis/30 bg-signal-crisis-soft text-signal-crisis',
  recover: 'border-signal-recover/30 bg-signal-recover-soft text-signal-recover',
  hold: 'border-signal-hold/30 bg-signal-hold-soft text-signal-hold',
};

const signalLabelKey: Record<SignalKey, DictKey> = {
  buy: 'signal.buy',
  wait: 'signal.wait',
  sell: 'signal.sell',
  heated: 'signal.heated',
  crisis: 'signal.crisis',
  recover: 'signal.recover',
  hold: 'signal.hold',
};

const signalDescKey: Record<SignalKey, DictKey> = {
  buy: 'signal.buy.desc',
  wait: 'signal.wait.desc',
  sell: 'signal.sell.desc',
  heated: 'signal.heated.desc',
  crisis: 'signal.crisis.desc',
  recover: 'signal.recover.desc',
  hold: 'signal.hold.desc',
};

const SIGNAL_ORDER: SignalKey[] = ['buy', 'wait', 'sell', 'heated', 'crisis', 'recover', 'hold'];

function SignalBadge({ signal, size = 'sm' }: { signal: SignalKey; size?: 'sm' | 'lg' }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border font-black whitespace-nowrap',
        size === 'lg' ? 'px-3 py-1 text-[12px]' : 'px-2 py-0.5 text-[10.5px]',
        signalStyle[signal],
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-pill bg-current" />
      {t(signalLabelKey[signal])}
    </span>
  );
}

export function CompassScreen({
  favorites,
  onOpenCrew,
}: {
  favorites: string[];
  onOpenCrew: (crewId: string) => void;
}) {
  const { t, l, lang } = useI18n();
  const watchlist = crews.filter((crew) => favorites.includes(crew.id));

  const indexes = [
    t('compass.market.indexKospi'),
    t('compass.market.indexKosdaq'),
    t('compass.market.indexSp500'),
    t('compass.market.indexNasdaq'),
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-[24px] leading-tight font-black tracking-tight text-ink sm:text-[28px]">
            {t('compass.title')}
          </h1>
          <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-ink-soft">{t('compass.subtitle')}</p>
        </div>
        <SampleTag label={t('common.sampleData')} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0 space-y-5">
          {/* 시장 현황 */}
          <section aria-labelledby="market-title">
            <SectionTitle
              action={<Pill tone="danger">{t('compass.market.unconnected')}</Pill>}
              className="px-0.5"
            >
              <span id="market-title">{t('compass.market.title')}</span>
            </SectionTitle>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {indexes.map((name) => (
                <div key={name} className="rounded-lg border border-dashed border-line-strong bg-surface/60 p-2.5">
                  <p className="text-[10.5px] font-bold text-ink-soft">{name}</p>
                  <p className="mt-1 text-[18px] leading-none font-black text-ink-muted">{t('compass.market.noValue')}</p>
                  <p className="mt-1 text-[9.5px] text-ink-muted">{t('compass.market.unconnected')}</p>
                </div>
              ))}
            </div>
            <p className="mt-1.5 flex items-start gap-1 text-[10.5px] leading-relaxed text-ink-muted">
              <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
              {t('compass.market.body')}
            </p>
          </section>

          <section aria-labelledby="official-title">
            <SectionTitle><span id="official-title">{t('official.title')}</span></SectionTitle>
            <Card className="p-3">
              <p className="text-[11px] text-ink-muted">{t('official.desc')}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <a href="https://dart.fss.or.kr/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-md border border-line p-2 text-[12px] font-bold text-primary">{t('official.kr')}<ArrowUpRight className="size-4 shrink-0" /></a>
                <a href="https://www.sec.gov/edgar/search/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-md border border-line p-2 text-[12px] font-bold text-primary">{t('official.us')}<ArrowUpRight className="size-4 shrink-0" /></a>
              </div>
            </Card>
          </section>
          <section aria-labelledby="school-title">
            <SectionTitle><span id="school-title">{t('school.title')}</span></SectionTitle>
            <Card className="p-3">
              {(['avg', 'report', 'risk'] as const).map(topic => (
                <details key={topic} className="border-b border-line py-2 last:border-b-0">
                  <summary className="cursor-pointer text-[12px] font-bold text-primary">{t(`school.${topic}.title`)}</summary>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{t(`school.${topic}.body`)}</p>
                </details>
              ))}
            </Card>
          </section>

          {/* 오늘의 신호 */}
          <section aria-labelledby="signals-title">
            <SectionTitle
              action={<SampleTag label={t('compass.signal.sample')} />}
              className="px-0.5"
            >
              <span id="signals-title">{t('compass.signal.title')}</span>
            </SectionTitle>
            <p className="mb-2 text-[11px] text-ink-muted">{t('compass.signal.subtitle')}</p>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {compassSignals.map((signal) => {
                const crew = findCrew(signal.crewId);
                return (
                  <article
                    key={signal.id}
                    className="flex flex-col rounded-lg border border-line bg-surface p-3.5 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        {crew && <CharacterAvatar character={crew.character} size={30} />}
                        <div className="min-w-0">
                          <p className="truncate text-[13px] leading-tight font-bold text-ink">{l(signal.name)}</p>
                          <p className="font-mono text-[10px] text-ink-muted">
                            {signal.ticker} · {signal.market === 'KR' ? t('rescue.filter.kr') : t('rescue.filter.us')}
                          </p>
                        </div>
                      </div>
                      <SignalBadge signal={signal.signal} size="lg" />
                    </div>

                    <p className="mt-2 text-[12.5px] leading-snug font-bold text-ink">{l(signal.headline)}</p>

                    <div className="mt-2 space-y-1.5">
                      <div>
                        <p className="text-[9.5px] font-black tracking-wide text-ink-muted">{t('compass.signal.reason')}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{l(signal.reason)}</p>
                      </div>
                      <div className="rounded-sm bg-surface-2 px-2 py-1.5">
                        <p className="text-[9.5px] font-black tracking-wide text-ink-muted">{t('compass.signal.data')}</p>
                        <p className="mt-0.5 text-[10.5px] leading-relaxed text-ink-soft">{l(signal.dataUsed)}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-2">
                      <span className="text-[10px] text-ink-muted">
                        {t('compass.signal.asOf')} {signal.asOf} · {t('compass.signal.sample')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenCrew(signal.crewId)}
                        aria-label={t('compass.signalFor', { name: l(signal.name) })}
                        className="inline-flex items-center gap-0.5 text-[10.5px] font-bold text-primary hover:underline"
                      >
                        {t('tab.rescueShort')}
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-2 rounded-md border border-line bg-surface-2 px-2.5 py-2 text-[10.5px] leading-relaxed text-ink-muted">
              {t('compass.signal.disclaimer')}
            </p>
          </section>

          {/* 배지 읽는 법 */}
          <section aria-labelledby="legend-title">
            <SectionTitle className="px-0.5">
              <span id="legend-title">{t('compass.legend.title')}</span>
            </SectionTitle>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {SIGNAL_ORDER.map((signal) => (
                <div key={signal} className="flex items-start gap-2 rounded-md border border-line bg-surface p-2">
                  <SignalBadge signal={signal} />
                  <p className="text-[10.5px] leading-relaxed text-ink-soft">{t(signalDescKey[signal])}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 사이드 */}
        <aside className="min-w-0 space-y-3">
          <Card className="p-3">
            <SectionTitle action={<span className="text-[10px] text-ink-muted">{watchlist.length}</span>} className="mb-1.5">
              {t('compass.watchlist.title')}
            </SectionTitle>
            {watchlist.length === 0 ? (
              <div className="rounded-md border border-dashed border-line-strong bg-surface-2/60 p-3 text-center">
                <Star className="mx-auto size-4 text-ink-muted" aria-hidden="true" />
                <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{t('compass.watchlist.empty')}</p>
                <button
                  type="button"
                  onClick={() => onOpenCrew('sk-hynix')}
                  className="mt-2 inline-flex items-center gap-1 rounded-pill border border-primary-line bg-primary-soft px-2.5 py-1 text-[10.5px] font-bold text-primary"
                >
                  {t('compass.watchlist.go')}
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <ul className="space-y-1">
                {watchlist.map((crew) => (
                  <li key={crew.id}>
                    <button
                      type="button"
                      onClick={() => onOpenCrew(crew.id)}
                      className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left hover:bg-surface-2"
                    >
                      <CharacterAvatar character={crew.character} size={24} />
                      <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-ink">{l(crew.name)}</span>
                      <span className="font-mono text-[9.5px] text-ink-muted">{crew.ticker}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-3">
            <SectionTitle className="mb-1.5">{t('compass.holdings.title')}</SectionTitle>
            <div className="flex items-start gap-2 rounded-md bg-surface-2 p-2">
              <Lock className="mt-0.5 size-3.5 shrink-0 text-ink-muted" aria-hidden="true" />
              <p className="text-[10.5px] leading-relaxed text-ink-soft">{t('compass.holdings.empty')}</p>
            </div>
          </Card>

          <Card className="p-3">
            <SectionTitle
              action={<SampleTag label={t('compass.earnings.sample')} />}
              className="mb-1.5"
            >
              {t('compass.earnings.title')}
            </SectionTitle>
            <ul className="space-y-1.5">
              {earningsEvents.map((event) => (
                <li key={event.id} className="flex items-start gap-2 text-[11px]">
                  <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-primary/70" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-bold text-ink">
                      <time dateTime={event.date}>
                        {new Date(`${event.date}T00:00:00`).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>{' '}
                      · {l(event.name)}
                    </p>
                    <p className="text-[10.5px] leading-snug text-ink-soft">{l(event.event)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] leading-relaxed text-ink-muted">{t('compass.earnings.body')}</p>
          </Card>

          <Card className="p-3">
            <SectionTitle className="mb-1.5">{t('compass.tools.title')}</SectionTitle>
            <ul className="space-y-1">
              {[t('compass.tools.g1'), t('compass.tools.g2'), t('compass.tools.g3'), t('compass.tools.g4')].map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[10.5px] text-ink-soft">
                  <Lock className="size-3 shrink-0 text-ink-muted" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-[10px] leading-relaxed text-ink-muted">{t('compass.tools.body')}</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
