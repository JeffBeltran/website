import { SanityImage } from "sanity-image";

import { useRootData } from "~/hooks/useRootData";

import type { z } from "zod";
import type { SanityImageSchema } from "~/utils/SanitySchemas";

export const Image = ({
  image,
  disablePreview = false,
  ...props
}: Omit<
  React.ComponentProps<typeof SanityImage>,
  "baseUrl" | "dataset" | "projectId"
> & {
  image: z.infer<typeof SanityImageSchema>;
  disablePreview?: boolean;
}) => {
  const rootData = useRootData();

  if (image.asset.altText === undefined) {
    console.error("Image missing alt text", image.asset._id);
  }

  return (
    <SanityImage
      id={image.asset._id}
      projectId={rootData.ENV.SANITY_PROJECT_ID}
      dataset={rootData.ENV.SANITY_DATASET}
      hotspot={image.hotspot}
      crop={image.crop}
      preview={disablePreview ? undefined : image.asset.metadata.lqip}
      alt={image.asset.altText ?? ""}
      {...props}
    />
  );
};
