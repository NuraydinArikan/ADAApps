import React from 'react';
import { AppItem } from '../types';
import { QRCodeDisplay } from './QRCodeDisplay';
import { X, ExternalLink } from 'lucide-react';

interface QRCodeModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ app, isOpen, onClose }) => {
  if (!isOpen || !app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-base font-bold text-white font-display">
            {app.name} • Mobil Kurulum
          </h3>
          <p className="text-xs text-slate-400">
            Kameranızı doğrultarak uygulamayı anında telefonunuzda açın ve ana ekranınıza ekleyin.
          </p>
        </div>

        <QRCodeDisplay url={app.url} appName={app.name} accentColor={app.accentColor} />

        <div className="mt-4 text-center">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            <span>Doğrudan tarayıcı sekmesinde aç</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
