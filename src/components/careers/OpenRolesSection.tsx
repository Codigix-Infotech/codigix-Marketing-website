"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Clock,
  MapPin,
  Users,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { JobSummary } from '@/lib/types';

interface OpenRolesSectionProps {
  jobs: JobSummary[];
}

const defaultRoles: JobSummary[] = [
  {
    id: 1,
    title: 'SEO Executive & Local Search Specialist',
    slug: 'seo-executive',
    department: 'SEO & Search',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '1–3 yrs',
    salary_range: '₹3.5L – ₹6L + Bonus',
    openings: 2,
    summary: 'Lead on-page SEO, GMB 3-pack rankings, and high-DA link building for healthcare and business clients.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Performance Marketing & Google Ads Specialist',
    slug: 'performance-marketing-specialist',
    department: 'Performance & Paid Ads',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '2–4 yrs',
    salary_range: '₹5.5L – ₹9.5L + Bonus',
    openings: 2,
    summary: 'Manage multi-lakh Google Ads & Meta campaign budgets with high-ROAS patient lead acquisition funnels.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Social Media & Short-Form Video Creator',
    slug: 'social-media-and-video-content-creator',
    department: 'Creative & Video',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'On-site',
    experience: '1–3 yrs',
    salary_range: '₹3.5L – ₹6L',
    openings: 1,
    summary: 'Script, shoot, and edit scroll-stopping reels and YouTube shorts for clinics and doctor authority branding.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Medical Content Strategist & Copywriter',
    slug: 'medical-content-strategist',
    department: 'Content & Strategy',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '1–4 yrs',
    salary_range: '₹4.5L – ₹7.5L',
    openings: 2,
    summary: 'Craft high-E-E-A-T patient condition guides and doctor scripts that rank #1 on Google and inspire appointments.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'UI/UX & Web Conversion Designer',
    slug: 'ui-ux-conversion-designer',
    department: 'Design & Tech',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'Hybrid',
    experience: '2–4 yrs',
    salary_range: '₹5L – ₹8.5L',
    openings: 1,
    summary: 'Design high-converting healthcare web portals, appointment scheduling funnels, and modern Figma design systems.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'Healthcare Client Growth & Account Manager',
    slug: 'healthcare-client-growth-manager',
    department: 'Client Strategy',
    location: 'Pune, Maharashtra',
    employment_type: 'Full-time',
    work_mode: 'On-site',
    experience: '2–5 yrs',
    salary_range: '₹6L – ₹10L + Bonus',
    openings: 1,
    summary: 'Serve as the strategic growth advisor for hospital directors and medical clinics, analyzing campaign ROI.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const roleSkills: Record<string, string[]> = {
  'SEO Executive & Local Search Specialist': ['Google Maps', 'Ahrefs', 'Technical SEO'],
  'SEO Executive': ['Ahrefs', 'GMB Maps', 'Technical SEO'],
  'Performance Marketing & Google Ads Specialist': ['Google Ads', 'Meta Ads', 'GA4 & ROAS'],
  'Social Media & Short-Form Video Creator': ['Reels & Shorts', 'Premiere Pro', 'CapCut'],
  'Social Media & Video Content Creator': ['Reels Production', 'CapCut', 'Scripting'],
  'Medical Content Strategist & Copywriter': ['High-E-E-A-T', 'Doctor Scripts', 'AEO Search'],
  'UI/UX & Web Conversion Designer': ['Figma', 'Next.js UX', 'Appointment CRO'],
  'Healthcare Client Growth & Account Manager': ['Client Strategy', 'GA4 Insights', 'Growth Roadmaps'],
};

export default function OpenRolesSection({ jobs }: OpenRolesSectionProps) {
  const mergedJobs = jobs.length >= 4 ? jobs : defaultRoles;

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = ['all', ...Array.from(new Set(mergedJobs.map((j) => j.department).filter(Boolean)))];

  const filteredJobs = mergedJobs.filter((job) => {
    const matchesDept = selectedDept === 'all' || job.department === selectedDept;
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.summary && job.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <section id="open-roles" className="py-12 lg:py-16 bg-slate-50/80 border-b border-slate-200/70 relative">
      <div className="container mx-auto px-4 ">
        {/* Compact Header & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#e20b27] animate-pulse" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1a1053] tracking-tight">
                Current Openings ({filteredJobs.length})
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Pune Studio & Hybrid Marketing Positions
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or skill…"
              className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1053]/15 focus:border-[#1a1053] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Compact Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-2 mb-6">
          {departments.map((dept) => {
            const isSelected = selectedDept === dept;
            const label = dept === 'all' ? 'All Roles' : dept;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept as string)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${isSelected
                  ? 'bg-[#1a1053] text-white border-[#1a1053] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Space-Efficient 2-Column Job Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const skills = roleSkills[job.title] || ['Growth', 'Strategy', 'Analytics'];
              return (
                <div
                  key={job.id}
                  className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top hover line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  <div>
                    {/* Top Row: Department & Work Mode / Salary */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      {job.department && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#1a1053] border border-indigo-100">
                          {job.department}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5">
                        {job.work_mode && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            {job.work_mode}
                          </span>
                        )}
                        {job.salary_range && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-[#e20b27] border border-rose-100 hidden sm:inline-block">
                            {job.salary_range}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1053] group-hover:text-[#e20b27] transition-colors leading-snug mb-2">
                      <Link href={`/careers/${job.slug}`} className="focus:outline-none">
                        {job.title}
                      </Link>
                    </h3>

                    {/* Concise Summary (2 lines max) */}
                    {job.summary && (
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3.5 line-clamp-2">
                        {job.summary}
                      </p>
                    )}

                    {/* Compact Meta Row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium mb-3.5">
                      {job.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400" />
                          {job.location.split(',')[0]}
                        </span>
                      )}
                      {job.experience && (
                        <span className="inline-flex items-center gap-1">
                          <Briefcase size={12} className="text-slate-400" />
                          {job.experience}
                        </span>
                      )}
                      {job.openings > 1 && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <Users size={12} />
                          {job.openings} Openings
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Skill Tags & Quick Apply Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-100 group-hover:bg-[#1a1053] group-hover:text-white text-[#1a1053] text-xs font-bold transition-all duration-200 shrink-0"
                    >
                      <span>Apply</span>
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center bg-white rounded-2xl p-8 border border-slate-200">
            <p className="text-slate-600 text-sm font-semibold mb-3">No positions match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedDept('all');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 rounded-full bg-[#1a1053] text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
