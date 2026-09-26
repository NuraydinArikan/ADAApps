import React, { useState, useEffect } from 'react';
import { AppItem } from '../types';
import { 
  Sparkles, 
  X, 
  ArrowRight, 
  Bell, 
  CheckCircle2, 
  Layers, 
  ChevronRight,
  ExternalLink,
  Flame
} from 'lucide-react';

interface WhatsNewBannerProps {
  apps: AppItem[];
  onOpenAppDetails: (app: AppItem) => void;
  onOpenLiveDemo?: (app: AppItem) => void;
}

export const WhatsNewBanner: React.FC<WhatsNewBannerProps> = ({
  apps,
  onOpenAppDetails,
  onOpenLiveDemo
}) => {
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return localStorage.getItem('adaapps_whats_new_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  // Derive latest updates from apps
  const recentUpdates = [
    {
      appId: 'evdekihesap',
      tag: 'Öne Çıkan Güncelleme',
      title: 'Evdeki Hesap v109 Yayında',
      summary: '17 bağımsız ev modülü, Lemon Squeezy Pro lisansı ve Gemini destekli Mutfak Masası asistanı güncellendi.',
      badge: 'v109 Canlı',
      date: 'Ağustos 2026',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      appId: 'lesstoken',
      tag: 'Yeni Eklenen Ürün',
      title: 'LessToken Canlı Demo Eklendi',
      summary: 'Geliştiriciler için sıfır veri sızıntılı LLM token & maliyet bütçeleme aracı stüdyo vitrinine katıldı.',
      badge: 'Yeni PWA',
      date: 'Ağustos 2026',
      color: 'from-amber-500/20 via-orange-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      appId: 'guitarfriends',
      tag: 'Ses Sentezi Motoru',
      title: 'GuitarFriends Karplus-Strong Güncellemesi',
      summary: 'Gerçek zamanlı akustik gitar ve perküsyon senteziyle kamp ateşi ve arkadaş ortamı modu geliştirildi.',
      badge: 'v4.2',
      date: 'Temmuz 2026',
      color: 'from-amber-500/20 via-rose-500/10 to-transparent',
      borderColor: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    },
    {
      appId: 'haberverbana',
      tag: 'Gizlilik Odaklı',
      title: 'Haber Ver Bana: Algoritmasız Akış',
      summary: 'Tıklama tuzağı (clickbait) filtreleyen, bağımsız ve yerel haber okuma modülü yenilendi.',
      badge: 'Beta',
      date: 'Temmuz 2026',
      color: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    }
  ];

  // Rotate highlight item every 6 seconds if not hovered
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % recentUpdates.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [recentUpdates.length]);

  const currentUpdate = recentUpdates[activeHighlightIndex];
  const targetApp = apps.find((a) => a.id === currentUpdate.appId) || apps[0];

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('adaapps_whats_new_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const handleReopen = () => {
    setIsDismissed(false);
    try {
      localStorage.removeItem('adaapps_whats_new_dismissed');
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* If dismissed, show a small discreet sticky pill on bottom right or header trigger */}
      {isDismissed ? (
        <div className="flex justify-end mb-4 -mt-6">
          <button
            onClick={handleReopen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer shadow-sm backdrop-blur-md group"
            title="Son Güncellemeleri Göster"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span>Son Güncellemeler (What's New)</span>
          </button>
        </div>
      ) : (
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/95 via-indigo-950/20 to-slate-900/95 p-4 sm:p-5 shadow-xl backdrop-blur-md transition-all">
          {/* Subtle accent glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Tag + Headline + Rotating Info */}
            <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
              <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                <Flame className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Sparkles className="w-3 h-3" />
                    Son Güncellemeler
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${currentUpdate.badgeBg}`}>
                    {currentUpdate.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    • {currentUpdate.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate font-display">
                    {currentUpdate.title}
                  </h3>
                  <span className="text-xs text-slate-400 hidden lg:inline truncate">
                    — {currentUpdate.summary}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <button
                onClick={() => targetApp && onOpenAppDetails(targetApp)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition cursor-pointer hover:shadow-indigo-500/25"
              >
                <span>İncele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/80 transition cursor-pointer"
              >
                <span>Tüm Yenilikler</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 font-bold ml-0.5">
                  {recentUpdates.length}
                </span>
              </button>

              <button
                onClick={handleDismiss}
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
                title="Bildirimi Kapat"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick indicator dots for rotating updates */}
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-800/60">
            <span className="text-[11px] text-slate-500 font-mono mr-1">Son Değişiklikler:</span>
            {recentUpdates.map((item, idx) => (
              <button
                key={item.appId}
                onClick={() => setActiveHighlightIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  activeHighlightIndex === idx 
                    ? 'w-6 h-1.5 bg-indigo-400' 
                    : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={item.title}
              />
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive What's New Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    ADA APPS • Son Güncellemeler
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Bağımsız ürün stüdyomuzdaki en son sürüm lansmanları ve iyileştirmeler.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Updates List */}
            <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
              {recentUpdates.map((update) => {
                const appObj = apps.find((a) => a.id === update.appId);
                return (
                  <div
                    key={update.appId}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-indigo-400">
                          {update.tag}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400 font-mono">
                          {update.date}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ml-auto sm:ml-0 ${update.badgeBg}`}>
                          {update.badge}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {update.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                        {update.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {appObj && (
                        <button
                          onClick={() => {
                            setIsModalOpen(false);
                            onOpenAppDetails(appObj);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition cursor-pointer flex items-center gap-1"
                        >
                          <span>Detay</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {appObj && appObj.status === 'live' && onOpenLiveDemo && (
                        <button
                          onClick={() => {
                            setIsModalOpen(false);
                            onOpenLiveDemo(appObj);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-xs text-white font-semibold transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <span>Aç</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Tüm uygulamalar bağımsız PWA standartlarındadır.
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
