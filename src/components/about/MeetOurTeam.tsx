"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Mail,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  Zap
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  superpower: string;
  impactMetric: string;
  metricLabel: string;
  department: string;
  bio: string;
  image: string;
  accentColor: string;
  badge: string;
  certification: string;
  skills: string[];
  recentAchievement: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Akshay Patil",
    role: "Founder & Healthcare Growth Director",
    superpower: "Zero-Churn Practice Scaling",
    impactMetric: "+380%",
    metricLabel: "Avg. Patient Growth",
    department: "Growth Strategy",
    bio: "Obsessed with doctor success. Architects end-to-end patient acquisition funnels that turn clinical goals into predictable, high-value practice footfall across Pune & PCMC.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    accentColor: "#2563eb",
    badge: "10+ Yrs Healthcare Growth",
    certification: "Growth Systems Architect",
    skills: ["Practice Scaling", "Doctor Retention", "Healthcare ROI"],
    recentAchievement: "Scaled 40+ Super-Speciality Clinics to 100+ Monthly Inquiries",
    linkedin: "https://linkedin.com",
    email: "contact@codigix.com"
  },
  {
    id: "2",
    name: "Dr. Priya Deshpande",
    role: "Head of Medical Content & Compliance",
    superpower: "100% Clinically Verified Copy",
    impactMetric: "100%",
    metricLabel: "NABH & Ethical Compliance",
    department: "Clinical Accuracy",
    bio: "Translates complex surgical terminology into empathetic, patient-friendly narratives that dismantle anxiety and build unshakeable clinical trust before the first visit.",
    image: "https://images.unsplash.com/photo-1594824813537-4384b656b825?auto=format&fit=crop&q=80&w=600",
    accentColor: "#059669",
    badge: "Clinical Background",
    certification: "Medical Copy & Ethics",
    skills: ["Doctor Thought-Leadership", "Patient FAQs", "Surgical SEO"],
    recentAchievement: "Authored 500+ Medically Verified Treatment Guides for Top Doctors",
    linkedin: "https://linkedin.com",
    email: "contact@codigix.com"
  },
  {
    id: "3",
    name: "Rahul Sharma",
    role: "Lead Medical SEO & Local 3-Pack Specialist",
    superpower: "Google Maps 3-Pack Domination",
    impactMetric: "#1 Rank",
    metricLabel: "Local Clinic Search",
    department: "Organic Search",
    bio: "Puts your clinic at the top of high-intent Google searches ('best cardiologist near me') with localized schema, GMB optimization, and authoritative medical citations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    accentColor: "#7c3aed",
    badge: "Google Certified",
    certification: "Local 3-Pack Authority",
    skills: ["Google Business Profile", "High-Intent Medical SEO", "Local Citations"],
    recentAchievement: "Ranked 28 Clinics #1 on Google Maps in under 90 days",
    linkedin: "https://linkedin.com",
    email: "contact@codigix.com"
  },
  {
    id: "4",
    name: "Sneha Kulkarni",
    role: "Senior Paid Ads & Funnel Strategist",
    superpower: "Precision Patient Funnels",
    impactMetric: "4.8x",
    metricLabel: "Avg. Campaign ROAS",
    department: "Paid Performance",
    bio: "Runs laser-targeted Meta and Google Ad campaigns engineered exclusively for hospitals and specialty clinics, delivering qualified patient bookings at the lowest CPA.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    accentColor: "#e20b27",
    badge: "Meta & Google Partner",
    certification: "Healthcare Ads Master",
    skills: ["Google Search Ads", "Hyper-Local Targeting", "CPA Reduction"],
    recentAchievement: "Generated 12,000+ Verified Patient Bookings across 2024-2025",
    linkedin: "https://linkedin.com",
    email: "contact@codigix.com"
  }
];

