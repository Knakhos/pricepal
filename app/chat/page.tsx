'use client'

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input'
import type { PriceComparison } from '@/lib/tools/compare-prices'
import type { ReviewSummary } from '@/lib/tools/get-reviews'
import type { ProductResult } from '@/lib/tools/search-products'
import type { StoreTrust } from '@/lib/tools/store-trust'
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

// ── Tool result renderers ────────────────────────────────────────────────────

function ProductCard({ result }: { result: ProductResult }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-brand-border last:border-0">
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm text-brand-beige truncate">{result.title}</p>
        <p className="text-xs text-brand-muted mt-0.5">{result.store}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-medium text-brand-blue">
          {result.currency} {result.price}
        </p>
        <p className={`text-xs mt-0.5 ${result.inStock ? 'text-brand-sage' : 'text-brand-muted'}`}>
          {result.inStock ? 'In stock' : 'Out of stock'}
        </p>
      </div>
    </div>
  )
}

function PriceRow({ item }: { item: PriceComparison }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-brand-border last:border-0 text-sm">
      <span className="text-brand-muted">{item.store}</span>
      <div className="flex items-center gap-4">
        <span className="text-brand-muted text-xs">{item.shipping}</span>
        <span className={`font-medium ${item.inStock ? 'text-brand-beige' : 'text-brand-muted line-through'}`}>
          {item.currency} {item.price}
        </span>
      </div>
    </div>
  )
}

function TrustBadge({ trust }: { trust: StoreTrust }) {
  const colors: Record<string, string> = {
    verified: 'text-brand-sage',
    caution: 'text-yellow-500',
    avoid: 'text-red-400',
    unknown: 'text-brand-muted',
  }
  return (
    <div className="flex items-center gap-4 py-2">
      <div>
        <p className="text-sm text-brand-beige font-medium">{trust.domain}</p>
        {trust.flags.length > 0 && (
          <p className="text-xs text-brand-muted mt-0.5">{trust.flags.join(' · ')}</p>
        )}
      </div>
      <div className="ml-auto text-right">
        <p className={`text-sm font-medium ${colors[trust.trustLevel]}`}>
          {trust.trustScore}/100
        </p>
        <p className={`text-xs mt-0.5 capitalize ${colors[trust.trustLevel]}`}>
          {trust.trustLevel}
        </p>
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: ReviewSummary }) {
  const sentimentColor =
    review.sentiment === 'positive'
      ? 'text-brand-sage'
      : review.sentiment === 'negative'
        ? 'text-red-400'
        : 'text-yellow-500'
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-beige font-medium truncate pr-4">{review.product}</p>
        <span className={`text-sm font-medium shrink-0 ${sentimentColor}`}>
          ★ {review.averageRating} · {review.totalReviews.toLocaleString()} reviews
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-brand-blue mb-1.5 uppercase tracking-wider text-[10px]">Pros</p>
          <ul className="space-y-1">
            {review.pros.map((p: string) => (
              <li key={p} className="text-brand-muted">+ {p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-red-400/70 mb-1.5 uppercase tracking-wider text-[10px]">Cons</p>
          <ul className="space-y-1">
            {review.cons.map((c: string) => (
              <li key={c} className="text-brand-muted">− {c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── Tool wrapper card ────────────────────────────────────────────────────────

function ToolCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded border border-brand-border bg-brand-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.15em] text-brand-blue mb-3">{label}</p>
      {children}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  function handleSubmit(msg: PromptInputMessage) {
    if (msg.text.trim()) {
      sendMessage({ text: msg.text })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-brand-bg text-brand-beige">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between border-b border-brand-border px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight hover:text-brand-beige/80 transition-colors">
          Pricepal
        </Link>
        <p className="text-xs text-brand-muted font-sans hidden sm:block">
          AI-powered shopping assistant
        </p>
      </header>

      {/* Messages */}
      <Conversation className="flex-1 overflow-hidden">
        <ConversationContent className="px-4 py-6 max-w-2xl mx-auto w-full">
          {messages.length === 0 && (
            <ConversationEmptyState
              icon={<ShoppingCart className="size-6 text-brand-blue" />}
              title="What are you looking for?"
              description="Ask me about any product — I'll compare prices, check store trust, and summarize reviews."
            />
          )}

          {messages.map((message) => (
            <Message key={message.id} from={message.role} className="mb-6">
              <MessageContent>
                {message.parts.map((part, i) => {
                  // Text
                  if (part.type === 'text') {
                    return <MessageResponse key={i}>{part.text}</MessageResponse>
                  }

                  // Tool — searchProducts
                  if (part.type === 'tool-searchProducts' && 'state' in part && part.state === 'output-available') {
                    const results = (part as { output: ProductResult[] }).output
                    return (
                      <ToolCard key={i} label="Search results">
                        {results.map((r, j) => <ProductCard key={j} result={r} />)}
                      </ToolCard>
                    )
                  }

                  // Tool — comparePrices
                  if (part.type === 'tool-comparePrices' && 'state' in part && part.state === 'output-available') {
                    const items = (part as { output: PriceComparison[] }).output
                    return (
                      <ToolCard key={i} label="Price comparison">
                        {items.map((item, j) => <PriceRow key={j} item={item} />)}
                      </ToolCard>
                    )
                  }

                  // Tool — checkStoreTrust
                  if (part.type === 'tool-checkStoreTrust' && 'state' in part && part.state === 'output-available') {
                    const trust = (part as { output: StoreTrust }).output
                    return (
                      <ToolCard key={i} label="Store trust">
                        <TrustBadge trust={trust} />
                      </ToolCard>
                    )
                  }

                  // Tool — getProductReviews
                  if (part.type === 'tool-getProductReviews' && 'state' in part && part.state === 'output-available') {
                    const review = (part as { output: ReviewSummary }).output
                    return (
                      <ToolCard key={i} label="Review summary">
                        <ReviewCard review={review} />
                      </ToolCard>
                    )
                  }

                  // Loading state for any tool
                  if (
                    part.type.startsWith('tool-') &&
                    'state' in part &&
                    (part.state === 'input-streaming' || part.state === 'input-available')
                  ) {
                    const toolName = part.type.replace('tool-', '')
                    return (
                      <div key={i} className="mt-3 text-xs text-brand-muted italic">
                        Running {toolName}…
                      </div>
                    )
                  }

                  return null
                })}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      {/* Input */}
      <div className="shrink-0 border-t border-brand-border bg-brand-bg px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="Search for a product…"
                className="bg-brand-surface border-brand-border text-brand-beige placeholder:text-brand-muted resize-none"
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputSubmit status={status} onStop={stop} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  )
}
