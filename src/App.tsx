import React, { useState, useEffect, useMemo } from 'react';
import { AppItem, AppPlatform, AppCategory, ThemeMode } from './types';
import { INITIAL_APPS } from './data/appsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AppCard } from './components/AppCard';
import { AppModal } from './components/AppModal';
import { AppDetailPage } from './components/AppDetailPage';
import { QRCodeModal } from './components/QRCodeModal';
import { WaitlistModal } from './components/WaitlistModal';
import { AdaStoryModal } from './components/AdaStoryModal';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { LiveDemoDrawer } from './components/LiveDemoDrawer';
import { WhatsNewBanner } from './components/WhatsNewBanner';
import { WhyPwaSection } from './components/WhyPwaSection';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Smartphone, 
  Layers, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Heart,
  TrendingUp,
  RotateCcw,
  Monitor,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Apps state with LocalStorage persistence and auto-migration
  const [apps, setApps] = useState<AppItem[]>(() => {
    try {
      const saved = localStorage.getItem('adaapps_catalog_v4');
      if (saved) return JSON.parse(saved);
      // Clean up old catalog versions
      localStorage.removeItem('adaapps_catalog');
      localStorage.removeItem('adaapps_catalog_v2');
      localStorage.removeItem('adaapps_catalog_v3');
    } catch {
      // fallback
    }
    return INITIAL_APPS;
  });

  const handleSaveApps = (updated: AppItem[]) => {
    setApps(updated);
    try {
      localStorage.setItem('adaapps_catalog_v4', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetApps = () => {
    setApps(INITIAL_APPS);
    try {
      localStorage.removeItem('adaapps_catalog_v4');
      localStorage.removeItem('adaapps_catalog_v3');
      localStorage.removeItem('adaapps_catalog_v2');
      localStorage.removeItem('adaapps_catalog');
    } catch {
      // ignore
    }
  };

  // Theme state with local persistence: 'dark' (slate-950), 'light' (slate-50), or 'reverse'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem('adaapps_theme') as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'reverse' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('adaapps_theme', theme);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('theme-dark', 'theme-light', 'theme-reverse');
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals state
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [qrApp, setQrApp] = useState<AppItem | null>(null);
  const [waitlistApp, setWaitlistApp] = useState<AppItem | null>(null);
  const [demoApp, setDemoApp] = useState<AppItem | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // URL routing state for Individual Product Pages
  const parseAppSlugFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (path.startsWith('app/')) {
      return path.replace('app/', '');
    }
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?(app\/)?/, '');
      if (hash) return hash;
    }
    const params = new URLSearchParams(window.location.search);
    const qApp = params.get('app');
    if (qApp) return qApp;
    if (path && path !== '' && path !== 'index.html') {
      return path;
    }
    return null;
  };

  const [routeSlug, setRouteSlug] = useState<string | null>(() => parseAppSlugFromUrl());

  const activeRouteApp = useMemo(() => {
    if (!routeSlug) return null;
    return apps.find((a) => a.id.toLowerCase() === routeSlug.toLowerCase()) || null;
  }, [apps, routeSlug]);

  useEffect(() => {
    const handlePopState = () => {
      setRouteSlug(parseAppSlugFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (activeRouteApp) {
      document.title = `${activeRouteApp.name} - ADA APPS`;
    } else {
      document.title = 'ADA APPS - Kişisel Uygulama Mağazası & Ürün Stüdyosu';
    }
  }, [activeRouteApp]);

  const handleNavigateToApp = (app: AppItem) => {
    try {
      window.history.pushState({}, '', `/app/${app.id}`);
    } catch {
      window.location.hash = `/app/${app.id}`;
    }
    setRouteSlug(app.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    try {
      window.history.pushState({}, '', '/');
    } catch {
      window.location.hash = '';
    }
    setRouteSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // In-app PWA install prompt handler
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setCanInstallPwa(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

  // Filtered apps logic
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        app.name.toLowerCase().includes(query) ||
        app.tagline.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.problem.toLowerCase().includes(query) ||
        app.solution.toLowerCase().includes(query) ||
        app.techStack.some((t) => t.toLowerCase().includes(query));

      // Platform match
      let matchesPlatform = true;
      if (selectedPlatform === 'pwa') {
        matchesPlatform = app.platform === 'pwa';
      } else if (selectedPlatform === 'desktop') {
        matchesPlatform = app.platform === 'desktop';
      } else if (selectedPlatform === 'chrome_extension') {
        matchesPlatform = app.platform === 'chrome_extension';
      } else if (selectedPlatform === 'live') {
        matchesPlatform = app.status === 'live';
      } else if (selectedPlatform === 'upcoming') {
        matchesPlatform = app.status === 'in_development' || app.status === 'concept' || app.status === 'beta';
      }

      // Category match
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        matchesCategory = app.category === selectedCategory;
      }

      return matchesSearch && matchesPlatform && matchesCategory;
    });
  }, [apps, searchQuery, selectedPlatform, selectedCategory]);

  const liveAppsCount = useMemo(() => apps.filter((a) => a.status === 'live').length, [apps]);

  const scrollToExplore = () => {
    const el = document.getElementById('explore-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-slate-50 text-slate-900 theme-light'
        : theme === 'reverse'
        ? 'bg-black text-white theme-reverse'
        : 'bg-slate-950 text-slate-100 theme-dark'
    }`}>
      {/* Top Navigation */}
      <Header
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenCreatorStudio={() => setIsCreatorOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onInstallPwa={handleInstallPwa}
        canInstallPwa={canInstallPwa}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeRouteApp ? (
          <div className="py-6">
            <AppDetailPage
              app={activeRouteApp}
              onBack={handleBackToCatalog}
              onOpenQr={(a) => setQrApp(a)}
              onOpenWaitlist={(a) => setWaitlistApp(a)}
              onOpenLiveDemo={(a) => setDemoApp(a)}
            />
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onExploreClick={scrollToExplore}
              onStoryClick={() => setIsStoryOpen(true)}
              totalAppsCount={apps.length}
              liveAppsCount={liveAppsCount}
            />

        {/* Studio Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl mb-12 text-center text-xs">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {apps.length} Ürün
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">Stüdyo Portföyü</div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">
              {liveAppsCount} Canlı / Beta
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">Aktif Kullanıma Açık</div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-display">
              PWA
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">Doğrudan Web Dağıtımı</div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-pink-400 font-display">
              Şeffaf
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">Veri & Gizlilik Mimarisi</div>
          </div>
        </div>

        {/* What's New Notification Bar */}
        <WhatsNewBanner
          apps={apps}
          onOpenAppDetails={(app) => {
            if (handleNavigateToApp) {
              handleNavigateToApp(app);
            } else {
              setSelectedApp(app);
            }
          }}
          onOpenLiveDemo={(app) => setDemoApp(app)}
        />

        {/* Catalog Header & Filters */}
        <div id="explore-catalog" className="scroll-mt-24 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
                <span>ADA APPS Vitrini</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {filteredApps.length} Uygulama
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                İhtiyacınıza uygun uygulamayı seçin, anında kullanmaya başlayın veya ana ekranınıza kurun.
              </p>
            </div>

            {/* Mobile Search input */}
            <div className="md:hidden relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Uygulama ara..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-3">
            {/* Platform Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap ${
                  selectedPlatform === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Tümü ({apps.length})
              </button>

              <button
                onClick={() => setSelectedPlatform('live')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedPlatform === 'live'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Canlı Yayınlananlar ({apps.filter((a) => a.status === 'live').length})</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('pwa')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedPlatform === 'pwa'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>PWA ({apps.filter((a) => a.platform === 'pwa').length})</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('desktop')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedPlatform === 'desktop'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Masaüstü / Windows ({apps.filter((a) => a.platform === 'desktop').length})</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('chrome_extension')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedPlatform === 'chrome_extension'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Tarayıcı Eklentisi ({apps.filter((a) => a.platform === 'chrome_extension').length})</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('upcoming')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedPlatform === 'upcoming'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Geliştirilen / Prototip ({apps.filter((a) => a.status !== 'live').length})</span>
              </button>
            </div>

            {/* Category Secondary Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1">
              <span className="text-slate-500 font-medium mr-1 hidden sm:inline">Kategori:</span>
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'finance', label: 'Ev & Bütçe' },
                { id: 'music', label: 'Müzik & Eşlik' },
                { id: 'security', label: 'Güvenlik & Kalkan' },
                { id: 'alerts', label: 'Takip & Alarm' },
                { id: 'journalism', label: 'Medya & Doğrulama' },
                { id: 'therapy', label: 'Terapi & Akran Destek' },
                { id: 'ai_tools', label: 'Yapay Zeka & LLM' },
                { id: 'loyalty', label: 'Sadakat & Cüzdan' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 bg-slate-950/60 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              {(searchQuery || selectedPlatform !== 'all' || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPlatform('all');
                    setSelectedCategory('all');
                  }}
                  className="ml-auto text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Filtreleri Temizle</span>
                </button>
              )}
            </div>
          </div>
        </div>

            {/* Application Cards Grid */}
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onOpenDetails={(a) => setSelectedApp(a)}
                    onOpenQR={(a) => setQrApp(a)}
                    onOpenWaitlist={(a) => setWaitlistApp(a)}
                    onLaunchInteractiveDemo={(a) => setDemoApp(a)}
                    onNavigateToPage={(a) => handleNavigateToApp(a)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto">
                <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Aramanızla Eşleşen Uygulama Bulunamadı</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Farklı bir arama terimi deneyebilir veya filtreleri sıfırlayabilirsiniz.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPlatform('all');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Tüm Uygulamaları Göster
                </button>
              </div>
            )}

            {/* Why PWA / Distribution Manifesto Section */}
            <WhyPwaSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenCreatorStudio={() => setIsCreatorOpen(true)}
      />

      {/* Modals & Drawers */}
      <AppModal
        app={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onOpenWaitlist={(a) => {
          setSelectedApp(null);
          setWaitlistApp(a);
        }}
        onOpenQR={(a) => {
          setSelectedApp(null);
          setQrApp(a);
        }}
        onNavigateToPage={(a) => {
          setSelectedApp(null);
          handleNavigateToApp(a);
        }}
      />

      <QRCodeModal
        app={qrApp}
        isOpen={!!qrApp}
        onClose={() => setQrApp(null)}
      />

      <WaitlistModal
        app={waitlistApp}
        isOpen={!!waitlistApp}
        onClose={() => setWaitlistApp(null)}
      />

      <AdaStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      <CreatorStudioModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        apps={apps}
        onSaveApps={handleSaveApps}
        onResetApps={handleResetApps}
      />

      <LiveDemoDrawer
        app={demoApp}
        isOpen={!!demoApp}
        onClose={() => setDemoApp(null)}
        onOpenDetails={(a) => setSelectedApp(a)}
        onOpenQR={(a) => setQrApp(a)}
      />
    </div>
  );
}
