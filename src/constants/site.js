// Site-wide content for the DigitalGeeks product site.
//
// Product facts here were checked against each product's own website
// (September 2026). Keep detailed features, pricing and onboarding on the
// product sites; only summarise what is currently available.

export const SITE_URL = "https://www.digitalgeeks.tech";

export const products = [
  {
    id: "swipee",
    name: "Swipee",
    href: "https://swipeeup.store",
    icon: "/products/swipee-symbol.svg",
  },
  {
    id: "zimsensei",
    name: "ZimSensei",
    href: "https://zimsensei.com",
    icon: "/products/zimsensei-icon.png",
  },
  {
    id: "preciagro",
    name: "PreciAgro",
    href: "https://preciagro.com",
    icon: "/products/preciagro-icon.png",
  },
];

export const companyLinks = [
  { name: "About DigitalGeeks", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our team", href: "/team" },
  { name: "Community", href: "/community" },
  { name: "Careers", href: "/careers" },
];

// Official DigitalGeeks accounts, carried over from the previous site.
export const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/92799402" },
  { name: "Instagram", href: "https://www.instagram.com/digitalgeeksz" },
  { name: "Facebook", href: "https://www.facebook.com/digitalgeeksz" },
  { name: "X", href: "https://x.com/digitalgeeksz" },
];

// Keys an admin can fill from Admin → Website Content to show real product
// screenshots. Until a key is set, the homepage shows an honest typographic
// treatment instead of an invented interface.
export const productScreenKeys = {
  swipeeCheckout: "product-swipee-checkout",
  swipeeSummary: "product-swipee-summary",
  zimsenseiFeedback: "product-zimsensei-feedback",
  preciagroInteraction: "product-preciagro-interaction",
};
