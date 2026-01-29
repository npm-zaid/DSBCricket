import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DualScoreLogo from './DualScoreLogo';
import { Twitter, Instagram, Youtube, Linkedin, ArrowUpRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const footerLinks = [
    {
      title: 'Platforms',
      links: ['Boundary Hunt', 'BCL League', 'BCL Studio', 'BCL Weekend', 'BCL DUO', 'Shadow Coach'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Partners'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact', 'FAQs', 'Community'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Instagram, label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: Youtube, label: 'YouTube', color: 'hover:text-[#FF0000]' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/50 to-transparent" />
      
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-boundary/5 rounded-full blur-[100px]" />
      
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-12 mb-16">
          {/* Logo & Description */}
          <div className="col-span-2">
            <DualScoreLogo leftText='DS' rightText='BC' size="md" />
            <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Revolutionizing cricket entertainment. Every ball has a winner. Where legends are born.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              {socialLinks.map(({ icon: Icon, label, color }) => (
                <a 
                  key={label}
                  href="#" 
                  aria-label={label}
                  className={`p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-110 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-sm tracking-wider uppercase mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{link}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-b border-border/50 py-10 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h5 className="font-display font-bold text-lg mb-1">Stay in the Game</h5>
              <p className="text-sm text-muted-foreground">Get the latest updates on matches, players, and exclusive content.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-5 py-3 rounded-xl bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-boundary transition-colors"
              />
              <button className="px-6 py-3 rounded-xl bg-boundary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-boundary/30 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Dual Score Boundary Cricket. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for cricket fans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
