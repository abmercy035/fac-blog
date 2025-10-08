export const siteConfig = {
	name: "FAC - Faith, Art & Culture",
	description: "A thoughtful space where faith, art, and culture converge. Exploring how belief shapes creativity and art influences culture.",
	url: "https://fac-blog.vercel.app", // Update with your actual domain
	ogImage: "https://fac-blog.vercel.app/og-image.jpg", // Update with your actual OG image
	links: {
		twitter: "https://twitter.com/fac_blog",
		github: "https://github.com/abmercy035/fac-blog",
	},
	creator: "FAC Team",
	keywords: [
		"Faith",
		"Art",
		"Culture",
		"Christianity",
		"Creativity",
		"Spirituality",
		"Faith and Art",
		"Christian Art",
		"Cultural Commentary",
		"Faith Writing",
		"Religious Art",
		"Creative Expression",
		"Worship",
		"Theology",
		"Philosophy",
	],
	authors: [
		{
			name: "Victory Atet",
			url: "https://fac-blog.vercel.app/author/victory-atet",
		}
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://fac-blog.vercel.app",
		siteName: "FAC - Faith, Art & Culture",
	},
}

export type SiteConfig = typeof siteConfig
