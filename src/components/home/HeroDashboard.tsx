"use client";

import React, { memo, useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Users, Filter, Target, Coins, BarChart2, Search, Youtube,
  MapPin, Instagram, ArrowUpRight, TrendingUp, TrendingDown,
  Eye, Phone, Activity, CheckCircle2, Sparkles, Zap,
  Building2, Smile, HeartPulse, Briefcase, MessageCircle,
  Calendar, Star, Navigation, Award, Layers, Play, Pause,
  type LucideIcon
} from 'lucide-react';
import type { HeroDashboardData, ClientFieldSummary, GmbRankingItem, AdsStatisticsData } from '@/lib/types';
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
  'building-2': Building2,
  smile: Smile,
  sparkles: Sparkles,
  activity: Activity,
  'heart-pulse': HeartPulse,
  briefcase: Briefcase,
  'message-circle': MessageCircle,
  calendar: Calendar,
  award: Award,
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

function useLiveCount(baseValue: number, decimals = 0, isCurrency = false, suffix = '', enabled = true) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayValue(0);
      return;
    }

    let animationFrame: number;
    const duration = 450;
    const startTime = performance.now();
    const startVal = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const parentStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.01,
    },
  },
};

const HEX: Record<string, string> = {
  blue: '#2563eb',
  purple: '#9333ea',
  emerald: '#10b981',
  orange: '#f59e0b',
  indigo: '#4f46e5',
  pink: '#ec4899',
  red: '#e20b27',
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useSvgId(prefix: string) {
  return prefix + useId().replace(/:/g, '');
}

// Catmull-Rom → cubic bezier for smooth marketing-style curves
function smoothPath(points: [number, number][]) {
  if (points.length < 2) return '';
  let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}

function niceMax(m: number) {
  if (m <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(m)));
  return (Math.ceil((m / p) * 2) / 2) * p;
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const id = useSvgId('spark');
  const w = 100;
  const h = 26;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - 3 - ((v - min) / (max - min || 1)) * (h - 8),
  ] as [number, number]);
  const line = smoothPath(pts);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-4 sm:h-5 block">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <motion.rect x="0" y="0" height={h} initial={{ width: 0 }} animate={{ width: w }} transition={{ duration: 1.1, ease: EASE }} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id}-fill)`} />
        <path d={line} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Donut({
  segments,
  activeIdx = null,
  thickness = 14,
  className = 'w-24 h-24',
  onHover,
  children,
}: {
  segments: { value: number; color: string }[];
  activeIdx?: number | null;
  thickness?: number;
  className?: string;
  onHover?: (idx: number | null) => void;
  children?: React.ReactNode;
}) {
  const r = 50 - thickness / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;

  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 overflow-visible">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#eef2f7" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * C;
          const offset = -acc;
          acc += len;
          const dim = activeIdx !== null && activeIdx !== i;
          return (
            <motion.circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={activeIdx === i ? thickness + 4 : thickness}
              strokeDashoffset={offset}
              initial={{ strokeDasharray: `0 ${C}` }}
              animate={{ strokeDasharray: `${Math.max(len - 1.2, 0)} ${C}`, opacity: dim ? 0.3 : 1 }}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.07, ease: EASE }}
              onMouseEnter={() => onHover?.(i)}
              onMouseLeave={() => onHover?.(null)}
              className="cursor-pointer transition-[stroke-width] duration-200"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">{children}</div>
    </div>
  );
}

