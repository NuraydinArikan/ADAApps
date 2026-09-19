import React, { useState } from 'react';
import { AppItem } from '../types';
import { AppIcon } from './AppIcon';
import { AppMockupPreview } from './AppMockupPreview';
import { PWAInstallGuide } from './PWAInstallGuide';
import { QRCodeDisplay } from './QRCodeDisplay';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Star, 
  Share2, 
  Copy, 
  Check,
  Zap,
  Info,
  QrCode,
  Smartphone
} from 'lucide-react';

interface AppModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: (app: AppItem) => void;
  onOpenQR: (app: AppItem) => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  app,
  isOpen,
  onClose,
  onOpenWaitlist
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'install' | 'qr' | 'changelog'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !app) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(app.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isPWA = app.platform === 'pwa';
  const isUpcoming = app.status === 'in_development' || app.status === 'concept';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${app.accentColor} flex items-center justify-center text-white shadow-xl shrink-0`}>
              <AppIcon name={app.iconName} className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                  {app.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {app.badgeText || (isPWA ? 'PWA' : 'Tarayıcı Aracı')}
                </span>
                {app.rating && (
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{app.rating}</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-indigo-400 font-medium mt-0.5">
                {app.tagline}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {isUpcoming ? (
              <button
                onClick={() => onOpenWaitlist(app)}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Erken Erişime Katıl</span>
              </button>
            ) : app.platform === 'desktop' ? (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <span>Masaüstü İndir</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : app.platform === 'chrome_extension' ? (
              <a
                href={app.officialStoreUrl || app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>Chrome Web Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <span>Uygulamayı Aç</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 font-semibold border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Genel Bakış & Simülasyon
          </button>

          {isPWA && (
            <button
              onClick={() => setActiveTab('install')}
              className={`py-3 px-3 font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'install'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Nasıl Yüklenir? (PWA)</span>
            </button>
          )}

          {isPWA && (
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-3 px-3 font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'qr'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mobil QR Kod</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('changelog')}
            className={`py-3 px-3 font-semibold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'changelog'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Sürüm Notları</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem & Solution Double Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 border border-rose-900/30 rounded-xl p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Hangi Problemi Çözüyor?
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {app.problem}
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-emerald-900/30 rounded-xl p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ADA Yaklaşımı & Çözümü
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {app.solution}
                  </p>
                </div>
              </div>

              {/* Interactive Mockup Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    İnteraktif Arayüz Önizlemesi
                  </h4>
                  <span className="text-[11px] text-slate-500">Canlı Prototip</span>
                </div>
                <AppMockupPreview app={app} />
              </div>

              {/* Core Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Temel Yetenekler & Özellikler
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {app.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy & Security Highlights */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Güvenlik & Kullanıcı Hakları Güvencesi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {app.privacyHighlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {highlight}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                    Son güncelleme: {app.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Kullanılan Teknolojiler
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {app.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'install' && isPWA && (
            <PWAInstallGuide appName={app.name} appUrl={app.url} />
          )}

          {activeTab === 'qr' && isPWA && (
            <div className="max-w-md mx-auto">
              <QRCodeDisplay url={app.url} appName={app.name} />
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Geliştirme Günlüğü & Sürümler
              </h4>
              {app.changelog.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 font-mono">
                      {item.version}
                    </span>
                    <span className="text-[11px] text-slate-500">{item.date}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {item.notes.map((note, nIdx) => (
                      <li key={nIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-300">{app.url}</span>
            <button
              onClick={handleCopyLink}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition cursor-pointer"
              title="URL Kopyala"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">ADA Product Studio Dağıtımı</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
