import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, Sparkles } from 'lucide-react';
import StatsPreview from './StatsPreview';
import PlayerWatchlist from './PlayerWatchlist';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const watchlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Watchlist animation
      gsap.fromTo(
        watchlistRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: watchlistRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-dot/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-boundary/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-dot/10 text-dot border border-dot/20 mb-6">
            <BarChart3 className="w-4 h-4" />
            Immersive Analytics
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Beyond Traditional
            <br />
            <span className="gradient-text-secondary">Cricket Stats</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Boundary Density heatmaps, Impact Velocity metrics, and Player Stock Markets.
          </p>
        </div>

        {/* Stats & Watchlist */}
        <div className="space-y-16">
          <StatsPreview />
          
          <div ref={watchlistRef} className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Sparkles className="w-5 h-5 text-boundary" />
                <h3 className="font-display text-xl font-bold">Player Stock Market</h3>
              </div>
              <PlayerWatchlist />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
