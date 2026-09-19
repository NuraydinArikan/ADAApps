import React from 'react';
import { AppItem } from '../types';
import { FinanceDashboardMockup } from './mockups/FinanceDashboardMockup';
import { GuitarSyncMockup } from './mockups/GuitarSyncMockup';
import { SecurityShieldMockup } from './mockups/SecurityShieldMockup';
import { AlertMonitorMockup } from './mockups/AlertMonitorMockup';
import { TokenCompressorMockup } from './mockups/TokenCompressorMockup';
import { VoiceTherapyMockup } from './mockups/VoiceTherapyMockup';
import { LoyaltyStampMockup } from './mockups/LoyaltyStampMockup';
import { NewsFactcheckMockup } from './mockups/NewsFactcheckMockup';
import { CleanFeedMockup } from './mockups/CleanFeedMockup';

interface AppMockupPreviewProps {
  app: AppItem;
}

export const AppMockupPreview: React.FC<AppMockupPreviewProps> = ({ app }) => {
  switch (app.mockupType) {
    case 'finance_dashboard':
      return <FinanceDashboardMockup app={app} />;
    case 'guitar_sync':
      return <GuitarSyncMockup app={app} />;
    case 'openguard_shield':
    case 'security_shield':
      return <SecurityShieldMockup app={app} />;
    case 'alert_monitor':
      return <AlertMonitorMockup app={app} />;
    case 'token_counter':
      return <TokenCompressorMockup app={app} />;
    case 'therapy_voice':
      return <VoiceTherapyMockup app={app} />;
    case 'kahve_wallet':
      return <LoyaltyStampMockup app={app} />;
    case 'journalism_factcheck':
      return <NewsFactcheckMockup app={app} />;
    case 'clean_feed':
    default:
      return <CleanFeedMockup app={app} />;
  }
};
