import { DateTime } from "luxon";

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "~/routes/resource.og";

import type { SanityPostDocument } from "./SanitySchemas";
import type { z } from "zod";

export const metaGenerator = (
  request: Request,
  document: z.infer<typeof SanityPostDocument>,
) => {
  const { origin } = new URL(request.url);

  const publishedAt = DateTime.fromISO(document.pageMeta.published).toISODate();
  const updatedAt = document.pageMeta.updated
    ? DateTime.fromISO(document.pageMeta.updated).toISODate()
    : publishedAt;

  const absoluteUrl = `${origin}/posts/${document.pageMeta.slug.current}`;

  const image = `${origin}/resource/og?post=${document._id}`;

  // Initial attempt at meta tags: https://moz.com/blog/meta-data-templates-123
  return [
    // Standard Meta
    { title: document.pageMeta.title },
    { name: "description", content: document.pageMeta.description },
    {
      tagName: "link",
      rel: "canonical",
      href: absoluteUrl,
    },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: document.pageMeta.title },
    { name: "twitter:description", content: document.pageMeta.description },
    {
      name: "twitter:image",
      content: image,
    },
    {
      name: "twitter:image:alt",
      content: document.pageMeta.image.asset.altText,
    },
    { name: "twitter:creator", content: "@whereisjefe" },

    // Open Graph
    {
      property: "og:url",
      content: absoluteUrl,
    },
    { property: "og:site_name", content: "Jeff Beltran" },
    { property: "og:title", content: document.pageMeta.title },
    { property: "og:description", content: document.pageMeta.description },
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
        headline: document.pageMeta.title,
        description: document.pageMeta.description,
        image: {
          "@type": "ImageObject",
          url: image,
          height: OG_IMAGE_HEIGHT,
          width: OG_IMAGE_WIDTH,
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
