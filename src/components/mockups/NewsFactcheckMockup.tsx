import React, { useState } from 'react';
import { FileText, Scale } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const NewsFactcheckMockup: React.FC<MockupProps> = () => {
  const [selectedNewsTab, setSelectedNewsTab] = useState<'karne' | 'karsilastirma' | 'kronoloji'>('karne');

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200">Project FN • Doğrulanabilir Gazetecilik</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 font-medium">
          30+ Yıllık Araştırmacı Metodoloji
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Navigation Tabs */}
        <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
          {[
            { id: 'karne', label: 'Doğrulama Karnesi' },
            { id: 'karsilastirma', label: 'Kim Nasıl Verdi?' },
            { id: 'kronoloji', label: 'Olay Kronolojisi' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedNewsTab(tab.id as any)}
              className={`flex-1 py-1 rounded text-[10px] font-medium transition cursor-pointer ${
                selectedNewsTab === tab.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {selectedNewsTab === 'karne' && (
          <div className="space-y-2">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Haber Karnesi Skoru</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                  %96 Doğrulanmış
                </span>
              </div>
              <div className="font-semibold text-slate-100 text-xs">
                "Kamu İhalesindeki Çevre Raporu Şartnamesi Değiştirildi İddiası"
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <div className="text-emerald-400 font-bold text-sm">4</div>
                  <div className="text-[9px] text-slate-400">Resmi Belge</div>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <div className="text-indigo-400 font-bold text-sm">2</div>
                  <div className="text-[9px] text-slate-400">Taraf Görüşü</div>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <div className="text-rose-400 font-bold text-sm">0</div>
                  <div className="text-[9px] text-slate-400">Anonim İddia</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedNewsTab === 'karsilastirma' && (
          <div className="space-y-1.5 text-[11px]">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 text-[9px] font-mono">Muhalif Medya</span>
              <span className="text-slate-300">"Gizli Şartnameyle Doğaya Darbe Vuruldu!"</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 text-[9px] font-mono">İktidar Medyası</span>
              <span className="text-slate-300">"Yatırımların Önünü Açan Tarihi Bürokratik Adım"</span>
            </div>
            <div className="bg-indigo-950/40 p-2 rounded-lg border border-indigo-500/40 flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-indigo-900 text-indigo-200 text-[9px] font-mono">Project FN (Olay)</span>
              <span className="text-slate-100 font-medium">"Resmi Gazete No 32.140 ile çevre etki eşiği 50 MW'tan 80 MW'a çekildi."</span>
            </div>
          </div>
        )}

        {selectedNewsTab === 'kronoloji' && (
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1.5 text-[10px]">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="font-mono text-indigo-400">12 Ağu:</span> Şartname taslağı kamuoyu görüşüne açıldı.
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="font-mono text-indigo-400">18 Ağu:</span> TMMOB itiraz dilekçesi verdi.
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <span className="font-mono text-emerald-400">22 Ağu:</span> Bakanlık revize maddeleri Resmi Gazete'de yayımladı.
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <Scale className="w-3 h-3 text-indigo-400" />
          <span>Haber nesnesi objektiftir; elle karne doldurulamaz, algoritmik tık tuzağı barınamaz.</span>
        </div>
      </div>
    </div>
  );
};
