import { Navbar, Footer } from "../components";
import HomeHero from "../components/home/HomeHero";
import SwipeeSection from "../components/home/SwipeeSection";
import ZimSenseiSection from "../components/home/ZimSenseiSection";
import PreciAgroSection from "../components/home/PreciAgroSection";
import CompanySection from "../components/home/CompanySection";
import ServicesTeaser from "../components/home/ServicesTeaser";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="dg-site w-full bg-white text-dg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-dg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HomeHero />
        <SwipeeSection />
        <ZimSenseiSection />
        <PreciAgroSection />
        <CompanySection />
        <ServicesTeaser />
      </main>
      <Footer />
    </div>
  );
}