export default function MeetOurTeam() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden border-t border-slate-100">

      {/* Background Ambience & Engineering Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#1a1053 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px'
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-rose-500/8 rounded-full blur-3xl" />
      </div>

      <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">

        {/* Section Header: Marketing Powerhouse Theme */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
          <div className="max-w-2xl">

            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, transform: "translate(0px, 10px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5"
            >
              <Zap size={13} className="text-[#e20b27] animate-pulse" />
              <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                100% In-House Healthcare Growth Squad
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, transform: "translate(0px, 15px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15]"
            >
              The Specialists Turning Clinic Expectations <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                Into Guaranteed Practice Footfall
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, transform: "translate(0px, 10px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-600 font-light text-base sm:text-lg mt-3.5 leading-relaxed"
            >
              Zero outsourcing. Zero guesswork. A synchronized in-house team of clinical writers, SEO specialists, media buyers, and UI engineers driving real doctor revenue.
            </motion.p>
          </div>

          {/* Live Squad Status Pill */}
          <motion.div
            initial={{ opacity: 0, transform: "scale(0.95)" }}
            whileInView={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3.5 sm:px-4 sm:py-3 rounded-2xl border border-slate-200/90 shadow-sm shrink-0 self-start lg:self-auto"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                HQ
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1a1053]">Pune Headquarters Squad</p>
                <p className="text-[11px] font-light text-slate-500">In-House Healthcare Growth Leads</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Grid: Exactly One Single Row of 4 Cards (lg:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {teamMembers.map((member) => {
            const isHovered = hoveredMember === member.id;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, transform: "translate(0px, 15px)" }}
                whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                className="group relative h-[420px] rounded-[26px] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-[0_4px_20px_rgba(26,16,83,0.05)] hover:shadow-[0_15px_35px_rgba(26,16,83,0.18)] hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col justify-end"
              >

                {/* Full Background Portrait Image */}
                {/* Initials behind the photo: shown if the photo fails to load (the img hides itself). */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/90"
                  style={{ background: `linear-gradient(135deg, ${member.accentColor}, #1a1053)` }}
                >
                  {member.name.replace(/^Dr\.?\s+/i, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Ambient Bottom Fade Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Top Left Department Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-semibold text-[#1a1053] shadow-xs border border-white/60">
                    {member.department}
                  </span>
                </div>

                {/* Top Right Floating Metric Pill */}
                <div className="absolute top-3 right-3 z-20">
                  <div className="px-2.5 py-1 rounded-xl bg-[#1a1053]/80 backdrop-blur-md border border-white/20 text-right shadow-sm">
                    <span className="text-xs font-bold text-white block leading-tight">{member.impactMetric}</span>
                    <span className="text-[8px] font-light text-slate-300 block tracking-tight">{member.metricLabel}</span>
                  </div>
                </div>

                {/* Glassmorphism Floating Bottom Card (Compact micro-animation) */}
                <div className="relative z-20 m-2.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 p-3.5 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 ease-out">

                  {/* Always Visible Header: Name, Role & Socials */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <BadgeCheck size={12} className="text-cyan-300 shrink-0" />
                        <span className="text-[9px] font-medium text-cyan-100 tracking-wider uppercase truncate">
                          {member.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug truncate">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-light text-slate-200 truncate">
                        {member.role}
                      </p>
                    </div>

                    {/* Quick Connect Icons */}
                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 rounded-lg bg-white/20 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                          title="LinkedIn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin size={11} />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-6 h-6 rounded-lg bg-white/20 hover:bg-[#e20b27] text-white flex items-center justify-center transition-colors"
                          title="Email"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail size={11} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Compact Hover Details (Subtle micro-expand transition) */}
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isHovered ? 'max-h-56 opacity-100 mt-2.5 pt-2 border-t border-white/20' : 'max-h-0 opacity-0'
                    }`}>

                    {/* Superpower Pill */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/20 border border-white/20 mb-2 w-full">
                      <Sparkles size={11} className="text-amber-300 shrink-0" />
                      <span className="text-[10px] font-semibold text-amber-200 truncate">
                        {member.superpower}
                      </span>
                    </div>

                    {/* Short Bio */}
                    <p className="text-slate-100 font-light text-[10.5px] leading-relaxed mb-2 line-clamp-2">
                      {member.bio}
                    </p>

                    {/* Practice Impact Pill */}
                    <div className="p-1.5 rounded-lg bg-black/25 border border-white/10 mb-2 flex items-center gap-1.5">
                      <TrendingUp size={11} className="text-emerald-400 shrink-0" />
                      <p className="text-[10px] font-light text-slate-100 leading-tight truncate">
                        {member.recentAchievement}
                      </p>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 2).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 bg-white/20 text-slate-100 rounded text-[9px] font-light border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                      <span className="px-1.5 py-0.5 bg-emerald-500/30 text-emerald-200 rounded text-[9px] font-medium border border-emerald-400/30 flex items-center gap-0.5">
                        <ShieldCheck size={10} />
                        {member.impactMetric}
                      </span>
                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


