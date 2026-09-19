import React, { useState } from 'react';
import { HeartPulse, Wind, ShieldCheck } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const VoiceTherapyMockup: React.FC<MockupProps> = () => {
  const [voiceMaskActive, setVoiceMaskActive] = useState(true);
  const formantShift = '+4 yarım ton';
  const [breathPhase, setBreathPhase] = useState<'Nefes Al (4s)' | 'Tut (7s)' | 'Yavaşça Ver (8s)'>('Nefes Al (4s)');

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-teal-400" />
          <span className="font-semibold text-slate-200">Koza • Akran Destek Ağı (Anonim Ses)</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-500/30">
          WebRTC P2P &lt;50ms
        </span>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Voice Mask Simulator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">Web Audio API Ses Maskeleme</span>
              <div className="font-medium text-slate-200 text-xs">Gerçek Zamanlı Formant Shifting</div>
            </div>
            <button
              onClick={() => setVoiceMaskActive(!voiceMaskActive)}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition cursor-pointer ${
                voiceMaskActive ? 'bg-teal-600 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {voiceMaskActive ? 'Ses Maskesi Aktif' : 'Maske Kapalı'}
            </button>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Filtre Tonu: <strong className="text-teal-300">{formantShift}</strong></span>
            <span className="text-slate-500 font-mono text-[10px]">&lt;42ms latency</span>
          </div>
        </div>

        {/* Semantic Matching */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold text-indigo-400 uppercase tracking-wider">OpenAI Embeddings Eşleşmesi</span>
            <span className="text-emerald-400">Anlamsal Benzerlik: %94</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            "İş tükenmişliği ve geleceğe dair belirsizlik hissi" yaşayan bir akranla WebRTC üzerinden uçtan uca şifreli sesli bağ kuruldu.
          </p>
        </div>

        {/* 4-7-8 Breath Regulation */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
              <Wind className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-200">4-7-8 Regülasyon Nefesi</div>
              <div className="text-[9px] text-slate-400">Görüşme öncesi kalp ritmini dengeler</div>
            </div>
          </div>

          <button
            onClick={() => {
              if (breathPhase === 'Nefes Al (4s)') setBreathPhase('Tut (7s)');
              else if (breathPhase === 'Tut (7s)') setBreathPhase('Yavaşça Ver (8s)');
              else setBreathPhase('Nefes Al (4s)');
            }}
            className="px-2.5 py-1 bg-teal-800/50 hover:bg-teal-700 text-teal-200 text-[10px] font-semibold rounded-lg transition cursor-pointer"
          >
            {breathPhase}
          </button>
        </div>

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-teal-400" />
          <span>Tıbbi teşhis değildir; akranlar arası mutlak anonim dertleşme alanıdır.</span>
        </div>
      </div>
    </div>
  );
};
