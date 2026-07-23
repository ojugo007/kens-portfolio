export const services = [
  {
    title: "Workflow Automation",
    text: "Streamline repetitive business processes with smart automated workflows that save time, reduce errors, and improve productivity.",
  },
  {
    title: "Automated CRM & Team Assignment",
    text: "Automate lead tracking, customer follow-ups, pipeline management, and notifications to improve customer relationships and conversions.",
  },
  {
    title: "API Integrations",
    text: "Connect your favorite tools and platforms seamlessly using powerful API integrations tailored to your business operations.",
  },
  {
    title: "Zapier Automation",
    text: "Build scalable no-code and low-code automations with Zapier to connect apps and automate daily tasks effortlessly.",
  },
  {
    title: "n8n & Make Workflow Solutions",
    text: "Develop flexible and advanced workflow automations with n8n for custom business logic and self-hosted automation systems.",
  },
  {
    title: "Slack & Team Automation",
    text: "Automate team communication, alerts, onboarding, approvals, and task management directly inside Slack.",
  },
  {
    title: "Airtable Systems",
    text: "Create powerful Airtable databases and automated systems for project management, CRM, operations, and internal tools.",
  },
  {
    title: "Business Process Optimization",
    text: "Analyze and optimize operational workflows to eliminate bottlenecks and improve overall business efficiency.",
  },
  {
    title: "AI-Powered Automation",
    text: "Integrate AI tools into your workflows to automate content generation, customer support, data processing, and decision-making.",
  },
  {
    title: "Custom Automation Solutions",
    text: "Design tailored automation systems built specifically around your business goals, workflows, and operational needs.",
  },
];

export const skills = [
    {
      items: ["Make", "Integromat"],
    },
    {
      items: ["Webhooks", "REST APIs"],
    },
    {
      items: ["Python", "TypeScript", "Bash scripting"],
    },
    {
      items: ["Google Sheets", "Process Mapping","SQL databases"],
    },
    {
      items: ["Slack", "Gmail Filters", "Telegram Bot API"],
    },
    {
      items: ["Notion automation","N8N", "CRM"],
    },
    {
      items: ["Git knowledge"],
    },
];

export const stats = [
    {
      value: 2,
      label: "Years Experience",
      showPlus: true
    },
    {
      value: 5,
      label: "Completed Projects",
      showPlus: false
    },
    {
      value: 15,
      label: "Happy Customers",
      showPlus: true
    },
    {
      value: 4,
      label: "Certifications",
      showPlus: false
    },
];

export const roles = [
    "Building intelligent workflows.",
    "Connecting APIs and business tools.",
    "Eliminating repetitive tasks.",
    "Creating AI-powered automations.",
    "Scaling operations efficiently.",
];

export const stack = {
    "Airtable": 80,
    "Make": 75,
    "Zapier": 80,
    "Notion": 85
}

export const slides = [
  {
    fullName: "The Christ Anointed Family Chapel Int’l.",
    position: "General Overseer, cafcintl",
    testimonial:
      "New member information is now captured automatically and assigned to the right follow-up team without any manual work. It has made our onboarding process faster, more organized, and much easier to manage as our church continues to grow.",
    rating: 5,
    avatar:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1783954553/cafintl_lt7zag.jpg",
  },
  {
    fullName: "KJ Shots",
    position: "CEO",
    testimonial:
      "We no longer have to manually sort through inquiries. Every lead is captured, scored based on quality, and receives timely follow-ups automatically, helping us focus on the prospects most likely to convert.",
    rating: 5,
    avatar:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1783954552/kj-shots_gdmnss.jpg",
  },
  {
    fullName: "Digital Gold Fx",
    position: "Cummunity Manager, Digital Gold Fx",
    testimonial:
      "Our Telegram community now receives real-time crypto price updates automatically, keeping everyone informed without constant monitoring. The workflow has been reliable, accurate, and has saved us a great deal of time.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    fullName: "The Christ Anointed Family Chapel",
    position: "Lead, Follow-up team, cafcintl",
    testimonial:
      "Every first-time guest and new member now receives consistent follow-up messages automatically, ensuring no one is overlooked. The entire follow-up process is more organized, and our team can focus on building meaningful connections instead of tracking everything manually.",
    rating: 5,
    avatar:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1783954553/cafintl_lt7zag.jpg",
  },
  
];

