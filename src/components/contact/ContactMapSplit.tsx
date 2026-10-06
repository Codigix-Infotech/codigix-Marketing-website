'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Copy,
  Check,
  Navigation,
  ExternalLink,
  Building2,
  Compass,
  Sparkles,
  ShieldCheck,
  Award,
} from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import Logo from '@/components/ui/Logo';
import AbstractMap from '@/components/ui/AbstractMap';
import type { ContactSettings } from '@/lib/types';

interface ContactMapSplitProps {
  contact: ContactSettings;
  clients?: any[];
}

// Vicinity nodes anchored around Codigix HQ on the right side (Center: 74%, 54%)
const MINIMAL_NODES = [
  {
    id: 'building',
    title: 'Bramha Sky Uzuri',
    subtitle: 'Office 309 • 3rd Floor',
    x: 58,
    y: 26,
    icon: Building2,
  },
  {
    id: 'coords',
    title: '18.6298° N, 73.7997° E',
    subtitle: 'GPS Reticle',
    x: 88,
    y: 24,
    icon: Compass,
    isCopyable: true,
  },
  {
    id: 'area',
    title: 'Masulkar Colony',
    subtitle: 'Pimpri-Chinchwad, Pune',
    x: 56,
    y: 76,
    icon: MapPin,
  },
  {
    id: 'hours',
    title: 'Mon – Sat: 10AM – 7PM',
    subtitle: 'Consultation Hours',
    x: 88,
    y: 78,
    icon: Clock,
  },
];

const cssStyles = `
  @keyframes draw-line {
    0% { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes flowing-dots {
    to { stroke-dashoffset: -20; }
  }
  .minimal-connection-line {
    animation: draw-line 1.5s ease-out forwards, flowing-dots 1.5s linear infinite;
  }
`;

