import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Smartphone, ShieldCheck, ExternalLink } from 'lucide-react';

interface QRCodeDisplayProps {
  url: string;
  appName: string;
  accentColor?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, appName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    setHasError(false);
    
    QRCode.toCanvas(
      canvasRef.current,
      url,
      {
        width: 220,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#090d16',
          light: '#ffffff'
        }
      },
      (err) => {
        if (err) {
          console.error('QR code generation error:', err);
          setHasError(true);
        }
      }
    );
  }, [url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center shadow-xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-4">
        <Smartphone className="w-3.5 h-3.5" />
        Mobil Cihazınızın Kamerasını Doğrultun
      </div>

      <div className="relative p-2.5 bg-white rounded-2xl shadow-inner mb-4 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl block"
        />

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 text-slate-300 text-xs p-4 rounded-2xl">
            QR kod oluşturulamadı. Lütfen aşağıdaki bağlantıyı kullanın.
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 max-w-xs mb-3">
        iPhone (Safari) veya Android (Chrome) kameranızla taratarak <strong className="text-slate-200">{appName}</strong> uygulamasına anında erişin.
      </p>

      <div className="w-full flex flex-col sm:flex-row items-center gap-2 mt-1">
        <div className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 truncate text-left">
          {url}
        </div>
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer shrink-0"
          title="Bağlantıyı Kopyala"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition cursor-pointer shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Aç</span>
        </a>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Standart ISO QR Kod. Mağaza aracısı veya yönlendirme izleyicisi içermez.</span>
      </div>
    </div>
  );
};
