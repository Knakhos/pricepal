// Store trust rating lookup
// Uses a curated list for now; will also query DB for crowd-sourced ratings.

export type TrustLevel = "verified" | "caution" | "avoid" | "unknown"

export interface StoreTrust {
  domain: string
  trustScore: number  // 0–100
  trustLevel: TrustLevel
  flags: string[]
  verified: boolean
}

const CURATED_STORES: Record<string, Omit<StoreTrust, "domain">> = {
  "amazon.com":   { trustScore: 92, trustLevel: "verified", flags: [], verified: true },
  "bestbuy.com":  { trustScore: 90, trustLevel: "verified", flags: [], verified: true },
  "walmart.com":  { trustScore: 88, trustLevel: "verified", flags: [], verified: true },
  "target.com":   { trustScore: 87, trustLevel: "verified", flags: [], verified: true },
  "newegg.com":   { trustScore: 82, trustLevel: "verified", flags: [], verified: true },
  "ebay.com":     { trustScore: 70, trustLevel: "caution",  flags: ["third-party-sellers"], verified: false },
  "wish.com":     { trustScore: 30, trustLevel: "avoid",    flags: ["long-shipping", "quality-issues"], verified: false },
}

export async function checkStoreTrust(domain: string): Promise<StoreTrust> {
  const normalized = domain.toLowerCase().replace(/^www\./, "")
  const curated = CURATED_STORES[normalized]

  if (curated) {
    return { domain: normalized, ...curated }
  }

  // TODO: query Neon DB for crowd-sourced ratings
  return {
    domain: normalized,
    trustScore: 50,
    trustLevel: "unknown",
    flags: [],
    verified: false,
  }
}
