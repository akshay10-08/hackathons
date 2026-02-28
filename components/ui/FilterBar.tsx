"use client";

import { CATEGORIES, SORT_OPTIONS } from "@/data/mockHackathons";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (c: string) => void;
  selectedStatus: string;
  onSelectStatus: (s: string) => void;
  selectedMode: string;
  onSelectMode: (m: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  selectedSource: string;
  onSelectSource: (s: string) => void;
}

const STATUSES = ["All", "live", "upcoming", "closing-soon", "past"];
const MODES = ["All", "online", "offline", "hybrid"];
const SOURCES = ["All", "devfolio", "dorahacks", "hackerearth", "ethglobal", "devpost", "solana", "encode", "lablab"];

export function FilterBar(props: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const hasActiveFilters = props.selectedCategory !== "All" || props.selectedStatus !== "All" || props.selectedMode !== "All" || props.selectedSource !== "All";

  const catBtn = (category: string) => (
    <button
      key={category}
      onClick={() => props.onSelectCategory(category)}
      className={`px-3 py-1.5 font-bold uppercase text-xs border-[2px] transition-all cursor-pointer ${
        props.selectedCategory === category
          ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] -translate-y-0.5"
          : "bg-cream dark:bg-dark-bg text-black dark:text-white border-black dark:border-white/30 hover:bg-neo-yellow hover:text-black hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
      }`}
    >
      {category}
    </button>
  );

  return (
    <div className="border-b-[3px] border-black dark:border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top Row: Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.slice(0, 8).map(category => catBtn(category))}
          {CATEGORIES.length > 8 && (
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-3 py-1.5 font-bold uppercase text-xs border-[2px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white hover:bg-neo-pink hover:text-black hover:border-black transition-all cursor-pointer flex items-center gap-1"
            >
              +{CATEGORIES.length - 8} more <ChevronDown size={12} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
        
        {/* Expanded Categories */}
        {showAdvanced && (
          <div className="flex flex-wrap gap-2 mb-4 pl-2 border-l-4 border-neo-yellow">
            {CATEGORIES.slice(8).map(category => catBtn(category))}
          </div>
        )}

        {/* Bottom Row: Status + Mode + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Status Selector */}
            <div className="flex items-center gap-1">
              {STATUSES.map(status => (
                <button
                  key={status}
                  onClick={() => props.onSelectStatus(status)}
                  className={`px-2.5 py-1 font-bold text-xs uppercase border-[2px] transition-all cursor-pointer ${
                    props.selectedStatus === status
                      ? status === 'live' ? "bg-neo-green text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : status === 'closing-soon' ? "bg-neo-pink text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                      : "border-black/20 dark:border-white/20 text-black/50 dark:text-white/50 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                  }`}
                >
                  {status === 'closing-soon' ? '⚡ Closing' : status === 'live' ? '🟢 Live' : status}
                </button>
              ))}
            </div>

            <span className="text-black/20 dark:text-white/20 font-bold hidden sm:block">|</span>

            {/* Mode filter */}
            <div className="flex items-center gap-1">
              {MODES.map(mode => (
                <button
                  key={mode}
                  onClick={() => props.onSelectMode(mode)}
                  className={`px-2.5 py-1 font-bold text-xs uppercase border-[2px] transition-all cursor-pointer ${
                    props.selectedMode === mode
                      ? "bg-neo-blue text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "border-black/20 dark:border-white/20 text-black/50 dark:text-white/50 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <span className="text-black/20 dark:text-white/20 font-bold hidden sm:block">|</span>

            {/* Source filter */}
            <select 
              value={props.selectedSource}
              onChange={(e) => props.onSelectSource(e.target.value)}
              className="px-2.5 py-1.5 font-bold text-xs uppercase border-[2px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white cursor-pointer focus:outline-none"
            >
              <option value="All">All Sources</option>
              {SOURCES.filter(s => s !== 'All').map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={() => { 
                  props.onSelectCategory("All"); 
                  props.onSelectStatus("All"); 
                  props.onSelectMode("All");
                  props.onSelectSource("All");
                }}
                className="px-2.5 py-1.5 font-bold text-xs uppercase border-[2px] border-neo-pink text-neo-pink hover:bg-neo-pink hover:text-black transition-all cursor-pointer flex items-center gap-1"
              >
                <X size={12} /> Clear
              </button>
            )}
            
            {/* Sort */}
            <div className="flex items-center gap-1">
              <SlidersHorizontal size={14} className="text-black/50 dark:text-white/50" />
              <select 
                value={props.sortBy}
                onChange={(e) => props.onSortChange(e.target.value)}
                className="px-2.5 py-1.5 font-bold text-xs uppercase border-[2px] border-black dark:border-white/30 bg-cream dark:bg-dark-bg text-black dark:text-white cursor-pointer focus:outline-none"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
