import { useMemo, useState } from 'react';
import { MessagesSquare, SearchX, ShieldCheck, Sparkles } from 'lucide-react';
import { crews, findCrew, searchCrews } from '../../data/crews';
import type { Crew } from '../../types';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import { SampleTag, SectionTitle } from '../ui/Card';
import { CrewCard, CrewSearch } from './CrewCard';
import { ChatRoom } from './ChatRoom';

export function RescueScreen({
  favorites,
  onToggleFavorite,
  mindGuard,
  selectedCrewId,
  onSelectCrew,
}: {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  mindGuard: boolean;
  selectedCrewId: string | null;
  onSelectCrew: (id: string | null) => void;
}) {
  const { t, l } = useI18n();
  const [query, setQuery] = useState('');
  const [market, setMarket] = useState<'ALL' | 'KR' | 'US'>('ALL');

  const results = useMemo(() => searchCrews(query, market), [query, market]);
  const favoriteCrews = useMemo(
    () => crews.filter((crew) => favorites.includes(crew.id)),
    [favorites],
  );
  const selectedCrew = findCrew(selectedCrewId);

  return (
    <div>
      <div className={cn('mb-4 flex flex-wrap items-end justify-between gap-2', selectedCrewId && 'hidden lg:flex')}>
        <div>
          <h1 className="text-[24px] leading-tight font-black tracking-tight text-ink sm:text-[28px]">
            {t('rescue.title')}
          </h1>
          <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-ink-soft">{t('rescue.subtitle')}</p>
        </div>
        <SampleTag label={t('common.sampleData')} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
        <aside className={cn('min-w-0 space-y-3', selectedCrewId && 'hidden lg:block')}>
          <CrewSearch query={query} onQueryChange={setQuery} market={market} onMarketChange={setMarket} />

          {favoriteCrews.length > 0 && (
            <section aria-labelledby="favorites-title">
              <SectionTitle
                action={<span className="text-[10px] text-ink-muted">{favoriteCrews.length}</span>}
                className="px-1"
              >
                <span id="favorites-title" className="inline-flex items-center gap-1">
                  <Sparkles className="size-3.5 text-accent-strong" aria-hidden="true" />
                  {t('rescue.interest.title')}
                </span>
              </SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {favoriteCrews.map((crew: Crew) => (
                  <button
                    key={crew.id}
                    type="button"
                    onClick={() => onSelectCrew(crew.id)}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 text-[11.5px] font-semibold text-ink-soft hover:border-primary hover:text-ink"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent-strong" />
                    {l(crew.name)}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="recent-title">
            <SectionTitle
              action={<span className="text-[10px] text-ink-muted">{t('rescue.list.count', { n: results.length })}</span>}
              className="px-1"
            >
              <span id="recent-title">{t('rescue.recent.title')}</span>
            </SectionTitle>

            {results.length === 0 ? (
              <div className="rounded-lg border border-dashed border-line-strong bg-surface/60 p-6 text-center">
                <SearchX className="mx-auto size-6 text-ink-muted" aria-hidden="true" />
                <p className="mt-2 text-[12.5px] text-ink-soft">{t('rescue.search.empty')}</p>
              </div>
            ) : (
              <div className="yc-scroll space-y-2 lg:max-h-[calc(100dvh-22rem)] lg:overflow-y-auto lg:pr-1">
                {results.map((crew) => (
                  <CrewCard
                    key={crew.id}
                    crew={crew}
                    active={crew.id === selectedCrewId}
                    favorite={favorites.includes(crew.id)}
                    mindGuard={mindGuard}
                    onSelect={onSelectCrew}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>

          <div className="rounded-lg border border-line bg-surface-2/70 p-3">
            <p className="flex items-center gap-1.5 text-[11.5px] font-bold text-ink-soft">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
              {t('rescue.comingBanner.title')}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">{t('rescue.comingBanner.body')}</p>
          </div>
        </aside>

        <section className={cn('min-w-0', !selectedCrewId && 'hidden lg:block')}>
          {selectedCrew ? (
            <ChatRoom
              key={selectedCrew.id}
              crew={selectedCrew}
              mindGuard={mindGuard}
              favorite={favorites.includes(selectedCrew.id)}
              onToggleFavorite={onToggleFavorite}
              onBack={() => onSelectCrew(null)}
            />
          ) : (
            <EmptyRoom onSelectCrew={onSelectCrew} />
          )}
        </section>
      </div>
    </div>
  );
}

function EmptyRoom({ onSelectCrew }: { onSelectCrew: (id: string) => void }) {
  const { t, l } = useI18n();
  const quickPicks = ['sk-hynix', 'samsung', 'nvidia']
    .map((id) => crews.find((crew) => crew.id === id))
    .filter((crew): crew is Crew => Boolean(crew));

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface/50 p-6 text-center lg:p-8">
      <span className="grid size-12 place-items-center rounded-pill bg-primary-soft text-primary">
        <MessagesSquare className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-3 text-[14px] font-bold text-ink">{t('chat.emptyRoom')}</p>
      <p className="mt-1 max-w-xs text-[12px] leading-relaxed text-ink-soft">{t('chat.emptyRoomBody')}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {quickPicks.map((crew) => (
          <button
            key={crew.id}
            type="button"
            onClick={() => onSelectCrew(crew.id)}
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-2.5 py-1 text-[11.5px] font-semibold text-ink-soft hover:border-primary hover:text-ink"
          >
            <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent-strong" />
            {l(crew.name)}
          </button>
        ))}
      </div>
    </div>
  );
}
