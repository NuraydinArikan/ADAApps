import React, { useState } from 'react';
import { AppItem } from '../types';
import { AppMockupPreview } from './AppMockupPreview';
import { getAppStatusMeta } from '../utils/statusMeta';
import { 
  ArrowLeft, 
  ExternalLink, 
  QrCode, 
  Share2, 
  Check, 
  ShieldCheck, 
  Server, 
  Cpu, 
  UserCheck, 
  Sparkles,
  Smartphone,
  Layers,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';

interface AppDetailPageProps {
  app: AppItem;
  onBack: () => void;
  onOpenQr: (app: AppItem) => void;
  onOpenWaitlist: (app: AppItem) => void;
  onOpenLiveDemo: (app: AppItem) => void;
}

export const AppDetailPage: React.FC<AppDetailPageProps> = ({
  app,
  onBack,
  onOpenQr,
  onOpenWaitlist,
  onOpenLiveDemo
}) => {
  const [copied, setCopied] = useState(false);
  const statusMeta = getAppStatusMeta(app.status);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'pwa':
        return 'PWA (Doğrudan Web & Mobil Kurulum)';
      case 'desktop':
        return 'Masaüstü (PyQt6 / Native)';
      case 'chrome_extension':
        return 'Tarayıcı Eklentisi (Chrome / Brave)';
      default:
        return 'Web Uygulaması';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Bar / Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Uygulamalara Dön</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-sm font-medium cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Bağlantı Kopyalandı!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>Sayfayı Paylaş</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.accentColor || 'from-indigo-600 to-indigo-800'} flex items-center justify-center text-white shadow-xl shadow-indigo-950/40 shrink-0 font-bold text-xl`}>
              {app.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {app.name}
                </h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusMeta.badgeClass}`}>
                  {statusMeta.label}
                </span>
                {app.verifiedBadge && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {app.verifiedBadge}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-base font-medium">
                {app.tagline}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span>{getPlatformLabel(app.platform)}</span>
                <span>•</span>
                <span>Son Güncelleme: {app.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {app.status === 'live' && app.url ? (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition flex items-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer text-sm"
              >
                <span>Uygulamayı Başlat</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => onOpenWaitlist(app)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold transition flex items-center gap-2 shadow-lg shadow-amber-600/25 cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Erken Erişim / Bekleme Listesi</span>
              </button>
            )}

            {app.platform === 'pwa' && app.url && (
              <button
                onClick={() => onOpenQr(app)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-2 cursor-pointer text-sm"
              >
                <QrCode className="w-4 h-4 text-indigo-400" />
                <span>Telefona Yükle (QR)</span>
              </button>
            )}

            <button
              onClick={() => onOpenLiveDemo(app)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-2 cursor-pointer text-sm"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Canlı Önizleme</span>
            </button>
          </div>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-rose-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
              <span>Mevcut Problem & Sorun</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {app.problem}
            </p>
          </div>

          <div className="bg-slate-950/60 border border-emerald-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <span>ADA Çözümü & Yaklaşımı</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {app.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Mockup Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-400" />
            <span>İnteraktif Arayüz Simülasyonu</span>
          </h2>
          <span className="text-xs text-slate-400">Canlı etkileşimli çalışan vitrin</span>
        </div>
        <AppMockupPreview app={app} />
      </div>

      {/* Transparent Privacy Architecture */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Şeffaf Gizlilik Mimarisi</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Bu uygulamanın veriyi nasıl işlediği, depoladığı ve dış servislere hangi şartla aktardığı açıkça belgelenmiştir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Cihaz İçi Veri</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {app.privacyArchitecture?.localData || 'Veriler tarayıcı içi depolama alanında tutulur.'}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold">
              <Server className="w-4 h-4" />
              <span>Sunucu Senkronizasyonu</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {app.privacyArchitecture?.serverSync || 'Merkezi veritabanı tutulmaz.'}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Yapay Zeka & Dış API</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {app.privacyArchitecture?.aiExternalApi || 'Dış API çağrısı yapılmaz.'}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold">
              <UserCheck className="w-4 h-4" />
              <span>Hesap Zorunluluğu</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {app.privacyArchitecture?.accountRequired || 'Hesap gerekmez.'}
            </p>
          </div>
        </div>
      </div>

      {/* Features & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Öne Çıkan Özellikler</span>
          </h2>
          <ul className="space-y-2.5">
            {app.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Teknoloji Yığını</span>
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {app.techStack.map((tech, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-xs text-slate-400 font-medium block">Gizlilik Vurguları</span>
            <div className="space-y-1.5">
              {app.privacyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Changelog */}
      {app.changelog && app.changelog.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Sürüm Geçmişi & Değişiklik Günlüğü</span>
          </h2>
          <div className="space-y-3">
            {app.changelog.map((entry, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-400">{entry.version}</span>
                  <span className="text-xs text-slate-400">{entry.date}</span>
                </div>
                <ul className="space-y-1">
                  {entry.notes.map((note, nIdx) => (
                    <li key={nIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-slate-600">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
