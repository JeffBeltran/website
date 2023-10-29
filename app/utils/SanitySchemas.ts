import { z } from "zod";

const BaseSanityObject = z.object({
  _key: z.string(),
  _type: z.string(),
});

const BaseSanityDocument = BaseSanityObject.extend({
  _key: z.string().optional(),
  _id: z.string(),
  _rev: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export const SanitySlug = z.object({
  _type: z.literal("slug"),
  current: z.string(),
});

export const SanityImageAssetSchema = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  altText: z.string().nullable(),
  description: z.string().nullable(),
  metadata: z.object({
    lqip: z.string(),
    dimensions: z.object({
      aspectRatio: z.number(),
      height: z.number(),
      width: z.number(),
    }),
  }),
});

export const SanityImageSchema = z.object({
  _type: z.literal("image"),
  asset: SanityImageAssetSchema,
  crop: z
    .object({
      bottom: z.number(),
      left: z.number(),
      right: z.number(),
      top: z.number(),
    })
    .optional(),
  hotspot: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .optional(),
});

export const SanityPageMeta = z.object({
  title: z.string(),
  description: z.string(),
  image: SanityImageSchema,
  slug: SanitySlug,
  published: z.string(),
  updated: z.string().optional(),
});

const SanityRichTextBlock = BaseSanityObject.extend({
  _type: z.literal("block"),
}).passthrough();

export const SanityRichTextLinkSchema = BaseSanityObject.extend({
  _type: z.literal("link"),
  href: z.string(),
  blank: z.boolean(),
  noFollow: z.boolean(),
  noReferrer: z.boolean(),
});

export const SanityPostDocument = BaseSanityDocument.extend({
  _type: z.literal("post"),
  pageMeta: SanityPageMeta,
  content: z.array(SanityRichTextBlock),
}).passthrough();
