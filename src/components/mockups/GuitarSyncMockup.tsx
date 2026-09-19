import React, { useState } from 'react';
import { Music, Radio, Pause, Play, Flame, Waves, Wind, Volume2 } from 'lucide-react';
import { AppItem } from '../../types';

interface MockupProps {
  app: AppItem;
}

export const GuitarSyncMockup: React.FC<MockupProps> = () => {
  const [isPlayingGuitar, setIsPlayingGuitar] = useState(false);
  const [activeChord, setActiveChord] = useState('Am');
  const [currentLineIndex, setCurrentLineIndex] = useState(1);
  const [ambience, setAmbience] = useState<'campfire' | 'beach' | 'rain'>('campfire');
  const syncedDevices = 4;

  const songLines = [
    { chord: 'Am', lyric: 'Bir fırtına tuttu bizi, deryaya kardı...' },
    { chord: 'Dm', lyric: 'O dert beni köşe köşe yabana attı...' },
    { chord: 'E7', lyric: 'Yazılanlar gelir başa, kurban olayım...' },
    { chord: 'Am', lyric: 'Gözün aydın olsun felek, muradın erdi...' }
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-slate-200">GuitarFriends • Canlı Akustik Halka</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">
            <Radio className="w-2.5 h-2.5 animate-pulse text-rose-400" />
            <span>{syncedDevices} Cihaz Senkron</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Active Song Stage & Chords */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Şarkı & Senkron Akor</span>
              <div className="font-bold text-slate-100 text-sm">Bir Fırtına Tuttu Bizi (Geleneksel)</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400">Karplus-Strong Sentezi:</span>
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${isPlayingGuitar ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                {activeChord}
              </span>
            </div>
          </div>

          {/* Scrolling Lyrics */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 font-mono text-[11px]">
            {songLines.map((line, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setCurrentLineIndex(idx);
                  setActiveChord(line.chord);
                }}
                className={`p-1.5 rounded transition cursor-pointer flex items-baseline justify-between ${
                  idx === currentLineIndex 
                    ? 'bg-amber-950/60 border border-amber-500/40 text-amber-100' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{line.lyric}</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 font-bold text-[10px]">{line.chord}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Controls & Ambience */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setIsPlayingGuitar(!isPlayingGuitar);
              if (!isPlayingGuitar) {
                setCurrentLineIndex((prev) => (prev + 1) % songLines.length);
                setActiveChord(songLines[(currentLineIndex + 1) % songLines.length].chord);
              }
            }}
            className="py-2 px-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
          >
            {isPlayingGuitar ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingGuitar ? 'Eşliği Durdur' : 'Akustik Teli Titret'}</span>
          </button>

          {/* Ambience Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 justify-around">
            <button 
              onClick={() => setAmbience('campfire')}
              className={`p-1 rounded flex items-center gap-1 text-[10px] cursor-pointer ${ambience === 'campfire' ? 'bg-amber-950 text-amber-300 font-bold' : 'text-slate-400'}`}
            >
              <Flame className="w-3 h-3 text-amber-400" /> Ateş
            </button>
            <button 
              onClick={() => setAmbience('beach')}
              className={`p-1 rounded flex items-center gap-1 text-[10px] cursor-pointer ${ambience === 'beach' ? 'bg-cyan-950 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              <Waves className="w-3 h-3 text-cyan-400" /> Kumsal
            </button>
            <button 
              onClick={() => setAmbience('rain')}
              className={`p-1 rounded flex items-center gap-1 text-[10px] cursor-pointer ${ambience === 'rain' ? 'bg-indigo-950 text-indigo-300 font-bold' : 'text-slate-400'}`}
            >
              <Wind className="w-3 h-3 text-indigo-400" /> Yağmur
            </button>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <Volume2 className="w-3 h-3 text-amber-400" />
          <span>MP3 kaydı çalmaz; Web Audio API Karplus-Strong canlı telli sentezidir.</span>
        </div>
      </div>
    </div>
  );
};
