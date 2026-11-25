import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, Lock, Send, Star, Wrench } from 'lucide-react';
import type { ChatMessage, Crew } from '../../types';
import { messagesFor } from '../../data/messages';
import { cn } from '../../lib/cn';
import { useI18n } from '../../i18n';
import { usePersistentState } from '../../lib/usePersistentState';
import { CharacterAvatar } from '../ui/CharacterAvatar';
import { FloorBadgeChip } from '../ui/FloorBadgeChip';
import { Pill, SampleTag } from '../ui/Card';
import { ToolsPanel } from './ToolsPanel';
import { timeAgoLabel } from './CrewCard';

function nowLabel(): string {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function ChatRoom({
  crew,
  mindGuard,
  favorite,
  onToggleFavorite,
  onBack,
}: {
  crew: Crew;
  mindGuard: boolean;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
}) {
  const { t, l, lang } = useI18n();
  const [activeRoom, setActiveRoom] = useState(1);
  const [draft, setDraft] = useState('');
  const [localNotice, setLocalNotice] = useState<string | null>(null);
  const [notes, setNotes] = usePersistentState<ChatMessage[]>(`notes:${crew.id}`, []);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);

  const sampleMessages = useMemo(() => messagesFor(crew.id), [crew.id]);
  const messages = useMemo(() => [...sampleMessages, ...notes], [sampleMessages, notes]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    if (!localNotice) return;
    const timer = window.setTimeout(() => setLocalNotice(null), 3200);
    return () => window.clearTimeout(timer);
  }, [localNotice]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const message: ChatMessage = {
      id: `note-${Date.now()}`,
      crewId: crew.id,
      author: t('chat.you'),
      character: crew.character,
      badge: { type: 'rookie' },
      time: nowLabel(),
      text: { ko: text, en: text },
      kind: 'chat',
      localOnly: true,
    };
    setNotes((prev) => [...prev, message]);
    setDraft('');
    setLocalNotice(t('chat.sentLocally'));
  };

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_21.5rem] lg:items-start">
      <section className="flex h-[calc(100dvh-9.5rem)] min-h-[420px] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card lg:h-[calc(100dvh-17rem)] lg:min-h-[520px] lg:max-h-[860px]">
        {/* 방 헤더 */}
        <div className="border-b border-line bg-surface px-2.5 py-2.5 sm:px-4">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onBack}
              aria-label={t('rescue.back')}
              className="mt-1 rounded-pill p-1 text-ink-soft hover:bg-surface-2 lg:hidden"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <CharacterAvatar character={crew.character} size={38} className="mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-[15px] leading-tight font-black text-ink">{l(crew.name)}</h2>
                <span className="shrink-0 font-mono text-[10px] text-ink-muted">{crew.ticker}</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <Pill tone="primary">{crew.market === 'KR' ? t('rescue.filter.kr') : t('rescue.filter.us')}</Pill>
                <SampleTag />
                <span className="text-[10px] text-ink-muted">{t('rescue.rooms', { n: crew.rooms })}</span>
              </div>
              <p className="mt-1 truncate text-[10.5px] whitespace-nowrap text-ink-muted">
                {t('chat.participants', {
                  n: crew.membersSample.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US'),
                  online: crew.onlineSample,
                })}{' '}
                · {timeAgoLabel(crew.lastActivityMinutes, t)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => onToggleFavorite(crew.id)}
                aria-pressed={favorite}
                aria-label={favorite ? t('rescue.star.remove') : t('rescue.star.add')}
                className={cn(
                  'grid size-8 place-items-center rounded-pill border',
                  favorite
                    ? 'border-accent bg-accent-soft text-accent-ink'
                    : 'border-line bg-surface text-ink-muted hover:text-ink',
                )}
              >
                <Star className="size-4" fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                aria-label={t('chat.toolsLabel')}
                data-testid="open-tools"
                className="grid size-8 place-items-center rounded-pill border border-line bg-surface text-ink-soft hover:text-ink lg:hidden"
              >
                <Wrench className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold tracking-wide text-ink-muted">{t('chat.roomsLabel')}</span>
            {Array.from({ length: crew.rooms }, (_, index) => index + 1).map((room) => (
              <button
                key={room}
                type="button"
                onClick={() => setActiveRoom(room)}
                aria-pressed={activeRoom === room}
                className={cn(
                  'rounded-pill border px-2 py-0.5 text-[10.5px] font-bold',
                  activeRoom === room
                    ? 'border-primary bg-primary-soft text-primary'
                    : 'border-line bg-surface-2 text-ink-muted hover:text-ink',
                )}
              >
                {t('chat.roomNumber', { n: room })}
              </button>
            ))}
            <span className="hidden text-[10px] text-ink-muted sm:inline">{t('chat.roomHint')}</span>
          </div>
        </div>

        {/* 샘플 대화 안내 */}
        <div className="flex items-start gap-2 border-b border-accent/30 bg-accent-soft/50 px-3 py-2 sm:px-4">
          <Lock className="mt-0.5 size-3.5 shrink-0 text-accent-ink" aria-hidden="true" />
          <p className="text-[11px] leading-relaxed text-accent-ink">
            <span className="font-bold">{t('chat.sampleBanner')}</span>
            <span className="ml-1 text-accent-ink/85">{t('chat.sampleBannerBody')}</span>
          </p>
        </div>

        {mindGuard && (
          <div className="border-b border-primary-line bg-primary-soft/60 px-3 py-1.5 text-[11px] font-semibold text-primary sm:px-4">
            {t('chat.mindGuardBanner')}
          </div>
        )}

        {/* 대화 */}
        <div ref={scrollRef} className="yc-scroll flex-1 space-y-3 overflow-y-auto bg-surface-2/40 px-3 py-3 sm:px-4" data-testid="chat-messages">
          {messages.map((message) =>
            message.kind === 'system' ? (
              <p key={message.id} className="mx-auto max-w-md rounded-pill bg-surface px-3 py-1 text-center text-[10.5px] text-ink-muted">
                <span className="sr-only">{t('chat.systemLabel')}: </span>
                {l(message.text)}
              </p>
            ) : (
              <MessageRow key={message.id} message={message} mindGuard={mindGuard} mine={Boolean(message.localOnly)} />
            ),
          )}
        </div>

        {/* 입력 */}
        <div className="border-t border-line bg-surface px-2.5 py-2 sm:px-3">
          <form
            className="flex items-center gap-1.5"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <label className="sr-only" htmlFor="chat-input">
              {t('chat.placeholder')}
            </label>
            <input
              id="chat-input"
              data-testid="chat-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t('chat.placeholder')}
              className="min-w-0 flex-1 rounded-pill border border-line bg-surface-2 px-3.5 py-2.5 text-[13px] text-ink placeholder:text-ink-muted focus:border-primary focus:bg-surface focus:outline-none"
            />
            <button
              type="submit"
              data-testid="chat-send"
              disabled={!draft.trim()}
              aria-label={t('chat.send')}
              className="grid size-10 shrink-0 place-items-center rounded-pill bg-primary text-white disabled:bg-line-strong disabled:text-white/80"
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          </form>
          <p className="mt-1 flex items-center gap-1 px-1 text-[10px] text-ink-muted" aria-live="polite">
            <Lock className="size-2.5" aria-hidden="true" />
            {localNotice ?? t('chat.localNote')}
          </p>
        </div>
      </section>

      <aside ref={toolsRef} id="crew-tools" className="min-w-0 scroll-mt-20">
        <ToolsPanel crew={crew} mindGuard={mindGuard} />
      </aside>
    </div>
  );
}

