import React from 'react';

interface AdaAppsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'stacked' | 'mark';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  onClick?: () => void;
}

export const AdaAppsLogo: React.FC<AdaAppsLogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtitle = false,
  subtitleText = 'Bağımsız Web & PWA Vitrini',
  className = '',
  onClick,
}) => {
  // Size-dependent metrics
  const markSize = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl',
  }[size];

  const markAdaFont = {
    sm: 'text-[11px] leading-tight tracking-wider',
    md: 'text-xs sm:text-[13px] leading-none tracking-widest',
    lg: 'text-base leading-none tracking-widest',
    xl: 'text-2xl leading-none tracking-widest',
  }[size];

  const markAppsFont = {
    sm: 'text-[7px] leading-none tracking-[0.22em] text-indigo-300 font-black mt-0.5',
    md: 'text-[8px] sm:text-[9px] leading-none tracking-[0.25em] text-indigo-300 font-black mt-0.5',
    lg: 'text-[11px] leading-none tracking-[0.28em] text-indigo-300 font-black mt-1',
    xl: 'text-sm leading-none tracking-[0.3em] text-indigo-300 font-black mt-1.5',
  }[size];

  const wordmarkAdaFont = {
    sm: 'text-base font-extrabold tracking-tight',
    md: 'text-lg sm:text-xl font-extrabold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
    xl: 'text-4xl font-black tracking-tight',
  }[size];

  const wordmarkAppsFont = {
    sm: 'text-[8px] font-black tracking-[0.35em] text-indigo-400',
    md: 'text-[9px] sm:text-[10px] font-black tracking-[0.38em] text-indigo-400',
    lg: 'text-xs font-black tracking-[0.42em] text-indigo-400',
    xl: 'text-sm font-black tracking-[0.45em] text-indigo-400',
  }[size];

  // The icon emblem containing stacked ADA / APPS
  const MarkBadge = (
    <div className={`relative group/mark select-none ${onClick ? 'cursor-pointer' : ''}`}>
      <div
        className={`${markSize} bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover/mark:shadow-indigo-500/40 transition-all duration-300`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[inherit] flex flex-col items-center justify-center border border-indigo-500/20 px-1 py-1">
          {/* Stacked ADA / APPS inside mark */}
          <span
            className={`font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-pink-200 ${markAdaFont}`}
          >
            ADA
          </span>
          <span className={`font-display ${markAppsFont}`}>
            APPS
          </span>
        </div>
      </div>
      {/* Live active dot indicator */}
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-sm shadow-emerald-400/50"></span>
    </div>
  );

  // The stacked typographic wordmark: ADA over APPS
  const StackedTypography = (
    <div className="flex flex-col select-none leading-none">
      <div className="flex items-center gap-2">
        <span
          className={`font-display text-white ${wordmarkAdaFont} leading-none drop-shadow-sm`}
        >
          ADA
        </span>
        {size !== 'sm' && (
          <span className="hidden md:inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
            Product Studio
          </span>
        )}
      </div>
      <span
        className={`font-display ${wordmarkAppsFont} uppercase -mt-0.5 sm:-mt-1 select-none`}
      >
        APPS
      </span>
      {showSubtitle && (
        <p className="text-[11px] text-slate-400 mt-1.5 hidden sm:block font-normal">
          {subtitleText}
        </p>
      )}
    </div>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center ${className}`} onClick={onClick}>
        {MarkBadge}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex items-center ${className}`} onClick={onClick}>
        {StackedTypography}
      </div>
    );
  }

  // variant === 'full' (Mark + Stacked Typography)
  return (
    <div
      className={`inline-flex items-center gap-3 ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {MarkBadge}
      {StackedTypography}
    </div>
  );
};
