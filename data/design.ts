export interface DesignItem {
  id: string;
  title: string;
  category: "Product / UI Design" | "Visual Production" | "Design Systems";
  clientOrProject: string;
  problem: string;
  solution: string;
  contribution: string;
  tools: string[];
  aspectRatio: string;
  previewType: "fintech-ui" | "event-ui" | "academic-portal" | "code-generated-print";
  accentColor: string;
}

export const designData: DesignItem[] = [
  {
    id: "bayesvest-ui",
    title: "BayesVest — Probabilistic Investment Interface",
    category: "Product / UI Design",
    clientOrProject: "BayesVest",
    problem:
      "Traditional robo-advisor interfaces overwhelm users with static questionnaires and obscure mathematical output behind unhelpful risk labels.",
    solution:
      "Designed an adaptive financial onboarding flow with live risk sliders, clear asset breakdown visualizations, and interactive confidence intervals that visibly shift as market parameters are tweaked.",
    contribution:
      "Defined all wireframes, color hierarchies, component libraries, and interactive prototype flows in Figma.",
    tools: ["Figma", "Design Systems", "Prototyping", "Information Hierarchy"],
    aspectRatio: "16/10",
    previewType: "fintech-ui",
    accentColor: "#E8963C",
  },
  {
    id: "eventnav-app",
    title: "EventNav — Frictionless Venue & Discovery UI",
    category: "Product / UI Design",
    clientOrProject: "EventNav",
    problem:
      "Attendees at multi-stage campus and corporate events constantly lose track of live session locations and navigation routes.",
    solution:
      "Crafted an interactive venue discovery interface combining live schedule timelines, indoor waypoint navigation cards, and instant ticket pass wallet views.",
    contribution:
      "Led end-to-end UX research, user journey mapping, and mobile UI design from concept to high-fidelity clickable prototype.",
    tools: ["Figma", "User Journey Mapping", "Mobile UI", "Component Tokens"],
    aspectRatio: "16/10",
    previewType: "event-ui",
    accentColor: "#4F7CAC",
  },
  {
    id: "academic-portal-ui",
    title: "Academic Portal — High-Density Grading Matrix",
    category: "Design Systems",
    clientOrProject: "Student Result Management System",
    problem:
      "Faculty members faced severe cognitive fatigue and input errors when entering hundreds of student test scores into outdated tables.",
    solution:
      "Engineered a keyboard-navigable, high-contrast data entry matrix with instant inline validation, batch score calculation, and clear visual hierarchy for student transcript review.",
    contribution:
      "Designed the layout system, typography scale, and responsive CSS framework for fast, error-free faculty input.",
    tools: ["UI Architecture", "Figma", "Tailwind CSS", "Data Density"],
    aspectRatio: "16/10",
    previewType: "academic-portal",
    accentColor: "#E8963C",
  },
  {
    id: "imprint-global",
    title: "Imprint Global — Algorithmic Print & Social Production",
    category: "Visual Production",
    clientOrProject: "Imprint Global",
    problem:
      "Producing custom branded merchandise mockups and seasonal social campaign posters manually was time-consuming and prone to alignment inconsistencies.",
    solution:
      "Built automated Python/PIL layout scripts that dynamically render print-ready custom jotter covers and high-resolution campaign assets (including the 'Hello July' series).",
    contribution:
      "Engineered the Python imaging pipeline, designed typography templates, and standardized layout assets for production output.",
    tools: ["Python / Pillow (PIL)", "Typography Design", "Canva", "Print Pre-press"],
    aspectRatio: "16/10",
    previewType: "code-generated-print",
    accentColor: "#4F7CAC",
  },
];
