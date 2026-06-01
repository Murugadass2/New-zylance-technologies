type ChatRule = {
  keywords: string[];
  response: string;
};

const rules: ChatRule[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    response:
      "Hello! 👋 I'm the Xylance Technologies assistant. Ask me about our services, pricing, contact info, or how to get started.",
  },
  {
    keywords: ["service", "services", "what do you do", "offer", "provide"],
    response:
      "We offer Web Development, Mobile App Development, UI/UX Design, Digital Marketing, Automation, and SEO Optimization. Visit our Services page or ask about any specific service!",
  },
  {
    keywords: ["web", "website", "react", "next.js", "nextjs"],
    response:
      "Our web development team builds fast, scalable sites and apps using React, Next.js, TypeScript, and Node.js — optimized for speed, accessibility, and SEO from day one.",
  },
  {
    keywords: ["mobile", "app", "ios", "android", "react native"],
    response:
      "We build native iOS (Swift), Android (Kotlin), and cross-platform apps with React Native — from MVP to App Store launch and beyond.",
  },
  {
    keywords: ["seo", "search", "rank", "google"],
    response:
      "Our SEO services include technical audits, keyword research, content optimization, backlink building, and local/international SEO using tools like Ahrefs and SEMrush.",
  },
  {
    keywords: ["marketing", "ads", "social", "campaign"],
    response:
      "We run data-driven digital marketing: Google Ads, social ads (Meta, LinkedIn, TikTok), email automation, CRO, and analytics with GA4 and Mixpanel.",
  },
  {
    keywords: ["design", "ui", "ux", "figma"],
    response:
      "Our UI/UX team handles user research, wireframes, prototypes, design systems, and usability testing — primarily using Figma and Adobe XD.",
  },
  {
    keywords: ["automation", "workflow", "integrate", "zapier"],
    response:
      "We automate business workflows with Zapier, Make, n8n, and custom integrations — CRM sync, marketing automation, notifications, and reporting.",
  },
  {
    keywords: ["price", "pricing", "cost", "budget", "quote", "how much"],
    response:
      "We offer both fixed-price and time-and-materials engagements depending on project scope. Get a free consultation with a 48h response time!",
  },
  {
    keywords: ["contact", "email", "phone", "call", "reach", "whatsapp"],
    response:
      "Reach us at xylancetechnologies@gmail.com or call +91 7010657314 / +91 8667825086. You can also message us on WhatsApp using the green button, or fill out the contact form on our website.",
  },
  {
    keywords: ["location", "office", "where", "remote"],
    response:
      "We operate remotely and serve clients worldwide. Distance is never a barrier — we work with teams across time zones.",
  },
  {
    keywords: ["project", "start", "begin", "consultation", "hire"],
    response:
      "Ready to start? Book a free consultation on our Contact page. We'll map a strategy tailored to your goals — NDA available on request.",
  },
  {
    keywords: ["technology", "technologies", "stack", "tools"],
    response:
      "We use React, Next.js, TypeScript, Node.js, Swift, Kotlin, React Native, Firebase, GraphQL, and modern cloud infrastructure.",
  },
  {
    keywords: ["process", "timeline", "how long", "steps"],
    response:
      "Our process: 1) Planning & discovery → 2) UI/UX design → 3) Development with weekly demos → 4) Testing (QA, performance, security) → 5) Launch & scale.",
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye"],
    response:
      "You're welcome! Feel free to come back anytime. Have a great day! 🚀",
  },
];

const defaultResponse =
  "I'm not sure about that, but I can help with our services, pricing, contact details, or how to start a project. Try asking something like \"What services do you offer?\" or \"How can I contact you?\"";

export function getChatbotResponse(message: string): string {
  const normalized = message.toLowerCase().trim();
  if (!normalized) return "Please type a message and I'll do my best to help!";

  for (const rule of rules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.response;
    }
  }

  return defaultResponse;
}

export const quickReplies = [
  "What services do you offer?",
  "How much does it cost?",
  "How can I contact you?",
  "How do I start a project?",
];
