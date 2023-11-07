import { Image } from "./image";

import type { z } from "zod";
import type { SanityRichTextImage } from "~/utils/SanitySchemas";

export function RichTextImage({
  value,
  isInline,
}: {
  value: z.infer<typeof SanityRichTextImage>;
  isInline: boolean;
}) {
  if (isInline) {
    return <div className="bg-red-400 p-4">Inline Photo Referenced</div>;
  }

  return (
    <div className="not-prose mb-4">
      <Image className="w-full object-cover" image={value} width={1200} />

      {value.showTitle && (
        <p className="mt-1 text-sm text-stone-500">{value.asset.title}</p>
      )}
    </div>
  );
}
