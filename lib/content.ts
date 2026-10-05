/* ============================================================================
 * All site content lives here. Edit this file, nothing else.
 * ==========================================================================*/

export const profile = {
  firstName: "Vijay",
  lastName: "S V",
  initials: "VS",
  role: "Full Stack & Mobile Developer",
  /** The hero headline only — shorter than the full role used elsewhere. */
  heroRole: "Full Stack Developer",
  /** Sits directly under the headline. */
  headline: "Building mobile apps, web platforms & scalable backend systems.",
  /** Small tech line under that. */
  tagline: "Flutter · React Native · Node.js · Laravel · MySQL",
  /** The paragraph in the hero's right column. */
  intro:
    "Full Stack & Mobile Developer with 4+ years of experience building cross-platform mobile applications, responsive web applications, REST APIs, real-time systems, and database-driven platforms.",
  /** The huge ghosted word behind the figure. */
  heroWord: "VIJAY",

  /** Live URL. Drives the social-card links — update if the domain changes. */
  siteUrl: "https://portfolio-vijay-sv.vercel.app",

  email: "vijaysvviswanathan@gmail.com",
  phone: "+91 78458 33103",
  phoneHref: "+917845833103",
  location: "Chennai, India",
  resumeUrl: "/resume.pdf", // drop your PDF at public/resume.pdf
  github: "https://github.com/VijayViswanathan1997",
  linkedin: "https://www.linkedin.com/in/vijay-s-v-60a9912a7",

  heroVideo: "/hero.webm",
  heroImage: "/hero.png",
  /** The clip has a white studio background — multiply blending drops it out. */
  heroBlend: true,
};

export const about = {
  paragraphs: [
    "Motivated Full Stack Developer skilled in building scalable applications with React, Node.js, and modern backend technologies. Strong in API development, system design, and problem solving.",
    "I build production-ready applications across mobile, web, and backend systems — from intuitive user interfaces and role-based dashboards to secure APIs, real-time communication, and optimized database architectures.",
  ],

  /** The lanyard badge. Hover (or tap) flips it over to the back. */
  badge: {
    label: "DEVELOPER ID",
    sub: "Portfolio · 2026",
    photo: "/badge.jpg",
    idNo: "VSV-0001",
    dept: "Engineering",
    validTill: "2027",
    /** Printed on the reverse. */
    backNote: "This card identifies the holder as a working developer.",
    clearance: "Full Stack · Mobile · Backend",
    issued: "Chennai, India",
  },

  facts: [
    { k: "Based in", v: "Chennai, India" },
    { k: "Experience", v: "4+ Years" },
    { k: "Specialization", v: "Full Stack & Mobile Development" },
    { k: "Current Role", v: "Peacock Design Solutions" },
    { k: "Focus", v: "Flutter · React Native · Node.js" },
  ],

  quote: "From the database to the last pixel.",
};

/* ---------------------------------------------------------------------------
 * SKILLS — the periodic table.
 *   level 3 = strongest (darkest tile), 2 = solid, 1 = familiar
 *   icon    = devicon slug (https://devicon.dev) or "" for the symbol alone
 * -------------------------------------------------------------------------*/

export const FAMILIES = {
  languages: "Languages",
  frontend: "Frontend",
  mobile: "Mobile",
  backend: "Backend",
  databases: "Databases",
  state: "State Management",
  tools: "Tools",
  core: "Core",
} as const;

export type Family = keyof typeof FAMILIES;

export type Skill = {
  symbol: string;
  name: string;
  family: Family;
  level: 1 | 2 | 3;
  icon?: string;
};

