import React, { useState } from 'react';
import { Heart, ShieldCheck, Sparkles, Activity, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { AdaAppsLogo } from './AdaAppsLogo';

interface FooterProps {
  onOpenStory: () => void;
  onOpenCreatorStudio: () => void;
  onOpenSentinel?: () => void;
  onOpenAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenStory, 
  onOpenCreatorStudio,
  onOpenSentinel,
  onOpenAbout
}) => {
  const [copied, setCopied] = useState(false);
  const supportEmail = 'destek@adaapps.dev';

  const handleCopy = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToAbout = () => {
    if (onOpenAbout) {
      onOpenAbout();
    } else {
      const el = document.getElementById('hakkinda');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand & Tribute */}
        <div className="md:col-span-1 space-y-3">
          <AdaAppsLogo
            size="md"
            variant="full"
            onClick={onOpenStory}
          />

          <p className="text-slate-400 leading-relaxed text-xs">
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
                onClick={handleScrollToAbout}
                className="hover:text-white text-indigo-300 font-medium transition cursor-pointer flex items-center gap-1"
              >
                <span>ADAApps Hakkında & Hikayemiz</span>
              </button>
            </li>
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
            {onOpenSentinel && (
              <li>
                <button
                  onClick={onOpenSentinel}
                  className="hover:text-emerald-400 text-slate-300 font-medium transition cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sistem Durumu & 7/24 Sentinel</span>
                </button>
              </li>
            )}
            <li>
              <span className="text-slate-500">PWA Doğrudan Dağıtım Rehberi</span>
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

        {/* Contact & Support */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-slate-300 text-[11px] mb-3">
            İletişim & Destek
          </h4>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            Soru, geri bildirim veya yeni uygulama fikirleriniz için bize her zaman yazabilirsiniz:
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-indigo-300 text-[11px] select-all font-semibold">
                {supportEmail}
              </span>
              <button
                onClick={handleCopy}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer flex items-center gap-1"
                title="E-postayı Kopyala"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <a
              href={`mailto:${supportEmail}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-lg text-[11px] font-semibold transition"
            >
              <Mail className="w-3 h-3" />
              <span>E-posta Gönder</span>
            </a>
          </div>
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
