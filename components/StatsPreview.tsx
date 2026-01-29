import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Target, Flame, Gauge } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    label: 'Boundary Density',
    value: 78,
    max: 100,
    icon: Target,
    color: 'boundary',
    suffix: '%',
    description: 'Field coverage',
  },
  {
    label: 'Impact Velocity',
    value: 142,
    max: 180,
    icon: Gauge,
    color: 'dot',
    suffix: 'km/h',
    description: 'Ball speed',
  },
  {
    label: 'Pressure Index',
    value: 85,
    max: 100,
    icon: Flame,
    color: 'boundary',
    suffix: '',
    description: 'Game intensity',
  },
  {
    label: 'Win Probability',
    value: 67,
    max: 100,
    icon: TrendingUp,
    color: 'dot',
    suffix: '%',
    description: 'Live prediction',
  },
];

const StatsPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.children;
      if (!cards) return;

      // Stagger card animations
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Animate counter values
              stats.forEach((stat, index) => {
                gsap.to({}, {
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function() {
                    const progress = this.progress();
                    setAnimatedValues(prev => {
                      const newValues = [...prev];
                      newValues[index] = Math.round(stat.value * progress);
                      return newValues;
                    });
                  },
                });
              });
            },
          },
        }
      );

      // Animate progress bars
      Array.from(cards).forEach((card, index) => {
        const progressBar = card.querySelector('.progress-fill');
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.5,
              ease: 'power3.out',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={`group relative rounded-3xl p-6 overflow-hidden border-2 transition-all duration-500 hover:scale-[1.03] cursor-pointer ${
            stat.color === 'boundary' 
              ? 'border-boundary/20 hover:border-boundary/50 hover:shadow-lg hover:shadow-boundary/10' 
              : 'border-dot/20 hover:border-dot/50 hover:shadow-lg hover:shadow-dot/10'
          }`}
          style={{ background: 'hsl(var(--card) / 0.5)' }}
        >
          {/* Background glow */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            stat.color === 'boundary' ? 'bg-boundary/5' : 'bg-dot/5'
          }`} />
          
          {/* Floating particles */}
          <div className={`absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${
            stat.color === 'boundary' ? 'bg-boundary' : 'bg-dot'
          }`} />
          
          <div className="relative z-10">
            {/* Icon with animated background */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
              stat.color === 'boundary' ? 'bg-boundary/10 group-hover:bg-boundary/20' : 'bg-dot/10 group-hover:bg-dot/20'
            }`}>
              <stat.icon className={`w-6 h-6 ${stat.color === 'boundary' ? 'text-boundary' : 'text-dot'}`} />
            </div>
            
            {/* Value with counter animation */}
            <div className={`font-display text-4xl lg:text-5xl font-black mb-1 transition-all ${
              stat.color === 'boundary' ? 'text-boundary' : 'text-dot'
            }`}>
              {animatedValues[index]}<span className="text-2xl">{stat.suffix}</span>
            </div>
            
            {/* Label */}
            <div className="text-sm font-semibold text-foreground/90 mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-muted-foreground mb-4">
              {stat.description}
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
              <div 
                className={`progress-fill h-full rounded-full origin-left ${
                  stat.color === 'boundary' ? 'bg-gradient-to-r from-boundary to-boundary/70' : 'bg-gradient-to-r from-dot to-dot/70'
                }`}
                style={{ width: `${(stat.value / stat.max) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsPreview;
