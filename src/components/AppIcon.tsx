import React from 'react';
import {
  WalletCards,
  Newspaper,
  Cpu,
  Sprout,
  Compass,
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  BellRing,
  HeartPulse,
  Brain,
  HeartHandshake,
  Music,
  Guitar,
  Shield,
  ShieldCheck,
  Coffee,
  Scale,
  Mic,
  FileCheck,
  LucideIcon
} from 'lucide-react';

interface AppIconProps {
  name: string;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  WalletCards,
  Newspaper,
  Cpu,
  Sprout,
  Compass,
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  BellRing,
  HeartPulse,
  Brain,
  HeartHandshake,
  Music,
  Guitar,
  Shield,
  ShieldCheck,
  Coffee,
  Scale,
  Mic,
  FileCheck
};

export const AppIcon: React.FC<AppIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent className={className} />;
};
