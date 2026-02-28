"use client";

import { Hackathon, SOURCE_LABELS } from "@/data/mockHackathons";
import { ArrowUpRight, Calendar, Star, Clock, MapPin, Users, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) return "Ended";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 30) return `${days}d left`;
      if (days > 0) return `${days}d ${hours}h left`;
      if (hours > 0) return `${hours}h ${mins}m left`;
      return `${mins}m left`;
    };

    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const STATUS_STYLES: Record<string, string> = {
  live: "bg-neo-green text-black",
  upcoming: "bg-neo-blue text-black",
  "closing-soon": "bg-neo-pink text-black animate-pulse",
  past: "bg-black/20 dark:bg-white/20 text-black/60 dark:text-white/60",
};

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const countdown = useCountdown(hackathon.endDate);
  const [bookmarked, setBookmarked] = useState(false);
  const source = SOURCE_LABELS[hackathon.source];

  useEffect(() => {
    const saved = localStorage.getItem(`bookmark-${hackathon.id}`);
    if (saved) setBookmarked(true);
  }, [hackathon.id]);

  const toggleBookmark = () => {
    if (bookmarked) {
      localStorage.removeItem(`bookmark-${hackathon.id}`);
    } else {
      localStorage.setItem(`bookmark-${hackathon.id}`, "true");
    }
    setBookmarked(!bookmarked);
  };

  return (
    <div className="group border-[3px] border-black dark:border-white/20 bg-cream dark:bg-dark-bg flex flex-col h-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:-translate-y-1 transition-all duration-300 relative">
      {/* Top Banner: Source + Status + Bookmark */}
      <div className="flex items-center justify-between px-4 py-2 border-b-[3px] border-black dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black text-white"
            style={{ backgroundColor: source?.color || "#666" }}
          >
            {source?.name || hackathon.source}
          </span>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black ${STATUS_STYLES[hackathon.status]}`}>
            {hackathon.status === 'closing-soon' ? '⚡ Closing' : hackathon.status}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {hackathon.isFeatured && (
            <Star fill="#FFD500" stroke="#000" size={18} strokeWidth={2} />
          )}
          <button onClick={toggleBookmark} className="p-1 hover:scale-110 transition-transform cursor-pointer">
            {bookmarked ? (
              <BookmarkCheck size={18} className="text-neo-yellow" fill="#FFD500" />
            ) : (
              <Bookmark size={18} className="text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-1">
          {hackathon.organizer}
        </p>
        <h3 className="text-lg font-black uppercase leading-tight mb-3 line-clamp-2 text-black dark:text-white">
          {hackathon.title}
        </h3>

        {/* Prize */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="bg-neo-yellow text-black font-black text-sm px-3 py-1 border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {hackathon.prizePool}
          </span>
        </div>

        {/* Description */}
        <p className="text-black/60 dark:text-white/60 text-xs font-medium leading-relaxed mb-3 line-clamp-3 flex-grow">
          {hackathon.description}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1 text-[10px] font-bold text-black/50 dark:text-white/50">
            <MapPin size={12} />
            <span className="truncate">{hackathon.location}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-black/50 dark:text-white/50">
            <Users size={12} />
            <span>{hackathon.mode} · {hackathon.teamSize}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-black/50 dark:text-white/50">
            <Calendar size={12} />
            <span>{new Date(hackathon.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-black/50 dark:text-white/50">
            <Clock size={12} />
            <span className={hackathon.status === 'closing-soon' ? 'text-neo-pink font-black' : ''}>
              {countdown}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hackathon.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white px-1.5 py-0.5">
              {tag}
            </span>
          ))}
          {hackathon.tags.length > 3 && (
            <span className="text-[9px] font-bold text-black/40 dark:text-white/40">+{hackathon.tags.length - 3}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t-[3px] border-black dark:border-white/20 flex items-center justify-between">
        {hackathon.participants && (
          <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase">
            {hackathon.participants.toLocaleString()} joined
          </span>
        )}
        {!hackathon.participants && <span />}
        <a
          href={hackathon.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-neo-yellow text-black border-[2px] border-black px-4 py-1.5 font-black uppercase text-xs flex items-center gap-1 hover:bg-neo-pink hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:scale-105"
        >
          Apply <ArrowUpRight size={14} strokeWidth={3} />
        </a>
      </div>
    </div>
  );
}
