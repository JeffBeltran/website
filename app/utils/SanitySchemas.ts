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

export const SanityRichTextLinkSchema = z.object({
  _type: z.literal("link"),
  href: z.string(),
  blank: z.boolean(),
  noFollow: z.boolean(),
  noReferrer: z.boolean(),
});

export const SanityImageAssetSchema = z
  .object({
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
  })
  .passthrough();

export const SanityImageSchema = z
  .object({
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
  })
  .passthrough();

export const SanityPageMeta = z.object({
  title: z.string(),
  description: z.string(),
  image: SanityImageSchema,
  slug: SanitySlug,
  published: z.string(),
  updated: z.string().optional(),
});

export const SanityRichTextInternalPostSchema = BaseSanityObject.extend({
  _type: z.literal("post"),
  title: z.string(),
  slug: z.string(),
});

const SanityRichTextBlock = BaseSanityObject.extend({
  _type: z.literal("block"),
}).passthrough();

export const SanityRichTextImage = BaseSanityObject.extend({
  _type: z.literal("image"),
  asset: SanityImageAssetSchema,
  showTitle: z.boolean(),
}).passthrough();

export const SanityRichTextQuoteBlock = BaseSanityObject.extend({
  _type: z.literal("blockQuote"),
  quote: z.string(),
  attribution: z.string(),
  source: z
    .object({
      name: z.string(),
      url: SanityRichTextLinkSchema,
    })
    .optional(),
}).passthrough();

const SanityRichText = z.discriminatedUnion("_type", [
  SanityRichTextBlock,
  SanityRichTextImage,
  SanityRichTextQuoteBlock,
]);

export const SanityPostDocument = BaseSanityDocument.extend({
  _type: z.literal("post"),
  pageMeta: SanityPageMeta,
  content: z.array(SanityRichText),
}).passthrough();
