import { COMPANY, absoluteUrl } from "@/lib/seo/site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: absoluteUrl("/"),
  logo: absoluteUrl(COMPANY.logo),
  description:
    `${COMPANY.name} is a professional web development, mobile app development, SEO and digital marketing company.`,
  email: COMPANY.email,
  telephone: [COMPANY.phone, COMPANY.phoneAlt],
  sameAs: [
    "https://twitter.com/xylancetech",
    "https://www.linkedin.com/company/xylance-technologies",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: COMPANY.email,
    telephone: COMPANY.phone,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Tamil"],
  },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
