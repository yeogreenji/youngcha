import { Radio, Search, Users, X } from 'lucide-react';
import type { Crew } from '../../types';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import { CharacterAvatar } from '../ui/CharacterAvatar';
import { FloorBadgeChip } from '../ui/FloorBadgeChip';

export function timeAgoLabel(minutes: number, t: ReturnType<typeof useI18n>['t']): string {
  if (minutes < 1) return t('rescue.justNow');
  if (minutes < 60) return t('rescue.minutesAgo', { n: minutes });
  if (minutes < 60 * 24) return t('rescue.hoursAgo', { n: Math.floor(minutes / 60) });
  return t('rescue.daysAgo', { n: Math.floor(minutes / (60 * 24)) });
}

export function CrewCard({
  crew,
  active,
  favorite,
  mindGuard,
  onSelect,
  onToggleFavorite,
}: {
  crew: Crew;
  active: boolean;
  favorite: boolean;
  mindGuard: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const { t, l, lang } = useI18n();
  const name = l(crew.name);

  return (
    <article
      className={cn(
        'relative rounded-lg border bg-surface transition-colors',
        active ? 'border-primary/70 bg-primary-soft/35 ring-1 ring-primary/20' : 'border-line hover:border-line-strong',
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(crew.id)}
        aria-label={t('rescue.enter', { name })}
        data-testid={`crew-${crew.id}`}
        className="block w-full rounded-lg p-3 pr-10 text-left"
      >
        <div className="flex items-start gap-2.5">
          <CharacterAvatar character={crew.character} size={38} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <span className="truncate text-[14px] font-bold text-ink">{name}</span>
              <span className="rounded-pill border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">
                {crew.market === 'KR' ? t('rescue.filter.kr') : t('rescue.filter.us')}
              </span>
              <span className="font-mono text-[10.5px] tracking-tight text-ink-muted">{crew.ticker}</span>
            </div>

            <p className="mt-1 line-clamp-1 text-[12px] leading-snug text-ink-soft">{l(crew.lastMessage)}</p>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <Users className="size-3" aria-hidden="true" />
                {t('rescue.members', { n: crew.membersSample.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US') })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Radio className="size-3 text-primary/70" aria-hidden="true" />
                {t('rescue.online', { n: crew.onlineSample })}
              </span>
              <span aria-hidden="true">·</span>
              <span>{timeAgoLabel(crew.lastActivityMinutes, t)}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1">
              <span className="sr-only">{t('rescue.sampleChip')}</span>
              {crew.badgeSamples.slice(0, 3).map((badge, index) => (
                <FloorBadgeChip key={`${crew.id}-${index}`} badge={badge} mindGuard={mindGuard} />
              ))}
            </div>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onToggleFavorite(crew.id)}
        aria-pressed={favorite}
        aria-label={favorite ? t('rescue.star.remove') : t('rescue.star.add')}
        data-testid={`star-${crew.id}`}
        className={cn(
          'absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-pill border transition-colors',
          favorite
            ? 'border-accent bg-accent-soft text-accent-ink'
            : 'border-transparent text-ink-muted hover:border-line hover:bg-surface-2 hover:text-ink',
        )}
      >
        <svg viewBox="0 0 24 24" className="size-4" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.6 9.7l5.8-.8z" strokeLinejoin="round" />
        </svg>
      </button>
    </article>
  );
}

export function CrewSearch({
  query,
  onQueryChange,
  market,
  onMarketChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  market: 'ALL' | 'KR' | 'US';
  onMarketChange: (value: 'ALL' | 'KR' | 'US') => void;
}) {
  const { t } = useI18n();
  const filters: { key: 'ALL' | 'KR' | 'US'; label: string }[] = [
    { key: 'ALL', label: t('rescue.filter.all') },
    { key: 'KR', label: t('rescue.filter.kr') },
    { key: 'US', label: t('rescue.filter.us') },
  ];

  return (
    <div className="rounded-lg border border-line bg-surface p-2.5 shadow-card">
      <label className="sr-only" htmlFor="crew-search">
        {t('rescue.search.label')}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
        <input
          id="crew-search"
          data-testid="crew-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t('rescue.search.placeholder')}
          className="w-full rounded-md border border-line bg-surface-2 py-2 pr-8 pl-8 text-[13px] text-ink placeholder:text-ink-muted focus:border-primary focus:bg-surface focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label={t('rescue.search.clear')}
            className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-pill p-1 text-ink-muted hover:text-ink"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mt-2 flex items-center gap-1.5" role="group" aria-label={t('rescue.filter.label')}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => onMarketChange(filter.key)}
            aria-pressed={market === filter.key}
            data-testid={`filter-${filter.key.toLowerCase()}`}
            className={cn(
              'rounded-pill border px-2.5 py-1 text-[11px] font-bold transition-colors',
              market === filter.key
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface-2 text-ink-soft hover:border-line-strong',
            )}
          >
            {filter.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-ink-muted">{t('rescue.search.hint')}</span>
      </div>
    </div>
  );
}
