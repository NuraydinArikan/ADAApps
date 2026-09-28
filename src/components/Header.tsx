import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Sliders, 
  Search, 
  Download, 
  Smartphone, 
  Compass, 
  ExternalLink,
  Sun,
  Moon,
  Contrast,
  GraduationCap
} from 'lucide-react';
import { AdaAppsLogo } from './AdaAppsLogo';
import { ThemeMode } from '../types';

interface HeaderProps {
  onOpenStory: () => void;
  onOpenCreatorStudio: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInstallPwa?: () => void;
  canInstallPwa?: boolean;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  favoritesCount?: number;
  isFavoritesActive?: boolean;
  onOpenFavorites?: () => void;
  onOpenSentinel?: () => void;
  onOpenAbout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenStory,
  onOpenCreatorStudio,
  searchQuery,
  onSearchChange,
  onInstallPwa,
  canInstallPwa,
  theme,
  onThemeChange,
  favoritesCount = 0,
  isFavoritesActive = false,
  onOpenFavorites,
  onOpenSentinel,
  onOpenAbout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Origin Tag */}
        <AdaAppsLogo
          size="md"
          variant="full"
          showSubtitle={true}
          subtitleText="Bağımsız Web Uygulamaları & PWA Vitrini"
          onClick={onOpenStory}
        />

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Uygulama veya teknoloji ara..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle (Dark / Light / Reverse) */}
          <div 
            className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-xs" 
            role="group" 
            aria-label="Tema Seçimi"
          >
            <button
              onClick={() => onThemeChange('dark')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1 ${
                theme === 'dark'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Koyu Tema (Kozmik Gradyen & Ağ Deseni)"
              aria-label="Koyu Tema"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Koyu</span>
            </button>

            <button
              onClick={() => onThemeChange('light')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1 ${
                theme === 'light'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Açık Tema (Aydınlık Slate-50)"
              aria-label="Açık Tema"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Açık</span>
            </button>

            <button
              onClick={() => onThemeChange('reverse')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1 ${
                theme === 'reverse'
                  ? 'bg-zinc-100 text-black shadow-xs font-bold border border-yellow-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Ters Kontrast (Zifiri Siyah & Keskin Hatlar)"
              aria-label="Ters Kontrast"
            >
              <Contrast className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Ters</span>
            </button>
          </div>

          {/* Favorilerim Hızlı Butonu */}
          {onOpenFavorites && (
            <button
              onClick={onOpenFavorites}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 border rounded-xl text-xs font-semibold transition cursor-pointer ${
                isFavoritesActive
                  ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Favorilerim Filtresine Git"
              aria-label="Favorilerim"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavoritesActive || favoritesCount > 0 ? 'text-rose-400 fill-rose-500' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Favorilerim</span>
              {favoritesCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isFavoritesActive ? 'bg-white text-rose-600' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {/* Ada Sentinel Status & Synthetic Monitoring Button */}
          {onOpenSentinel && (
            <button
              onClick={onOpenSentinel}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
              title="Sistem Durumu & 7/24 Sentetik İzleme Paneli"
              aria-label="Sistem Durumu"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden lg:inline text-[11px]">Sistem Durumu</span>
            </button>
          )}

          {/* About / Hakkında Button */}
          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
              title="ADAApps Hakkında & İletişim"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Hakkında</span>
            </button>
          )}

          {/* Heart Story Button */}
          <button
            onClick={onOpenStory}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
            title="Stüdyo Manifestosu & Felsefesi"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span className="hidden sm:inline">Stüdyo Felsefesi</span>
          </button>

          {/* In-app PWA install trigger if available */}
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vitrini Yükle</span>
            </button>
          )}

          {/* Creator Studio Mode */}
          <button
            onClick={onOpenCreatorStudio}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-semibold transition cursor-pointer"
            title="Geliştirici Yönetim Paneli"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Stüdyo Paneli</span>
          </button>
        </div>
      </div>
    </header>
  );
};
