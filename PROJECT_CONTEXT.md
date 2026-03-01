# AllHacks – Project Context

> **Last Updated:** 2026-03-01  
> **Repository:** https://github.com/akshay10-08/hackathons  
> **Live Site:** allhacks.xyz  
> **Status:** Active Development  

---

## 🎯 Project Overview

**AllHacks** is a comprehensive hackathon aggregator platform that consolidates hackathons from **8+ major platforms** into a single, searchable, filterable interface. It saves developers hours of research by providing a unified view of live, upcoming, and past hackathons with advanced filtering, sorting, and search capabilities.

### The Problem It Solves
- Developers waste hours browsing multiple hackathon platforms (Devfolio, DoraHacks, HackerEarth, ETHGlobal, Devpost, etc.)
- No single source of truth for global hackathons
- Hard to filter by prize pool, tech stack, mode (online/offline), status, etc.
- Missing hackathons due to scattered sources

### The Solution
AllHacks aggregates hackathons from multiple sources with:
- **Advanced filtering** (category, status, mode, source, prize pool)
- **Real-time countdown** to deadlines
- **Bookmark system** for tracking favorites
- **Dark mode** support
- **Responsive design** (mobile-first)
- **Community support** system with tipping/donations

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Custom components with shadcn/ui patterns
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Theme:** next-themes (dark mode support)

### Key Libraries
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "^12.34.3",
  "lucide-react": "^0.575.0",
  "next-themes": "^0.4.6",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

### Data Management
- **Current:** Static mock data (`data/mockHackathons.ts`)
- **Future:** Potential API integration with hackathon platforms

---

## 📁 Project Structure

```
hackathons/
├── app/
│   ├── layout.tsx              # Root layout with metadata, fonts, ThemeProvider
│   ├── page.tsx                # Main homepage with filtering & search logic
│   ├── supporters/
│   │   └── page.tsx            # Community supporters wall
│   └── globals.css             # Global styles, Tailwind config
│
├── components/
│   ├── ui/
│   │   ├── Hero.tsx            # Homepage hero section
│   │   ├── Navbar.tsx          # Top navigation with search
│   │   ├── FilterBar.tsx       # Filter/sort controls
│   │   ├── HackathonCard.tsx   # Individual hackathon card
│   │   ├── TipModal.tsx        # Donation/tipping modal
│   │   └── FuelButton.tsx      # Floating "Support" button
│   └── ThemeProvider.tsx       # Dark mode provider wrapper
│
├── data/
│   └── mockHackathons.ts       # Hackathon data (1492 lines, ~100+ hackathons)
│
├── lib/
│   ├── tipping.ts              # Supporter/donation system logic
│   └── utils.ts                # Utility functions (cn, etc.)
│
└── public/
    ├── og-image.png            # Open Graph image for social sharing
    └── *.svg                   # Icons/logos
```

---

## 🎨 Design System

### Color Palette (Neobrutalism Style)
- **Primary Yellow:** `#FFD500` (neo-yellow)
- **Green:** `#00FF85` (neo-green)
- **Blue:** `#00C2FF` (neo-blue)
- **Pink:** `#FF4081` (neo-pink)
- **Cream:** `#FFF8F0` (light mode background)
- **Black:** `#000000` (borders, text)

### Design Philosophy
- **Neobrutalism:** Heavy black borders (3-4px), hard shadows, bold colors
- **Accessibility:** High contrast, readable fonts (Geist Sans/Mono)
- **Responsive:** Mobile-first, works on all screen sizes
- **Dark Mode:** Full support with theme toggle

