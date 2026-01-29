"use client";

import React from "react";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ChevronRight, 
  Sparkles 
} from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "THE GAME",
      links: ["Dual-Score™", "The Rules", "Professional Leagues", "Weekend Premier"],
    },
    {
      title: "THE TECH",
      links: ["First Strike AI", "A7 AI Engine", "Shadow Captain App", "BCL Central"],
    },
    {
      title: "THE TALENT",
      links: ["Boundary Hunt", "Player Recruitment", "Scouting Portal", "Success Stories"],
    },
    {
      title: "PARTNERS",
      links: ["Franchise Inquiry", "Media Licensing", "Investor Relations", "Brand Collabs"],
    },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#050403] pt-24 pb-12 overflow-hidden">
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-[#bc6c25]/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#bc6c25] to-[#dda15e] shadow-[0_0_20px_rgba(221,161,94,0.3)]">
              <Sparkles className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              DS<span className="text-[#dda15e]">BC</span>
            </span>
          </div>
            <p className="text-sm text-white/40 leading-relaxed">
              We don’t just host games; we own the DNA of a new sport.
            </p>
            <div className="flex gap-4 mt-8">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#dda15e] hover:border-[#dda15e]/50 transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((group, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-black tracking-[0.2em] text-[#dda15e] mb-8 uppercase">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href="#" 
                      className="group flex items-center text-sm text-white/50 hover:text-white transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#dda15e]" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
            © 2026 Dual-Score Boundary Cricket. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of IP</a>
            <a href="#" className="hover:text-white transition-colors">Anti-Corruption</a>
          </div>
        </div>
      </div>
    </footer>
  );
}