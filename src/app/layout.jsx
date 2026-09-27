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

const SITE_DESCRIPTION =
  "DigitalGeeks builds Swipee, ZimSensei and PreciAgro: products that make commerce, education and agriculture work better.";

export const metadata = {
  title: "DigitalGeeks | Swipee, ZimSensei and PreciAgro",
  description: SITE_DESCRIPTION,
  keywords:
    "DigitalGeeks, Swipee, ZimSensei, PreciAgro, point of sale, inventory, learning copilot, exam practice, agricultural intelligence, digital product development",
  authors: [{ name: "DigitalGeeks" }],
  metadataBase: new URL("https://www.digitalgeeks.tech"),
  openGraph: {
    title: "DigitalGeeks | Built for everyday progress",
    description: SITE_DESCRIPTION,
    url: "https://www.digitalgeeks.tech",
    siteName: "DigitalGeeks",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalGeeks | Built for everyday progress",
    description: SITE_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.digitalgeeks.tech/#organization",
      name: "DigitalGeeks",
      url: "https://www.digitalgeeks.tech",
      logo: "https://www.digitalgeeks.tech/brand/digitalgeeks-wordmark.png",
      description: SITE_DESCRIPTION,
      brand: [
        { "@type": "Brand", name: "Swipee", url: "https://swipeeup.store" },
        { "@type": "Brand", name: "ZimSensei", url: "https://zimsensei.com" },
        { "@type": "Brand", name: "PreciAgro", url: "https://preciagro.com" },
      ],
      sameAs: [
        "https://www.facebook.com/digitalgeeksz",
        "https://www.instagram.com/digitalgeeksz",
        "https://www.linkedin.com/company/92799402",
        "https://x.com/digitalgeeksz",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.digitalgeeks.tech/#website",
      url: "https://www.digitalgeeks.tech",
      name: "DigitalGeeks",
      publisher: { "@id": "https://www.digitalgeeks.tech/#organization" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} dark`}>
      <head>
        <link rel="icon" type="image/ico" href="/Icon.ico" />
        {/* Google Tag Manager */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TBZ878WQYY`}
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-TBZ878WQYY");
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
