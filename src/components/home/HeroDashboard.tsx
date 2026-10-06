"use client";

import React, { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Users, Filter, Target, Coins, BarChart2, Search, Youtube,
  MapPin, Instagram, ArrowUpRight, TrendingUp, TrendingDown,
  Eye, Phone, Activity, CheckCircle2, Sparkles, Flag, Zap,
  ShieldCheck, Wifi, Radio, RefreshCw,
  type LucideIcon
} from 'lucide-react';
import type { HeroDashboardData } from '@/lib/types';
import { defaultDashboard } from '@/lib/defaults';

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  filter: Filter,
  target: Target,
  coins: Coins,
  chart: BarChart2,
  search: Search,
  youtube: Youtube,
  'map-pin': MapPin,
  instagram: Instagram,
  trending: TrendingUp,
  eye: Eye,
  phone: Phone,
};

const METRIC_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  blue: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200/80' },
  purple: { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200/80' },
  emerald: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200/80' },
  orange: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200/80' },
  indigo: { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200/80' },
  pink: { color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200/80' },
  red: { color: 'text-[#e20b27]', bg: 'bg-rose-50', border: 'border-rose-200/80' },
};

const FUNNEL_BARS = [
  'bg-gradient-to-r from-blue-600 to-indigo-600',
  'bg-gradient-to-r from-indigo-600 to-purple-600',
  'bg-gradient-to-r from-purple-500 to-pink-500',
  'bg-gradient-to-r from-emerald-500 to-teal-500',
  'bg-gradient-to-r from-[#e20b27] to-[#ff4d64]'
];

// Past Month Data (Delivered Results)
const lastMonthVideoContent = [
  { title: 'FUE vs FUT Hair Transplant (Video)', views: '18.4K', engagement: '9.2%' },
  { title: 'Doctor Q&A: Knee Surgery Facts', views: '14.2K', engagement: '8.6%' },
  { title: 'Patient Smile Makeover Story', views: '11.5K', engagement: '7.9%' },
  { title: 'IVF Success Journey & Diet Tips', views: '9.8K', engagement: '7.1%' },
  { title: 'Skin Glow Laser Treatment Demo', views: '8.4K', engagement: '6.4%' },
];

const lastMonthMetaAds = [
  { label: 'Ad Spend', value: 36400, isCurrency: true, trend: 16, down: false },
  { label: 'Reel Views', value: 184500, isCurrency: false, trend: 42, down: false },
  { label: 'Inquiries', value: 412, isCurrency: false, trend: 28, down: false },
  { label: 'Cost / Lead', value: 88, isCurrency: true, trend: 18, down: true },
];

const lastMonthGoogleAds = [
  { label: 'Ad Spend', value: 48320, isCurrency: true, trend: 12, down: false },
  { label: 'Patient Clicks', value: 12452, isCurrency: false, trend: 22, down: false },
  { label: 'Appointments', value: 326, isCurrency: false, trend: 18, down: false },
  { label: 'Cost / Inquiry', value: 148, isCurrency: true, trend: 14, down: true },
];

// Next Month Milestones Data (Target Forecast & Expected Results)
const milestoneVideoContent = [
  { title: 'Robotic Knee Surgery Myths (Planned)', views: '32.4K target', engagement: '11.2%' },
  { title: 'Full Mouth Dental Implants (Planned)', views: '26.8K target', engagement: '10.5%' },
  { title: 'Hair Transplant Live Transformation', views: '24.1K target', engagement: '9.8%' },
  { title: 'Doctor Panel: IVF Success in 2026', views: '19.5K target', engagement: '8.9%' },
  { title: 'Dermatologist Anti-Aging Protocol', views: '16.2K target', engagement: '8.2%' },
];

const milestoneArticles = [
  { title: 'Painless Laser Piles Treatment Guide', views: '14.5K target', engagement: '8.4%' },
  { title: 'Clear Aligners vs Metal Braces Cost', views: '12.8K target', engagement: '7.9%' },
  { title: 'PRP Hair Regrowth Protocol (Doctor QA)', views: '11.2K target', engagement: '7.1%' },
  { title: 'Top Gynecologist Tips for First Trimester', views: '9.8K target', engagement: '6.8%' },
  { title: 'Knee Arthroscopy Full Recovery Timeline', views: '8.9K target', engagement: '6.5%' },
];

const milestoneMetaAds = [
  { label: 'Target Spend', value: 52000, isCurrency: true, trend: 22, down: false },
  { label: 'Target Views', value: 310000, isCurrency: false, trend: 58, down: false },
  { label: 'Target Inquiries', value: 680, isCurrency: false, trend: 45, down: false },
  { label: 'Target CPL', value: 68, isCurrency: true, trend: 24, down: true },
];

const milestoneGoogleAds = [
  { label: 'Target Budget', value: 65000, isCurrency: true, trend: 18, down: false },
  { label: 'Expected Clicks', value: 19200, isCurrency: false, trend: 42, down: false },
  { label: 'Target Bookings', value: 520, isCurrency: false, trend: 38, down: false },
  { label: 'Target CPA', value: 115, isCurrency: true, trend: 22, down: true },
];

function useLiveCount(baseValue: number, decimals = 0, isCurrency = false, suffix = '', enabled = true) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayValue(0);
      return;
    }

    let animationFrame: number;
    const duration = 1200;
    const startTime = performance.now();
    const startVal = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (baseValue - startVal) * easeOut;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(baseValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [baseValue, enabled]);

  let formatted = displayValue.toFixed(decimals);
  if (isCurrency) {
    formatted = '₹ ' + formatted;
  } else {
    if (displayValue >= 1000) {
      formatted = Math.round(displayValue).toLocaleString('en-IN');
    }
  }

  return formatted + suffix;
}

