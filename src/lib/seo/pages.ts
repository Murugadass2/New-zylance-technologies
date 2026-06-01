import { getPageKeywords } from "@/lib/seo/keywords";
import { COMPANY, absoluteUrl } from "@/lib/seo/site";

export type SeoPageId = "home" | "about" | "services" | "projects" | "contact";

export type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  keywords: string[];
};

const PAGE_COPY: Record<
  SeoPageId,
  Omit<PageSeoConfig, "keywords" | "path"> & { path: string }
> = {
  home: {
    path: "/",
    title: `${COMPANY.name} | Web Development, Mobile Apps, SEO & Digital Marketing`,
    description:
      `${COMPANY.name} delivers expert web development, mobile app development, UI/UX design, SEO optimization, digital marketing, and business automation for startups and enterprises worldwide. ${COMPANY.tagline}.`,
    ogTitle: `${COMPANY.name} — Web, Mobile, SEO & Marketing Agency`,
    ogDescription:
      "Professional web development, mobile apps, SEO, and digital marketing that drive measurable growth for modern businesses.",
    twitterTitle: `${COMPANY.name} | Full-Service Digital Agency`,
    twitterDescription:
      "Web development, mobile apps, SEO & digital marketing — built for performance, conversions, and long-term growth.",
  },
  about: {
    path: "/about",
    title: `About ${COMPANY.name} | Mission, Vision & Expert IT Team`,
    description:
      `Learn about ${COMPANY.name}: our mission, vision, values, and senior team of engineers, designers, and growth specialists building enterprise-grade digital products for clients worldwide.`,
    ogTitle: `About ${COMPANY.name} | Technology Company Profile`,
    ogDescription:
      "Discover our story, culture, and expertise in web, mobile, design, SEO, and digital marketing.",
    twitterTitle: `About ${COMPANY.name}`,
    twitterDescription:
      "Mission-driven IT company focused on craft, transparency, and measurable client outcomes.",
  },
  services: {
    path: "/services",
    title: `Services | Web Development, Mobile Apps, SEO & Marketing | ${COMPANY.name}`,
    description:
      `Explore ${COMPANY.name} services: custom web development (React, Next.js, TypeScript), native & cross-platform mobile apps, UI/UX design, SEO optimization, digital marketing, and workflow automation.`,
    ogTitle: `Digital Services — Web, Mobile, SEO & Automation | ${COMPANY.name}`,
    ogDescription:
      "End-to-end services from strategy and design to engineering, launch, SEO, and growth marketing.",
    twitterTitle: `${COMPANY.name} Services`,
    twitterDescription:
      "Web development, mobile apps, UI/UX, SEO, paid ads, email automation, and integrations.",
  },
  projects: {
    path: "/projects",
    title: `Projects & Portfolio | ${COMPANY.name} Case Studies`,
    description:
      `View ${COMPANY.name} portfolio: hotel websites, real estate platforms, construction company sites, and high-performance web projects with SEO, speed, and conversion-focused design.`,
    ogTitle: `Portfolio & Case Studies | ${COMPANY.name}`,
    ogDescription:
      "Featured client work including hospitality, real estate, and construction industry websites.",
    twitterTitle: `${COMPANY.name} Portfolio`,
    twitterDescription:
      "Recent projects showcasing web design, development quality, and business results.",
  },
  contact: {
    path: "/contact",
    title: `Contact ${COMPANY.name} | Free Consultation & Project Quote`,
    description:
      `Contact ${COMPANY.name} for web development, mobile apps, SEO, and digital marketing. Email ${COMPANY.email}, call ${COMPANY.phone}, or send a project inquiry — remote team, fast response.`,
    ogTitle: `Contact ${COMPANY.name} | Get a Free Consultation`,
    ogDescription:
      "Reach our remote digital team by email, phone, or contact form for quotes and consultations.",
    twitterTitle: `Contact ${COMPANY.name}`,
    twitterDescription:
      "Request a quote, book a consultation, or ask about web, mobile, SEO, and marketing services.",
  },
};

export function getPageSeo(page: SeoPageId): PageSeoConfig {
  const copy = PAGE_COPY[page];
  return {
    ...copy,
    keywords: getPageKeywords(page),
  };
}

export function getCanonical(path: string): string {
  return absoluteUrl(path);
}
