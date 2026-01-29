import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import DualScoreLogo from './DualScoreLogo';

const navItems = [
  { label: 'Boundary Hunt', href: '/boundary-hunt' },
  { label: 'BCL League', href: '/bcl-league' },
  { label: 'BCL Studio', href: '/bcl-studio' },
  { label: 'BCL Weekend', href: '/bcl-weekend' },
  { label: 'BCL DUO', href: '/bcl-duo' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Navbar entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    // Stagger nav links
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
        );
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll('a, button'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
        );
      } else {
        gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.3 });
      }
    }
  }, [isOpen]);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass border-b border-border/50 shadow-lg shadow-background/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
        <DualScoreLogo leftText="DS" rightText="BC" size="sm"/>

          {/* Desktop Nav */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-lg bg-muted/0 group-hover:bg-muted/50 transition-colors" />
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-boundary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-semibold rounded-xl border-2 border-border hover:border-dot hover:text-dot transition-all duration-300">
              Watch Live
            </button>
            <button className="group relative px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-boundary to-boundary/80 text-primary-foreground overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-boundary/30">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-1">
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="glass border-t border-border/50 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full px-5 py-3.5 text-sm font-semibold rounded-xl border-2 border-border">
              Watch Live
            </button>
            <button className="w-full px-5 py-3.5 text-sm font-semibold rounded-xl bg-boundary text-primary-foreground">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
