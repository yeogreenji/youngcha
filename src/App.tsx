import { useEffect, useState } from 'react';
import { I18nProvider, useI18n } from './i18n';
import { AppHeader, type TabKey } from './components/layout/AppHeader';
import { TabBar } from './components/layout/TabBar';
import { SampleNotice } from './components/layout/SampleNotice';
import { RescueScreen } from './components/rescue/RescueScreen';
import { CompassScreen } from './components/compass/CompassScreen';
import { usePersistentState } from './lib/usePersistentState';
import { readStored, writeStored, STORAGE_KEYS } from './lib/storage';
import { fetchHealth } from './api/client';
import type { Lang } from './types';

type ApiStatus = 'checking' | 'ok' | 'off';

export default function App() {
  const initialLang = readStored<Lang>(STORAGE_KEYS.lang, 'ko');
  return (
    <I18nProvider initialLang={initialLang}>
      <Shell />
    </I18nProvider>
  );
}

function Shell() {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<TabKey>('rescue');
  const [selectedCrewId, setSelectedCrewId] = useState<string | null>(null);
  const [favorites, setFavorites] = usePersistentState<string[]>(STORAGE_KEYS.favorites, []);
  const [mindGuard, setMindGuard] = usePersistentState<boolean>(STORAGE_KEYS.mindGuard, false);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking');

  useEffect(() => {
    writeStored(STORAGE_KEYS.lang, lang);
  }, [lang]);

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal).then((health) => {
      setApiStatus(health?.ok ? 'ok' : 'off');
    });
    return () => controller.abort();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const openCrew = (id: string) => {
    setSelectedCrewId(id);
    setTab('rescue');
  };

  const changeTab = (next: TabKey) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const apiLabel =
    apiStatus === 'ok' ? t('api.status.ok') : apiStatus === 'checking' ? t('api.status.checking') : t('api.status.off');

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <AppHeader tab={tab} onTabChange={changeTab} mindGuard={mindGuard} onToggleMindGuard={() => setMindGuard(!mindGuard)} />

      <main className="mx-auto w-full max-w-[1240px] flex-1 px-3 pt-4 pb-6 sm:px-5 lg:pb-8">
        <div className={tab === 'rescue' && selectedCrewId ? 'hidden lg:block' : undefined}>
          <SampleNotice open={noticeOpen} onToggle={() => setNoticeOpen((prev) => !prev)} />
        </div>

        {tab === 'rescue' ? (
          <RescueScreen
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            mindGuard={mindGuard}
            selectedCrewId={selectedCrewId}
            onSelectCrew={setSelectedCrewId}
          />
        ) : (
          <CompassScreen favorites={favorites} onOpenCrew={openCrew} />
        )}
      </main>

      <footer className="mt-auto border-t border-line bg-surface/60 pb-24 md:pb-6">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-1 px-4 py-5 sm:px-5">
          <p className="text-[10.5px] leading-relaxed text-ink-soft">{t('notice.footer')}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-pill ${apiStatus === 'ok' ? 'bg-success' : apiStatus === 'checking' ? 'bg-accent-strong' : 'bg-line-strong'}`}
              />
              {apiLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t('app.tagline')}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">v0.1.0 · skeleton</span>
          </p>
        </div>
      </footer>

      <TabBar tab={tab} onTabChange={changeTab} />
    </div>
  );
}
