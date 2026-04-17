// SerpAPI Google Shopping — STUB
// Wire up real implementation when SerpAPI key is available.

export interface ProductResult {
  title: string
  store: string
  price: string
  currency: string
  link: string
  inStock: boolean
  thumbnail?: string
}

export async function searchProducts(query: string): Promise<ProductResult[]> {
  // TODO: Replace with real SerpAPI call
  // const response = await fetch(
  //   `https://serpapi.com/search?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
  // )
  // const data = await response.json()
  // return mapShoppingResults(data.shopping_results)

  return [
    {
      title: `${query} — Sample Result A`,
      store: "amazon.com",
      price: "299.99",
      currency: "USD",
      link: "#",
      inStock: true,
    },
    {
      title: `${query} — Sample Result B`,
      store: "bestbuy.com",
      price: "319.00",
      currency: "USD",
      link: "#",
      inStock: true,
    },
    {
      title: `${query} — Sample Result C`,
      store: "walmart.com",
      price: "289.00",
      currency: "USD",
      link: "#",
      inStock: false,
    },
  ]
}
