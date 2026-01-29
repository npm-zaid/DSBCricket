"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRightLeft, ShieldAlert, Zap, Info } from "lucide-react";

export default function DualScoreInteraction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const batSvgRef = useRef<SVGSVGElement>(null);
  const ballSvgRef = useRef<SVGSVGElement>(null);

  const [percent, setPercent] = useState(50);
  const [batScore, setBatScore] = useState(0);
  const [ballScore, setBallScore] = useState(4);
  const [status, setStatus] = useState("System Ready");
  const [isMobile, setIsMobile] = useState(false);

  /* ------------------ MOBILE CHECK ------------------ */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ------------------ GAME SIM ------------------ */
  const simulatePlay = () => {
    const outcomes = [
      { bat: 0, ball: 4, msg: "Dot Ball! Max Impact." },
      { bat: 1, ball: 3, msg: "Single. Bowler edge." },
      { bat: 2, ball: 2, msg: "Perfect Equilibrium." },
      { bat: 3, ball: 1, msg: "Batter leading." },
      { bat: 4, ball: 0, msg: "Boundary! Zeroed." },
      { bat: 5, ball: -1, msg: "Over-Boundary!" },
      { bat: 6, ball: -2, msg: "Massive Six!" },
    ];
    const pick = outcomes[Math.floor(Math.random() * outcomes.length)];

    const tl = gsap.timeline();

    tl.to(batSvgRef.current, { rotation: -20, scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 })
      .to(ballSvgRef.current, { x: 30, opacity: 0, duration: 0.2 }, "<")
      .call(() => {
        setBatScore(pick.bat);
        setBallScore(pick.ball);
        setStatus(pick.msg);
      })
      .fromTo(".score-digit", { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.3 })
      .to(ballSvgRef.current, { x: 0, opacity: 1, duration: 0.25 });
  };

  useEffect(() => {
    const interval = setInterval(simulatePlay, 3500);
    return () => clearInterval(interval);
  }, []);

  /* ------------------ SLIDER ------------------ */
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || isMobile) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = x - rect.left;
    const newPercent = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setPercent(newPercent);

    gsap.set(lineRef.current, { left: `${newPercent}%` });
    const shift = (newPercent - 50) * 0.3;
    gsap.to([leftContentRef.current, rightContentRef.current], { x: shift, duration: 0.4 });
  };

  return (
    <section className="py-12 md:py-24 px-4 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* ---------------- HEADER ---------------- */}
        <div className="mb-10 md:mb-20 text-center">
          <div className="mb-6 inline-flex uppercase items-center gap-2 rounded-full border border-[#dda15e]/30 bg-[#dda15e]/10 px-4 py-1 text-[10px] md:text-sm font-bold text-[#dda15e]">
            Proprietary Technology
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase mb-4">
            Dual-Score{" "}
            <span className="bg-gradient-to-r from-[#bc6c25] to-[#dda15e] bg-clip-text text-transparent">
              Interaction
            </span>
          </h2>

          <p className="text-white/40 text-sm md:text-lg italic max-w-2xl mx-auto">
            "We don't just host games; we own the DNA of a new sport."
          </p>
        </div>

        {/* ---------------- INTERACTIVE ZONE ---------------- */}
        <div
          ref={containerRef}
          onMouseMove={!isMobile ? handleInteraction : undefined}
          onTouchMove={!isMobile ? handleInteraction : undefined}
          className="relative min-h-[80vh] md:h-[90vh] w-full overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0a] shadow-2xl"
        >
          {/* ---------- NEW SYSTEM ---------- */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#bc6c25_1px,transparent_1px)] [background-size:28px_28px]" />

            {/* CONTENT */}
            <div
              ref={rightContentRef}
              className={`relative z-10 w-full px-4 ${
                isMobile
                  ? "grid grid-cols-1 gap-4"
                  : "max-w-5xl md:grid md:grid-cols-3 items-center"
              }`}
            >

              {/* BAT CARD */}
              <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-5 md:bg-transparent md:border-none md:py-0`}>
                <svg ref={batSvgRef} viewBox="0 0 24 24" fill="none" className="w-10 h-10 md:w-20 md:h-20 text-[#bc6c25]">
                  <path d="M18.5 2L22 5.5L10 17.5L6.5 14L18.5 2Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.5 14L3 17.5L6.5 21L10 17.5L6.5 14Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p className="text-[9px] font-black text-white/40 tracking-widest uppercase">Batter Impact</p>
                <div className="score-digit text-5xl md:text-8xl font-black text-white">{batScore}</div>
              </div>

              {/* DNA CARD */}
              <div className="flex items-center justify-center gap-4 rounded-2xl border border-[#bc6c25]/40 bg-[#bc6c25]/10 py-5 md:bg-transparent md:border-none md:py-0">
                <div className="h-14 w-14 md:h-24 md:w-24 rounded-full border-4 border-[#bc6c25] flex items-center justify-center text-2xl md:text-4xl font-black text-[#bc6c25]">
                  4
                </div>
                <p className="text-[9px] font-black tracking-widest text-[#bc6c25] uppercase">
                  Fixed DNA
                </p>
              </div>

              {/* BALL CARD */}
              <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-5 md:bg-transparent md:border-none md:py-0`}>
                <svg ref={ballSvgRef} viewBox="0 0 24 24" fill="none" className="w-10 h-10 md:w-20 md:h-20 text-white">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 5C15 5 13 8 13 12C13 16 15 19 15 19" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p className="text-[9px] font-black text-white/40 tracking-widest uppercase">Bowler Defense</p>
                <div className="score-digit text-5xl md:text-8xl font-black text-white">{ballScore}</div>
              </div>
            </div>

            {/* STATUS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md px-5 py-2 rounded-xl border border-white/10 w-[85%] md:w-auto text-center">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-[#bc6c25]" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 truncate">
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- LEGACY SYSTEM (DESKTOP ONLY) ---------- */}
          {!isMobile && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a1a] grayscale transition-all duration-1000"
              style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
            >
              <div ref={leftContentRef} className="text-center space-y-8 px-6">
                <ShieldAlert className="h-20 w-20 text-white/10 mx-auto" />
                <h3 className="text-5xl font-black text-white/20 uppercase">Legacy Scoring</h3>

                <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5">
                  <p className="font-mono text-2xl text-white/20">TEAM A: 145/4 (20.0)</p>
                  <div className="h-px w-full bg-white/5 my-4" />
                  <p className="font-mono text-xs text-white/10 uppercase">
                    Bowler Impact: Not Tracked
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ---------- SLIDER HANDLE (DESKTOP ONLY) ---------- */}
          {!isMobile && (
            <div ref={lineRef} className="absolute top-0 bottom-0 z-30 w-1 bg-[#bc6c25]" style={{ left: "50%" }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-[#bc6c25] border-[8px] border-[#0a0a0a] flex items-center justify-center shadow-2xl">
                <ArrowRightLeft className="h-8 w-8 text-black" />
              </div>
            </div>
          )}
        </div>

        {/* CAPTIONS */}
        <div className="mt-8 flex justify-between items-center opacity-30 font-black text-[8px] tracking-[0.4em] uppercase">
          <div className="flex items-center gap-2"><Info size={12}/> Legacy</div>
          <div className="flex items-center gap-2">Dual Score <Info size={12}/></div>
        </div>
      </div>
    </section>
  );
}
