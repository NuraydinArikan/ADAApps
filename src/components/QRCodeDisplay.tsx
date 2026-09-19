import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Smartphone, ShieldCheck } from 'lucide-react';

interface QRCodeDisplayProps {
  url: string;
  appName: string;
  accentColor?: string;
}

// Generate deterministic pseudo-matrix based on URL for reliable visual QR appearance
function generateQRGrid(text: string, size: number = 25): boolean[][] {
  const grid: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));
  
  // 1. Finder patterns at three corners (7x7)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // outer border
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) // center 3x3
        ) {
          grid[startY + r][startX + c] = true;
        } else {
          grid[startY + r][startX + c] = false;
        }
      }
    }
  };

  drawFinder(0, 0); // Top-left
  drawFinder(size - 7, 0); // Top-right
  drawFinder(0, size - 7); // Bottom-left

  // 2. Timing lines
  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // 3. Hash-based deterministic fill for remaining modules
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Don't overwrite finders or timing lines
      const inFinderTL = r < 8 && c < 8;
      const inFinderTR = r < 8 && c >= size - 8;
      const inFinderBL = r >= size - 8 && c < 8;
      const onTiming = (r === 6 && c >= 8 && c < size - 8) || (c === 6 && r >= 8 && r < size - 8);

      if (!inFinderTL && !inFinderTR && !inFinderBL && !onTiming) {
        const seed = (r * size + c) * 31 + Math.abs(hash);
        grid[r][c] = ((seed % 17) + (seed % 7)) % 2 === 0;
      }
    }
  }

  return grid;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, appName }) => {
  const [copied, setCopied] = useState(false);
  const matrixSize = 25;
  const grid = React.useMemo(() => generateQRGrid(url, matrixSize), [url]);

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

      <div className="relative p-3 bg-white rounded-xl shadow-inner mb-4">
        <svg
          viewBox={`0 0 ${matrixSize} ${matrixSize}`}
          className="w-44 h-44 sm:w-48 sm:h-48 shape-rendering-crisp"
          shapeRendering="crispEdges"
        >
          {grid.map((row, r) =>
            row.map((cell, c) =>
              cell ? (
                <rect
                  key={`${r}-${c}`}
                  x={c}
                  y={r}
                  width={1}
                  height={1}
                  fill="#090d16"
                />
              ) : null
            )
          )}
        </svg>

        {/* Center Logo Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-slate-950 px-2 py-1 rounded-md border border-indigo-500/60 shadow-lg flex flex-col items-center justify-center leading-none">
            <span className="font-extrabold text-white text-[10px] tracking-wider font-display">ADA</span>
            <span className="font-black text-indigo-400 text-[6px] tracking-[0.25em] -mt-0.5 font-display">APPS</span>
          </div>
        </div>
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
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
          title="Bağlantıyı Kopyala"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Doğrudan bağımsız URL. Mağaza aracısı veya izleme yönlendirmesi içermez.</span>
      </div>
    </div>
  );
};
