export interface TechTool {
  name: string;
  category: string;
  color: string;
  bg: string;
  type: string;
  proficiency: number; // 0-100 percentage (editable)
  level: string; // e.g. "Advanced", "Expert", "Proficient", "Intermediate"
  pills: string[]; // Use case badges
  summary: string; // 1-sentence description of use
}

export const techStackData: TechTool[] = [
  {
    name: "React",
    category: "Frontend Library",
    color: "#61DAFB",
    bg: "rgba(97,218,251,.12)",
    type: "react",
    proficiency: 90,
    level: "Advanced",
    pills: ["Interactive UI", "State Architecture", "Custom Hooks", "Component Systems"],
    summary: "Primary daily driver for building reactive, high-performance client web applications.",
  },
  {
    name: "Next.js",
    category: "Fullstack Framework",
    color: "#F2E9DC",
    bg: "rgba(242,233,220,.08)",
    type: "next",
    proficiency: 88,
    level: "Advanced",
    pills: ["App Router", "SSR & SSG", "API Routes", "SEO Architecture"],
    summary: "Production backbone for hybrid server/client rendering and scalable fullstack web apps.",
  },
  {
    name: "Tailwind",
    category: "Styling Engine",
    color: "#38BDF8",
    bg: "rgba(56,189,248,.12)",
    type: "tailwind",
    proficiency: 94,
    level: "Expert",
    pills: ["Design Tokens", "Responsive Layouts", "Micro-Interactions", "Glassmorphism"],
    summary: "Utility-first styling architecture for crafting cohesive, pixel-perfect interfaces rapidly.",
  },
  {
    name: "Python",
    category: "General Purpose",
    color: "#FFD43B",
    bg: "rgba(255,212,59,.12)",
    type: "python",
    proficiency: 78,
    level: "Proficient",
    pills: ["Data Automation", "Scripting", "CLI Utilities", "Backend Logic"],
    summary: "Tool of choice for task automation, data processing pipelines, and background logic.",
  },
  {
    name: "Git",
    category: "Version Control",
    color: "#F05032",
    bg: "rgba(240,80,50,.12)",
    type: "git",
    proficiency: 86,
    level: "Advanced",
    pills: ["Branch Strategies", "Merge & Rebase", "Release Tags", "Team Collab"],
    summary: "Essential source control discipline for clean history, code reviews, and continuous delivery.",
  },
  {
    name: "MySQL",
    category: "Relational Database",
    color: "#4D8DAC",
    bg: "rgba(77,141,172,.12)",
    type: "mysql",
    proficiency: 75,
    level: "Intermediate",
    pills: ["Schema Modeling", "Complex Queries", "Foreign Keys", "Data Integrity"],
    summary: "Structured relational database design, table relationships, and performant querying.",
  },
  {
    name: "Figma",
    category: "Product & UI/UX",
    color: "#F24E1E",
    bg: "rgba(242,78,30,.12)",
    type: "figma",
    proficiency: 95,
    level: "Expert",
    pills: ["Design Systems", "Interactive Prototypes", "Auto-Layout", "Dev Handoff"],
    summary: "Core workspace for product strategy, high-fidelity prototypes, and component libraries.",
  },
  {
    name: "Canva",
    category: "Visual Design",
    color: "#7D2AE8",
    bg: "rgba(125,42,232,.12)",
    type: "canva",
    proficiency: 92,
    level: "Advanced",
    pills: ["Event Branding", "Promotional Flyers", "Social Creatives", "Print Layouts"],
    summary: "High-speed graphic design for ministry events, marketing collateral, and creative media.",
  },
  {
    name: "Cisco",
    category: "Networking & Telecom",
    color: "#1BA0D7",
    bg: "rgba(27,160,215,.12)",
    type: "cisco",
    proficiency: 82,
    level: "Proficient",
    pills: ["Switch/Router CLI", "VLAN Segmentation", "Diagnostics", "Data Room Ops"],
    summary: "Enterprise network hardware configuration, routing diagnostics, and field operations.",
  },
];

export const tools = techStackData;

// Compute responsive popover alignment so it never bleeds off viewport edges on mobile/tablet/desktop
export function getPopoverPosition(index: number) {
  // Mobile (3 cols: index % 3)
  const mobileCol = index % 3;
  let mobileClass = "left-1/2 -translate-x-1/2 right-auto";
  let mobileArrow = "left-1/2 -translate-x-1/2 right-auto";
  if (mobileCol === 0) {
    mobileClass = "left-0 translate-x-0 right-auto";
    mobileArrow = "left-8 right-auto translate-x-0";
  } else if (mobileCol === 2) {
    mobileClass = "right-0 left-auto translate-x-0";
    mobileArrow = "right-8 left-auto translate-x-0";
  }

  // Tablet (5 cols: index % 5)
  const smCol = index % 5;
  let smClass = "sm:left-1/2 sm:-translate-x-1/2 sm:right-auto";
  let smArrow = "sm:left-1/2 sm:-translate-x-1/2 sm:right-auto";
  if (smCol === 0) {
    smClass = "sm:left-0 sm:translate-x-0 sm:right-auto";
    smArrow = "sm:left-8 sm:right-auto sm:translate-x-0";
  } else if (smCol === 4) {
    smClass = "sm:right-0 sm:left-auto sm:translate-x-0";
    smArrow = "sm:right-8 sm:left-auto sm:translate-x-0";
  }

  // Desktop (9 cols in single row)
  let lgClass = "lg:left-1/2 lg:-translate-x-1/2 lg:right-auto";
  let lgArrow = "lg:left-1/2 lg:-translate-x-1/2 lg:right-auto";
  if (index <= 1) {
    lgClass = "lg:left-0 lg:translate-x-0 lg:right-auto";
    lgArrow = "lg:left-8 lg:right-auto lg:translate-x-0";
  } else if (index >= 7) {
    lgClass = "lg:right-0 lg:left-auto lg:translate-x-0";
    lgArrow = "lg:right-8 lg:left-auto lg:translate-x-0";
  }

  return {
    popover: `${mobileClass} ${smClass} ${lgClass}`,
    arrow: `${mobileArrow} ${smArrow} ${lgArrow}`,
  };
}
