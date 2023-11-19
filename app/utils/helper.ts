import type { SanityRichTextLinkSchema } from "./SanitySchemas";
import type { z } from "zod";

export const buildLink = (
  richTextLink?: z.infer<typeof SanityRichTextLinkSchema>,
) => {
  if (!richTextLink) {
    return null;
  }

  // Set to hold unique rel attribute values: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
  let relAttributesSet = new Set<string>();

  // Add 'nofollow' to the set if the link should not be followed by crawlers
  if (richTextLink.noFollow) {
    relAttributesSet.add("nofollow");
  }

  // Add 'noreferrer' or 'noopener' depending on the referrer policy
  if (richTextLink.noReferrer) {
    relAttributesSet.add("noreferrer");
  } else {
    relAttributesSet.add("noopener");
  }

  // Convert the set to an array and join to form the final rel attribute string
  return {
    href: richTextLink.href,
    target: richTextLink.blank ? "_blank" : "_self",
    rel: Array.from(relAttributesSet).join(" "),
  };
};
