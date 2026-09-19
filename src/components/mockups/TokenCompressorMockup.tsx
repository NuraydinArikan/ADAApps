import React, { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const TokenCompressorMockup: React.FC<MockupProps> = () => {
  const [tokenInput, setTokenInput] = useState(
    "Lütfen bana modern bir web uygulamasının mimarisi hakkında oldukça ayrıntılı ve gereksiz laf kalabalığı olmadan özet bir açıklama sunabilir misiniz?"
  );
  const [isCompressed, setIsCompressed] = useState(false);
  const rawTokens = 32;
  const optimizedTokens = 19;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-sky-500 flex items-center justify-center text-[9px] font-bold text-slate-950">
            LT
          </div>
          <span className="font-semibold text-slate-200">LessToken • Chrome MV3 & Web</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-500/30">
          %95 PDF & Görsel Sıkıştırma
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <label className="text-[11px] text-slate-400 block mb-1">İstem (Prompt) veya Doküman İçeriği:</label>
          <textarea
            value={isCompressed ? "Web uygulama mimarisini laf kalabalığı olmadan özetleyin." : tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-200 font-mono resize-none focus:outline-none focus:border-sky-500/50"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-lg p-2.5">
          <div>
            <div className="text-[10px] text-slate-400">Token Tüketimi:</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`font-mono font-bold ${isCompressed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {rawTokens} token
              </span>
              {isCompressed && (
                <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  {optimizedTokens} token (%41 Tasarruf)
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsCompressed(!isCompressed)}
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-slate-950 font-semibold rounded-md transition cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isCompressed ? 'Orijinali Göster' : 'Optimize Et'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Desteklenen Modeller: GPT-4o, Claude 3.5, Gemini, DeepSeek</span>
          <span className="text-sky-400 font-mono">v1.0.1 Paket Hazır</span>
        </div>
      </div>
    </div>
  );
};