export const skills: Skill[] = [
  // Languages
  { symbol: "Js", name: "JavaScript", family: "languages", level: 3, icon: "javascript" },
  { symbol: "Dt", name: "Dart", family: "languages", level: 3, icon: "dart" },
  { symbol: "Ph", name: "PHP", family: "languages", level: 3, icon: "php" },
  { symbol: "Sq", name: "SQL", family: "languages", level: 3, icon: "" },

  // Mobile
  { symbol: "Fl", name: "Flutter", family: "mobile", level: 3, icon: "flutter" },
  { symbol: "Rn", name: "React Native", family: "mobile", level: 3, icon: "react" },

  // Frontend
  { symbol: "Re", name: "React.js", family: "frontend", level: 3, icon: "react" },
  { symbol: "Ht", name: "HTML", family: "frontend", level: 3, icon: "html5" },
  { symbol: "Cs", name: "CSS", family: "frontend", level: 3, icon: "css3" },
  { symbol: "Bs", name: "Bootstrap", family: "frontend", level: 2, icon: "bootstrap" },
  { symbol: "Nx", name: "Next.js", family: "frontend", level: 2, icon: "nextjs" },
  { symbol: "Tw", name: "Tailwind CSS", family: "frontend", level: 2, icon: "tailwindcss" },

  // Backend
  { symbol: "No", name: "Node.js", family: "backend", level: 3, icon: "nodejs" },
  { symbol: "La", name: "Laravel", family: "backend", level: 3, icon: "laravel" },
  { symbol: "Ra", name: "REST APIs", family: "backend", level: 3, icon: "" },
  { symbol: "Ex", name: "Express.js", family: "backend", level: 2, icon: "express" },

  // Databases
  { symbol: "My", name: "MySQL", family: "databases", level: 3, icon: "mysql" },
  { symbol: "Mo", name: "MongoDB", family: "databases", level: 2, icon: "mongodb" },
  { symbol: "Pg", name: "PostgreSQL", family: "databases", level: 2, icon: "postgresql" },
  { symbol: "Fb", name: "Firebase", family: "databases", level: 2, icon: "firebase" },

  // State management
  { symbol: "Pr", name: "Provider", family: "state", level: 3, icon: "" },
  { symbol: "Rv", name: "Riverpod", family: "state", level: 2, icon: "" },
  { symbol: "Bl", name: "Bloc", family: "state", level: 2, icon: "" },

  // Tools
  { symbol: "Gt", name: "Git", family: "tools", level: 3, icon: "git" },
  { symbol: "Pm", name: "Postman", family: "tools", level: 3, icon: "postman" },
  { symbol: "Fg", name: "Figma", family: "tools", level: 2, icon: "figma" },
  { symbol: "Rd", name: "Redis", family: "tools", level: 1, icon: "redis" },

  // Core
  { symbol: "Gm", name: "Google Maps", family: "core", level: 3, icon: "" },
  { symbol: "Ps", name: "Play Store Deployment", family: "core", level: 3, icon: "android" },
  { symbol: "As", name: "App Store Deployment", family: "core", level: 2, icon: "apple" },
];

/* ---------------------------------------------------------------------------
 * WORK
 * `cover` picks the generated artwork when no screenshot is supplied.
 * Drop a real screenshot in public/work/ and set `image` to use it instead.
 * -------------------------------------------------------------------------*/

