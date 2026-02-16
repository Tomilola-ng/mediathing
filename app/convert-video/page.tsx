import { MediaZone } from "@/components/media-zone";

export default function ConvertVideoPage() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Convert Video</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Convert video files between formats (MP4, WebM, MKV, AVI, etc.).
        </p>
      </div>
      <MediaZone tool="convert-video" />
    </main>
  );
}
