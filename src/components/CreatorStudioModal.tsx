import React, { useState } from 'react';
import { AppItem, AppCategory, AppPlatform, AppStatus } from '../types';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Download, 
  Check, 
  Sliders, 
  Layers, 
  Sparkles,
  Users
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
  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'waitlist'>('manage');
  
  // New App form state
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newCategory, setNewCategory] = useState<AppCategory>('productivity');
  const [newPlatform, setNewPlatform] = useState<AppPlatform>('pwa');
  const [newStatus, setNewStatus] = useState<AppStatus>('live');
  const [newUrl, setNewUrl] = useState('https://');
  const [newTech, setNewTech] = useState('React, PWA, Tailwind');
  const [newFeatures, setNewFeatures] = useState('Offline hazır, Hızlı senkronizasyon, Şifreli veri');

  // Waitlist data from localStorage
  const waitlistData = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('adaapps_waitlist') || '[]');
    } catch {
      return [];
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const id = newName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const created: AppItem = {
      id: id || `app-${Date.now()}`,
      name: newName.trim(),
      tagline: newTagline.trim() || 'Yeni Nesil Bağımsız Uygulama',
      description: newDesc.trim() || 'ADA Studio çatısı altında geliştirilen bağımsız yazılım aracı.',
      problem: newProblem.trim() || 'Kullanıcıların karşılaştığı verimsizlik ve gereksiz karmaşa.',
      solution: newSolution.trim() || 'Sade, hafif ve doğrudan tarayıcıda çalışan çözüm.',
      category: newCategory,
      platform: newPlatform,
      status: newStatus,
      url: newUrl.trim(),
      iconName: newPlatform === 'pwa' ? 'Smartphone' : newPlatform === 'chrome_extension' ? 'Cpu' : 'Globe',
      accentColor: 'from-indigo-500 to-purple-600',
      previewAccent: 'indigo',
      badgeText: newPlatform === 'pwa' ? 'PWA • Bağımsız' : 'Tarayıcı Aracı',
      features: newFeatures.split(',').map((s) => s.trim()).filter(Boolean),
      techStack: newTech.split(',').map((s) => s.trim()).filter(Boolean),
      lastUpdated: 'Yeni Eklendi',
      isFeatured: false,
      privacyHighlights: ['Sıfır İzleyici', 'Yerel Depolama', 'Açık Standartlar'],
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
    setActiveTab('manage');
    setNewName('');
    setNewTagline('');
    setNewDesc('');
    setNewProblem('');
    setNewSolution('');
  };

  const handleDeleteApp = (id: string) => {
    if (confirm('Bu uygulamayı mağaza vitrininizden kaldırmak istediğinize emin misiniz?')) {
      onSaveApps(apps.filter((a) => a.id !== id));
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(apps, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adaapps-catalog.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
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
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                ADA Geliştirici Stüdyo Paneli
              </h3>
              <p className="text-xs text-slate-400">
                Kişisel mağazanızın uygulama kataloğunu, durumlarını ve bülten kayıtlarını yönetin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-nav */}
        <div className="px-6 border-b border-slate-800 bg-slate-950/20 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-3 px-3 font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'manage'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Mevcut Uygulamalar ({apps.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-3 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Uygulama Ekle</span>
          </button>

          <button
            onClick={() => setActiveTab('waitlist')}
            className={`py-3 px-3 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'waitlist'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Bülten & Bekleme Listesi ({waitlistData.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Vitrindeki uygulamaları doğrudan düzenleyebilir veya yeni projeler ekleyebilirsiniz.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON İndir</span>
                  </button>
                  <button
                    onClick={onResetApps}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 rounded-lg transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Varsayılana Sıfırla</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.accentColor} flex items-center justify-center text-white shrink-0`}>
                        <span className="font-bold text-xs">{app.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">{app.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{app.tagline}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {app.status === 'live' ? 'Yayında' : app.status === 'in_development' ? 'Geliştiriliyor' : 'Konsept'}
                      </span>
                      <button
                        onClick={() => handleDeleteApp(app.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded hover:bg-rose-950/50 transition cursor-pointer"
                        title="Uygulamayı Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleCreateApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Uygulama Adı *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="ör. finanstakip.app"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Slogan (Tagline)</label>
                  <input
                    type="text"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    placeholder="ör. Sade ve Hızlı Finans Asistanı"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Platform Türü</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as AppPlatform)}
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
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as AppStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="live">Yayında (Canlı)</option>
                    <option value="in_development">Geliştiriliyor</option>
                    <option value="concept">Konsept / Fikir</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as AppCategory)}
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
                <label className="block font-semibold text-slate-300 mb-1">Uygulama / PWA URL'si</label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://benimuygulamam.app"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Kısa Açıklama</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  placeholder="Uygulamanın genel tanıtımı..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hangi Problemi Çözüyor?</label>
                  <textarea
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                    rows={2}
                    placeholder="Mevcut uygulamaların yetersizliği..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nasıl Çözüyor?</label>
                  <textarea
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                    rows={2}
                    placeholder="ADA yaklaşımıyla çözüm..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                Uygulamayı ADA Vitrinine Ekle
              </button>
            </form>
          )}

          {activeTab === 'waitlist' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-slate-400">
                <span>Erken erişim (Waitlist) için kaydolan ziyaretçiler:</span>
                <span className="font-semibold text-white">{waitlistData.length} Kayıt</span>
              </div>

              {waitlistData.length === 0 ? (
                <div className="text-center py-8 bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500">
                  Henüz kaydedilmiş e-posta başvurusu bulunmuyor.
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
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleDateString('tr-TR')}
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
