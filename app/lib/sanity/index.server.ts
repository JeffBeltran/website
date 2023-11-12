import { createClient } from "@sanity/client";

import { SessionKey, getSession } from "~/sessions";
import { SanityPostDocument } from "~/utils/SanitySchemas";

import { allPostsGroq, postByIdGroq, postGroq } from "./groq/pages";

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error("SANITY_PROJECT_ID env var is not set");
}
if (!process.env.SANITY_DATASET) {
  throw new Error("SANITY_DATASET env var is not set");
}

export const sanityConfig = {
  apiVersion: "2021-03-25",
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published" as const,
};

const getSanityClient = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  const previewToken = session.get(SessionKey.Enum.previewToken);

  if (previewToken) {
    return createClient({
      ...sanityConfig,
      token: previewToken,
      perspective: "previewDrafts",
    });
  }

  return createClient(sanityConfig);
};

export const getAllSanityPostDocuments = async (request: Request) => {
  const client = await getSanityClient(request);
  const postsData = await client.fetch(allPostsGroq);

  if (postsData === null) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return SanityPostDocument.array().parse(postsData);
};

export const getSanityPostDocument = async (request: Request, slug: string) => {
  const client = await getSanityClient(request);
  const postData = await client.fetch(postGroq, {
    slug,
  });

  if (postData === null) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return SanityPostDocument.parse(postData);
};

export const getSanityPostDocumentById = async (
  request: Request,
  id: string,
) => {
  const client = await getSanityClient(request);
  const postData = await client.fetch(postByIdGroq, {
    id,
  });

  if (postData === null) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return SanityPostDocument.parse(postData);
};
