import React from 'react';
import { AppItem } from '../types';
import { AppIcon } from './AppIcon';
import { getAppStatusMeta } from '../utils/statusMeta';
import { 
  ExternalLink, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Clock
} from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  onOpenDetails: (app: AppItem) => void;
  onOpenQR: (app: AppItem) => void;
  onOpenWaitlist: (app: AppItem) => void;
  onLaunchInteractiveDemo: (app: AppItem) => void;
  onNavigateToPage?: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onOpenDetails,
  onOpenQR,
  onOpenWaitlist,
  onLaunchInteractiveDemo,
  onNavigateToPage
}) => {
  const isPWA = app.platform === 'pwa';
  const isExtension = app.platform === 'chrome_extension';
  const statusMeta = getAppStatusMeta(app.status);

  const handleTitleClick = () => {
    if (onNavigateToPage) {
      onNavigateToPage(app);
    } else {
      onOpenDetails(app);
    }
  };

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-indigo-950/20">
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* App Icon */}
            <button 
              type="button"
              onClick={handleTitleClick}
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.accentColor} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              title={`${app.name} Sayfasına Git`}
            >
              <AppIcon name={app.iconName} className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handleTitleClick}
                  className="text-left font-bold text-white group-hover:text-indigo-300 transition font-display text-base sm:text-lg cursor-pointer focus:outline-none"
                >
                  {app.name}
                </button>
                {app.isFeatured && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    Öne Çıkan
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-400 font-medium line-clamp-1">
                {app.tagline}
              </p>
            </div>
          </div>

          {/* Unified Status Badge */}
          <div className="shrink-0">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusMeta.badgeClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dotClass} ${app.status === 'live' ? 'animate-pulse' : ''}`}></span>
              {statusMeta.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
          {app.description}
        </p>

        {/* Problem -> Solution Mini Box */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 mb-4 space-y-1.5">
          <div className="text-[11px] text-slate-400">
            <strong className="text-slate-300">Çözülen Problem:</strong> {app.problem.substring(0, 110)}...
          </div>
        </div>

        {/* Tech Stack & Verified Status Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
            {isPWA ? '📱 PWA' : isExtension ? '🧩 Eklenti' : app.platform === 'desktop' ? '💻 Windows 11' : '🌐 Web'}
          </span>
          {app.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800/80"
            >
              {tech}
            </span>
          ))}
          {app.verifiedBadge && (
            <span className="ml-auto text-[10px] text-emerald-400/90 font-medium flex items-center gap-1 bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{app.verifiedBadge}</span>
            </span>
          )}
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(app)}
          className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded-xl transition cursor-pointer flex items-center gap-1.5"
        >
          <span>Ürün Hikayesi</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5">
          {/* Quick Demo Preview Button */}
          <button
            onClick={() => onLaunchInteractiveDemo(app)}
            title="Canlı Simülasyonu Gör"
            className="p-2 text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/20 rounded-xl transition cursor-pointer text-xs flex items-center gap-1"
          >
            <span>Canlı Önizle</span>
          </button>

          {/* QR Code for Mobile */}
          {isPWA && (
            <button
              onClick={() => onOpenQR(app)}
              title="Mobil Cihaz İçin Gerçek QR Kod"
              className="p-2 text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}

          {/* Primary Action Button */}
          {!statusMeta.isAvailableNow ? (
            <button
              onClick={() => onOpenWaitlist(app)}
              className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{statusMeta.cardActionText}</span>
            </button>
          ) : isExtension ? (
            <a
              href={app.officialStoreUrl || app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Chrome Eklentisi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={() => onOpenDetails(app)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <span>{statusMeta.cardActionText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
