import { client, urlFor } from '@/lib/sanity'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getArtists() {
  const query = `*[_type == "artist"] | order(name asc) { _id, name, description, photo }`
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (!projectId || !dataset) return []

  try {
    return await client.fetch(query)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const artists = await getArtists()

  return (
    <main>
      <section className="hero">
        <h1>nwdarren</h1>
        <p>
          Welcome to the homepage for nwdarren. This section is driven by Sanity content and
          shows featured artists from the studio collection.
        </p>
      </section>

      <section className="grid" aria-label="Artists">
        {artists.length > 0 ? (
          artists.map((artist: any) => {
            const imageUrl = urlFor(artist.photo)

            return (
              <article key={artist._id} className="card">
                {imageUrl ? <img src={imageUrl} alt={artist.name || 'Artist'} /> : null}
                <div className="card-body">
                  <h2>{artist.name}</h2>
                  <p>{artist.description || 'More details coming soon.'}</p>
                </div>
              </article>
            )
          })
        ) : (
          <p>No artists available right now.</p>
        )}
      </section>
    </main>
  )
}
