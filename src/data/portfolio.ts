// Portfolio data structure - easily editable for CMS integration
// Calculate years of experience dynamically
const startYear = 2008; // Based on CV
const currentYear = new Date().getFullYear();
const yearsExperience = currentYear - startYear;

export const portfolioData = {
  personal: {
    name: "Nilushan Silva",
    title: "Full Stack & Cloud Engineer",
    tagline: "Building robust, scalable solutions with 15+ years of experience",
    email: "nilushan.silva@gmail.com",
    phone: "0416285726",
    location: "Gold Coast, Queensland, Australia",
    social: {
      github: "nilushan",
      linkedin: "nilushan-silva-27235310",
      website: "www.nilushansilva.info",
    },
    heroSummary: `Full Stack Software Engineer & Cloud Developer with ${yearsExperience}+ years delivering robust, high-quality software. Specialized in TypeScript frontends and backend services development, integrating with 3rd party systems. Infrastructure setup and deployment on Google Cloud Platform.`,
    summary: [`Passionate about delivering robust, efficient, and high-quality software solutions. My expertise focuses on designing and developing backend services and frontend user interfaces using TypeScript, integrating systems with third-party platforms, and architecting solutions on Google Cloud Platform.`,
      `Proven track record in service-oriented architecture development, large-scale IoT integrations, and DevOps practices with consistently high uptime achievements. I excel at analyzing requirements and designing solutions through collaboration, diagramming, and comprehensive documentation.`,
      `Committed to implementing engineering best practices to create well-designed, testable, reliable, maintainable, and cost-efficient systems. I always choose the best tools for each purpose rather than reinventing the wheel—leveraging cloud-native open-source frameworks for platform independence or serverless platforms for rapid development and deployment. When needed, I can rapidly develop MVPs with essential functionality by prioritizing the most critical components.`],
    yearsExperience
  },

  skills: {
    programming: ["TypeScript", "JavaScript", "Node.js", "Java", "C#", "C++", "PHP"],
    frontend: ["React", "Redux", "Bootstrap", "HTML5", "CSS3", "Chart.js", "Socket.IO", "Next.js", "Astro"],
    backend: ["Express", "Fastify", "REST APIs", "Event-Driven Architecture", "Service-Oriented Architecture"],
    databases: ["PostgreSQL", "MySQL", "Firestore", "MongoDB", "Redis", "TimescaleDB", "ClickHouse"],
    cloud: {
      gcp: {
        actively: ["Kubernetes", "Cloud Functions", "Compute Engine", "IoT Core", "PubSub", "Cloud Storage", "Monitoring", "Firebase", "Container Registry", "Cloud Build", "Scheduler", "Trace", "IAM"],
        familiar: ["App Engine", "Cloud Run", "Big Query", "Big Table"],
      },
      aws: {
        familiar: ["Lambda", "Kinesis", "IoT Core", "S3", "DynamoDB", "SNS", "SQS", "Pinpoint", "EKS", "Fargate"],
      },
      azure: {
        familiar: ["App Services", "IoT Core", "Event Hub", "Cosmos DB", "ADX"],
      },
    },
    devops: ["Docker", "Kubernetes", "CI/CD", "Google Cloud Build", "GitHub Actions", "Git", "SVN"],
    tools: ["Jira", "Confluence", "ClickUp", "Draw.io", "Lucid Charts", "Axure RP 9", "Illograph", "Mermaid", "C4 Diagrams"],
  },

  // Organized skills for the SkillsGrid component
  skillCategories: [
    {
      title: "Programming Languages",
      icon: "code",
      color: "primary",
      description: "Core programming languages I use for development",
      skills: ["TypeScript", "JavaScript", "Node.js", "Java", "C#", "C++", "PHP"]
    },
    {
      title: "Frontend Development",
      icon: "frontend",
      color: "secondary",
      description: "Modern frontend technologies and frameworks",
      skills: ["React", "Redux", "Next.js", "Astro", "Bootstrap", "HTML5", "CSS3", "Chart.js", "Socket.IO"]
    },
    {
      title: "Backend Development",
      icon: "backend",
      color: "accent",
      description: "Server-side technologies and architectural patterns",
      skills: ["Express", "Fastify", "REST APIs", "Event-Driven Architecture", "Service-Oriented Architecture", "OAuth2", "JWT"]
    },
    {
      title: "Cloud Platforms",
      icon: "cloud",
      color: "info",
      description: "Cloud services and infrastructure",
      skills: ["Google Cloud Platform", "AWS", "Azure", "Kubernetes", "Cloud Functions", "IoT Core", "PubSub", "Firebase"]
    },
    {
      title: "Databases",
      icon: "database",
      color: "success",
      description: "Database technologies and data storage solutions",
      skills: ["PostgreSQL", "MySQL", "Firestore", "MongoDB", "Redis", "TimescaleDB", "ClickHouse", "BigQuery"]
    },
    {
      title: "DevOps & Tools",
      icon: "devops",
      color: "warning",
      description: "Development operations and productivity tools",
      skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Cloud Build", "Git", "Terraform", "Monitoring"]
    },
    {
      title: "Project Management",
      icon: "tools",
      color: "error",
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
      description: "As the only full stack and cloud developer, Full stack development and cloud deployment of Zimi smart home iot cloud product. Involved in maintaining infrastructure on GCP and Amazon, Frontend admin and customer portal development, backend api development and message handler development. Continue building on the IoT platform with additional features and integrations.",
      highlights: [
        {
          title: "Platform Migration",
          description: "Successfully migrated cloud IoT platform with 55,000+ active devices from Xively to GCP with zero downtime, reducing infrastructure costs by 50% and latency by 40% while maintaining 99.999% uptime",
        },
        {
          title: "Architecture",
          description: "Designed end-to-end IoT platform for smart electrical devices handling 100+ events/second with secure device communication protocols",
        },
        {
          title: "Cloud Infrastructure",
          description: "Built service oriented architecture on GCP using Kubernetes, Cloud Functions, Redis, PubSub, Cloud SQL (PostgreSQL) for optimal scalability and resilience",
        },
        {
          title: "Frontend Development",
          description: "Developed React/Redux admin dashboards with dynamic visualizations for IoT device network monitoring and management",
        },
        {
          title: "Backend Development",
          description: "Created high-performance REST APIs and event-driven services using Node.js/TypeScript with comprehensive documentation, diagramming, and testing",
        },
        {
          title: "Voice Integration",
          description: "Engineered and certified Google Assistant and Alexa voice control systems, expanding product ecosystem compatibility",
        },
        {
          title: "Code Efficiency",
          description: "Created reusable, unit tested TypeScript/Node.js libraries containing common functionality, reducing development time by more than 50%",
        },
        {
          title: "DevOps",
          description: "Setup automated CI/CD pipelines with Docker, Google Cloud Build, GitHub Actions, Container Registry, Kubernetes for seamless multi-environment deployments",
        },
        {
          title: "Knowledge Transfer",
          description: "Documented the entire system architecture and conducted comprehensive knowledge sharing sessions covering system components and business processes to facilitate seamless transition",
        },
        {
          title: "Solution Design",
          description: "Diagrammed and documented solutions, interfaces, and test cases thoroughly before implementation, leading to high-quality, well-designed components",
        },
        {
          title: "System Modernization",
          description: "Proactively planned system improvements by selecting and collaborating with a third-party software company to develop a scalable system capable of handling millions of devices, telemetry data, analytics, and insights",
        },
        {
          title: "Platform Evaluation",
          description: "Experienced in evaluating software tools and platforms to select optimal solutions for specific use cases",
        },
        {
          title: "Alexa Integration",
          description: "Alexa smart home voice control integration with the Zimi smart devices",
        },
        {
          title: "3rd Party API",
          description: "Design, document and develop API for 3rd party integrations for device information retrieval, device control and status change events with user authorization based security",
        },
        {
          title: "Firmware Update CDN",
          description: "IoT device firmware update CDN service for memory limited devices needing OTA with self signed Certificate Authority and Certificate management system",
        },
      ],
      technologies: ["GCP", "Kubernetes", "TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "MQTT", "Docker", "Firebase", "IoT Core", "PubSub", "Cloud Functions", "Alexa Smart Home API"],
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

  projects: [
    {
      id: "iot-migration",
      title: "Enterprise IoT Cloud Platform Migration",
      period: "2017-2020",
      description: "Researched, designed, implemented, tested and deployed and migrated a IoT system of 55,000+ IoT devices to GCP using a service oriented architecture with zero downtime. Achieved 99.999% uptime while handling 100+ events/second.",
      achievements: [
        "Zero downtime migration",
        "50% reduction in operational costs",
        "40% latency improvement",
        "99.999% uptime achieved",
      ],
      technologies: ["GCP", "Kubernetes", "Firebase", "IoT Core", "PubSub", "PostgreSQL", "Redis", "MQTT", "TypeScript", "React", "Redux", "Express", "Fastify"],
      image: "/images/iot-platform.jpg",
    },
    {
      id: "voice-control",
      title: "Smart Home Voice Control Ecosystem",
      period: "2019-2021",
      description: "Architected, implemented, tested voice-control integrations for Google Assistant and Alexa. Developed unified business logic with platform-specific adapters ensuring consistent behavior across ecosystems.",
      achievements: [
        "Certified for both Google Assistant and Alexa",
        "Unified business logic architecture",
        "Real-time state reporting",
        "Expanded market reach",
      ],
      technologies: ["TypeScript", "Express", "OAuth", "AWS Lambda", "Google Actions API", "Alexa Smart Home API"],
      image: "/images/voice-control.jpg",
    },
    {
      id: "iot-dashboard",
      title: "IoT Network Management Dashboard",
      period: "2018-2022",
      description: "Developed comprehensive web-based platform for IoT device network management and monitoring. Created interactive data visualizations for device telemetry, usage patterns, and IoT device health metrics.",
      achievements: [
        "Real-time device monitoring",
        "Interactive data visualizations",
        "Usage pattern analytics",
        "Health metrics tracking",
      ],
      technologies: ["React", "Redux", "TypeScript", "Bootstrap", "Chart.js", "WebSocket"],
      image: "/images/dashboard.jpg",
    },
  ],

  education: {
    degree: "Bachelor of Science in Computer Science (Honours)",
    institution: "University of Colombo",
    location: "Sri Lanka",
    period: "2004 – 2008",
  },

  interests: [
    {
      title: "AI & LLMs",
      description: "Leveraging LLMs, AI Agents, and AI-based coding assistants to accelerate development while maintaining high quality through effective prompting, providing latest documentation, and contextual information",
    },
    {
      title: "Diagramming & Documentation",
      description: "Advanced visualization tools like Illograph, Mermaid, and C4 diagrams for clear technical communication",
    },
    {
      title: "Emerging Technologies",
      items: [
        "Dapr: Distributed Application Runtime for simplified microservice development with built-in service discovery, state management, PubSub messaging, and observability",
        "Next.js: For integrated frontend and backend systems in smaller projects",
        "Supabase: Open source, self-hosted or managed essential services for web applications",
      ],
    },
  ],

  certifications: [],

  currentLearning: "Currently studying AWS architecture and services with the aim of obtaining certification",
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
export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];