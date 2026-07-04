import {client, urlFor} from '../lib/sanity'

type Artist = {
  _id: string
  name?: string
  description?: string
  photo?: unknown
}

async function getArtists(): Promise<Artist[]> {
  const query = `*[_type == "artist"]{ _id, name, description, photo }`
  return client.fetch(query)
}

export default async function HomePage() {
  const artists = await getArtists()

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Welcome</p>
        <h1>A clean homepage with a featured artist grid.</h1>
        <p>
          This section showcases artists from your Sanity content model in a simple three-column layout.
        </p>
      </section>

      <section className="artists-section" aria-labelledby="artists-heading">
        <div className="section-heading">
          <h2 id="artists-heading">Artists</h2>
          <p>Discover featured artists with photo, name, and description.</p>
        </div>

        <div className="artists-grid">
          {artists.map((artist) => {
            const imageUrl = urlFor(artist.photo)

            return (
              <article key={artist._id} className="artist-card">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={artist.name || 'Artist portrait'}
                    className="artist-image"
                  />
                ) : (
                  <div className="artist-image placeholder">No photo available</div>
                )}

                <div className="artist-body">
                  <h3>{artist.name || 'Untitled artist'}</h3>
                  <p>{artist.description || 'More details coming soon.'}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