function RadialGauge({ value, max = 100, color, display, label, size = 'w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem]' }: { value: number; max?: number; color: string; display: string; label?: string; size?: string }) {
  const id = useSvgId('gauge');
  const r = 40;
  const C = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);

  return (
    <div className="flex flex-col items-center min-w-0">
      <div className={`relative shrink-0 ${size}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#eef2f7" strokeWidth="11" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - pct) }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-[13px] font-black text-[#1a1053] tracking-tight">
          {display}
        </div>
      </div>
      {label && <span className="text-[7px] sm:text-[8px] font-semibold text-slate-500 mt-0.5 text-center leading-tight truncate max-w-full">{label}</span>}
    </div>
  );
}

function GrowthChart({
  values,
  baseline,
  labels,
  color,
  format,
  animKey,
}: {
  values: number[];
  baseline: number[];
  labels: string[];
  color: string;
  format: (v: number) => string;
  animKey: string;
}) {
  const id = useSvgId('growth');
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Size the chart to its box so it fills the fixed-height card without distorting text
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const W = size.w;
  const H = size.h;
  const s = Math.min(Math.max(W / 260, 1.15), 1.8); // scale for type & marks
  const PAD_L = 22 * s;
  const PAD_R = 6 * s;
  const PAD_T = 12 * s;
  const PAD_B = 13 * s;
  const max = niceMax(Math.max(...values, ...baseline));
  const plotW = Math.max(W - PAD_L - PAD_R, 1);
  const plotH = Math.max(H - PAD_T - PAD_B, 1);
  const x = (i: number) => PAD_L + (i / (values.length - 1)) * plotW;
  const y = (v: number) => PAD_T + plotH - (v / max) * plotH;
  const pts = values.map((v, i) => [x(i), y(v)] as [number, number]);
  const basePts = baseline.map((v, i) => [x(i), y(v)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${x(values.length - 1)},${PAD_T + plotH} L${PAD_L},${PAD_T + plotH} Z`;
  const last = pts[pts.length - 1];
  const growth = Math.round((values[values.length - 1] / values[0] - 1) * 100);
  const hp = hoverIdx !== null ? pts[hoverIdx] : null;
  const tipW = 48 * s;
  const tipH = 16 * s;

  return (
    <div ref={boxRef} className="relative w-full h-full min-h-0">
      {W > 0 && H > 0 && (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 block overflow-visible" onMouseLeave={() => setHoverIdx(null)}>
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.32" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
            <clipPath id={`${id}-clip`}>
              <motion.rect key={animKey} x="0" y="0" height={H} initial={{ width: 0 }} animate={{ width: W }} transition={{ duration: 1.3, ease: EASE }} />
            </clipPath>
          </defs>

          {/* Grid + Y axis */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line x1={PAD_L} x2={W - PAD_R} y1={y(max * t)} y2={y(max * t)} stroke="#e2e8f0" strokeWidth={0.6 * s} strokeDasharray={t === 0 ? undefined : `${2 * s} ${2 * s}`} />
              <text x={PAD_L - 3 * s} y={y(max * t) + 1.8 * s} textAnchor="end" fontSize={5 * s} fill="#94a3b8" fontWeight="600">
                {format(max * t)}
              </text>
            </g>
          ))}

          {/* X axis */}
          {labels.map((l, i) => (i % 2 === 1 || i === labels.length - 1) && (
            <text key={l + i} x={x(i)} y={H - 3 * s} textAnchor="middle" fontSize={5 * s} fill={i === labels.length - 1 ? '#1a1053' : '#94a3b8'} fontWeight={i === labels.length - 1 ? 800 : 600}>
              {l}
            </text>
          ))}

          {/* Baseline (dashed) */}
          <path d={smoothPath(basePts)} fill="none" stroke="#cbd5e1" strokeWidth={1 * s} strokeDasharray={`${3 * s} ${2.5 * s}`} />

          <g clipPath={`url(#${id}-clip)`}>
            <path d={area} fill={`url(#${id}-fill)`} />
            <path d={line} fill="none" stroke={`url(#${id}-stroke)`} strokeWidth={2 * s} strokeLinecap="round" />
            {pts.map(([px, py], i) => (
              <circle key={i} cx={px} cy={py} r={(i === pts.length - 1 ? 2.8 : 1.5) * s} fill="#fff" stroke={color} strokeWidth={(i === pts.length - 1 ? 1.6 : 1) * s} />
            ))}
          </g>

          {/* Pulsing latest point */}
          <circle cx={last[0]} cy={last[1]} r={2.8 * s} fill={color} opacity="0.35">
            <animate attributeName="r" values={`${2.8 * s};${7 * s};${2.8 * s}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Growth callout */}
          <motion.g key={`callout-${animKey}`} initial={{ opacity: 0 }} animate={{ opacity: hoverIdx === null ? 1 : 0 }} transition={{ delay: hoverIdx === null ? 1.1 : 0, duration: 0.3 }}>
            <rect x={last[0] - 52 * s} y={Math.max(last[1] - 6 * s, 1)} width={42 * s} height={12 * s} rx={6 * s} fill="#1a1053" />
            <text x={last[0] - 31 * s} y={Math.max(last[1] - 6 * s, 1) + 8.2 * s} textAnchor="middle" fontSize={6 * s} fontWeight="800" fill="#fff">
              ▲ {growth}% YoY
            </text>
          </motion.g>

          {/* Hover crosshair + tooltip */}
          {hp && hoverIdx !== null && (
            <g pointerEvents="none">
              <line x1={hp[0]} x2={hp[0]} y1={PAD_T} y2={PAD_T + plotH} stroke={color} strokeWidth={0.7 * s} strokeDasharray={`${2 * s} ${1.5 * s}`} />
              <circle cx={hp[0]} cy={hp[1]} r={3 * s} fill={color} stroke="#fff" strokeWidth={1.2 * s} />
              <g transform={`translate(${Math.min(Math.max(hp[0] - tipW / 2, PAD_L), W - PAD_R - tipW)}, ${Math.max(hp[1] - tipH - 6 * s, 0)})`}>
                <rect width={tipW} height={tipH} rx={3 * s} fill="#0c1222" />
                <text x={tipW / 2} y={6.5 * s} textAnchor="middle" fontSize={4.6 * s} fill="#94a3b8" fontWeight="600">{labels[hoverIdx]}</text>
                <text x={tipW / 2} y={13 * s} textAnchor="middle" fontSize={6 * s} fill="#fff" fontWeight="800">{format(values[hoverIdx])}</text>
              </g>
            </g>
          )}

          {/* Hover hit areas */}
          {pts.map(([px], i) => (
            <rect key={`hit-${i}`} x={px - plotW / (pts.length - 1) / 2} y={PAD_T} width={plotW / (pts.length - 1)} height={plotH} fill="transparent" onMouseEnter={() => setHoverIdx(i)} />
          ))}
        </svg>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  decimals = 0,
  isCurrency = false,
  suffix = '',
  trend,
  iconKey,
  colorKey,
  spark,
  isMilestone = false,
  isLoaded = true,
  onClick,
  active = false
}: any) {
  const Icon = ICONS[iconKey || ''] || BarChart2;
  const c = METRIC_COLORS[colorKey || 'blue'] || METRIC_COLORS.blue;
  const hex = HEX[colorKey || 'blue'] || HEX.blue;

  return (
    <div
      onClick={onClick}
      style={active ? { boxShadow: `0 0 0 1.5px ${hex}, 0 8px 20px -8px ${hex}80` } : undefined}
      className={`relative overflow-hidden bg-white rounded-xl border ${active ? 'border-transparent' : c.border} shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group h-full cursor-pointer`}
    >
      <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full opacity-[0.08] pointer-events-none" style={{ background: hex }} />
      <div className="px-1.5 sm:px-2 pt-1.5 sm:pt-2">
        <div className="flex items-center justify-between gap-1">
          <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${c.color} ${c.bg} shrink-0 group-hover:scale-110 transition-transform`}>
            <Icon size={11} />
          </div>
          <span className={`text-[6px] sm:text-[6.5px] font-bold px-1 py-0.5 rounded-full flex items-center gap-0.5 ${
            isMilestone ? 'text-purple-700 bg-purple-50' : 'text-emerald-700 bg-emerald-50'
          }`}>
            {isMilestone ? <Target size={7} /> : <TrendingUp size={7} />}
            <span>+{trend}%</span>
          </span>
        </div>
        <div className="mt-1 text-[10px] sm:text-[13px] font-extrabold text-[#1a1053] tracking-tight leading-none">
          <AnimatedCounter value={value} decimals={decimals} isCurrency={isCurrency} suffix={suffix} enabled={isLoaded} />
        </div>
        <div className="text-[6px] sm:text-[7px] font-semibold text-slate-500 truncate leading-tight mt-0.5">
          {title}
        </div>
      </div>
      {spark && isLoaded && (
        <div className="mt-0.5">
          <Sparkline values={spark} color={hex} />
        </div>
      )}
    </div>
  );
}

const CARD = 'bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/90 shadow-2xs min-h-0 overflow-hidden';

const TABS = ['overview', 'fields', 'gmb', 'ads'] as const;
type DashboardTab = typeof TABS[number];

function HeroDashboard({ data }: { data?: HeroDashboardData }) {
  // Navigation tabs with auto-play cycling
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tabProgress, setTabProgress] = useState<number>(0);
  const TAB_DURATION_MS = 2400; // 2.4 seconds per tab view (fast, responsive tour)

  // Mode toggle: 'last-month' (Delivered Results) vs 'next-month' (Target Milestones)
  const [dashboardMode, setDashboardMode] = useState<'last-month' | 'next-month'>('last-month');
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [selectedAdPlatform, setSelectedAdPlatform] = useState<'all' | 'google' | 'meta'>('all');
  const [activeTrafficView, setActiveTrafficView] = useState<'sessions' | 'inquiries' | 'consults'>('sessions');

  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(rootRef);
  const [livePatients, setLivePatients] = useState(48);
  const [pulsePatient, setPulsePatient] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initProgress, setInitProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Automatic tab cycling in play mode
  useEffect(() => {
    if (!isLoaded || isInitializing || !onScreen) return;
    if (!isPlaying || isHovered) return;

    const intervalMs = 40;
    const step = (intervalMs / TAB_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setTabProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => {
            const nextIdx = (TABS.indexOf(curr) + 1) % TABS.length;
            return TABS[nextIdx];
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isLoaded, isInitializing, onScreen, isPlaying, isHovered, activeTab]);

  const handleTabClick = (tab: DashboardTab) => {
    setActiveTab(tab);
    setTabProgress(0);
  };

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 380;

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
        }, 35);
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
    const duration = 280;

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
        }, 25);
      }
    };
    animationFrame = requestAnimationFrame(step);
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

  // Merge supplied data with fallback defaults
  const clientsByField: ClientFieldSummary[] = data?.clients_by_field?.length
    ? data.clients_by_field
    : defaultDashboard.clients_by_field || [];

  const gmbRankings: GmbRankingItem[] = data?.gmb_rankings?.length
    ? data.gmb_rankings
    : defaultDashboard.gmb_rankings || [];

  const adsStats: AdsStatisticsData = data?.ads_statistics || defaultDashboard.ads_statistics!;

  const [hoverField, setHoverField] = useState<number | null>(null);
  const [hoverLead, setHoverLead] = useState<number | null>(null);
  const focusField = hoverField ?? selectedField;

  // 5 Strategic KPI headline metrics (each with a 12-month sparkline)
  const deliveredMetrics = [
    { title: 'Clients Catered', value: 75, suffix: '+', trend: 34, icon: 'users', color: 'blue', tabTarget: 'fields' as const,
      spark: [38, 42, 45, 49, 52, 55, 58, 61, 64, 68, 71, 75] },
    { title: 'GMB #1 Local Pack', value: 94, suffix: '%', trend: 48, icon: 'map-pin', color: 'emerald', tabTarget: 'gmb' as const,
      spark: [52, 58, 61, 66, 70, 74, 78, 82, 85, 88, 91, 94] },
    { title: 'Paid Ads Leads', value: 738, suffix: '', trend: 38, icon: 'target', color: 'purple', tabTarget: 'ads' as const,
      spark: [410, 452, 438, 505, 540, 528, 590, 612, 655, 680, 702, 738] },
    { title: 'Consults Booked', value: 214, suffix: '', trend: 26, icon: 'calendar', color: 'indigo', tabTarget: 'ads' as const,
      spark: [120, 128, 135, 131, 150, 162, 170, 168, 185, 196, 205, 214] },
    { title: 'Revenue Attributed', value: 28.4, decimals: 1, suffix: 'L', isCurrency: true, trend: 41, icon: 'coins', color: 'orange', tabTarget: 'overview' as const,
      spark: [12.1, 13.4, 14.2, 15.8, 16.5, 18.2, 19.4, 20.8, 22.5, 24.1, 26.2, 28.4] },
  ];

  const milestoneMetrics = [
    { title: 'Clients Targeted', value: 120, suffix: '+', trend: 60, icon: 'users', color: 'blue', tabTarget: 'fields' as const,
      spark: [75, 79, 83, 87, 91, 95, 99, 103, 107, 111, 116, 120] },
    { title: 'GMB #1 Target', value: 98, suffix: '%', trend: 52, icon: 'map-pin', color: 'emerald', tabTarget: 'gmb' as const,
      spark: [94, 94.5, 95, 95.4, 95.8, 96.2, 96.6, 97, 97.3, 97.6, 97.8, 98] },
    { title: 'Target Ad Leads', value: 1250, suffix: '', trend: 69, icon: 'target', color: 'purple', tabTarget: 'ads' as const,
      spark: [738, 780, 825, 870, 915, 960, 1005, 1050, 1100, 1150, 1200, 1250] },
    { title: 'Target Consults', value: 340, suffix: '', trend: 58, icon: 'calendar', color: 'indigo', tabTarget: 'ads' as const,
      spark: [214, 225, 236, 247, 258, 270, 281, 293, 305, 316, 328, 340] },
    { title: 'Target Revenue', value: 42.5, decimals: 1, suffix: 'L', isCurrency: true, trend: 50, icon: 'coins', color: 'orange', tabTarget: 'overview' as const,
      spark: [28.4, 29.6, 30.9, 32.1, 33.4, 34.7, 36, 37.3, 38.6, 39.9, 41.2, 42.5] },
  ];

  const activeMetrics = isMilestone ? milestoneMetrics : deliveredMetrics;

  // 12-month growth series for the overview chart
  const CHART_MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const TRAFFIC_SERIES = {
    delivered: {
      sessions: [11.2, 12.8, 12.1, 14.9, 15.6, 17.8, 17.1, 20.4, 21.9, 24.2, 25.6, 28.9],
      inquiries: [480, 540, 515, 640, 690, 780, 760, 905, 980, 1090, 1160, 1320],
      consults: [165, 190, 184, 236, 258, 302, 296, 352, 388, 426, 462, 514],
    },
    milestone: {
      sessions: [29.5, 31, 32.4, 33.8, 35.1, 36.5, 37.8, 39.2, 40.6, 41.9, 43.2, 44.6],
      inquiries: [1350, 1430, 1520, 1610, 1700, 1790, 1880, 1970, 2060, 2150, 2250, 2380],
      consults: [540, 580, 625, 670, 715, 760, 810, 860, 910, 960, 1010, 1070],
    },
  };
  const trafficValues = TRAFFIC_SERIES[isMilestone ? 'milestone' : 'delivered'][activeTrafficView];
  const trafficBaseline = trafficValues.map((v, i) => +(v * (0.52 + i * 0.008)).toFixed(1));
  const trafficFormat = (v: number) => activeTrafficView === 'sessions'
    ? `${+v.toFixed(1)}K`
    : v >= 1000 ? `${+(v / 1000).toFixed(1)}K` : `${Math.round(v)}`;

  // Paid ads view based on the selected platform
  const adView = selectedAdPlatform === 'google'
    ? adsStats.google_ads
    : selectedAdPlatform === 'meta'
      ? adsStats.meta_ads
      : {
          spend: adsStats.total_spend,
          leads: adsStats.total_leads,
          cpl: adsStats.avg_cpl,
          clicks: adsStats.clicks,
          ctr: adsStats.avg_ctr,
          conversion_rate: adsStats.conversion_rate,
        };
  const INDUSTRY_CPL = 350;
  const googleSharePct = Math.round((adsStats.google_ads.spend / adsStats.total_spend) * 100);
  const LEAD_COLORS = ['#10b981', '#2563eb', '#9333ea'];
  const FUNNEL_WIDTHS = [100, 86, 72, 58, 46];
  const headToHead = [
    { label: 'Leads', g: adsStats.google_ads.leads, m: adsStats.meta_ads.leads, fmt: (v: number) => `${v}` },
    { label: 'Clicks', g: adsStats.google_ads.clicks, m: adsStats.meta_ads.clicks, fmt: (v: number) => `${(v / 1000).toFixed(1)}K` },
    { label: 'CTR', g: adsStats.google_ads.ctr, m: adsStats.meta_ads.ctr, fmt: (v: number) => `${v}%` },
    { label: 'Conv.', g: adsStats.google_ads.conversion_rate, m: adsStats.meta_ads.conversion_rate, fmt: (v: number) => `${v}%` },
    { label: 'CPL', g: adsStats.google_ads.cpl, m: adsStats.meta_ads.cpl, fmt: (v: number) => `₹${v}`, lowerBetter: true },
  ];

  const maxFieldCount = Math.max(...clientsByField.map((f) => f.count), 1);
  const totalFieldCount = clientsByField.reduce((s, f) => s + f.count, 0);
  const maxCalls = Math.max(...gmbRankings.map((r) => r.monthly_calls), 1);
  const totalCalls = gmbRankings.reduce((s, r) => s + r.monthly_calls, 0);
  const shortClient = (name: string) => name.replace(/^Dr\.?\s+/i, '').split(' ')[0];


  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-[#f8fafc] text-slate-800 rounded-[1.6rem] overflow-hidden flex flex-col relative z-10 font-sans shadow-xl border border-slate-200/90 select-none"
    >

      {/* 0. Live Telemetry Initialization Sequence */}
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            key="dashboard-intro-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-30 flex flex-col justify-between p-3.5 sm:p-5 bg-gradient-to-br from-white via-[#f8fafe] to-[#edf3fc] text-slate-800 overflow-hidden rounded-[1.6rem] select-none border border-slate-200/80 shadow-2xl"
          >
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#e20b27]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-500 border-b border-slate-200/90 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/90 shadow-sm" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/90 shadow-sm" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-sm" />
                </div>
                <span className="font-mono text-[#1a1053] font-bold tracking-wider text-[7.5px] sm:text-[8.5px] uppercase flex items-center gap-1.5 ml-1">
                  <Activity size={10} className="text-emerald-600 animate-pulse" />
                  <span>Codigix Infotech Live Practice Telemetry</span>
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-[7px] font-mono font-semibold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
                </span>
                <span>CALIBRATING CLIENT DATA</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-3 text-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/60 animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-blue-200/80 bg-white/90 backdrop-blur-sm shadow-[0_8px_25px_rgba(59,130,246,0.12)]" />
                <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#1a1053] to-[#2b1f6f] flex items-center justify-center text-white shadow-md">
                  <Activity size={18} className="text-[#ff4d64] animate-pulse" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-700 text-[8px] font-mono font-semibold uppercase mb-1">
                <Zap size={9} className="text-amber-500" />
                <span>Client Niche & GMB Rank Telemetry</span>
              </div>

              <h2 className="text-base sm:text-xl font-black text-[#1a1053] tracking-tight">
                Codigix Infotech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Growth Dashboard</span>
              </h2>

              <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 mt-1">
                {initProgress < 35 && "Loading 75+ Client Portfolios across 6 Healthcare Fields..."}
                {initProgress >= 35 && initProgress < 70 && "Verifying Local GMB 3-Pack Rankings & Direct Calls..."}
                {initProgress >= 70 && "Synthesizing Google & Meta Ads Performance Statistics..."}
              </p>

              <div className="w-full max-w-[280px] sm:max-w-[340px] mt-3">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-[2px] border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27] rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${initProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-4 gap-2 pt-2 border-t border-slate-200/90 text-[7px] font-mono text-slate-600">
              <div className="flex items-center gap-1 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-slate-400">FIELDS:</span> <span className="font-semibold text-slate-700">6 Sectors</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-slate-400">GMB 3-PACK:</span> <span className="font-semibold text-slate-700">94% Rank #1</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span className="text-slate-400">ADS LEADS:</span> <span className="font-semibold text-slate-700">738 Verified</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 border border-slate-200/80 px-2 py-0.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-slate-400">AVG CPL:</span> <span className="font-semibold text-slate-700">₹114.80</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Top Application Bar */}
      <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 bg-[#0c1222] text-white border-b border-slate-800 text-[9px] sm:text-[10px] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500/90" />
            <span className="w-2 h-2 rounded-full bg-amber-400/90" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/90" />
          </div>
          <span className="font-bold text-slate-100 hidden sm:flex items-center gap-1.5 tracking-tight text-[9px]">
            <Activity size={11} className="text-emerald-400 animate-pulse" />
            <span>Codigix Infotech Dashboard</span>
          </span>
        </div>

        {/* Tab Navigation Segmented Controller with Auto-Play */}
        <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700/80 text-[7px] sm:text-[8px]">
          {/* Auto-Play Pause/Resume Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(prev => !prev)}
            title={isPlaying ? "Pause automatic tab tour" : "Resume automatic tab tour"}
            className="px-1.5 py-0.5 rounded text-[7px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer border-r border-slate-700/80 mr-0.5 pr-1.5"
          >
            {isPlaying ? (
              <Pause size={7.5} className="text-amber-400" />
            ) : (
              <Play size={7.5} className="text-emerald-400" />
            )}
            <span className="text-[6.5px] font-bold uppercase tracking-wider text-slate-300">
              {isPlaying ? (isHovered ? 'Paused' : 'Auto') : 'Play'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('overview')}
            className={`relative px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer flex items-center gap-1 overflow-hidden ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 size={8.5} />
            <span>Overview</span>
            {activeTab === 'overview' && isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/25">
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${tabProgress}%` }}
                />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('fields')}
            className={`relative px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer flex items-center gap-1 overflow-hidden ${
              activeTab === 'fields'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 size={8.5} />
            <span>Clients by Field</span>
            {activeTab === 'fields' && isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/25">
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${tabProgress}%` }}
                />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('gmb')}
            className={`relative px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer flex items-center gap-1 overflow-hidden ${
              activeTab === 'gmb'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin size={8.5} />
            <span>GMB Ranks</span>
            {activeTab === 'gmb' && isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/25">
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${tabProgress}%` }}
                />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('ads')}
            className={`relative px-2 py-0.5 rounded-md transition-all font-semibold cursor-pointer flex items-center gap-1 overflow-hidden ${
              activeTab === 'ads'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target size={8.5} />
            <span>Ads Leads</span>
            {activeTab === 'ads' && isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/25">
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${tabProgress}%` }}
                />
              </div>
            )}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Delivered vs Milestones mode */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700/80 text-[7px]">
            <button
              type="button"
              onClick={() => setDashboardMode('last-month')}
              className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all ${
                dashboardMode === 'last-month' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              Delivered
            </button>
            <button
              type="button"
              onClick={() => setDashboardMode('next-month')}
              className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all ${
                dashboardMode === 'next-month' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
            >
              Milestones
            </button>
          </div>

          <button
            type="button"
            onClick={handleResync}
            title="Click to re-sync live telemetry"
            className="flex items-center gap-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-full text-[7.5px] font-semibold cursor-pointer"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>LIVE</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Header Context Banner */}
      <div className={`px-2.5 py-0.5 flex items-center justify-between text-[7px] sm:text-[7.5px] ${
        isMilestone ? 'bg-purple-900/10 text-purple-950 border-b border-purple-200/80' : 'bg-blue-50/90 text-blue-950 border-b border-blue-100'
      }`}>
        <div className="flex items-center gap-1.5 truncate">
          <CheckCircle2 size={9} className="text-emerald-600 shrink-0" />
          <span className="font-bold text-slate-800">
            {activeTab === 'fields' && "CLIENTS BY FIELD: 75+ Healthcare & Enterprise Brands Across 6 Distinct Disciplines"}
            {activeTab === 'gmb' && "GMB MAP RANKINGS: 94% Dominance in Google 3-Pack Maps with 14.8K+ Direct Calls"}
            {activeTab === 'ads' && "PAID ADS LEADS: 738 Leads Across Google & Meta Ads at ₹114.80 Avg CPL"}
            {activeTab === 'overview' && "ALL-IN-ONE OVERVIEW: 75+ Clients Catered • #1 GMB Ranks • 738 Paid Leads • ₹28.4L Attributed Revenue"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[6.5px] font-mono text-slate-500 shrink-0">
          {isPlaying ? (
            isHovered ? (
              <span className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200 font-semibold flex items-center gap-1">
                <Pause size={6.5} /> Hovered (Paused)
              </span>
            ) : (
              <span className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded border border-blue-200 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" /> Auto-Playing
              </span>
            )
          ) : (
            <span className="text-slate-500 font-medium">Manual Mode</span>
          )}
        </div>
      </div>

      {/* 3. Main Dashboard Body */}
      <div className="p-2 sm:p-2.5 space-y-2">

        {/* 5 Headline KPIs with live sparklines */}
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
                spark={m.spark}
                isMilestone={isMilestone}
                isLoaded={isLoaded}
                active={activeTab === m.tabTarget && (m.tabTarget !== 'ads' || m.icon === 'target')}
                onClick={() => handleTabClick(m.tabTarget)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic View Display Based on Selected Tab */}
        <div className="h-[300px] sm:h-[340px] overflow-hidden">
          <AnimatePresence mode="wait">

            {/* TAB 1: CLIENTS BY FIELD — donut + ranked bars */}
            {activeTab === 'fields' && (
              <motion.div
                key="tab-fields"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col gap-1.5"
              >
                <div className="shrink-0 flex items-center justify-between px-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <h3 className="text-[11px] sm:text-[12px] font-bold text-slate-900">
                      Clients Catered By Field & Speciality
                    </h3>
                  </div>
                  <span className="text-[8.25px] text-slate-500 font-medium">
                    Total: <strong className="text-blue-700 font-bold">{totalFieldCount}+ Active Practices</strong>
                  </span>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-12 grid-rows-[minmax(0,1fr)] gap-1.5 sm:gap-2">
                  {/* Portfolio donut */}
                  <div className={`${CARD} col-span-4 p-2 flex flex-col items-center justify-between`}>
                    <div className="w-full flex items-center justify-between">
                      <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-800">Portfolio Mix</span>
                      <span className="text-[7.5px] font-bold text-blue-700 bg-blue-50 px-1 py-0.5 rounded-full">6 Sectors</span>
                    </div>
                    <Donut
                      className="w-28 h-28 sm:w-36 sm:h-36 my-auto"
                      thickness={15}
                      activeIdx={focusField}
                      onHover={setHoverField}
                      segments={clientsByField.map((f) => ({ value: f.count, color: HEX[f.color] || HEX.blue }))}
                    >
                      {focusField !== null && clientsByField[focusField] ? (
                        <>
                          <span className="text-[14px] sm:text-[17px] font-black leading-none" style={{ color: HEX[clientsByField[focusField].color] }}>
                            {clientsByField[focusField].share}%
                          </span>
                          <span className="text-[7px] sm:text-[7.75px] font-semibold text-slate-500 mt-0.5">{clientsByField[focusField].short_name}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[14px] sm:text-[17px] font-black text-[#1a1053] leading-none">{totalFieldCount}+</span>
                          <span className="text-[7px] sm:text-[7.75px] font-semibold text-slate-500 mt-0.5">Practices</span>
                        </>
                      )}
                    </Donut>
                    <div className="w-full grid grid-cols-2 gap-x-1.5 gap-y-0.5">
                      {clientsByField.map((f, i) => (
                        <div key={i} className={`flex items-center gap-1 text-[7px] sm:text-[7.75px] transition-opacity ${focusField !== null && focusField !== i ? 'opacity-40' : ''}`}>
                          <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: HEX[f.color] || HEX.blue }} />
                          <span className="text-slate-600 truncate">{f.short_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ranked horizontal bars */}
                  <div className={`${CARD} col-span-8 p-2 flex flex-col`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-800">Practices Catered & Signature Win</span>
                      <span className="text-[7.5px] text-slate-400 font-mono">HOVER TO EXPLORE</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-1">
                      {clientsByField.map((f, idx) => {
                        const IconComp = ICONS[f.icon] || Building2;
                        const c = METRIC_COLORS[f.color] || METRIC_COLORS.blue;
                        const hex = HEX[f.color] || HEX.blue;
                        const dim = focusField !== null && focusField !== idx;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoverField(idx)}
                            onMouseLeave={() => setHoverField(null)}
                            onClick={() => setSelectedField(selectedField === idx ? null : idx)}
                            className={`flex items-center gap-1.5 cursor-pointer rounded-md px-1 py-0.5 transition-all ${dim ? 'opacity-40' : ''} ${focusField === idx ? 'bg-slate-50' : ''}`}
                          >
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center ${c.bg} ${c.color} shrink-0`}>
                              <IconComp size={8.5} />
                            </div>
                            <div className="w-[5rem] sm:w-[7rem] shrink-0 min-w-0">
                              <div className="text-[7.75px] sm:text-[8.75px] font-bold text-slate-900 truncate leading-tight">{f.short_name}</div>
                              <div className="text-[6.5px] sm:text-[7px] text-slate-400 truncate leading-tight" title={f.highlight}>{f.highlight}</div>
                            </div>
                            <div className="flex-1 h-3.5 sm:h-4 bg-slate-100 rounded-full overflow-hidden relative">
                              <motion.div
                                className="h-full rounded-full flex items-center justify-end pr-1"
                                style={{ background: `linear-gradient(90deg, ${hex}99, ${hex})` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(f.count / maxFieldCount) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.1 + idx * 0.07, ease: EASE }}
                              >
                                <span className="text-[7px] sm:text-[7.75px] font-black text-white">{f.count}+</span>
                              </motion.div>
                            </div>
                            <div className="flex -space-x-1 items-center shrink-0 w-10 sm:w-12 justify-end">
                              {f.logos.slice(0, 3).map((logo, logoIdx) => (
                                <img
                                  key={logoIdx}
                                  src={`/clients/${logo}`}
                                  alt="Client"
                                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-contain bg-white p-[1px] border border-slate-200"
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              ))}
                            </div>
                            <span className="w-[6rem] sm:w-[8.5rem] shrink-0 text-right text-[7px] sm:text-[7.75px] font-bold truncate" style={{ color: hex }}>
                              {f.metric}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Retention strip */}
                <div className="shrink-0 bg-gradient-to-r from-amber-50 via-white to-blue-50 border border-slate-200/90 rounded-xl px-2 py-1.5 flex items-center gap-2 text-[8.25px] sm:text-[9.25px] text-slate-600">
                  <Award size={12} className="text-amber-500 shrink-0" />
                  <strong className="text-slate-800 shrink-0">Client Retention</strong>
                  <div className="flex-1 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full" initial={{ width: 0 }} animate={{ width: '96.4%' }} transition={{ duration: 1, ease: EASE }} />
                  </div>
                  <strong className="text-emerald-700 font-black shrink-0">96.4%</strong>
                  <button
                    type="button"
                    onClick={() => handleTabClick('gmb')}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>View GMB Ranks</span>
                    <ArrowUpRight size={9} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: GMB MAP RANKINGS — rank climb + calls chart */}
            {activeTab === 'gmb' && (
              <motion.div
                key="tab-gmb"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col gap-1.5"
              >
                <div className="shrink-0 flex items-center justify-between px-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h3 className="text-[11px] sm:text-[12px] font-bold text-slate-900">
                      Google Maps (GMB) Ranking Climb
                    </h3>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1 text-[8.25px]">
                    <Star size={7.5} className="fill-emerald-600 text-emerald-600" />
                    <span>94% in Google 3-Pack</span>
                  </span>
                </div>

                {/* Stat tiles with mini visuals */}
                <div className="shrink-0 grid grid-cols-4 gap-1.5">
                  <div className={`${CARD} p-1.5 flex items-center gap-1.5`}>
                    <RadialGauge value={94.2} color="#10b981" display="94%" size="w-11 h-11 sm:w-14 sm:h-14" />
                    <div className="min-w-0">
                      <div className="text-[7.5px] text-slate-400 font-medium">Local 3-Pack Share</div>
                      <div className="text-[10.25px] sm:text-[11px] font-black text-slate-900">#1 / #2 Spots</div>
                    </div>
                  </div>
                  <div className={`${CARD} p-1.5 flex flex-col justify-between`}>
                    <div className="flex items-center justify-between">
                      <div className="text-[7.5px] text-slate-400 font-medium">Direct Map Calls</div>
                      <Phone size={10} className="text-blue-500" />
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-black text-slate-900">14,840</div>
                    <Sparkline values={[620, 710, 690, 820, 880, 940, 1010, 1080, 1150, 1210, 1290, 1380]} color="#2563eb" />
                  </div>
                  <div className={`${CARD} p-1.5 flex flex-col justify-between`}>
                    <div className="flex items-center justify-between">
                      <div className="text-[7.5px] text-slate-400 font-medium">Direction Requests</div>
                      <Navigation size={10} className="text-purple-500" />
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-black text-slate-900">28,520</div>
                    <Sparkline values={[1300, 1420, 1510, 1490, 1680, 1820, 1900, 2050, 2180, 2290, 2430, 2610]} color="#9333ea" />
                  </div>
                  <div className={`${CARD} p-1.5 flex flex-col justify-between`}>
                    <div className="flex items-center justify-between">
                      <div className="text-[7.5px] text-slate-400 font-medium">Avg. Doctor Rating</div>
                      <span className="text-[7.5px] text-slate-400">2,800+ reviews</span>
                    </div>
                    <div className="text-[12px] sm:text-[14px] font-black text-slate-900 leading-none">4.9<span className="text-[8.25px] text-slate-400 font-bold">/5</span></div>
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <motion.span key={s} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + s * 0.08, type: 'spring', stiffness: 400 }}>
                          <Star size={8} className="fill-amber-400 text-amber-400" />
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-12 grid-rows-[minmax(0,1fr)] gap-1.5 sm:gap-2">
                  {/* Rank climb tracks */}
                  <div className={`${CARD} col-span-7 p-2 flex flex-col`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-800">Rank Movement: Before → After Codigix</span>
                      <div className="flex items-center gap-1.5 text-[7px] sm:text-[7.5px] text-slate-500">
                        <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full border border-slate-400 bg-white" /> Before</span>
                        <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Now</span>
                      </div>
                    </div>
                    <div className="flex items-center text-[6.5px] sm:text-[7px] text-slate-400 font-mono mb-0.5">
                      <span className="w-[46%]" />
                      <div className="flex-1 flex justify-between px-0.5">
                        {[6, 5, 4, 3, 2, 1].map((r) => (
                          <span key={r} className={r <= 3 ? 'text-emerald-600 font-bold' : ''}>#{r}</span>
                        ))}
                      </div>
                      <span className="w-6" />
                    </div>
                    <div className="flex-1 min-h-0 flex flex-col justify-around">
                      {gmbRankings.map((row, idx) => {
                        const prev = Math.min(Math.max(row.previous_rank ?? row.rank, 1), 6);
                        const pos = (r: number) => ((6 - r) / 5) * 100;
                        const from = pos(prev);
                        const to = pos(row.rank);
                        const gain = prev - row.rank;
                        return (
                          <div key={idx} className="flex items-center gap-1">
                            <div className="w-[46%] flex items-center gap-1 min-w-0">
                              {row.logo && (
                                <img
                                  src={`/clients/${row.logo}`}
                                  alt={row.client}
                                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-contain bg-white border border-slate-200 shrink-0"
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              )}
                              <div className="min-w-0">
                                <div className="text-[7.75px] sm:text-[8.25px] font-bold text-slate-900 truncate leading-tight" title={row.client}>{row.client}</div>
                                <div className="text-[6.5px] sm:text-[7px] text-slate-400 font-mono truncate leading-tight" title={row.keyword}>"{row.keyword}"</div>
                              </div>
                            </div>
                            <div className="flex-1 relative h-4 mx-0.5">
                              {/* 3-pack zone */}
                              <div className="absolute inset-y-0.5 right-0 left-[60%] -mx-1 rounded bg-emerald-50 border border-emerald-100" />
                              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2" />
                              <motion.div
                                className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-slate-300 to-emerald-500 origin-left"
                                style={{ left: `${from}%`, width: `${to - from}%` }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.15 + idx * 0.08, ease: EASE }}
                              />
                              <span className="absolute top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-400 bg-white" style={{ left: `${from}%` }} />
                              <motion.span
                                className="absolute top-1/2 w-3 h-3 -translate-y-1/2 -ml-[6px] rounded-full bg-emerald-500 border-2 border-white shadow flex items-center justify-center"
                                initial={{ left: `${from}%` }}
                                animate={{ left: `${to}%` }}
                                transition={{ duration: 0.8, delay: 0.15 + idx * 0.08, ease: EASE }}
                              />
                            </div>
                            <span className="w-7 shrink-0 text-right text-[7.5px] sm:text-[7.75px] font-black text-emerald-600">
                              {gain > 0 ? `▲${gain}` : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monthly calls column chart */}
                  <div className={`${CARD} col-span-5 p-2 flex flex-col`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-800">Monthly Calls from Maps</span>
                      <span className="text-[7.5px] font-bold text-blue-700 bg-blue-50 px-1 py-0.5 rounded-full">{totalCalls.toLocaleString('en-IN')} / mo</span>
                    </div>
                    <div className="flex-1 min-h-0 flex items-end justify-between gap-1 border-b border-slate-200 pb-0.5 relative">
                      {[0.33, 0.66].map((t) => (
                        <div key={t} className="absolute left-0 right-0 border-t border-dashed border-slate-100" style={{ bottom: `${t * 100}%` }} />
                      ))}
                      {gmbRankings.map((row, idx) => {
                        const h = (row.monthly_calls / maxCalls) * 100;
                        return (
                          <div key={idx} className="flex-1 h-full flex flex-col items-center justify-end group relative z-10">
                            <span className="text-[7px] sm:text-[7.5px] font-black text-slate-700 mb-0.5">{row.monthly_calls >= 1000 ? `${(row.monthly_calls / 1000).toFixed(1)}K` : row.monthly_calls}</span>
                            <motion.div
                              className={`w-full max-w-[26px] rounded-t-md ${row.rank === 1 ? 'bg-gradient-to-t from-emerald-500 to-teal-300' : 'bg-gradient-to-t from-blue-500 to-sky-300'} group-hover:brightness-110`}
                              initial={{ height: 0 }}
                              animate={{ height: `${h * 0.82}%` }}
                              transition={{ duration: 0.8, delay: 0.1 + idx * 0.07, ease: EASE }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between gap-1 mt-0.5">
                      {gmbRankings.map((row, idx) => (
                        <span key={idx} className="flex-1 text-center text-[6.5px] sm:text-[7px] text-slate-500 font-semibold truncate">{shortClient(row.client)}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[7px] sm:text-[7.5px] text-slate-500">
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-sm bg-emerald-500" /> Rank #1</span>
                      <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-sm bg-blue-500" /> Rank #2</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PAID ADS — donut, funnel, head-to-head */}
            {activeTab === 'ads' && (
              <motion.div
                key="tab-ads"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col gap-1.5"
              >
                <div className="shrink-0 flex items-center justify-between px-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <h3 className="text-[11px] sm:text-[12px] font-bold text-slate-900">
                      Paid Ads Performance & Lead Generation
                    </h3>
                  </div>

                  <div className="flex items-center bg-slate-100 rounded-md p-0.5 text-[7.75px] sm:text-[8.25px]">
                    {([
                      ['all', 'Combined', 'bg-purple-600'],
                      ['google', 'Google Ads', 'bg-blue-600'],
                      ['meta', 'Meta Ads', 'bg-rose-600'],
                    ] as const).map(([key, label, activeBg]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedAdPlatform(key)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer font-bold transition-colors ${
                          selectedAdPlatform === key ? `${activeBg} text-white shadow-2xs` : 'text-slate-500'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4 stat tiles with mini visuals */}
                <div className="shrink-0 grid grid-cols-4 gap-1.5">
                  <div className={`${CARD} p-1.5 sm:p-2`}>
                    <div className="text-[7.5px] sm:text-[7.75px] font-medium text-slate-400">Total Ad Spend</div>
                    <div className="text-[12px] sm:text-[14px] font-black text-[#1a1053]">₹{adView.spend.toLocaleString('en-IN')}</div>
                    <div className="flex h-1.5 rounded-full overflow-hidden mt-1 bg-slate-100">
                      <motion.div className="bg-blue-500" initial={{ width: 0 }} animate={{ width: `${googleSharePct}%`, opacity: selectedAdPlatform === 'meta' ? 0.25 : 1 }} transition={{ duration: 0.8, ease: EASE }} />
                      <motion.div className="bg-rose-500" initial={{ width: 0 }} animate={{ width: `${100 - googleSharePct}%`, opacity: selectedAdPlatform === 'google' ? 0.25 : 1 }} transition={{ duration: 0.8, ease: EASE }} />
                    </div>
                    <div className="flex justify-between text-[7px] text-slate-500 mt-0.5">
                      <span>Google {googleSharePct}%</span>
                      <span>Meta {100 - googleSharePct}%</span>
                    </div>
                  </div>

                  <div className={`${CARD} p-1.5 sm:p-2`}>
                    <div className="text-[7.5px] sm:text-[7.75px] font-medium text-slate-400">Verified Patient Leads</div>
                    <div className="text-[12px] sm:text-[14px] font-black text-purple-700">{adView.leads}</div>
                    <Sparkline values={[52, 58, 61, 55, 66, 70, 64, 72, 78, 74, 82, 86]} color="#9333ea" />
                  </div>

                  <div className={`${CARD} p-1.5 sm:p-2`}>
                    <div className="text-[7.5px] sm:text-[7.75px] font-medium text-slate-400">Cost / Lead vs Industry</div>
                    <div className="text-[12px] sm:text-[14px] font-black text-emerald-700">₹{adView.cpl}</div>
                    <div className="space-y-0.5 mt-0.5">
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-emerald-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${(adView.cpl / INDUSTRY_CPL) * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
                        </div>
                        <span className="text-[6.5px] text-emerald-700 font-bold w-6">Ours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-1.5 bg-rose-200 rounded-full" />
                        <span className="text-[6.5px] text-rose-500 font-bold w-6">₹{INDUSTRY_CPL}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`${CARD} p-1.5 sm:p-2 flex items-center gap-1.5`}>
                    <RadialGauge value={adView.conversion_rate} max={40} color="#2563eb" display={`${adView.conversion_rate}%`} size="w-11 h-11 sm:w-14 sm:h-14" />
                    <div className="min-w-0">
                      <div className="text-[7.5px] sm:text-[7.75px] font-medium text-slate-400 leading-tight">Lead → Consult</div>
                      <div className="text-[9.25px] sm:text-[10.25px] font-black text-blue-700 leading-tight">{adsStats.consultations_booked} Booked</div>
                      <div className="text-[7px] text-slate-500">In-clinic visits</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-12 grid-rows-[minmax(0,1fr)] gap-1.5 sm:gap-2">
                  {/* Lead channel donut */}
                  <div className={`${CARD} col-span-4 p-2 flex flex-col`}>
                    <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-900 mb-1">Lead Channels</span>
                    <div className="flex items-center gap-2 flex-1">
                      <Donut
                        className="w-20 h-20 sm:w-28 sm:h-28"
                        thickness={16}
                        activeIdx={hoverLead}
                        onHover={setHoverLead}
                        segments={adsStats.lead_types.map((l, i) => ({ value: l.count, color: LEAD_COLORS[i % LEAD_COLORS.length] }))}
                      >
                        <span className="text-[12px] sm:text-[14px] font-black text-[#1a1053] leading-none">
                          {hoverLead !== null ? `${adsStats.lead_types[hoverLead].pct}%` : adsStats.total_leads}
                        </span>
                        <span className="text-[6.5px] sm:text-[7px] text-slate-500 font-semibold">{hoverLead !== null ? 'share' : 'leads'}</span>
                      </Donut>
                      <div className="flex-1 space-y-1 min-w-0">
                        {adsStats.lead_types.map((l, i) => {
                          const IconComp = ICONS[l.icon] || Phone;
                          return (
                            <div
                              key={i}
                              onMouseEnter={() => setHoverLead(i)}
                              onMouseLeave={() => setHoverLead(null)}
                              className={`transition-opacity cursor-default ${hoverLead !== null && hoverLead !== i ? 'opacity-40' : ''}`}
                            >
                              <div className="flex items-center gap-1 text-[7.5px] sm:text-[7.75px] font-bold text-slate-800">
                                <IconComp size={7.5} style={{ color: LEAD_COLORS[i % LEAD_COLORS.length] }} />
                                <span className="truncate" title={l.type}>{l.type.replace(/\b(Inbound|Direct|Appointment|Inquiries)\b\s?/g, '').trim()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[7px] text-slate-500 pl-2.5">
                                <span className="font-mono font-bold text-slate-700">{l.count}</span>
                                <span>₹{l.cpl} CPL</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Tapered funnel */}
                  <div className={`${CARD} col-span-4 p-2 flex flex-col`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-900">Patient Funnel</span>
                      <span className="text-[7.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 rounded-full">
                        {adsStats.roas}x ROAS
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-[2px]">
                      {adsStats.funnel_steps.map((fStep, idx) => (
                        <motion.div
                          key={idx}
                          title={`${fStep.step}: ${fStep.count} (${fStep.pct})`}
                          className={`mx-auto h-4 sm:h-[22px] flex items-center justify-center gap-1 text-white ${FUNNEL_BARS[idx % FUNNEL_BARS.length]}`}
                          style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 5px) 100%, 5px 100%)' }}
                          initial={{ width: '0%', opacity: 0 }}
                          animate={{ width: `${FUNNEL_WIDTHS[idx] ?? 40}%`, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease: EASE }}
                        >
                          <span className="text-[7.5px] sm:text-[8.25px] font-black font-mono">{fStep.count}</span>
                          <span className="text-[6.5px] sm:text-[7px] font-semibold opacity-90 truncate">{fStep.step.split(' ').slice(-1)[0]}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-1 pt-1 border-t border-slate-100 text-[7.5px] text-slate-500 text-center">
                      Attributed Revenue: <strong className="text-slate-900">{adsStats.attributed_revenue}</strong>
                    </div>
                  </div>

                  {/* Google vs Meta butterfly chart */}
                  <div className={`${CARD} col-span-4 p-2 flex flex-col`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9.25px] sm:text-[10.25px] font-bold text-slate-900">Google vs Meta</span>
                      <div className="flex items-center gap-1.5 text-[7px] sm:text-[7.5px] font-bold">
                        <span className="flex items-center gap-0.5 text-blue-600"><span className="w-1.5 h-1.5 rounded-sm bg-blue-500" />Google</span>
                        <span className="flex items-center gap-0.5 text-rose-600"><span className="w-1.5 h-1.5 rounded-sm bg-rose-500" />Meta</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-1">
                      {headToHead.map((row, idx) => {
                        const max = Math.max(row.g, row.m) || 1;
                        const gWins = row.lowerBetter ? row.g < row.m : row.g > row.m;
                        return (
                          <div key={idx} className="flex items-center gap-1 text-[7px] sm:text-[7.5px]">
                            <span className={`w-8 text-right font-mono ${gWins ? 'font-black text-blue-700' : 'text-slate-500'}`}>{row.fmt(row.g)}</span>
                            <div className={`flex-1 h-2.5 sm:h-3 flex justify-end transition-opacity ${selectedAdPlatform === 'meta' ? 'opacity-25' : ''}`}>
                              <motion.div className="h-full bg-gradient-to-l from-blue-600 to-blue-300 rounded-l-full" initial={{ width: 0 }} animate={{ width: `${(row.g / max) * 100}%` }} transition={{ duration: 0.7, delay: idx * 0.06, ease: EASE }} />
                            </div>
                            <span className="w-8 text-center font-bold text-slate-700 shrink-0">{row.label}</span>
                            <div className={`flex-1 h-2.5 sm:h-3 transition-opacity ${selectedAdPlatform === 'google' ? 'opacity-25' : ''}`}>
                              <motion.div className="h-full bg-gradient-to-r from-rose-600 to-rose-300 rounded-r-full" initial={{ width: 0 }} animate={{ width: `${(row.m / max) * 100}%` }} transition={{ duration: 0.7, delay: idx * 0.06, ease: EASE }} />
                            </div>
                            <span className={`w-8 font-mono ${!gWins ? 'font-black text-rose-600' : 'text-slate-500'}`}>{row.fmt(row.m)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: ALL-IN-ONE OVERVIEW — growth chart + gauges */}
            {activeTab === 'overview' && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full grid grid-cols-12 grid-rows-[minmax(0,1fr)] gap-1.5 sm:gap-2"
              >
                {/* Growth chart */}
                <div className={`${CARD} col-span-7 p-2 flex flex-col`}>
                  <div className="flex justify-between items-center mb-0.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <h3 className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-800">Patient Growth Trajectory</h3>
                      </div>
                      <div className="flex items-center gap-2 text-[7px] sm:text-[7.5px] text-slate-500 mt-0.5 pl-3">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-[2px] rounded bg-gradient-to-r from-indigo-500 to-blue-600" />{isMilestone ? 'Target' : 'With Codigix'}</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 border-t border-dashed border-slate-400" />{isMilestone ? 'Baseline' : 'Market Avg.'}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 bg-slate-50 p-0.5 rounded-md border border-slate-200 text-[7.5px]">
                      {(['sessions', 'inquiries', 'consults'] as const).map((view) => (
                        <button
                          key={view}
                          type="button"
                          onClick={() => setActiveTrafficView(view)}
                          className={`px-1 py-0.5 rounded capitalize font-medium cursor-pointer transition-colors ${
                            activeTrafficView === view ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'
                          }`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 min-h-0 mt-1">
                    <GrowthChart
                      values={trafficValues}
                      baseline={trafficBaseline}
                      labels={CHART_MONTHS}
                      color={isMilestone ? '#9333ea' : '#2563eb'}
                      format={trafficFormat}
                      animKey={`${dashboardMode}-${activeTrafficView}`}
                    />
                  </div>
                </div>

                <div className="col-span-5 min-h-0 flex flex-col gap-1.5 sm:gap-2">
                  {/* Performance gauges */}
                  <div className={`${CARD} p-2 shrink-0`}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[9.75px] sm:text-[10.25px] font-bold text-slate-800">Performance Scorecard</h4>
                      <span className="text-[7.5px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded-full">{adsStats.roas}x ROAS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <RadialGauge value={94} color="#10b981" display="94%" label="GMB 3-Pack" />
                      <RadialGauge value={adsStats.conversion_rate} max={40} color="#2563eb" display={`${adsStats.conversion_rate}%`} label="Lead → Consult" />
                      <RadialGauge value={96.4} color="#f59e0b" display="96%" label="Retention" />
                    </div>
                  </div>

                  {/* Lead source + field mix stacked bars */}
                  <div className={`${CARD} p-2 flex-1 flex flex-col justify-evenly gap-1.5`}>
                    <div>
                      <div className="flex items-center justify-between text-[8.25px] sm:text-[8.75px] mb-0.5">
                        <span className="font-bold text-slate-800">Lead Sources</span>
                        <button type="button" onClick={() => handleTabClick('ads')} className="text-purple-600 font-bold hover:underline cursor-pointer text-[7.5px]">Ads Funnel →</button>
                      </div>
                      <div className="flex h-3.5 sm:h-4 rounded-full overflow-hidden gap-[1px]">
                        {adsStats.lead_types.map((l, i) => (
                          <motion.div key={i} title={`${l.type}: ${l.pct}%`} style={{ background: LEAD_COLORS[i % LEAD_COLORS.length] }} initial={{ width: 0 }} animate={{ width: `${l.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }} />
                        ))}
                      </div>
                      <div className="flex justify-between text-[7px] text-slate-500 mt-0.5">
                        {adsStats.lead_types.map((l, i) => (
                          <span key={i} className="flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-sm" style={{ background: LEAD_COLORS[i % LEAD_COLORS.length] }} />
                            {l.type.split(' ').find((w) => !/^(Inbound|Direct|Appointment)$/.test(w))} {Math.round(l.pct)}%
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[8.25px] sm:text-[8.75px] mb-0.5">
                        <span className="font-bold text-slate-800">Clients by Field</span>
                        <button type="button" onClick={() => handleTabClick('fields')} className="text-blue-600 font-bold hover:underline cursor-pointer text-[7.5px]">{totalFieldCount}+ Total →</button>
                      </div>
                      <div className="flex h-3.5 sm:h-4 rounded-full overflow-hidden gap-[1px]">
                        {clientsByField.map((f, i) => (
                          <motion.div key={i} title={`${f.short_name}: ${f.count}+`} style={{ background: HEX[f.color] || HEX.blue }} initial={{ width: 0 }} animate={{ width: `${(f.count / totalFieldCount) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: EASE }} />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-1.5 text-[7px] text-slate-500 mt-0.5">
                        {clientsByField.map((f, i) => (
                          <span key={i} className="flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-sm" style={{ background: HEX[f.color] || HEX.blue }} />
                            {f.short_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* 4. Bottom Live Activity / Milestone Ticker */}
      <div className={`border-t px-3 py-1 flex items-center justify-between text-[7px] sm:text-[7.5px] transition-colors ${
        isMilestone
          ? 'bg-slate-950 text-purple-200 border-purple-900/50'
          : 'bg-[#0c1222] text-slate-300 border-slate-800'
      }`}>
        <div className="flex items-center gap-2 truncate">
          <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider shrink-0 ${
            isMilestone ? 'text-purple-400' : 'text-emerald-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isMilestone ? 'bg-purple-400' : 'bg-emerald-400'
            }`} />
            {isMilestone ? 'Targets' : 'Live'}
          </span>
          <span className="text-slate-400 truncate">
            {isMilestone
              ? '+120 Clients Target • 98% Google #1 Maps • 1,250 Ad Leads Goal • ₹42.5L Revenue'
              : '75+ Clients Catered Across 6 Fields • 94% #1 GMB Maps Ranks • 738 Paid Ad Leads (₹114 Avg CPL) • 4.8x ROAS'}
          </span>
        </div>
        <div className="shrink-0 font-mono text-[6.5px] text-slate-400 hidden sm:block">
          VERIFIED DATA • PUNE & PCMC
        </div>
      </div>

    </div>
  );
}

export default memo(HeroDashboard);
