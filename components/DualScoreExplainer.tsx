import { useState, useEffect, useRef } from 'react';
import { Zap, Circle, Trophy, TrendingUp, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const DualScoreExplainer = () => {
  const [ballOutcome, setBallOutcome] = useState(50);
  const [animating, setAnimating] = useState(false);
  const boundaryCardRef = useRef<HTMLDivElement>(null);
  const dotCardRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  const isBoundary = ballOutcome >= 50;
  const boundaryScore = Math.round(ballOutcome);
  const dotScore = 100 - boundaryScore;

  const handleSliderChange = (value: number) => {
    setAnimating(true);
    setBallOutcome(value);
    setTimeout(() => setAnimating(false), 300);
  };

  useEffect(() => {
    // Animate score cards when leader changes
    if (isBoundary && boundaryCardRef.current) {
      gsap.fromTo(
        boundaryCardRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      );
    } else if (!isBoundary && dotCardRef.current) {
      gsap.fromTo(
        dotCardRef.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      );
    }

    // Animate insight bar
    if (insightRef.current) {
      gsap.fromTo(
        insightRef.current,
        { opacity: 0.8, y: 5 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [isBoundary]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-3xl blur-3xl transition-all duration-700 opacity-20 ${isBoundary ? 'bg-boundary' : 'bg-dot'}`} />
      
      <div className="relative glass rounded-3xl p-8 md:p-12 border border-border/50">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className={`w-5 h-5 transition-colors duration-500 ${isBoundary ? 'text-boundary' : 'text-dot'}`} />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Live Demo</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Experience <span className="gradient-text-primary">Dual Score</span> in Action
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every ball creates a winner. Slide to see how the score transforms.
          </p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12">
          {/* Boundary Score */}
          <div 
            ref={boundaryCardRef}
            className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
              isBoundary 
                ? 'border-boundary bg-boundary/10 shadow-lg shadow-boundary/10' 
                : 'border-muted/30 bg-card/50'
            }`}
          >
            {/* Animated background */}
            {isBoundary && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-boundary/20 to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-boundary/20 rounded-full blur-3xl animate-pulse" />
              </div>
            )}
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl transition-all duration-500 ${isBoundary ? 'bg-boundary shadow-lg shadow-boundary/30' : 'bg-muted'}`}>
                  <Zap className={`w-5 h-5 ${isBoundary ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </div>
                <span className="font-display text-sm tracking-wider uppercase font-semibold">Boundary</span>
              </div>
              <div className={`font-display text-5xl md:text-7xl font-black transition-all duration-300 ${animating ? 'scale-105' : 'scale-100'} ${isBoundary ? 'text-boundary text-glow-boundary' : 'text-muted-foreground/50'}`}>
                {boundaryScore}
              </div>
              {isBoundary && (
                <div className="sm:absolute hidden top-4 right-4 flex items-center gap-1.5 text-boundary">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Leading</span>
                </div>
              )}
            </div>
          </div>

          {/* Dot Score */}
          <div 
            ref={dotCardRef}
            className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
              !isBoundary 
                ? 'border-dot bg-dot/10 shadow-lg shadow-dot/10' 
                : 'border-muted/30 bg-card/50'
            }`}
          >
            {/* Animated background */}
            {!isBoundary && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-dot/20 to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-dot/20 rounded-full blur-3xl animate-pulse" />
              </div>
            )}
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl transition-all duration-500 ${!isBoundary ? 'bg-dot shadow-lg shadow-dot/30' : 'bg-muted'}`}>
                  <Circle className={`w-5 h-5 ${!isBoundary ? 'text-secondary-foreground' : 'text-muted-foreground'}`} />
                </div>
                <span className="font-display text-sm tracking-wider uppercase font-semibold">Dot Ball</span>
              </div>
              <div className={`font-display text-5xl md:text-7xl font-black transition-all duration-300 ${animating ? 'scale-105' : 'scale-100'} ${!isBoundary ? 'text-dot text-glow-dot' : 'text-muted-foreground/50'}`}>
                {dotScore}
              </div>
              {!isBoundary && (
                <div className="sm:absolute hidden top-4 right-4 flex items-center gap-1.5 text-dot">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Leading</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Slider */}
        <div ref={sliderRef} className="mb-10">
          <div className="relative h-4 rounded-full bg-muted/50 overflow-hidden border border-border/50">
            {/* Background gradient track */}
            <div className="absolute inset-0 bg-gradient-to-r from-dot/30 via-muted to-boundary/30" />
            
            {/* Fill indicator */}
            <div 
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${isBoundary ? 'bg-gradient-to-r from-boundary/50 to-boundary' : 'bg-gradient-to-r from-dot to-dot/50'}`}
              style={{ width: `${ballOutcome}%` }}
            />
            
            {/* Center marker */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-foreground/20 -translate-x-1/2" />
            
            {/* Thumb indicator */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 transition-all duration-300 shadow-lg ${isBoundary ? 'bg-boundary border-background shadow-boundary/30' : 'bg-dot border-background shadow-dot/30'}`}
              style={{ left: `calc(${ballOutcome}% - 12px)` }}
            />
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={ballOutcome}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-6 -mt-5 opacity-0 cursor-pointer relative z-10"
          />
          
          <div className="flex justify-between text-sm font-medium mt-3">
            <span className="text-dot flex items-center gap-1.5">
              <Circle className="w-3 h-3" />
              Dot Dominates
            </span>
            <span className="text-boundary flex items-center gap-1.5">
              Boundary Rules
              <Zap className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Dynamic Insight */}
        <div 
          ref={insightRef}
          className={`flex items-center justify-center gap-3 p-5 rounded-2xl transition-all duration-500 border ${
            isBoundary 
              ? 'bg-boundary/10 border-boundary/30' 
              : 'bg-dot/10 border-dot/30'
          }`}
        >
          <TrendingUp className={`w-5 h-5 ${isBoundary ? 'text-boundary' : 'text-dot'}`} />
          <span className="font-medium text-center">
            {isBoundary 
              ? "🔥 Batsman taking control! Aggressive play pays off." 
              : "🎯 Bowler is building pressure! Dot balls stacking up."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DualScoreExplainer;
