import { PortableText } from "@portabletext/react";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

import { RichTextLink } from "~/components/rich-text-link";
import { getSanityPostDocument } from "~/lib/sanity/index.server";
import { metaGenerator } from "~/utils/metaGenerator";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

const pageParamsSchema = z.object({
  postSlug: z.string(),
});

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return metaGenerator(location, data?.pageMeta);
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { postSlug } = pageParamsSchema.parse(params);

  return await getSanityPostDocument(request, postSlug);
}

export default function PostPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="py-8">
      <h1 className="mb-4 mt-8 flex items-center py-1 font-mono text-4xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="mr-3 h-8 w-8 animate-pulse fill-current"
        >
          <path d="M34.2 45.5c-3.1-3.2-3-8.2.2-11.3s8.2-3 11.3.2l208 216c3 3.1 3 8 0 11.1l-208 216c-3.1 3.2-8.1 3.3-11.3.2s-3.3-8.1-.2-11.3L236.9 256 34.2 45.5zM232 464h336c4.4 0 8 3.6 8 8s-3.6 8-8 8H232c-4.4 0-8-3.6-8-8s3.6-8 8-8z" />
        </svg>
        {data.pageMeta.title}
      </h1>
      <div className="prose mt-8">
        <PortableText
          value={data.content}
          components={{
            marks: {
              link: RichTextLink,
            },
          }}
        />
      </div>
    </div>
  );
}
