"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Trophy, 
  Video, 
  Cpu, 
  Fingerprint, 
  Flame, 
  Zap, 
  Globe, 
  Gamepad2 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DualScoreIPEcosystem() {
  const sectionRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Staggered reveal for IP categories
//       gsap.from(".ip-card", {
//         opacity: 0,
//         y: 50,
//         stagger: 0.15,
//         duration: 1,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: ".ip-grid",
//           start: "top 80%",
//         },
//       });

//       // Hover effect for the Core DNA card
//       gsap.to(".dna-card", {
//         boxShadow: "0 0 40px rgba(221,161,94,0.4)",
//         repeat: -1,
//         yoyo: true,
//         duration: 2,
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

  return (
    <section ref={sectionRef} className=" py-24 px-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black  md:text-6xl">
            THE <span className="bg-gradient-to-r from-[#bc6c25] to-[#dda15e] bg-clip-text text-transparent">IP</span> ECOSYSTEM
          </h2>
          <p className="mt-6 text- text-white/50 uppercase tracking-widest">
            A Multi-Dimensional Sports-Tech Powerhouse
          </p>
        </div>

        <div className="ip-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">

  {[
    {
      title: "THE LEAGUE IP",
      icon: Trophy,
      items: [
        ["BCL Open", "Premier professional league flagship."],
        ["Weekend Premier", "Fast-track semi-pro bursts."],
        ["BCL Duo", "Specialized 2-vs-2 rapid expansion."],
      ],
    },
    {
      title: "CONTENT & MEDIA IP",
      icon: Video,
      items: [
        ["BCL Studio", "Internal AI-integrated production."],
        ["Boundary Hunt", "Reality-based talent hunt."],
      ],
    },
    {
      title: "TECH IP",
      icon: Cpu,
      items: [
        ["First Strike", "AI-scouting gateway platform."],
        ["Shadow Captain", "Real-time tactical prediction."],
        ["BCL App", "Central nervous system for data."],
      ],
    },
     {
      title: "CORE DNA",
      icon: Fingerprint,
      items: [
        ["DUAL-SCORE™ Engine", "  Patented bi-directional scoring where every delivery creates a live leader — the fundamental moat behind the entire ecosystem."],
       
      ],
    },
  ].
  map((card, i) => {
    const Icon = card.icon;

    return (
      <div
        key={i}
        className="p-1 rounded-2xl bg-gradient-to-tr from-[#bc6c25]/60 via-[#dda15e]/50 to-zinc-900"
      >
        <div className="ip-card group relative h-full border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-2xl transition-all duration-300 hover:border-[#dda15e]/40 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(221,161,94,0.25)]">

          {/* glow wash */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#bc6c25]/20 to-[#dda15e]/20 blur-2xl" />

          {/* icon */}
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#bc6c25] to-[#dda15e] text-black shadow-lg">
            <Icon className="h-6 w-6" />
          </div>

          <h3 className="text-lg font-black tracking-wide mb-5">
            {card.title}
          </h3>

          <ul className="space-y-4 text-sm text-white/60">
            {card.items.map((it, j) => (
              <li key={j} className="relative pl-4">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-[#bc6c25] to-[#dda15e]" />
                <strong className="text-white">{it[0]}:</strong> {it[1]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  })}

 

</div>


      
        {/* Section: The Architects of the Arena */}
        <div className="mt-40">
          <h2 className="text-3xl font-black  mb-16 uppercase">The Architects <span className="text-[#dda15e]">of the Arena</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { role: "Disruptor-in-Chief", name: "Executive Name", specialty: "Cricket Evolution", icon: <Zap /> },
              { role: "Tech Alchemist", name: "Lead Dev Name", specialty: "Dual Score IP & AI", icon: <Cpu /> },
              { role: "Carnival Curator", name: "Creative Name", specialty: "BCL DUO Experience", icon: <Globe /> },
              { role: "Talent Scout", name: "Recruitment Name", specialty: "Boundary Hunt Reality", icon: <Gamepad2 /> },
            ].map((leader, i) => (
              <div key={i} className="group relative">
                {/* High Contrast Portrait Placeholder */}
                <div className="aspect-[3/4] w-full bg-[#1a1a1a] grayscale transition-all group-hover:grayscale-0 overflow-hidden rounded-2xl relative border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6">
                    <div className="text-[#dda15e] mb-2">{leader.icon}</div>
                    <h4 className="text-xl font-black uppercase tracking-tighter">{leader.name}</h4>
                    <p className="text-xs font-bold text-white/50 tracking-widest mt-1 uppercase">{leader.role}</p>
                  </div>
                </div>
                {/* Strategic Specialty Badge */}
                <div className="mt-4 py-2 border-l-2 border-[#dda15e] pl-4">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Strategic Specialty</span>
                  <p className="text-sm font-bold text-[#dda15e]">{leader.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}