function MessageRow({ message, mindGuard, mine }: { message: ChatMessage; mindGuard: boolean; mine: boolean }) {
  const { t, l } = useI18n();

  if (mine) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%]">
          <div className="mb-0.5 flex items-center justify-end gap-1 text-[10px] text-ink-muted">
            <span>{message.time}</span>
            <span className="rounded-pill bg-surface px-1.5 py-0.5 text-[9.5px] font-bold text-ink-soft">
              {t('chat.localNote')}
            </span>
          </div>
          <div className="rounded-lg rounded-tr-sm border border-primary-line bg-primary-soft px-3 py-2 text-[12.5px] leading-relaxed whitespace-pre-wrap text-ink">
            {l(message.text)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <CharacterAvatar character={message.character} size={30} />
      <div className="min-w-0 max-w-[86%]">
        <div className="mb-1 flex flex-wrap items-center gap-1">
          <span className="text-[11px] font-bold text-ink">{message.author}</span>
          <FloorBadgeChip badge={message.badge} mindGuard={mindGuard} />
        </div>
        <div className="flex items-end gap-1.5">
          <div className="rounded-lg rounded-tl-sm border border-line bg-surface px-3 py-2 text-[12.5px] leading-relaxed whitespace-pre-wrap text-ink">
            {l(message.text)}
          </div>
          <span className="shrink-0 pb-0.5 text-[9.5px] text-ink-muted">{message.time}</span>
        </div>
        {message.reactions && message.reactions.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {message.reactions.map((reaction) => (
              <span
                key={reaction.emoji}
                className="inline-flex items-center gap-1 rounded-pill border border-line bg-surface px-1.5 py-0.5 text-[10px] text-ink-soft"
              >
                <span aria-hidden="true">{reaction.emoji}</span>
                <span className="tabular-nums">{reaction.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