### Key UI Patterns
- **Cards:** 3px black borders, shadow on hover (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`)
- **Buttons:** Uppercase, bold, border + shadow
- **Badges:** Small, uppercase, color-coded by source/status
- **Animations:** Subtle hover effects, pulse for closing-soon items

---

## 🔥 Core Features

### 1. Hackathon Discovery
- **Search:** Real-time search across title, organizer, description, tags
- **Filter by:**
  - Category (Web3, AI/ML, Cloud, Open Source, etc.)
  - Status (Live, Upcoming, Closing Soon, Past)
  - Mode (Online, Offline, Hybrid)
  - Source (Devfolio, DoraHacks, ETHGlobal, etc.)
- **Sort by:**
  - Prize Pool (high to low / low to high)
  - Deadline (soonest first)
  - Newest
  - Participants count

### 2. Hackathon Card Details
Each card displays:
- **Source badge** (color-coded by platform)
- **Status badge** (Live, Upcoming, Closing Soon, Past)
- **Featured star** (if `isFeatured: true`)
- **Bookmark icon** (persisted in localStorage)
- **Prize pool** (formatted with $ or "Non-cash Prize")
- **Countdown timer** (days/hours/minutes remaining)
- **Tags** (tech stack, categories)
- **Location** (Online/Offline/Hybrid + city)
- **Participants count** (if available)
- **Team size** (e.g., "1-5 members")
- **Skill level** (Beginner, Intermediate, Advanced, All)
- **Apply button** (redirects to official hackathon page)

### 3. Bookmark System
- **Client-side persistence:** Uses `localStorage`
- **Key format:** `bookmark-{hackathonId}`
- **Toggle on/off:** Click bookmark icon on card
- **Future enhancement:** Could add a "My Bookmarks" page

### 4. Community Support System
- **Supporters Wall:** `/supporters` page
- **Tipping Modal:** Accessible via floating "Fuel" button
- **Badge Tiers:**
  - 💙 **Supporter** ($1-9)
  - 🚀 **Super Supporter** ($10-24)
  - 🏆 **Ultimate Hacker** ($25+)
- **Monthly Goal:** $500 (progress bar on supporters page)
- **LocalStorage-based:** Stored in `allhacks-supporters` key
- **Anonymous option:** Supporters can hide their name
- **Wallet Address:** `0x1a2B3c4D5e6F7890aBcDeF1234567890AbCdEf12` (example)

### 5. Dark Mode
- **Provider:** `next-themes`
- **Toggle:** In Navbar (system/light/dark)
- **Persistent:** Saves preference to localStorage
- **Colors:** Custom dark mode colors in `globals.css`

---

## 📊 Data Model

### Hackathon Interface
```typescript
interface Hackathon {
  id: string;                    // Unique identifier
  title: string;                 // Hackathon name
  organizer: string;             // Organizing entity
  source: 'devfolio' | 'dorahacks' | 'hackerearth' | 'ethglobal' | 'devpost' | 'solana' | 'encode' | 'lablab' | 'hackclub' | 'mlh';
  prizePool: string;             // Display string (e.g., "$50,000")
  prizePoolValue: number;        // Numeric value for sorting
  description: string;           // Short description
  tags: string[];                // Categories/tech stack
  startDate: string;             // ISO 8601 date
  endDate: string;               // ISO 8601 date
  registrationDeadline: string;  // ISO 8601 date
  applyUrl: string;              // Official hackathon URL
  isFeatured: boolean;           // Show star badge
  status: 'live' | 'upcoming' | 'past' | 'closing-soon';
  mode: 'online' | 'offline' | 'hybrid';
  location: string;              // City or "Global"
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
  teamSize: string;              // e.g., "1-5"
  participants?: number;         // Optional participant count
}
```

### Supporter Interface
```typescript
interface Supporter {
  id: string;                    // UUID
  displayName: string;           // Name or "Anonymous"
  amount: number;                // Donation amount
  badgeTier: BadgeTier;          // "supporter" | "super" | "ultimate"
  date: string;                  // ISO 8601 timestamp
  anonymous: boolean;            // Hide name?
  message?: string;              // Optional supporter message
}
```

---

## 🔄 Data Sources

Currently aggregates from **8+ platforms:**

1. **Devfolio** (India-focused, student hackathons)
2. **DoraHacks** (Web3, crypto hackathons)
3. **HackerEarth** (Corporate, enterprise hackathons)
4. **ETHGlobal** (Ethereum ecosystem)
5. **Devpost** (General-purpose, largest platform)
6. **Solana** (Solana blockchain hackathons)
7. **Encode Club** (Web3 education + hackathons)
8. **Lablab.ai** (AI/ML hackathons)
9. **Hack Club** (High school hackathons)
10. **MLH** (Major League Hacking)

### Data Format
- **Current:** Static TypeScript array in `data/mockHackathons.ts`
- **Future:** Could integrate APIs from platforms (Devpost has public API)
- **Update frequency:** Manual updates for now

---

## 🎯 Key Components Breakdown

### 1. **app/page.tsx** (Main Homepage)
**Purpose:** Main hackathon discovery interface

**State Management:**
- `selectedCategory` – Current category filter
- `selectedStatus` – Status filter (live/upcoming/etc.)
- `selectedMode` – Mode filter (online/offline/hybrid)
- `selectedSource` – Platform filter
- `sortBy` – Sort preference
- `searchQuery` – Search input text

**Key Logic:**
```typescript
const filteredAndSorted = useMemo(() => {
  // 1. Filter by search query (title, organizer, description, tags)
  // 2. Filter by category
  // 3. Filter by status
  // 4. Filter by mode
  // 5. Filter by source
  // 6. Sort by selected criteria
  return result;
}, [selectedCategory, selectedStatus, selectedMode, selectedSource, sortBy, searchQuery]);
```

### 2. **components/ui/HackathonCard.tsx**
**Purpose:** Display individual hackathon with all details

**Features:**
- Countdown timer (custom `useCountdown` hook)
- Bookmark toggle (persists to localStorage)
- Color-coded status badges
- Responsive layout
- Hover effects (lift + shadow)

### 3. **components/ui/FilterBar.tsx**
**Purpose:** Filter controls for hackathon discovery

**Filters:**
- Category dropdown (Web3, AI/ML, Cloud, etc.)
- Status dropdown (Live, Upcoming, etc.)
- Mode dropdown (Online, Offline, Hybrid)
- Source dropdown (Platform selection)
- Sort dropdown (Prize, Deadline, Newest, Participants)

### 4. **components/ui/TipModal.tsx**
**Purpose:** Donation/support modal

**Flow:**
1. User clicks "Fuel" button
2. Modal opens with preset amounts ($3, $10, $25, custom)
3. User enters name (optional anonymous)
4. User adds message (optional)
5. "Send Tip" → Saves to localStorage
6. Wallet address displayed for crypto donations

### 5. **lib/tipping.ts**
**Purpose:** Supporter system logic

**Functions:**
- `getBadgeTier(amount)` → Determine badge tier
- `getSupporters()` → Fetch from localStorage
- `addSupporter(data)` → Add new supporter
- `getSortedSupporters()` → Sort by date (newest first)
- `getTotalCount()` → Count total supporters
- `getMonthlyRaised()` → Calculate current month total

---

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/akshay10-08/hackathons.git
cd hackathons
npm install
```

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Build
```bash
npm run build
npm start
```

### Deployment
- **Recommended:** Vercel (optimized for Next.js)
- **Alternative:** Netlify, Cloudflare Pages, Railway

---

## 🔧 Configuration

### Fonts
- **Primary:** Geist Sans (optimized by `next/font`)
- **Monospace:** Geist Mono

### Metadata (SEO)
- **Title:** "AllHacks – Discover Every Hackathon"
- **Description:** "Aggregating live and upcoming hackathons from 8+ platforms"
- **OG Image:** `/og-image.png` (1200×630px)
- **Twitter Card:** summary_large_image

### Environment Variables
Currently none required (static data).

**Future considerations:**
- `NEXT_PUBLIC_API_URL` – If integrating with hackathon APIs
- `NEXT_PUBLIC_WALLET_ADDRESS` – For crypto donations
- Analytics keys (Plausible, Fathom, etc.)

---

## 📝 Data Management

### Adding New Hackathons
1. Open `data/mockHackathons.ts`
2. Add new entry to `hackathons` array:
```typescript
{
  id: "unique-id-here",
  title: "Hackathon Name",
  organizer: "Organizer Name",
  source: "devfolio", // or other source
  prizePool: "$50,000",
  prizePoolValue: 50000,
  description: "Short description...",
  tags: ["Web3", "AI", "Open Source"],
  startDate: "2026-04-01",
  endDate: "2026-04-15",
  registrationDeadline: "2026-03-31",
  applyUrl: "https://hackathon-url.com",
  isFeatured: false,
  status: "upcoming",
  mode: "online",
  location: "Global",
  skillLevel: "all",
  teamSize: "1-4",
  participants: 0
}
```

### Updating Status
Hackathons don't auto-update status. Manually change `status` field:
- `upcoming` → `live` when hackathon starts
- `live` → `closing-soon` when deadline is <7 days
- `closing-soon` → `past` when deadline passes

**Automation idea:** Could add a cron job to auto-update status based on dates.

---

## 🎨 Styling Guide

### Tailwind Custom Classes
```css
/* Light mode background */
.bg-cream { background: #FFF8F0; }

/* Neobrutalism colors */
.bg-neo-yellow { background: #FFD500; }
.bg-neo-green { background: #00FF85; }
.bg-neo-blue { background: #00C2FF; }
.bg-neo-pink { background: #FF4081; }

/* Brutal shadow (used on hover) */
.shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
```

### Dark Mode
Dark mode uses CSS variables defined in `globals.css`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ffffff;
  }
}
```

Components use `dark:` variants:
```tsx
className="bg-cream dark:bg-dark-bg border-black dark:border-white/20"
```

---

## 🐛 Known Issues / Future Improvements

### Current Limitations
1. **Static data:** No real-time updates from platforms
2. **Manual curation:** Adding hackathons requires code changes
3. **No user accounts:** Bookmarks only in localStorage
4. **No backend:** Everything is client-side
5. **Tipping is demo:** Wallet address is placeholder

### Planned Features
- [ ] **API integration:** Auto-fetch from Devpost, MLH APIs
- [ ] **User accounts:** Save bookmarks across devices
- [ ] **Email alerts:** Notify when new hackathons match filters
- [ ] **Calendar export:** .ics files for deadlines
- [ ] **Advanced search:** Fuzzy search, regex support
- [ ] **Mobile app:** React Native / PWA version
- [ ] **Actual payment:** Real crypto/fiat donation system
- [ ] **Admin dashboard:** Manage hackathons without editing code
- [ ] **Scraper bots:** Auto-update hackathon data daily
- [ ] **Community features:** Comments, reviews, ratings

---

## 💡 Architecture Decisions

### Why Static Data?
- **Simplicity:** No backend needed, fast deployment
- **Reliability:** No API downtime issues
- **Cost:** Free hosting (Vercel free tier)
- **Speed:** Instant page loads, no DB queries

**Trade-off:** Manual updates required

### Why Client-Side Filtering?
- **Performance:** Fast for <500 hackathons
- **UX:** Instant results, no loading states
- **Simplicity:** No server logic needed

**Trade-off:** All data loads upfront (not ideal for 1000+ items)

### Why localStorage for Bookmarks?
- **No auth needed:** Works immediately
- **Privacy:** Data stays on user's device
- **Speed:** Instant save/load

**Trade-off:** Lost if user clears browser data

---

## 🧪 Testing Checklist

When making changes, test:
- [ ] All filters work correctly
- [ ] Search returns relevant results
- [ ] Sorting updates instantly
- [ ] Bookmarks persist after refresh
- [ ] Countdown timers update correctly
- [ ] Dark mode toggles properly
- [ ] Mobile responsive (375px - 1920px)
- [ ] Cards display correctly (truncated text, proper spacing)
- [ ] External links open in new tab
- [ ] Supporters page updates after "tipping"

---

## 📚 Learning Resources

If you're new to the stack:
- **Next.js 14+:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **TypeScript:** https://www.typescriptlang.org/docs

---

## 🤝 Contributing

Currently a personal project, but open to contributions:
1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📜 License

Not specified in repo. Assumed open-source.

---

## 🔗 Links

- **Live Site:** https://allhacks.xyz
- **GitHub:** https://github.com/akshay10-08/hackathons
- **Twitter:** (Add if exists)
- **Discord:** (Add if exists)

---

## 🗒️ Quick Reference

### File to Component Map
| File | Purpose |
|------|---------|
| `app/page.tsx` | Main homepage with filters |
| `components/ui/HackathonCard.tsx` | Individual hackathon card |
| `components/ui/FilterBar.tsx` | Filter/sort controls |
| `components/ui/Navbar.tsx` | Top nav + search |
| `data/mockHackathons.ts` | Hackathon data |
| `lib/tipping.ts` | Supporter system logic |

### Common Tasks
| Task | Files to Edit |
|------|---------------|
| Add hackathon | `data/mockHackathons.ts` |
| Change colors | `app/globals.css` |
| Update metadata | `app/layout.tsx` |
| Modify filters | `app/page.tsx`, `components/ui/FilterBar.tsx` |
| Change card design | `components/ui/HackathonCard.tsx` |

---

## 💭 Project Philosophy

**AllHacks** is built on the principle of:
1. **Aggregation over curation:** Show everything, let users filter
2. **Speed over features:** Fast UX > complex backend
3. **Accessibility over aesthetics:** Readable, usable, inclusive
4. **Community over monetization:** Free for all, optional support

---

**Last updated by aura10x on 2026-03-01**

For questions or updates to this doc, ping me in Telegram or edit this file directly.
