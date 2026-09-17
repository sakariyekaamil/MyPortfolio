import { AdminShell } from "@/components/admin/AdminShell";
import { AdminForm } from "@/components/admin/AdminToast";
import { updateAboutAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";

const defaultParagraphs = [
  `I'm ${siteConfig.name}, a Software Engineer and Full-Stack Developer based in ${siteConfig.location}. I specialize in designing and shipping modern web applications, business management systems, and APIs that solve real operational problems.`,
  "My work spans frontend interfaces, backend services, database design, authentication, and UI/UX-aware product development. I care about clean architecture, maintainable TypeScript, and systems that stay reliable as they grow.",
  "Whether it's a restaurant platform, event operations tool, or scholarship recommendation system, I approach each project with a problem-solving mindset and a focus on scalable software that teams can actually use day to day.",
];

export default async function AdminAboutPage() {
  const settings = await prisma.setting.findMany();
  const map = Object.fromEntries(settings.map((item) => [item.key, item.value]));

  return (
    <AdminShell title="About">
      <AdminForm
        action={updateAboutAction}
        successMessage="About profile saved successfully"
        className="max-w-3xl space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
      >
        <p className="text-sm text-muted">
          Edit personal profile details shown on the website About and Hero
          sections.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="siteName">Full Name</Label>
            <Input
              id="siteName"
              name="siteName"
              defaultValue={map.siteName ?? siteConfig.name}
              className="bg-surface"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Professional Title</Label>
            <Input
              id="siteTitle"
              name="siteTitle"
              defaultValue={map.siteTitle ?? siteConfig.title}
              className="bg-surface"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={map.email ?? siteConfig.email}
              className="bg-surface"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={map.location ?? siteConfig.location}
              className="bg-surface"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={map.phone ?? siteConfig.phone}
              className="bg-surface"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            defaultValue={map.brand ?? siteConfig.brand}
            className="bg-surface"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutSubtitle">About Section Subtitle</Label>
          <Input
            id="aboutSubtitle"
            name="aboutSubtitle"
            defaultValue={
              map.aboutSubtitle ??
              "A software engineer focused on building practical, scalable products."
            }
            className="bg-surface"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroDescription">Hero Description</Label>
          <Textarea
            id="heroDescription"
            name="heroDescription"
            rows={3}
            defaultValue={map.heroDescription ?? siteConfig.heroDescription}
            className="bg-surface"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortIntro">Short Intro</Label>
          <Textarea
            id="shortIntro"
            name="shortIntro"
            rows={3}
            defaultValue={map.shortIntro ?? siteConfig.shortIntro}
            className="bg-surface"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutParagraph1">About Paragraph 1</Label>
          <Textarea
            id="aboutParagraph1"
            name="aboutParagraph1"
            rows={4}
            defaultValue={map.aboutParagraph1 ?? defaultParagraphs[0]}
            className="bg-surface"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutParagraph2">About Paragraph 2</Label>
          <Textarea
            id="aboutParagraph2"
            name="aboutParagraph2"
            rows={4}
            defaultValue={map.aboutParagraph2 ?? defaultParagraphs[1]}
            className="bg-surface"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aboutParagraph3">About Paragraph 3</Label>
          <Textarea
            id="aboutParagraph3"
            name="aboutParagraph3"
            rows={4}
            defaultValue={map.aboutParagraph3 ?? defaultParagraphs[2]}
            className="bg-surface"
          />
        </div>

        <Button type="submit">Save About</Button>
      </AdminForm>
    </AdminShell>
  );
}
