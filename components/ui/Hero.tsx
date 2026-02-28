import { hackathons } from "@/data/mockHackathons";

export function Hero() {
  const liveCount = hackathons.filter(h => h.status === 'live' || h.status === 'closing-soon').length;
  const upcomingCount = hackathons.filter(h => h.status === 'upcoming').length;
  const totalPrize = hackathons.reduce((sum, h) => sum + h.prizePoolValue, 0);
  const sources = new Set(hackathons.map(h => h.source)).size;

  const formatPrize = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M+`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K+`;
    return `$${val}`;
  };

  return (
    <div className="border-b-4 border-black dark:border-white/20 w-full">
      {/* Hero Title */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-block bg-neo-yellow text-black font-bold px-4 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6 uppercase tracking-wider text-xs transform -rotate-1">
          ✨ Updated March 2026
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.9] text-black dark:text-white">
          Hackathon
          <br />
          <span className="bg-neo-yellow text-black px-3 py-0.5 inline-block border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-3 transform rotate-1">
            Database
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-base sm:text-lg mb-0 font-medium text-black/60 dark:text-white/60 mt-8">
          Discover <strong className="text-black dark:text-white font-bold">live & upcoming</strong> hackathons from{" "} 
          <strong className="text-black dark:text-white font-bold">{sources} platforms</strong>. All in one place.
        </p>
      </div>
      
      {/* Stats Bar */}
      <div className="border-t-4 border-black dark:border-white/20 bg-black dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-white dark:text-white">
          <div>
            <div className="text-2xl sm:text-3xl font-black">{hackathons.length}</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60">Total Hackathons</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neo-green">{liveCount}</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60">Live Now</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neo-blue">{upcomingCount}</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60">Upcoming</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neo-yellow">{formatPrize(totalPrize)}</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60">Est. Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}
