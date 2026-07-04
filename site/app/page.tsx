import { client, urlFor } from '@/lib/sanity'

async function getArtists() {
  const query = `*[_type == "artist"] | order(name asc) { _id, name, description, photo }`
  return client.fetch(query)
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
        {artists.map((artist: any) => {
          const image = urlFor(artist.photo)

          return (
            <article key={artist._id} className="card">
              {image ? <img src={image.url()} alt={artist.name} /> : null}
              <div className="card-body">
                <h2>{artist.name}</h2>
                <p>{artist.description}</p>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
