import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Smartphone, Megaphone, Search, Zap, Shield, Rocket, Users, Star,
  CheckCircle2, Sparkles, TrendingUp, Globe
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SectionHeader } from "@/components/site/Section";
import { buildPageHead, getPageSeo } from "@/lib/seo";

const homeExtraSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Xylance Technologies",
    image: "https://xylancetechnologies.vercel.app/logo.png",
    url: "https://xylancetechnologies.vercel.app/",
    telephone: "+917010657314",
    email: "xylancetechnologies@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: "Worldwide",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Xylance Technologies offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer web development, mobile app development, UI/UX design, digital marketing, SEO, and automation services.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most websites ship in 3–6 weeks; complex mobile apps and platforms typically take 8–16 weeks based on scope.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide ongoing support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every engagement includes performance monitoring, security updates, and dedicated post-launch support plans.",
        },
      },
      {
        "@type": "Question",
        name: "Can you improve my Google ranking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our SEO team combines technical audits, content strategy, and link building to drive measurable organic growth.",
        },
      },
    ],
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildPageHead({
      seo: getPageSeo("home"),
      schemas: homeExtraSchemas,
      ogImage: "/assets/hero.jpg",
    }),
  component: Home,
});

const services = [
  { Icon: Code2, title: "Web Development", desc: "Lightning-fast, scalable web platforms built with modern frameworks." },
  { Icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform iOS & Android apps users love." },
  { Icon: Megaphone, title: "Digital Marketing", desc: "Data-driven campaigns that convert visitors into customers." },
  { Icon: Search, title: "SEO Services", desc: "Technical SEO and content strategy that ranks and stays ranked." },
];

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "8+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "5+", label: "Industries Served" },
];

const whyUs = [
  { Icon: Zap, title: "Blazing Performance", desc: "Sub-second load times and 100/100 Core Web Vitals." },
  { Icon: Shield, title: "Enterprise Security", desc: "Best-in-class security architecture out of the box." },
  { Icon: Rocket, title: "Ship 3× Faster", desc: "Battle-tested workflows that accelerate delivery." },
  { Icon: Users, title: "Senior Team", desc: "Designers and engineers with 10+ years experience." },
  { Icon: TrendingUp, title: "Growth Focused", desc: "Every decision tied to measurable business outcomes." },
  { Icon: Globe, title: "Global Reach", desc: "Built for scale across regions, languages and devices." },
];

const testimonials = [
  { quote: "They didn't just build our product — they built our growth engine. Conversions tripled in 30 days.", name: "Hariharan", role: "Manager, DrizzleDropInn" },
  { quote: "The most technically sound team we've worked with. Performance and design at world-class level.", name: "Ravi Kumar", role: "Administrator, Chennai Builders" },
  { quote: "From SEO to Website , every deliverable exceeded expectations. True partners, not vendors.", name: "Ajay Kumar", role: "Administrator, PM Constructions" },
];

const faqs = [
  { q: "What services does Xylance Technologies offer?", a: "We offer web development, mobile app development, digital marketing, and SEO services for businesses of every size." },
  { q: "How long does a typical project take?", a: "Most websites ship in 3–6 weeks; complex mobile apps and platforms typically take 8–16 weeks based on scope." },
  { q: "Do you provide ongoing support?", a: "Yes. Every engagement includes performance monitoring, security updates, and dedicated post-launch support plans." },
  { q: "Can you improve my Google ranking?", a: "Our SEO team combines technical audits, content strategy, and link building to drive measurable organic growth." },
];

const clients = ["NORTHWIND", "HELIX", "BLOOMCO", "VANTAGE", "ORBIT", "LUMEN", "PIONEER", "AXIOM"];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-6 pt-12 pb-24 sm:pt-20 sm:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium">
                <Sparkles className="h-3 w-3 text-neon-cyan" />
                Turning Ideas Into Digital Reality
              </span>
              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Innovative <span className="text-gradient">Digital Solutions</span> For Modern Businesses
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Best web development & digital marketing company building enterprise-grade
                products, growth campaigns and SEO that compound over time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-glow-purple transition-all"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass hover:bg-white/5 font-semibold transition-all"
                >
                  Explore Services
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-primary border-2 border-background" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-foreground">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-neon-cyan text-neon-cyan" />)}
                  </div>
                  <span>Trusted by 20+ teams worldwide</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-gradient shadow-glow">
                <img
                  src={heroImg}
                  alt="Futuristic 3D visualization of code, mobile apps and analytics dashboards"
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">+347%</div>
                    <div className="text-xs text-muted-foreground">avg. organic growth</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass-strong rounded-2xl p-4 shadow-glow-purple"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99/100</div>
                    <div className="text-xs text-muted-foreground">Lighthouse score</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section aria-label="Trusted by" className="container mx-auto px-6 py-12 border-y border-border">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by ambitious teams</p>
        <div className="mt-6 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="text-2xl font-display font-bold text-muted-foreground/60 tracking-widest">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="What we do"
          title={<>Built for <span className="text-gradient">growth</span> at every layer</>}
          description="From the first pixel to the last campaign, we deliver end-to-end digital products that perform."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 hover:shadow-glow transition-all hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-5">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <Link to="/services" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-16">
        <div className="glass-strong border-gradient rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="Why choose us"
          title={<>Engineering excellence, <span className="text-gradient">obsessive</span> craft</>}
          description="A senior team that treats your product like our own."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.04] transition-all"
            >
              <Icon className="h-7 w-7 text-neon-cyan" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="What clients say"
          title={<>Loved by founders & <span className="text-gradient">CTOs</span></>}
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-7"
            >
              <div className="flex gap-1 text-neon-cyan">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-24">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Frequently asked <span className="text-gradient">questions</span></>}
        />
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group glass rounded-xl p-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 font-semibold list-none">
                {f.q}
                <span className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs text-primary-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="relative overflow-hidden glass-strong border-gradient rounded-3xl p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-radial opacity-50" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to build something <span className="text-gradient">extraordinary</span>?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Get a free consultation with our senior team. We'll map a strategy tailored to your goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-semibold">
                See Our Work
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              {[ "48h response", "NDA on request"].map((x) => (
                <span key={x} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-neon-cyan" /> {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
