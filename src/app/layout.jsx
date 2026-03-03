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
  title: "DigitalGeeksz",
  description: "DigitalGeeks is a leading technology company of developers, designers, and insights on various digital topics.",
  keywords: "technology blog, digital topics, articles, tutorials, insights, software development, web development, artificial intelligence, machine learning, cybersecurity, DigitalGeeks, community",
  authors: [{ name: "DigitalGeeks" }],
  openGraph: {
    siteName: "DigitalGeeks",
    url: "https://www.digitalgeeks.pl",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} dark`}>
      <head>
        <link rel="icon" type="image/ico" href="/Icon.ico" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://www.digitalgeeks.pl" />
        <meta property="article:publisher" content="https://www.facebook.com/digitalgeeksz" />
        <meta property="article:author" content="https://www.facebook.com/digitalgeeksz" />
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
              "name": "DigitalGeeks",
              "url": "https://www.digitalgeeks.pl",
              "logo": "https://www.digitalgeeks.pl/Icon.ico",
              "description": "DigitalGeeks is a leading technology company providing insights on digital topics."
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
