import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Zap, Users } from "lucide-react";
import { SectionHeader, Breadcrumbs } from "@/components/site/Section";
import { breadcrumbSchema, buildPageHead, getPageSeo } from "@/lib/seo";

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Xylance Technologies",
  description: "Learn about Xylance Technologies, our mission, vision, and team.",
};

export const Route = createFileRoute("/about")({
  head: () =>
    buildPageHead({
      seo: getPageSeo("about"),
      schemas: [
        aboutPageSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: About,
});

const values = [
  { Icon: Target, title: "Our Mission", desc: "Empower businesses with technology that delivers measurable outcomes — every line of code, every campaign." },
  { Icon: Eye, title: "Our Vision", desc: "To be the world's most trusted partner for ambitious teams turning ideas into market-defining products." },
  { Icon: Heart, title: "Our Values", desc: "Craft, transparency, ownership and relentless customer obsession sit at the heart of everything we ship." },
];

const journey = [
  { year: "2024", title: "Founded", desc: "Started with a team and a vision for premium digital craft." },
  { year: "2025", title: "First 10 Clients", desc: "Delivered platforms for fintech, healthcare and SaaS startups." },
  // { year: "2023", title: "Global Expansion", desc: "Opened collaboration with teams across 4 continents." },
  // { year: "2025", title: "50+ Projects", desc: "Recognized as a top-rated technology and digital marketing partner." },
];

const stack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Postgres", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Swift", category: "Mobile" },
  { name: "Kotlin", category: "Mobile" },
];

const skills = [
  { name: "Web Engineering", level: 98 },
  { name: "Mobile Development", level: 94 },
  { name: "SEO & Growth", level: 96 },
  { name: "UI / UX Design", level: 92 },
];

function About() {
  return (
    <>
      <section className="container mx-auto px-6 pt-8 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium">
            About us
          </span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            About Our <span className="text-gradient">Technology Company</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Xylance Technologies is a team of senior engineers, designers and growth specialists
            building enterprise-grade web platforms, mobile apps and digital marketing engines for
            ambitious businesses worldwide.
          </p>
        </motion.div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-5">
          {values.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-7 hover:shadow-glow transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="container mx-auto px-6 py-24">
        {/* <SectionHeader
          eyebrow="Our journey"
          title={<>From <span className="text-gradient">3 people</span> to a global team</>}
        /> */}
        <div className="mt-14 max-w-4xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-purple" aria-hidden="true" />
          {journey.map((j, i) => (
            <motion.div
              key={j.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative mb-10 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
            >
              <div className="absolute left-4 md:left-auto md:right-[-9px] top-3 h-4 w-4 rounded-full bg-gradient-primary shadow-glow"
                style={i % 2 !== 0 ? { left: "-9px", right: "auto" } : {}}
              />
              <div className="ml-12 md:ml-0 glass rounded-2xl p-6">
                <div className="text-sm text-neon-cyan font-semibold">{j.year}</div>
                <h3 className="mt-1 text-lg font-semibold">{j.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="Expertise"
              title={<>Skills sharpened over <span className="text-gradient">years of shipping</span></>}
              description="Our team blends product strategy, engineering depth and growth instinct."
              center={false}
            />
          </div>
          <div className="space-y-6">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>{s.name}</span>
                  <span className="text-neon-cyan">{s.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="Tech stack"
          title={<>Built on tools the <span className="text-gradient">best teams</span> trust</>}
        />
        <div className="mt-12 flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {stack.map((t) => (
            <div key={t.name} className="glass rounded-full px-5 py-2.5 text-sm font-medium">
              <span className="text-foreground">{t.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">· {t.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why us / CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { Icon: Award, title: "Award-winning craft", desc: "Recognized for design and engineering quality." },
            { Icon: Zap, title: "Speed & precision", desc: "Senior-only teams ship 3× faster with zero hand-offs." },
            { Icon: Users, title: "Long-term partners", desc: "85% of clients renew or expand after the first project." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <Icon className="h-7 w-7 text-neon-cyan" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow">
            Work with our team
          </Link>
        </div>
      </section>
    </>
  );
}
