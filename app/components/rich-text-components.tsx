import { InlineCodeMark } from "./inline-code-mark";
import { RichTextBlockQuote } from "./rich-text-block-quote";
import { RichTextImage } from "./rich-text-image";
import { RichTextInternalLink } from "./rich-text-internal-link";
import { RichTextLink } from "./rich-text-link";

import type { PortableTextComponents } from "@portabletext/react";

export const RichTextComponents: PortableTextComponents = {
  marks: {
    link: RichTextLink,
    code: InlineCodeMark,
    post: RichTextInternalLink,
  },
  types: {
    image: RichTextImage,
    blockQuote: RichTextBlockQuote,
  },
};
