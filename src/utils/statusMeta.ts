import { AppStatus } from '../types';

export interface StatusMeta {
  key: AppStatus;
  label: string;
  stageLabel: string;
  badgeClass: string;
  dotClass: string;
  cardActionText: string;
  isAvailableNow: boolean;
  colorHex: string;
}

export function getAppStatusMeta(status: AppStatus): StatusMeta {
  switch (status) {
    case 'live':
      return {
        key: 'live',
        label: 'Canlı',
        stageLabel: 'Canlı Sürüm',
        badgeClass: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300',
        dotClass: 'bg-emerald-400 ring-2 ring-emerald-400/20',
        cardActionText: 'Yükle & Aç',
        isAvailableNow: true,
        colorHex: '#10b981'
      };
    case 'in_development':
    case 'beta':
    case 'concept':
    default:
      return {
        key: 'in_development',
        label: 'Geliştiriliyor',
        stageLabel: 'Geliştirme Aşamasında',
        badgeClass: 'bg-amber-950/70 border-amber-500/40 text-amber-300',
        dotClass: 'bg-amber-400 ring-2 ring-amber-400/20',
        cardActionText: 'Geliştiriliyor',
        isAvailableNow: false,
        colorHex: '#f59e0b'
      };
  }
}
