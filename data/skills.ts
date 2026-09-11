export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  accent: string;
  items: {
    name: string;
    level?: string;
    highlight?: boolean;
    context?: string;
  }[];
}
export const skillsData: SkillCategory[] = [
  {
    id: "systems-infrastructure",
    category: "Systems & Infrastructure",
    description: "Hands-on network operations, switch/router configuration, and physical-to-logical diagnostics.",
    accent: "cobalt",
    items: [
      { name: "Cisco CLI", highlight: true, context: "Enterprise switch/router configuration" },
      { name: "PuTTY & SSH", highlight: true, context: "Remote terminal sessions & console access" },
      { name: "Switch & Router Configuration", highlight: true, context: "VLANs, trunking, interface policies" },
      { name: "Network Troubleshooting", highlight: true, context: "Layer 1–3 fault isolation & ISP escalation" },
      { name: "Server Maintenance & Deployment", context: "Hardware rack mounting, OS installs & monitoring" },
      { name: "LAN / WAN Architecture", context: "Campus network design & topology mapping" },
    ],
  },
  {
    id: "development",
    category: "Development",
    description: "Full-stack web and backend engineering with modern JavaScript/TypeScript and Python ecosystems.",
    accent: "amber",
    items: [
      { name: "React / Next.js", highlight: true, context: "App Router, SSR, modern UI architecture" },
      { name: "JavaScript & TypeScript", highlight: true, context: "Modern ES6+, type-safe application logic" },
      { name: "Tailwind CSS", highlight: true, context: "Design token systems & responsive layouts" },
      { name: "Python", highlight: true, context: "Data pipelines, Flask/web backends, scripting" },
      { name: "MySQL & Relational DBs", highlight: true, context: "Schema normalization, indexing, queries" },
      { name: "Git & Version Control", context: "Branching strategies, collaborative workflows" },
      { name: "HTML5 & CSS3", context: "Semantic markup, modern layout primitives" },
    ],
  },
  {
    id: "design-product",
    category: "Design & Product",
    description: "Translating ambiguous operational requirements into intuitive user interfaces and actionable roadmaps.",
    accent: "amber",
    items: [
      { name: "UI/UX Design", highlight: true, context: "Design systems, user flows, interaction design" },
      { name: "Figma", highlight: true, context: "High-fidelity prototypes, components & auto-layout" },
      { name: "Feature Prioritization", highlight: true, context: "Roadmap formulation & scope discipline" },
      { name: "Canva & Visual Assets", context: "Marketing collateral & layout production" },
      { name: "Product Definition", context: "Translating stakeholder needs into engineering specs" },
    ],
  },
  {
    id: "communication-documentation",
    category: "Communication & Documentation",
    description: "Synthesizing complex technical models, research literature, and operational logs into clear documentation.",
    accent: "cobalt",
    items: [
      { name: "Technical Documentation", highlight: true, context: "System architectures, API specs & developer guides" },
      { name: "Presentation Design", highlight: true, context: "Executive summaries & technical defenses" },
      { name: "Literature Review & Research", highlight: true, context: "Mathematical & algorithmic model synthesis" },
      { name: "Incident Logging & Reporting", context: "Field-ops reporting & post-incident reviews" },
    ],
  },
];
