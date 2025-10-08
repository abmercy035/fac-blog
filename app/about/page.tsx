import { BlogHeader } from "@/components/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FAC - Faith, Art & Culture. A thoughtful space exploring how belief shapes creativity and how art influences culture.",
  openGraph: {
    title: "About FAC - Faith, Art & Culture",
    description:
      "Discover our mission to explore the intersection of faith, art, and culture through thoughtful writing and creative expression.",
  },
}

export default function AboutPage() {
  const themes = [
    "Faith and Creativity",
    "Art as Expression",
    "Culture and Influence",
    "Storytelling and Symbolism",
    "Music, Film & Literature",
    "History and Modern Thought",
    "Society and Spirituality",
  ]

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">About FAC</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              A thoughtful space where faith, art, and culture converge. FAC explores how belief shapes creativity and how art, in turn, influences the way we live, think, and express our values.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We exist to bridge the gap between spirituality and creativity — to inspire deeper reflection on how faith informs art, and how art redefines culture. Our goal is to foster conversations that challenge norms, awaken creativity, and elevate cultural understanding.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">What We Cover</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From visual arts and music to film, literature, and design — FAC examines how these creative expressions intersect with faith, values, and cultural evolution. Each article invites readers to see beyond the surface and engage with meaning, purpose, and beauty.
              </p>
            </section>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Themes We Explore</h2>
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => (
                <Badge key={theme} variant="secondary" className="text-base px-4 py-2">
                  {theme}
                </Badge>
              ))}
            </div>
          </section>

          <section className="text-center bg-secondary/30 py-12 px-8" style={{ borderRadius: '0.5rem' }}>
            <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Your voice matters. Share your thoughts, contribute your art, or join the discussion as we explore the intersection of faith, art, and culture together. Follow us on social media or reach out to collaborate.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="https://twitter.com/facblog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-lg font-semibold"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/facblog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-lg font-semibold"
              >
                Instagram
              </a>
              <a href="mailto:hello@facblog.com" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">
                Email
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
