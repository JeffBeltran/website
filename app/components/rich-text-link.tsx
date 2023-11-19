import { buildLink } from "~/utils/helper";

import type { z } from "zod";
import type { SanityRichTextLinkSchema } from "~/utils/SanitySchemas";

export function RichTextLink({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: z.infer<typeof SanityRichTextLinkSchema>;
}) {
  const link = buildLink(value);

  if (!link) {
    return null;
  }

  return (
    <a
      href={link.href}
      className="inline-block bg-yellow-300 px-1 py-0.5 no-underline transition duration-200 after:content-['_↗'] hover:-skew-y-1 hover:bg-yellow-400"
      target={link.target}
      rel={link.rel}
    >
      {children}
    </a>
  );
}
