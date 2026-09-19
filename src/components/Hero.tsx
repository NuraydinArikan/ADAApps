import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart, Smartphone } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
  totalAppsCount: number;
  liveAppsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onStoryClick,
  totalAppsCount,
  liveAppsCount
}) => {
  return (
    <div className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Origin Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 mb-5 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
          <span>Şeffaf ve bağımsız yazılımlar geliştiren dijital stüdyo</span>
          <span className="text-slate-600">•</span>
          <button
            onClick={onStoryClick}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2"
          >
            Stüdyo Manifestosu
          </button>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
          Bağımsız Uygulamalar İçin{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Kişisel Bir Dağıtım Vitrini
          </span>
        </h1>

        {/* Hero Description */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Apple App Store ve Google Play'in %30 kesintilerine ve haftalar süren onay bürokrasisine takılmadan;{' '}
          <strong className="text-white font-medium">evdekihesap.app</strong>,{' '}
          <strong className="text-white font-medium">haberverbana.app</strong> ve{' '}
          <strong className="text-white font-medium">LessToken</strong> gibi projeleri doğrudan cihazınıza tek tıkla kurun.
        </p>

        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>PWA ile Doğrudan Kurulum</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>%100 Yerel Veri Gizliliği</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>iOS, Android & Masaüstü</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Uygulamaları Keşfet ({liveAppsCount} Canlı)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStoryClick}
            className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>Stüdyo Felsefesi & Manifestosu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
