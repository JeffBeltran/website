import imageUrlBuilder from "@sanity/image-url";

import type { SanityImageSchema } from "./SanitySchemas";
import type { z } from "zod";

const imgBuilder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID ?? "",
  dataset: process.env.SANITY_DATASET ?? "",
});

// seems there is a bug in the image builder that requires you to set focalPoint
// if you want to use the hotspot
export const buildSanityImage = (image: z.infer<typeof SanityImageSchema>) => {
  if (image.hotspot) {
    return imgBuilder
      .image(image)
      .focalPoint(image.hotspot.x, image.hotspot.y)
      .fit("crop");
  }

  return imgBuilder.image(image);
};
