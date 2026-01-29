"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Tv,
  Trophy,
  ShieldCheck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Primary Gradient: from-[#bc6c25] to-[#dda15e]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ✅ CTA BUTTON SCROLL ANIMATION
  useEffect(() => {
    const buttons = ctaRef.current?.querySelectorAll("button");
    if (!buttons || buttons.length === 0) return;

    gsap.fromTo(
      buttons,
      { y: 40, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  // ✅ HERO ENTRANCE ANIMATIONS
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 90, opacity: 0, filter: "blur(14px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power4.out",
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      // ✅ CTA CHILDREN FIX
      const ctaChildren = ctaRef.current?.children;
      if (ctaChildren && ctaChildren.length > 0) {
        gsap.fromTo(
          Array.from(ctaChildren),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      // ✅ GRID CHILDREN FIX
      const gridChildren = gridRef.current?.children;
      if (gridChildren && gridChildren.length > 0) {
        gsap.fromTo(
          Array.from(gridChildren),
          { y: 70, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: 1,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      {/* Luxury Gold Ambient Background */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#CC8541]/50 blur-[180px]" />
      <div className="absolute top-1/2 -left-24 w-[500px] h-[500px] rounded-full bg-[#CC8541]/50 blur-[180px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-28 text-center">
        {/* Premium Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dda15e]/30 bg-gradient-to-r from-[#bc6c25]/20 to-[#dda15e]/10 px-6 py-2 text-xs tracking-[0.25em] text-[#dda15e] backdrop-blur shadow-[0_0_50px_rgba(221,161,94,0.25)]">
          <Sparkles className="h-4 w-4" /> THE FUTURE OF CRICKET
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="relative text-balance text-4xl font-black leading-tight sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-[#bc6c25] to-[#dda15e] bg-clip-text text-transparent">
            Dual-Score
          </span>
          <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Boundary Cricket
          </span>
        </h1>

        {/* Gold Divider */}
        <div className="mt-8 h-[4px] w-80 bg-gradient-to-r from-transparent via-[#dda15e] to-transparent" />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 max-w-3xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg"
        >
          World’s first <span className="text-[#dda15e]">sports-tech + media</span>{" "}
          ecosystem where AI scouts talent, reality TV builds icons, and patented
          formats redefine the game.
          <br />
          <span className="text-[#dda15e] font-semibold">
            Every ball has a winner.
          </span>
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-14 flex flex-wrap items-center justify-center gap-6"
        >
          <button className="group relative overflow-hidden rounded-2xl bg-[#BC6C26] px-10 py-5 text-sm font-black uppercase tracking-wider text-white shadow-[0_20px_50px_rgba(188,108,38,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(188,108,38,0.5)] active:scale-95">
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
            <span className="relative z-10 flex items-center gap-3">
              Cricketers — Get Scouted
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
            <span className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40" />
          </button>

          <button className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-sm font-bold text-white/90 backdrop-blur-xl transition-all duration-300 hover:border-[#CC8541]/50 hover:bg-[#CC8541]/10 hover:text-white">
            <Sparkles className="h-4 w-4 text-[#CC8541] transition-transform group-hover:scale-125 group-hover:rotate-12" />
            Investors — View Thesis
            <div className="absolute inset-0 -z-10 bg-[#CC8541]/0 blur-xl transition-all group-hover:bg-[#CC8541]/10" />
          </button>

          <button className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-sm font-bold text-white/90 backdrop-blur-xl transition-all duration-300 hover:border-[#CC8541]/50 hover:bg-[#CC8541]/10 hover:text-white">
            <Sparkles className="h-4 w-4 text-[#CC8541] transition-transform group-hover:scale-125" />
            Partners — License IP
            <div className="absolute inset-0 -z-10 bg-[#CC8541]/0 blur-xl transition-all group-hover:bg-[#CC8541]/10" />
          </button>
        </div>

        {/* Ecosystem Pillars */}
        <div
          ref={gridRef}
          className="mt-28 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "Leagues (Scale)",
              icon: Trophy,
              items: ["BCL India/Dubai Open", "Weekend Premier", "BCL Duo (2v2)"],
            },
            {
              title: "Tech (IQ)",
              icon: Cpu,
              items: ["AI Scouting", "Shadow Captain App", "BCL Central App"],
            },
            {
              title: "Media (Hype)",
              icon: Tv,
              items: ["Reality TV", "Studio Production", "Player Stories"],
            },
            {
              title: "IP (Core)",
              icon: ShieldCheck,
              items: ["Dual-Score™", "High-Velocity Formats", "Tactical Moats"],
            },
          ].map((col, i) => {
            const Icon = col.icon;
            return (
              <div
                key={i}
                className="p-1 rounded-2xl bg-gradient-to-tr from-[#bc6c25]/50 via-[#dda15e]/50 to bg-zinc-900"
              >
                <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/80 p-7 backdrop-blur transition hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(221,161,94,0.25)]">
                  <div className="mb-5 flex items-center gap-3 text-[#dda15e] transition group-hover:text-white">
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-semibold tracking-wider">
                      {col.title}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-white/70">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#bc6c25] to-[#dda15e]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition group-hover:opacity-100 bg-gradient-to-br from-[#bc6c25]/25 to-[#dda15e]/20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <p className="mt-24 max-w-2xl text-sm italic text-white/50">
          “Technology finds them. Media crowns them. The BCL League makes them
          legends. Welcome to the Dual-Score Ecosystem.”
        </p>
      </div>
    </section>
  );
}
