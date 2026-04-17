// SerpAPI review aggregation — STUB
// Wire up real implementation when SerpAPI key is available.

export interface ReviewSummary {
  product: string
  averageRating: number
  totalReviews: number
  sentiment: "positive" | "mixed" | "negative"
  pros: string[]
  cons: string[]
  notableMentions: string[]
}

export async function getReviews(query: string): Promise<ReviewSummary> {
  // TODO: Replace with real SerpAPI call
  // const response = await fetch(
  //   `https://serpapi.com/search?engine=google&q=${encodeURIComponent(query + ' reviews')}&api_key=${process.env.SERPAPI_KEY}`
  // )
  // const data = await response.json()
  // return summarizeReviews(data)

  return {
    product: query,
    averageRating: 4.3,
    totalReviews: 2847,
    sentiment: "positive",
    pros: ["Great build quality", "Fast performance", "Long battery life"],
    cons: ["Premium price", "Limited color options"],
    notableMentions: ["Widely recommended by tech reviewers", "Strong resale value"],
  }
}
