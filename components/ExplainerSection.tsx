import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DualScoreExplainer from './DualScoreExplainer';

gsap.registerPlugin(ScrollTrigger);

const ExplainerSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const explainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
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

      // Explainer card animation
      gsap.fromTo(
        explainerRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: explainerRef.current,
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/30" />
      
      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-boundary/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-dot/5 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-boundary/10 text-boundary border border-boundary/20 mb-6">
            ⚡ Interactive Demo
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            See How <span className="gradient-text-primary">Dual Score</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The leader changes at every ball. No waiting until the end — the drama unfolds in real-time.
          </p>
        </div>

        {/* Interactive Explainer */}
        <div ref={explainerRef}>
          <DualScoreExplainer />
        </div>
      </div>
    </section>
  );
};

export default ExplainerSection;
