import React, { useEffect } from 'react';
import { Sparkles, X, Shield, Users, Leaf, Terminal, ArrowRight } from 'lucide-react';
import { AdaAppsLogo } from './AdaAppsLogo';

interface AdaStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdaStoryModal: React.FC<AdaStoryModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="ada-manifesto-title"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AdaAppsLogo variant="mark" size="md" />
            <div>
              <h3 id="ada-manifesto-title" className="text-lg font-bold text-white font-display flex items-center gap-2">
                ADA Bağımsız Ürün Stüdyosu Manifestosu
              </h3>
              <p className="text-xs text-slate-400">
                Kullanıcıya saygılı, hafif ve şeffaf dijital araçlar üretme felsefesi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Heart of the Story */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/20 rounded-xl p-4 sm:p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Neden ADAApps?
            </div>
            <p className="text-slate-200 font-medium text-base mb-2">
              "Bağımsız, temiz, şeffaf ve insan onurunu gözeten dijital ürünler stüdyosu: <span className="text-indigo-400 font-bold">ADA APPS</span>."
            </p>
            <p className="text-slate-300 text-xs sm:text-sm">
              Bu stüdyo, rastgele bir katalog değil; kullanıcı verisini reklamcılara satmayan, gereksiz arka plan süreçleriyle cihazınızı yormayan ve modern açık web standartlarıyla (PWA) doğrudan dağıtılan bağımsız bir yazılım atölyesidir.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ADAApps Ürün Felsefesi (4 Temel İlke)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <Shield className="w-4 h-4" />
                  <span>1. Şeffaf Veri Mimarisi</span>
                </div>
                <p className="text-[12px] text-slate-400">
                  Uygulamalarımızda veri madenciliği, gizli izleyici pikselleri veya profil çıkarma yoktur. Hangi verinin cihazda kaldığı, hangisinin sunucuya gittiği her ürün sayfasında şeffafça açıklanır.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>2. Modern PWA & Doğrudan Dağıtım</span>
                </div>
                <p className="text-[12px] text-slate-400">
                  Platform onay gecikmelerine takılmadan; modern açık web standartlarıyla doğrudan tarayıcınızdan telefon veya bilgisayarınıza tek tıkla yükleme özgürlüğü.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <Leaf className="w-4 h-4" />
                  <span>3. Dikkat ve Zaman Saygısı</span>
                </div>
                <p className="text-[12px] text-slate-400">
                  Dopamin döngüleri, yapay bildirim bombardımanları ve sonsuz kaydırmalar yok. Amacımız işinizi en yalın şekilde çözüp gerçek yaşamınıza dönmenizi sağlamaktır.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                  <Users className="w-4 h-4" />
                  <span>4. Zanaatkar Bağımsız Yazılım</span>
                </div>
                <p className="text-[12px] text-slate-400">
                  Dev şirketlerin şişkin ve hantal monolitleri yerine; her biri tek bir problemi zarif, hızlı ve verimli çözen odaklanmış araçlar.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Yayıncı: <span className="text-slate-200 font-semibold">ADA Independent Product Studio</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Vitrini Keşfet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
