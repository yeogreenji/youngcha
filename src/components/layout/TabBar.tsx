import { Compass, MessagesSquare } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import type { TabKey } from './AppHeader';

/** 모바일 하단 탭 — 엄지로 닿는 위치에 두 화면만 둡니다. */
export function TabBar({ tab, onTabChange }: { tab: TabKey; onTabChange: (tab: TabKey) => void }) {
  const { t } = useI18n();

  const items: { key: TabKey; label: string; icon: typeof Compass }[] = [
    { key: 'rescue', label: t('tab.rescueShort'), icon: MessagesSquare },
    { key: 'compass', label: t('tab.compassShort'), icon: Compass },
  ];

  return (
    <nav
      aria-label={t('nav.label')}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-2">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            aria-current={tab === key ? 'page' : undefined}
            data-testid={`tabbar-${key}`}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition-colors',
              tab === key ? 'text-primary' : 'text-ink-muted',
            )}
          >
            <Icon className={cn('size-5', tab === key && 'stroke-[2.4]')} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
