import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from 'ai'
import { gateway } from '@ai-sdk/gateway'
import { z } from 'zod'
import { searchProducts } from '@/lib/tools/search-products'
import { comparePrices } from '@/lib/tools/compare-prices'
import { checkStoreTrust } from '@/lib/tools/store-trust'
import { getReviews } from '@/lib/tools/get-reviews'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: gateway('anthropic/claude-sonnet-4.6'),
    system: `You are Pricepal, an AI shopping assistant. Help users find the best prices, compare stores, verify store trustworthiness, and summarize product reviews.

When a user asks about a product:
1. Search for it with searchProducts
2. Compare prices with comparePrices
3. Check trust ratings for the stores found with checkStoreTrust
4. Offer to get reviews with getProductReviews if the user wants more info

Be concise and direct. Lead with the most important findings.`,
    messages: await convertToModelMessages(messages),
    tools: {
      searchProducts: tool({
        description:
          'Search for products by name or description. Returns a list of matching products with prices and stores.',
        inputSchema: z.object({
          query: z.string().describe('Product name or search query'),
        }),
        execute: async ({ query }) => searchProducts(query),
      }),
      comparePrices: tool({
        description: 'Compare prices for a product across multiple online stores.',
        inputSchema: z.object({
          query: z.string().describe('Product name to compare prices for'),
        }),
        execute: async ({ query }) => comparePrices(query),
      }),
      checkStoreTrust: tool({
        description: 'Check the trust rating and safety of an online store domain.',
        inputSchema: z.object({
          domain: z.string().describe('Store domain, e.g. amazon.com'),
        }),
        execute: async ({ domain }) => checkStoreTrust(domain),
      }),
      getProductReviews: tool({
        description:
          'Get a summarized review breakdown for a product including pros, cons, and overall sentiment.',
        inputSchema: z.object({
          query: z.string().describe('Product name to get reviews for'),
        }),
        execute: async ({ query }) => getReviews(query),
      }),
    },
    stopWhen: stepCountIs(10),
  })

  return result.toUIMessageStreamResponse()
}
