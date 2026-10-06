"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import type { PublicSettings } from '@/lib/types';
import { submitPublic } from '@/lib/public-client';

export default function Footer({ settings }: { settings: PublicSettings }) {
  const { site, contact, social } = settings;
  const [email, setEmail] = useState('');
  const lenis = useLenis();
  const [newsletter, setNewsletter] = useState<{ state: 'idle' | 'loading' | 'done' | 'error'; message?: string }>({ state: 'idle' });

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletter({ state: 'loading' });
    try {
      const res = await submitPublic('/newsletter', { email, source: 'footer' });
      setNewsletter({ state: 'done', message: res.message });
      setEmail('');
    } catch (err) {
      setNewsletter({ state: 'error', message: (err as Error).message });
    }
  };

  const addressLines = [
    contact.address_line1,
    contact.address_line2,
    [contact.city, contact.state, contact.country].filter(Boolean).join(', ') + (contact.postal_code ? ` ${contact.postal_code}` : ''),
  ].filter((l) => l && l.trim());

  const socials = [
    { icon: <Linkedin size={18} />, href: social.linkedin, label: 'LinkedIn' },
    { icon: <Instagram size={18} />, href: social.instagram, label: 'Instagram' },
    { icon: <Facebook size={18} />, href: social.facebook, label: 'Facebook' },
    { icon: <Youtube size={18} />, href: social.youtube, label: 'YouTube' },
    { icon: <Twitter size={18} />, href: social.twitter, label: 'X (Twitter)' },
  ].filter((item) => item.href);

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-white via-[#f8fafe] to-[#eef2f9] text-slate-700 pt-16 pb-8 relative overflow-hidden border-t border-slate-100">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#1a1053 1px, transparent 1px), linear-gradient(90deg, #1a1053 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Geometric Ring */}
      <div className="absolute top-20 right-[20%] w-64 h-64 border border-dashed border-slate-300 rounded-full z-0 opacity-50 animate-[spin_60s_linear_infinite]" />

      <div className="container mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">

        {/* Attractive Newsletter Block */}
        <div className="bg-primary-text rounded-[32px] p-10 lg:p-14 mb-20 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-primary-accent/40 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-50%] left-[20%] w-[300px] h-[300px] bg-highlight/30 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 lg:w-1/2">
            <h3 className="text-3xl lg:text-4xl text-white font-semibold mb-4">{site.newsletter_title || 'Join our Newsletter'}</h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed max-w-md">
              {site.newsletter_text}
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-1/2 max-w-md">
            <form onSubmit={onSubscribe} className="flex w-full bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-inner focus-within:border-primary-accent focus-within:bg-white/20 transition-all">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                placeholder="Enter your email address"
                className="flex-1 min-w-0 bg-transparent text-white placeholder-slate-300 px-4 sm:px-6 py-3 outline-none text-sm font-light"
                required
              />
              <button type="submit" disabled={newsletter.state === 'loading'} className="bg-highlight hover:bg-highlight/90 text-white font-semibold text-sm px-5 sm:px-8 py-3 rounded-full transition-transform hover:scale-105 shadow-md shrink-0 disabled:opacity-70">
                {newsletter.state === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
            {newsletter.message && (
              <p role="status" className={`mt-3 text-sm px-4 ${newsletter.state === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
                {newsletter.message}
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <Link href="/" className="">
              <Logo size="lg" />
            </Link>
            <p className="text-sm text-secondary-text font-light mb-8 leading-relaxed">
              {site.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-primary-accent hover:text-white hover:border-primary-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 lg:pl-8">
            <h4 className="font-semibold text-primary-text mb-6 text-sm tracking-wider uppercase">Company</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/services' },
                { name: 'Blog & Insights', href: '/blog' },
                { name: 'Career', href: '/careers' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[14px] text-slate-500 hover:text-primary-accent transition-colors font-light flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-accent transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-primary-text mb-6 text-sm tracking-wider uppercase">Services</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: 'SEO Search Engine Optimization', href: '/best-seo-services-in-pcmc' },
                { name: 'Paid Advertisements (PPC)', href: '/paid-advertisements-ppc' },
                { name: 'Social Media Marketing', href: '/social-media-marketing' },
                { name: 'E-Commerce Marketing', href: '/ecommerce-marketing' },
                { name: 'Medical Content Marketing', href: '/medical-content-marketing' },
                { name: 'Web Design & Development', href: '/web-design-development' }
              ].map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-[14px] text-slate-500 hover:text-primary-accent transition-colors font-light flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-accent transition-colors" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-primary-text mb-6 text-sm tracking-wider uppercase">Get in Touch</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4 text-[14px] text-slate-500 font-light group">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary-accent shrink-0 group-hover:bg-primary-accent group-hover:text-white transition-colors">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed mt-1">
                  {addressLines.map((line, i) => (
                    <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-4 text-[14px] text-slate-500 font-light group">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary-accent shrink-0 group-hover:bg-primary-accent group-hover:text-white transition-colors">
                  <Phone size={14} />
                </div>
                <a href={`tel:${(contact.phone || '').replace(/[^+d]/g, '')}`} className="hover:text-primary-accent transition-colors">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-4 text-[14px] text-slate-500 font-light group">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary-accent shrink-0 group-hover:bg-primary-accent group-hover:text-white transition-colors">
                  <Mail size={14} />
                </div>
                <a href={`mailto:${contact.email}`} className="hover:text-primary-accent transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <p className="text-sm font-light text-slate-400">
            © {new Date().getFullYear()} {site.name || 'Codigix Infotech'}. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-light text-slate-400">
            <Link href="/privacy" className="inline-block py-2 hover:text-primary-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="inline-block py-2 hover:text-primary-accent transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="inline-block py-2 hover:text-primary-accent transition-colors">Cookie Policy</Link>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 lg:right-0 -top-12 w-12 h-12 rounded-full bg-white border border-slate-200 text-primary-accent flex items-center justify-center hover:bg-primary-accent hover:text-white hover:border-primary-accent transition-all duration-300 shadow-md focus:outline-none z-20 group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer >
  );
}
