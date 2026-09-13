export interface SubItem {
  title: string;
  description: string;
  tag: string;
  link?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  dateRange: string;
  summary: string;
  highlights: string[];
  subItems?: SubItem[];
  status?: string;
  tags?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "totalenergies",
    company: "TotalEnergies Nigeria",
    title: "Telecommunications & Networking Intern",
    dateRange: "Jan–Jun 2025",
    summary:
      "Sat at the front line of infrastructure and people. When a network issue came in — from an office, a conference room, or the staff residential quarters — traced it back to source in the data room and worked with a supervisor (often coordinating remote access to switches and routers) until resolved. Over six months this expanded into onboarding new employees' and interns' network setups, coordinating with the ISP when faults were upstream, and joining the infrastructure team to maintain and deploy servers.",
    highlights: [
      "Improved network reliability for hundreds of end users by configuring and testing enterprise switches/routers via Cisco CLI, following structured field-operations troubleshooting workflows.",
      "Reduced faults and downtime for 50+ residents in the KBR residential area, logging findings and escalating systemic patterns to senior engineers.",
      "Compiled incident and maintenance reports from active infrastructure site visits, feeding into the team's continuous-improvement process.",
    ],
    tags: ["Cisco CLI", "PuTTY", "Switch & Router Config", "LAN/WAN Diagnostics", "Data Room Operations", "Server Deployment"],
  },
  {
    id: "gdg-babcock",
    company: "GDG Babcock",
    title: "Lead Product Designer",
    dateRange: "2025–2026",
    summary:
      "Google Developer Group's Babcock University chapter — a university-wide community open beyond the computing faculty. Led and contributed to design across the chapter's flagship initiatives — Orbit, the BIV Innovation Summit, and Babcock 100 (see Work section) — alongside day-to-day event and community materials.",
    highlights: [
      "Led design across flagship initiatives including Orbit, BIV Innovation Summit 2026, and Babcock 100.",
      "Established community design standards for event branding, presentation decks, and web portals.",
      "Mentored student designers and coordinated cross-functional creative delivery for campus-wide developer events.",
    ],
    subItems: [
      {
        title: "Orbit Tech Summit",
        description: "Visual identity, schedule experience, and responsive web platform for 3-day industry summit.",
        tag: "Event Branding · Web Design",
        link: "https://orbit.gdgbabcock.com/",
      },
      {
        title: "BIV Innovation Summit 2026",
        description: "Branding and digital presence for Babcock's 600+ attendee innovation launch with ₦50M+ fund.",
        tag: "Event Branding · Web Design",
        link: "https://www.babcockinnovation.com/summit",
      },
      {
        title: "Babcock 100",
        description: "Full UI/UX design for annual recognition portal documenting 100 standout student leaders.",
        tag: "Product Design",
        link: "https://babcock100.com/",
      },
    ],
    tags: ["Product Design", "Event Branding", "Web Design", "Design Systems", "Community Leadership"],
  },
  {
    id: "eventnav",
    company: "EventNav",
    title: "Co-Founder & COO",
    dateRange: "2025-present",
    status: "Development Paused",
    summary:
      "Co-founded EventNav, owning day-to-day operations and driving product decisions — UI/UX direction, feature prioritization, roadmap calls — while balancing this against the founding team's bandwidth across other ventures. Development is currently paused, but the role sharpened how to structure ambiguous, resource-constrained work and translate ideas into decisions a small team can actually execute on.",
    highlights: [
      "Defined product architecture and core feature scope for MVP, balancing technical feasibility against launch timelines.",
      "Spearheaded user research and produced Figma interface designs for discovery, ticketing, and interactive venue navigation.",
      "Managed team operational workflows, maintaining documentation clarity and feature backlog prioritization.",
    ],
    tags: ["Product Strategy", "UI/UX Design", "Figma", "Feature Prioritization", "Operations Management"],
  },
  {
    id: "imprint",
    company: "Imprint Global",
    title: "Graphics Designer",
    dateRange: "May-Jul 2026",
    summary:
      "Graphic designer for the ministry, including program flyers, youtube tumbnails, birthday flyers and institution branding",
    highlights: [
      "Created and edited high-quality graphics for programs and events",
      "Produced professional youtube thumbnails, promotional flyers, and presentation slides.",
      "Designed and maintained the ministry's visual identity across digital and print platforms.",
    ],
    tags: ["Figma", "Canva", "Graphics Design", "Youtube Thumbnails", "Promotional Flyers", "Design Systems"],
  },
];
