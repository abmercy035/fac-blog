import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/hooks/use-auth"
import { BlogFooter } from "@/components/blog-footer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FAC - Faith, Art & Culture",
  description: "A thoughtful space where faith, art, and culture converge. Exploring how belief shapes creativity and art influences culture.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${merriweather.variable} font-serif`}>
        <AuthProvider>
          <Suspense>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                {children}
              </main>
              <BlogFooter />
            </div>
            <Analytics />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