export const projects = [
  {
    id: 1,
    projectTitle: "Automated CRM + Team Assignment",
    projectImage:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1781798212/Automated%20CRM%20and%20Team%20Assignment%20workflow.jpg",
    projectDesc:
      "Auto-routed leads by region and expertise, cutting response times to under 2 minutes.",

    caseStudy: {
      overview:
        "A client needed a faster and more reliable way to distribute incoming leads to the correct sales representatives. Their existing process relied on manually reviewing every submission before assigning it to the appropriate team member, creating delays and inconsistent lead handling.",

      challenge:
        "Incoming leads were manually reviewed, assigned by region and expertise, and then communicated to the appropriate sales representative. As lead volume increased, response times became inconsistent and valuable opportunities risked being lost.",

      solution:
        "I designed an automated workflow that validates incoming submissions, determines the customer's region, identifies the appropriate sales representative, updates the CRM automatically, and instantly notifies the assigned team member.",

      workflow: [
        "Lead form submission",
        "Validate customer data",
        "Determine customer region",
        "Find matching sales representative",
        "Assign lead in CRM",
        "Notify assigned team member",
        "Log activity",
      ],

      technologies: [
        "Make.com",
        "CRM Integration",
        "Webhooks",
        "Google Sheets / Airtable",
        "Email Notifications",
      ],

      results: [
        "Reduced lead response time to under 2 minutes",
        "Eliminated manual lead assignment",
        "Improved routing consistency",
        "Reduced the risk of missed or forgotten leads",
        "Allowed sales representatives to focus on closing deals",
      ],

      takeaway:
        "This automation improved both customer response times and internal operational efficiency by removing repetitive administrative work.",
    },
  },

  {
    id: 3,
    projectTitle: "Telegram Crypto Price Tracker",
    projectImage:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1781798212/crypto%20price%20telegram%20chatbot%20workflow.jpg",
    projectDesc:
      "Delivered real-time Telegram alerts, eliminating manual chart monitoring.",

    caseStudy: {
      overview:
        "Crypto traders often spend hours monitoring price charts. This project automated market monitoring and delivered instant Telegram alerts whenever predefined price conditions were met.",

      challenge:
        "Users had to manually monitor multiple cryptocurrency charts throughout the day, making it easy to miss important price movements.",

      solution:
        "I built an automated monitoring workflow that continuously checks cryptocurrency prices, compares them against user-defined thresholds, and instantly delivers Telegram notifications whenever conditions are met.",

      workflow: [
        "Scheduled price check",
        "Fetch market data",
        "Compare against alert rules",
        "Evaluate conditions",
        "Send Telegram notification",
        "Log alert",
      ],

      technologies: [
        "Make.com",
        "Telegram Bot API",
        "Crypto Price API",
        "Scheduling",
        "Conditional Logic",
      ],

      results: [
        "Eliminated manual market monitoring",
        "Delivered real-time Telegram notifications",
        "Improved reaction time to market movements",
        "Reduced repetitive chart checking",
      ],

      takeaway:
        "Automation can improve personal productivity just as much as business operations by removing repetitive monitoring tasks.",
    },
  },

  {
    id: 5,
    projectTitle: "Automated Employee PTO System for Loubby AI",
    projectImage:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1784633907/automated-pto_jolfng.jpg",
    projectDesc:
      "Developed an automated Paid Time Off (PTO) management system for Loubby AI that streamlines leave requests, approvals, and record keeping.",

    caseStudy: {
      overview:
        "Loubby AI needed a centralized and automated way to manage employee leave requests while reducing administrative overhead for HR.",

      challenge:
        "Leave requests, approvals, PTO balance tracking, and employee notifications were handled manually, making the process slow and prone to errors.",

      solution:
        "I developed an automated PTO management workflow where employees submit requests through a single form, managers approve requests automatically, leave balances update instantly, and employees receive status notifications.",

      workflow: [
        "Employee submits PTO request",
        "Manager receives approval request",
        "Approve or reject request",
        "Update PTO balance",
        "Update employee records",
        "Notify employee",
      ],

      technologies: [
        "Make.com",
        "Airtable",
        "Notion",
        "Email Automation",
        "Approval Workflow",
      ],

      results: [
        "Reduced repetitive HR administration",
        "Improved visibility into leave balances",
        "Standardized the approval process",
        "Maintained an accurate leave history",
        "Reduced approval turnaround time",
      ],

      takeaway:
        "Automating internal HR processes improved accuracy, transparency, and employee experience while reducing manual administrative work.",
    },
  },

  {
    id: 6,
    projectTitle: "Automated Lead-Nurturing Pipeline",
    projectImage:
      "https://res.cloudinary.com/dw94gbpfs/image/upload/v1781875495/Automated%20lead-nurturing%20pipeline.jpg",
    projectDesc:
      "Developed a lead-nurturing workflow that automates follow-ups, tracks engagement, and moves prospects through the sales funnel efficiently.",

    caseStudy: {
      overview:
        "Many businesses lose potential customers because follow-ups are inconsistent. This workflow automated lead nurturing to ensure every prospect received timely and personalized communication.",

      challenge:
        "Sales teams struggled to consistently follow up with every lead, causing prospects to lose interest before meaningful engagement occurred.",

      solution:
        "I created an automated lead nurturing workflow that tracks prospect activity, schedules personalized follow-up messages, updates the CRM, and alerts sales representatives when prospects become engaged.",

      workflow: [
        "New lead captured",
        "Store lead in CRM",
        "Wait based on follow-up schedule",
        "Send personalized message",
        "Track engagement",
        "Notify sales representative when qualified",
      ],

      technologies: [
        "Make.com",
        "CRM Integration",
        "Email Automation",
        "Scheduling",
        "Conditional Logic",
      ],

      results: [
        "Automated repetitive follow-up tasks",
        "Improved lead engagement",
        "Reduced manual sales administration",
        "Created a consistent customer journey",
        "Helped move prospects through the sales funnel more efficiently",
      ],

      takeaway:
        "Consistent follow-up is critical to sales success, and automation ensures no opportunity is overlooked.",
    },
  },
];


export const EDUCATION = [
  { school: "AI Automation", role: "Student", period: "Jul 2025 – Oct 2025", desc: "AI Automation Specialist" },
  { school: "CyberSecurity", role: "Student", period: "Mar 2024 – Jun 2024", desc: "Junior Cybersecurity Analyst" },
  { school: "University of Benin", role: "Student", period: "Dec 2012 – Dec 2016", desc: "BSc. Industrial Physics. Benin, Edo State." },
];

export const EXPERIENCE = [
  { company: "Freelance", role: "Automation Consultant", period: "Aug 2025 – Present", desc: "Built automation systems that eliminated repetitive work, saving clients 20+ hours weekly and reducing manual data entry by 80%." },

  { company: "KJ Shots", role: "Automation Engineer", period: "feb 2026", desc: "Built an automated lead capture and scoring system with AI-driven follow-ups." },

  { company: "The Christ Anointed Family Chapel", role: "Automation Consultant", period: "Apr 2025 – Aug 2025", desc: "Built automation systems that eliminated repetitive work." },


];