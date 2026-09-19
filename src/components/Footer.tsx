import React from 'react';
import { Heart, ShieldCheck, Sparkles, Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import { AdaAppsLogo } from './AdaAppsLogo';

interface FooterProps {
  onOpenStory: () => void;
  onOpenCreatorStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStory, onOpenCreatorStudio }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand & Tribute */}
        <div className="md:col-span-2 space-y-3">
          <AdaAppsLogo
            size="md"
            variant="full"
            onClick={onOpenStory}
          />

          <p className="text-slate-400 max-w-md leading-relaxed text-xs">
            Bağımsız bir dijital ürün stüdyosu. Şeffaf, reklamsız, gizlilik odaklı ve modern web standartlarıyla doğrudan dağıtılan zanaatkar yazılımlar.
          </p>

          <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kullanıcı odaklı, hafif ve temiz bir internet arzusuyla.</span>
          </div>
        </div>

        {/* Quick Nav */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-slate-300 text-[11px] mb-3">
            Stüdyo & Keşif
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onOpenStory}
                className="hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                <span>Stüdyo Manifestosu & İlkeler</span>
              </button>
            </li>
            <li>
              <button
                onClick={onOpenCreatorStudio}
                className="hover:text-white transition cursor-pointer flex items-center gap-1"
              >
                <span>Geliştirici Yönetim Paneli</span>
              </button>
            </li>
            <li>
              <span className="text-slate-500">PWA Doğrudan Dağıtım Rehberi</span>
            </li>
            <li>
              <span className="text-slate-500">Sıfır İzleyici Politikası</span>
            </li>
          </ul>
        </div>

        {/* Ecosystem Apps */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-slate-300 text-[11px] mb-3">
            Aktif Ekosistem
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-center justify-between">
              <span>evdekihesap.app</span>
              <span className="text-[10px] text-emerald-400 font-medium">PWA</span>
            </li>
            <li className="flex items-center justify-between">
              <span>haberverbana.app</span>
              <span className="text-[10px] text-amber-400 font-medium">PWA</span>
            </li>
            <li className="flex items-center justify-between">
              <span>LessToken</span>
              <span className="text-[10px] text-cyan-400 font-medium">Chrome Eklentisi</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Koza & Algorithmless</span>
              <span className="text-[10px] text-violet-400 font-medium">Yakında</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>© {new Date().getFullYear()} ADAApps. Tüm hakları saklıdır. Hiçbir kullanıcı verisi satılmaz.</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span>Local-First</span>
          <span>•</span>
          <span>IndexedDB</span>
          <span>•</span>
          <span>PWA Standartları</span>
        </div>
      </div>
    </footer>
  );
};
