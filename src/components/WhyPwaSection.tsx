import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Coins, 
  Smartphone, 
  HardDrive, 
  Check, 
  ArrowRight,
  Sparkles,
  Layers,
  Lock
} from 'lucide-react';

export const WhyPwaSection: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<'pwa' | 'store'>('pwa');

  return (
    <section className="my-16 sm:my-20">
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dağıtım Modeli & Bağımsızlık</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display">
            Neden Şahsi Vitrin & Progressive Web App (PWA)?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Resmi mağazaların haftalarca süren inceleme kuyrukları, %30'a varan komisyon kesintileri ve kısıtlayıcı kuralları yerine; doğrudan kullanıcıya ulaşan modern bir Product Studio.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 font-display">
                %0 Komisyon Kesintisi
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kullanıcıdan alınan her kuruş veya sunulan ücretsiz hizmet, üçüncü taraf dev şirketlerin %30 haracına maruz kalmaz.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-emerald-400">
              ✓ Bağımsız ve Sürdürülebilir
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 font-display">
                Anında Güncelleme
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bir hata düzeltmesi veya yeni özellik geliştirdiğinizde mağaza onayı beklemeden, saniyeler içinde tüm kullanıcılara ulaşır.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-indigo-400">
              ✓ Sıfır Günlük Bekleme
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 font-display">
                Hafif & &lt;2 MB Boyut
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                150-200 MB'lık hantal yerel uygulamalar yerine; kullanıcının telefon hafızasını doldurmayan zarif web mimarisi.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-amber-400">
              ✓ Cihazı Yormaz
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5 font-display">
                Güvenli Sandbox
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tarayıcı güvenlik kalkanında çalışır. Telefonunuzun rehberine, fotoğraflarına ya da arka planına izinsiz sızamaz.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-cyan-400">
              ✓ Maksimum Kullanıcı Güveni
            </div>
          </div>
        </div>

        {/* Interactive Comparison Bar */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
              Karşılaştırma: PWA / ADA Vitrini vs Geleneksel App Store
            </h4>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveComparison('pwa')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeComparison === 'pwa'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ADAApps / PWA Modeli
              </button>
              <button
                onClick={() => setActiveComparison('store')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeComparison === 'store'
                    ? 'bg-slate-800 text-slate-200'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Resmi App Store'lar
              </button>
            </div>
          </div>

          {activeComparison === 'pwa' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
                <div className="text-emerald-400 font-bold mb-1">Doğrudan Dağıtım</div>
                <p className="text-slate-300 text-[11px]">Kullanıcı "Ana Ekrana Ekle" diyerek tek tıkla kurar. Apple ID veya Google hesabı şifresi girmeye gerek yoktur.</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
                <div className="text-emerald-400 font-bold mb-1">Geliştirici Özgürlüğü</div>
                <p className="text-slate-300 text-[11px]">Projenizi tekel şirketlerin keyfi kurallarına göre değil, kullanıcılarınızın gerçek ihtiyaçlarına göre geliştirirsiniz.</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
                <div className="text-emerald-400 font-bold mb-1">Çapraz Platform</div>
                <p className="text-slate-300 text-[11px]">Aynı kod tabanı iOS, Android, Mac, Windows ve Linux'ta kusursuz çalışır; çoklu cihaz desteği doğaldır.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-300 font-bold mb-1">%30 Kesinti & Yıllık Lisans</div>
                <p className="text-slate-400 text-[11px]">Apple yıllık 99$ geliştirici ücreti alır, her satıştan %15-%30 arası komisyon keser.</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-300 font-bold mb-1">Keyfi Reddetmeler</div>
                <p className="text-slate-400 text-[11px]">Küçük bir metin veya bağlantı yüzünden uygulamanız günler süren inceleme döngüsünde reddedilebilir.</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-300 font-bold mb-1">Yüksek Boyut & Ağır İndirme</div>
                <p className="text-slate-400 text-[11px]">Gereksiz kütüphaneler ve ikili derlemeler nedeniyle kullanıcılar mobil veriyle indirmekten kaçınabilir.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
