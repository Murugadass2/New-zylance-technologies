import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeader, Breadcrumbs } from "@/components/site/Section";
import { breadcrumbSchema, buildPageHead, getPageSeo } from "@/lib/seo";
import drizzleDropInn from "@/assets/project-drizzledropinn.png";
import pmconstruction from "@/assets/pm-construction.png";
import chennaibuilders from "@/assets/chennaibuilders.png";

const projectSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "CreativeWork",
      name: "Dazzle Drop Inn Hotel Website",
      url: "https://www.drizzledropinn.com/",
      description: "Premium hotel website designed and developed by Xylance Technologies.",
    },
    {
      "@type": "CreativeWork",
      name: "PM Constructions Website",
      url: "https://www.pm-constructions.com/",
      description: "Real estate website created for PM Constructions to showcase properties and capture leads.",
    },
     {
      "@type": "CreativeWork",
      name: "Chennai Builders Website",
      url: "https://chennaibuilders.com/",
      description: "Real estate website created for Chennai Builders to showcase properties and capture leads.",
    },
  ],
};

export const Route = createFileRoute("/projects")({
  head: () =>
    buildPageHead({
      seo: getPageSeo("projects"),
      schemas: [
        projectSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]),
      ],
    }),
  component: Projects,
});

const projects = [
  {
    title: "Dazzle Drop Inn Hotel Website",
    tag: "Hotel · Web Development",
    desc: "A premium, fully responsive hotel website built for Dazzle Drop Inn — fast, SEO-optimized and conversion-focused.",
    href: "https://www.drizzledropinn.com/",
    image: drizzleDropInn,
  },
  {
    title: "PM Constructions Website",
    tag: "Real Estate · Web Development",
    desc: "A modern website built for PM Constructions to showcase properties, services, and lead capture.",
    href: "https://www.pm-constructions.com/",
    image: pmconstruction,
  },
   {
    title: "Chennai Builders Website",
    tag: "Real Estate · Web Development",
    desc: "A modern website built for Chennai Builders to showcase properties, services, and lead capture.",
    href: "https://chennaibuilders.com/",
    image: chennaibuilders,
  },
];

const stats = [
  { value: "10+", label: "Projects shipped" },
  { value: "8+", label: "Happy Clients" },
  { value: "4.9★", label: "Average rating" },
  { value: "85%", label: "Client retention" },
];

const techStack = ["React", "Next.js", "TypeScript", "Node.js", "Swift", "Kotlin", "Postgres", "AWS", "Figma", "Tailwind"];

const animateStatValue = (value: string, progress: number) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const target = parseFloat(match[1]);
  const suffix = match[2] || "";
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const current = target * progress;
  const display = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString();
  return `${display}${suffix}`;
};

function Projects() {
  const [animatedValues, setAnimatedValues] = useState(stats.map((s) => s.value));

  useEffect(() => {
    let frameId: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedValues(stats.map((s) => animateStatValue(s.value, progress)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <section className="container mx-auto px-6 pt-8 pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mt-6 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium">Portfolio</span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            Our <span className="text-gradient">Recent Projects</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A selection of premium websites we've crafted for ambitious teams. Hover any project to see it in full color.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl glass hover:shadow-glow transition-all block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/90 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-card">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full glass text-neon-cyan font-medium">Featured</span>
                  <span className="text-muted-foreground">{p.tag}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-16">
        <div className="glass-strong border-gradient rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, index) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-gradient">{animatedValues[index]}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="Tech stack"
          title={<>Tools we <span className="text-gradient">build with</span></>}
        />
        <div className="mt-12 flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {techStack.map((t) => (
            <span key={t} className="glass rounded-full px-5 py-2.5 text-sm font-medium">{t}</span>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow">
            Start your project
          </Link>
        </div>
      </section>
    </>
  );
}
