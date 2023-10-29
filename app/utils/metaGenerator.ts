import imageUrlBuilder from "@sanity/image-url";

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

  const pathName = location.pathname;

  // Initial attempt at meta tags: https://moz.com/blog/meta-data-templates-123
  return [
    // Standard Meta
    { title: pageMeta.title },
    { name: "description", content: pageMeta.description },
    {
      tagName: "link",
      rel: "canonical",
      href: `https://www.jeffbeltran.com${pathName}`,
    },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageMeta.title },
    { name: "twitter:description", content: pageMeta.description },
    {
      name: "twitter:image",
      content: imgBuilder.image(pageMeta.image).width(1200).url(),
    },
    { name: "twitter:image:alt", content: pageMeta.image.asset.altText },
    { name: "twitter:creator", content: "@whereisjefe" },

    // Open Graph
    {
      property: "og:url",
      content: `https://www.jeffbeltran.com${pathName}`,
    },
    { property: "og:site_name", content: "Jeff Beltran" },
    { property: "og:title", content: pageMeta.title },
    { property: "og:description", content: pageMeta.description },
    {
      property: "og:image",
      content: imgBuilder.image(pageMeta.image).width(1200).url(),
    },
  ];
};