export type CoverKind = "map" | "services" | "health" | "web" | "property";

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  highlights: string[];
  cover: CoverKind;
  image?: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Pushpa & Pushpa Pilot",
    subtitle: "Taxi Booking & Ride Management Platform",
    description:
      "A complete ride-booking ecosystem connecting passengers and drivers with real-time tracking, trip management, payments, and an administrative dashboard.",
    stack: ["Flutter", "Node.js", "MySQL", "Google Maps", "Sockets", "React.js"],
    highlights: [
      "Built separate customer and driver mobile applications.",
      "Implemented real-time ride updates using socket communication.",
      "Integrated Google Maps for location tracking and routing.",
      "Designed MySQL architecture for rides, drivers, payments and trip history.",
      "Built an admin dashboard for user, driver, ride, revenue and complaint management.",
    ],
    cover: "map",
    links: [
      {
        label: "Customer App",
        href: "https://play.google.com/store/apps/details?id=com.pushpa.riderpushpa",
      },
      {
        label: "Driver App",
        href: "https://play.google.com/store/apps/details?id=com.pushpa.driverpushpa",
      },
    ],
  },
  {
    title: "OfferTeking",
    subtitle: "Home Services Marketplace",
    description:
      "A role-based home-service platform connecting customers with service partners for relocation, cleaning, electrical and other household services.",
    stack: ["Flutter", "Laravel", "MySQL", "Google Maps API"],
    highlights: [
      "Built cross-platform mobile applications using Flutter.",
      "Developed backend services using Laravel.",
      "Implemented customer and partner workflows.",
      "Integrated Google Maps for location-based service requests.",
      "Designed database structures for service requests and partner management.",
    ],
    cover: "services",
    links: [],
  },
  {
    title: "Defreeze Shoulder",
    subtitle: "Post-Surgery Orthopedic Care Platform",
    description:
      "A rehabilitation application for frozen shoulder patients with dedicated experiences for administrators, doctors and patients.",
    stack: ["Flutter", "Mobile", "Healthcare"],
    highlights: [
      "Built role-based dashboards for admins, doctors and patients.",
      "Implemented secure login and user management.",
      "Added video libraries and personalised rehabilitation assignments.",
      "Created bar and pie chart visualisations for patient progress.",
      "Implemented automated alerts based on recovery progress.",
    ],
    cover: "health",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.simats.defreeze_sholuder",
      },
    ],
  },
  {
    title: "Eeruyir",
    subtitle: "Pregnancy Exercise & Wellness Application",
    description:
      "A healthcare-focused mobile application providing structured exercise plans and reminders for pregnant women.",
    stack: ["React Native", "PHP", "MySQL"],
    highlights: [
      "Developed the mobile application using React Native.",
      "Collaborated with medical experts to implement validated exercise plans.",
      "Added push notifications and reminders.",
      "Designed task and exercise management workflows.",
    ],
    cover: "health",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.simats.Eeruyir",
      },
    ],
  },
  {
    title: "DCLD Navigator",
    subtitle: "Blood Monitoring & Healthcare Application",
    description:
      "A healthcare application designed to help monitor blood parameters and complications in patients with Decompensated Chronic Liver Disease.",
    stack: ["Mobile Development", "PHP", "MySQL"],
    highlights: [
      "Built interfaces for patient and healthcare workflows.",
      "Implemented blood parameter tracking and visualisation.",
      "Added alerts for important health-related changes.",
      "Integrated secure database storage for patient records.",
    ],
    cover: "health",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.simats.dcldnavigator",
      },
    ],
  },
  {
    title: "Hernia Hub",
    subtitle: "Hernia Awareness & Recovery Platform",
    description:
      "An educational healthcare platform providing information about hernia symptoms, diagnosis, treatment options and recovery.",
    stack: ["Mobile", "Web", "Healthcare"],
    highlights: [
      "Designed educational content and symptom guides.",
      "Built interactive symptom tracking functionality.",
      "Provided resources covering surgical and non-surgical treatment options.",
      "Focused on accessible and user-friendly healthcare information.",
    ],
    cover: "health",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.simats.herniahub",
      },
    ],
  },
  {
    title: "Crescon Projects",
    subtitle: "Dynamic Business Website",
    description:
      "A complete dynamic business website built using Laravel with an integrated administration panel.",
    stack: ["Laravel", "PHP", "MySQL", "Blade"],
    highlights: [
      "Built frontend and backend within a unified Laravel application.",
      "Developed dynamic pages using Laravel Blade.",
      "Implemented MySQL database integration.",
      "Added authentication and authorisation for administrators.",
      "Built a content management workflow.",
    ],
    cover: "web",
    links: [{ label: "Visit Website", href: "https://cresconprojects.com" }],
  },
  {
    title: "Inon Institute",
    subtitle: "Dynamic Institute Website",
    description:
      "A complete institute website with dynamic content management and an integrated administrative panel.",
    stack: ["Laravel", "PHP", "MySQL", "Blade"],
    highlights: [
      "Developed the application using Laravel MVC architecture.",
      "Created dynamic pages using Blade templates.",
      "Integrated MySQL for structured content management.",
      "Implemented admin authentication and authorisation.",
    ],
    cover: "web",
    links: [{ label: "Visit Website", href: "https://inoninstitute.com" }],
  },
  {
    title: "Real Estate Website",
    subtitle: "Property Listing & Management Platform",
    description:
      "A dynamic real estate platform for managing property listings and handling customer inquiries.",
    stack: ["HTML", "CSS", "Bootstrap", "Node.js", "MySQL"],
    highlights: [
      "Designed responsive property listing interfaces.",
      "Developed backend services using Node.js.",
      "Implemented add / edit / delete property management.",
      "Built admin authentication.",
      "Integrated MySQL for property and inquiry management.",
    ],
    cover: "property",
    links: [],
  },
];

/* ---------------------------------------------------------------------------
 * EXPERIENCE
 * -------------------------------------------------------------------------*/

export type Role = {
  org: string;
  title: string;
  place: string;
  period: string;
  points: string[];
  wins: { metric: string; label: string }[];
};

