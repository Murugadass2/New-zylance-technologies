/** Public site URL — set VITE_SITE_URL in Vercel env (e.g. https://xylancetechnologies.vercel.app) */
export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://xylancetechnologies.vercel.app";

export const COMPANY = {
  name: "Xylance Technologies",
  legalName: "Xylance Technologies",
  tagline: "Turning Ideas Into Digital Reality",
  email: "xylancetechnologies@gmail.com",
  phone: "+91 7010657314",
  phoneAlt: "+91 8667825086",
  twitter: "@xylancetech",
  logo: "/logo.png",
  defaultImage: "/logo.png",
} as const;

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
