import type { z } from "zod";
import type { SanityRichTextLinkSchema } from "~/utils/SanitySchemas";

/* eslint-disable react/jsx-no-target-blank */

export function RichTextLink({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: z.infer<typeof SanityRichTextLinkSchema>;
}) {
  if (!value) {
    return null;
  }

  const referrerPolicy = value.noReferrer ? "noreferrer" : "noopener";

  const rel = value.noFollow ? `nofollow ${referrerPolicy}` : referrerPolicy;

  return (
    <a
      href={value.href}
      className="inline-block bg-yellow-300 px-1 py-0.5 no-underline transition duration-200 after:content-['_↗'] hover:-skew-y-1 hover:bg-yellow-400"
      target={value.blank ? "_blank" : "_self"}
      rel={rel}
    >
      {children}
    </a>
  );
}
