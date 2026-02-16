import Link from "next/link";
import {
  getConversionsByCategory,
  type ConversionCategory,
} from "@/lib/conversions";

const categoryLabels: Record<ConversionCategory, string> = {
  image: "Image Conversions",
  video: "Video Conversions",
  audio: "Audio Conversions",
};

export function Footer() {
  const imageConversions = getConversionsByCategory("image");
  const videoConversions = getConversionsByCategory("video");
  const audioConversions = getConversionsByCategory("audio");

  const categories = [
    { label: categoryLabels.image, conversions: imageConversions },
    { label: categoryLabels.video, conversions: videoConversions },
    { label: categoryLabels.audio, conversions: audioConversions },
  ];

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.label}>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                {category.label}
              </h3>
              <ul className="space-y-2">
                {category.conversions.map((conversion) => (
                  <li key={conversion.slug}>
                    <Link
                      href={`/convert/${conversion.slug}`}
                      className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors"
                    >
                      {conversion.fromFormat} → {conversion.toFormat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/extract-audio"
                  className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors"
                >
                  Extract Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/convert-video"
                  className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors"
                >
                  Convert Video
                </Link>
              </li>
              <li>
                <Link
                  href="/convert-audio"
                  className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors"
                >
                  Convert Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/convert-image"
                  className="text-muted-foreground text-sm hover:text-foreground hover:underline transition-colors"
                >
                  Convert Image
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-muted-foreground text-sm">
            Developed by{" "}
            <Link
              href="https://tomilola.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium"
            >
              tomilola.ng
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
