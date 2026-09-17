import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { footerLinks, socialLinks } from "@/data/site";
import type { SiteContent } from "@/lib/content";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="border-t border-border bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <h2 className="text-lg font-semibold text-foreground">
              {site.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{site.title}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            {socialLinks.map((link) => {
              const Icon =
                link.icon === "github"
                  ? GithubIcon
                  : link.icon === "linkedin"
                    ? LinkedinIcon
                    : link.icon === "whatsapp"
                      ? MessageCircle
                      : Mail;
              return (
                <a
                  key={link.label}
                  href={
                    link.icon === "email" ? `mailto:${site.email}` : link.href
                  }
                  target={link.icon === "email" ? undefined : "_blank"}
                  rel={
                    link.icon === "email" ? undefined : "noopener noreferrer"
                  }
                  aria-label={link.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted">
            © 2026 {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
