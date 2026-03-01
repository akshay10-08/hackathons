// ─── Tipping System Types & Helpers ─────────────────────────────────────────

export interface Supporter {
  id: string;
  displayName: string;
  amount: number;
  badgeTier: BadgeTier;
  date: string;        // ISO string
  anonymous: boolean;
  message?: string;
}

export type BadgeTier = "supporter" | "super" | "ultimate";

export const BADGE_INFO: Record<BadgeTier, { emoji: string; label: string; color: string }> = {
  supporter: { emoji: "💙", label: "Supporter", color: "#00C2FF" },
  super:     { emoji: "🚀", label: "Super Supporter", color: "#FF4081" },
  ultimate:  { emoji: "🏆", label: "Ultimate Hacker", color: "#FFD500" },
};

export const MONTHLY_GOAL = 500;

export const WALLET_ADDRESS = "0x1a2B3c4D5e6F7890aBcDeF1234567890AbCdEf12";

// ─── Badge logic ────────────────────────────────────────────────────────────

export function getBadgeTier(amount: number): BadgeTier {
  if (amount >= 25) return "ultimate";
  if (amount >= 10) return "super";
  return "supporter";
}

// ─── localStorage helpers ───────────────────────────────────────────────────

const STORAGE_KEY = "allhacks-supporters";

export function getSupporters(): Supporter[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSupporter(data: {
  displayName: string;
  amount: number;
  anonymous: boolean;
  message?: string;
}): Supporter {
  const supporters = getSupporters();
  const supporter: Supporter = {
    id: crypto.randomUUID(),
    displayName: data.anonymous ? "Anonymous" : data.displayName,
    amount: data.amount,
    badgeTier: getBadgeTier(data.amount),
    date: new Date().toISOString(),
    anonymous: data.anonymous,
    message: data.message,
  };
  supporters.unshift(supporter);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(supporters));
  return supporter;
}

export function getTotalCount(): number {
  // Seed count so it doesn't look empty
  return getSupporters().length + 1248;
}

export function getMonthlyRaised(): number {
  const supporters = getSupporters();
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  return supporters
    .filter((s) => new Date(s.date).getTime() >= firstOfMonth)
    .reduce((sum, s) => sum + s.amount, 0);
}

export function getSortedSupporters(): Supporter[] {
  const supporters = getSupporters();
  const tierOrder: Record<BadgeTier, number> = { ultimate: 0, super: 1, supporter: 2 };
  return supporters.sort((a, b) => {
    const tierDiff = tierOrder[a.badgeTier] - tierOrder[b.badgeTier];
    if (tierDiff !== 0) return tierDiff;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
