import { MediaZone } from "@/components/media-zone";

export default function ExtractAudioPage() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Extract Audio</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Extract the audio track from video files. Choose your output format
          (MP3, WAV, FLAC, etc.).
        </p>
      </div>
      <MediaZone tool="extract-audio" />
    </main>
  );
}
