// SerpAPI price comparison — STUB
// Wire up real implementation when SerpAPI key is available.

export interface PriceComparison {
  store: string
  price: string
  currency: string
  shipping: string
  link: string
  inStock: boolean
}

export async function comparePrices(query: string): Promise<PriceComparison[]> {
  // TODO: Replace with real SerpAPI Google Shopping call
  // const response = await fetch(
  //   `https://serpapi.com/search?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
  // )
  // const data = await response.json()
  // return mapPriceComparison(data.shopping_results)

  return [
    { store: "amazon.com",  price: "299.99", currency: "USD", shipping: "Free",  link: "#", inStock: true },
    { store: "bestbuy.com", price: "319.00", currency: "USD", shipping: "$5.99", link: "#", inStock: true },
    { store: "walmart.com", price: "289.00", currency: "USD", shipping: "Free",  link: "#", inStock: false },
    { store: "target.com",  price: "305.00", currency: "USD", shipping: "Free",  link: "#", inStock: true },
  ]
}
