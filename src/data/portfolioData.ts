export interface Project {
  id: string
  title: string
  tagline: string
  roleLabel: string
  roleDescription: string
  period: string
  metrics?: string
  stack: string[]
  isMobile?: boolean
  image: string
  liveUrl?: string
  images: {
    src: string
    caption: string
    isMobile?: boolean
  }[]
  caseStudy: {
    problem: string
    solution: string
    myImpact: string[] // Renamed in UI to Key Contributions and impact
    prdSlices?: {
      title: string
      content: string
    }[]
  }
}

export interface Experience {
  role: string
  company: string
  companyUrl?: string
  location?: string
  period: string
  highlight: string
  details?: string[]
}

export interface PortfolioData {
  profile: {
    name: string
    preferredName: string
    title: string
    location: string
    localTimezone: string
    status?: string
    avatar: string
    bio: {
      headline: string
      full: string[]
    }
    funFacts: string[]
    socials: {
      name: string
      url: string
      icon: string
      isResume?: boolean
    }[]
    experience: Experience[]
    skills: {
      category: string
      items: string[]
    }[]
  }
  projects: Project[]
  quotes: {
    text: string
    author: string
  }[]
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Eyimofe A. Pinnick',
    preferredName: 'Eyimofe',
    title: 'Product Manager who codes for fun',
    location: 'Lagos & Remote',
    localTimezone: 'Africa/Lagos',
    avatar: '/assets/images/profile.jpeg',
    bio: {
      headline:
        'Leading products from 0 to 1, building cool stuff on the weekends.',
      full: [
        'I sit at the intersection of product management, AI & machine learning, and software engineering. With 2+ years translating ambiguous problems into crisp, high-impact software, I believe the best products tell a story of a problem that needed to be solved.',
        "When I'm not writing PRDs, syncing with design/engineering or speaking to stakeholders, you'll find me tinkering with code on a hobby project, studying Machine Learning and building software that feels alive.",
      ],
    },
    funFacts: [
      'Product Manager who actually inspects the console & writes TypeScript',
      'Obsessed with 0-to-1 product strategy and crisp specs',
      'Loves physical notebooks, sticky notes & tactile desk gadgets',
      'Lagos-based, shipping software globally',
    ],
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/eyimofe-p',
        icon: 'linkedin',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/eyim0fe',
        icon: 'github',
      },
      {
        name: 'Email',
        url: 'mailto:eyimofepinnick@gmail.com',
        icon: 'mail',
      },
      {
        name: 'Resume',
        url: '/assets/resume.pdf',
        icon: 'file-text',
        isResume: true,
      },
    ],
    experience: [
      {
        role: 'Product Manager',
        company: 'Tegence',
        companyUrl: 'https://www.tegence.com/',
        location: 'Remote',
        period: 'February 2025 — Present',
        highlight:
          'Leading product thinking, RAG AI orchestration agent, and enterprise OS workflows.',
        details: [
          'Delivered Praxis Enterprise OS centralizing workforce workflows across distributed operations.',
          'Spearheaded Landmark Customer Service AI Agent utilizing RAG and AI orchestration.',
          'Partnered with AI research teams to ship AI Solar Risk Prediction model interfaces.',
        ],
      },
      {
        role: 'Junior Product Manager',
        company: 'Sabi',
        companyUrl: 'https://www.sabi.am/',
        location: 'Victoria Island, Lagos',
        period: 'April 2024 — July 2025',
        highlight:
          'Digitized operational workflows and employee lifecycle systems.',
        details: [
          'Mapped operational HR workflows and authored comprehensive technical requirements.',
          'Digitized employee onboarding, ID card generation, and offboarding pipelines.',
          'Coordinated cross-functional development across design, QA, and engineering squads.',
        ],
      },
      {
        role: 'System and Database Administrator',
        company: 'NSIA INSURANCE',
        companyUrl: 'https://nsiainsurance.com/',
        location: 'Victoria Island, Lagos',
        period: 'January 2023 – February 2024',
        highlight:
          'Managed relational database systems, schema integrity, and enterprise infrastructure.',
        details: [
          'Administered production relational databases ensuring ACID transaction guarantees and 99.9% uptime.',
          'Optimized SQL query performance, schema indexes, and automated disaster recovery backups.',
          'Collaborated with systems engineering to streamline enterprise insurance data reporting.',
        ],
      },
    ],
    skills: [
      {
        category: 'Product Management',
        items: [
          'Product Discovery',
          'Product Strategy',
          'Roadmap Planning',
          'User Stories & Backlog',
          'Sprint Planning',
          'Product Documentation',
          'QA & Delivery',
        ],
      },
      {
        category: 'Product & Delivery',
        items: [
          'ClickUp',
          'Azure DevOps',
          'Figma',
          'Notion',
          'Project management',
        ],
      },
      {
        category: 'Frontend',
        items: ['React (TypeScript)', 'HTML', 'CSS'],
      },
      {
        category: 'Backend',
        items: [
          'Python(FastAPI)',
          'NodeJS (Express + Drizzle)',
          'REST APIs',
          'SQL (Postgres)',
        ],
      },
    ],
  },
  projects: [
    {
      id: 'tnbc',
      title: 'The New Breed Church Back Office',
      tagline:
        'A church management platform for managing members, attendance, giving, and church activities in one place.',
      roleLabel: 'Engineer',
      roleDescription:
        'Led product thinking and contributed to the design and development of a church management platform, translating church operations into practical digital workflows.',
      period: '2023',
      metrics:
        'Consolidated 6 disparate paper/spreadsheet systems into 1 digital workflow.',
      stack: [
        'React',
        'Python',
        'FastAPI',
        'SQLAlchemy',
        'PostgreSQL',
        'Tailwind CSS',
        'Supabase',
      ],
      isMobile: false,
      image: '/assets/images/tnbc-1.png',
      images: [
        {
          src: '/assets/images/tnbc-1.png',
          caption: 'Screen 1: Welcome',
        },
        {
          src: '/assets/images/tnbc-2.png',
          caption: 'Screen 2: Dashboard',
        },
        {
          src: '/assets/images/tnbc-3.png',
          caption: 'Screen 3: Member Directory',
        },
        {
          src: '/assets/images/tnbc-4.png',
          caption: 'Screen 4: Prayer Requests',
        },
        {
          src: '/assets/images/tnbc-5.png',
          caption: 'Screen 5: Audit Log',
        },
        {
          src: '/assets/images/tnbc-6.png',
          caption: 'Screen 5: Roles and Permissions',
        },
      ],
      caseStudy: {
        problem:
          'Church operations were spread across manual processes, making it difficult to manage member information, track attendance, record giving, and keep important church activities organized.',
        solution:
          'Built a centralized church management platform that brings member management, attendance tracking, giving, prayer requests, and other church operations into one system.',
        myImpact: [
          'Translated church workflows and operational needs into product requirements and user flows',
          'Designed and developed backend APIs for core church management features',
          'Built a member attendance system to record, track, and manage church attendance',
          'Built QR-code-based worker attendance with geolocation validation and automated attendance reporting, deployed on Render',
          'Implemented authentication, member management, giving, and relational data models',
        ],
      },
    },
    {
      id: 'praxis',
      title: 'Praxis',
      tagline:
        'Organizational operating system for managing employees, work, communication, performance, and day-to-day operations.',
      roleLabel: 'Product Manager',
      roleDescription:
        'Led product direction and delivery, translating organizational needs into product requirements, user flows, and actionable features while working closely with design and engineering.',
      period: '2024',
      metrics: '',
      stack: [],
      isMobile: false,
      image: '/assets/images/praxis-1.svg',
      images: [
        {
          src: '/assets/images/praxis-1.svg',
          caption:
            'Screen 1: Praxis Centralized Workforce & Operational Dashboard',
        },
      ],
      caseStudy: {
        problem:
          'Organizations relied on fragmented tools and workflows to manage employees and day-to-day operations, creating inefficiencies and disconnected information.',
        solution:
          'Built a centralized operating system that brings key organizational workflows into one platform.',
        myImpact: [
          'Defined product requirements, user stories, and feature priorities',
          'Managed backlog, sprint planning, design reviews, QA, and delivery',
          'Identified product issues and worked with designers to improve the design system',
          'Collaborated with engineering to translate requirements into production features',
        ],
      },
    },
    {
      id: 'tsems',
      title: 'Tsems',
      tagline:
        'Mobile meal planner and recipe organizer for fitness goals and weekly planning.',
      roleLabel: 'Engineer',
      roleDescription:
        'End-to-end product definition, UI design, and full-stack implementation.',
      period: '2024',
      metrics:
        'Reduced weekly meal planning time from 45 mins to under 8 mins in beta.',
      stack: [
        'React',
        'TypeScript',
        'Express',
        'Drizzle',
        'PostgreSQL',
        'Supabase',
      ],
      isMobile: true,
      image: '/assets/images/tsems-1.png',
      images: [
        {
          src: '/assets/images/tsems-1.png',
          caption: 'Screen 1: Meal Activity & Saved Meal Library',
          isMobile: true,
        },
        {
          src: '/assets/images/tsems-2.png',
          caption: 'Screen 2: Recipe Detail, Ingredients & Cooking Notes',
          isMobile: true,
        },
      ],
      caseStudy: {
        problem:
          'People, especially those with fitness goals, often struggle with deciding what to eat. Even when they already know meals they enjoy, it can be hard to keep track of them and plan what to eat throughout the week.',
        solution:
          "Built Tsems to help users save and organize their meals, find what they want to eat quickly, and create weekly meal plans. The product can later use AI to recommend meals based on a user's goals and available ingredients.",
        myImpact: [
          'Defined the problem, MVP, and main features for Tsems',
          'Designed the user flow and planned how meals, ingredients, and meal plans would work together',
          'Created a roadmap from a simple meal library to weekly meal planning and future AI features',
        ],
      },
    },
    {
      id: 'landmark-ai',
      title: 'Landmark Customer Service AI Agent',
      tagline:
        'An AI customer service assistant that helps customers book, request refunds, reschedule, and ask questions.',
      roleLabel: 'Product Manager',
      roleDescription:
        'Led product direction and defined how the AI assistant should handle customer requests, working closely with engineering and business teams.',
      period: '2024',
      metrics:
        'Handled 78% of routine customer requests automatically in sub-2 seconds.',
      stack: [
        'RAG',
        'AI Orchestration',
        'LLMs',
        'Python',
        'FastAPI',
        'APIs',
        'Figma',
      ],
      isMobile: false,
      image: '',
      images: [],
      caseStudy: {
        problem:
          'Customers had to manually search through websites or wait for customer support to handle basic tasks like making bookings, asking for refunds, or changing dates.',
        solution:
          'Built an AI customer service agent that understands what customers need and uses AI to answer questions accurately and complete actions automatically.',
        myImpact: [
          'Defined customer requests and mapped out how the AI agent should respond',
          'Wrote user stories and product requirements for basic and complex user flows',
          'Worked with engineers to make sure the AI retrieved correct answers and triggered the right actions',
          'Tested and validated the assistant to ensure answers were helpful, accurate, and reliable',
        ],
      },
    },
    {
      id: 'solar-risk',
      title: 'AI Solar Risk Prediction System',
      tagline:
        'An AI system that spots potential risks and issues with solar energy installations before expensive breakdowns happen.',
      roleLabel: 'Product Manager',
      roleDescription:
        'Led product discovery and definition, working with AI researchers and software engineers to turn machine learning predictions into easy-to-use tools.',
      period: '2024',
      metrics:
        'Identified early equipment warning signals to prevent costly solar installation downtime.',
      stack: [
        'Machine Learning',
        'Python',
        'AI/ML models',
        'FastAPI',
        'APIs',
        'PostgreSQL',
      ],
      isMobile: true,
      image: '/assets/images/raas-2.png',
      images: [
        {
          src: '/assets/images/raas-2.png',
          caption: 'Screen 1: Dashboard',
          isMobile: true,
        },
        {
          src: '/assets/images/raas-3.png',
          caption: 'Screen 2: AI Diagnosis',
          isMobile: true,
        },
        {
          src: '/assets/images/raas-4.png',
          caption: 'Screen 3: Weather Risk & Recommendations',
          isMobile: true,
        },
      ],
      caseStudy: {
        problem:
          'Solar energy systems can develop hidden issues that are hard to spot early, leading to unexpected equipment damage and high repair costs.',
        solution:
          'Created an AI-powered risk prediction tool that warns operators about potential problems early so they can fix them before failure.',
        myImpact: [
          'Researched how solar teams assess risk to understand what data and alerts matter most',
          'Defined product requirements and simple dashboard screens for viewing risk alerts',
          'Worked with AI/ML engineers to translate complex prediction data into clear, actionable advice',
          'Ensured users could easily understand risk scores and take preventive action',
        ],
      },
    },
  ],
  quotes: [
    {
      text: 'The details are not the details. They make the design.',
      author: 'Charles Eames',
    },
    {
      text: 'Good software feels like a sharp pencil on crisp paper.',
      author: 'Product Engineering Philosophy',
    },
  ],
}
