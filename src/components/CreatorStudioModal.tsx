import React, { useState, useEffect, useRef } from 'react';
import { AppItem, AppCategory, AppPlatform, AppStatus } from '../types';
import { getAppStatusMeta } from '../utils/statusMeta';
import { 
  getWaitlistSubmissions, 
  isSupabaseConfigured,
  getSupabaseConfig,
  setSupabaseConfig,
  testSupabaseConnection 
} from '../lib/waitlistService';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Sliders, 
  Users, 
  FileText, 
  AlertCircle,
  Database,
  Cloud,
  CheckCircle2,
  RefreshCw,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CreatorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onSaveApps: (updated: AppItem[]) => void;
  onResetApps: () => void;
}

export const CreatorStudioModal: React.FC<CreatorStudioModalProps> = ({
  isOpen,
  onClose,
  apps,
  onSaveApps,
  onResetApps
}) => {
  const [activeTab, setActiveTab] = useState<'manage' | 'form' | 'waitlist'>('manage');
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states (used for both Create and Edit)
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formProblem, setFormProblem] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formCategory, setFormCategory] = useState<AppCategory>('productivity');
  const [formPlatform, setFormPlatform] = useState<AppPlatform>('pwa');
  const [formStatus, setFormStatus] = useState<AppStatus>('live');
  const [formUrl, setFormUrl] = useState('https://');
  const [formTech, setFormTech] = useState('React, PWA, Tailwind');
  const [formFeatures, setFormFeatures] = useState('Offline hazır, Hızlı senkronizasyon, Şifreli veri');
  const [formUrlError, setFormUrlError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Waitlist data state
  const [waitlistData, setWaitlistData] = useState<any[]>([]);
  const [isLoadingWaitlist, setIsLoadingWaitlist] = useState(false);
  const [supabaseConfig, setSupabaseConfigState] = useState(() => getSupabaseConfig());
  const [customSbUrl, setCustomSbUrl] = useState('');
  const [customSbKey, setCustomSbKey] = useState('');
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; tableExists?: boolean } | null>(null);
  const [isTestingSb, setIsTestingSb] = useState(false);
  const [showSbSettings, setShowSbSettings] = useState(false);

  useEffect(() => {
    const cfg = getSupabaseConfig();
    setSupabaseConfigState(cfg);
    setCustomSbUrl(cfg.url);
    setCustomSbKey(cfg.key);
    setShowSbSettings(!cfg.isConfigured);
  }, [isOpen]);

  const refreshWaitlist = () => {
    setIsLoadingWaitlist(true);
    getWaitlistSubmissions()
      .then((data) => setWaitlistData(data))
      .catch(() => setWaitlistData([]))
      .finally(() => setIsLoadingWaitlist(false));
  };

  useEffect(() => {
    if (isOpen && activeTab === 'waitlist') {
      refreshWaitlist();
    }
  }, [isOpen, activeTab]);

  const handleTestSupabase = async () => {
    setIsTestingSb(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection();
      setTestResult(res);
      if (res.ok) {
        refreshWaitlist();
      }
    } catch (err: any) {
      setTestResult({ ok: false, message: `Hata: ${err.message}` });
    } finally {
      setIsTestingSb(false);
    }
  };

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupabaseConfig(customSbUrl.trim(), customSbKey.trim());
    const updated = getSupabaseConfig();
    setSupabaseConfigState(updated);
    await handleTestSupabase();
  };

  const handleClearSupabaseConfig = () => {
    setSupabaseConfig('', '');
    const updated = getSupabaseConfig();
    setSupabaseConfigState(updated);
    setCustomSbUrl('');
    setCustomSbKey('');
    setTestResult(null);
    refreshWaitlist();
  };

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingAppId(null);
    setFormName('');
    setFormTagline('');
    setFormDesc('');
    setFormProblem('');
    setFormSolution('');
    setFormCategory('productivity');
    setFormPlatform('pwa');
    setFormStatus('live');
    setFormUrl('https://');
    setFormTech('React, PWA, Tailwind');
    setFormFeatures('Offline hazır, Hızlı senkronizasyon, Şifreli veri');
    setFormUrlError(null);
  };

  const handleStartEdit = (app: AppItem) => {
    setEditingAppId(app.id);
    setFormName(app.name);
    setFormTagline(app.tagline);
    setFormDesc(app.description);
    setFormProblem(app.problem);
    setFormSolution(app.solution);
    setFormCategory(app.category);
    setFormPlatform(app.platform);
    setFormStatus(app.status);
    setFormUrl(app.url);
    setFormTech(app.techStack.join(', '));
    setFormFeatures(app.features.join(', '));
    setFormUrlError(null);
    setActiveTab('form');
  };

  const handleStartCreate = () => {
    resetForm();
    setActiveTab('form');
  };

  const validateUrl = (urlStr: string): boolean => {
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (!validateUrl(formUrl.trim())) {
      setFormUrlError('Lütfen geçerli bir URL girin (ör. https://ornek.app)');
      return;
    }
    setFormUrlError(null);

    const techArray = formTech.split(',').map((s) => s.trim()).filter(Boolean);
    const featuresArray = formFeatures.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingAppId) {
      // Edit existing app
      const updated = apps.map((app) => {
        if (app.id === editingAppId) {
          return {
            ...app,
            name: formName.trim(),
            tagline: formTagline.trim() || app.tagline,
            description: formDesc.trim() || app.description,
            problem: formProblem.trim() || app.problem,
            solution: formSolution.trim() || app.solution,
            category: formCategory,
            platform: formPlatform,
            status: formStatus,
            url: formUrl.trim(),
            techStack: techArray.length > 0 ? techArray : app.techStack,
            features: featuresArray.length > 0 ? featuresArray : app.features,
            lastUpdated: 'Güncellendi'
          };
        }
        return app;
      });
      onSaveApps(updated);
    } else {
      // Create new app
      const id = formName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const created: AppItem = {
        id: id || `app-${Date.now()}`,
        name: formName.trim(),
        tagline: formTagline.trim() || 'Yeni Nesil Bağımsız Uygulama',
        description: formDesc.trim() || 'ADA Studio çatısı altında geliştirilen bağımsız yazılım aracı.',
        problem: formProblem.trim() || 'Kullanıcıların karşılaştığı verimsizlik ve gereksiz karmaşa.',
        solution: formSolution.trim() || 'Sade, hafif ve doğrudan tarayıcıda çalışan çözüm.',
        category: formCategory,
        platform: formPlatform,
        status: formStatus,
        url: formUrl.trim(),
        iconName: formPlatform === 'pwa' ? 'Smartphone' : formPlatform === 'chrome_extension' ? 'Cpu' : 'Globe',
        accentColor: 'from-indigo-500 to-purple-600',
        previewAccent: 'indigo',
        badgeText: formPlatform === 'pwa' ? 'PWA • Bağımsız' : 'Tarayıcı Aracı',
        verifiedBadge: formPlatform === 'pwa' ? 'Doğrulanmış PWA' : 'Bağımsız Araç',
        features: featuresArray,
        techStack: techArray,
        lastUpdated: 'Yeni Eklendi',
        isFeatured: false,
        privacyHighlights: ['Kullanıcı Odaklı Gizlilik', 'Yerel Öncelikli Mimari', 'Açık Standartlar'],
        privacyArchitecture: {
          localData: 'Cihaz içi yerel depolama',
          serverSync: 'Yok / Doğrudan istemci',
          aiExternalApi: 'Yok',
          accountRequired: 'Gerektirmez'
        },
        changelog: [
          {
            version: 'v1.0.0',
            date: 'Yeni Sürüm',
            notes: ['İlk lansman sürümü']
          }
        ],
        mockupType: 'clean_feed'
      };
      onSaveApps([created, ...apps]);
    }

    resetForm();
    setActiveTab('manage');
  };

  const handleDeleteApp = (id: string) => {
    if (confirm('Bu uygulamayı stüdyo kataloğundan kaldırmak istediğinize emin misiniz?')) {
      onSaveApps(apps.filter((a) => a.id !== id));
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(apps, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adaapps-catalog-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].name) {
          onSaveApps(parsed);
          setImportStatus('Katalog başarıyla yüklendi!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Hata: Geçersiz katalog formatı.');
        }
      } catch {
        setImportStatus('Hata: JSON dosyası okunamadı.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportWaitlistCSV = () => {
    if (waitlistData.length === 0) return;
    const header = 'E-posta,Uygulama,Tarih\n';
    const rows = waitlistData.map((w) => `"${w.email}","${w.appName}","${w.timestamp}"`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adaapps-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearWaitlist = () => {
    if (confirm('Bekleme listesindeki tüm kayıtları temizlemek istediğinize emin misiniz?')) {
      localStorage.removeItem('adaapps_waitlist');
      setWaitlistData([]);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="creator-studio-title"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="creator-studio-title" className="text-base sm:text-lg font-bold text-white font-display">
                ADA Geliştirici Stüdyo Paneli
              </h3>
              <p className="text-xs text-slate-400">
                Ürün kataloğunu yönetin, uygulamaları düzenleyin ve bekleme listesi verilerini dışa aktarın
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-nav */}
        <div className="px-6 border-b border-slate-800 bg-slate-950/20 flex items-center gap-2 text-xs">
          <button
            onClick={() => { resetForm(); setActiveTab('manage'); }}
            className={`py-3 px-3 font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'manage'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Mevcut Uygulamalar ({apps.length})
          </button>

          <button
            onClick={handleStartCreate}
            className={`py-3 px-3 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'form' && !editingAppId
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Uygulama Ekle</span>
          </button>

          {editingAppId && activeTab === 'form' && (
            <span className="py-3 px-3 font-semibold border-b-2 border-amber-500 text-amber-400 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Uygulamayı Düzenle</span>
            </span>
          )}

          <button
            onClick={() => setActiveTab('waitlist')}
            className={`py-3 px-3 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'waitlist'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Bekleme Listesi ({waitlistData.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {importStatus && (
            <div className={`p-3 rounded-xl text-xs font-medium ${importStatus.includes('Hata') ? 'bg-rose-950/50 text-rose-300 border border-rose-800' : 'bg-emerald-950/50 text-emerald-300 border border-emerald-800'}`}>
              {importStatus}
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
                <span className="text-slate-400 text-xs">
                  Katalog aktarımı, yedekleme ve sıfırlama araçları:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportJSON}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition cursor-pointer text-xs"
                    title="JSON Kataloğu Yükle"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>JSON İçe Aktar</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON İndir</span>
                  </button>

                  <button
                    onClick={onResetApps}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 rounded-lg transition cursor-pointer text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Sıfırla</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {apps.map((app) => {
                  const meta = getAppStatusMeta(app.status);
                  return (
                    <div
                      key={app.id}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${app.accentColor} flex items-center justify-center text-white shrink-0 shadow`}>
                          <span className="font-bold text-xs">{app.name.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white truncate text-sm">{app.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${meta.badgeClass}`}>
                              {meta.label}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{app.tagline}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleStartEdit(app)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 rounded-lg transition cursor-pointer text-xs font-medium"
                          title="Uygulama Bilgilerini Düzenle"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Düzenle</span>
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/50 transition cursor-pointer"
                          title="Uygulamayı Kaldır"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <span className="font-semibold text-slate-200">
                  {editingAppId ? `Düzenleniyor: ${formName}` : 'Yeni Uygulama Kaydı'}
                </span>
                {editingAppId && (
                  <button
                    type="button"
                    onClick={() => { resetForm(); setActiveTab('manage'); }}
                    className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Vazgeç
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Uygulama Adı *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="ör. Evdeki Hesap"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Slogan (Tagline)</label>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="ör. Sade ve Hızlı Finans Asistanı"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Platform Türü</label>
                  <select
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value as AppPlatform)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="pwa">PWA (Web & Mobil)</option>
                    <option value="desktop">Masaüstü (Windows/macOS)</option>
                    <option value="chrome_extension">Tarayıcı Eklentisi</option>
                    <option value="web">Klasik Web Sitesi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Durum</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AppStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="live">Yayında (Canlı)</option>
                    <option value="beta">Açık Beta</option>
                    <option value="in_development">Geliştiriliyor</option>
                    <option value="concept">Konsept / Laboratuvar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AppCategory)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="finance">Ev & Bütçe</option>
                    <option value="music">Müzik & Canlı Eşlik</option>
                    <option value="security">Güvenlik & Sistem Sertleştirme</option>
                    <option value="alerts">Takip & Alarm (Web/Fiyat)</option>
                    <option value="journalism">Medya & Doğrulanabilir Gazetecilik</option>
                    <option value="therapy">Terapi & Akran Destek Ağı</option>
                    <option value="ai_tools">Yapay Zeka & LLM Araçları</option>
                    <option value="loyalty">Sadakat & Yerel İşletme</option>
                    <option value="productivity">Verimlilik & Çalışma</option>
                    <option value="lifestyle">Yaşam & Dijital Denge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Uygulama / PWA URL'si *</label>
                <input
                  type="url"
                  required
                  value={formUrl}
                  onChange={(e) => { setFormUrl(e.target.value); setFormUrlError(null); }}
                  placeholder="https://benimuygulamam.app"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
                {formUrlError && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-[11px] mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formUrlError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Kısa Açıklama</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  placeholder="Uygulamanın genel tanıtımı..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hangi Problemi Çözüyor?</label>
                  <textarea
                    value={formProblem}
                    onChange={(e) => setFormProblem(e.target.value)}
                    rows={2}
                    placeholder="Mevcut uygulamaların yetersizliği..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nasıl Çözüyor?</label>
                  <textarea
                    value={formSolution}
                    onChange={(e) => setFormSolution(e.target.value)}
                    rows={2}
                    placeholder="ADA yaklaşımıyla çözüm..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Teknoloji Yığını (Virgülle ayırın)</label>
                  <input
                    type="text"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    placeholder="React, PWA, Tailwind"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Öne Çıkan Özellikler (Virgülle ayırın)</label>
                  <input
                    type="text"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="Offline hazır, Şifreli veri"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/20 text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{editingAppId ? 'Değişiklikleri Kaydet' : 'Uygulamayı ADA Vitrinine Ekle'}</span>
              </button>
            </form>
          )}

          {activeTab === 'waitlist' && (
            <div className="space-y-4">
              {/* Supabase Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">Erken Erişim & Bülten Talepleri</span>
                    {supabaseConfig.isConfigured ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span>Supabase {supabaseConfig.source === 'env' ? '(.env)' : '(Tarayıcı)'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                        <Cloud className="w-3 h-3 text-amber-400" />
                        <span>Yerel Depolama (Supabase Bekleniyor)</span>
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Toplam {waitlistData.length} kayıtlı ziyaretçi {isLoadingWaitlist ? '(Yükleniyor...)' : ''}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowSbSettings(!showSbSettings)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg transition cursor-pointer text-xs"
                  >
                    <Settings className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Supabase Ayarları & Test</span>
                    {showSbSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <button
                    onClick={handleExportWaitlistCSV}
                    disabled={waitlistData.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-lg transition cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV Dışa Aktar</span>
                  </button>
                  <button
                    onClick={handleClearWaitlist}
                    disabled={waitlistData.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 disabled:opacity-50 border border-rose-500/30 text-rose-300 rounded-lg transition cursor-pointer text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Listeyi Temizle</span>
                  </button>
                </div>
              </div>

              {/* Supabase Interactive Config & Test Panel */}
              {showSbSettings && (
                <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span>Supabase Veritabanı Yapılandırması</span>
                    </div>
                    {supabaseConfig.isConfigured && (
                      <button
                        onClick={handleTestSupabase}
                        disabled={isTestingSb}
                        className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg transition cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3 h-3 ${isTestingSb ? 'animate-spin' : ''}`} />
                        <span>{isTestingSb ? 'Test Ediliyor...' : 'Bağlantıyı Şimdi Test Et'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Bekleme listesi başvurularını Supabase'de saklamak için aşağıdaki iki değeri tanımlayabilirsiniz. Değerler kök dizindeki <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">.env</code> dosyasından otomatik okunur veya doğrudan bu alana yapıştırılabilir.
                  </p>

                  <form onSubmit={handleSaveSupabaseConfig} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Project URL (VITE_SUPABASE_URL)
                        </label>
                        <input
                          type="url"
                          value={customSbUrl}
                          onChange={(e) => setCustomSbUrl(e.target.value)}
                          placeholder="https://xyzcompany.supabase.co"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Anon Public Key (VITE_SUPABASE_ANON_KEY)
                        </label>
                        <input
                          type="password"
                          value={customSbKey}
                          onChange={(e) => setCustomSbKey(e.target.value)}
                          placeholder="eyJhbGciOi..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-600"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          disabled={isTestingSb || !customSbUrl.trim() || !customSbKey.trim()}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Ayarları Kaydet & Doğrula</span>
                        </button>
                        {supabaseConfig.source === 'local' && (
                          <button
                            type="button"
                            onClick={handleClearSupabaseConfig}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition cursor-pointer"
                          >
                            Temizle
                          </button>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-400">
                        Tablo gereksinimi: <code className="text-emerald-400 font-mono">waitlist</code> (email, app_id, app_name, created_at, status)
                      </div>
                    </div>
                  </form>

                  {/* Test Result Message */}
                  {testResult && (
                    <div
                      className={`p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                        testResult.ok
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      {testResult.ok ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <div>{testResult.message}</div>
                        {!testResult.ok && testResult.tableExists === false && (
                          <div className="text-[11px] text-slate-300 font-mono bg-slate-950/80 p-2 rounded border border-slate-800 select-all">
                            CREATE TABLE waitlist (
                              id uuid primary key default gen_random_uuid(),
                              email text not null,
                              app_id text not null,
                              app_name text not null,
                              created_at timestamptz default now(),
                              status text default 'queued'
                            );
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {waitlistData.length === 0 ? (
                <div className="text-center py-8 bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500">
                  Henüz kaydedilmiş bekleme listesi başvurusu bulunmuyor.
                </div>
              ) : (
                <div className="space-y-2">
                  {waitlistData.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white">{item.email}</span>
                        <div className="text-[11px] text-indigo-400">{item.appName}</div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(item.timestamp).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
