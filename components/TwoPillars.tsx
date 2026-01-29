import { useEffect, useRef } from "react";
import { Target, Trophy, Users, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leftCards = [
  {
    title: "Boundary Hunt - Cricket Talent Hunt",
    desc: "The ultimate nationwide hunt designed to discover raw talent, focusing on power-hitting capability and boundary precision.",
    icon: Target,
  },
  {
    title: "BCL-Open - Series of Leagues",
    desc: "A tiered professional league structure providing a clear pathway for discovered talent to compete at the highest levels.",
    points: ["BCL-India Open", "BCL Dubai Open"],
    icon: Trophy,
  },
];

const rightCards = [
  {
    title: "City Level BCL Weekend Premier League",
    desc: "Exclusive weekend leagues tailored for working Professionals and Cricket Academies to compete and network.",
    icon: Users,
  },
  {
    title: "BCL DUO",
    desc: "A fast-paced, electrifying short format designed specifically for Carnivals, festivals, and pure social entertainment.",
    icon: Sparkles,
  },
];

const TwoPillars = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tp-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".tp-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".tp-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".pillar-left .pillar-card", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillar-left",
          start: "top 80%",
        },
      });

      gsap.from(".pillar-right .pillar-card", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillar-right",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-[#05090f] text-white overflow-hidden"
    >
      {/* grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="tp-badge inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-400 mb-6">
            Our Ecosystem
          </div>

          <h2 className="tp-title text-4xl md:text-5xl font-bold mb-6">
            Two Pillars of Excellence
          </h2>

          <p className="tp-sub text-white/65 leading-relaxed">
            Whether you're aiming for professional stardom or seeking social
            entertainment, the Dual Score Boundary ecosystem offers a dedicated
            pathway for every cricket enthusiast.
          </p>
        </div>

        {/* PILLARS */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="pillar-left">
            <h3 className="text-pink-400 text-xl font-bold mb-8">
              PROFESSIONAL HIGHWAY
            </h3>

            <div className="space-y-6">
              {leftCards.map((card, i) => (
                <div
                  key={i}
                  className="pillar-card group relative rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur transition-all hover:scale-[1.02]"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-4 rounded-2xl bg-pink-500/10 flex items-center justify-center group-hover:scale-110 transition">
                      <card.icon className="w-6 h-6 text-pink-400" />
                    </div>

                    <h4 className="text-lg font-semibold mb-2">
                      {card.title}
                    </h4>
                    <p className="text-sm text-white/65 mb-3">
                      {card.desc}
                    </p>

                    {card.points && (
                      <ul className="text-sm text-white/60 space-y-1">
                        {card.points.map((p, idx) => (
                          <li key={idx}>› {p}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="pillar-right">
            <h3 className="text-cyan-400 text-xl font-bold mb-8">
              CRICKET EXPERIENCE GATEWAY
            </h3>

            <div className="space-y-6">
              {rightCards.map((card, i) => (
                <div
                  key={i}
                  className="pillar-card group relative rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur transition-all hover:scale-[1.02]"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-4 rounded-2xl bg-cyan-400/10 flex items-center justify-center group-hover:scale-110 transition">
                      <card.icon className="w-6 h-6 text-cyan-400" />
                    </div>

                    <h4 className="text-lg font-semibold mb-2">
                      {card.title}
                    </h4>
                    <p className="text-sm text-white/65">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoPillars;
