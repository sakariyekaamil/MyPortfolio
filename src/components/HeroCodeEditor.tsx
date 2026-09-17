"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Token = { text: string; className?: string };

function buildTokens(codeName: string, role: string): Token[] {
  const str = (value: string): Token => ({
    text: `"${value}"`,
    className: "text-emerald-400",
  });

  return [
    { text: "const", className: "text-sky-400" },
    { text: " " },
    { text: "developer", className: "text-foreground" },
    { text: " = {" },
    { text: "\n  " },
    { text: "name", className: "text-muted" },
    { text: ": " },
    str(codeName),
    { text: "," },
    { text: "\n  " },
    { text: "role", className: "text-muted" },
    { text: ": " },
    str(role),
    { text: "," },
    { text: "\n  " },
    { text: "focus", className: "text-muted" },
    { text: ": [" },
    { text: "\n    " },
    str("Business Systems"),
    { text: "," },
    { text: "\n    " },
    str("APIs"),
    { text: "," },
    { text: "\n    " },
    str("Scalable Web Apps"),
    { text: "," },
    { text: "\n  " },
    { text: "]," },
    { text: "\n  " },
    { text: "stack", className: "text-muted" },
    { text: ": [" },
    { text: "\n    " },
    str("Next.js"),
    { text: ", " },
    str("TypeScript"),
    { text: "," },
    { text: "\n    " },
    str("Node.js"),
    { text: ", " },
    str("PostgreSQL"),
    { text: "," },
    { text: "\n  " },
    { text: "]," },
    { text: "\n  " },
    { text: "available", className: "text-muted" },
    { text: ": " },
    { text: "true", className: "text-emerald-400" },
    { text: "," },
    { text: "\n" },
    { text: "};" },
  ];
}

type CharCell = { char: string; className?: string };

function flattenTokens(tokens: Token[]): CharCell[] {
  const cells: CharCell[] = [];
  for (const token of tokens) {
    for (const char of token.text) {
      cells.push({ char, className: token.className });
    }
  }
  return cells;
}

export function HeroCodeEditor({
  fileName,
  codeName,
  role,
  location,
}: {
  fileName: string;
  codeName: string;
  role: string;
  location: string;
}) {
  const cells = useMemo(
    () => flattenTokens(buildTokens(codeName, role)),
    [codeName, role]
  );
  const total = cells.length;
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) {
        setVisible(total);
        setDone(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [total]);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });

    const run = async () => {
      await wait(350);
      while (!cancelled) {
        setDone(false);
        for (let index = 0; index < total; index += 1) {
          if (cancelled) return;
          setVisible(index + 1);
          const char = cells[index]?.char ?? "";
          const delay =
            char === "\n" ? 90 : char === " " ? 28 : 16 + Math.random() * 22;
          await wait(delay);
        }
        if (cancelled) return;
        setDone(true);
        await wait(2800);
        if (cancelled) return;
        setDone(false);
        setVisible(0);
        await wait(450);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [cells, total, reduceMotion]);

  const shown = cells.slice(0, visible);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-4 hidden rounded-3xl bg-primary/10 blur-3xl sm:block" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border/80 px-4 py-3 sm:px-5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-primary/80" />
          <span className="ml-3 truncate font-mono text-xs text-muted">
            {fileName}
          </span>
        </div>

        <pre className="min-h-[240px] overflow-x-auto px-4 py-4 font-mono text-[11px] leading-5 text-muted sm:min-h-[280px] sm:px-5 sm:text-[13px] sm:leading-6">
          <code>
            {shown.map((cell, i) => (
              <span key={i} className={cell.className}>
                {cell.char}
              </span>
            ))}
            <span
              className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-primary align-baseline"
              style={{
                animation: done
                  ? "hero-caret 1s steps(1) infinite"
                  : "hero-caret 0.55s steps(1) infinite",
              }}
              aria-hidden
            />
          </code>
        </pre>

        <div className="grid grid-cols-2 gap-2 border-t border-border/80 p-3 sm:gap-3 sm:p-4">
          <div className="rounded-xl border border-border bg-surface p-2.5 sm:p-3">
            <p className="text-[11px] text-muted sm:text-xs">Status</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              Open to work
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-2.5 sm:p-3">
            <p className="text-[11px] text-muted sm:text-xs">Based in</p>
            <p className="mt-1 truncate text-xs font-medium text-foreground sm:text-sm">
              {location}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: done || reduceMotion ? 1 : 0.35, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-2 top-14 hidden rounded-xl border border-border bg-card/95 px-3 py-2 text-xs text-muted shadow-lg backdrop-blur-sm sm:block md:-left-3 md:top-16"
      >
        Next.js · Prisma
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: done || reduceMotion ? 1 : 0.35, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 0.1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-1 bottom-20 hidden rounded-xl border border-border bg-card/95 px-3 py-2 text-xs text-muted shadow-lg backdrop-blur-sm sm:block md:-right-2 md:bottom-24"
      >
        REST APIs · Auth
      </motion.div>
    </div>
  );
}
