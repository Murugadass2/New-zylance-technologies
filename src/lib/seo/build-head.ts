import { COMPANY, absoluteUrl } from "@/lib/seo/site";
import type { PageSeoConfig } from "@/lib/seo/pages";

export type BuildPageHeadOptions = {
  seo: PageSeoConfig;
  /** Extra JSON-LD objects (Organization, FAQPage, etc.) */
  schemas?: object[];
  /** Override default OG image */
  ogImage?: string;
};

export function buildPageHead({ seo, schemas = [], ogImage }: BuildPageHeadOptions) {
  const canonical = absoluteUrl(seo.path);
  const image = absoluteUrl(ogImage ?? COMPANY.defaultImage);
  const keywords = seo.keywords.join(", ");

  const meta = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "keywords", content: keywords },
    { name: "author", content: COMPANY.name },
    { name: "publisher", content: COMPANY.name },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow" },
    { name: "bingbot", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "geo.region", content: "IN" },
    { name: "geo.placename", content: "India" },
    { property: "og:site_name", content: COMPANY.name },
    { property: "og:type", content: "website" },
    { property: "og:title", content: seo.ogTitle },
    { property: "og:description", content: seo.ogDescription },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: `${COMPANY.name} — ${seo.ogTitle}` },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: COMPANY.twitter },
    { name: "twitter:title", content: seo.twitterTitle },
    { name: "twitter:description", content: seo.twitterDescription },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: `${COMPANY.name} — ${seo.twitterTitle}` },
    { name: "application-name", content: COMPANY.name },
    { name: "apple-mobile-web-app-title", content: COMPANY.name },
    { name: "format-detection", content: "telephone=yes" },
    { name: "theme-color", content: "#0a0a18" },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    description: seo.description,
    url: canonical,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: COMPANY.name,
      url: absoluteUrl("/"),
    },
    keywords,
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: absoluteUrl(COMPANY.logo),
    },
  };

  const allSchemas = [webPageSchema, ...schemas];

  return {
    meta,
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", href: canonical, hrefLang: "en" },
      { rel: "alternate", href: canonical, hrefLang: "x-default" },
    ],
    scripts: allSchemas.map((schema) => ({
      type: "application/ld+json" as const,
      children: JSON.stringify(schema),
    })),
  };
}
