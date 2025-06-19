import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Zeflix - Stream the World | Free Movies & TV Series Online",
    template: "%s | Zeflix - Stream the World",
  },
  description:
    "Stream the World. Anytime. Anywhere. Limitlessly. Watch free movies, TV series, anime, K-dramas, Bollywood, Hollywood and global content in HD quality without ads or signup.",
  keywords: [
    "free movies online",
    "watch movies free",
    "streaming platform",
    "TV series online",
    "anime streaming",
    "K-drama",
    "Bollywood movies",
    "Hollywood movies",
    "Tamil movies",
    "Hindi movies",
    "Korean drama",
    "Japanese anime",
    "global cinema",
    "HD movies",
    "no ads streaming",
    "Zeflix",
  ],
  authors: [{ name: "Zero Creations" }],
  creator: "Zero Creations",
  publisher: "Zeflix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zeflix.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zeflix.com",
    title: "Zeflix - Stream the World | Free Movies & TV Series Online",
    description:
      "Stream the World. Anytime. Anywhere. Limitlessly. Watch free movies, TV series, anime, K-dramas, and global content in HD quality without ads.",
    siteName: "Zeflix",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Zeflix - Stream the World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeflix - Stream the World | Free Movies & TV Series Online",
    description:
      "Stream the World. Anytime. Anywhere. Limitlessly. Watch free movies, TV series, anime, K-dramas, and global content in HD quality without ads.",
    images: ["/logo.png"],
    creator: "@zerocreations",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  generator: "Next.js",
  applicationName: "Zeflix",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1db954" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "entertainment",
}

// Add structured data script
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zeflix",
    alternateName: "Zeflix - Stream the World",
    url: "https://zeflix.com",
    description:
      "Stream the World. Anytime. Anywhere. Limitlessly. Watch free movies, TV series, anime, K-dramas, and global content in HD quality without ads.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://zeflix.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Zero Creations",
      logo: {
        "@type": "ImageObject",
        url: "https://zeflix.com/logo.png",
      },
    },
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <link rel="canonical" href="https://zeflix.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
