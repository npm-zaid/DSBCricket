"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Landmark, Trophy, Users, MoveRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevenuePartnerFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line Drawing Animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }

      // 2. Node Stagger
      gsap.fromTo(
        nodesRef.current,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    { title: "First Strike", icon: <Users />, desc: "Mass talent discovery via AI-scouting gateway." },
    { title: "Boundary Hunt", icon: <Trophy />, desc: "Reality-based talent hunt and fan monetization." },
    { title: "BCL Open", icon: <Landmark />, desc: "Professional leagues and global broadcast rights." },
  ];

  return (
    <section ref={sectionRef} className="relative w-full  py-32 text-white overflow-hidden">
  

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-24 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#dda15e]/30 bg-[#dda15e]/10 px-4 py-1 text-sm font-bold  text-[#dda15e]">
            REVENUE PIPELINE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black ">
            Partner With the <span className="bg-gradient-to-r from-[#bc6c25] to-[#dda15e] bg-clip-text text-transparent">Ecosystem</span>
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto italic">
            "Own a piece of the most defensible sports-tech moat in modern cricket."
          </p>
        </div>

        {/* The Flow Container */}
        <div className="relative">
          {/* Desktop Flow Line (SVG) */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden lg:block pointer-events-none">
            <svg viewBox="0 0 1200 100" className="w-full">
              <path
                ref={pathRef}
                d="M 120,50 L 1080,50"
                stroke="#bc6c25"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 10"
              />
              {/* Glowing Dot following the path */}
              <circle r="4" fill="#dda15e" className="animate-pulse">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 120,50 L 1080,50" />
              </circle>
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div
              key={i}
              ref={(el) => { if (el) nodesRef.current[i] = el; }}
              className="p-1 rounded-2xl bg-gradient-to-tr from-[#bc6c25]/50 via-[#dda15e]/50 to bg-zinc-900 "
              >
              <div
              
             
                className="group relative rounded-2xl border border-white/5 bg-[#0a0a0a]/80 p-10 backdrop-blur-xl transition-all hover:border-[#dda15e]/50 hover:shadow-[0_0_40px_rgba(188,108,37,0.15)]"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#bc6c25] to-[#dda15e] text-black shadow-[0_0_20px_rgba(221,161,94,0.4)] transition-transform group-hover:scale-110">
                  {step.icon}
                </div>
                <h4 className="text-[10px] font-black tracking-[0.2em] text-[#dda15e] mb-2">STAGE 0{i+1}</h4>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/70 transition-colors">
                  {step.desc}
                </p>
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-center">
           <button className="group relative overflow-hidden rounded-2xl bg-[#BC6C26] px-10 py-5 text-sm font-black uppercase tracking-wider text-white shadow-[0_20px_50px_rgba(188,108,38,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(188,108,38,0.5)] active:scale-95">
                 {/* Animated Background Shine */}
                 <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                 
                 <span className="relative z-10 flex items-center gap-3">
                   View Francise Thesis
                   <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                 </span>
         
                 {/* Outer Glow Ring */}
                 <span className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40" />
               </button>
          <p className="mt-6 text-[10px] font-bold text-white/20 tracking-[0.4em] uppercase">Secure B2B Portal</p>
        </div>
      </div>
    </section>
  );
}