import React, { useState } from 'react';
import { AppItem } from '../types';
import { 
  TrendingUp, 
  Check, 
  Sparkles, 
  Send,
  Zap,
  ArrowRight,
  Clock,
  Bell,
  BellRing,
  HeartPulse,
  ShieldCheck,
  RefreshCw,
  Wind,
  Music,
  Volume2,
  Play,
  Pause,
  Shield,
  ShieldAlert,
  Lock,
  Coffee,
  QrCode,
  Scale,
  FileText,
  Sliders,
  Eye,
  Radio,
  Users,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Waves
} from 'lucide-react';

interface AppMockupPreviewProps {
  app: AppItem;
}

export const AppMockupPreview: React.FC<AppMockupPreviewProps> = ({ app }) => {
  // Evdeki Hesap states
  const [budgetTotal, setBudgetTotal] = useState(42500);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('Bu ay market harcamalarınız bütçenizin %65\'inde; haftalık sebze alışverişini pazara kaydırarak ₺1.400 tasarruf edebilirsiniz.');

  // GuitarFriends states
  const [isPlayingGuitar, setIsPlayingGuitar] = useState(false);
  const [activeChord, setActiveChord] = useState('Am');
  const [currentLineIndex, setCurrentLineIndex] = useState(1);
  const [ambience, setAmbience] = useState<'campfire' | 'beach' | 'rain'>('campfire');
  const [syncedDevices, setSyncedDevices] = useState(4);

  // OpenGuard states
  const [shieldActive, setShieldActive] = useState(true);
  const [dohActive, setDohActive] = useState(true);
  const [blockedThreats, setBlockedThreats] = useState(7);

  // haberverbana.app states
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  // Less Token states
  const [tokenInput, setTokenInput] = useState(
    "Lütfen bana modern bir web uygulamasının mimarisi hakkında oldukça ayrıntılı ve gereksiz laf kalabalığı olmadan özet bir açıklama sunabilir misiniz?"
  );
  const [isCompressed, setIsCompressed] = useState(false);

  // Koza voice states
  const [voiceMaskActive, setVoiceMaskActive] = useState(true);
  const [formantShift, setFormantShift] = useState('+4 yarım ton');
  const [breathPhase, setBreathPhase] = useState<'Nefes Al (4s)' | 'Tut (7s)' | 'Yavaşça Ver (8s)'>('Nefes Al (4s)');

  // KahveApps states
  const [coffeeStamps, setCoffeeStamps] = useState(8);
  const [qrShowing, setQrShowing] = useState(false);

  // Project FN fact-check states
  const [selectedNewsTab, setSelectedNewsTab] = useState<'karne' | 'karsilastirma' | 'kronoloji'>('karne');

  // Algorithmless view state
  const [algoView, setAlgoView] = useState<'matris' | 'carkifelek'>('matris');

  // 1. Evdeki Hesap: 17 Modül & Mutfak Masası AI
  if (app.mockupType === 'finance_dashboard') {
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
  }

  // 2. GuitarFriends: Karplus-Strong Akustik Sentez & Senkronize Sözler
  if (app.mockupType === 'guitar_sync') {
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
  }

  // 3. OpenGuard: Windows 11 Masaüstü Sistem Sertleştirmesi
  if (app.mockupType === 'openguard_shield') {
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
  }

  // 4. haberverbana.app: Web & Fiyat Değişim Alarmı
  if (app.mockupType === 'alert_monitor') {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs relative">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="font-semibold text-slate-200">haberverbana.app • Takip & Alarm</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
            <BellRing className="w-3 h-3 animate-bounce" />
            <span>Web Push Aktif</span>
          </div>
        </div>

        {simulatedAlert && (
          <div className="m-3 p-3 bg-gradient-to-r from-amber-900/90 to-orange-950/90 border border-amber-500/60 rounded-xl text-amber-100 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white">haberverbana.app: Fiyat Alarmı! 🔔</div>
                  <div className="text-[11px] text-amber-200">Takip ettiğiniz ürün ₺34.500 → <strong>₺29.499</strong> seviyesine geriledi!</div>
                </div>
              </div>
              <button
                onClick={() => setSimulatedAlert(false)}
                className="text-amber-300 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">İndirim Alarmı</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-2.5 h-2.5" /> Hedefe Ulaşıldı
              </span>
            </div>
            <div className="font-medium text-slate-200 text-xs">
              Asus ROG Gaming Laptop (Hedef: &lt; ₺32.000)
            </div>
            <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-400">Son Fiyat: <strong className="text-emerald-400">₺29.499</strong></span>
              <span className="text-slate-500 text-[10px]">2 dk önce denetlendi</span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">İçerik & Kontenjan Takibi</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Her 5 dk izleniyor
              </span>
            </div>
            <div className="font-medium text-slate-200 text-xs">
              Vize Başvuru Randevu Sayfası ("Boş Randevu" kuralı)
            </div>
            <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-400">Kriter: <span className="text-slate-300 font-mono">"Randevu Açıldı"</span></span>
              <span className="text-amber-400 text-[10px]">PWA Arka Planda Aktif</span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              onClick={() => setSimulatedAlert(true)}
              className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Simüle Push Alarmı Gönder</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>İzlediğiniz URL'ler ve kurallar yalnızca cihazınızda tutulur.</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Less Token: LLM Token & Maliyet Tasarrufu
  if (app.mockupType === 'token_counter') {
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
  }

  // 6. Koza: Anonim Eşten-Eşe Sesli Ruhsal Destek Ağı
  if (app.mockupType === 'therapy_voice') {
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
  }

  // 7. KahveApps: Semt Kahvecisi Sadakat Cüzdanı & QR Damga
  if (app.mockupType === 'kahve_wallet') {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-slate-200">KahveApps • Semt Sadakat Cüzdanı</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
            Ankara Pilot Hattı
          </span>
        </div>

        <div className="p-4 space-y-3.5">
          {/* Coffee Stamp Card */}
          <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-100 text-xs">Kukla Kahveci (Tunalı Hilmi)</div>
                <div className="text-[10px] text-amber-400">10 Damgaya 1 Filtre Kahve Hediye!</div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300">{coffeeStamps} / 10 Damga</span>
            </div>

            {/* Stamp Grid */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-8 rounded-lg flex items-center justify-center border transition ${
                    idx < coffeeStamps
                      ? 'bg-amber-600/30 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}
                >
                  {idx < coffeeStamps ? <Check className="w-4 h-4 text-amber-400" /> : idx + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Barista QR Toggle */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                if (coffeeStamps < 10) setCoffeeStamps(prev => prev + 1);
                else setCoffeeStamps(1);
              }}
              className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>{coffeeStamps >= 10 ? 'Hediyeyi Al (Sıfırla)' : '+1 Damga Bas'}</span>
            </button>

            <button
              onClick={() => setQrShowing(!qrShowing)}
              className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-lg transition cursor-pointer flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>{qrShowing ? 'Kapat' : 'Barista QR'}</span>
            </button>
          </div>

          {qrShowing && (
            <div className="p-3 bg-white text-slate-950 rounded-xl text-center font-mono text-[10px] space-y-1 animate-in zoom-in-95">
              <div className="font-bold text-xs">SUNUCU İMZALI DİNAMİK QR</div>
              <div className="p-2 bg-slate-100 rounded border border-slate-300 inline-block font-mono tracking-widest text-[9px]">
                KAHVE-TUNALI-9482-SECURE
              </div>
              <div className="text-slate-500 text-[9px]">Kasa görevlisine 3 saniyede okutun</div>
            </div>
          )}

          <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-amber-400" />
            <span>Kağıt kart taşımaya son; semtin tüm bağımsız kahvecileri tek cüzdanda.</span>
          </div>
        </div>
      </div>
    );
  }

  // 8. Project FN: Doğrulanabilir Gazetecilik & Doğrulama Karnesi
  if (app.mockupType === 'journalism_factcheck') {
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
            ].map(tab => (
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
  }

  // 9. Algorithmless: Yankı Odası Karşıtı Medya Küratörlüğü (Matris & Çarkıfelek)
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200">Algorithmless • Yankı Odası Kırıcı</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAlgoView('matris')}
            className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${algoView === 'matris' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'}`}
          >
            Matris
          </button>
          <button
            onClick={() => setAlgoView('carkifelek')}
            className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${algoView === 'carkifelek' ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400'}`}
          >
            Çarkıfelek
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {algoView === 'matris' ? (
          <div className="space-y-2">
            <div className="text-[11px] text-slate-300 font-medium">Gündem: "Merkez Bankası Faiz Kararı ve Enflasyon"</div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <div className="bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <span className="text-amber-400 font-semibold block">YouTube (Analiz)</span>
                <p className="text-slate-300 line-clamp-2">"Piyasaların beklediği faiz patikasında 3 kritik risk faktörü..."</p>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-semibold block">Bağımsız Basın</span>
                <p className="text-slate-300 line-clamp-2">"Sabit gelirlilerin enflasyon karşısındaki alım gücü erimesi..."</p>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-semibold block">Uluslararası (FT)</span>
                <p className="text-slate-300 line-clamp-2">"Yabancı sermaye girişlerinde reel faiz dengesi kuruluyor..."</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
            <div className="text-sm font-bold text-cyan-300">🎡 Çarkıfelek Perspektif Keşfi</div>
            <p className="text-[11px] text-slate-300 italic">
              "Kendi siyasi veya ideolojik filtrenizin dışındaki 3 farklı kaynağın yorumunu okumak üzeresiniz."
            </p>
            <div className="inline-block px-3 py-1 bg-cyan-950 text-cyan-300 rounded-full border border-cyan-500/30 text-[10px]">
              Tetiklenen Açı: Bağımsız Yerel Gazetecilik + Dış Basın
            </div>
          </div>
        )}

        <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
          <span>Algoritma değil, sen seç. Filtre balonlarını kıran bilinçli medya tüketimi.</span>
        </div>
      </div>
    </div>
  );
};
