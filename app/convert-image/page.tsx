import { MediaZone } from "@/components/media-zone";

export default function ConvertImagePage() {
  return (
    <main className="container mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Convert Image</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Convert images between formats (PNG, JPG, WebP, GIF, etc.).
        </p>
      </div>
      <MediaZone tool="convert-image" />
    </main>
  );
}
