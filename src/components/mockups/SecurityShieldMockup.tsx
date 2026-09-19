import React, { useState } from 'react';
import { Shield, ShieldCheck, Lock } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const SecurityShieldMockup: React.FC<MockupProps> = () => {
  const [shieldActive, setShieldActive] = useState(true);
  const [blockedThreats, setBlockedThreats] = useState(7);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs font-sans">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-200">OpenGuard • Windows 11 Hardening v0.7.0</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30">
          PyQt6 Masaüstü
        </span>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Status Header */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${shieldActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-100 text-xs">
                {shieldActive ? 'Ortak Wi-Fi Sertleştirme Aktif' : 'Güvenlik Duvarı Normal Modda'}
              </div>
              <div className="text-[10px] text-slate-400">
                {shieldActive ? 'NetBIOS/SMB engellendi, port taramaları sessize alındı' : 'Korumayı etkinleştirmek için butona basın'}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShieldActive(!shieldActive);
              if (!shieldActive) setBlockedThreats(prev => prev + 1);
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              shieldActive 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {shieldActive ? 'Kalkan Açık' : 'Kalkanı Aç'}
          </button>
        </div>

        {/* Hardening Checklist */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-slate-900/70 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
            <span className="text-slate-300">DNS-over-HTTPS (DoH)</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[9px] border border-emerald-500/30">ZORUNLU</span>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
            <span className="text-slate-300">SMB & Port 445</span>
            <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 font-mono text-[9px] border border-rose-500/30">KAPALI</span>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
            <span className="text-slate-300">ProcessMonitor IPC</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 font-mono text-[9px] border border-blue-500/30">CANLI</span>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
            <span className="text-slate-300">Engellenen Tehdit</span>
            <span className="font-mono text-blue-300 font-bold">{blockedThreats} prob</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-blue-400" />
          <span>VPN değildir; trafiği yavaşlatmaz, Windows 11 yerel güvenlik yüzeyini kilitler.</span>
        </div>
      </div>
    </div>
  );
};
