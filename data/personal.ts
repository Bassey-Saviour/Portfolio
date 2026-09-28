export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  isExternal?: boolean;
}
export interface CurrentlyItem {
  id: string;
  category: "Listening" | "Reading" | "Building" | "Exploring";
  title: string;
  subtitle: string;
  badge?: string;
  url?: string;
  details?: string;
}

export interface CurrentlyConfig {
  lastUpdated: string;
  items: CurrentlyItem[];
}

export interface PersonalInfo {
  name: string;
  initials: string;
  headline: string;
  subline: string;
  badge: string;
  location: string;
  education: {
    degree: string;
    honor: string;
    field: string;
  };
  about: {
    lead: string;
    paragraphs: string[];
  };
  contact: {
    email: string;
    phone?: string;
    location: string;
    socials: SocialLink[];
  };
  cv: {
    fileName: string;
    downloadUrl: string;
    lastUpdated: string;
  };
  currently?: CurrentlyConfig;
}
export const personalData: PersonalInfo = {
  name: "Saviour Bassey",
  initials: "SB",
  headline: "I build systems, then make them make sense.",
  subline:
    "First-Class CS graduate with real infrastructure experience and a track record of shaping technical work — from network operations to product interfaces — into something usable.",
  badge: "Available for NYSC / Roles · Lagos",
  location: "Lagos, Nigeria",
  education: {
    degree: "B.Sc. Computer Science", honor: "First Class Honours",
    field: "Computer Science & Systems Infrastructure",
  },
  about: {
    lead: "Bridging the gap between front-line infrastructure and usable product design.",
    paragraphs: [
      "I'm a computer scientist and systems engineer who works at the intersection of infrastructure and usable product design — from configuring enterprise networks at TotalEnergies, to shaping the product thinking behind BayesVest's adaptive investment model, to leading design across GDG Babcock's flagship initiatives. I'm currently targeting internship and NYSC placement in Lagos across technology, fintech, and infrastructure — bringing operational rigor and a habit of making complex systems make sense.",
    ],
  },
  contact: {
    email: "basseysaviour230@gmail.com", // [TODO: confirm preferred contact email]
    location: "Lagos, Nigeria",
    socials: [
      {
        label: "GitHub",
        url: "https://github.com/Bassey-Saviour",
        icon: "github",
        isExternal: true,
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/saviour-bassey1/",
        icon: "linkedin",
        isExternal: true,
      },
      {
        label: "Email",
        url: "mailto:basseysaviour230@gmail.com",
        icon: "mail",
      },
    ],
  },
  cv: {
    fileName: "Saviour_Bassey_CV.pdf",
    downloadUrl: "#contact", // [TODO: upload real PDF to /public/Saviour_Bassey_CV.pdf]
    lastUpdated: "2025",
  },
  currently: {
    lastUpdated: "Sept 2026",
    items: [
      {
        id: "listening",
        category: "Listening",
        title: "Higher",
        subtitle: "Burna Boy — I Told Them...",
        badge: "Heavy Rotation",
        url: "https://open.spotify.com",
        details: "Afrobeats with crisp brass arrangements and driving rhythmic clarity",
      },
      {
        id: "reading",
        category: "Reading",
        title: "Designing Data-Intensive Applications",
        subtitle: "Martin Kleppmann",
        badge: "Chapter 7: Transactions",
        details: "Reliability, partition tolerance, and maintainability in distributed systems",
      },
      {
        id: "building",
        category: "Building",
        title: "Trace Lines & System Ergonomics",
        subtitle: "Custom network diagram topology & Next.js 16 architectures",
        badge: "In Active Dev",
        details: "Bridging physical data room diagnostics to clean browser interfaces",
      },
      {
        id: "exploring",
        category: "Exploring",
        title: "Wireshark & Packet Tracing",
        subtitle: "Low-level protocol analysis & BGP routing mechanics",
        badge: "Deep Dive",
        details: "Hands-on analysis from Cisco switches to remote core gateways",
      },
    ],
  },
};
