import { ReactNode, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface PlatformCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  feature: string;
  gradient: 'boundary' | 'dot' | 'mixed';
  delay?: number;
  index: number;
  href: string;
}

const PlatformCard = ({ title, subtitle, description, icon, feature, gradient, index, href }: PlatformCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const gradientClasses = {
    boundary: 'border-boundary/20 hover:border-boundary/50',
    dot: 'border-dot/20 hover:border-dot/50',
    mixed: 'border-accent/20 hover:border-accent/50',
  };

  const iconBgClasses = {
    boundary: 'bg-boundary/10 text-boundary group-hover:bg-boundary/20',
    dot: 'bg-dot/10 text-dot group-hover:bg-dot/20',
    mixed: 'bg-accent/10 text-accent group-hover:bg-accent/20',
  };

  const glowClasses = {
    boundary: 'bg-boundary/30',
    dot: 'bg-dot/30',
    mixed: 'bg-accent/30',
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link 
      to={href}
      ref={cardRef}
      className={`platform-card group relative overflow-hidden rounded-3xl border-2 bg-card/50 backdrop-blur-sm p-6 md:p-8 cursor-pointer transition-all duration-500 hover:bg-card/80 block ${gradientClasses[gradient]}`}
      style={{ 
        transformStyle: 'preserve-3d',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Animated glow that follows cursor */}
      <div 
        ref={glowRef}
        className={`absolute w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${glowClasses[gradient]}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity ${glowClasses[gradient]} blur-2xl`} />
      
      <div ref={contentRef} className="relative z-10">
        {/* Icon */}
        <div 
          ref={iconRef}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${iconBgClasses[gradient]}`}
        >
          {icon}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h4 className="font-display text-xl md:text-2xl font-bold mb-1 group-hover:text-foreground transition-colors">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* Feature Highlight & CTA */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider ${iconBgClasses[gradient]}`}>
            {feature}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
              Explore
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${
        gradient === 'boundary' ? 'from-transparent via-boundary to-transparent' :
        gradient === 'dot' ? 'from-transparent via-dot to-transparent' :
        'from-boundary via-accent to-dot'
      }`} />
    </Link>
  );
};

export default PlatformCard;
