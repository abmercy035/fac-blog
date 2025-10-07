export interface Author {
  id: string
  name: string
  bio: string
  email: string
  avatar: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: Author
  category: Category
  tags: string[]
  publishedAt: string
  updatedAt: string
  isPublished: boolean
  slug: string
  featuredImage: string
  likes: number
  commentsCount: number
}

export interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: string
  replies?: Comment[]
}

export interface Subscriber {
  id: string
  email: string
  name?: string
  subscribedAt: string
  isActive: boolean
  receiveNewPostAlerts: boolean
  source: string // e.g., "homepage", "post", "footer"
}

// Static data for demo
export const authors: Author[] = [
  {
    id: "1",
    name: "Grace Amara",
    bio: "Writer and artist exploring the intersection of faith, beauty, and modern culture",
    email: "grace@facblog.com",
    avatar: "/professional-woman-developer.png",
    social: {
      twitter: "@graceamara",
      linkedin: "grace-amara",
    },
  },
  {
    id: "2",
    name: "David Osei",
    bio: "Theologian, musician, and cultural commentator passionate about creative spirituality",
    email: "david@facblog.com",
    avatar: "/professional-man-developer.png",
    social: {
      twitter: "@davidosei",
      linkedin: "david-osei",
    },
  },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Faith & Creativity",
    description: "Exploring how belief shapes creative expression and artistic vision",
    slug: "faith-creativity",
  },
  {
    id: "2",
    name: "Culture & Society",
    description: "Examining cultural trends, societal values, and the role of art in shaping our world",
    slug: "culture-society",
  },
  {
    id: "3",
    name: "Art & Expression",
    description: "Music, visual arts, literature, film, and creative storytelling",
    slug: "art-expression",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "When Faith Finds a Canvas",
    content: `# 🖋️ When Faith Finds a Canvas

Sometimes I think of faith as a quiet color — the kind that doesn't scream for attention, but once you notice it, you can't unsee it. It bleeds through the edges of everything we create. For me, art is the way faith speaks when words run out.

I've learned that artists of faith don't always paint crosses or angels. Sometimes their work simply carries a pulse — a rhythm of hope, tension, or redemption that feels divine. You see it in the way light hits a painting, or how a dancer holds a moment longer than expected. It's not about preaching; it's about revealing.

Faith and art share one thing: both ask us to believe in something unseen. Every brushstroke is a small act of trust — that color will blend, that the image will come alive. Maybe that's why God's first act was creation itself. In that moment, art and faith became forever linked.

Culture often tries to separate the two, but I think faith always finds a way back onto the canvas. Maybe not in obvious symbols, but in the spirit behind the work — the longing for meaning, beauty, and truth.`,
    excerpt:
      "Sometimes I think of faith as a quiet color — the kind that doesn't scream for attention, but once you notice it, you can't unsee it.",
    author: authors[0],
    category: categories[0],
    tags: ["Faith", "Art", "Creativity", "Symbolism"],
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isPublished: true,
    slug: "when-faith-finds-a-canvas",
    featuredImage: "/modern-web-development.png",
    likes: 42,
    commentsCount: 8,
  },
  {
    id: "2",
    title: "The Sacred in the Ordinary",
    content: `# 🎭 The Sacred in the Ordinary

I've stopped trying to find God only in church. I find Him in quiet cafes, in jazz improvisations, in old architecture that still holds its breath. Somewhere between the hum of traffic and the sound of rain, faith becomes real again.

Art has a way of slowing time — forcing us to notice what we'd normally ignore. Maybe that's what worship really is: paying attention. Every creative act, no matter how small, becomes sacred when done with intention.

We tend to think faith needs to be loud or miraculous, but most of the time it shows up subtly — like a lyric that hits deeper than expected or a photograph that says more than words ever could. That's the beauty of it. God hides in the details. We just need to look closer.

So the next time you feel uninspired, don't wait for something grand. Look around you. Creation is still happening — and maybe your art is part of that ongoing miracle.`,
    excerpt:
      "I've stopped trying to find God only in church. I find Him in quiet cafes, in jazz improvisations, in old architecture that still holds its breath.",
    author: authors[1],
    category: categories[0],
    tags: ["Faith", "Worship", "Beauty", "Creativity"],
    publishedAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    isPublished: true,
    slug: "the-sacred-in-the-ordinary",
    featuredImage: "/docker-containers-development.png",
    likes: 38,
    commentsCount: 12,
  },
  {
    id: "3",
    title: "The Art of Worship",
    content: `# 🎶 The Art of Worship

Worship isn't limited to music — though that's where many of us start. It's in painting, poetry, photography, and even silence. True worship, I think, is creativity turned toward gratitude.

Some of my favorite artists aren't "religious" at all, yet their work feels profoundly spiritual. It's because they're reaching for something beyond themselves. And maybe that's what faith and art have in common — they both stretch the human soul.

When I write, I'm often reminded that God doesn't demand perfection in expression — only honesty. So even broken lines, missed notes, or messy sketches can become worship if they're sincere. The art isn't the offering; the heart behind it is.

In a world chasing performance, this truth feels freeing: you don't have to be flawless to create something holy. You just have to be open.

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
\`\`\``,
    excerpt: "Explore advanced TypeScript patterns and utility types to write more maintainable and type-safe code.",
    author: authors[0],
    category: categories[0],
    tags: ["TypeScript", "JavaScript", "Code Quality", "Best Practices"],
    publishedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    isPublished: true,
    slug: "advanced-typescript-patterns-code-quality",
    featuredImage: "/typescript-code.png",
    likes: 56,
    commentsCount: 15,
  },
  {
    id: "4",
    title: "Culture Without Wonder",
    content: `# 🕊️ Culture Without Wonder

I sometimes worry that culture is losing its sense of wonder. Everything feels fast, transactional, optimized. Art becomes content, and faith becomes branding. But where's the awe?

Wonder is the oxygen of both faith and creativity. Without it, belief becomes ritual, and art becomes noise. I think every artist's real job is to remind the world how to feel again — to make us stop, even for a second, and remember that there's more to life than what's visible.

Faith calls that transcendence; art calls it beauty. Either way, both point beyond ourselves. And maybe that's the kind of culture we need to rebuild — one where wonder is not lost, where mystery is not mocked, and where beauty still matters.

If you've ever created something and felt a spark of joy that words can't explain, that's wonder. Protect it. Our world desperately needs it.`,
    excerpt: "I sometimes worry that culture is losing its sense of wonder. Everything feels fast, transactional, optimized.",
    author: authors[0],
    category: categories[1],
    tags: ["Culture", "Wonder", "Beauty", "Society"],
    publishedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    isPublished: true,
    slug: "culture-without-wonder",
    featuredImage: "/typescript-code.png",
    likes: 56,
    commentsCount: 15,
  },
  {
    id: "5",
    title: "Advanced TypeScript Patterns for Better Code Quality",
    content: `# Advanced TypeScript Patterns for Better Code Quality

TypeScript's type system is incredibly powerful. Let's explore advanced patterns that can improve your code quality and developer experience.

## Utility Types

TypeScript provides several built-in utility types that can help you create more flexible and maintainable code.

### Partial and Required
\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

type PartialUser = Partial<User>
type RequiredUser = Required<User>
\`\`\`

## Generic Constraints

Use generic constraints to create more specific and type-safe functions.

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
\`\`\``,
    excerpt: "Worship isn't limited to music — it's in painting, poetry, photography, and even silence. True worship is creativity turned toward gratitude.",
    author: authors[0],
    category: categories[0],
    tags: ["Worship", "Music", "Poetry", "Spirituality"],
    publishedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    isPublished: true,
    slug: "the-art-of-worship",
    featuredImage: "/typescript-code.png",
    likes: 56,
    commentsCount: 15,
  },
  {
    id: "5",
    title: "Faith in a Skeptical World",
    content: `# 🧠 Faith in a Skeptical World

It's not easy to talk about faith in today's world. People either assume you're naive or trying to convert them. But for me, faith isn't about proving anything — it's about perceiving meaning in what others overlook.

Art helps me hold that tension. It gives me language when belief feels complicated. When I can't pray, I draw. When I doubt, I write. The act of creating becomes my way of staying connected to something bigger.

We live in a skeptical age, but maybe that's okay. Doubt doesn't destroy faith — it refines it. Just like a rough sketch becomes a masterpiece through revision, belief matures through honest questioning.

So if you find yourself doubting, don't see it as failure. See it as part of the creative process of faith. Even the best artists erase before they perfect.`,
    excerpt: "It's not easy to talk about faith in today's world. But faith isn't about proving anything — it's about perceiving meaning in what others overlook.",
    author: authors[1],
    category: categories[1],
    tags: ["Faith", "Doubt", "Modern Thought", "Spirituality"],
    publishedAt: "2024-01-08T11:00:00Z",
    updatedAt: "2024-01-08T11:00:00Z",
    isPublished: true,
    slug: "faith-in-a-skeptical-world",
    featuredImage: "/blog-post-concept.png",
    likes: 45,
    commentsCount: 10,
  },
  {
    id: "6",
    title: "The Intersection of Faith, Art, and Culture",
    content: `# 🌍 The Intersection of Faith, Art, and Culture

Every society tells stories — about who we are, what we value, and what we hope for. Faith gives those stories meaning. Art gives them form. Culture is what happens when those stories spread.

That's why I started writing about this intersection. Because when faith and art align, culture changes — subtly but powerfully. It's in the films that spark moral reflection, in songs that heal division, in paintings that make us see humanity again.

We often underestimate how much beauty shapes belief. But maybe the real influence of faith in culture isn't through sermons or politics — it's through creativity that makes truth irresistible.

In the end, faith, art, and culture aren't separate worlds. They're threads of one tapestry — and every time we create with purpose, we weave another piece into the story of our time.`,
    excerpt: "Faith gives stories meaning. Art gives them form. Culture is what happens when those stories spread.",
    author: authors[0],
    category: categories[1],
    tags: ["Culture", "Faith", "Art", "Society", "Storytelling"],
    publishedAt: "2024-01-05T16:20:00Z",
    updatedAt: "2024-01-05T16:20:00Z",
    isPublished: true,
    slug: "intersection-faith-art-culture",
    featuredImage: "/placeholder.jpg",
    likes: 62,
    commentsCount: 18,
  },
]

