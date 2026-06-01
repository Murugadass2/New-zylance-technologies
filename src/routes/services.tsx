import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, Smartphone, Megaphone, Search, Layout, Zap, ArrowRight, Check } from "lucide-react";
import { SectionHeader, Breadcrumbs } from "@/components/site/Section";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Development, Mobile App Development, UI/UX Design, Automation, SEO, Digital Marketing",
  provider: { "@type": "Organization", name: "Xylance Technologies" },
  areaServed: "Worldwide",
  description: "Professional web development, mobile app development, UI/UX design, automation, SEO and digital marketing services.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What technologies do you use?", acceptedAnswer: { "@type": "Answer", text: "We use React, Next.js, TypeScript, Node.js, Swift, Kotlin and modern cloud infrastructure." } },
    { "@type": "Question", name: "Do you offer fixed-price projects?", acceptedAnswer: { "@type": "Answer", text: "Yes, we offer both fixed-price and time-and-materials engagements depending on scope clarity." } },
  ],
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Professional Web Development, SEO & Mobile App Services" },
      { name: "description", content: "Explore our expert web development, mobile app development, digital marketing, and SEO services for businesses." },
      { property: "og:title", content: "Professional Digital Services" },
      { property: "og:description", content: "Web, mobile, SEO and digital marketing services." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Services,
});

const services = [
  {
    Icon: Code2,
    title: "Web Development",
    tagline: "Scalable, fast, beautiful web platforms",
    desc: "We engineer high-performance web applications and marketing sites built on modern stacks like React, Next.js and TypeScript. Every site is optimized for speed, accessibility and SEO from day one.",
    features: ["Custom web applications", "Landing pages & marketing sites", "Headless CMS integration", "E-commerce platforms", "API & backend development"],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Postgres"],
  },
  {
    Icon: Smartphone,
    title: "Mobile App Development",
    tagline: "iOS, Android and cross-platform apps",
    desc: "Native and cross-platform mobile apps that users love. We craft delightful UI, performant code and bulletproof backends — from MVP to App Store launch and beyond.",
    features: ["iOS native (Swift)", "Android native (Kotlin)", "Cross-platform (React Native)", "Backend & APIs", "App Store optimization"],
    tech: ["Swift", "Kotlin", "React Native", "Firebase", "GraphQL"],
  },
  {
    Icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Data-driven growth campaigns",
    desc: "Performance marketing across paid search, social and content. We build the funnels, track the data and iterate relentlessly to drive measurable ROI.",
    features: ["Paid search (Google Ads)", "Social ads (Meta, LinkedIn, TikTok)", "Email & marketing automation", "Conversion rate optimization", "Analytics & reporting"],
    tech: ["GA4", "Mixpanel", "HubSpot", "Klaviyo", "Tag Manager"],
  },
  {
    Icon: Layout,
    title: "UI/UX Design",
    tagline: "Customer-first digital experiences",
    desc: "Design systems, prototypes and user journeys that make digital products intuitive and engaging across web and mobile.",
    features: ["User research & personas", "Wireframes & prototypes", "Interaction design", "Design system creation", "Usability testing"],
    tech: ["Figma", "Adobe XD", "Miro", "Zeplin", "Principles"],
  },
  {
    Icon: Zap,
    title: "Automation",
    tagline: "Smarter workflows, faster execution",
    desc: "Automated business processes, marketing workflows and system integrations that remove manual steps and improve reliability.",
    features: ["Workflow automation", "API integrations", "CRM & marketing automation", "Notifications & alerts", "Reporting automation"],
    tech: ["Zapier", "Make", "n8n", "Integromat", "Custom scripts"],
  },
  {
    Icon: Search,
    title: "SEO Optimization",
    tagline: "Rank, traffic, revenue — sustained",
    desc: "Technical SEO audits, content strategy, link building and on-page optimization. We help businesses rank for the keywords that matter and stay there.",
    features: ["Technical SEO audits", "Keyword research & strategy", "Content optimization", "Backlink acquisition", "Local & international SEO"],
    tech: ["Ahrefs", "SEMrush", "Screaming Frog", "Search Console", "Schema.org"],
  },
];

const process = [
  { num: "01", title: "Planning", desc: "Discovery, requirements and roadmap." },
  { num: "02", title: "UI/UX Design", desc: "Wireframes, prototypes and design systems." },
  { num: "03", title: "Development", desc: "Iterative engineering with weekly demos." },
  { num: "04", title: "Testing", desc: "QA, performance, security and accessibility." },
  { num: "05", title: "Launch", desc: "Deploy, monitor, optimize and scale." },
];

function Services() {
  return (
    <>
      <section className="container mx-auto px-6 pt-8 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mt-6 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium">Services</span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            Professional <span className="text-gradient">Digital Services</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            End-to-end web, mobile, SEO and digital marketing services engineered to ship fast and perform at scale.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-6 py-12 space-y-8">
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative glass rounded-3xl p-8 md:p-12 hover:shadow-glow transition-all"
          >
            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:animate-pulse-glow">
                  <s.Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="mt-6 text-xs uppercase tracking-widest text-neon-cyan font-semibold">0{i + 1}</div>
                <h2 className="mt-2 text-3xl font-bold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Features</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-neon-cyan mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full glass text-xs font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Process */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="Our process"
          title={<>How we <span className="text-gradient">deliver</span></>}
          description="A proven 5-step process designed for speed, transparency and quality."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {process.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative glass rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-gradient">{p.num}</div>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-semibold">
            See our projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