export default function ContactMapSplit({ contact }: ContactMapSplitProps) {
  const [mounted, setMounted] = useState(false);
  const [mapMode, setMapMode] = useState<'vector' | 'road'>('vector');
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const LAT = 18.6298;
  const LNG = 73.7997;
  const coordsFormatted = `${LAT}° N, ${LNG}° E`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

  const mapEmbedUrl =
    contact.map_embed_url ||
    `https://maps.google.com/maps?q=Bramha+Sky+Uzuri,+Masulkar+Colony,+Pimpri-Chinchwad,+Pune,+Maharashtra+411018&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const phonePrimary = contact.phone || '+91 98765 43210';
  const whatsappNum = (contact.whatsapp || phonePrimary).replace(/[^\d]/g, '');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyCoords = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${LAT}, ${LNG}`);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2000);
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-center pt-28 sm:pt-32 pb-12 sm:pb-16">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* ========================================================================= */}
      {/* 1. FULL PAGE MINIMAL MAP BACKGROUND                                       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-br from-white via-[#fcfdff] to-[#f4f7fc]">

        {/* VIEW 1: CLEAN MINIMALIST DOT MATRIX MAP */}
        {mapMode === 'vector' && (
          <div className="relative w-full h-full select-none">

            {/* Subtle soft ambient light glow in the center-right */}
            <div className="absolute top-1/2 left-[74%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.05] rounded-full blur-[90px] pointer-events-none" />

            {/* Calm Dot Matrix Texture */}
            <div className="absolute inset-0 opacity-60 pointer-events-none">
              <AbstractMap />
            </div>

            {/* Concentric Circles around Codigix HQ (Desktop: left 74%, top 54%) */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="hidden lg:block absolute top-[54%] left-[74%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-dashed border-slate-200/90" />
              <div className="hidden lg:block absolute top-[54%] left-[74%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-slate-200/60" />
              <div className="hidden lg:block absolute top-[54%] left-[74%] -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-dashed border-slate-100" />
            </div>

            {/* Subtle Radiating Dashed Connection Lines */}
            {mounted && (
              <svg
                className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {MINIMAL_NODES.map((node) => {
                  const isActive = activeNodeId === node.id;
                  return (
                    <path
                      key={`min-line-${node.id}`}
                      d={`M 74 54 Q 74 ${node.y} ${node.x} ${node.y}`}
                      fill="none"
                      className="minimal-connection-line transition-all duration-300"
                      strokeDasharray="4, 4"
                      vectorEffect="non-scaling-stroke"
                      style={{
                        stroke: isActive ? '#2563eb' : 'rgba(148, 163, 184, 0.45)',
                        strokeWidth: isActive ? 2 : 1.2,
                        filter: isActive ? 'drop-shadow(0 0 4px rgba(37, 99, 235, 0.4))' : 'none',
                      }}
                    />
                  );
                })}
              </svg>
            )}

            {/* Clean Minimalist Landmark Nodes */}
            <div className="hidden lg:block relative w-full h-full z-20 pointer-events-none">
              {MINIMAL_NODES.map((node) => {
                const Icon = node.icon;
                const isActive = activeNodeId === node.id;

                return (
                  <div
                    key={node.id}
                    className="absolute pointer-events-auto"
                    style={{
                      top: `${node.y}%`,
                      left: `${node.x}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onMouseLeave={() => setActiveNodeId(null)}
                    onClick={() => node.isCopyable && handleCopyCoords()}
                  >
                    <div
                      className={`cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/95 border transition-all duration-200 ${isActive
                        ? 'border-blue-500 shadow-md -translate-y-0.5'
                        : 'border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-slate-300'
                        }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                          }`}
                      >
                        <Icon size={13} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-slate-800 leading-tight whitespace-nowrap">
                          {node.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal whitespace-nowrap">
                          {node.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ================= EPICENTER: CODIGIX INFOTECH NODE ================= */}
              <div
                className="absolute z-30 flex flex-col items-center cursor-pointer pointer-events-auto"
                style={{ left: '74%', top: '54%', transform: 'translate(-50%, -50%)' }}
                onClick={handleCopyCoords}
                title="Click to copy GPS Coordinates"
              >
                {/* Clean Central White Disc */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center p-3 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-300 relative group">
                  <div className="relative z-10 scale-[0.72] sm:scale-[0.8] transition-transform group-hover:scale-[0.85]">
                    <Logo showText={false} />
                  </div>
                </div>

                {/* Minimalist Pune HQ Badge */}
                <div className="mt-2 bg-[#1a1053] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Pune HQ</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: ROAD VIEW */}
        {mapMode === 'road' && (
          <div className="relative w-full h-full">
            <iframe
              src={mapEmbedUrl}
              title="Codigix Infotech Coordinates Map"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 2. MINIMAL TOP-RIGHT CONTROLS (Positioned below the fixed navbar)         */}
      {/* ========================================================================= */}
      <div className="absolute top-28 sm:top-32 right-4 sm:right-8 z-30 flex items-center gap-2 pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md p-0.5 rounded-xl border border-slate-200 shadow-2xs flex items-center">
          <button
            type="button"
            onClick={() => setMapMode('vector')}
            className={`cursor-pointer px-3 py-1 rounded-lg text-xs font-medium transition-colors ${mapMode === 'vector'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setMapMode('road')}
            className={`cursor-pointer px-3 py-1 rounded-lg text-xs font-medium transition-colors ${mapMode === 'road'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Road View
          </button>
        </div>

        <button
          onClick={handleCopyCoords}
          className="hidden sm:inline-flex items-center gap-1 bg-white/90 hover:bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-xl text-xs font-mono shadow-2xs transition-colors cursor-pointer"
          title="Copy GPS coordinates"
        >
          {copiedCoords ? (
            <span className="text-emerald-600 font-sans font-semibold">Copied</span>
          ) : (
            <span>{coordsFormatted}</span>
          )}
        </button>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-slate-900 hover:bg-blue-600 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
        >
          <span>Directions</span>
          <ExternalLink size={10} />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 3. PROMINENT & HIGH-CONVERTING OVERLAID CONTACT CARD ON LEFT SIDE         */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full  mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none max-w-7xl">
        <div className="pointer-events-auto w-full max-w-[500px] sm:max-w-[530px] lg:max-w-[550px]">

          {/* Glassmorphic Elevated Floating Card - No internal scrolling */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_16px_48px_-12px_rgba(26,16,83,0.12)] ring-1 ring-slate-900/5 relative">

            {/* Top Atmospheric Corner Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative z-10 space-y-3">

              {/* Header Section */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10.5px] font-semibold text-emerald-800 tracking-wide">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </span>
                    <span>HQ Active • Mon–Sat 10:00 AM – 7:00 PM</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 font-medium bg-blue-50/70 px-2 py-0.5 rounded-full border border-blue-100">
                    <Sparkles size={11} className="text-blue-600" />
                    <span>Free Practice Audit</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1053] tracking-tight leading-snug">
                  Let’s Build Something{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                    Extraordinary.
                  </span>
                </h2>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  Ready to accelerate your practice growth & patient appointments? Speak directly with our Pune digital growth team.
                </p>

                {/* Trust Highlight Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-100 text-[10.5px] font-medium text-slate-600">
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/80">
                    <Clock size={11} className="text-emerald-600" />
                    <span>15-Min Response</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/80">
                    <ShieldCheck size={11} className="text-blue-600" />
                    <span>100% NDA Protected</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/80">
                    <Award size={11} className="text-purple-600" />
                    <span>50+ Clinics Grown</span>
                  </div>
                </div>
              </div>

              {/* The Contact Form */}
              <div className="pt-1.5 border-t border-slate-100">
                <ContactForm services={contact.services} compact={true} />
              </div>

              {/* Direct Reach Communication Row */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${phonePrimary.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Phone size={13} />
                  </div>
                  <div className="truncate text-left">
                    <div className="text-[9.5px] text-slate-400 font-bold uppercase leading-none">Call Directly</div>
                    <div className="font-semibold text-slate-800 group-hover:text-blue-600 truncate text-[11px] sm:text-xs mt-0.5">{phonePrimary}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Codigix team, I would like to inquire about digital marketing services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <MessageCircle size={13} />
                  </div>
                  <div className="truncate text-left">
                    <div className="text-[9.5px] text-slate-400 font-bold uppercase leading-none">WhatsApp</div>
                    <div className="font-semibold text-slate-800 group-hover:text-emerald-600 truncate text-[11px] sm:text-xs mt-0.5">Start Instant Chat</div>
                  </div>
                </a>
              </div>

              {/* Address Quick Footnote */}
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 pt-0.5">
                <MapPin size={11} className="text-[#e20b27] shrink-0" />
                <span className="truncate">
                  Office 309, Bramha Sky Uzuri, Masulkar Colony, Pimpri-Chinchwad, Pune 411018
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
