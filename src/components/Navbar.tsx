"use client";

import { useEffect, useState } from "react";
import { Menu, X, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, socialLinks } from "@/data/site";
import type { SiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const menuItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 + index * 0.04,
      duration: 0.3,
      ease: easeOut,
    },
  }),
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

export function Navbar({ site }: { site: SiteContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [mounted, setMounted] = useState(false);

  const github = socialLinks.find((link) => link.icon === "github");
  const linkedin = socialLinks.find((link) => link.icon === "linkedin");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) {
          setActive(`#${id}`);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    setActive(href);
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-4 sm:pt-5">
        <motion.div
          initial={{ opacity: 0, y: -28, scale: 0.96 }}
          animate={{
            opacity: mounted ? 1 : 0,
            y: mounted ? 0 : -28,
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{
            opacity: { duration: 0.55, ease: easeOut },
            y: { duration: 0.55, ease: easeOut },
            scale: { type: "spring", stiffness: 280, damping: 26 },
          }}
          className="pointer-events-auto relative mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-white/80 bg-white px-3 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.22)] sm:px-4"
          style={{ transformOrigin: "top center" }}
        >
          <motion.a
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: easeOut }}
            href="#home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex shrink-0 items-center gap-2.5 pl-1"
            aria-label={`${site.brand} home`}
          >
            <motion.span
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-black"
            >
              
            </motion.span>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900 sm:text-base">
              My<span className="text-primary">Portfolio</span>
            </span>
          </motion.a>

          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4, ease: easeOut }}
            className="hidden lg:flex flex-1 items-center justify-center px-2"
          >
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {navLinks.map((link, index) => {
                const isActive = active === link.href;
                return (
                  <motion.li
                    key={link.href}
                    className="relative"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.28 + index * 0.04,
                      duration: 0.35,
                      ease: easeOut,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => handleNav(link.href)}
                      className={cn(
                        "relative z-10 block rounded-full px-3 py-2 text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap",
                        isActive
                          ? "text-primary-dark"
                          : "text-zinc-600 hover:text-zinc-950"
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      ) : null}
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: easeOut }}
            className="flex shrink-0 items-center gap-2"
          >
            {github ? (
              <motion.a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white"
              >
                <GithubIcon className="h-4 w-4" />
              </motion.a>
            ) : null}

            {linkedin ? (
              <motion.a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-900"
              >
                <LinkedinIcon className="h-4 w-4" />
              </motion.a>
            ) : null}

            <motion.div
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
            >
              <ThemeToggle variant="navbar" />
            </motion.div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-900 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {open ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="/admin/login"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              className="hidden lg:inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-black hover:shadow-[0_8px_24px_rgba(34,197,94,0.35)]"
            >
              Sign in
            </motion.a>
          </motion.div>

          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                transition={{ duration: 0.28, ease: easeOut }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[28px] border border-white/80 bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)] lg:hidden"
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <a
                        href={link.href}
                        onClick={() => handleNav(link.href)}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors",
                          active === link.href
                            ? "bg-primary/15 text-primary-dark"
                            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  className="mt-2 border-t border-zinc-100 pt-3"
                >
                  <a
                    href="/admin/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary/90"
                  >
                    <Mail className="h-4 w-4" />
                    Sign in
                  </a>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}