function AnimatedCounter({ value, decimals = 0, isCurrency = false, suffix = '', enabled = true }: { value: number; decimals?: number; isCurrency?: boolean; suffix?: string; enabled?: boolean }) {
  const animatedValue = useLiveCount(value, decimals, isCurrency, suffix, enabled);
  return <span>{animatedValue}</span>;
}

// Framer motion variants for smooth cascade animation
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function MetricCard({
  title,
  value,
  decimals = 0,
  isCurrency = false,
  suffix = '',
  trend,
  iconKey,
  colorKey,
  isMilestone = false,
  isLoaded = true
}: any) {
  const Icon = ICONS[iconKey || ''] || BarChart2;
  const c = METRIC_COLORS[colorKey || 'blue'] || METRIC_COLORS.blue;

  return (
    <div className={`bg-white/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl border ${c.border} shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all duration-200 group h-full`}>
      <div className="flex items-center justify-between gap-1">
        <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${c.color} ${c.bg} shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon size={11} />
        </div>
        <span className={`text-[6px] sm:text-[6.5px] font-bold px-1 py-0.5 rounded border flex items-center gap-0.5 ${isMilestone
          ? 'text-purple-700 bg-purple-50 border-purple-200'
          : 'text-emerald-600 bg-emerald-50 border-emerald-100'
          }`}>
          {isMilestone ? (
            <>
              <Target size={7} />
              <span>+{trend}% Target</span>
            </>
          ) : (
            <>
              <TrendingUp size={7} />
              <span>+{trend}%</span>
            </>
          )}
        </span>
      </div>
      <div className="mt-1">
        <div className="text-[9.5px] sm:text-[12px] font-extrabold text-[#1a1053] tracking-tight">
          <AnimatedCounter value={value} decimals={decimals} isCurrency={isCurrency} suffix={suffix} enabled={isLoaded} />
        </div>
        <div className="text-[6px] sm:text-[7px] font-semibold text-slate-500 truncate leading-tight mt-0.5">
          {title}
        </div>
      </div>
    </div>
  );
}

