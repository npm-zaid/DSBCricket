"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "THE GAME", label: "Dual-Score, Rules, Leagues" },
    { name: "THE TECH", label: "First Strike, A7 AI, App" },
    { name: "THE TALENT", label: "Boundary Hunt, Recruitment" },
    { name: "PARTNERS", label: "Franchise, Media, Investors" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div 
        className={`mx-auto max-w-7xl rounded-full border border-white/10 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl px-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "bg-transparent px-6"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#bc6c25] to-[#dda15e] shadow-[0_0_20px_rgba(221,161,94,0.3)]">
              <Sparkles className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              DS<span className="text-[#dda15e]">BC</span>
            </span>
          </div>

          {/* Desktop Navigation Labels */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="group relative cursor-pointer">
                <span className="text-xs font-black tracking-[0.2em] text-white/70 transition-colors group-hover:text-[#dda15e]">
                  {link.name}
                </span>
                {/* Descriptive Sub-label Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 rounded-xl border border-white/10 bg-black/90 p-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none">
                  <p className="text-[10px] font-bold tracking-widest text-[#dda15e] uppercase">
                    {link.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="group relative overflow-hidden rounded-full bg-[#dda15e] px-6 py-2.5 text-[10px] font-black tracking-[0.2em] text-black transition-transform active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                GET SCOUTED <ArrowRight className="h-3 w-3" />
              </span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[-1] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="text-center">
              <h3 className="text-2xl font-black text-white">{link.name}</h3>
              <p className="text-[10px] font-bold text-[#dda15e] tracking-widest mt-2">{link.label}</p>
            </div>
          ))}
          <button className="mt-8 rounded-full bg-[#dda15e] px-10 py-4 text-xs font-black text-black">
            JOIN ECOSYSTEM
          </button>
        </div>
      )}
    </nav>
  );
}