import {
  people01,
  people02,
  people03,
  airbnb,
  binance,
  coinbase,
  dropbox,
} from "../assets";

import { MdOutlineTipsAndUpdates, MdOutlinePeople, MdOutlineWorkspacePremium } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    link: "/",
  },
  {
    id: "about",
    title: "About Us",
    link: "/about",
  },
  {
    id: "services",
    title: "Services",
    link: "/services",
  },
  {
    id: "community",
    title: "Community and Culture",
    link: "/community",
  },
  {
    id: "team",
    title: "Our Team",
    link: "/team",
  },
  {
    id: "contact",
    title: "Contact Us",
    link: "/contact",
  },
  {
    id: "join",
    title: "Careers",
    link: "/careers",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: MdOutlineTipsAndUpdates,
    title: "Innovation:",
    content:
      "At Digital Geeks, we prioritize innovation in our work, always striving to bring fresh and creative ideas to the table. We encourage our developers to think outside the box, experiment with new technologies, and challenge the status quo to find better solutions for our clients.",
  },
  {
    id: "feature-2",
    icon: MdOutlinePeople,
    title: "Collaboration:",
    content:
      "Collaboration is a crucial part of our company's DNA, and we believe that working together leads to better outcomes. We encourage open communication and active participation from our team members, valuing every voice and perspective in our community.",
  },
  {
    id: "feature-3",
    icon: MdOutlineWorkspacePremium,
    title: "Excellence:",
    content:
      "Excellence is a core value at Digital Geeks, and we are committed to delivering the highest quality work on every project we undertake. We hold ourselves to the highest standards of professionalism, attention to detail, and customer service.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Every moment holds the potential to be a pivotal dot in your life's journey. Embrace each experience, connect the dots fearlessly, and marvel at the beautiful tapestry that emerges.",
    name: "Tinotenda Nyashanu",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Through collaboration, we multiply our knowledge, amplify our impact, and create a ripple effect of positive change.",
    name: "Tafadzwa Madzikanda",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "Quality is not an expense; it is an investment that pays dividends in customer satisfaction, loyalty, and long-term success.",
    name: "Patryk Trazaska",
    title: "PL Manager ",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Open Positions",
    value: "50+",
  },
  {
    id: "stats-2",
    title: "Innovating Projects",
    value: "100+",
  },
  {
    id: "stats-3",
    title: "Team Members",
    value: "40+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Summarizer",
        link: "https://summerizer-five.vercel.app/",
      },
      {
        name: "Branding Guideline",
        link: "https://publuu.com/flip-book/181271/445916/page/1",
      },
      // {
      //   name: "Create",
      //   link: "https://www.hoobank.com/create/",
      // },
      // {
      //   name: "Explore",
      //   link: "https://www.hoobank.com/explore/",
      // },
      // {
      //   name: "Terms & Services",
      //   link: "https://www.hoobank.com/terms-and-services/",
      // },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Join Community ",
        link: "/careers",
      },
      {
        name: "Careers",
        link: "/careers",
      },
      // {
      //   name: "Suggestions",
      //   link: "https://www.hoobank.com/suggestions/",
      // },
      // {
      //   name: "Blog",
      //   link: "https://www.hoobank.com/blog/",
      // },
      // {
      //   name: "Newsletters",
      //   link: "https://www.hoobank.com/newsletters/",
      // },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.linkedin.com/company/92799402",
      },
      {
        name: "Become a Partner",
        link: "https://www.linkedin.com/company/92799402",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: FaInstagram,
    link: "https://www.instagram.com/digitalgeeksz",
  },
  {
    id: "social-media-2",
    icon: FaFacebook,
    link: "https://www.facebook.com/digitalgeeksz",
  },
  {
    id: "social-media-3",
    icon: FaTwitter,
    link: "https://x.com/digitalgeeksz?s=21&t=ifzqj6IyGCX-PgD6NPgBKQ",
  },
  {
    id: "social-media-4",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/company/92799402",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];
