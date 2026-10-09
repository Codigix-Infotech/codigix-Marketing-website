"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import AbstractMap from '@/components/ui/AbstractMap';
import type { Client } from '@/lib/types';
import { defaultClients } from '@/lib/defaults';
import { mediaUrl } from '@/lib/config';

// Used when a client has no map position set in the admin panel.
const FALLBACK_POSITIONS = [
  { x: 25, y: 25 }, { x: 50, y: 15 }, { x: 35, y: 80 }, { x: 85, y: 50 }, { x: 75, y: 75 }, { x: 15, y: 50 },
  { x: 35, y: 10 }, { x: 38, y: 35 }, { x: 65, y: 20 }, { x: 15, y: 85 }, { x: 55, y: 85 }, { x: 90, y: 80 },
  { x: 85, y: 15 }, { x: 65, y: 40 }, { x: 60, y: 60 }, { x: 10, y: 30 }, { x: 20, y: 65 },
];

const cssStyles = `
  @keyframes draw-line {
    0% { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes flowing-dots {
    to { stroke-dashoffset: -20; }
  }
  .connection-line {
    animation: draw-line 2s ease-out forwards, flowing-dots 1s linear infinite;
  }
`;

export default function ClientLogos({ clients = defaultClients }: { clients?: Client[] }) {
  const [mounted, setMounted] = useState(false);
  const clientLogos = clients
    .filter((c) => c.show_on_map !== false)
    .map((c) => {
      let logo = c.logo;
      // Convert any legacy extensions or known paths to webp
      if (logo) {
        logo = logo.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      }
      // Standardize client logos to high-quality WebP files
      if (c.name === "Dr. Sheetal's Glow") logo = '/clients/sheetals-glow.webp';
      if (c.name === "Smiles For All") logo = '/clients/smiles-for-all.webp';
      if (c.name === "Dr. Shagun Rao") logo = '/clients/dr-shagun-rao.webp';
      if (c.name === "Kitchen Canvas") logo = '/clients/kitchen-canvas.webp';
      if (c.name === "Kimaya Brain & Spine") logo = '/clients/kimaya.webp';
      if (c.name === "Sanskruti Agro Farm") logo = '/clients/sanskruti-agro-farm.webp';
      if (c.name === "Ayurlekha") logo = '/clients/aayurlekha.webp';
      if (c.name === "CorpLegal") logo = '/clients/corplegal.webp';
      if (c.name === "Shriraj Clinic") logo = '/clients/shriraj-clinic.webp';
      if (c.name === "Moraya Multispeciality") logo = '/clients/morya.webp';
      if (c.name === "Canopy Dental Care") logo = '/clients/canopy.webp';
      if (c.name === "Bakul") logo = '/clients/bakul.webp';
      if (c.name === "Regain") logo = '/clients/regain.webp';
      if (c.name && c.name.startsWith("Shushrut")) logo = '/clients/shushrut.webp';
      if (c.name === "Viranjany") logo = '/clients/viranjany.webp';
      
      return { ...c, logo: mediaUrl(logo), isHealthcare: c.is_healthcare };
    });
  const nodePositions = clientLogos.map((c, i) =>
    c.map_x != null && c.map_y != null
      ? { x: Number(c.map_x), y: Number(c.map_y) }
      : FALLBACK_POSITIONS[i % FALLBACK_POSITIONS.length]
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 relative z-20 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* Soft ambient light orbs covering entire section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 px-2 sm:px-4 lg:px-6 mb-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-[#1a1053] tracking-wide mb-3.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span>The Codigix Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] leading-[1.15] tracking-tight mb-3.5">
          Trusted Partners in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Pune & Beyond</span>
        </h2>
        <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
          Powering organic discoverability and patient appointments for healthcare institutions across key medical hubs.
        </p>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Interactive Map Area - Exact 2:1 Aspect Ratio to match World Map SVG */}
        <div className="relative w-full aspect-[2/1]">

          {/* Map Vector Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
            <AbstractMap />
          </div>

          {/* Connection Lines Canvas */}
          {mounted && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {clientLogos.map((logo, idx) => {
                const pos = nodePositions[idx];
                const isActive = activeIndex === idx;
                const isFaded = activeIndex !== null && !isActive;

                // Center is Pune (50% X, 50% Y) in this local view
                return (
                  <path
                    key={"line-" + logo.id}
                    d={`M 50 50 Q 50 ${pos.y} ${pos.x} ${pos.y}`}
                    fill="none"
                    className="connection-line transition-all duration-500"
                    strokeDasharray="6, 6"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      stroke: isActive ? '#3b82f6' : 'rgba(0,0,0,0.15)',
                      strokeWidth: isActive ? 2.5 : 1.5,
                      opacity: isFaded ? 0.05 : 1,
                      filter: isActive ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : 'none'
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* Central Codigix Node - Exactly at center (50%, 50%) */}
          <Link
            href="/"
            title="Codigix Infotech Headquarters"
            className="absolute z-20 flex flex-col items-center group cursor-pointer"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className={"w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center p-2 transition-all duration-500 relative group-hover:scale-105 " + (activeIndex !== null ? 'shadow-[0_0_50px_rgba(59,130,246,0.5)] border-2 border-blue-400' : 'shadow-lg border border-slate-200')}>
              {activeIndex === null && (
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }} />
              )}
              <div className="relative z-10 scale-[0.5] sm:scale-75">
                <Logo showText={true} />
              </div>
            </div>
            {/* Location Tag */}
            <div className="absolute top-[110%] bg-[#1a1053] group-hover:bg-blue-600 transition-colors text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
              Pune HQ
            </div>
          </Link>

          {/* Client Map Nodes */}
          {clientLogos.map((logo, idx) => {
            const pos = nodePositions[idx];
            const isActive = activeIndex === idx;
            const isFaded = activeIndex !== null && !isActive;
            const navHref = logo.website && logo.website.trim() !== '' ? logo.website : '#portfolio';
            const isExternal = /^https?:\/\//i.test(navHref);

            return (
              <div
                key={"node-" + logo.id}
                className="absolute z-10"
                style={{
                  top: pos.y + '%',
                  left: pos.x + '%',
                  transform: 'translate(-50%, -50%)',
                  opacity: isFaded ? 0.3 : 1,
                  zIndex: isActive ? 30 : 10
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link
                  href={navHref}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={"relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group " + (isActive ? "-translate-y-3" : "translate-y-0")}
                >
                  <div className={`relative rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden ${logo.isHealthcare ? 'w-auto max-w-[160px] sm:max-w-[200px] h-16 sm:h-20 px-5 py-3 border-2' : 'w-auto max-w-[120px] sm:max-w-[160px] h-12 sm:h-16 px-4 py-2 border'} ${isActive ? 'bg-white shadow-[0_15px_30px_rgba(59,130,246,0.4)] border-blue-400 scale-110 z-20' : 'bg-white/90 backdrop-blur-sm border-slate-200 shadow-md group-hover:border-blue-300'}`}>
                    {logo.logo ? (
                      <img
                        src={logo.logo}
                        alt={logo.name}
                        className="w-full h-full object-contain transition-all duration-500"
                        onError={(e) => {
                          const img = e.currentTarget;
                          // If remote uploads failed, try direct local public webp
                          if (!img.src.includes('.webp')) {
                            img.src = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
                          } else if (img.src.includes('/uploads/clients/')) {
                            const filename = img.src.split('/').pop();
                            img.src = `/clients/${filename}`;
                          } else {
                            // As final safety fallback, hide image and show stylish text
                            img.style.display = 'none';
                            const parent = img.parentElement;
                            if (parent && !parent.querySelector('.fallback-node-text')) {
                              const span = document.createElement('span');
                              span.className = 'fallback-node-text text-xs font-bold text-slate-700 whitespace-nowrap px-2';
                              span.innerText = logo.name;
                              parent.appendChild(span);
                            }
                          }
                        }}
                      />
                    ) : (
                      <span className={`transition-colors whitespace-nowrap ${logo.isHealthcare ? 'font-extrabold text-base' : 'font-bold text-sm'} ${isActive ? 'text-blue-600' : 'text-slate-600'}`}>{logo.name}</span>
                    )}
                  </div>

                  {/* Floating Map Label (Only visible when active) */}
                  <div className={"absolute top-full mt-3 bg-slate-900 text-white flex flex-col items-center px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl transition-all duration-300 border border-slate-700 " + (isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none')}>
                    <span className="font-semibold tracking-wide text-xs sm:text-sm">{logo.name}</span>
                    {logo.location && (
                      <span className="text-[10px] text-slate-400 mt-0.5 font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {logo.location}
                      </span>
                    )}
                    <span className="text-[9px] text-blue-400 font-medium mt-1 flex items-center gap-1">
                      {isExternal ? (
                        <>Visit Website <ExternalLink size={10} /></>
                      ) : (
                        <>View Case Study <ArrowDown size={10} /></>
                      )}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
