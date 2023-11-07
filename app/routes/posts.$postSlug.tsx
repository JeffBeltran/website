import { faTerminal } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortableText } from "@portabletext/react";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

import { InlineCodeMark } from "~/components/inline-code-mark";
import { RichTextImage } from "~/components/rich-text-image";
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
        <FontAwesomeIcon
          icon={faTerminal}
          className="mr-4 text-yellow-300"
          fade
        />
        {data.pageMeta.title}
      </h1>
      <div className="prose mt-8">
        <PortableText
          value={data.content}
          components={{
            marks: {
              link: RichTextLink,
              code: InlineCodeMark,
            },
            types: {
              image: RichTextImage,
            },
          }}
        />
      </div>
    </div>
  );
}
