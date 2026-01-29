import { useEffect, useRef } from 'react';
import { Brain, Trophy, Film, Users, Sparkles, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlatformCard from './PlatformCard';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    title: 'Boundary Hunt',
    subtitle: 'AI Talent Scout',
    description: 'AI-driven "Potential Meter" identifying non-contracted players ready to become the next cricket superstars.',
    icon: <Brain className="w-7 h-7" />,
    feature: 'Potential Meter',
    gradient: 'boundary' as const,
    href: '/boundary-hunt',
  },
  {
    title: 'BCL League',
    subtitle: 'The Main Stage',
    description: 'Alternative platform for potential stars to showcase performance. BCL-India Open & BCL-Dubai Open with eight teams.',
    icon: <Trophy className="w-7 h-7" />,
    feature: 'Pro League',
    gradient: 'dot' as const,
    href: '/bcl-league',
  },
  {
    title: 'BCL Studio',
    subtitle: 'The Content Hub',
    description: 'Netflix-style grid for innovative cricket content. Home of "Behind the Boundary" original docu-series.',
    icon: <Film className="w-7 h-7" />,
    feature: 'Original Content',
    gradient: 'mixed' as const,
    href: '/bcl-studio',
  },
  {
    title: 'BCL Weekend',
    subtitle: 'The Community Zone',
    description: 'Platform for amateurs and working professionals to play as professionals. The Leaderboard of the Common Man.',
    icon: <Users className="w-7 h-7" />,
    feature: 'Amateur League',
    gradient: 'boundary' as const,
    href: '/bcl-weekend',
  },
  {
    title: 'BCL DUO',
    subtitle: 'The Cricket Carnival',
    description: 'High energy, vibrant, festival-focused cricket experience. Interactive 2.5-day schedule & ticket "Party Passes."',
    icon: <Sparkles className="w-7 h-7" />,
    feature: 'Party Passes',
    gradient: 'dot' as const,
    href: '/bcl-duo',
  },
  {
    title: 'Shadow Coach',
    subtitle: 'Fan Engagement App',
    description: 'High-tech platform for fan engagement with real-time analytics, predictions, and interactive experiences.',
    icon: <Smartphone className="w-7 h-7" />,
    feature: 'BCL App',
    gradient: 'mixed' as const,
    href: '/shadow-coach',
  },
];

const PlatformsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="platforms" 
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-boundary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-dot/5 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-boundary/10 text-boundary border border-boundary/20 mb-6">
            <Sparkles className="w-4 h-4" />
            The Ecosystem
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Six Platforms.
            <br />
            <span className="gradient-text-primary">One Revolution.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete cricket entertainment vertical powered by Dual Score innovation.
          </p>
        </div>

        {/* Platform Grid */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {platforms.map((platform, index) => (
            <PlatformCard 
              key={platform.title}
              {...platform}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
