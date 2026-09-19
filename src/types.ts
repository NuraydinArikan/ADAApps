export type AppPlatform = 'pwa' | 'chrome_extension' | 'web' | 'mobile' | 'desktop';

export type AppStatus = 'live' | 'in_development' | 'concept' | 'beta';

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
  accentColor: string; // Tailwind color class or hex
  badgeText?: string;
  features: string[];
  techStack: string[];
  rating?: number;
  installCountLabel?: string;
  lastUpdated: string;
  isFeatured?: boolean;
  privacyHighlights: string[];
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
}