export const experience: Role[] = [
  {
    org: "Peacock Design Solutions",
    title: "Full Stack Developer",
    place: "Chennai, India",
    period: "2025 – Present",
    points: [
      "Develop cross-platform mobile applications using Flutter.",
      "Design and implement backend APIs using Node.js and Laravel.",
      "Build and optimize MySQL database architectures.",
      "Implement real-time communication using socket-based architecture.",
      "Develop responsive web applications using HTML, CSS, JavaScript and React.js.",
      "Manage application deployment, hosting, Play Store releases and post-release updates.",
    ],
    wins: [
      { metric: "4+", label: "Production-level mobile applications delivered" },
      { metric: "35%", label: "Performance gain from API and widget refactoring" },
      { metric: "Optimized", label: "Backend response times via query optimization" },
    ],
  },
  {
    org: "SIMATS Engineering",
    title: "Web Developer / Android Developer",
    place: "Chennai, India",
    period: "2024 – 2025",
    points: [
      "Developed mobile and web applications for multiple projects.",
      "Built applications using React Native and web technologies.",
      "Integrated REST APIs and database-driven functionality.",
      "Worked on healthcare and business-focused applications.",
      "Delivered projects within tight deadlines.",
      "Optimized application performance and user experience.",
      "Trained students in web and mobile development technologies.",
    ],
    wins: [
      { metric: "10+", label: "Mobile applications delivered" },
      { metric: "40%", label: "Performance improvement through optimization" },
      { metric: "50+", label: "Students trained in web and mobile technologies" },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * EDUCATION
 * -------------------------------------------------------------------------*/

export const education = [
  {
    degree: "Master of Computer Applications",
    school: "Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
    place: "Chennai, India",
    period: "2019 – 2021",
    detail: "Specialized in Advanced Computing and Software Development.",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "Government Arts College for Men (Autonomous)",
    place: "Chennai, India",
    period: "2016 – 2019",
    detail:
      "Built a strong foundation in programming, data structures, algorithms, database systems and web development.",
  },
];

/* ---------------------------------------------------------------------------
 * CERTIFICATIONS / ONGOING PRACTICE
 * -------------------------------------------------------------------------*/

export const certifications = [
  {
    name: "Modern Mobile Development",
    issuer: "Flutter & React Native",
    detail:
      "Building and maintaining production-ready cross-platform applications with reusable components, API integrations, state management and performance optimization.",
  },
  {
    name: "Backend & API Development",
    issuer: "Node.js · Laravel · REST APIs",
    detail:
      "Continuously improving backend architecture, API design, authentication, database integration and real-time communication.",
  },
  {
    name: "Database & Performance",
    issuer: "MySQL · Query Optimization",
    detail:
      "Working with relational database design, optimized queries, data relationships, indexing and performance-focused backend development.",
  },
  {
    name: "Continuous Technology Learning",
    issuer: "AI · Cloud · Modern Web Technologies",
    detail:
      "Exploring emerging technologies and development practices to build smarter, scalable, secure and high-performance applications.",
  },
];

/* ---------------------------------------------------------------------------
 * ACHIEVEMENTS
 * -------------------------------------------------------------------------*/

export const achievements = [
  {
    metric: "4+",
    unit: "Years",
    title: "Professional Experience",
    kind: "Experience",
    note: "Building production-ready mobile, web and backend applications.",
    icon: "clock" as const,
  },
  {
    metric: "10+",
    unit: "",
    title: "Mobile Applications",
    kind: "Delivered",
    note: "Across healthcare, transportation, home services and business domains.",
    icon: "phone" as const,
  },
  {
    metric: "50+",
    unit: "",
    title: "Students Trained",
    kind: "Training",
    note: "Provided training in web and mobile development technologies.",
    icon: "people" as const,
  },
  {
    metric: "40%",
    unit: "",
    title: "Performance Improvement",
    kind: "Optimization",
    note: "Achieved through optimization and refactoring across applications.",
    icon: "chart" as const,
  },
];

/* ---------------------------------------------------------------------------
 * CONTACT
 * -------------------------------------------------------------------------*/

export const contact = {
  lead: "Have a project, product idea, or development requirement?",
  sub: "Let's discuss how we can turn it into a reliable, scalable application.",
};

/* ---------------------------------------------------------------------------
 * NAVIGATION — ids match the <section id="..."> in app/page.tsx
 * -------------------------------------------------------------------------*/

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const fullName = `${profile.firstName} ${profile.lastName}`;
