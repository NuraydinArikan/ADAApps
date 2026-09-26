export type AppPlatform = 'pwa' | 'chrome_extension' | 'web' | 'mobile' | 'desktop';

export type AppStatus = 'live' | 'beta' | 'in_development' | 'concept';

export type AppCategory = 
  | 'finance' 
  | 'music' 
  | 'security' 
  | 'alerts' 
  | 'therapy' 
  | 'journalism' 
  | 'ai_tools' 
  | 'loyalty' 
  | 'productivity' 
  | 'lifestyle';

export interface ChangelogItem {
  version: string;
  date: string;
  notes: string[];
}

export interface PrivacyArchitecture {
  localData: string;       // e.g. "Cihazda / localStorage / IndexedDB"
  serverSync: string;      // e.g. "Yok" or "Firebase (Uçtan Uca Şifreli)"
  aiExternalApi: string;   // e.g. "Gemini API (Sadece Mutfak Masası modülünde)"
  accountRequired: string; // e.g. "Gerektirmez" or "Opsiyonel (Grup eşleşmesi için)"
}

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  category: AppCategory;
  platform: AppPlatform;
  status: AppStatus;
  url: string;
  officialStoreUrl?: string;
  iconName: string;
  accentColor: string;
  badgeText?: string;
  features: string[];
  techStack: string[];
  rating?: number;
  installCountLabel?: string;
  verifiedBadge?: string; // e.g. "Doğrulanmış PWA", "Açık Kaynak", "Aktif Sürüm"
  lastUpdated: string;
  isFeatured?: boolean;
  privacyHighlights: string[];
  privacyArchitecture?: PrivacyArchitecture;
  changelog: ChangelogItem[];
  previewAccent: string;
  mockupType: 
    | 'finance_dashboard' 
    | 'guitar_sync' 
    | 'openguard_shield' 
    | 'alert_monitor' 
    | 'token_counter' 
    | 'therapy_voice' 
    | 'kahve_wallet' 
    | 'journalism_factcheck' 
    | 'clean_feed';
}

export interface WaitlistSubmission {
  appId: string;
  appName: string;
  email: string;
  timestamp: string;
  status?: 'queued' | 'notified';
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type ThemeMode = 'dark' | 'light' | 'reverse';
