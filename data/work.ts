export interface WorkLink {
  label: string;
  url?: string;
  type: "github" | "live" | "figma" | "download" | "instagram" | "gallery" | "external";
  status?: "live" | "pending";
  pendingToast?: string;
}

export interface ShowcaseSlide {
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  roleTag?: string;
  tags: string[];
  link?: string;
  linkStatus?: "live" | "pending";
  pendingToast?: string;
  github?: string;
  image: string;
  images?: string[];
  imageAlt: string;
  category?: "engineering" | "design";
  links?: {
    primary: WorkLink;
    secondary: WorkLink;
  };
  showcaseItems?: ShowcaseSlide[];
}

export const workData: WorkItem[] = [
  {
    id: "bayesvest",
    title: "BayesVest",
    description:
      "Bayesian portfolio recommendation system that replaces static robo-advisor questionnaires with continuous, adaptive predictions.",
    roleTag: "Product & Documentation",
    tags: ["PyMC3", "scikit-learn", "Flutter"],
    link: "https://github.com/Bassey-Saviour",
    linkStatus: "live",
    github: "https://github.com/Bassey-Saviour",
    image: "/projects/bayesvest copy.jpg",
    imageAlt: "BayesVest continuous Bayesian portfolio recommendation dashboard",
    category: "engineering",
    links: {
      primary: {
        label: "Source Code",
        url: "https://github.com/Bassey-Saviour",
        type: "github",
      },
      secondary: {
        label: "Download App",
        url: "https://github.com/Bassey-Saviour",
        type: "download",
      },
    },
  },
  {
    id: "babcock-100",
    title: "Babcock 100",
    description:
      "A recognition platform run by GDG on Campus Babcock that identifies and publicly documents 100 students shaping the university each year, through a structured five-criteria nomination and review process.",
    roleTag: "Full UI/UX Design",
    tags: ["Figma", "Product Design"],
    link: "https://babcock100.com/",
    linkStatus: "live",
    image: "/projects/babcock100.png",
    imageAlt: "Babcock 100 student recognition platform interface",
    category: "design",
    links: {
      primary: {
        label: "Figma Design",
        url: "#",
        type: "figma",
        status: "live",
        pendingToast: "Babcock 100 Figma Design File: Available on request",
      },
      secondary: {
        label: "Live Site",
        url: "https://babcock100.com/",
        type: "live",
      },
    },
  },
  {
    id: "orbit",
    title: "Orbit",
    description:
      "A 3-day industry summit by GDG on Campus Babcock built around \"Closing the Distance\" — connecting students with the tech industry through company field trips, unscripted industry conversations, and a closing career fair with recruiters.",
    roleTag: "Design Team Lead",
    tags: ["Event Branding", "Figma", "Visual Identity"],
    link: "https://orbit.gdgbabcock.com/",
    linkStatus: "live",
    image: "/projects/Orbit.png",
    imageAlt: "Orbit tech summit website interface and schedule",
    category: "design",
    links: {
      primary: {
        label: "Figma Design",
        url: "#",
        type: "figma",
        status: "live",
        pendingToast: "Orbit Tech Summit Visual Assets & Figma File: Available on request",
      },
      secondary: {
        label: "Live Site",
        url: "https://orbit.gdgbabcock.com/",
        type: "live",
      },
    },
  },
  {
    id: "biv-summit",
    title: "BIV Innovation Summit 2026",
    description:
      "One of 50 core committee students coordinating Babcock's 600+ attendee innovation summit (featuring 20+ speakers and a Federal Minister). Drove technical operations — speaker deck collation, AV projection, and outfitting 6 breakout lab venues (mics, displays, logistics) — alongside designing all official accreditation passes (attendee, volunteer, VIP, and Principal Officers including the Vice-Chancellor).",
    roleTag: "Core Committee · Technical Operations & Design",
    tags: ["Tech Operations", "Accreditation Design", "AV Logistics", "Event Branding"],
    link: "https://www.babcockinnovation.com/summit",
    linkStatus: "live",
    image: "/projects/AI_BIV1.jpg",
    images: [
      "/projects/AI_BIV1.jpg",
      "/projects/AI_BIV2.jpg",
      "/projects/AI_BIV3.jpeg",
      "/projects/AI_BIV4.jpg",
      "/projects/AI_BIV5.jpeg",
      "/projects/AI_BIV6.jpeg",
      "/projects/AI_BIV7.jpg",
      "/projects/AI_BIV8.jpg",
    ],
    imageAlt: "Babcock Innovation & Ventures Summit 2026 platform and event accreditation",
    category: "design",
    links: {
      primary: {
        label: "Figma Design",
        url: "#",
        type: "figma",
        status: "live",
        pendingToast: "BIV Summit 2026 Accreditation & Brand Deck: Available on request",
      },
      secondary: {
        label: "Summit Site",
        url: "https://www.babcockinnovation.com/summit",
        type: "live",
      },
    },
  },
  {
    id: "imprint-global",
    title: "Imprint Global",
    description:
      "Graphic design for the ministry across digital and print touchpoints — producing promotional program flyers, high-CTR YouTube thumbnails, event announcement graphics, and brand merchandise mockups.",
    roleTag: "Graphics Design & Brand Collateral",
    tags: ["Figma", "Canva", "Program Flyers", "YouTube Thumbnails"],
    link: "https://www.instagram.com/imprintglobal",
    linkStatus: "live",
    image: "/projects/imprint-global.jpg",
    images: ["/projects/imprint-global.jpg"],
    imageAlt: "Imprint Global promotional event flyers and brand collateral",
    category: "design",
    links: {
      primary: {
        label: "View Flyers",
        type: "gallery",
      },
      secondary: {
        label: "Instagram",
        url: "https://www.instagram.com/imprintglobal",
        type: "instagram",
      },
    },
    showcaseItems: [
      {
        title: "Program & Event Flyers",
        category: "Event Promotion",
        description:
          "Designed multi-tier promotional flyers for ministry programs and special events, balancing custom typography, dynamic color harmony, and print-ready prepress specs.",
        image: "/projects/imprint-global.jpg",
        tags: ["Canva", "Figma", "Typography", "Print Pre-press"],
      },
      {
        title: "YouTube Thumbnails & Social Broadcast",
        category: "Digital Media",
        description:
          "Produced high-contrast, attention-grabbing YouTube thumbnails, birthday flyers, and presentation slides engineered for clear focal points and strong mobile feed click-through.",
        image: "/projects/imprint-global.jpg",
        tags: ["YouTube Thumbnails", "Social Graphics", "Visual Systems"],
      },
      {
        title: "Institutional Branding & Merchandise",
        category: "Brand Collateral",
        description:
          "Maintained visual identity consistency across print and digital deliverables, including custom jotter mockups, seasonal campaign collateral, and official institution assets.",
        image: "/projects/imprint-global.jpg",
        tags: ["Brand Identity", "Merchandise Mockups", "Vector Artwork"],
      },
    ],
  },
];
