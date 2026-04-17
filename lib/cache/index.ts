import { Redis } from '@upstash/redis'

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

if (!url) throw new Error('UPSTASH_REDIS_REST_URL environment variable is not set')
if (!token) throw new Error('UPSTASH_REDIS_REST_TOKEN environment variable is not set')

export const redis = new Redis({ url, token })
