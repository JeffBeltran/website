import { faTerminal } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortableText } from "@portabletext/react";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

import { RichTextComponents } from "~/components/rich-text-components";
import { getSanityPostDocument } from "~/lib/sanity/index.server";
import { metaGenerator } from "~/utils/metaGenerator";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

const pageParamsSchema = z.object({
  postSlug: z.string(),
});

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // data is undefined when an error boundary is triggered
  return data?.metaData ?? [];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { postSlug } = pageParamsSchema.parse(params);

  const pageData = await getSanityPostDocument(request, postSlug);

  return {
    data: pageData,
    metaData: metaGenerator(request, pageData),
  };
}

export default function PostPage() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="py-8">
      <h1 className="flex-inline mb-4 mt-8 items-center py-1 font-mono text-4xl font-bold">
        <FontAwesomeIcon
          icon={faTerminal}
          className="mr-2 [--fa-primary-color:#fde047]"
          fade
          size="sm"
        />
        {data.pageMeta.title}
      </h1>
      <div className="prose mt-8 ">
        <PortableText value={data.content} components={RichTextComponents} />
      </div>
    </div>
  );
}
