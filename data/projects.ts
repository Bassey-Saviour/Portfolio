export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  period?: string;
  featured: boolean;
  thesis?: string;
  overview: string;
  roleDescription: {
    title: string;
    details: string;
    responsibilities: string[];
  };
  technicalHighlights: string[];
  stack: string[];
  status: {
    label: string;
    type: "active" | "archived" | "in-progress" | "redeploy-pending";
    note?: string;
  };
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  interactiveType?: "bayes-simulator" | "portal-preview";
}
export const projectsData: Project[] = [
  {
    id: "bayesvest",
    title: "BayesVest",
    subtitle: "Bayesian Portfolio Recommendation System",
    tagline: "Dynamic asset allocation and goal-probability estimation using continuous Bayesian inference.",
    featured: true,
    thesis:
      "Most robo-advisors lock users into a static, one-time-questionnaire risk profile that never adapts. BayesVest replaces that with continuous Bayesian updating — recommendations shift as market conditions or user parameters evolve — and surfaces uncertainty (probability of achieving a specific financial goal) instead of a flat black-box recommendation.",
    overview:
      "A quantitative portfolio recommendation system: users input a structured financial profile (age, income, risk tolerance, horizon, savings, goals, monthly investment, and financial knowledge level). Merged with live market data, a Bayesian model predicts an optimal portfolio strategy (Conservative, Moderate, Aggressive) with asset allocation breakdown, curated ETF suggestions, and 5/10/20-year growth trajectories — surfaced through a cross-platform Flutter application.",
    roleDescription: {
      title: "Co-creator & Product/Documentation Lead",
      details:
        "Defined the core product problem and multi-variable financial-profile inputs. Argued and established the fundamental thesis for continuous Bayesian updating over static questionnaires. Owned complete technical documentation, comprehensive literature review, architecture specifications, and investor/academic presentation.",
      responsibilities: [
        "Product Definition: Structured the 8-point financial profiling model and UX flow",
        "Probabilistic Thesis: Formulated the continuous Bayesian belief-updating rationale",
        "Technical Documentation: Authored complete architecture docs, literature review & presentation defense",
        "Collaboration: Partnered with engineering co-creator (who built the PyMC3/scikit-learn engine, Flutter app & Redis pipeline)",
      ],
    },
    technicalHighlights: [
      "Dynamic Bayesian inference updates prior risk beliefs with new market & behavioral signals",
      "Goal probability modeling: surfaces confidence intervals rather than deterministic outputs",
      "Multi-asset class allocation across Equities, Fixed Income, Index ETFs, and Liquid Reserves",
      "Asynchronous data pipeline integrating Alpha Vantage market feeds with Redis caching",
    ],
    stack: [
      "PyMC3",
      "scikit-learn",
      "Flutter",
      "Python",
      "Alpha Vantage API",
      "Redis",
      "Dart",
    ],
    status: {
      label: "Research & Prototype Complete",
      type: "active",
      note: "Architecture & research paper finalized; model and mobile prototype validated.",
    },
    links: {
      github: "https://github.com",
      docs: "#",
    },
    interactiveType: "bayes-simulator",
  },
  {
    id: "student-result-management",
    title: "Student Result Management System",
    subtitle: "Role-Based Academic Records & Grading Portal",
    tagline: "Secure three-tier educational administration platform with role-based auth and automated GPA calculation.",
    featured: true,
    overview:
      "A comprehensive student results management and grading portal engineered with three distinct authorization tiers — Student, Teacher, and Administrator. Provides automated grade verification, GPA computation, batch transcript generation, and secure record management backed by a normalized relational database. Built, configured, and deployed solo.",
    roleDescription: {
      title: "Full-Stack Developer & Solo Creator",
      details:
        "Engineered the full application from scratch: relational database schema design, backend role authentication, CRUD workflows for score inputs, and frontend responsive portal interfaces.",
      responsibilities: [
        "Database Architecture: Designed normalized MySQL schema for students, courses, grades, and faculty",
        "Authorization Matrix: Implemented role-based session validation across 3 portal tiers",
        "Data Ingestion & GPA Logic: Built automated scoring calculation and transcript PDF export routines",
        "Deployment & Operations: Configured Linux hosting environment and web server routing",
      ],
    },
    technicalHighlights: [
      "Strict role-based access control (RBAC) isolating administrative privileges from student views",
      "Automated semester grade computation and cumulative weighted GPA calculation algorithms",
      "Instant query indexing for rapid student record search and bulk transcript export",
      "Responsive, clean UI engineered for rapid data entry by faculty members",
    ],
    stack: ["Python", "Flask", "MySQL", "JavaScript", "HTML5", "CSS3"],
    status: {
      label: "Redeploy Pending",
      type: "redeploy-pending",
      note: "Was live in production; currently being migrated to modern cloud deployment (Railway/Render).",
    },
    links: {
      github: "https://github.com",
    },
    interactiveType: "portal-preview",
  },
];
