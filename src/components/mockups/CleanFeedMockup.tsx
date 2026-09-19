import React, { useState } from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const CleanFeedMockup: React.FC<MockupProps> = () => {
  const [algoView, setAlgoView] = useState<'matris' | 'carkifelek'>('matris');

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200">Algorithmless • Yankı Odası Kırıcı</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAlgoView('matris')}
            className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${algoView === 'matris' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'}`}
          >
            Matris
          </button>
          <button
            onClick={() => setAlgoView('carkifelek')}
            className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${algoView === 'carkifelek' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'}`}
          >
            Çarkıfelek
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {algoView === 'matris' ? (
          <div className="space-y-2">
            <div className="text-[11px] text-slate-300 font-medium">Gündem: "Merkez Bankası Faiz Kararı ve Enflasyon"</div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <div className="bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <span className="text-amber-400 font-semibold block">YouTube (Analiz)</span>
                <p className="text-slate-300 line-clamp-2">"Piyasaların beklediği faiz patikasında 3 kritik risk faktörü..."</p>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-semibold block">Bağımsız Basın</span>
                <p className="text-slate-300 line-clamp-2">"Sabit gelirlilerin enflasyon karşısındaki alım gücü erimesi..."</p>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-semibold block">Uluslararası (FT)</span>
                <p className="text-slate-300 line-clamp-2">"Yabancı sermaye girişlerinde reel faiz dengesi kuruluyor..."</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
            <div className="text-sm font-bold text-cyan-300">🎡 Çarkıfelek Perspektif Keşfi</div>
            <p className="text-[11px] text-slate-300 italic">
              "Kendi siyasi veya ideolojik filtrenizin dışındaki 3 farklı kaynağın yorumunu okumak üzeresiniz."
            </p>
            <div className="inline-block px-3 py-1 bg-cyan-950 text-cyan-300 rounded-full border border-cyan-500/30 text-[10px]">
              Tetiklenen Açı: Bağımsız Yerel Gazetecilik + Dış Basın
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
          <span>Algoritma değil, sen seç. Filtre balonlarını kıran bilinçli medya tüketimi.</span>
        </div>
      </div>
    </div>
  );
};
