import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSettings } from "@/lib/api";
import { absoluteUrl, INDEXABLE, SITE_URL } from "@/lib/config";
import { jsonLd as ld } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = await getSettings();
  const title = seo.default_title || "Healthcare Digital Marketing Agency | Codigix Infotech";
  const description = seo.default_description || "";
  const ogImage = seo.default_og_image ? absoluteUrl(seo.default_og_image) : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: site.name || "Codigix Infotech",
    // Indexable unless NEXT_PUBLIC_NOINDEX=true (staging/test servers) — see INDEXABLE.
    robots: INDEXABLE
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        }
      : { index: false, follow: false },
    formatDetection: { telephone: false, email: false, address: false },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: site.name || "Codigix Infotech",
      type: "website",
      locale: "en_IN",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo.twitter_handle || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
    verification: seo.google_site_verification ? { google: seo.google_site_verification } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#1a1053",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site, contact, social } = await getSettings();
  const sameAs = Object.values(social).filter((v): v is string => typeof v === "string" && /^https?:\/\//.test(v));

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: site.name || "Codigix Infotech",
    url: SITE_URL,
    logo: absoluteUrl(site.logo || "/logo.webp"),
    description: site.tagline || "Healthcare Digital Marketing Agency",
    email: contact.email || undefined,
    telephone: contact.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: [contact.address_line1, contact.address_line2].filter(Boolean).join(", ") || undefined,
      addressLocality: contact.city || "Pune",
      addressRegion: contact.state || undefined,
      postalCode: contact.postal_code || undefined,
      addressCountry: "IN",
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name || "Codigix Infotech",
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-script-component */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ld(jsonLd)}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
