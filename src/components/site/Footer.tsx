import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display font-bold text-lg">
                <span className="text-gradient">Xylance</span> Technologies
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Turning Ideas Into Digital Reality. Web development, mobile apps,
              SEO and digital marketing services for ambitious modern businesses.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:xylancetechnologies@gmail.com" className="hover:text-foreground">xylancetechnologies@gmail.com</a></li>
              <li><a href="tel:+917010657314" className="hover:text-foreground">+91 7010657314</a></li>
              <li><a href="tel:+918667825086" className="hover:text-foreground">+91 8667825086</a></li>
            </ul>
            <div className="mt-4 flex gap-2">
              {[
                { Icon: Twitter, label: "Twitter", href: "https://twitter.com/" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/" },
                { Icon: Mail, label: "Email", href: "mailto:zylancetechnologies@gmail.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-lg glass hover:shadow-glow transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Xylance Technologies. All rights reserved.</p>
          <p>Crafted with precision · Built for performance</p>
        </div>
      </div>
    </footer>
  );
}
