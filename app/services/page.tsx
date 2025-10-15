import { Metadata } from "next"
import ServicesContent from "./services-content"

export const metadata: Metadata = {
  title: "Services",
  description: "I craft diverse, meaningful content across multiple genres and themes—from original poetry and lyrical prose exploring humanity, spirituality, emotion, and imagination, to faith-based writing and spiritual reflections that offer critical views on religion and belief systems.",
  keywords: [ 
    "Human Complexity", 
    "Soulful Expression",
    "Poetry & Prose", 
    "Faith & Spirituality",
    "Culture & Society",
    "Essays & Reviews",
    "Faith & Society",
    "History & Culture",
    "Power & Influence"
  ],
  openGraph: {
    title: "Writing Services | FAC",
    description: "Professional writing services that bring your faith-centered stories, content, and ideas to life with clarity and creativity.",
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}