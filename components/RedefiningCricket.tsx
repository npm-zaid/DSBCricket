import { useEffect, useRef, useState } from "react";
import { TrendingUp, Target, Flame, Gauge } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    label: "Scoring Systems",
    value: 2,
    max: 4,
    icon: Target,
    color: "boundary",
    suffix: "",
    description: "Dual-track scoring",
  },
  {
    label: "Minutes Faster",
    value: 60,
    max: 90,
    icon: Gauge,
    color: "dot",
    suffix: "",
    description: "Optimized duration",
  },
  {
    label: "Enhanced Boundaries",
    value: 150,
    max: 200,
    icon: Flame,
    color: "boundary",
    suffix: "%",
    description: "Boundary multipliers",
  },
  {
    label: "Win Probability",
    value: 67,
    max: 100,
    icon: TrendingUp,
    color: "dot",
    suffix: "%",
    description: "Live outcomes",
  },
];

const RedefiningCricket = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".rc-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              stats.forEach((stat, index) => {
                gsap.to({}, {
                  duration: 1.8,
                  ease: "power2.out",
                  onUpdate: function () {
                    const progress = this.progress();
                    setAnimatedValues(prev => {
                      const next = [...prev];
                      next[index] = Math.round(stat.value * progress);
                      return next;
                    });
                  },
                });
              });
            },
          },
        }
      );

      cards.forEach((card, index) => {
        const bar = card.querySelector(".progress-fill");
        if (!bar) return;

        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-28 bg-[#05090f] text-white overflow-hidden">
      {/* Grid BG */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* TEXT AREA */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-6">
              ⚡ Official Format
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Redefining <span className="text-cyan-400">Cricket</span>
            </h2>

            <p className="text-white/70 mb-4 leading-relaxed">
              Dual Score Boundary Cricket introduces a revolutionary format that
              combines the traditional essence of cricket with cutting-edge
              innovations.
            </p>

            <p className="text-white/60 leading-relaxed">
              Our dual scoring system creates parallel tracks of excitement,
              where traditional runs combine with innovative boundary
              multipliers — delivering faster, strategic, next-gen cricket.
            </p>
          </div>

          {/* IMAGE CARD */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
            <img
              src="data:image/jpeg;base64,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"
              className="w-full h-full object-cover"
              alt="Cricket Stadium"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h4 className="text-2xl font-semibold">Next-Gen Cricket</h4>
              <p className="text-white/70 text-sm">
                Where tradition meets innovation
              </p>
            </div>
          </div>
        </div>

        {/* STATS GRID (YOUR UI + ANIMATION) */}
        <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`rc-card group relative rounded-3xl p-6 overflow-hidden border-2 transition-all duration-500 hover:scale-[1.03] cursor-pointer ${
                stat.color === "boundary"
                  ? "border-orange-500/20 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10"
                  : "border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10"
              }`}
              style={{ background: "hsl(var(--card) / 0.5)" }}
            >
              {/* glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  stat.color === "boundary" ? "bg-orange-500/5" : "bg-cyan-400/5"
                }`}
              />

              <div
                className={`absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${
                  stat.color === "boundary" ? "bg-orange-500" : "bg-cyan-400"
                }`}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    stat.color === "boundary"
                      ? "bg-orange-500/10 group-hover:bg-orange-500/20"
                      : "bg-cyan-400/10 group-hover:bg-cyan-400/20"
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.color === "boundary" ? "text-orange-500" : "text-cyan-400"
                    }`}
                  />
                </div>

                <div
                  className={`font-display text-4xl lg:text-5xl font-black mb-1 ${
                    stat.color === "boundary" ? "text-orange-500" : "text-cyan-400"
                  }`}
                >
                  {animatedValues[index]}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>

                <div className="text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-xs text-white/60 mb-4">{stat.description}</div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`progress-fill h-full rounded-full origin-left ${
                      stat.color === "boundary"
                        ? "bg-gradient-to-r from-orange-500 to-orange-400"
                        : "bg-gradient-to-r from-cyan-400 to-cyan-300"
                    }`}
                    style={{ width: `${(stat.value / stat.max) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RedefiningCricket;
