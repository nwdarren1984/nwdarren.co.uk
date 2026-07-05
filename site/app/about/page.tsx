import Link from 'next/link'

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem', lineHeight: 1.6 }}>
      <h1>About us</h1>
      <p>
        We are a creative collective with a passion for thoughtful design, storytelling, and
        building experiences that feel personal and lasting.
      </p>
      <p>
        This page is a simple placeholder for the kind of information you might want to share
        about your studio, your team, or your vision.
      </p>
      <p>
        Whether you are showcasing artists, events, or a broader creative practice, this space
        can grow into a richer introduction over time.
      </p>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </main>
  )
}
