import React, { useState } from 'react';
import { Coffee, Check, QrCode, CheckCircle2 } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const LoyaltyStampMockup: React.FC<MockupProps> = () => {
  const [coffeeStamps, setCoffeeStamps] = useState(8);
  const [qrShowing, setQrShowing] = useState(false);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coffee className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-semibold text-slate-200">KahveApps • Semt Sadakat Cüzdanı</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
          Ankara Pilot Hattı
        </span>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Coffee Stamp Card */}
        <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-100 text-xs">Kukla Kahveci (Tunalı Hilmi)</div>
              <div className="text-[10px] text-amber-400">10 Damgaya 1 Filtre Kahve Hediye!</div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">{coffeeStamps} / 10 Damga</span>
          </div>

          {/* Stamp Grid */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-8 rounded-lg flex items-center justify-center border transition ${
                  idx < coffeeStamps
                    ? 'bg-amber-600/30 border-amber-500/60 text-amber-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-600'
                }`}
              >
                {idx < coffeeStamps ? <Check className="w-4 h-4 text-amber-400" /> : idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Barista QR Toggle */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => {
              if (coffeeStamps < 10) setCoffeeStamps(prev => prev + 1);
              else setCoffeeStamps(1);
            }}
            className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>{coffeeStamps >= 10 ? 'Hediyeyi Al (Sıfırla)' : '+1 Damga Bas'}</span>
          </button>

          <button
            onClick={() => setQrShowing(!qrShowing)}
            className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-lg transition cursor-pointer flex items-center gap-1"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>{qrShowing ? 'Kapat' : 'Barista QR'}</span>
          </button>
        </div>

        {qrShowing && (
          <div className="p-3 bg-white text-slate-950 rounded-xl text-center font-mono text-[10px] space-y-1 animate-in zoom-in-95">
            <div className="font-bold text-xs">SUNUCU İMZALI DİNAMİK QR</div>
            <div className="p-2 bg-slate-100 rounded border border-slate-300 inline-block font-mono tracking-widest text-[9px]">
              KAHVE-TUNALI-9482-SECURE
            </div>
            <div className="text-slate-500 text-[9px]">Kasa görevlisine 3 saniyede okutun</div>
          </div>
        )}

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-amber-400" />
          <span>Kağıt kart taşımaya son; semtin tüm bağımsız kahvecileri tek cüzdanda.</span>
        </div>
      </div>
    </div>
  );
};
