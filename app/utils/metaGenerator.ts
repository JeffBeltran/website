import imageUrlBuilder from "@sanity/image-url";
import { DateTime } from "luxon";

import type { SanityPageMeta } from "./SanitySchemas";
import type { Location } from "@remix-run/react";
import type { z } from "zod";

export const metaGenerator = (
  location: Location,
  pageMeta?: z.infer<typeof SanityPageMeta>,
) => {
  // data is undefined when an error boundary is triggered
  if (!pageMeta) {
    return [];
  }

  const publishedAt = DateTime.fromISO(pageMeta.published).toISODate();
  const updatedAt = pageMeta.updated
    ? DateTime.fromISO(pageMeta.updated).toISODate()
    : publishedAt;

  const imgBuilder =
    typeof window !== "undefined"
      ? imageUrlBuilder({
          projectId: window.ENV.SANITY_PROJECT_ID,
          dataset: window.ENV.SANITY_DATASET,
        })
      : imageUrlBuilder({
          projectId: process.env.SANITY_PROJECT_ID ?? "",
          dataset: process.env.SANITY_DATASET ?? "",
        });

  const imageWidth = 800;
  const image = imgBuilder.image(pageMeta.image).width(imageWidth).url();
  const imageHeight = Math.round(
    800 / pageMeta.image.asset.metadata.dimensions.aspectRatio,
  );

  const absoluteUrl = `https://www.jeffbeltran.com${location.pathname}`;

  // Initial attempt at meta tags: https://moz.com/blog/meta-data-templates-123
  return [
    // Standard Meta
    { title: pageMeta.title },
    { name: "description", content: pageMeta.description },
    {
      tagName: "link",
      rel: "canonical",
      href: absoluteUrl,
    },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageMeta.title },
    { name: "twitter:description", content: pageMeta.description },
    {
      name: "twitter:image",
      content: image,
    },
    { name: "twitter:image:alt", content: pageMeta.image.asset.altText },
    { name: "twitter:creator", content: "@whereisjefe" },

    // Open Graph
    {
      property: "og:url",
      content: absoluteUrl,
    },
    { property: "og:site_name", content: "Jeff Beltran" },
    { property: "og:title", content: pageMeta.title },
    { property: "og:description", content: pageMeta.description },
    {
      property: "og:image",
      content: image,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": absoluteUrl,
        },
        headline: pageMeta.title,
        description: pageMeta.description,
        image: {
          "@type": "ImageObject",
          url: image,
          height: imageHeight,
          width: imageWidth,
        },
        author: {
          "@type": "Person",
          name: "Jeff Beltran",
          sameAs: ["https://twitter.com/whereisjefe"],
        },
        publisher: {
          "@type": "Organization",
          name: "Jeff Beltran's Blog",
          url: "https://www.jeffbeltran.com",
        },
        datePublished: publishedAt,
        dateModified: updatedAt,
        url: absoluteUrl,
      },
    },
  ];
};
