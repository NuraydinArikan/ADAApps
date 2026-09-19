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
        label: 'Yayında',
        stageLabel: 'Canlı Sürüm',
        badgeClass: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300',
        dotClass: 'bg-emerald-400',
        cardActionText: 'Yükle & Aç',
        isAvailableNow: true,
        colorHex: '#10b981'
      };
    case 'beta':
      return {
        key: 'beta',
        label: 'Açık Beta',
        stageLabel: 'Beta Sürümü',
        badgeClass: 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300',
        dotClass: 'bg-cyan-400',
        cardActionText: 'Beta Sürümü Aç',
        isAvailableNow: true,
        colorHex: '#06b6d4'
      };
    case 'in_development':
      return {
        key: 'in_development',
        label: 'Geliştiriliyor',
        stageLabel: 'Geliştirme Aşamasında',
        badgeClass: 'bg-amber-950/60 border-amber-500/30 text-amber-300',
        dotClass: 'bg-amber-400',
        cardActionText: 'Erken Erişim',
        isAvailableNow: false,
        colorHex: '#f59e0b'
      };
    case 'concept':
    default:
      return {
        key: 'concept',
        label: 'Laboratuvar',
        stageLabel: 'Ar-Ge / Prototip',
        badgeClass: 'bg-violet-950/60 border-violet-500/30 text-violet-300',
        dotClass: 'bg-violet-400',
        cardActionText: 'Erken Erişim',
        isAvailableNow: false,
        colorHex: '#a855f7'
      };
  }
}
