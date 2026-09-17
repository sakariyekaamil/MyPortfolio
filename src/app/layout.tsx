import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { AppToaster } from "@/components/admin/AdminToast";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem("portfolio-theme");
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {}
})();
`;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title = `${site.name} | ${site.title}`;
  const description =
    site.shortIntro ||
    `Portfolio of ${site.name}, a Software Engineer and Full-Stack Developer building modern web applications, business systems, and scalable digital solutions.`;

  return {
    title,
    description,
    keywords: [
      "Software Engineer",
      "Full-Stack Developer",
      "Next.js",
      "TypeScript",
      site.location,
      site.name,
      site.brand,
    ],
    authors: [{ name: site.name }],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full flex flex-col text-foreground font-sans">
        <ThemeProvider>
          {children}
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
