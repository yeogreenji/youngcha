import { useState } from 'react';
import { Calculator, HeartHandshake, Newspaper, Wrench } from 'lucide-react';
import type { Crew } from '../../types';
import { newsBriefs } from '../../data/news';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import { SampleTag } from '../ui/Card';
import { CheerPanel } from './CheerPanel';
import { ElevatorCalculator } from './ElevatorCalculator';

type ToolKey = 'cheer' | 'calculator' | 'news';

/** 구조대 도구 모음 — 응원 / 평단가 엘리베이터 / 세 줄 뉴스 */
export function ToolsPanel({ crew, mindGuard }: { crew: Crew; mindGuard: boolean }) {
  const { t } = useI18n();
  const [tool, setTool] = useState<ToolKey>('cheer');

  const tabs: { key: ToolKey; label: string; icon: typeof Calculator }[] = [
    { key: 'cheer', label: t('chat.tools.cheerShort'), icon: HeartHandshake },
    { key: 'calculator', label: t('chat.tools.calcShort'), icon: Calculator },
    { key: 'news', label: t('chat.tools.newsShort'), icon: Newspaper },
  ];

  return (
    <div className="rounded-lg border border-line bg-surface shadow-card">
      <div className="border-b border-line p-2.5">
        <p className="flex items-center gap-1.5 text-[10.5px] font-black tracking-wide text-ink-muted">
          <Wrench className="size-3.5" aria-hidden="true" />
          {t('chat.toolsLabel')}
        </p>
        <div
          role="tablist"
          aria-label={t('chat.toolsLabel')}
          className="mt-1.5 grid grid-cols-3 gap-1 rounded-pill bg-surface-2 p-1"
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tool === key}
              data-testid={`tool-${key}`}
              onClick={() => setTool(key)}
              className={cn(
                'flex items-center justify-center gap-1 rounded-pill px-1.5 py-1.5 text-[10.5px] font-bold transition-colors',
                tool === key ? 'bg-surface text-primary shadow-card' : 'text-ink-muted hover:text-ink',
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-2.5" role="tabpanel">
        {tool === 'cheer' && <CheerPanel crew={crew} />}
        {tool === 'calculator' && <ElevatorCalculator crew={crew} mindGuard={mindGuard} />}
        {tool === 'news' && <NewsPanel />}
      </div>
    </div>
  );
}

function NewsPanel() {
  const { t, l } = useI18n();
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[13px] font-black text-ink">{t('compass.news.title')}</h3>
        <SampleTag label={t('compass.news.sample')} />
      </div>
      <p className="mt-1 text-[10.5px] leading-relaxed text-ink-muted">{t('compass.news.body')}</p>

      <div className="mt-2 space-y-2">
        {newsBriefs.map((brief) => (
          <article key={brief.id} className="rounded-md border border-line bg-surface-2/60 p-2.5">
            <p className="text-[10.5px] font-bold text-primary">{l(brief.topic)}</p>
            <ul className="mt-1 space-y-1">
              {brief.lines.map((line, index) => (
                <li key={index} className="flex gap-1.5 text-[11px] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-0.5 size-1 shrink-0 rounded-pill bg-line-strong" />
                  {l(line)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
