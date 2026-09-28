import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Smartphone, Sparkles, Activity, GraduationCap } from 'lucide-react';
import { LiveAppsTicker } from './LiveAppsTicker';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
  onAboutClick?: () => void;
  totalAppsCount: number;
  liveAppsCount: number;
  onToggleMinimalView?: () => void;
  onOpenSentinel?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onStoryClick,
  onAboutClick,
  liveAppsCount,
  onToggleMinimalView,
  onOpenSentinel
}) => {
  return (
    <div className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Sade Görünüm Geçiş Butonu */}
        {onToggleMinimalView && (
          <div className="mb-4">
            <button
              onClick={onToggleMinimalView}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 hover:from-indigo-500/30 hover:to-pink-500/30 border border-indigo-500/40 text-xs sm:text-sm font-semibold text-indigo-200 hover:text-white transition-all transform hover:scale-105 shadow-md cursor-pointer group"
              title="Sadece uygulama kutucuklarını görmek için tıklayın"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
              <span>ADAApps'i en sade haliyle görmek istiyorsan buraya tıkla!</span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Origin & Status Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Bağımsız Uygulama Stüdyosu & Doğrudan Dağıtım</span>
            <span className="text-slate-600">•</span>
            <button
              onClick={onAboutClick || onStoryClick}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              ADAApps Hakkında
            </button>
          </div>

          {onOpenSentinel && (
            <button
              onClick={onOpenSentinel}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-500/30 text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer shadow-sm group"
              title="Ada Sentinel 7/24 Sentetik İzleme ve Canlı Teşhis Paneli"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold">Sistem Durumu:</span>
              <span>Tüm Servisler Operasyonel (%100)</span>
              <Activity className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </button>
          )}
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
          Kullanıcının hayatını kolaylaştıracak,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            güvenli, yer kaplamayan ve bağımsız uygulamalar
          </span>
        </h1>

        {/* Hero Description */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Alıştığınız uygulama platformlarından bağımsız ürünleri PWA standartlarıyla doğrudan cihazınıza kurun.
        </p>

        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>PWA ile Doğrudan Kurulum</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Şeffaf Veri Mimarisi</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>iOS, Android & Masaüstü Uyumlu</span>
          </div>
        </div>

        {/* Live Apps Running Ribbon (Right to Left Ticker with Centered Yellow Highlight) */}
        <LiveAppsTicker />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Kataloğu İncele ({liveAppsCount} Canlı Ürün)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onAboutClick && (
            <button
              onClick={onAboutClick}
              className="w-full sm:w-auto px-5 py-3 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-200 hover:text-white font-semibold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>ADAApps Hakkında</span>
            </button>
          )}

          <button
            onClick={onStoryClick}
            className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Stüdyo Felsefesi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
