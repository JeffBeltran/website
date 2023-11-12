import { getSanityPostDocumentById } from "~/lib/sanity/index.server";
import { createPostOGImage } from "~/utils/createOGImage.server";

import type { LoaderFunctionArgs } from "@remix-run/node";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { origin, searchParams } = new URL(request.url);
  const postId = searchParams.get("post");

  if (!postId) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const data = await getSanityPostDocumentById(request, postId);

  const png = await createPostOGImage(data, origin);

  // Respond with the PNG buffer
  return new Response(png, {
    status: 200,
    headers: {
      // Tell the browser the response is an image
      "Content-Type": "image/png",
      // Tip: You might want to heavily cache the response in production
      // 'cache-control': 'public, immutable, no-transform, max-age=31536000',
    },
  });
};
