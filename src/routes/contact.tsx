import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/site/Section";
import { Spinner } from "@/components/ui/spinner";
import {
  submitContactForm,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/web3forms";
import { cn } from "@/lib/utils";
import { breadcrumbSchema, buildPageHead, getPageSeo } from "@/lib/seo";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Xylance Technologies",
  url: "/contact",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Xylance Technologies",
  email: "xylancetechnologies@gmail.com",
  telephone: "+917010657314",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Remote",
    addressLocality: "Remote",
    addressRegion: "Remote",
    postalCode: "Remote",
    addressCountry: "Remote",
  },
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  service: "Web Development",
  message: "",
};

export const Route = createFileRoute("/contact")({
  head: () =>
    buildPageHead({
      seo: getPageSeo("contact"),
      schemas: [
        contactSchema,
        localBusinessSchema,
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  component: Contact,
});

const contacts = [
  {
    Icon: Mail,
    label: "Email",
    value: "xylancetechnologies@gmail.com",
    href: "mailto:xylancetechnologies@gmail.com",
  },
  { Icon: Phone, label: "Phone", value: "+91 7010657314", href: "tel:+917010657314" },
  { Icon: Phone, label: "Phone", value: "+91 8667825086", href: "tel:+918667825086" },
  { Icon: MapPin, label: "Office", value: "Remote", href: "#" },
];

const serviceOptions = [
  "Web Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO Services",
  "UI/UX Design",
  "Automation",
] as const;

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (key: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [key]: event.target.value }));
      if (fieldErrors[key]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const errors = validateContactForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error(Object.values(errors)[0] ?? "Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      await submitContactForm(formData);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send your message right now. Please try again later.";
      toast.error(message);
      console.error("Contact form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (hasError: boolean) =>
    cn(
      "mt-1 w-full px-4 py-3 rounded-xl glass bg-transparent outline-none focus:shadow-glow transition-all disabled:opacity-60",
      hasError && "ring-2 ring-destructive/50",
    );

  return (
    <>
      <section className="container mx-auto px-6 pt-8 pb-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium">
            Contact
          </span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            Contact Our <span className="text-gradient">Remote Solutions Team</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Reach out by email or phone anytime. We work remotely and provide full digital services
            across locations.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 glass-strong border-gradient rounded-3xl p-6 md:p-10 space-y-5"
          >
            <h2 className="text-2xl font-bold">Send us a message</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={inputClassName(!!fieldErrors.name)}
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-1 text-xs text-destructive" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClassName(!!fieldErrors.email)}
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-xs text-destructive" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
                  Phone <span className="text-destructive">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={inputClassName(!!fieldErrors.phone)}
                  placeholder="+91 7010657314"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                />
                {fieldErrors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-destructive" role="alert">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="service" className="text-xs font-medium text-muted-foreground">
                  Service required <span className="text-destructive">*</span>
                </label>
                <select
                  id="service"
                  className={inputClassName(!!fieldErrors.service)}
                  value={formData.service}
                  onChange={handleChange("service")}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.service}
                  aria-describedby={fieldErrors.service ? "service-error" : undefined}
                >
                  {serviceOptions.map((option) => (
                    <option key={option} className="bg-background" value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {fieldErrors.service && (
                  <p id="service-error" className="mt-1 text-xs text-destructive" role="alert">
                    {fieldErrors.service}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                className={cn(inputClassName(!!fieldErrors.message), "resize-none")}
                placeholder="Tell us about your project, goals and timeline…"
                value={formData.message}
                onChange={handleChange("message")}
                disabled={isSubmitting}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
              />
              {fieldErrors.message && (
                <p id="message-error" className="mt-1 text-xs text-destructive" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-glow-purple transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>

          <div className="lg:col-span-2 space-y-4">
            {contacts.map(({ Icon, label, value, href }) => (
              <a
                key={`${label}-${value}`}
                href={href}
                className="block glass rounded-2xl p-5 hover:shadow-glow transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="font-semibold">{value}</div>
                  </div>
                </div>
              </a>
            ))}
            <a
              href="https://wa.me/917010657314"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-5 bg-gradient-primary shadow-glow hover:shadow-glow-purple transition-all"
            >
              <div className="flex items-center gap-4 text-primary-foreground">
                <MessageCircle className="h-6 w-6" />
                <div>
                  <div className="text-xs opacity-80">Instant chat</div>
                  <div className="font-semibold">Message us on WhatsApp</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
