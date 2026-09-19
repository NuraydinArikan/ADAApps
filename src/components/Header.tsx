import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Sliders, 
  Search, 
  Download, 
  Smartphone, 
  Compass, 
  ExternalLink 
} from 'lucide-react';
import { AdaAppsLogo } from './AdaAppsLogo';

interface HeaderProps {
  onOpenStory: () => void;
  onOpenCreatorStudio: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInstallPwa?: () => void;
  canInstallPwa?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenStory,
  onOpenCreatorStudio,
  searchQuery,
  onSearchChange,
  onInstallPwa,
  canInstallPwa
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
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
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Heart Story Button */}
          <button
            onClick={onOpenStory}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
            title="Stüdyo Manifestosu & Felsefesi"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span className="hidden sm:inline">Stüdyo Felsefesi</span>
          </button>

          {/* In-app PWA install trigger if available */}
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Vitrini Yükle</span>
            </button>
          )}

          {/* Creator Studio Mode */}
          <button
            onClick={onOpenCreatorStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-semibold transition cursor-pointer"
            title="Geliştirici Yönetim Paneli"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stüdyo Paneli</span>
          </button>
        </div>
      </div>
    </header>
  );
};
