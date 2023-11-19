import { Link } from "@remix-run/react";

import type { z } from "zod";
import type { SanityRichTextInternalPostSchema } from "~/utils/SanitySchemas";

export function RichTextInternalLink({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: z.infer<typeof SanityRichTextInternalPostSchema>;
}) {
  return (
    <Link
      to={value.slug}
      title={value.title}
      className="decoration-stone-400 decoration-wavy hover:underline hover:decoration-yellow-300 hover:decoration-2"
    >
      {children}
    </Link>
  );
}
