import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MusicIcon,
  VideoIcon,
  FileAudioIcon,
  ImageIcon,
  ArrowRightIcon,
} from "lucide-react";

const tools = [
  {
    href: "/extract-audio",
    title: "Extract Audio",
    description: "Get MP3, WAV, or FLAC from video files.",
    icon: MusicIcon,
  },
  {
    href: "/convert-video",
    title: "Convert Video",
    description: "Change format: MP4, WebM, MKV, AVI, and more.",
    icon: VideoIcon,
  },
  {
    href: "/convert-audio",
    title: "Convert Audio",
    description: "Convert between MP3, WAV, FLAC, OGG, AAC.",
    icon: FileAudioIcon,
  },
  {
    href: "/convert-image",
    title: "Convert Image",
    description: "Convert PNG, JPG, WebP, GIF, and more.",
    icon: ImageIcon,
  },
] as const;

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="mx-auto max-w-2xl space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Convert media in your browser
        </h1>
        <p className="text-muted-foreground text-lg">
          Open-source FFmpeg for everyone. No uploads, no installs, no ads.
          Everything runs locally in your browser.
        </p>
        <Button asChild size="lg">
          <Link href="/extract-audio">
            Try Extract Audio
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </section>

      <section className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-muted-foreground mb-6 text-center text-sm font-medium uppercase tracking-wider">
          Tools
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <Icon className="text-muted-foreground size-8" />
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-primary text-sm font-medium hover:underline">
                      Use tool
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
