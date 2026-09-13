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
  image: string;
  imageAlt: string;
  isPending?: boolean;
  links: {
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
    image: "/projects/bayesvest.webp",
    imageAlt: "BayesVest continuous Bayesian portfolio recommendation dashboard",
    links: {
      primary: {
        label: "Source Code",
        url: "https://github.com/Bayes-vest",
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
    image: "/projects/babcock100.webp",
    imageAlt: "Babcock 100 student recognition platform interface",
    links: {
      primary: {
        label: "Figma Design",
        url: "https://www.figma.com/design/TK25mTiFbs2G9QxRqj78FZ/Babcock-100?node-id=0-1&t=Am7WdYnjBju3mZyk-1",
        type: "figma",
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
    image: "/projects/orbit/orbit-1.webp",
    imageAlt: "Orbit tech summit branding, keynote posters, and promotional campaign",
    links: {
      primary: {
        label: "View Summit Branding",
        type: "gallery",
      },
      secondary: {
        label: "Live Site",
        url: "https://orbit.gdgbabcock.com/",
        type: "live",
      },
    },
    showcaseItems: [
      {
        title: "The Orbit Conference — Keynote Lineup",
        category: "Event Branding",
        description:
          "Official widescreen marquee banner announcing the summit lineup, schedule, and theme 'Closing The Distance — Innovation Beyond Limits' for GDG on Campus Babcock.",
        image: "/projects/orbit/orbit-1.webp",
        tags: ["Widescreen Banner", "Keynote Grid", "Visual Identity", "Typography"],
      },
      {
        title: "Full Speaker & Partner Grid",
        category: "Summit Poster",
        description:
          "High-resolution vertical summit poster highlighting all 13 keynote speakers, industry leaders, and panelists spanning MasterCard, Google, Moniepoint, and Digital Encode.",
        image: "/projects/orbit/orbit-2.webp",
        tags: ["Speaker Grid", "Conference Poster", "Editorial Layout", "Print Design"],
      },
      {
        title: "Speaker Feature — Mayowa Adewumi",
        category: "Speaker Spotlight",
        description:
          "Social announcement graphic spotlighting Mayowa Adewumi, Regional Manager of Security Solutions at MasterCard, engineered with Orbit's signature ultraviolet cosmic grid.",
        image: "/projects/orbit/orbit-3.webp",
        tags: ["Speaker Spotlight", "MasterCard", "Social Campaign", "Cosmic Grid"],
      },
      {
        title: "Panelist Feature — Adeife Adeoye",
        category: "Panelist Spotlight",
        description:
          "Editorial feature spotlight for Adeife Adeoye, Founder of Remote WorkHER, combining high-fashion portraiture with neon violet plinths and clear event metadata.",
        image: "/projects/orbit/orbit-4.webp",
        tags: ["Panelist Profile", "Tech Diversity", "Neon Lighting", "Social Feed"],
      },
      {
        title: "Gadget Cartel x ORBIT — Grand Raffle Draw",
        category: "Brand Partnership",
        description:
          "High-energy promotional poster for the official summit raffle draw sponsored by Gadget Cartel, showcasing prizes including an Apple MacBook Air M1 and Oraimo powerbanks with integrated QR registration.",
        image: "/projects/orbit/orbit-5.webp",
        tags: ["Sponsor Collateral", "Raffle Campaign", "3D Product Render", "Promotional"],
      },
      {
        title: "Introducing ORBIT — Campaign Carousel (01)",
        category: "Social Carousel",
        description:
          "Opening slide of the viral Instagram carousel campaign demystifying ORBIT for university students with an intriguing headline and kinetic celestial speed streaks.",
        image: "/projects/orbit/orbit-6.webp",
        tags: ["Carousel Hook", "Social Storytelling", "Kinetic Streaks", "Copywriting"],
      },
      {
        title: "The Problem — Mind The Gap (02)",
        category: "Social Carousel",
        description:
          "Problem-framing carousel slide highlighting the gap between theoretical classroom learning and real-world tech careers, establishing ORBIT's core purpose.",
        image: "/projects/orbit/orbit-7.webp",
        tags: ["Problem Framing", "Infographic", "Educational", "Brand Narrative"],
      },
      {
        title: "4 Days. Real Conversations (03)",
        category: "Social Carousel",
        description:
          "Feature breakdown slide detailing the 4 core pillars of ORBIT: Virtual Hackathon, Industry Field Trip, Panel Discussions, and the Mega Career Fair.",
        image: "/projects/orbit/orbit-8.webp",
        tags: ["Event Pillars", "Iconography", "Agenda Overview", "Visual Structure"],
      },
      {
        title: "Why This Matters — Access (04)",
        category: "Social Carousel",
        description:
          "Persuasive editorial slide reframing networking from impersonal job applications to direct, high-trust conversations with recruiters and tech executives.",
        image: "/projects/orbit/orbit-9.webp",
        tags: ["Value Proposition", "Typography Hierarchy", "Social Post", "Content Strategy"],
      },
      {
        title: "The Room Is Being Built — Call to Action (05)",
        category: "Social Carousel",
        description:
          "Closing activation slide urging students to register and share with peers, driving record registrations for GDG on Campus Babcock.",
        image: "/projects/orbit/orbit-10.webp",
        tags: ["Call to Action", "Viral Loop", "Community Growth", "Closing Slide"],
      },
    ],
  },
  {
    id: "biv-summit",
    title: "BIV Innovation Summit 2026",
    description:
      "One of 50 core committee students coordinating Babcock's 600+ attendee innovation summit (featuring 20+ speakers and a Federal Minister). Drove technical operations — speaker deck collation, AV projection, and outfitting 6 breakout lab venues (mics, displays, logistics) — alongside designing all official accreditation passes (attendee, volunteer, VIP, and Principal Officers including the Vice-Chancellor).",
    roleTag: "Core Committee · Technical Operations & Design",
    tags: ["Tech Operations", "Accreditation Design", "AV Logistics", "Event Branding"],
    image: "/projects/ai_biv/biv-1.webp",
    imageAlt: "Babcock Innovation & Ventures Summit 2026 platform, accreditation passes, and keynote posters",
    links: {
      primary: {
        label: "View Passes & Keynotes",
        type: "gallery",
      },
      secondary: {
        label: "Summit Site",
        url: "https://www.babcockinnovation.com/summit",
        type: "live",
      },
    },
    showcaseItems: [
      {
        title: "Official Protocol Accreditation Pass",
        category: "Accreditation System",
        description:
          "Executive lanyard badge system designed for protocol officers, VIP liaisons, and diplomatic delegates. Features double-sided security layout with clean royal blue geometry, high-contrast typography, and official summit emblem.",
        image: "/projects/ai_biv/biv-1.webp",
        tags: ["Lanyard Mockup", "Security Print", "Identity System", "Color Coding"],
      },
      {
        title: "Welfare & Logistics Team Pass",
        category: "Accreditation System",
        description:
          "Distinctive magenta-rose accreditation pass for the summit catering, welfare, and logistics committee, providing instant visual categorization for hall managers and security coordinators across all venues.",
        image: "/projects/ai_biv/biv-2.webp",
        tags: ["Venue Access", "Color Wayfinding", "Print Production", "Identity"],
      },
      {
        title: "Keynote Announcement — Prof. Afolarin Ojewole",
        category: "Executive Speaker",
        description:
          "Official digital announcement graphic for Vice-Chancellor Prof. Afolarin Ojewole. Built on a commanding deep ultramarine and fiery gold gradient ribbon motif, emphasizing academic prestige and institutional leadership.",
        image: "/projects/ai_biv/biv-3.webp",
        tags: ["Keynote Poster", "Executive Feature", "Editorial Composition", "Digital Media"],
      },
      {
        title: "Press & Media Delegation Pass",
        category: "Accreditation System",
        description:
          "High-visibility violet and warm cream media badge for accredited press correspondents, broadcast crews, and campus journalists, granting unrestricted floor and photography zone access.",
        image: "/projects/ai_biv/biv-4.webp",
        tags: ["Press Credential", "Tiered Access", "Print Specification", "Visual Hierarchy"],
      },
      {
        title: "Principal Officer — Dr. Olaniyi Arije",
        category: "Institutional Leadership",
        description:
          "High-impact speaker profile feature for Dr. Olaniyi Arije, Vice President of Advancement and Development. Designed with dynamic kinetic curves and bold typography for multi-channel social promotion.",
        image: "/projects/ai_biv/biv-5.webp",
        tags: ["Leadership Poster", "Kinetic Ribbon", "Institutional Brand", "Social Campaign"],
      },
      {
        title: "Global Keynote — Abdullah Alsalmani",
        category: "Global Speaker",
        description:
          "International keynote speaker spotlight for Abdullah Alsalmani, Co-Founder & CEO of Spacepoint 'SPACE.' Crafted with futuristic amber halo highlights and crisp modern sans-serif typography.",
        image: "/projects/ai_biv/biv-6.webp",
        tags: ["International Speaker", "Tech Founder", "Speaker Spotlight", "Event Branding"],
      },
      {
        title: "Guest Support & Volunteer Pass",
        category: "Accreditation System",
        description:
          "Warm tangerine and mocha lanyard pass featuring an inviting 'Ask Me Anything' backplate and friendly typography, facilitating effortless attendee assistance across all 6 breakout halls.",
        image: "/projects/ai_biv/biv-7.webp",
        tags: ["Volunteer Pass", "Attendee UX", "Wayfinding", "Print Design"],
      },
      {
        title: "Registration & Help Desk Pass",
        category: "Accreditation System",
        description:
          "Crisp cyan and silver registration desk credential equipped with friendly prompt iconography, worn by frontline check-in coordinators onboarding 600+ summit attendees.",
        image: "/projects/ai_biv/biv-8.webp",
        tags: ["Registration Badge", "Check-in Logistics", "Frontline Identity", "Print Ready"],
      },
      {
        title: "Ushering & Delegate Hospitality Pass",
        category: "Accreditation System",
        description:
          "Vibrant berry-magenta and blush pink accreditation pass for the ushering and guest hospitality team, guiding attendees and VIPs through keynote auditoriums and breakout sessions.",
        image: "/projects/ai_biv/biv-9.webp",
        tags: ["Hospitality Pass", "Color Coding", "Print System", "Wayfinding"],
      },
      {
        title: "Technical & AV Operations Pass",
        category: "Accreditation System",
        description:
          "High-contrast lime green and oceanic teal badge for the technical operations crew handling live streaming, projection, sound engineering, and breakout lab hardware.",
        image: "/projects/ai_biv/biv-10.webp",
        tags: ["Technical Crew", "AV Operations", "Stage Access", "Event Badge"],
      },
      {
        title: "Breakout Lab Venue Sign — Track 01 (Healthcare)",
        category: "Wayfinding & Signage",
        description:
          "Crisp architectural venue placard for Track One: 'AI in Digital Healthcare Infrastructure' facilitated by Okikioluwa Onamade. Crafted with vibrant scarlet geometry, 3D paper elevation, and dark dynamic directional motifs.",
        image: "/projects/ai_biv/biv-11.webp",
        tags: ["Venue Signage", "Wayfinding", "Healthcare Track", "Print Design"],
      },
      {
        title: "Breakout Lab Venue Sign — Track 04 (Smart Governance)",
        category: "Wayfinding & Signage",
        description:
          "High-contrast slate navy and ice-silver venue sign for Track Four: 'Smart Governance: AI for Public Administration' facilitated by Dr. Uche Nwachukwu. Built for rapid corridor wayfinding across Babcock's innovation halls.",
        image: "/projects/ai_biv/biv-12.webp",
        tags: ["Venue Signage", "Wayfinding", "Public Sector AI", "Print Design"],
      },
    ],
  },
  {
    id: "imprint-global",
    title: "Imprint Global",
    description:
      "Graphic design for the ministry across digital and print touchpoints — producing promotional program flyers, high-CTR YouTube thumbnails, event announcement graphics, and brand merchandise mockups.",
    roleTag: "Graphics Design & Brand Collateral",
    tags: ["Figma", "Canva", "Program Flyers", "Visual Systems"],
    image: "/projects/imprint-global/colossians-commentary.webp",
    imageAlt: "Imprint Global promotional event flyers and brand collateral",
    links: {
      primary: {
        label: "View Flyers",
        type: "gallery",
      },
      secondary: {
        label: "Instagram",
        url: "https://www.instagram.com/imprintchurch_/",
        type: "instagram",
      },
    },
    showcaseItems: [
      {
        title: "A Commentary on the Book of Colossians",
        category: "Sermon Series",
        description:
          "Cinematic sermon series promotional artwork featuring dramatic celestial lighting, sculpted 3D title lettering, and warm golden atmospheric depth tailored for Sunday broadcast and print distribution.",
        image: "/projects/imprint-global/colossians-commentary.webp",
        tags: ["Cinematic Lighting", "Title Typography", "Print Pre-press", "Visual Hierarchy"],
      },
      {
        title: "Special Thanksgiving Service",
        category: "Event Promotion",
        description:
          "Vibrant cultural celebration flyer integrating West African talking drum iconography, ornamental golden harp arches, and rich terracotta-maroon gradients for Imprint Global's annual thanksgiving assembly.",
        image: "/projects/imprint-global/thanksgiving-service.webp",
        tags: ["Cultural Identity", "Event Promotion", "Color Harmony", "Print Layout"],
      },
      {
        title: "Concerning Spirituals (Part II)",
        category: "Teaching Series",
        description:
          "High-contrast teaching series poster juxtaposing deep obsidian shadows with a descending fiery golden dove and scripture watermarking, engineered for arresting digital social feed engagement.",
        image: "/projects/imprint-global/concerning-spirituals.webp",
        tags: ["Atmospheric Lighting", "Typography", "Social Feed Media", "Creative Direction"],
      },
      {
        title: "Yaba & Surulere Fellowship Launch",
        category: "Metro Outreach",
        description:
          "Bold urban outreach campaign graphic capturing the iconic Lagos streetscape and Danfo yellow transit aesthetic to announce regional fellowship community expansions across UNILAG, YABATECH, and Surulere.",
        image: "/projects/imprint-global/fellowship-launch-yaba.webp",
        tags: ["Urban Outreach", "Billboard Layout", "Transit Graphic", "Vector Typography"],
      },
      {
        title: "Welcome to July — New Month Feature",
        category: "Digital Media",
        description:
          "Clean modern 3D typographic centerpiece atop an illuminated plinth with translucent glass panels and immersive neon-cyan illumination for monthly digital social broadcast.",
        image: "/projects/imprint-global/welcome-to-july.webp",
        tags: ["3D Typography", "Glassmorphism", "Digital Broadcast", "Lighting Composition"],
      },
      {
        title: "Leadership & Worker Recognition",
        category: "Personnel Feature",
        description:
          "Editorial-grade commemorative graphic honoring ministry department leads, combining warm neutral paper tones, structured portrait framing, and layered watermark lettering.",
        image: "/projects/imprint-global/birthday-feature.webp",
        tags: ["Editorial Layout", "Portrait Framing", "Brand Consistency", "Watermark Design"],
      },
      {
        title: "Broadcast Giving & Lower-Third System",
        category: "Livestream Graphics",
        description:
          "High-legibility broadcast lower-third displaying multibank offering channels (Access Naira & Dollar) optimized for YouTube 1080p livestreams and sanctuary projection displays.",
        image: "/projects/imprint-global/broadcast-giving-banner.webp",
        tags: ["Broadcast Lower-Third", "Stream Overlay", "Information Design", "Pre-render"],
      },
    ],
  },
];
