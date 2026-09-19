import React, { useState } from 'react';
import { AppItem } from '../types';
import { AppMockupPreview } from './AppMockupPreview';
import { 
  X, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LiveDemoDrawerProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDetails: (app: AppItem) => void;
  onOpenQR: (app: AppItem) => void;
}

export const LiveDemoDrawer: React.FC<LiveDemoDrawerProps> = ({
  app,
  isOpen,
  onClose,
  onOpenDetails,
  onOpenQR
}) => {
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'desktop'>('mobile');

  if (!isOpen || !app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="font-bold text-white text-sm sm:text-base font-display">
                {app.name} • Canlı Sandbox Önizlemesi
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setDeviceFrame('mobile')}
                className={`p-1.5 rounded transition cursor-pointer ${
                  deviceFrame === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobil Çerçeve"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceFrame('desktop')}
                className={`p-1.5 rounded transition cursor-pointer ${
                  deviceFrame === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Masaüstü Çerçeve"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body with Mobile or Desktop Frame */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/40">
          {deviceFrame === 'mobile' ? (
            <div className="w-full max-w-[340px] bg-slate-900 border-4 border-slate-800 rounded-[36px] p-3 shadow-2xl relative">
              {/* Phone Notch / Dynamic Island */}
              <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-3"></div>
              
              <div className="rounded-[24px] overflow-hidden">
                <AppMockupPreview app={app} />
              </div>

              {/* Phone Bottom Home Bar */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-4"></div>
            </div>
          ) : (
            <div className="w-full max-w-xl">
              <AppMockupPreview app={app} />
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-[11px] text-center sm:text-left">
            <span>{app.tagline}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {app.platform === 'pwa' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenQR(app);
                }}
                className="flex-1 sm:flex-initial px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Kod</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenDetails(app);
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <span>Detaylı İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
