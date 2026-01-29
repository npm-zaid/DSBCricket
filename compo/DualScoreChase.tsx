"use client";

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Target, ShieldCheck } from 'lucide-react';

const DUAL_SCORE_TOTAL = 4;

const DualScoreChase: React.FC = () => {
  const [batScore, setBatScore] = useState(0);
  const [ballScore, setBallScore] = useState(4);
  const [status, setStatus] = useState("Waiting for delivery...");
  
  const batRef = useRef(null);
  const ballRef = useRef(null);
  const formulaRef = useRef(null);

  const simulatePlay = () => {
    // Possible outcomes based on your rules
    const outcomes = [
      { bat: 0, ball: 4, msg: "Dot Ball! Maximum Bowler Impact." },
      { bat: 1, ball: 3, msg: "Single taken. Bowler holds the edge." },
      { bat: 2, ball: 2, msg: "Double. Perfect Equilibrium." },
      { bat: 3, ball: 1, msg: "Sharp Strike. Batter leading." },
      { bat: 4, ball: 0, msg: "Boundary! Bowler Zeroed." },
      { bat: 5, ball: -1, msg: "Over-Boundary! Bowler in Debt." },
      { bat: 6, ball: -2, msg: "Massive Six! Negative Ball Impact." },
    ];

    const pick = outcomes[Math.floor(Math.random() * outcomes.length)];

    // GSAP Animation Sequence
    const tl = gsap.timeline();

    tl.to([batRef.current, ballRef.current], {
      scale: 1.1,
      opacity: 0.5,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    })
    .call(() => {
      setBatScore(pick.bat);
      setBallScore(pick.ball);
      setStatus(pick.msg);
    })
    .fromTo(".score-value", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out" }
    );
  };

  useEffect(() => {
    const interval = setInterval(simulatePlay, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[500px] w-full  flex items-center justify-center p-6 font-sans">
      {/* Grid Background to match your UI */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#bc6c25 1px, transparent 1px), linear-gradient(90deg, #bc6c25 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 w-full max-w-4xl bg-[#12100e] border border-[#bc6c25]/30 rounded-[2.5rem] p-12 overflow-hidden shadow-[0_0_50px_rgba(188,108,38,0.15)]">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-[#bc6c25] font-black tracking-[0.3em] text-sm mb-2 uppercase">Dynamic Scoring Format</h2>
          <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            THE <span className="text-[#bc6c25]">4-POINT</span> EQUATION
          </div>
          <p className="mt-4 text-white/40 italic">Every ball is a zero-sum battle.</p>
        </div>

        {/* Live Equation Display */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 mb-12">
          
          {/* Batter Side */}
          <div ref={batRef} className="flex flex-col items-center">
            <div className="bg-[#bc6c25]/10 p-4 rounded-2xl border border-[#bc6c25]/20 mb-4">
              <Target className="text-[#bc6c25] h-8 w-8" />
            </div>
            <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Batter Impact</span>
            <div className="score-value text-7xl font-black text-white">{batScore}</div>
          </div>

          {/* The Mathematical Operator */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-black text-[#bc6c25] mb-2">+</div>
            <div className="h-12 w-[2px] bg-gradient-to-b from-[#bc6c25] to-transparent" />
          </div>

          {/* Bowler Side */}
          <div ref={ballRef} className="flex flex-col items-center">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4">
              <ShieldCheck className="text-white/60 h-8 w-8" />
            </div>
            <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Bowler Defense</span>
            <div className="score-value text-7xl font-black text-white">{ballScore}</div>
          </div>

          {/* Equal Sign */}
          <div className="text-4xl font-black text-[#bc6c25]">=</div>

          {/* The Constant */}
          <div className="flex flex-col items-center">
             <div className="bg-[#bc6c25] text-black h-16 w-16 rounded-full flex items-center justify-center text-3xl font-black shadow-[0_0_20px_rgba(188,108,38,0.5)]">
               4
             </div>
             <span className="mt-4 text-[10px] font-black text-[#bc6c25] tracking-widest uppercase">Fixed DNA</span>
          </div>
        </div>

        {/* Ticker / Status Message */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-4">
          <div className="h-2 w-2 bg-[#bc6c25] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white/80 tracking-wide uppercase">
            {status}
          </span>
        </div>

        {/* Bottom Formula Tag */}
        <div ref={formulaRef} className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-8">
           <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
             Logic: <span className="text-white/60">Bat(x) + Ball(4-x) = Core</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default DualScoreChase;