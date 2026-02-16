import { MediaZone } from "@/components/media-zone";

export default function ConvertAudioPage() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Convert Audio</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Convert audio files between formats (MP3, WAV, FLAC, OGG, etc.).
        </p>
      </div>
      <MediaZone tool="convert-audio" />
    </main>
  );
}
