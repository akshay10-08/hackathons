"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import {
  getSortedSupporters,
  getTotalCount,
  getMonthlyRaised,
  BADGE_INFO,
  MONTHLY_GOAL,
  type Supporter,
} from "@/lib/tipping";

export default function SupportersPage() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [monthlyRaised, setMonthlyRaised] = useState(0);

  useEffect(() => {
    setSupporters(getSortedSupporters());
    setTotalCount(getTotalCount());
    setMonthlyRaised(getMonthlyRaised());
  }, []);

  const progressPercent = Math.min((monthlyRaised / MONTHLY_GOAL) * 100, 100);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b-4 border-black dark:border-white/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Hackathons
            </Link>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black dark:text-white mb-3">
              Community Wall
              <br />
              <span className="bg-neo-yellow text-black px-3 py-0.5 inline-block border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] mt-2 transform -rotate-1">
                of Supporters
              </span>
            </h1>
            <p className="text-sm font-medium text-black/60 dark:text-white/60 mt-6 max-w-md mx-auto">
              These amazing people have helped keep AllHacks running. Thank you! 💙
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Heart size={16} fill="#FF4081" className="text-neo-pink" />
                <span className="text-sm font-bold text-black/60 dark:text-white/60">
                  <span className="text-black dark:text-white font-black">{totalCount.toLocaleString()}</span> Supporters
                </span>
              </div>
              <div className="w-full max-w-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">
                  <span>🎯 Goal: ${MONTHLY_GOAL}</span>
                  <span>Raised: ${monthlyRaised}</span>
                </div>
                <div className="h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-neo-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporters Grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
          {supporters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supporters.map((supporter, index) => {
                const badge = BADGE_INFO[supporter.badgeTier];
                return (
                  <motion.div
                    key={supporter.id}
                    className="border-[3px] border-black dark:border-white/20 bg-cream dark:bg-dark-bg p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:-translate-y-1 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-black text-sm uppercase text-black dark:text-white">
                          {supporter.anonymous ? "Anonymous" : supporter.displayName}
                        </p>
                        <p className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase">
                          {new Date(supporter.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black whitespace-nowrap"
                        style={{ backgroundColor: badge.color }}
                      >
                        {badge.emoji} {badge.label}
                      </span>
                    </div>
                    {supporter.message && (
                      <p className="text-xs font-medium text-black/60 dark:text-white/60 mt-2 italic">
                        &ldquo;{supporter.message}&rdquo;
                      </p>
                    )}
                    <div className="mt-2 text-right">
                      <span className="bg-neo-yellow text-black font-black text-xs px-2 py-0.5 border-2 border-black">
                        ${supporter.amount}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center border-[3px] border-black dark:border-white/20 border-dashed">
              <h3 className="text-2xl font-black uppercase mb-2 text-black dark:text-white">
                No Supporters Yet
              </h3>
              <p className="font-medium text-black/60 dark:text-white/60">
                Be the first to fuel this platform! 🚀
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black dark:border-white/20 bg-black dark:bg-white/5 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-[10px] text-white/30 font-bold uppercase">
            Built with ♥ — AllHacks © 2026
          </p>
        </div>
      </footer>
    </>
  );
}
