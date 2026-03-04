import "../index.css";
import { Providers } from "./providers";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Digital Geeks | Leading Tech Innovations & Digital Solutions",
  description: "Digital Geeks is a premier technology partner specializing in software development, AI, and digital transformation. Discover insights, tutorials, and cutting-edge solutions.",
  keywords: "technology company, software development, digital transformation, AI, machine learning, cybersecurity, web development, Digital Geeks, tech solutions, digitalgeeks.tech",
  authors: [{ name: "Digital Geeks" }],
  metadataBase: new URL("https://www.digitalgeeks.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Digital Geeks | Leading Tech Innovations",
    description: "Empowering businesses through cutting-edge technology and digital excellence.",
    url: "https://www.digitalgeeks.tech",
    siteName: "Digital Geeks",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Geeks | Leading Tech Innovations",
    description: "Empowering businesses through cutting-edge technology and digital excellence.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} dark`}>
      <head>
        <link rel="icon" type="image/ico" href="/Icon.ico" />
        <meta name="theme-color" content="#000000" />
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TBZ878WQYY`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-TBZ878WQYY");
          `}
        </Script>
        {/* Structured Data Markup */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Digital Geeks",
              "url": "https://www.digitalgeeks.tech",
              "logo": "https://www.digitalgeeks.tech/Icon.ico",
              "description": "Digital Geeks is a leading technology company providing insights on digital topics and building world-class software.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/digitalgeeksz",
                "https://www.instagram.com/digitalgeeksz",
                "https://www.linkedin.com/company/92799402",
                "https://x.com/digitalgeeksz"
              ]
            })
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
