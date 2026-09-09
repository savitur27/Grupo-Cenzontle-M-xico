import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'stacked';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  showTagline = true,
  className = '',
  size = 'md',
  layout = 'horizontal'
}) => {
  const isLight = variant === 'light' || variant === 'white';

  // Primary brand colors based on the official logo
  // Deep navy for bird (#0B213F), Antique Gold for lettering & accents (#B59353 / #D4AF37)
  const birdColor = isLight ? '#E5C07B' : '#0B213F';
  const birdInnerBg = isLight ? '#0F172A' : '#FFFFFF';
  const goldColor = isLight ? '#F3CA7E' : '#B59353';
  const secondaryGold = isLight ? '#E2C285' : '#9E7C3E';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base sm:text-lg tracking-[0.22em]',
    lg: 'text-xl sm:text-2xl tracking-[0.25em]',
    xl: 'text-3xl tracking-[0.28em]'
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-[0.18em]',
    md: 'text-[9px] tracking-[0.2em]',
    lg: 'text-[11px] tracking-[0.22em]',
    xl: 'text-xs tracking-[0.25em]'
  };

  // Cenzontle Bird Vector Mark
  const BirdIcon = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
      <svg 
        viewBox="0 0 200 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform group-hover:scale-105 duration-300 drop-shadow-sm"
      >
        {/* Background shield/circle in light variant for contrast if needed */}
        {isLight && (
          <circle cx="95" cy="70" r="66" fill="#0B213F" fillOpacity="0.4" stroke="#B59353" strokeWidth="1" strokeOpacity="0.3" />
        )}

        {/* Head, Crown & Back Curve of the Cenzontle */}
        <path 
          d="M20 120 C16 94 24 60 42 36 C56 18 78 9 102 11 C122 13 138 23 151 36 C165 36 190 43 208 52 C194 59 174 61 158 62 C154 77 142 95 129 108 C111 123 84 132 55 132 C39 132 28 127 20 120 Z" 
          fill={birdColor} 
        />
        
        {/* White inner cheek/breast plumage characteristic of the mockingbird */}
        <path 
          d="M54 121 C65 110 76 92 81 73 C85 54 99 38 117 31 C131 39 141 54 142 70 C142 85 131 106 111 117 C93 124 70 124 54 121 Z" 
          fill={birdInnerBg} 
        />
        
        {/* Sharp Beak facing right */}
        <path 
          d="M149 39 L206 52 C199 55 186 59 163 61 L149 50 Z" 
          fill={birdColor} 
        />
        
        {/* Mockingbird dark horizontal lores mask / eye stripe */}
        <path 
          d="M104 47 C118 45 134 46 147 49 C138 53 124 53 111 52 Z" 
          fill={birdColor} 
        />
        
        {/* Eye: outer circle and central pupil */}
        <circle cx="126" cy="47" r="7.5" fill={birdInnerBg} stroke={birdColor} strokeWidth="2" />
        <circle cx="126" cy="47" r="3.6" fill={birdColor} />
        <circle cx="128" cy="45" r="1.2" fill={birdInnerBg} />
      </svg>
    </div>
  );

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Bird Icon on top */}
        <div className="mb-2">
          {BirdIcon}
        </div>

        {/* CENZONTLE Title */}
        <div 
          className={`font-serif font-bold uppercase ${titleSizes[size]}`}
          style={{ 
            color: goldColor,
            fontFamily: "'Cinzel', 'Playfair Display', serif"
          }}
        >
          CENZONTLE
        </div>

        {/* Subtitle with accent lines: — GRUPO CENZONTLE MÉXICO — */}
        {showTagline && (
          <div className="flex items-center justify-center gap-2 mt-1.5 w-full max-w-xs">
            <span className="h-px flex-1" style={{ backgroundColor: secondaryGold }}></span>
            <span 
              className={`font-semibold uppercase tracking-[0.2em] whitespace-nowrap ${taglineSizes[size]}`}
              style={{ color: secondaryGold }}
            >
              GRUPO CENZONTLE MÉXICO
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: secondaryGold }}></span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal inline layout (default, optimized for top bar and responsive containers)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {BirdIcon}

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-serif font-bold uppercase ${titleSizes[size]}`}
            style={{ 
              color: goldColor,
              fontFamily: "'Cinzel', 'Playfair Display', serif"
            }}
          >
            CENZONTLE
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3 h-px" style={{ backgroundColor: secondaryGold }}></span>
            <span 
              className={`font-semibold uppercase whitespace-nowrap ${taglineSizes[size]}`}
              style={{ color: secondaryGold }}
            >
              GRUPO CENZONTLE MÉXICO
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