export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: "Alex Johnson",
    email: "alex@example.com",
    content: "Great article! The App Router explanation was really helpful.",
    createdAt: "2024-01-16T08:30:00Z",
  },
  {
    id: "2",
    postId: "1",
    author: "Emma Davis",
    email: "emma@example.com",
    content: "Thanks for the detailed examples. Looking forward to trying Next.js 15!",
    createdAt: "2024-01-16T10:45:00Z",
  },
]

export const subscribers: Subscriber[] = [
  {
    id: "1",
    email: "john.miller@example.com",
    name: "John Miller",
    subscribedAt: "2024-01-10T09:30:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "homepage",
  },
  {
    id: "2",
    email: "sarah.thompson@example.com",
    name: "Sarah Thompson",
    subscribedAt: "2024-01-12T14:20:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "post",
  },
  {
    id: "3",
    email: "michael.chen@example.com",
    name: "Michael Chen",
    subscribedAt: "2024-01-15T11:45:00Z",
    isActive: true,
    receiveNewPostAlerts: false,
    source: "homepage",
  },
  {
    id: "4",
    email: "emily.rodriguez@example.com",
    name: "Emily Rodriguez",
    subscribedAt: "2024-01-18T16:10:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "footer",
  },
  {
    id: "5",
    email: "david.wilson@example.com",
    name: "David Wilson",
    subscribedAt: "2024-01-20T08:55:00Z",
    isActive: false,
    receiveNewPostAlerts: false,
    source: "homepage",
  },
  {
    id: "6",
    email: "lisa.anderson@example.com",
    name: "Lisa Anderson",
    subscribedAt: "2024-01-22T13:30:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "post",
  },
  {
    id: "7",
    email: "james.taylor@example.com",
    name: "James Taylor",
    subscribedAt: "2024-01-24T10:15:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "homepage",
  },
  {
    id: "8",
    email: "jennifer.white@example.com",
    name: "Jennifer White",
    subscribedAt: "2024-01-26T15:40:00Z",
    isActive: true,
    receiveNewPostAlerts: false,
    source: "footer",
  },
  {
    id: "9",
    email: "robert.brown@example.com",
    name: "Robert Brown",
    subscribedAt: "2024-01-28T09:20:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "post",
  },
  {
    id: "10",
    email: "amanda.martinez@example.com",
    name: "Amanda Martinez",
    subscribedAt: "2024-01-30T12:05:00Z",
    isActive: true,
    receiveNewPostAlerts: true,
    source: "homepage",
  },
]
