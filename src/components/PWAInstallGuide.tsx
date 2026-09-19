import React, { useState } from 'react';
import { Smartphone, Monitor, Apple, CheckCircle2, ShieldCheck, Share, MoreVertical, PlusSquare, ArrowRight, Zap, HardDrive } from 'lucide-react';

interface PWAInstallGuideProps {
  appName: string;
  appUrl: string;
}

export const PWAInstallGuide: React.FC<PWAInstallGuideProps> = ({ appName, appUrl }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'desktop'>('ios');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-4">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            PWA Nasıl Kurulur? (Ana Ekrana Ekle)
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            App Store veya Google Play hesabı gerektirmeden, 3 saniyede cihazınıza kurun.
          </p>
        </div>

        {/* OS Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>iPhone / iPad</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === 'android'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>

          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Masaüstü (Mac/PC)</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'ios' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                  1
                </div>
                <h5 className="text-xs font-semibold text-slate-200 mb-1">Safari ile Açın</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  iPhone veya iPad'inizde Safari tarayıcısını kullanarak <span className="text-indigo-300 font-mono">{appUrl}</span> adresine gidin.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 flex items-center gap-1">
                <Apple className="w-3 h-3" /> Safari tarayıcısı zorunludur
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                  2
                </div>
                <h5 className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <span>Paylaş Simgesine Basın</span>
                  <Share className="w-3.5 h-3.5 text-indigo-400" />
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Ekranın altındaki araç çubuğunda yer alan kare içindeki yukarı ok (Paylaş) simgesine dokunun.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
                Açılan menüde aşağı kaydırın
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                  3
                </div>
                <h5 className="text-xs font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <span>"Ana Ekrana Ekle"</span>
                  <PlusSquare className="w-3.5 h-3.5 text-emerald-400" />
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-200">"Ana Ekrana Ekle"</strong> seçeneğini seçip sağ üstteki <strong>"Ekle"</strong> butonuna dokunun.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-emerald-400/90 font-medium">
                ✓ Artık yerel bir uygulama gibi ana ekranınızda!
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'android' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                  1
                </div>
                <h5 className="text-xs font-semibold text-slate-200 mb-1">Chrome ile Açın</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Android cihazınızda Chrome veya varsayılan tarayıcınızda <span className="text-indigo-300 font-mono">{appUrl}</span> adresine girin.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                  2
                </div>
                <h5 className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <span>Menüyü Açın</span>
                  <MoreVertical className="w-3.5 h-3.5 text-indigo-400" />
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sağ üst köşedeki üç nokta (⋮) simgesine dokunun veya alt bildirimde çıkan <em>"Yükle"</em> butonuna tıklayın.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                  3
                </div>
                <h5 className="text-xs font-semibold text-emerald-300 mb-1">"Uygulamayı Yükle"</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <strong>"Uygulamayı Yükle"</strong> ya da <strong>"Ana Ekrana Ekle"</strong> butonuna basın. Birkaç saniyede kurulur.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-emerald-400/90 font-medium">
                ✓ Uygulama çekmecenize ve ana ekranınıza eklendi!
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'desktop' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                  1
                </div>
                <h5 className="text-xs font-semibold text-slate-200 mb-1">Tarayıcınızda Açın</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Chrome, Edge veya Brave tarayıcınızda web sitesini ziyaret edin.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
                  2
                </div>
                <h5 className="text-xs font-semibold text-slate-200 mb-1">Adres Çubuğundaki Simge</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  URL adres çubuğunun en sağında yer alan monitör/aşağı ok (Yükle) simgesine tıklayın.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
                  3
                </div>
                <h5 className="text-xs font-semibold text-emerald-300 mb-1">Masaüstü Penceresi Olarak Aç</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Onay verin; uygulama Dock veya Başlat menünüze eklenir ve bağımsız pencerede açılır.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety & Trust Note */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span><strong>%100 Güvenli Sandbox:</strong> PWA'lar tarayıcının güvenlik katmanında çalışır; dosya sisteminizi izinsiz okuyamaz, arka planda gizli işlem yürütemez.</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-slate-500">
          <HardDrive className="w-3.5 h-3.5" />
          <span>Ortalama boyut: &lt; 2 MB</span>
        </div>
      </div>
    </div>
  );
};
