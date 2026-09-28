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
  Clock,
  Globe,
  Heart
} from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  onOpenDetails: (app: AppItem) => void;
  onOpenQR: (app: AppItem) => void;
  onOpenWaitlist: (app: AppItem) => void;
  onLaunchInteractiveDemo: (app: AppItem) => void;
  onNavigateToPage?: (app: AppItem) => void;
  isMinimal?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (appId: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onOpenDetails,
  onOpenQR,
  onOpenWaitlist,
  onLaunchInteractiveDemo,
  onNavigateToPage,
  isMinimal = false,
  isFavorite = false,
  onToggleFavorite
}) => {
  const isPWA = app.platform === 'pwa';
  const isExtension = app.platform === 'chrome_extension';
  const statusMeta = getAppStatusMeta(app.status);

  const platformText = app.platformDisplay || (
    isExtension ? 'Chrome Eklentisi • Web Uygulaması' :
    isPWA ? 'PWA • Web Uygulaması' :
    app.platform === 'desktop' ? 'Windows 11 Masaüstü' :
    'Web Uygulaması'
  );

  const handleTitleClick = () => {
    if (onNavigateToPage) {
      onNavigateToPage(app);
    } else {
      onOpenDetails(app);
    }
  };

  // Minimal card presentation
  if (isMinimal) {
    return (
      <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-105 flex flex-col justify-between shadow-md hover:shadow-2xl hover:shadow-indigo-950/20">
        <div>
          {/* Top Platform & Status Bar */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 truncate max-w-[55%]">
              {platformText}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Renk Kodlu Durum Rozeti (Canlı: Yeşil, Geliştiriliyor: Sarı) */}
              <span 
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0 transition-colors shadow-xs ${statusMeta.badgeClass}`}
                title={app.status === 'live' ? 'Canlı / Aktif Sürüm' : 'Geliştirme Aşamasında'}
              >
                <span className={`w-2 h-2 rounded-full ${statusMeta.dotClass} ${app.status === 'live' ? 'animate-pulse' : ''}`} />
                <span>{statusMeta.label}</span>
              </span>

              {/* Favori Kalp Butonu */}
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(app.id);
                  }}
                  className={`p-1 rounded-lg transition-all cursor-pointer ${
                    isFavorite
                      ? 'text-rose-400 bg-rose-500/15 hover:bg-rose-500/25 ring-1 ring-rose-500/30'
                      : 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                  }`}
                  title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                  aria-label={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                >
                  <Heart className={`w-3.5 h-3.5 transition-transform active:scale-125 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            {/* App Icon ile Köşe Durum Noktası */}
            <div className="relative shrink-0">
              <button 
                type="button"
                onClick={handleTitleClick}
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${app.accentColor} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                title={`${app.name} Detayına Git`}
              >
                <AppIcon name={app.iconName} className="w-5 h-5" />
              </button>
              {/* Köşe Renk Gösterge Noktası: Yeşil (Canlı) veya Sarı (Geliştiriliyor) */}
              <span 
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                  app.status === 'live' ? 'bg-emerald-400 ring-1 ring-emerald-400/40' : 'bg-amber-400 ring-1 ring-amber-400/40'
                }`}
                title={app.status === 'live' ? 'Canlı' : 'Geliştiriliyor'}
              />
            </div>

            <div className="min-w-0 flex-1">
              <button 
                type="button"
                onClick={handleTitleClick}
                className="text-left font-bold text-white group-hover:text-indigo-300 transition font-display text-base truncate block w-full cursor-pointer focus:outline-none"
              >
                {app.name}
              </button>

              {/* Domain under app name for live apps */}
              {app.customDomain ? (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition mt-0.5 truncate group/link"
                  title={`${app.customDomain} sitesini yeni sekmede aç`}
                >
                  <Globe className="w-3 h-3 text-emerald-400/80 group-hover/link:rotate-12 transition-transform shrink-0" />
                  <span className="truncate">{app.customDomain}</span>
                </a>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium block truncate mt-0.5">
                  {app.tagline}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons: Canlı Önizle & Yükle&Aç / Geliştiriliyor */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 mt-2">
          <button
            onClick={() => onLaunchInteractiveDemo(app)}
            title="Canlı Önizleme"
            className="px-2 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/80 border border-indigo-500/30 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 hover:shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">Canlı Önizle</span>
          </button>

          {app.status === 'live' && app.url ? (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-indigo-600/20"
            >
              <span className="truncate">Yükle & Aç</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : isExtension && (app.officialStoreUrl || app.url) ? (
            <a
              href={app.officialStoreUrl || app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
            >
              <span className="truncate">Yükle & Aç</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <button
              onClick={() => onOpenWaitlist(app)}
              title="Geliştirme aşamasında - Erken erişim ve bildirim"
              className="px-2 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
            >
              <Clock className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Geliştiriliyor</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:scale-105 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-indigo-950/20">
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-start gap-3 min-w-0">
            {/* App Icon ile Köşe Durum Gösterge Noktası */}
            <div className="relative shrink-0 mt-0.5">
              <button 
                type="button"
                onClick={handleTitleClick}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.accentColor} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                title={`${app.name} Sayfasına Git`}
              >
                <AppIcon name={app.iconName} className="w-6 h-6" />
              </button>
              {/* Köşe Renk Gösterge Noktası: Yeşil (Canlı) veya Sarı (Geliştiriliyor) */}
              <span 
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                  app.status === 'live' ? 'bg-emerald-400 ring-1 ring-emerald-400/50' : 'bg-amber-400 ring-1 ring-amber-400/50'
                }`}
                title={app.status === 'live' ? 'Canlı / Yayında' : 'Geliştirme Aşamasında'}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handleTitleClick}
                  className="text-left font-bold text-white group-hover:text-indigo-300 transition font-display text-base sm:text-lg cursor-pointer focus:outline-none truncate"
                >
                  {app.name}
                </button>
                {app.isFeatured && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 shrink-0">
                    Öne Çıkan
                  </span>
                )}
              </div>

              {/* Domain directly under app name for live apps */}
              {app.customDomain ? (
                <div className="my-0.5">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition group/domain"
                    title={`${app.customDomain} sitesini yeni sekmede aç`}
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400/80 group-hover/domain:rotate-12 transition-transform shrink-0" />
                    <span>{app.customDomain}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>
              ) : null}

              <p className="text-xs text-indigo-400 font-medium line-clamp-1 mt-0.5">
                {app.tagline}
              </p>
            </div>
          </div>

          {/* Right Header Badges: Renk Kodlu Durum Rozeti + Platform + Favori Kalp */}
          <div className="flex items-start gap-2 shrink-0">
            <div className="flex flex-col items-end gap-1.5">
              <span 
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border shadow-xs transition-colors ${statusMeta.badgeClass}`}
                title={app.status === 'live' ? 'Canlı / Aktif Sürüm' : 'Geliştirme Aşamasında'}
              >
                <span className={`w-2 h-2 rounded-full ${statusMeta.dotClass} ${app.status === 'live' ? 'animate-pulse' : ''}`} />
                <span>{statusMeta.label}</span>
              </span>
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 whitespace-nowrap">
                {platformText}
              </span>
            </div>

            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(app.id);
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isFavorite
                    ? 'text-rose-400 bg-rose-950/50 border-rose-500/40 shadow-xs shadow-rose-950/30'
                    : 'text-slate-500 hover:text-rose-400 bg-slate-800/60 hover:bg-slate-800 border-slate-700/60'
                }`}
                title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                aria-label={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              >
                <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            )}
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
