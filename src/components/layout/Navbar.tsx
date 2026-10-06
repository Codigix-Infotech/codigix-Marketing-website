"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Search,
  Zap,
  Share2,
  Instagram,
  ShoppingCart,
  FileText,
  Code2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Plus
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const serviceItems = [
  {
    title: "SEO Search Engine Optimization",
    desc: "Rank #1 for high-intent search terms on Google.",
    href: "/best-seo-services-in-pcmc",
    icon: Search,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200/60"
  },
  {
    title: "Paid Advertisements (PPC)",
    desc: "Generate high-intent patient leads immediately with max ROI.",
    href: "/paid-advertisements-ppc",
    icon: Zap,
    color: "text-amber-600 bg-amber-50 border-amber-200/60"
  },
  {
    title: "Social Media Marketing",
    desc: "Engage target audiences with viral reels, branding & campaigns.",
    href: "/social-media-marketing",
    icon: Instagram,
    color: "text-pink-600 bg-pink-50 border-pink-200/60"
  },
  {
    title: "E-Commerce Marketing",
    desc: "Scale online sales, product rankings & conversion funnels.",
    href: "/ecommerce-marketing",
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-50 border-blue-200/60"
  },
  {
    title: "Medical Content Marketing",
    desc: "Authoritative healthcare content, clinical blogs & patient guides.",
    href: "/medical-content-marketing",
    icon: FileText,
    color: "text-purple-600 bg-purple-50 border-purple-200/60"
  },
  {
    title: "Web Design & Development",
    desc: "High-converting, mobile-first healthcare & enterprise websites.",
    href: "/web-design-development",
    icon: Code2,
    color: "text-indigo-600 bg-indigo-50 border-indigo-200/60"
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownDismissed, setDropdownDismissed] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Lock page scroll when mobile menu is open (Lenis drives wheel scrolling, so pause it too)
  const lenis = useLenis();
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [mobileMenuOpen, lenis]);

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/services') {
      return (
        pathname.startsWith('/services') ||
        pathname.startsWith('/best-seo-services-in-pcmc') ||
        pathname.startsWith('/paid-advertisements-ppc') ||
        pathname.startsWith('/social-media-marketing') ||
        pathname.startsWith('/ecommerce-marketing') ||
        pathname.startsWith('/ecommerce-seo-services-in-pcmc') ||
        pathname.startsWith('/medical-content-marketing') ||
        pathname.startsWith('/content-marketing') ||
        pathname.startsWith('/web-design-development') ||
        pathname.startsWith('/website-design-development')
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinks: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Blog", href: "/blog" },
    { label: "Career", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${isScrolled
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-b border-slate-200/80'
          : 'top-4 sm:top-6 bg-transparent'
          }`}
      >
        <div
          className={`flex items-center justify-between px-5 sm:px-6 lg:px-8 transition-all duration-500  mx-auto ${isScrolled
            ? 'w-full h-[70px]'
            : 'w-[95%] sm:w-[94%] xl:w-[96%] h-[76px] sm:h-[80px] bg-white/85 backdrop-blur-xl border border-slate-200/80 rounded-full shadow-[0_4px_25px_rgba(26,16,83,0.06)]'
            }`}
        >

          {/* Brand Logo */}
          <Link href="/" className="z-50 shrink-0 flex items-center group">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[14.5px] font-medium text-slate-600">
            {navLinks.map((item) => {
              const active = isActiveRoute(item.href);

              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="relative group py-2" onMouseLeave={() => setDropdownDismissed(false)}>
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 ${active
                        ? 'text-[#e20b27] bg-[#e20b27]/8 font-semibold shadow-2xs'
                        : 'hover:text-[#1a1053] hover:bg-slate-100/70 text-slate-600'
                        }`}
                    >
                      <span>{item.label}</span>
                      <Plus
                        size={13}
                        className={`transition-transform duration-300 group-hover:rotate-45 ${active ? 'text-[#e20b27]' : 'text-slate-500 group-hover:text-[#1a1053]'
                          }`}
                      />
                    </Link>

                    {/* Hover Bridge Area */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible transition-all duration-300 z-50 pointer-events-none ${dropdownDismissed ? '' : 'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'}`}>
                      <div className="w-[300px] sm:w-[320px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(26,16,83,0.16)] rounded-2xl p-2 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {serviceItems.map((svc, i) => {
                          const IconComp = svc.icon;
                          return (
                            <Link
                              key={i}
                              href={svc.href}
                              // close the hover menu once a service is picked (the pointer is still over it)
                              onClick={() => setDropdownDismissed(true)}
                              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200 group/item ${i !== serviceItems.length - 1 ? 'border-b border-slate-100/80' : ''
                                }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${svc.color} transition-transform duration-200 group-hover/item:scale-105 shadow-2xs`}>
                                <IconComp size={15} />
                              </div>
                              <span className="text-[13px] font-medium text-slate-700 group-hover/item:text-[#1a1053] group-hover/item:font-semibold transition-colors leading-tight">
                                {svc.title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-full transition-all duration-300 relative ${active
                    ? 'text-[#e20b27] bg-[#e20b27]/8 font-semibold shadow-2xs'
                    : 'hover:text-[#1a1053] hover:bg-slate-100/70 text-slate-600'
                    }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 h-11 bg-gradient-to-r from-[#1a1053] to-[#2b1b80] text-white rounded-full font-medium text-[13.5px] shadow-[0_4px_16px_rgba(26,16,83,0.15)] hover:shadow-[0_6px_20px_rgba(26,16,83,0.25)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>Let's Talk</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-[#1a1053] flex items-center justify-center transition-all active:scale-95 border border-slate-200/60"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Backdrop and Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[98] lg:hidden"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              data-lenis-prevent
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white z-[99] shadow-2xl flex flex-col justify-between p-6 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col">

                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <Logo size="md" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((item) => {
                    const active = isActiveRoute(item.href);

                    if (item.hasDropdown) {
                      return (
                        <div key={item.label} className="flex flex-col">
                          <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-sm font-semibold transition-all ${active
                              ? 'text-[#e20b27] bg-[#e20b27]/8'
                              : 'text-slate-700 hover:bg-slate-50'
                              }`}
                          >
                            <span>{item.label}</span>
                            <Plus
                              size={16}
                              className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-45 text-[#e20b27]' : 'text-slate-400'
                                }`}
                            />
                          </button>

                          {/* Mobile Services Accordion */}
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-3 pr-1 py-1 flex flex-col gap-1"
                              >
                                {serviceItems.map((svc, idx) => {
                                  const IconComp = svc.icon;
                                  return (
                                    <Link
                                      key={idx}
                                      href={svc.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-xs text-slate-600 font-medium transition-colors"
                                    >
                                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${svc.color}`}>
                                        <IconComp size={14} />
                                      </div>
                                      <span>{svc.title}</span>
                                    </Link>
                                  );
                                })}
                                <Link
                                  href="/services"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs font-semibold text-blue-600 px-3 py-2 hover:underline"
                                >
                                  View all services →
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-between ${active
                          ? 'text-[#e20b27] bg-[#e20b27]/8'
                          : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        <span>{item.label}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-[#e20b27]" />}
                      </Link>
                    );
                  })}
                </nav>

              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3 mt-6">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a1053] text-white rounded-full font-medium text-sm shadow-md"
                >
                  <PhoneCall size={16} />
                  <span>Get in Touch</span>
                </Link>
                <p className="text-center text-[11px] text-slate-400 font-light">
                  Pune, Maharashtra • Growth & Patient Acquisition
                </p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
