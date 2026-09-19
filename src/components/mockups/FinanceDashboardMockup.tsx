import React, { useState } from 'react';
import { TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const FinanceDashboardMockup: React.FC<MockupProps> = () => {
  const [budgetTotal, setBudgetTotal] = useState(42500);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const aiMessage = "Bu ay market harcamalarınız bütçenizin %65'inde; haftalık sebze alışverişini pazara kaydırarak ₺1.400 tasarruf edebilirsiniz.";

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span className="ml-2 font-mono text-[11px] text-slate-300 font-semibold">evdekihesap.app</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
            17 Modül Canlı
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Aile Modu (Şifreli)
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-3">
            <span className="text-[10px] text-slate-400 block mb-1">Eylül Aile Bütçesi</span>
            <div className="text-lg font-bold text-white tracking-tight">
              ₺{budgetTotal.toLocaleString('tr-TR')}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>Planlanan limitin %78'i harcandı</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-3">
            <span className="text-[10px] text-slate-400 block mb-1">Aktif Modüller</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {['Market', 'Bütçe', 'Abonelik', 'Gardırop', 'Diyet', 'Araç'].map((m) => (
                <span key={m} className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300">
                  {m}
                </span>
              ))}
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-[9px] text-emerald-300 border border-emerald-500/30">
                +11 modül
              </span>
            </div>
          </div>
        </div>

        {/* Mutfak Masası Gemini AI Assistant */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mutfak Masası (Gemini AI Asistanı)</span>
            </div>
            <button
              onClick={() => setAiChatOpen(!aiChatOpen)}
              className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
            >
              {aiChatOpen ? 'Kapat' : 'Analiz Göster'}
            </button>
          </div>
          <p className="text-[11px] text-slate-300 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
            "{aiMessage}"
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setBudgetTotal(prev => prev + 500)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] transition cursor-pointer"
            >
              + ₺500 Harcama Ekle
            </button>
            <button 
              onClick={() => setBudgetTotal(42500)}
              className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              Sıfırla
            </button>
          </div>
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Banka şifresi istenmez, veriler cihazınızda şifrelenir
          </span>
        </div>
      </div>
    </div>
  );
};
