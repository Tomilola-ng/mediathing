import conversionsData from "@/data/conversions.json";

export type ConversionCategory = "image" | "video" | "audio";
export type ToolType = "convert-image" | "convert-video" | "convert-audio";

export interface Conversion {
  slug: string;
  fromFormat: string;
  toFormat: string;
  category: ConversionCategory;
  title: string;
  description: string;
  keywords: string[];
  article: string;
  benefits: string[];
  useCases: string[];
}

// Type assertion for the imported JSON data
const conversions = conversionsData as Conversion[];

/**
 * Get all conversions
 */
export function getAllConversions(): Conversion[] {
  return conversions;
}

/**
 * Get conversion by slug
 */
export function getConversionBySlug(slug: string): Conversion | undefined {
  return conversions.find((conv) => conv.slug === slug);
}

/**
 * Get conversions by category
 */
export function getConversionsByCategory(
  category: ConversionCategory
): Conversion[] {
  return conversions.filter((conv) => conv.category === category);
}

/**
 * Get all slugs for sitemap generation
 */
export function getAllSlugs(): string[] {
  return conversions.map((conv) => conv.slug);
}

/**
 * Validate conversion data structure
 */
export function validateConversion(conversion: unknown): conversion is Conversion {
  if (typeof conversion !== "object" || conversion === null) {
    return false;
  }

  const conv = conversion as Record<string, unknown>;

  return (
    typeof conv.slug === "string" &&
    typeof conv.fromFormat === "string" &&
    typeof conv.toFormat === "string" &&
    (conv.category === "image" || conv.category === "video" || conv.category === "audio") &&
    typeof conv.title === "string" &&
    typeof conv.description === "string" &&
    Array.isArray(conv.keywords) &&
    typeof conv.article === "string" &&
    Array.isArray(conv.benefits) &&
    Array.isArray(conv.useCases)
  );
}

/**
 * Get tool type from category
 */
export function getToolTypeFromCategory(category: ConversionCategory): ToolType {
  switch (category) {
    case "image":
      return "convert-image";
    case "video":
      return "convert-video";
    case "audio":
      return "convert-audio";
  }
}
