import { Compass, MessagesSquare, ShieldCheck, ShieldOff } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';

export type TabKey = 'rescue' | 'compass';

export function AppHeader({
  tab,
  onTabChange,
  mindGuard,
  onToggleMindGuard,
}: {
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  mindGuard: boolean;
  onToggleMindGuard: () => void;
}) {
  const { t, lang, setLang } = useI18n();

  const tabs: { key: TabKey; label: string; icon: typeof MessagesSquare }[] = [
    { key: 'rescue', label: t('tab.rescue'), icon: MessagesSquare },
    { key: 'compass', label: t('tab.compass'), icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-accent shadow-card"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17c2.4 2 5.2 3 8 3s5.6-1 8-3" />
              <path d="M12 4v10" />
              <path d="M8 8l4-4 4 4" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[17px] leading-none font-black tracking-tight text-ink">{t('app.name')}</span>
              <span className="hidden text-[10px] font-bold tracking-[0.14em] text-ink-muted sm:inline">
                {t('app.nameEn')}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[11px] leading-tight text-ink-muted">{t('app.tagline')}</p>
          </div>
        </div>

        {/* 데스크톱 탭 */}
        <nav aria-label={t('nav.label')} className="ml-4 hidden items-center gap-1 rounded-pill border border-line bg-surface-2 p-1 md:flex">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              aria-current={tab === key ? 'page' : undefined}
              data-testid={`tab-${key}`}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[13px] font-bold transition-colors',
                tab === key ? 'bg-primary text-white shadow-card' : 'text-ink-soft hover:bg-surface hover:text-ink',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleMindGuard}
            aria-pressed={mindGuard}
            aria-label={mindGuard ? t('app.mindGuardOnAria') : t('app.mindGuardOffAria')}
            data-testid="mind-guard"
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-pill border px-2 py-1.5 text-[11px] font-bold whitespace-nowrap transition-colors',
              mindGuard
                ? 'border-primary bg-primary-soft text-primary'
                : 'border-line bg-surface text-ink-muted hover:text-ink',
            )}
          >
            {mindGuard ? <ShieldCheck className="size-4" aria-hidden="true" /> : <ShieldOff className="size-4" aria-hidden="true" />}
            <span className="hidden whitespace-nowrap sm:inline">{t('app.mindGuard')}</span>
            <span className={cn('rounded-pill px-1.5 py-0.5 text-[10px] whitespace-nowrap', mindGuard ? 'bg-primary text-white' : 'bg-surface-2 text-ink-muted')}>
              {mindGuard ? t('app.mindGuardOn') : t('app.mindGuardOff')}
            </span>
          </button>

          <div
            role="group"
            aria-label={t('app.langLabel')}
            className="flex items-center rounded-pill border border-line bg-surface p-0.5"
          >
            {(['ko', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                data-testid={`lang-${code}`}
                className={cn(
                  'rounded-pill px-2 py-1 text-[11px] font-bold',
                  lang === code ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink',
                )}
              >
                {code === 'ko' ? 'KO' : 'EN'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
