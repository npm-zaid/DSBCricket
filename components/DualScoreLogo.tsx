import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface DualScoreLogoProps {
  leftText?: string;
  rightText?: string;
  size?: Size;
}

const DualScoreLogo = ({
  leftText = 'DUAL',
  rightText = 'SCORE',
  size = 'lg',
}: DualScoreLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base size + responsive scaling
  const sizeClasses: Record<Size, string> = {
    sm: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    md: 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl',
    lg: 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl',
  };

  return (
    <div
      className={`dual-score-logo font-display font-black tracking-tight cursor-pointer select-none
        ${sizeClasses[size]}
        ${isHovered ? 'animate-pulse-glow' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <span
          className={`dual-left text-boundary transition-all duration-300 ${
            isHovered ? '-translate-x-1' : ''
          }`}
          style={{
            textShadow: isHovered ? '0 0 30px hsl(25 100% 55% / 0.8)' : 'none',
          }}
        >
          {leftText}
        </span>

        <span
          className={`dual-right text-dot transition-all duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`}
          style={{
            textShadow: isHovered ? '0 0 30px hsl(185 100% 50% / 0.8)' : 'none',
          }}
        >
          {rightText}
        </span>
      </div>

      {/* Animated underline */}
      <div className="relative mt-1 sm:mt-2 h-[3px] sm:h-1 md:h-[6px] overflow-hidden rounded-full">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-boundary via-primary to-dot transition-transform duration-500 ${
            isHovered ? 'scale-x-100' : 'scale-x-75'
          }`}
          style={{ transformOrigin: 'center' }}
        />
        {isHovered && <div className="absolute inset-0 animate-shimmer" />}
      </div>
    </div>
  );
};

export default DualScoreLogo;
