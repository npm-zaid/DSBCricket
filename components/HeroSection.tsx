'use client'
import { useEffect, useRef } from 'react';
import { Play, ChevronDown, Zap, Circle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DualScoreLogo from './DualScoreLogo';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const boundaryScoreRef = useRef<HTMLDivElement>(null);
  const dotScoreRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline for hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate background orbs
      gsap.to('.hero-orb-1', {
        x: 50,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-orb-2', {
        x: -40,
        y: 40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Logo reveal with split effect
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8, rotateX: -15 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 1, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      // Tagline with letter stagger
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );

      // Score cards with stagger
      tl.fromTo(
        scoreRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
        '-=0.3'
      );

      // Animate score numbers counting up
      tl.add(() => {
        if (boundaryScoreRef.current) {
          gsap.fromTo(
            boundaryScoreRef.current,
            { innerText: 0 },
            {
              innerText: 64,
              duration: 1.5,
              snap: { innerText: 1 },
              ease: 'power2.out',
            }
          );
        }
        if (dotScoreRef.current) {
          gsap.fromTo(
            dotScoreRef.current,
            { innerText: 0 },
            {
              innerText: 42,
              duration: 1.5,
              snap: { innerText: 1 },
              ease: 'power2.out',
            }
          );
        }
      }, '-=0.5');

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.8'
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (orbsRef.current) {
            gsap.to(orbsRef.current, {
              y: self.progress * 150,
              duration: 0.3,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--card))_0%,_hsl(var(--background))_70%)]" />
      
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="hero-orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-boundary/15 rounded-full blur-[120px]" />
        <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-dot/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px]" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating Elements */}
      <div className="absolute top-32 left-20 animate-float opacity-20">
        <Sparkles className="w-8 h-8 text-boundary" />
      </div>
      <div className="absolute top-40 right-32 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Zap className="w-6 h-6 text-dot" />
      </div>
      <div className="absolute bottom-40 left-40 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Circle className="w-5 h-5 text-accent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-boundary/20 mb-8 backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-boundary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-boundary"></span>
          </span>
          <span className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Revolutionizing Cricket Entertainment
          </span>
        </div>


<div className='flex  justify-center gap-6 '>
 {/* Main Logo */}
        <div ref={logoRef} className="mb-10 perspective-1000">
          <DualScoreLogo size="xl" />
        </div>

         <div id="loader">
  
    <img src="https://cdn-icons-png.flaticon.com/128/1099/1099680.png" id="ball" alt="ball"/>

  
    <svg id="bat" viewBox="0 0 460.84737 460.84737" xmlns="http://www.w3.org/2000/svg">
      <path d="m460.847656 31.75-25.070312 25.078125-31.761719-31.757813 25.082031-25.070312zm0 0" fill="#a85d5d" />
      <path d="m378.945312 50.140625 25.070313-25.070313 31.761719 31.757813-25.070313 25.070313zm0 0" fill="#7f4545" />
      <path d="m353.878906 75.210938 25.066406-25.070313 31.761719 31.757813-25.070312 25.070312zm0 0" fill="#a85d5d" />
      <path d="m328.808594 100.28125 25.066406-25.070312 31.761719 31.757812-25.070313 25.070312zm0 0" fill="#7f4545" />
      <path d="m360.566406 132.039062-25.078125 25.070313-31.75-31.75 25.070313-25.078125zm0 0" fill="#a85d5d" />
      <path d="m352.425781 190.320312-260.136719 260.140626c-13.847656 13.847656-36.296874 13.847656-50.140624 0l-31.761719-31.761719c-13.847657-13.84375-13.847657-36.296875 0-50.140625l260.140625-260.136719 25.070312 25.066406-.21875.222657-76.050781 107.808593 107.808594-76.050781.21875-.21875zm0 0" fill="#ffd2a6" />
      <path d="m327.355469 165.25-.21875.21875-107.808594 76.050781 76.050781-107.808593.21875-.222657zm0 0" fill="#7f4545" />
    </svg>
  </div>
</div>
       

     
 
  

        {/* Tagline */}
        <h1 
          ref={taglineRef}
          className="font-display text-2xl  md:text-3xl font-bold mb-6"
        >
          <span className="text-muted-foreground">Every Ball Has A</span>{' '}
          <span className="relative">
            <span className="gradient-text-primary">Winner</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path 
                d="M2 6C50 2 150 2 198 6" 
                stroke="url(#underline-gradient)" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                  <stop offset="0%" stopColor="hsl(25 100% 55%)" />
                  <stop offset="100%" stopColor="hsl(185 100% 50%)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Description */}
        <p 
          ref={descRef}
          className="text-sm text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Experience cricket like never before. Boundary vs Dot Ball — 
          the result changes with every delivery. Where stars are made.
        </p>

        {/* Score Display */}
        <div 
          ref={scoreRef}
          className="flex items-center justify-center gap-4 md:gap-8 mb-14"
        >
          <div className="group flex items-center gap-3 px-5 md:px-8 py-4 md:py-5 rounded-2xl glass border border-boundary/30 hover:border-boundary/60 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-boundary/20">
            <div className="p-2 md:p-3 rounded-xl bg-boundary/20 group-hover:bg-boundary/30 transition-colors">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-boundary" />
            </div>
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Boundary</div>
              <div 
                ref={boundaryScoreRef}
                className="font-display text-2xl md:text-4xl font-black text-boundary text-glow-boundary"
              >
                64
              </div>
            </div>
          </div>
          
          <div className="font-display text-xl md:text-2xl text-muted-foreground/50">vs</div>
          
          <div className="group flex items-center gap-3 px-5 md:px-8 py-4 md:py-5 rounded-2xl glass border border-dot/30 hover:border-dot/60 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-dot/20">
            <div className="p-2 md:p-3 rounded-xl bg-dot/20 group-hover:bg-dot/30 transition-colors">
              <Circle className="w-6 h-6 md:w-8 md:h-8 text-dot" />
            </div>
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Dot Ball</div>
              <div 
                ref={dotScoreRef}
                className="font-display text-2xl md:text-4xl font-black text-dot text-glow-dot"
              >
                42
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        {/* <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-boundary to-boundary/80 text-primary-foreground font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-boundary/30">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="relative">Watch Live Match</span>
          </button>
          <button className="group flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-border hover:border-dot text-foreground font-semibold text-lg transition-all duration-300 hover:bg-dot/10 hover:shadow-lg hover:shadow-dot/10">
            <span>Explore Platforms</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div> */}

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
