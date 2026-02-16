import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MediaZone } from "@/components/media-zone";
import { ConversionArticle } from "@/components/conversion-article";
import {
  getConversionBySlug,
  getToolTypeFromCategory,
  getAllSlugs,
} from "@/lib/conversions";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mediathing.app");

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all conversion pages at build time
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const conversion = getConversionBySlug(slug);

  if (!conversion) {
    return {
      title: "Conversion Not Found",
    };
  }

  return {
    title: conversion.title,
    description: conversion.description,
    keywords: conversion.keywords,
    openGraph: {
      title: conversion.title,
      description: conversion.description,
      url: `${siteUrl}/convert/${slug}`,
      siteName: "MediaThing",
      images: [
        {
          url: `${siteUrl}/convert/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Convert ${conversion.fromFormat} to ${conversion.toFormat}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: conversion.title,
      description: conversion.description,
      images: [`${siteUrl}/convert/${slug}/opengraph-image`],
    },
  };
}

export default async function ConvertPage({ params }: Props) {
  const { slug } = await params;
  const conversion = getConversionBySlug(slug);

  if (!conversion) {
    notFound();
  }

  const toolType = getToolTypeFromCategory(conversion.category);

  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          Convert {conversion.fromFormat} to {conversion.toFormat}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {conversion.description}
        </p>
      </div>
      <MediaZone tool={toolType} defaultFrom={conversion.fromFormat.toLowerCase()} defaultTo={conversion.toFormat.toLowerCase()} />
      <ConversionArticle conversion={conversion} />
    </main>
  );
}
