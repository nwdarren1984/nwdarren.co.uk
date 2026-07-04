import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 's4g5uj9o'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  if (!source || typeof source !== 'object') {
    return null
  }

  const image = source as Record<string, unknown>
  const asset = image.asset as Record<string, unknown> | undefined
  const ref = asset?._ref

  if (typeof ref !== 'string' || !ref) {
    return null
  }

  try {
    return builder.image(source as never).auto('format').fit('max').url()
  } catch {
    return null
  }
}