function ChannelCard({
  name,
  value,
  sub,
  trend,
  stat1,
  progress,
  iconKey,
  colorKey,
  isMilestone = false,
  isLoaded = true,
}: any) {
  const Icon = ICONS[iconKey || ''] || BarChart2;
  const c = METRIC_COLORS[colorKey || 'blue'] || METRIC_COLORS.blue;

  return (
    <div className="bg-white/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-200 group h-full">
      <div className="flex justify-between items-center mb-0.5">
        <div className="flex items-center gap-1 text-[6.5px] sm:text-[7.5px] font-bold text-slate-800 truncate">
          <div className={`${c.color} group-hover:scale-110 transition-transform shrink-0`}>
            <Icon size={9} />
          </div>
          <span className="truncate">{name}</span>
        </div>
        <ArrowUpRight size={8} className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
      </div>

      <div className="my-0.5">
        <div className="text-[9px] sm:text-[11px] font-extrabold text-[#1a1053] tracking-tight">
          {value}
        </div>
        <div className="text-[5.5px] sm:text-[6.5px] text-slate-400 font-medium truncate">
          {sub}
        </div>
      </div>

      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${isMilestone ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-blue-600'
            }`}
          style={{ width: isLoaded ? `${progress}%` : '0%' }}
        />
      </div>

      <div className="flex items-center justify-between text-[5.5px] sm:text-[6.5px] text-slate-500 mt-1 pt-1 border-t border-slate-100">
        <span className="truncate">{stat1}</span>
        <span className={`font-bold shrink-0 flex items-center gap-0.5 ${isMilestone ? 'text-purple-600' : 'text-emerald-600'}`}>
          {isMilestone ? <Target size={6} /> : <TrendingUp size={6} />}
          <span>+{trend}%</span>
        </span>
      </div>
    </div>
  );
}

function AdMetricCard({ ad }: { ad: any }) {
  const isOverK = ad.value > 999;
  const formattedVal = ad.isCurrency
    ? (isOverK ? '₹' + (ad.value / 1000).toFixed(0) + 'k' : '₹' + ad.value)
    : (isOverK ? (ad.value / 1000).toFixed(0) + 'k' : String(ad.value));

  return (
    <div className="bg-slate-50/90 p-1.5 rounded-lg border border-slate-200/80 flex flex-col justify-between">
      <span className="text-[6px] text-slate-400 font-medium truncate">{ad.label}</span>
      <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-900 tracking-tight mt-0.5">
        {formattedVal}
      </span>
      <span className={`text-[6px] font-bold flex items-center gap-0.5 ${ad.down ? 'text-rose-600' : 'text-emerald-600'}`}>
        {ad.down ? <TrendingDown size={6} /> : <TrendingUp size={6} />}
        <span>{ad.trend}%</span>
      </span>
    </div>
  );
}

// Stagger sequence containers with responsive cascading entrance
const parentStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const channelsStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const chartsStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
};

function HeroDashboard({ data }: { data?: HeroDashboardData }) {
  // Mode toggle: 'last-month' (Delivered Results) vs 'next-month' (Target Milestones & Expected Results)
  const [dashboardMode, setDashboardMode] = useState<'last-month' | 'next-month'>('last-month');
  const [activeTrafficView, setActiveTrafficView] = useState('sessions');
  const [activeContentTab, setActiveContentTab] = useState('blogs');
  const [activeAdTab, setActiveAdTab] = useState('google');
  // The live-patient ticker re-renders the dashboard; only run it while it's on screen.
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(rootRef);
  const [livePatients, setLivePatients] = useState(48);
  const [pulsePatient, setPulsePatient] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initProgress, setInitProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setInitProgress(pct);

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setInitProgress(100);
        setTimeout(() => {
          setIsInitializing(false);
          setIsLoaded(true);
        }, 180);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleResync = () => {
    setIsLoaded(false);
    setIsInitializing(true);
    setInitProgress(0);
    let startTime: number;
    let animationFrame: number;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setInitProgress(pct);

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setInitProgress(100);
        setTimeout(() => {
          setIsInitializing(false);
          setIsLoaded(true);
        }, 140);
      }
    };
    animationFrame = requestAnimationFrame(step);
  };

  const handleModeChange = (mode: 'last-month' | 'next-month') => {
    if (mode === dashboardMode) return;
    setIsLoaded(false);
    setDashboardMode(mode);
    setTimeout(() => setIsLoaded(true), 40);
  };

  const isLegacy = data?.keywords?.some((k) => /erp|crm|manufacturing/i.test(k.keyword)) ||
    data?.content?.some((c) => /erp|manufacturing/i.test(c.title));

  // Base Data for Last Month's Delivered Performance
  const safeData: HeroDashboardData = {
    metrics: (!isLegacy && data?.metrics?.length) ? data.metrics : defaultDashboard.metrics,
    channels: (!isLegacy && data?.channels?.length) ? data.channels : defaultDashboard.channels,
    traffic_total: data?.traffic_total || defaultDashboard.traffic_total,
    traffic_axis: data?.traffic_axis?.length ? data.traffic_axis : defaultDashboard.traffic_axis,
    traffic_sources: data?.traffic_sources?.length ? data.traffic_sources : defaultDashboard.traffic_sources,
    keywords: (!isLegacy && data?.keywords?.length) ? data.keywords : defaultDashboard.keywords,
    content: (!isLegacy && data?.content?.length) ? data.content : defaultDashboard.content,
    ads: (!isLegacy && data?.ads?.length) ? data.ads : defaultDashboard.ads,
    funnel: (!isLegacy && data?.funnel?.length) ? data.funnel : defaultDashboard.funnel,
  };

  // Next Month Targeted Milestones & Expected Results
  const milestoneData = {
    metrics: [
      { title: 'Target Visitors (Milestone)', value: 38500, trend: 57, icon: 'users', color: 'blue' },
      { title: 'Expected Inquiries', value: 1950, trend: 56, icon: 'filter', color: 'purple' },
      { title: 'Target Treatments', value: 340, trend: 58, icon: 'target', color: 'emerald' },
      { title: 'Expected Revenue', value: 42.5, decimals: 1, suffix: 'L', isCurrency: true, trend: 50, icon: 'coins', color: 'orange' },
      { title: 'Projected ROI', value: 4.8, decimals: 1, suffix: 'x', trend: 26, icon: 'chart', color: 'indigo' },
    ],
    channels: [
      { name: 'Google Ads', value: '18,500', sub: 'Target Clicks (+48%)', trend: 48, stat1: '2.5M Target Impr • ₹260 CPC', progress: 88, icon: 'search', color: 'blue' },
      { name: 'Meta Ads', value: '26,400', sub: 'Viral Video Expansion', trend: 44, stat1: '3.6M Target Reach • ₹68 CPL', progress: 92, icon: 'users', color: 'blue' },
      { name: 'SEO Organic', value: '21.0K', sub: 'Organic Target (+69%)', trend: 69, stat1: '500+ Keywords • 15+ #1 Ranks', progress: 95, icon: 'search', color: 'emerald' },
      { name: 'Google Maps (GMB)', value: '7,200', sub: 'Target Local Reach', trend: 49, stat1: '1,850 Expected Direct Calls', progress: 90, icon: 'map-pin', color: 'blue' },
      { name: 'AEO (Answer Engine)', value: '5.5K', sub: 'AI Search Target', trend: 96, stat1: '1,400 AI Citations Planned', progress: 85, icon: 'target', color: 'indigo' },
      { name: 'Social Media', value: '350K', sub: 'Viral Video Target', trend: 66, stat1: '45K Target Engagements', progress: 94, icon: 'instagram', color: 'pink' },
    ],
    traffic_total: '38,500',
    traffic_axis: ['Week 1 (Launch)', 'Week 2 (Scale)', 'Week 3 (Peak)', 'Week 4 (Goal)'],
    traffic_sources: [
      { label: 'Organic Search', pct: 46 },
      { label: 'Paid Ads', pct: 26 },
      { label: 'GMB Maps', pct: 18 },
      { label: 'Social Media', pct: 10 },
    ],
    keywords: [
      { keyword: 'hair transplant pune', position: 1, change: 0, volume: '6.4K', goal: 'Lock #1 0-Box' },
      { keyword: 'best dermatologist pcmc', position: 1, change: 0, volume: '4.8K', goal: 'Map Pack #1' },
      { keyword: 'ivf center near me', position: 1, change: 1, volume: '5.2K', goal: 'Milestone #1' },
      { keyword: 'knee replacement cost', position: 1, change: 2, volume: '2.9K', goal: 'Milestone #1' },
    ],
    funnel: [
      { label: 'Target Clinic Visitors', value: '38,500', pct: '100%', width: 100 },
      { label: 'Expected Patient Inquiries', value: '1,950', pct: '5.1%', width: 34 },
      { label: 'Target Qualified Leads', value: '1,420', pct: '3.7%', width: 26 },
      { label: 'Expected Consultations', value: '680', pct: '1.8%', width: 15 },
      { label: 'Target Treatments Started', value: '340', pct: '0.9%', width: 8 },
    ]
  };

  const isMilestone = dashboardMode === 'next-month';

  useEffect(() => {
    if (!onScreen) return;
    const interval = setInterval(() => {
      setLivePatients((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next < 42 ? 45 : next > 56 ? 51 : next;
      });
      setPulsePatient(true);
      setTimeout(() => setPulsePatient(false), 700);
    }, 3500);
    return () => clearInterval(interval);
  }, [onScreen]);

  const displayedContent = isMilestone
    ? (activeContentTab === 'blogs' ? milestoneArticles.slice(0, 5) : milestoneVideoContent)
    : (activeContentTab === 'blogs' ? safeData.content.slice(0, 5) : lastMonthVideoContent);

  const displayedAds = isMilestone
    ? (activeAdTab === 'google' ? milestoneGoogleAds : milestoneMetaAds)
    : (activeAdTab === 'google' ? lastMonthGoogleAds : lastMonthMetaAds);

  // SVG Area Paths for Last Month vs Next Month Milestones
  const trafficPathArea = isMilestone
    ? (activeTrafficView === 'sessions'
      ? "M0,85 C20,75 40,55 60,32 C75,18 85,12 100,6 L100,100 L0,100 Z"
      : activeTrafficView === 'inquiries'
        ? "M0,88 C25,78 45,50 65,30 C80,15 90,10 100,5 L100,100 L0,100 Z"
        : "M0,92 C25,80 50,55 70,25 C82,14 92,8 100,4 L100,100 L0,100 Z")
    : (activeTrafficView === 'sessions'
      ? "M0,80 C20,70 30,85 50,45 C70,25 80,40 100,18 L100,100 L0,100 Z"
      : activeTrafficView === 'inquiries'
        ? "M0,85 C25,80 35,60 55,40 C75,20 85,30 100,12 L100,100 L0,100 Z"
        : "M0,90 C20,85 40,70 60,35 C80,18 90,25 100,10 L100,100 L0,100 Z");

  const trafficPathLine = isMilestone
    ? (activeTrafficView === 'sessions'
      ? "M0,85 C20,75 40,55 60,32 C75,18 85,12 100,6"
      : activeTrafficView === 'inquiries'
        ? "M0,88 C25,78 45,50 65,30 C80,15 90,10 100,5"
        : "M0,92 C25,80 50,55 70,25 C82,14 92,8 100,4")
    : (activeTrafficView === 'sessions'
      ? "M0,80 C20,70 30,85 50,45 C70,25 80,40 100,18"
      : activeTrafficView === 'inquiries'
        ? "M0,85 C25,80 35,60 55,40 C75,20 85,30 100,12"
        : "M0,90 C20,85 40,70 60,35 C80,18 90,25 100,10");

  const peakY = isMilestone ? 6 : (activeTrafficView === 'sessions' ? 18 : 12);
  const yAxisMax = isMilestone
    ? (activeTrafficView === 'sessions' ? '45K' : activeTrafficView === 'inquiries' ? '2.5K' : '1.8K')
    : (activeTrafficView === 'sessions' ? '30K' : activeTrafficView === 'inquiries' ? '1.5K' : '1.2K');
  const yAxisMid = isMilestone
    ? (activeTrafficView === 'sessions' ? '22K' : activeTrafficView === 'inquiries' ? '1.2K' : '900')
    : (activeTrafficView === 'sessions' ? '15K' : activeTrafficView === 'inquiries' ? '800' : '600');

  const activeMetrics = isMilestone ? milestoneData.metrics : safeData.metrics.slice(0, 5);
  const activeChannels = isMilestone ? milestoneData.channels : safeData.channels.slice(0, 6);
  const activeTrafficAxis = isMilestone ? milestoneData.traffic_axis : safeData.traffic_axis;
  const activeFunnel = isMilestone ? milestoneData.funnel : safeData.funnel.slice(0, 4);

  return (
    <div ref={rootRef} className="w-full bg-[#f8fafc] text-slate-800 rounded-[1.6rem] overflow-hidden flex flex-col relative z-10 font-sans shadow-xl border border-slate-200/90 select-none">

      {/* 0. Live Telemetry Initialization Sequence (Clean Premium Light Aesthetic) */}
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            key="dashboard-intro-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-30 flex flex-col justify-between p-3.5 sm:p-5 bg-gradient-to-br from-white via-[#f8fafe] to-[#edf3fc] text-slate-800 overflow-hidden rounded-[1.6rem] select-none border border-slate-200/80 shadow-2xl"
          >
            {/* Subtle Clean Background Grid & Soft Ambient Light */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#e20b27]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Scanning Beam */}
            <motion.div
              animate={{ transform: ["translate(0px, -100%)", "translate(0px, 350%)"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none"
            />

            {/* Intro Header */}
            <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-500 border-b border-slate-200/90 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/90 shadow-sm" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/90 shadow-sm" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-sm" />
                </div>
                <div className="h-3 w-[1px] bg-slate-300 mx-1 hidden sm:block" />
                <span className="font-mono text-[#1a1053] font-bold tracking-wider text-[7.5px] sm:text-[8.5px] uppercase flex items-center gap-1.5">
                  <Activity size={10} className="text-emerald-600 animate-pulse" />
                  <span>Codigix Infotech Live Dashboard</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-[7px] sm:text-[7.5px] font-mono font-semibold shadow-2xs">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
                  </span>
                  <span>CONNECTING LIVE</span>
                </div>
                <span className="font-mono text-slate-400 text-[7px] hidden md:inline">24 STREAMS</span>
              </div>
            </div>

            {/* Intro Centerpiece: Glowing Telemetry Radar & Headings */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-3 text-center">
              {/* Animated Radar & Pulse Ring */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 flex items-center justify-center">
                {/* Outer rotating dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/60 animate-[spin_8s_linear_infinite]" />

                {/* Middle pulsing glow ring */}
                <div className="absolute inset-2 rounded-full border border-blue-200/80 bg-white/90 backdrop-blur-sm shadow-[0_8px_25px_rgba(59,130,246,0.12)]" />

                {/* Rotating Radar Sweep Beam */}
                <motion.div
                  animate={{ transform: ["rotate(0deg)", "rotate(360deg)"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59,130,246,0.25) 60deg, transparent 75deg)'
                  }}
                />

                {/* Central Pulsing Icon / Emblem */}
                <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#1a1053] to-[#2b1f6f] flex items-center justify-center text-white shadow-[0_6px_18px_rgba(26,16,83,0.25)] ring-4 ring-blue-100">
                  <Activity size={18} className="text-[#ff4d64] animate-pulse" />
                </div>

                {/* Pinging Halo Rings */}
                <span className="absolute w-full h-full rounded-full border border-blue-400/30 animate-ping opacity-30 pointer-events-none" />
              </div>

              {/* Best Headings */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 text-blue-700 text-[8px] sm:text-[8.5px] font-mono font-semibold tracking-wider uppercase mb-1.5 shadow-2xs">
                <Zap size={9} className="text-amber-500" />
                <span>Real-Time Practice Telemetry</span>
              </div>

              <h2 className="text-base sm:text-xl md:text-2xl font-black text-[#1a1053] tracking-tight leading-tight">
                Codigix Infotech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Live Dashboard</span>
              </h2>

              {/* Dynamic Telemetry Status Step */}
              <div className="h-6 flex items-center justify-center mt-1">
                <p className="text-[10px] sm:text-[11.5px] font-medium text-slate-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>
                    {initProgress < 30 && "Initializing Secure Practice Telemetry Infrastructure..."}
                    {initProgress >= 30 && initProgress < 65 && "Synchronizing Google Ads, Meta Ads & 15+ #1 SEO Ranks..."}
                    {initProgress >= 65 && initProgress < 90 && "Validating NABH Compliance & Real-Time Patient Inquiries..."}
                    {initProgress >= 90 && "Live Telemetry Calibrated • Loading Practice Analytics..."}
                  </span>
                </p>
              </div>

              {/* High-Tech Progress Bar */}
              <div className="w-full max-w-[280px] sm:max-w-[340px] mt-3">
                <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] text-slate-500 font-mono mb-1 font-semibold">
                  <span className="text-slate-500">SYNCHRONIZING ANALYTICS ENGINE</span>
                  <span className="font-extrabold text-blue-600 font-mono">{Math.round(initProgress)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-[2px] border border-slate-200/90 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                    style={{ width: `${initProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Intro Footer Micro-telemetry Status */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/90 text-[7px] sm:text-[7.5px] font-mono text-slate-600">
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-slate-400">LATENCY:</span> <span className="font-semibold text-slate-700">12ms</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-slate-400">CHANNELS:</span> <span className="font-semibold text-slate-700">6 Live Feeds</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="text-slate-400">SECURITY:</span> <span className="font-semibold text-slate-700">NABH Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-slate-400">GEO:</span> <span className="font-semibold text-slate-700">Pune & PCMC</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Application Bar - Live and Immediate */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#0c1222] text-white border-b border-slate-800 text-[9.5px] sm:text-[10px] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/90 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-amber-400/90 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-sm" />
          </div>
          <div className="h-3 w-[1px] bg-slate-700 mx-1 hidden sm:block" />
          <span className="font-bold text-slate-100 hidden sm:flex items-center gap-1.5 tracking-tight">
            <Activity size={11} className="text-emerald-400 animate-pulse" />
            <span>Codigix Infotech Live Dashboard</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Telemetry Status Pill */}
          <button
            type="button"
            onClick={handleResync}
            title="Click to re-sync live telemetry"
            className="flex items-center gap-1 bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-full text-[8px] font-semibold tracking-wide cursor-pointer transition-colors"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>LIVE</span>
          </button>

          {/* Active Patients Badge */}
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[8px] font-medium hidden md:flex transition-colors duration-300 ${pulsePatient ? 'bg-blue-950/80 border-blue-500/50 text-blue-200' : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
            <Users size={8.5} className="text-blue-400" />
            <span className="font-semibold text-white transition-transform duration-200 inline-block">{livePatients}</span>
            <span>Active</span>
          </div>

          {/* View Mode Selector: Last Month Results vs Next Month Milestones */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700/80 text-[7.5px] sm:text-[8px]">
            <button
              type="button"
              onClick={() => handleModeChange('last-month')}
              className={`px-1.5 py-0.5 rounded-lg cursor-pointer transition-all flex items-center gap-1 font-bold ${dashboardMode === 'last-month'
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <CheckCircle2 size={9} className={dashboardMode === 'last-month' ? 'text-white' : 'text-slate-500'} />
              <span>Delivered</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('next-month')}
              className={`px-1.5 py-0.5 rounded-lg cursor-pointer transition-all flex items-center gap-1 font-bold ${dashboardMode === 'next-month'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm ring-1 ring-purple-400/40'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <Sparkles size={9} className={dashboardMode === 'next-month' ? 'text-amber-300' : 'text-slate-500'} />
              <span>Milestones</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Header Context Notification Banner - Short & Clean */}
      <div className={`px-2.5 py-0.5 flex items-center justify-between text-[7px] sm:text-[7.5px] transition-colors ${isMilestone
        ? 'bg-purple-900/10 text-purple-950 border-b border-purple-200/80'
        : 'bg-blue-50/90 text-blue-950 border-b border-blue-100'
        }`}>
        <div className="flex items-center gap-1.5 truncate">
          {isMilestone ? (
            <>
              <Sparkles size={10} className="text-purple-600 shrink-0" />
              <span className="font-bold text-purple-900">TARGET:</span>
              <span className="text-purple-800 truncate">+57% Velocity • 15+ #1 Rankings • ₹42.5L Goal</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
              <span className="font-bold text-blue-900">DELIVERED:</span>
              <span className="text-slate-600 truncate">214 Treatments Started • ₹28.4L Revenue • 100% Verified</span>
            </>
          )}
        </div>
        <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[6.5px] shrink-0 flex items-center gap-1 ${isMilestone
          ? 'bg-purple-600 text-white shadow-sm'
          : 'bg-emerald-600 text-white shadow-sm'
          }`}>
          {isMilestone ? (
            <>
              <Target size={7} />
              <span>Target</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={7} />
              <span>Verified</span>
            </>
          )}
        </span>
      </div>

      {/* Main Content Area - Cards Appear One by One with Staggered Cascading Animation */}
      <div className="p-2 sm:p-2.5 space-y-2">

        {/* 1. Top 5 Headline Metrics: One-by-One Stagger */}
        <motion.div
          key={`metrics-${dashboardMode}`}
          variants={parentStagger}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-5 gap-1.5 sm:gap-2"
        >
          {activeMetrics.map((m, i) => (
            <motion.div key={i} variants={cardVariants}>
              <MetricCard
                title={m.title}
                value={Number(m.value) || 0}
                decimals={m.decimals || 0}
                suffix={m.suffix || ''}
                isCurrency={m.isCurrency || false}
                trend={m.trend || 0}
                iconKey={m.icon}
                colorKey={m.color}
                isMilestone={isMilestone}
                isLoaded={isLoaded}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 2. 6 Channels: One-by-One Stagger */}
        <motion.div
          key={`channels-${dashboardMode}`}
          variants={channelsStagger}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-6 gap-1.5 sm:gap-2"
        >
          {activeChannels.map((ch, i) => (
            <motion.div key={i} variants={cardVariants}>
              <ChannelCard
                name={ch.name}
                value={ch.value}
                sub={ch.sub}
                trend={ch.trend}
                stat1={ch.stat1}
                progress={Number(ch.progress) || 0}
                iconKey={ch.icon}
                colorKey={ch.color}
                isMilestone={isMilestone}
                isLoaded={isLoaded}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 3. Charts Row 1: Area Chart, Traffic Sources & Keyword Ranks (Cascading entry) */}
        <motion.div
          key={`charts1-${dashboardMode}`}
          variants={chartsStagger}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-12 gap-1.5 sm:gap-2"
        >

          {/* Traffic Growth & Trajectory Area Chart */}
          <motion.div variants={cardVariants} className="col-span-5 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isMilestone ? 'bg-purple-600 animate-pulse' : 'bg-blue-600'}`} />
                <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                  {isMilestone ? 'Target Growth Trajectory' : 'Patient Traffic Velocity'}
                </h3>
              </div>
              <div className="flex gap-0.5 bg-slate-50 p-0.5 rounded border border-slate-200 text-[6.5px] sm:text-[7.5px]">
                {['sessions', 'inquiries', 'consults'].map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveTrafficView(view)}
                    className={`px-1.5 py-0.5 rounded capitalize font-medium transition-colors cursor-pointer ${activeTrafficView === view ? 'bg-blue-600 text-white font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[6.5px] sm:text-[7.5px] text-slate-500 mb-1">
              {isMilestone ? (
                <>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-600" />Target Organic (55%)</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" />Target Paid (28%)</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Target Maps (17%)</div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" />Organic SEO (52%)</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-600" />Paid Ads (26%)</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />GMB Maps (22%)</div>
                </>
              )}
            </div>

            <div className="h-20 sm:h-24 relative border-l border-b border-slate-200 mt-1 flex items-end">
              <div className="absolute inset-y-0 -left-3.5 flex flex-col justify-between text-[6px] text-slate-400 py-0.5">
                <span>{yAxisMax}</span>
                <span>{yAxisMid}</span>
                <span>0</span>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1 z-0">
                <div className="w-full h-[1px] bg-slate-100" />
                <div className="w-full h-[1px] bg-slate-100" />
                <div className="w-full h-[1px] bg-slate-100" />
                <div className="w-full h-[1px] bg-slate-100" />
              </div>

              <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="live-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isMilestone ? "#9333ea" : "#2563eb"} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={isMilestone ? "#6366f1" : "#2563eb"} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={trafficPathArea}
                  fill="url(#live-chart-grad)"
                  className="transition-opacity duration-1000 ease-out"
                  style={{ opacity: isLoaded ? 1 : 0 }}
                />
                <motion.path
                  key={`${dashboardMode}-${activeTrafficView}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: isLoaded ? 1 : 0, opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  d={trafficPathLine}
                  fill="none"
                  stroke={isMilestone ? "#9333ea" : "#2563eb"}
                  strokeWidth="2"
                  strokeDasharray={isMilestone ? "3 1.5" : "none"}
                />
                {isMilestone && (
                  <>
                    <circle cx="33" cy="50" r="2.5" fill="#9333ea" className="transition-opacity duration-700" style={{ opacity: isLoaded ? 1 : 0 }} />
                    <circle cx="66" cy="25" r="2.5" fill="#9333ea" className="transition-opacity duration-700" style={{ opacity: isLoaded ? 1 : 0 }} />
                  </>
                )}
                <circle cx="100" cy={peakY} r="3" fill={isMilestone ? "#9333ea" : "#2563eb"} />
                <circle
                  cx="100"
                  cy={peakY}
                  r="7"
                  fill={isMilestone ? "#9333ea" : "#2563eb"}
                  className="svg-pulse"
                />
              </svg>

              <div className="absolute -bottom-3.5 w-full flex justify-between text-[6px] text-slate-400">
                {activeTrafficAxis.map((label, i) => (
                  <span key={i}>{label}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Traffic Sources Breakdown */}
          <motion.div variants={cardVariants} className="col-span-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isMilestone ? 'bg-purple-600' : 'bg-purple-600'}`} />
              <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                {isMilestone ? 'Target Channel Mix' : 'Traffic Sources'}
              </h3>
            </div>

            <div className="flex items-center justify-between gap-1 my-auto">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 mx-auto">
                <div
                  className="w-full h-full rounded-full border-[5px] sm:border-[6px] border-blue-600 shadow-sm transition-all duration-1000 ease-out"
                  style={{
                    borderRightColor: '#9333ea',
                    borderBottomColor: '#10b981',
                    borderLeftColor: '#f59e0b',
                    transform: isLoaded ? 'rotate(0deg) scale(1)' : 'rotate(-120deg) scale(0.75)',
                    opacity: isLoaded ? 1 : 0
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] sm:text-[9.5px] font-extrabold text-[#1a1053] leading-none">
                    {isMilestone ? '38.5K' : '24.5K'}
                  </span>
                  <span className="text-[5px] text-slate-400 font-medium">
                    {isMilestone ? 'Target Patients' : 'Patients'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full pl-1 text-[6.5px] sm:text-[7.5px] font-medium text-slate-600">
                <div className="flex justify-between items-center hover:text-blue-600 transition-colors">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Organic</span>
                  <span className="font-bold text-slate-800">{isMilestone ? '46%' : '42%'}</span>
                </div>
                <div className="flex justify-between items-center hover:text-purple-600 transition-colors">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Paid Ads</span>
                  <span className="font-bold text-slate-800">{isMilestone ? '26%' : '24%'}</span>
                </div>
                <div className="flex justify-between items-center hover:text-emerald-600 transition-colors">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> GMB Maps</span>
                  <span className="font-bold text-slate-800">{isMilestone ? '18%' : '22%'}</span>
                </div>
                <div className="flex justify-between items-center hover:text-pink-600 transition-colors">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Social</span>
                  <span className="font-bold text-slate-800">{isMilestone ? '10%' : '12%'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keyword Rankings */}
          <motion.div variants={cardVariants} className="col-span-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isMilestone ? 'bg-purple-600' : 'bg-emerald-500'}`} />
                <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                  {isMilestone ? 'Keyword Target Milestones' : 'Live Keyword Ranks'}
                </h3>
              </div>
              <span className={`text-[7px] px-1 py-0.5 rounded font-bold border flex items-center gap-0.5 ${isMilestone
                ? 'text-purple-700 bg-purple-50 border-purple-200'
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}>
                {isMilestone ? <Target size={7} /> : null}
                <span>{isMilestone ? '15+ #1 Goal' : 'Top 3 Google'}</span>
              </span>
            </div>

            <table className="w-full text-[6.5px] sm:text-[7.5px]">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 text-left font-semibold">
                  <th className="pb-1">Keyword</th>
                  <th className="pb-1 text-center">{isMilestone ? 'Target' : 'Rank'}</th>
                  <th className="pb-1 text-center">Status</th>
                  <th className="pb-1 text-right">Vol</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 font-medium">
                {(isMilestone ? milestoneData.keywords : safeData.keywords.slice(0, 4)).map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-1 text-slate-900 font-semibold truncate max-w-[85px] sm:max-w-[100px]">
                      {row.keyword}
                    </td>
                    <td className="py-1 text-center">
                      <span className={`font-bold px-1 rounded border ${isMilestone
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                        #{row.position}
                      </span>
                    </td>
                    <td className="py-1 text-center font-bold text-emerald-600">
                      {isMilestone ? (
                        <span className="text-purple-600 text-[6px] font-semibold flex items-center justify-center gap-0.5">
                          <Target size={6} />
                          <span>Target #1</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-0.5">
                          <TrendingUp size={6} />
                          <span>{row.change}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-1 text-right text-slate-500 font-mono">
                      {row.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

        </motion.div>

        {/* 4. Charts Row 2: Content Performance, Paid Ads & Patient Funnel (Cascading entry) */}
        <motion.div
          key={`charts2-${dashboardMode}`}
          variants={chartsStagger}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-12 gap-1.5 sm:gap-2"
        >

          {/* Content Performance */}
          <motion.div variants={cardVariants} className="col-span-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                {isMilestone ? 'Upcoming Content Roadmap' : 'Content Performance'}
              </h3>
              <div className="flex gap-0.5 bg-slate-50 p-0.5 rounded border border-slate-200 text-[6.5px] sm:text-[7.5px]">
                <button
                  type="button"
                  onClick={() => setActiveContentTab('blogs')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer font-medium transition-colors ${activeContentTab === 'blogs' ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'
                    }`}
                >
                  Articles
                </button>
                <button
                  type="button"
                  onClick={() => setActiveContentTab('videos')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer font-medium transition-colors ${activeContentTab === 'videos' ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'
                    }`}
                >
                  Videos
                </button>
              </div>
            </div>

            <table className="w-full text-[6.5px] sm:text-[7.5px]">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 text-left">
                  <th className="pb-1">Title</th>
                  <th className="pb-1 text-right">{isMilestone ? 'Target Views' : 'Views'}</th>
                  <th className="pb-1 text-right">{isMilestone ? 'Goal' : 'Engagement'}</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 font-medium">
                {displayedContent.slice(0, 3).map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-1 text-slate-800 font-semibold truncate max-w-[85px] sm:max-w-[105px]">
                      {item.title}
                    </td>
                    <td className="py-1 text-right font-mono text-slate-600">{item.views}</td>
                    <td className={`py-1 text-right font-bold ${isMilestone ? 'text-purple-600' : 'text-emerald-600'}`}>
                      {item.engagement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Paid Ad Performance */}
          <motion.div variants={cardVariants} className="col-span-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                {isMilestone ? 'Ad Targets & Expected ROI' : 'Paid Ad Performance'}
              </h3>
              <div className="flex gap-0.5 bg-slate-50 p-0.5 rounded border border-slate-200 text-[6.5px] sm:text-[7.5px]">
                <button
                  type="button"
                  onClick={() => setActiveAdTab('google')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer font-medium transition-colors ${activeAdTab === 'google' ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'
                    }`}
                >
                  Google Ads
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAdTab('meta')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer font-medium transition-colors ${activeAdTab === 'meta' ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'
                    }`}
                >
                  Meta Ads
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {displayedAds.map((ad, idx) => (
                <AdMetricCard key={idx} ad={ad} />
              ))}
            </div>
          </motion.div>

          {/* Patient Lead Funnel */}
          <motion.div variants={cardVariants} className="col-span-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                {isMilestone ? 'Milestone Funnel Target' : 'Patient Lead Funnel'}
              </h3>
              <span className={`text-[6.5px] sm:text-[7.5px] font-semibold px-1 py-0.5 rounded border ${isMilestone
                ? 'text-purple-700 bg-purple-50 border-purple-200'
                : 'text-blue-700 bg-blue-50 border-blue-100'
                }`}>
                {isMilestone ? 'Target Conv: 17.4%' : 'Conversion: 17.2%'}
              </span>
            </div>

            <div className="space-y-1">
              {activeFunnel.map((item, idx) => (
                <div key={idx} className="flex items-center text-[6.5px] sm:text-[7.5px] gap-1.5">
                  <span className="w-20 truncate text-slate-600 font-medium">{item.label}</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${FUNNEL_BARS[idx % FUNNEL_BARS.length]} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: isLoaded ? `${item.width}%` : '0%',
                        transitionDelay: `${idx * 75}ms`
                      }}
                    />
                  </div>
                  <span className="w-10 text-right font-extrabold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* Bottom Live Activity / Milestone Ticker */}
      <div className={`border-t px-3 py-1 flex items-center justify-between text-[7px] sm:text-[7.5px] transition-colors ${isMilestone
        ? 'bg-slate-950 text-purple-200 border-purple-900/50'
        : 'bg-[#0c1222] text-slate-300 border-slate-800'
        }`}>
        <div className="flex items-center gap-2 truncate">
          <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider shrink-0 ${isMilestone ? 'text-purple-400' : 'text-emerald-400'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMilestone ? 'bg-purple-400' : 'bg-emerald-400'
              }`} />
            {isMilestone ? 'Targets' : 'Live'}
          </span>
          <span className="text-slate-400 truncate">
            {isMilestone
              ? '+340 Patient Treatments • ₹42.5L Revenue • 15+ Google #1 Projected'
              : '214 Consultations • ₹28.4L Revenue • #1 Google Ranks Pune & PCMC'}
          </span>
        </div>
        <div className="shrink-0 font-mono text-[6.5px] text-slate-400 hidden sm:block">
          {isMilestone ? '150% VELOCITY' : 'OPTIMAL - NABH COMPLIANT'}
        </div>
      </div>

    </div>
  );
}

// The hero re-renders every few seconds (rotating headline word); the dashboard's data doesn't change.
export default memo(HeroDashboard);
