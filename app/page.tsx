"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { FilterBar } from "@/components/ui/FilterBar";
import { HackathonCard } from "@/components/ui/HackathonCard";
import { hackathons, Hackathon } from "@/data/mockHackathons";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [sortBy, setSortBy] = useState("prize-desc");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSorted = useMemo(() => {
    const result = hackathons.filter(h => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches = h.title.toLowerCase().includes(q)
          || h.organizer.toLowerCase().includes(q)
          || h.description.toLowerCase().includes(q)
          || h.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== "All" && !h.tags.includes(selectedCategory)) return false;

      // Status
      if (selectedStatus !== "All" && h.status !== selectedStatus) return false;

      // Mode
      if (selectedMode !== "All" && h.mode !== selectedMode) return false;

      // Source
      if (selectedSource !== "All" && h.source !== selectedSource) return false;

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "prize-desc":
          return b.prizePoolValue - a.prizePoolValue;
        case "prize-asc":
          return a.prizePoolValue - b.prizePoolValue;
        case "deadline":
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case "newest":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "participants":
          return (b.participants || 0) - (a.participants || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategory, selectedStatus, selectedMode, selectedSource, sortBy, searchQuery]);

  const resetAll = () => {
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedMode("All");
    setSelectedSource("All");
    setSearchQuery("");
  };

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-1">
        <Hero />
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedSource={selectedSource}
          onSelectSource={setSelectedSource}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-bold text-black/50 dark:text-white/50 uppercase tracking-wider">
              Showing {filteredAndSorted.length} of {hackathons.length} hackathons
            </p>
          </div>

          {filteredAndSorted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSorted.map(hackathon => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-[3px] border-black dark:border-white/20 border-dashed">
              <h3 className="text-2xl font-black uppercase mb-2 text-black dark:text-white">No Hackathons Found</h3>
              <p className="font-medium text-black/60 dark:text-white/60">Try adjusting your filters or search query.</p>
              <button
                onClick={resetAll}
                className="mt-6 inline-block bg-neo-yellow text-black border-[3px] border-black px-6 py-2 font-bold uppercase hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black dark:border-white/20 bg-black dark:bg-white/5 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-black uppercase text-lg mb-2">AllHacks</h4>
              <p className="text-xs text-white/50 font-medium">
                Aggregating hackathons from 8+ platforms to save you hours of research.
              </p>
            </div>
            <div>
              <h5 className="font-bold uppercase text-sm mb-2">Sources</h5>
              <div className="flex flex-wrap gap-1">
                {["Devfolio", "DoraHacks", "HackerEarth", "ETHGlobal", "Devpost", "Solana", "Encode Club", "Lablab.ai"].map(s => (
                  <span key={s} className="text-[10px] font-bold bg-white/10 px-2 py-0.5 uppercase">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold uppercase text-sm mb-2">Note</h5>
              <p className="text-[10px] text-white/40 font-medium">
                All hackathon data is sourced from public information. Clicking &quot;Apply&quot; redirects you to the official hackathon page.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-4 text-center">
            <p className="text-[10px] text-white/30 font-bold uppercase">
              Built with ♥ — AllHacks © 2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
