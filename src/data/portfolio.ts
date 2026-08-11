// Portfolio data structure - easily editable for CMS integration
import type { PortfolioData, NavigationItem } from '@/types/portfolio';

// Calculate years of experience dynamically
const startYear = 2008; // Based on CV
const currentYear = new Date().getFullYear();
const yearsExperience = currentYear - startYear;

export const portfolioData: PortfolioData = {
  personal: {
    name: "Nilushan Silva",
    title: "Full Stack & Cloud Engineer",
    tagline: `Building robust, scalable solutions with ${yearsExperience}+ years of experience`,
    email: "nilushan.silva@gmail.com",
    phone: "0416285726",
    location: "Gold Coast, Queensland, Australia",
    social: {
      github: "nilushan",
      linkedin: "nilushan-silva-27235310",
      website: "www.nilushansilva.info",
    },
    heroSummary: `Full Stack Software Engineer & Cloud Developer with ${yearsExperience}+ years delivering robust, high-quality software. My current hands-on stack is TypeScript and Node.js, supported by deep Google Cloud Platform experience and earlier professional work with C#, Java, and C++.`,
    summary: [
      `My recent hands-on work focuses on TypeScript and Node.js services, React interfaces, third-party integrations, and production architecture on Google Cloud Platform. I have delivered service-oriented systems, large-scale IoT integrations, and reliable cloud operations while documenting designs and collaborating across teams.`,
      `Earlier in my career I worked professionally with C#, Java, C++, and PHP. Although they are not my current day-to-day languages, my typed-language, object-oriented, and systems engineering foundations allow me to refresh those ecosystems quickly when required.`,
      `I favour well-designed, testable, maintainable, and cost-efficient solutions. I also use agentic engineering practices across planning, implementation, testing, and review—combining Claude Code, pi, Codex, Grok, and open-weight models with custom skills while retaining human ownership of architecture, security, and final quality.`,
    ],
    yearsExperience
  },

  skills: {
    programming: ["TypeScript", "JavaScript", "Node.js", "C#", "Java", "C++", "PHP"],
    frontend: ["React", "Redux", "Bootstrap", "HTML5", "CSS3", "Chart.js", "Socket.IO", "Next.js", "Astro"],
    backend: ["Express", "Fastify", "REST APIs", "Event-Driven Architecture", "Service-Oriented Architecture"],
    databases: ["PostgreSQL", "PostgreSQL Partitioning", "Cloud SQL", "MySQL", "Firestore", "MongoDB", "Redis", "TimescaleDB", "ClickHouse"],
    cloud: {
      gcp: {
        actively: ["Cloud SQL", "GKE", "Kubernetes", "Artifact Registry", "Cloud Run", "Cloud Logging", "Workload Identity Federation", "Firebase", "PubSub", "Cloud Functions", "Cloud Storage", "Compute Engine", "IAM", "Cloud Build", "Scheduler", "Trace"],
        familiar: ["App Engine", "Big Query", "Big Table"],
      },
      aws: {
        familiar: ["Lambda", "Kinesis", "IoT Core", "S3", "DynamoDB", "SNS", "SQS", "Pinpoint", "EKS", "Fargate"],
      },
      azure: {
        familiar: ["App Services", "IoT Core", "Event Hub", "Cosmos DB", "ADX"],
      },
    },
    devops: ["Docker", "Kubernetes", "Kustomize", "CI/CD", "Artifact Promotion", "Google Cloud Build", "GitHub Actions", "Workload Identity Federation", "Git", "SVN"],
    tools: ["Jira", "Confluence", "ClickUp", "Draw.io", "Lucid Charts", "Axure RP 9", "Illograph", "Mermaid", "C4 Diagrams"],
  },

  // Organized skills for the SkillsGrid component
  // Refined minimalism: Using primary only for key emphasis, neutral for everything else
  skillCategories: [
    {
      title: "Current Development Stack",
      icon: "code",
      color: "primary",
      description: "My current day-to-day hands-on languages and runtime",
      skills: ["TypeScript", "JavaScript", "Node.js"]
    },
    {
      title: "Previous Professional Languages",
      icon: "code",
      color: "primary",
      description: "Earlier professional experience; strong foundations allow me to refresh these ecosystems quickly when required",
      skills: ["C#", "Java", "C++", "PHP"]
    },
    {
      title: "Frontend Development",
      icon: "frontend",
      color: "primary",
      description: "Modern frontend technologies and frameworks",
      skills: ["React", "Redux", "Next.js", "Astro", "Bootstrap", "HTML5", "CSS3", "Chart.js", "Socket.IO"]
    },
    {
      title: "Backend Development",
      icon: "backend",
      color: "primary",
      description: "Server-side technologies and architectural patterns",
      skills: ["Express", "Fastify", "REST APIs", "Event-Driven Architecture", "Service-Oriented Architecture", "OAuth2", "JWT"]
    },
    {
      title: "Cloud Platforms",
      icon: "cloud",
      color: "primary",
      description: "Cloud services and infrastructure",
      skills: ["Google Cloud Platform", "GKE", "Cloud Run", "Cloud SQL", "Artifact Registry", "Cloud Logging", "Kubernetes", "Cloud Functions", "PubSub", "Firebase", "Workload Identity Federation"]
    },
    {
      title: "Databases",
      icon: "database",
      color: "primary",
      description: "Relational, document, cache, and analytical data stores, including partitioned PostgreSQL time-series workloads",
      skills: ["PostgreSQL", "Cloud SQL", "MySQL", "Firestore", "MongoDB", "Redis", "TimescaleDB", "ClickHouse", "BigQuery"]
    },
    {
      title: "DevOps & Tools",
      icon: "devops",
      color: "primary",
      description: "Container delivery, reusable deployment configuration, keyless identity, and multi-environment automation",
      skills: ["Docker", "Kubernetes", "Kustomize", "GitHub Actions", "Cloud Build", "Artifact Registry", "Workload Identity Federation", "Terraform", "Git"]
    },
    {
      title: "AI-Assisted Engineering",
      icon: "ai",
      color: "primary",
      description: "Agent-assisted planning, implementation, testing, and review with human accountability",
      skills: ["Claude Code", "pi Coding Agent", "Codex", "Grok", "Open-Weight LLMs", "Custom Agent Skills"]
    },
    {
      title: "Project Management",
      icon: "tools",
      color: "primary",
      description: "Tools for project management and documentation",
      skills: ["Jira", "Confluence", "ClickUp", "Draw.io", "Lucid Charts", "Mermaid", "C4 Diagrams", "Agile", "Scrum"]
    }
  ],

  experience: [
    {
      id: "zimi-current",
      title: "Senior Cloud Engineer",
      company: "Zimi Ltd",
      location: "QLD, AU",
      period: "December 2020 – Present",
      type: "full-time",
      description: "Own full-stack development and cloud operations for Zimi's smart-home IoT platform, spanning GCP infrastructure, TypeScript backend services, event processing, admin and customer interfaces, and third-party integrations.",
      highlights: [
        {
          title: "Platform Migration",
          description: "Migrated a cloud IoT platform with 55,000+ active devices from Xively to GCP with zero downtime, reducing infrastructure costs by 50% and latency by 40% while maintaining 99.999% uptime",
        },
        {
          title: "IoT Architecture",
          description: "Designed an event-driven platform for smart electrical devices handling 100+ events per second with secure device communication",
        },
        {
          title: "Cloud Infrastructure",
          description: "Built and operated services on GCP using Kubernetes, Cloud Functions, Redis, PubSub, and Cloud SQL for scalability and resilience",
        },
        {
          title: "Data Lifecycle & Cost Control",
          description: "Controlled Cloud SQL storage and associated cost growth with monthly PostgreSQL partitions, archival, and fast removal of expired time-series data; also reduced low-value Cloud Logging volume",
        },
        {
          title: "Keyless Cloud Identity",
          description: "Implemented Workload Identity Federation for GitHub Actions and GKE workloads, replacing long-lived service-account keys with short-lived, least-privilege access",
        },
        {
          title: "Backend & Integration APIs",
          description: "Developed TypeScript and Node.js REST APIs, event-driven services, and authorised third-party integrations for device data, control, and status events",
        },
        {
          title: "Frontend Applications",
          description: "Developed React and Redux admin and customer interfaces with visualisations for device telemetry, network health, and management",
        },
        {
          title: "Voice Integrations",
          description: "Engineered and certified Google Assistant and Alexa smart-home integrations, expanding ecosystem compatibility",
        },
        {
          title: "Reusable Libraries",
          description: "Created unit-tested TypeScript and Node.js libraries for shared functionality, reducing development time by more than 50%",
        },
        {
          title: "CI/CD & Kubernetes Configuration",
          description: "Built once to a shared Artifact Registry, promoted the same artifacts across environments, and managed Kubernetes configuration with reusable Kustomize bases and overlays",
        },
        {
          title: "Solution Design & Documentation",
          description: "Documented architecture, interfaces, decisions, and test cases before implementation to improve design quality and knowledge transfer",
        },
        {
          title: "Firmware Delivery",
          description: "Built an OTA firmware CDN and certificate-management workflow for memory-constrained IoT devices",
        },
      ],
      technologies: ["GCP", "Kubernetes", "Kustomize", "TypeScript", "Node.js", "React", "PostgreSQL", "Redis", "MQTT", "PubSub", "Cloud Run", "Artifact Registry", "Cloud Logging", "GitHub Actions", "Workload Identity Federation"],
    },
    {
      id: "bluekey-zimi",
      title: "Full Stack Developer",
      company: "BlueKey Pty Ltd (acquired by Zimi)",
      location: "QLD, AU",
      period: "October 2017 – December 2020",
      type: "full-time",
      description: "As the only full-stack/cloud engineer of the team, designed, developed, tested, deployed and maintained the services and infrastructure of the entire backend system.",
      highlights: [
        {
          title: "Initial Platform Development",
          description: "Initially developed product functionality based on Xively IoT platform with REST API for apps and admin dashboard",
        },
        {
          title: "Cloud Migration to GCP",
          description: "Successfully migrated the entire live cloud backend from Xively to Google Cloud Platform with zero downtime",
        },
        {
          title: "Microservices Architecture",
          description: "Designed and developed new cloud services using microservices based architecture considering scalability, low latency, security, maintainability and traceability",
        },
        {
          title: "Voice Control Integration",
          description: "Integrated and certified voice control of devices using Google assistant and later Alexa",
        },
        {
          title: "Cost & Performance Optimization",
          description: "Infrastructure cost reduced by more than 50%. Latency decreased considerably. Reliability increased.",
        },
      ],
      technologies: ["GCP", "Firebase", "Firestore", "Cloud Functions", "IoT Core", "PubSub", "Kubernetes", "Docker", "PostgreSQL", "BigQuery", "TypeScript", "React", "Redux"],
    },
    {
      id: "simcentric-pm",
      title: "Product Manager",
      company: "Simcentric",
      location: "Colombo, Sri Lanka",
      period: "January 2015 – June 2017",
      type: "full-time",
      highlights: [
        {
          title: "Leadership",
          description: "Directed development of 5 new simulation products used by military training organizations",
        },
        {
          title: "Team Management",
          description: "Led cross-functional teams (10 engineers, 5 QA specialists) in delivering complex software projects",
        },
        {
          title: "Complex Delivery",
          description: "Successfully implemented challenging screen capture and real-time streaming features, overcoming significant R&D obstacles",
        },
      ],
      technologies: ["C#", ".NET", "Java", "Project Management"],
    },
    {
      id: "simcentric-dev",
      title: "Software Engineer",
      company: "Simcentric",
      location: "Colombo, Sri Lanka",
      period: "November 2010 – December 2014",
      type: "full-time",
      highlights: [
        {
          title: "Simulation Development",
          description: "Built core components for military training simulation products using C++",
        },
        {
          title: "Scenario Engine",
          description: "Implemented Insurgent Pattern of Life Simulation for VBS2 Game engine scenarios",
        },
      ],
      technologies: ["C++", "VBS2", "Game Development"],
    },
    {
      id: "respere",
      title: "Software Engineer",
      company: "Respere",
      location: "Colombo, Sri Lanka",
      period: "August 2008 – November 2010",
      type: "full-time",
      highlights: [
        {
          title: "Open Source",
          description: "Developed web software for human rights violations recording using PHP and MySQL",
        },
        {
          title: "SaaS Implementation",
          description: "Designed 'OpenEvSys' as a secure multi-tenant platform with international hosting options",
        },
      ],
      technologies: ["PHP", "MySQL", "SaaS", "Open Source"],
    },
  ],

  // NOTE: Projects are managed via content collections in src/content/projects/
  // Use getCollection('projects') to fetch project data

  education: {
    degree: "Bachelor of Science in Computer Science (Honours)",
    institution: "University of Colombo",
    location: "Sri Lanka",
    period: "2004 – 2008",
  },

  interests: [
    {
      title: "Diagramming & Documentation",
      description: "Advanced visualization tools like Illograph, Mermaid, and C4 diagrams for clear technical communication",
    },
    {
      title: "Emerging Technologies",
      description: "Exploring practical platforms that simplify distributed systems and accelerate focused product delivery.",
      items: [
        "Dapr for distributed application building blocks",
        "Next.js for integrated full-stack applications",
        "Supabase for open-source application services",
      ],
    },
  ],

  certifications: [],

  currentLearning: "Currently studying AWS architecture and services with the aim of obtaining certification",

  cta: {
    label: "Let's Collaborate",
    title: "Ready to Build Something Amazing?",
    description: "I'm always interested in hearing about new projects, opportunities, and collaborations. Let's turn your ideas into reality.",
    primaryButton: {
      text: "Get in Touch",
      href: "/contact",
    },
    secondaryButton: {
      text: "View All Projects",
      href: "/projects",
    },
  },

  ctas: {
    home: {
      label: "Discover More",
      title: "Want to Know More About Me?",
      description: `Explore my journey, skills, and the projects I've built over ${yearsExperience}+ years of software development. Let's start with my story.`,
      primaryButton: {
        text: "About Me",
        href: "/about",
      },
      secondaryButton: {
        text: "View My Work",
        href: "/projects",
      },
    },
    about: {
      label: "Explore Skills",
      title: "Curious About What I Can Do?",
      description: "Discover my comprehensive technical skill set spanning full-stack development, cloud architecture, and modern development practices.",
      primaryButton: {
        text: "Explore My Skills",
        href: "/skills",
      },
      secondaryButton: {
        text: "View Projects",
        href: "/projects",
      },
    },
    skills: {
      label: "See Experience",
      title: "Where Have I Applied These Skills?",
      description: "Explore my professional journey and see how I've used these technologies to deliver impactful solutions across different industries.",
      primaryButton: {
        text: "View My Experience",
        href: "/experience",
      },
      secondaryButton: {
        text: "See Projects",
        href: "/projects",
      },
    },
    experience: {
      label: "Explore Projects",
      title: "Ready to See the Results?",
      description: "From IoT platforms handling 55,000+ devices to cloud migrations with zero downtime - explore the projects that showcase my expertise in action.",
      primaryButton: {
        text: "View My Projects",
        href: "/projects",
      },
      secondaryButton: {
        text: "Read My Blog",
        href: "/blog",
      },
    },
    projects: {
      label: "Read Insights",
      title: "Want to Learn From My Experience?",
      description: "Dive into technical articles and insights on full-stack development, cloud architecture, and software engineering best practices.",
      primaryButton: {
        text: "Read My Blog",
        href: "/blog",
      },
      secondaryButton: {
        text: "View on GitHub",
        href: `https://github.com/nilushan`,
      },
    },
    blog: {
      label: "Let's Connect",
      title: "Ready to Work Together?",
      description: "I'm always interested in new opportunities, collaborations, and meaningful conversations about technology. Let's connect!",
      primaryButton: {
        text: "Get in Touch",
        href: "/contact",
      },
      secondaryButton: {
        text: "Follow on LinkedIn",
        href: `https://linkedin.com/in/nilushan-silva-27235310`,
      },
    },
  },
};

// Theme configurations
// export const themes = {
//   professional: {
//     name: "Professional",
//     primary: "primary",
//     secondary: "secondary",
//     accent: "accent",
//     neutral: "neutral",
//   },
//   dark: {
//     name: "Dark Mode",
//     primary: "primary",
//     secondary: "secondary",
//     accent: "accent",
//     neutral: "neutral",
//   },
//   cyberpunk: {
//     name: "Cyberpunk",
//     primary: "warning",
//     secondary: "info",
//     accent: "error",
//     neutral: "neutral",
//   },
//   nature: {
//     name: "Nature",
//     primary: "success",
//     secondary: "info",
//     accent: "warning",
//     neutral: "neutral",
//   },
// };

// Navigation configuration
export const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];