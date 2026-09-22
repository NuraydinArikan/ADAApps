import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface TickerApp {
  id: string;
  name: string;
  url: string;
}

const LIVE_APPS: TickerApp[] = [
  { id: 'evdekihesap', name: 'EvdekiHesap', url: 'https://evdekihesap.app' },
  { id: 'haberverbana', name: 'HaberVerBana', url: 'https://haberverbana.app' },
  { id: 'guitarfirends', name: 'GuitarFriends', url: 'https://guitarfriends.app' },
  { id: 'lesstoken', name: 'LessToken', url: 'https://lesstoken.app' }
];

export const LiveAppsTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const offsetRef = useRef<number>(0);
  const singleWidthRef = useRef<number>(0);
  const lastActiveRef = useRef<number>(-1);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 4 duplicates to guarantee seamless infinite wrapping across all screen resolutions
  const repetitions = [0, 1, 2, 3];

  useEffect(() => {
    const updateDimensions = () => {
      if (setRef.current) {
        singleWidthRef.current = setRef.current.offsetWidth;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timer = setTimeout(updateDimensions, 250);

    let animationFrameId: number;

    const animate = () => {
      if (!isPaused && singleWidthRef.current > 0 && trackRef.current) {
        // Move from right to left (decreasing translateX offset)
        offsetRef.current -= 0.85; // smooth speed ~50px/sec

        if (-offsetRef.current >= singleWidthRef.current) {
          offsetRef.current += singleWidthRef.current;
        }

        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

        // Center calculation
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const centerX = containerRect.left + containerRect.width / 2;

          let closestIdx = -1;
          let minDiff = Infinity;

          itemRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const diff = Math.abs(centerX - itemCenter);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = idx;
            }
          });

          // If closest item is within the center focus window (~75px)
          if (minDiff < 75) {
            if (closestIdx !== lastActiveRef.current) {
              lastActiveRef.current = closestIdx;
              setActiveIndex(closestIdx);
            }
          } else if (lastActiveRef.current !== -1) {
            lastActiveRef.current = -1;
            setActiveIndex(-1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isPaused]);

  return (
    <div className="relative mt-7 mb-3 max-w-2xl mx-auto px-2">
      {/* Outer border & glass container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden py-3 px-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-inner group"
      >
        {/* Left & Right gradient edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20" />

        {/* Center ambient indicator */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-yellow-400/10 blur-xl rounded-full z-10" />

        {/* Continuous ticker track moving right to left */}
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap will-change-transform select-none"
          style={{ width: 'max-content' }}
        >
          {repetitions.map((repIdx) => (
            <div
              key={repIdx}
              ref={repIdx === 0 ? setRef : undefined}
              className="flex items-center shrink-0"
            >
              {LIVE_APPS.map((app, appIdx) => {
                const globalIdx = repIdx * LIVE_APPS.length + appIdx;
                const isCenter = activeIndex === globalIdx;

                return (
                  <React.Fragment key={`${repIdx}-${app.id}`}>
                    <a
                      ref={(el) => {
                        itemRefs.current[globalIdx] = el;
                      }}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${app.name} uygulamasını ziyaret et (${app.url})`}
                      className={`inline-flex items-center px-4 sm:px-6 py-1 rounded-xl transition-all duration-300 cursor-pointer ${
                        isCenter
                          ? 'text-yellow-300 font-extrabold scale-110 sm:scale-115 drop-shadow-[0_0_14px_rgba(253,224,71,0.85)] z-10'
                          : 'text-white font-medium scale-100 opacity-80 hover:opacity-100 hover:text-white'
                      }`}
                    >
                      <span className="text-sm sm:text-base tracking-tight font-display flex items-center gap-1.5">
                        {isCenter && (
                          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse inline-block" />
                        )}
                        <span>{app.name}</span>
                      </span>
                    </a>

                    {/* Subtle dot divider */}
                    <span className="text-slate-700 text-xs px-1 select-none">•</span>
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
