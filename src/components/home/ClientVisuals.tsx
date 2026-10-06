"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Youtube, Video } from 'lucide-react';
import Link from 'next/link';
import type { Video as VideoItem } from '@/lib/types';
import { defaultVideos } from '@/lib/defaults';
import { mediaUrl } from '@/lib/config';


const VideoCard = ({ video, isActive, onActivate }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Stop playing if card becomes inactive
  useEffect(() => {
    if (!isActive && isPlaying) {
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActivate();
    setIsPlaying(true);
  };

  const handleClosePlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={`snap-center shrink-0 w-[260px] md:w-[250px] rounded-[24px] overflow-hidden transition-all duration-500 cursor-pointer flex flex-col ${isActive
        ? 'bg-white shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)] ring-2 ring-blue-500 transform -translate-y-2'
        : 'bg-white shadow-md border border-slate-100'
        }`}
    >
      {/* Video Thumbnail / Live YouTube Embed Area - Click Anywhere to Play */}
      <div
        onClick={!isPlaying ? handlePlayClick : undefined}
        className="relative h-[320px] w-full overflow-hidden p-1.5 pb-0 rounded-t-[24px] cursor-pointer group"
      >
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950">

          {isPlaying ? (
            <div className="relative w-full h-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtube_id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                className="w-full h-full object-cover border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* Floating Close / Minimize Button */}
              <button
                onClick={handleClosePlayer}
                className="absolute top-2 right-2 z-30 bg-black/70 hover:bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-105"
              >
                ✕ Close
              </button>
            </div>
          ) : (
            <>
              {/* High-res YouTube Thumbnail */}
              <img
                src={mediaUrl(video.thumbnail) || `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                alt={video.title}
                className="object-cover w-full h-full opacity-90 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Subtle Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* YouTube Shorts Indicator Badge */}
              <div className="absolute top-3 left-3 bg-[#e20b27]/90 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Youtube size={10} fill="white" />
                <span>Shorts</span>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-normal px-2 py-0.5 rounded-full border border-white/10">
                {video.duration}
              </div>

              {/* Subtle, Compact Play Icon in Center (Non-intrusive) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-black/60 shadow-lg">
                  <Play fill="white" className="text-white ml-0.5" size={15} />
                </div>
              </div>

              {/* Text content over image (bottom) */}
              <div className="absolute left-0 bottom-3 w-full px-4 pointer-events-none">
                <p className="text-pink-300 text-[10px] font-medium mb-0.5 tracking-wider uppercase">{video.category}</p>
                <h3 className="text-white text-sm font-semibold leading-tight drop-shadow-sm">{video.title}</h3>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Bottom Card Content */}
      <div className="p-4 bg-white rounded-b-[24px] flex-1">
        <h4 className="text-[#1a1053] font-semibold text-[13px] mb-0.5">{video.subtitle}</h4>
        <p className="text-slate-500 text-[11px] font-light">{video.description}</p>
      </div>

    </motion.div>
  );
};

export default function ClientVisuals({ videos = defaultVideos }: { videos?: VideoItem[] }) {
  const videosData = videos;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState(videos[Math.min(2, videos.length - 1)]?.id ?? 0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#f8f9ff] overflow-visible relative">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-white rounded-full opacity-60 blur-3xl mix-blend-overlay" />
        <div className="absolute top-20 -right-20 w-[600px] h-[600px] bg-blue-100/50 rounded-full opacity-40 blur-3xl mix-blend-overlay" />
      </div>

      <div className=" mx-auto px-4 lg:px-8  relative z-10 max-w-7xl">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">

          {/* Left Content */}
          <div className="lg:w-1/3 shrink-0 flex flex-col justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, transform: "translate(0px, 20px)" }}
              whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-3.5">
                <Video size={13} className="text-[#e20b27] animate-pulse" />
                <span className="text-xs font-semibold text-[#1a1053] tracking-wide">
                  Patient & Doctor Media · Video Production
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1a1053] tracking-tight leading-[1.15] mb-4">
                Healthcare Stories <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
                  in Motion
                </span>
              </h2>

              <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed mb-4 max-w-md">
                High-trust patient video testimonials, doctor FAQ shorts, and clinic walk-throughs designed for Instagram & YouTube.
              </p>

              <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed mb-8 max-w-md">
                Authentic medical video production builds profound patient trust before they even step into your clinic.
              </p>

              <div className="flex items-center gap-4">
                <Link href="/social-media-marketing" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1053] hover:bg-[#25186f] text-white rounded-full font-medium text-sm transition-all shadow-md">
                  <span>Explore Video Services</span> <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Carousel */}
          <div className="lg:w-2/3 w-full relative pt-4 pb-8">

            {/* Top Navigation Controls */}
            <div className="flex justify-between items-center mb-6 pl-2 pr-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-light text-slate-500">Click any card to play video preview</span>
              </div>

              <div className="flex gap-2 relative z-20">
                <button onClick={() => scroll('left')} aria-label="Previous video" className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-xs flex items-center justify-center hover:bg-blue-50 transition-colors border border-slate-200">
                  <ArrowLeft size={16} />
                </button>
                <button onClick={() => scroll('right')} aria-label="Next video" className="w-10 h-10 rounded-full bg-[#1a1053] text-white shadow-sm flex items-center justify-center hover:bg-[#25186f] transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6 pt-2 px-1"
            >
              {videosData.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isActive={activeVideo === video.id}
                  onActivate={() => setActiveVideo(video.id)}
                />
              ))}
            </div>

            {/* Bottom Indicators */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="flex items-center gap-1.5">
                {videosData.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVideo(v.id)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeVideo === v.id ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Go to video ${v.id}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                <Youtube size={15} />
                <span>See YouTube & Instagram Campaigns</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
