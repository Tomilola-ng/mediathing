import { ImageResponse } from "next/og";
import { getConversionBySlug } from "@/lib/conversions";

export const alt = "MediaThing - Convert Media Formats";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const conversion = getConversionBySlug(slug);

  if (!conversion) {
    // Return a default image if conversion not found
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            fontSize: 60,
            fontWeight: 600,
          }}
        >
          <div>MediaThing</div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(to bottom right, #ffffff 0%, #f9fafb 100%)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1f2937",
              letterSpacing: "-0.02em",
            }}
          >
            MediaThing
          </div>
        </div>

        {/* Main conversion text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#111827",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {conversion.fromFormat} → {conversion.toFormat}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6b7280",
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            {conversion.description}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            color: "#9ca3af",
            marginTop: 40,
          }}
        >
          Free • No Uploads • Browser-Based
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
