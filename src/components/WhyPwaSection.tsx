import React, { useState } from 'react';
import { 
  RefreshCw, 
  Coins, 
  HardDrive, 
  Sparkles, 
  Lock
} from 'lucide-react';

export const WhyPwaSection: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<'pwa' | 'store'>('pwa');

  return (
    <section className="my-16 sm:my-20">
      <div className="why-pwa-container border rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dağıtım Modeli & Bağımsızlık</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display">
            Neden Bağımsız Vitrin & Progressive Web App (PWA)?
          </h2>
          <p className="text-xs sm:text-sm opacity-80 mt-2 leading-relaxed">
            Haftalarca süren inceleme kuyrukları, %30 platform komisyonları ve zorunlu hesap bağımlılığı yerine; doğrudan kullanıcıya ulaşan modern bir Independent Product Studio.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="about-card border rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mb-3">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold mb-1.5 font-display">
                %0 Aracı Komisyonu
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Kullanıcıya sunulan uygun fiyatlar veya ücretsiz hizmetler, üçüncü taraf mağazaların yüksek komisyon kesintilerine takılmaz.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-emerald-500">
              ✓ Sürdürülebilir Fiyatlandırma
            </div>
          </div>

          <div className="about-card border rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold mb-1.5 font-display">
                Anında Güncelleme
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Bir hata düzeltmesi veya yeni özellik geliştirdiğinizde günlerce onay beklemeden, anında tüm kullanıcılara canlı yansır.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-indigo-500">
              ✓ Kesintisiz Geliştirme Döngüsü
            </div>
          </div>

          <div className="about-card border rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mb-3">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold mb-1.5 font-display">
                Hafif & &lt;2 MB Boyut
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Yüzlerce megabaytlık şişkin ikili derlemeler yerine; kullanıcının telefon depolamasını doldurmayan modern açık web mimarisi.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-amber-500">
              ✓ Cihaz Depolamasına Saygı
            </div>
          </div>

          <div className="about-card border rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold mb-1.5 font-display">
                Güvenli Sandbox
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                Tarayıcının katı güvenlik standartlarında çalışır. Telefonunuzun rehberine ya da arka planına izinsiz sızamaz.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-cyan-500">
              ✓ Şeffaf Güvenlik Sınırları
            </div>
          </div>
        </div>

        {/* Interactive Comparison Bar */}
        <div className="about-card border rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-90">
              Karşılaştırma: ADAApps PWA Modeli vs Geleneksel Mağazalar
            </h4>

            <div className="flex items-center gap-1 about-card p-1 rounded-xl border text-xs">
              <button
                onClick={() => setActiveComparison('pwa')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeComparison === 'pwa'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                ADAApps / PWA Modeli
              </button>
              <button
                onClick={() => setActiveComparison('store')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  activeComparison === 'store'
                    ? 'bg-slate-700 text-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                Geleneksel Uygulama Mağazaları
              </button>
            </div>
          </div>

          {activeComparison === 'pwa' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="about-card p-3.5 rounded-xl border border-emerald-500/30">
                <div className="text-emerald-500 font-bold mb-1">Doğrudan Dağıtım</div>
                <p className="opacity-80 text-[11px]">Kullanıcı "Ana Ekrana Ekle" diyerek tek tıkla kurar. Mağaza hesabı veya şifresi girmeye gerek kalmaz.</p>
              </div>
              <div className="about-card p-3.5 rounded-xl border border-emerald-500/30">
                <div className="text-emerald-500 font-bold mb-1">Kullanıcı Odaklı Geliştirme</div>
                <p className="opacity-80 text-[11px]">Ürünler platformların kural değişikliklerine göre değil, doğrudan kullanıcıların pratik ihtiyaçlarına göre evrilir.</p>
              </div>
              <div className="about-card p-3.5 rounded-xl border border-emerald-500/30">
                <div className="text-emerald-500 font-bold mb-1">Doğal Çapraz Platform</div>
                <p className="opacity-80 text-[11px]">Aynı modern web standartları iOS, Android, Mac, Windows ve Linux'ta kusursuz çalışır.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="about-card p-3.5 rounded-xl border">
                <div className="font-bold mb-1">%15 - %30 Komisyon Kesintisi</div>
                <p className="opacity-75 text-[11px]">Geliştirici lisans ücretleri ve yüksek işlem komisyonları nihai ürün fiyatlarını yapay olarak artırır.</p>
              </div>
              <div className="about-card p-3.5 rounded-xl border">
                <div className="font-bold mb-1">Geciken Onay Süreçleri</div>
                <p className="opacity-75 text-[11px]">Kritik bir hata düzeltmesi veya güvenlik yaması bile günlerce onay kuyruğunda bekleyebilir.</p>
              </div>
              <div className="about-card p-3.5 rounded-xl border">
                <div className="font-bold mb-1">Yüksek Boyut ve İndirme Bariyeri</div>
                <p className="opacity-75 text-[11px]">100MB+ ikili paketler nedeniyle kullanıcılar hücresel veriyle indirmekten çekinir.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
