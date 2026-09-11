export interface WorkItem {
  id: string;
  title: string;
  description: string;
  roleTag?: string;
  tags: string[];
  link?: string;
  linkStatus: "live" | "pending";
  pendingToast?: string;
  github?: string;
  image: string;
  images?: string[];
  imageAlt: string;
  category?: "engineering" | "design";
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
  },
  {
    id: "student-result-management",
    title: "Student Result Management System",
    description:
      "Full-stack portal for students, teachers, and admins — auth, CRUD, shared database.",
    roleTag: "Full-Stack Build",
    tags: ["Python", "JS", "HTML/CSS"],
    link: "#",
    linkStatus: "pending",
    pendingToast: "Student Result Management System: Redeploying soon",
    image: "/projects/srms.jpg",
    imageAlt: "Student Result Management System grade entry and role permission interface",
    category: "engineering",
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
  },
  {
    id: "orbit",
    title: "Orbit",
    description:
      "A 3-day industry summit by GDG on Campus Babcock built around \"Closing the Distance\" — connecting students with the tech industry through company field trips, unscripted industry conversations, and a closing career fair with recruiters.",
    roleTag: "Design Team Lead",
    tags: ["Event Branding", "Figma"],
    link: "https://orbit.gdgbabcock.com/",
    linkStatus: "live",
    image: "/projects/Orbit.png",
    imageAlt: "Orbit tech summit website interface and schedule",
    category: "design",
  },
  {
    id: "biv-summit",
    title: "BIV Innovation Summit 2026",
    description:
      "Babcock's first innovation summit — 600+ attendees, 20+ speakers including a Federal Minister, and a ₦50M+ pilot fund, marking the official launch of Babcock Innovation & Ventures.",
    roleTag: "Design Team Member",
    tags: ["Event Branding", "Figma"],
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
    imageAlt: "Babcock Innovation & Ventures Summit 2026 platform",
    category: "design",
  },
  {
    id: "imprint-global",
    title: "Imprint Global",
    description:
      "Automated merchandise mockup and seasonal print/social template graphic design pipeline.",
    roleTag: "UI Design & Automation",
    tags: ["Figma", "Canva", "Print Pre-press"],
    link: "#",
    linkStatus: "pending",
    pendingToast: "Imprint Global: Production case study archive coming soon",
    image: "/projects/imprint-global.jpg",
    imageAlt: "Imprint Global automated print production and marketing mockups",
    category: "design",
  },
];
