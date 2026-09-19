import React, { useState } from 'react';
import { Bell, BellRing, Check, RefreshCw, ShieldCheck } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const AlertMonitorMockup: React.FC<MockupProps> = () => {
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs relative">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="font-semibold text-slate-200">haberverbana.app • Takip & Alarm</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
          <BellRing className="w-3 h-3 animate-bounce" />
          <span>Web Push Aktif</span>
        </div>
      </div>

      {simulatedAlert && (
        <div className="m-3 p-3 bg-gradient-to-r from-amber-900/90 to-orange-950/90 border border-amber-500/60 rounded-xl text-amber-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-white">haberverbana.app: Fiyat Alarmı! 🔔</div>
                <div className="text-[11px] text-amber-200">Takip ettiğiniz ürün ₺34.500 → <strong>₺29.499</strong> seviyesine geriledi!</div>
              </div>
            </div>
            <button
              onClick={() => setSimulatedAlert(false)}
              className="text-amber-300 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">İndirim Alarmı</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Check className="w-2.5 h-2.5" /> Hedefe Ulaşıldı
            </span>
          </div>
          <div className="font-medium text-slate-200 text-xs">
            Asus ROG Gaming Laptop (Hedef: &lt; ₺32.000)
          </div>
          <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-800/80">
            <span className="text-slate-400">Son Fiyat: <strong className="text-emerald-400">₺29.499</strong></span>
            <span className="text-slate-500 text-[10px]">2 dk önce denetlendi</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">İçerik & Kontenjan Takibi</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Her 5 dk izleniyor
            </span>
          </div>
          <div className="font-medium text-slate-200 text-xs">
            Vize Başvuru Randevu Sayfası ("Boş Randevu" kuralı)
          </div>
          <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-800/80">
            <span className="text-slate-400">Kriter: <span className="text-slate-300 font-mono">"Randevu Açıldı"</span></span>
            <span className="text-amber-400 text-[10px]">PWA Arka Planda Aktif</span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between gap-2">
          <button
            onClick={() => setSimulatedAlert(true)}
            className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Simüle Push Alarmı Gönder</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>İzlediğiniz URL'ler ve kurallar yalnızca cihazınızda tutulur.</span>
        </div>
      </div>
    </div>
  );
};
