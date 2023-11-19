import { getSanityPostDocumentById } from "~/lib/sanity/index.server";
import { SessionKey, getSession } from "~/sessions";
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

  // Get the current session
  const session = await getSession(request.headers.get("Cookie"));
  // Check if preview mode is enabled
  const previewMode = !!session.get(SessionKey.Enum.previewToken);
  // Enable cache in production or if preview mode is enabled
  const enableCache = process.env.NODE_ENV === "production" && !previewMode;

  // Tip: Heavily cache the response if enabled
  const cacheControl = enableCache
    ? "public, immutable, no-transform, max-age=31536000"
    : "no-cache";

  // Respond with the PNG buffer
  return new Response(png, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "cache-control": cacheControl,
    },
  });
};
