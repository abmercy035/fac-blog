export interface Author {
  _id?: string
  id: string
  name: string
  username: string
  title: string
  bio: string
  email: string
  avatar: string
  social: {
    linkedin?: string
    facebook?: string
    email?: string
  }
}

export interface Category {
  _id?: string
  id: string
  name: string
  description: string
  slug: string
}

export interface BlogPost {
  _id?: string
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
  _id?: string
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: string
  isApproved?: boolean
  replies?: Comment[]
}

export interface Subscriber {
  _id?: string
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
    name: "Victory Atet",
username: "victory-atet",
    title: "Writer | Creative Strategist",
    bio: "A versatile writer and creative strategist whose work spans poetry, essays, editorial content, and cultural commentary. Her writing explores themes of faith, identity, human complexity, and societal views. Through thoughtful storytelling and strategic creativity, she crafts content that informs, inspires, and redefines perspectives.",
    email: "victoryatet@gmail.com",
    avatar: "/professional-woman-developer.png",
    social: {
      facebook: "victory.atet",
      linkedin: "victory-atet-writes",
    }
  }
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Poetry & Prose",
    description: "Original poems and lyrical prose exploring humanity, spirituality, emotion, and imagination",
    slug: "poetry-prose",
  },
  {
    id: "2",
    name: "Faith & Spirituality",
    description: "Faith based writing, spiritual reflections, and critical views on religion and belief systems",
    slug: "faith-spirituality",
  },
  {
    id: "3",
    name: "Culture & Society",
    description: "Explorations of societal trends, cultural values, and the tensions between tradition and modernity.",
    slug: "culture-society",
  },
  {
    id: "4",
    name: "Essays & Reviews",
    description: "Analytical pieces, cultural critique, social commentary, personal insights, and media/book reviews.",
    slug: "essays-reviews",
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
    featuredImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhAQEBAVFRUPFQ8VFRUVEBAQEhUXFhUWGBgVFhUZHiggGBolGxcYITEhJSkrLi4uGR8zODMtNygtMCsBCgoKDg0OGBAQGS0lHSUrLS0tLS0tLS0tLSstLS0tLS0tKy0tLS0tKy0rLSstLS0tLS0tLS0tKy0tKy0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBQYHBAj/xABGEAABBAAEAwYCBwUFBQkAAAABAAIDEQQSITEFBkETIlFhgZFxoQcjMkJSscEU0dLh8TNicsLwQ4KUouIVFyRTY3OSk7L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAqEQACAgICAgEDAgcAAAAAAAAAAQIRAzESIQRBURMUImGhBSNCQ4GR0f/aAAwDAQACEQMRAD8A7IUJRFCqASZOmTASZJJAhJFJJAAlMnTJDEmTpkAMmTpimIFMiKYoGMhKcpigBigKIoSgAUyJMUARuQlSFAUAChKJMUMEAUDkZCAqSgSgcjKByAAKEo0BQADlGVI5RuU0MjegKNwQFFAAUFIyEBQB0ApkkysgRSSSTEMkkkgBiladCgYxO2m/w0STpUkAySdMUAMhKcpimAxTFOUKAGKYpymKABKFOUyAGKZOUyQAlCQjQuTAjTFEUxQAJQFGUJCkoiKEqQheSfEZTXggCQoShjlzC0MkgG5SYzzzYir8l4eF8bixByszB2XMQ5taWBuCR1Cj4tNlimd/cfXxIofMqq5Ji1nf4CNo93Ej5NSA1DlGVI5RlAAlNScpkAbwpk6ZaECTJ0kCGSSSQAkydMUDGRoF4+Ozyx4eZ8AuRre5dVZIHXTqmlboTPfS5NzvxWdmPlbHiHxtaYG92R7QO4wk0PiU7PpFx0ZLZGROymiDG5jvgadp7LKca4g/EzSzuFGV2YgWQNAKHsu/x8DjK5IynJNdHW+H45xYC2UuuqJc19jo4eOiz+M50xMeK/Z29k9t/ac1wI0uu6R4eHVc9i4nPG2mSOA10BsC96B2Xl/aXl12bGt7m/G1Swwttk2/R1/iPN78MGulga5ryACyYNN1exHh5q2wHHWSxtk7J7Q4Xux2m96FcNm4g+U3K5ziLoEkj477q0wnNeJiibC0MIa0tDi0lwB6XfS9PRZz8dNfjspSfs7E/jMAj7Z78rKBzOBoA7E1tuhw/HMJL/Z4mF19BKy/a7XGn8YxmJjGHzktNd2m60bFuAugQPJeI4OVpqtQa0NV6hKPiddsbyHf2kHUGx5G0lxrlzmU4RpYQdzrRNi71Hii4hzVi5XufDNJE3o0Ov1y6i1P2c2+tC+qkditMuP4PnnHx9184e4HXPHFVdCC0DTb5rQ4Hn+QCsRC3MOrSQ0+B3NaeR9FEvFyJWX9RG/QlY7/ALwItSIHlrazEOGnoQtmWlYyhKO0UmnojIQkIyhKgYBCEhGUyRQo2qoxcAAa/XM/fXSt/wBQrtuxVLxOcE67C6N6H4eyieio7IeHNrMBtvXuuR8x4duK4vNFK59B7QCHgFobC1xygg/hO3iuv4M7n4/kuOcQkrjc7iaDTObOlVhnIguhS2Tcw85YhrY8O1rMpjjLi63SEhxokg0LygnTqtX9F2PdPh5i5oBbNVjr9WxcfxMxe4udua+Qpdf+ifDZMEX/APnSSO9qZ/kVCNmVG5SFA5IAE1IihSGbpJJJamYkkkkAMkkmKAHTFMkgYlX8xY+PDwOfK6mktb8b6fJWAWK+luWsNAw/elv/AOLHfxBaYY8ppEy0YHj2OE8xdH9ljQwEiy6iTd9d1DwZsbsRE2ZoyuzCjYFkHKDXnSDB8InmPcifVA9BYI6E0PNeLEQujLmPBBGg0I1/Qr2Vqkcx1TE8Pwxip4ZlyVf2W6fhA2XOeEcKZiJnRl2VrSR4E70R5ddlXTYmTLTpHODRoC4kD0V3yfy9Jis0mcNaCQKcc1ivDYfHelyuSw7eykm9Hi4twcwzCBhDw/LlIO2ZxGvsvZxHkuaKPtGSB/2bblLTZrRuuta+Gy9HMnBn4JzJLtpIpwFEOHvrpYP5KGHjnEJAHNtzWOa4BwjaHUQW/aAsA+H7qObklKA6p9lTllwb2iaEjQ0HAtBB6gpjj43WdRm11utNaG/5q35gbxDHFhMDaizACMhxGarza+SosTwyaHSeJ7M1UQdPfY+61hN+9ktJgYnFB5JDAAK1Aqk0FjU7a9LW+4aME6CnZSWtcC2wB4VQ/wBfFc7xk+R7ms1DSaNXQvw6q4Tu+tE1YGKeOm/koW4h46kVpufZe7C4cOcwNaXl1aGw4k+KvHcp4ii44f7V6Nz2K+Ay+HxUTko9t0WvgznDMTc8XaPpjpIg8uJprc4zE/AWu/YXj+DmOWLFwvJ2a2aMu12GW7XCJ+GhlDXNmpwOuSvMaUrzkng947DnVzWvzgiN2TuBzgbPm1c+XE5K2zSMkdlI3QlEmK881IyhJpPI6gT4LM8S4zTiGfyCmTopKzTTkhoA3cQFV42MF2Xo0NHsLv3Vg/EgRtefutzHTrX9VTYqQmzfQn3WWV9IuC7IWzhgc66GnztcR51kLeI4sg1ZI9HxAEeocQt1ztJ22Cx7QL/Zp8OPTJCT7GR3ssrhOR8RjYIsVh5WHO1jCx+Zhb2Q7I96iD9jy3Vw0iZbMvh4i+w1pJLmAGtBZIA9SR7L6D4Fw8YaCGAf7NjW34kDU+pXMeWeV3w4uJk1WyQAhri5pcHEl2oGzdPmuvUmxA0gcFIUJSYyIoUbkKQ0blJJJamQkydMgBJinTFADJJ6TJDHAWe5uwmHlMHbsL+zzloshtnLvW+y0LVk+bscWTABrjUbdAM1W461XwW/jxcp9EZHSDE7Q0NGWMNHdAqwP0Vfx7hsGLYI5D2bm6te2svqOqrW8RhGj42Nc4bSPc15/wAIvRPh+Jw25rTtqA7M8g+n+tF1rx5RfJNmDyfoY/i3KuKhzkN7Ros5mEEUNbo6hazkaLER4ePLkLJbkBLhQDjeXTXx903HONZIXEggESNBAoi43kEC63AHqoOSuMxQ4JglkAyGUBpPeNyP0rrpWw6rPMnNqMl2XF9Wi449B2ob2pDg02G1TSf1VaZcPhy2Sd7AR9lpdlO3h4fAI8HzZgpJJBM4NygFpc0gHU2B1vbSrOqo+EcPw0s8s76ka+WQxmS3N7JhcLo7kkaX0aqh0vppaJat2XjedsNK7JGS4g6aPAN+FtU+MxzJ4jbBI2tW7adSL2NX5+6g45HhJI5M7GAsb3XFobRLQG5SNd6VZy7JJ2DRKNCe4CbIaXNv4aA6K4YY1yS7FKTRQYzDs7RzIHkiwG/edq6qvr4eissdyRLHCX5g4t7xaBenXU79VTY85MW/sRkIyvDRrRFOry1oq+xnNWJfDIx0TRbcpeLO+h0s6royOfXH/JnFL2H9HWCDpJZi0HsxptYJqhXmLXQcMe6XH+g8Fybk/jowcju0JyPFOpocD4X1Hx8zot9BzJgjbg8gNF/eq66CrJ9F438QwZp5+SVo7MM4KHeyHj/BhPi8Ocoy19Zq0WA4Gi37wO3utRgMMxlBjGtDbqmgeRXPo+cWOxQeTTNACWOG5+PhrddF0DhuIZIXljw6g3QEEDNetjxo+yWaGWKgpaQQcW2e0oSiQlIsrOPvIhkLTRofMgFYd63XHW3DL/hJ9tVhX7Lny7Nsej2Y7jWRojbqaG5J8rvw8lYxZsgzGzTLv4WVj8MO2xOUGwX16D+i2khoerys3KykqMVwM/tOG42CftzYyv8A6xl//IXq+h6fNhZmE/2cxryD2MP52fVZnlLGnBjimGmJvsZ3C+r4RIx2/U2Crn6KiY8Fj5fB5r4thB/ULq9GBZ8ufW4wyf8AvP8Ae/41tqWR5Hi78z/wta0f7xP8C15UjAcgKkcoygAHIEbkKCjcJJJLUxEmTpIAZNadNSAFaZPSSBiauU868SdDxN0oFiERNLSaDjksj/m9wurtXHeaWOlxWLcIsze0cHODM5blOWyBsNN12eEk5u9UZZn0erG82xTYjDSuwvchDzrRfr1HSh87Xj4xzC3FYiLs7ihLmh5OUWL1J0OX+fkqAxG8tjL+Kjt+akjjA+4RW57wDvQ7+y9BePjjTj8HNzbLv6SBhmRYdkTgXOc5xDX5hQjIBOumrgszy+4ObMw2CSzqa8+7sfU6Ku4lIHvI2yW3wGm5F/kvXyxNTpmU05436Gq0rQahedjfDPTdm7VxNDhuU3YltxEEa/Wa5RXRoGrqVjguEy4WPJM2ixsoa4OOUguLtfPceg8VsOV54n4aPsyDprWmvUEePj5ry8541seGkGYBxygCxepA28Kv0tWvIk8vGugcPxsw/HC6Yh2RxjI+4bIdrZ8j5HReYS4gta1hO1FpY7u+NXXsdB4posfKCKAOwprS6/D7P6KE4PGSuowS0egjc0Uemy9C0t9GFMssJwiHuulnFv1LszGnTQZQ2zQr4BeTmbDyYQ0aeyYEsdZJqwDXnqD6qThmCAbJHiWyxl7mGM9lKWgA95pbodQBrv8ArLxTBTYv9nhijkLMM3L2jmGNr3WBYLqAGnj8FhySlfLor1ozXCoHzvaxjC9zyQANPnfr6LWYTk7FPFPcyNvQO1Nn4fqfRWXAuDxYFheZGukcNSPs7WWRnr9k69dNrWX41z9IJ/qWNc2E5RnLspynVzMp0s6gm9K0WGbypf2/9mkcd7NBP9Hz2gOima5/3szCxp1GxBJC0vIHD5YWYgTMyuMjQNbsNbvfX7RXPJPpMme0tMA1IN9pRFeHd8fyC6ryfxD9pwcE+v1mfcUba4sPzauR5srg4zpmqhFO0W6EhGhKwNDx8QjLo5GgbtcPkufvG48F0lypeK8EbKC5vdd49D8f3rLJG9GkJUYflGC55XdGdofmQFrCyy0eQ+ZVXy5guzbMTu51H31V1ALk+H7lil2avRyH6TsKxuOdk0Mkcbn1e5zNPu1rVd8ludHwucFlNklGV4c058xa1woagjJ16EL2fS/hPqoJQ0W2RzC6tac0kA+Vt/1apeWMRfDjHtWLk9aijOvq4LqMKNzyRF9S9/43j2DR+pK0VKs5Yiy4aP8AvZ3e7jXypWhUoCNyjKkcgKYEbkKJyFIZt06YFOtTISSSSAEmTpkAJMU6FjwdkAG1YR/MoBcRG2w516lgqzrmIqz4La4uXJHI8/cY93s0lcD7ZzDlZJnBFua55DTe9gaXfVb4cUJ3yRnkbVUblkuDY4TtwvfcbAz9wHXvNB0Ht8EHF+KYSdozQ29woOD2gtJH2SeuvlSwwnLO+xgBbrfbE5f8I6JYqZxbmllzB4bYLrOn669AF0/Sgny76/VmfZTceaGTPA2JDhtsRRGhPUFR8HnyOe7c9nLW3QX+QXmxkoe5xG2zR5BRk5crh039bBHta5HNLJyXybJfjRvuSpoOxAzuEhLw/ISD1cPLY/JTTcZw0RLJInPIst7SQzVZuyACB1019tVzrD8QkhLuzkc3MC12UkZm3dH2U8bXPLu9oNyTqT+q6cMlPp7M5Qo65wXjeFMf/hmsNHvtawsLTWhc0NvWqvX81XcwcyuFMikGZzbL2uuIN2Na6kFpHvtsufYLDuOYsa91NeXVmoNGriRtXja9nEZGMbEHMd/ZNzVmYGuL3uIJy7d4ajQp/bwjK5/9J5PSPRiOZcc1wEeIfWndGU+4odf6osbzJxKTK13ZaXsM1aVu5x6fFeF04iLWmNwJDT3HxvaQT0uvZFg8XG94bmFuJHfa5hsjQCib1Wjhg2/2FcgZMXjZx2Ukoa0CjlaBpW2gukpOX4wB3nE7aFoAPmTp6K2xDCw0RHozMT2zmta0aWbj8en70pGOcWNygnunK2WM0CHaUad0bfjruhS8e+/3H+foqI+XmO0a9wvUWWFp8rA0N2u48oYPsMDhIvwxN93EuP5rlEIc0v8Aqz3bJGeBvda0F2jnggHX4V0XZ+HxZIYWHdkcTfZoC5/KeKv5Zpi5/wBRMhKJCVxGwJQyGmmhfwRIZjTXnwa78kmNFBKGg92u8czq2s2T66hSYAW5x+P5oC2g34WpeFt7pPiVzw7lZs+onk5n4QMZh5YNAXC2E7B4NtJ8rHta5+3hMmChiw8uXODNK7Kcze+4Aa6a5YwurELDcxRulxobVtzQx3RrUDT/AJit2Zmt4fDkiiZ+BjB7NFqYo0LkkIjcFGVK5RuTAjIQIygSGbZopEkE9LREUMknSQKhJk6quPcQdA1haLJJ+Q2Q3Q0rKzG8ZeJpYxtUzRvYLWEg+4UfAeJCNsxkdoOzIHmbB/RVfF5O++QdX36OoH5FeWaYBzWH/aUPVuv5WudzdnQoKqNdx7Gh2AxMrDvDKBtuQW9fM9Vwxk5y0WiiQLGjrPhvfsuyw8POLwE2GbJkL3FubLmrvNftY6abrOv+i15ygYptN/8ASdqQQRfe8V0wySUejlyR7OeySZTsXECyDpodLqgSvFi5D2bjQGbNWgG5okHN+i9xbUrxYNNIP3bo1p4jy81WTyOyuH3QDViwN6r3pV9xPRnxKprtCmcSRXmECcnRQagtbmIB6q04Nio45GiRuZjXaiswLSPCxe979FVKTBuPatNddvQq4tp9EyVnUuXsfA6MjDtbbcge4xNYWNyv79tqzYbd+BWP5ox8Urj2erCQGkARnKA4AZejRTSNOvxXjlxRYH5XN1sFty04Xs5t5SNTp5lengeKJYM7A9rHPLW9mxwt9XoTrVaDpbtVtitSr5I6qyqgxDAC17iKsggZnEnoV6JsrzRLc2YtBYI2soEUaaBqTZvqtJJwqKXRzaDsujA1pB0JN16Kg4/gGQuYYzpK0nKXW5tE16VXqt3cFb7RKabPViMPi2d1+T6qN92QXFh0Jcfvb9N15zi3DQZXHKxuYGra3Y04a/E7/DQ1sj3kDM4Gz+PMb+F2E0EUkjsjQXOANAamgL+QCznkUdFqFl/wtzp5I4so+tdh43AvslpeA4NrTqbvcL6DfuVw3kngM7MXhpcSDE2J8cga9urwbIIN6CwNV2zD4hsrc7DYNrmyZFOjRQcQ0KNAVmMYrzcRfUbvOh816Co3gHcJSVoaKWQagV0/cN/Ve+CEMFD4qXsQNgmKiMeJcpWCqp3CI+27bM/7WfJmGTNVZqq7VoVGVZIyFyIoSkMByjKNxQFICNwTJ3IbQBuE6G0SskZJJMQLvwv5/wBAgBFUfNjRkjJ/ER7t/krxUfNbu5GP71+wP71EtMqG0ZHNnY49RbfjlGX9E+JjuSE9AXfNpUrYwNPEk+5tGR8lzHTRccuY5sUeIzH7Dg70Lf8ApU/CuKyTOmIb3WMcRuXXXdHmT4LJTFzXZfuzU13obH7vVa/lKPLHI78T/wAgAt8c9IxnCrZx+Tl/HHMRhpqdRNwTB1gVVUPyKr+KcHxuVoGDxB6aYWfT2b5BfRuZCSui18HNR8v/APYGMA1weJ/4Wf8AhUcnBsWN8HiP+Gn/AIV9QucoHuSKPmGPhWI1zYacV4wTD/KvXwngeKc8ubC4EA/bBZv8dyvop7lA5yEJo5HFyzN2L8zXdsAXtHcfHTSKaQ41Zo9PyVHHJNhsrY8K3usLXExykPpztXUdXanW9q6Uu7AqZjlcZ079i4+jgRxmNd3msdHZFvAe0d0E1r5dOq8owr5pfrX1mq3vvRtE+H5Dcr6OY5SBy0+sntWCh8HzbiOEgA9m8PINUCMx0JzBovTT5hejlCFrsWynAgNkdoRe1A16rteO4y+Gctd9gFvXoQNSPBQc0YgOLGg7H8wsc2WM06RrCDTRQ4l4kYAfuRRs9W5lpeXMUyONsbj3nyPoeyykEVCX/EPyCs+XcOX4m3HRhJHwA/iK44S/I6Jx6NsUJRISuk5gSo3KCbClxJdI+j91j3xivMg3fwpKHDMZZaNTVkuc9xra3OJJQBKVE5SFRuSGASo0ZQ0gBkDkZQFIZG5AUb0BSAjcgRuQIA3CcJgnCskYpJ6SpADKi5raS2M+Bd8x/JXpVZzC0GIjqCCPT+VqZaKjsyQGyPKmabKN5oLlOo8mNAr4UR8VruAxGOCMHc24/wC8bWb4ZhTO/M77DDr5nwWrEi2xR9swyy9HozJi9QGVAZVujEle9QPemdKoXSIAUj1C5yd7lEXIEGCpWOUAcjD0DPW1ykDl5BKl2qAKfmeIF7HfiaQfQ/zVBhsT2paNfq9HE9XDTRaDmI91rvwu+RH8gqiANF11XLNtNnTDtI807MubX7S0PJ8XdfIepLf1P5hZ/FOWu5ahyYdl7uzO9zp8qRiXY8j6LUoSiKArpOYElAUTkBQAxKjcjKApARuTJOTFJjQxQEoihcgZG5RuUjlG9ICMoU7kKANyk1w8UklaJHSTpIAFxWd47i9HeQofEpJJS0VHZQQqPHPppKSS4zq9F5wyNscbABRIBd5kjr4np6L19skku1aOJ7BMyEypJJgMZEOZJJIQxKAlJJMBrTF6ZJAD9ohMySSQzz4pwc1zTsVQsBa4tJukySxyro1xvugMSFv8OAAANgAAkkpxey8volQlJJbmIDkBSSQIEoCkkgZGUJSSSAZA5JJAyNyjckkkBGUCSSGM/9k=",
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
    author: authors[0],
    category: categories[0],
    tags: ["Faith", "Worship", "Beauty", "Creativity"],
    publishedAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    isPublished: true,
    slug: "the-sacred-in-the-ordinary",
    featuredImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFF8BMEbikk0jg9pGWsG_lQQMjRPLaGLJvSg&s",
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
    featuredImage: "data:image/jpeg;base64,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",
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
    featuredImage: "data:image/jpeg;base64,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",
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
    author: authors[0],
    category: categories[1],
    tags: ["Faith", "Doubt", "Modern Thought", "Spirituality"],
    publishedAt: "2024-01-08T11:00:00Z",
    updatedAt: "2024-01-08T11:00:00Z",
    isPublished: true,
    slug: "faith-in-a-skeptical-world",
    featuredImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWtblzQJe83R0mLP6ZNoaF261KE8Q7QbHQEg&s",
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
    featuredImage: "data:image/png;base64,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",
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
