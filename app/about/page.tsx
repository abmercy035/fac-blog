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
    "Human Complexity",
    "Soulful Expression",
    "Faith & Society",
    "History & Culture",
    "Power & Influence",
  ]

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">About FAC</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Faith, Art, and Culture (FAC) is a creative space where writing transcends mere words and becomes an exploration of the human soul. Through poetry, essays, and prose, FAC invites readers to experience the profound, often complex layers of life, faith, and society with honesty and artistry.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
               Faith, Art, and Culture (FAC) is a creative space where writing transcends mere words and becomes an exploration of the human soul. Through poetry, essays, and prose, FAC invites readers to experience the profound, often complex layers of life, faith, and society with honesty and artistry.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">What You'll Find Here</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Faith, Art, and Culture (FAC) is a creative space where writing transcends mere words and becomes an exploration of the human soul. Through poetry, essays, and prose, FAC invites readers to experience the profound, often complex layers of life, faith, and society with honesty and artistry.
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Lets connect</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
             Open to collaborations and new ideas.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="https://web.facebook.com/victory.atet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-lg font-semibold"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/victory-atet-writes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-lg font-semibold"
              >
                LinkedIn
              </a>
              <a href="mailto:victoryatet@gmail.com" className="text-foreground hover:text-primary transition-colors text-lg font-semibold">
                Email
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
