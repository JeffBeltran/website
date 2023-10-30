import { toPlainText } from "@portabletext/react";
import { Link, useLoaderData } from "@remix-run/react";

import { Layout } from "~/components/layout";
import { getAllSanityPostDocuments } from "~/lib/sanity/index.server";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Jeff Beltran: Coding by Day, Entrepreneuring by Night" },
    {
      name: "description",
      content:
        "Welcome to Jeff Beltran's personal blog. Dive into a world where coding meets entrepreneurship, and discover insightful articles that fuel your day’s work while inspiring your night’s ventures. Explore topics ranging from the latest in software development to practical business strategies, all under one roof. Join Jeff on his journey of coding by day, entrepreneuring by night, and be inspired to ignite your own path of innovation.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await getAllSanityPostDocuments(request);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="py-24 sm:py-32">
        <div className="mx-auto text-center font-mono">
          <Link to="/" className="group focus:outline-none">
            <h1 className="bg-yellow-300 py-2 text-4xl font-bold tracking-tight text-stone-900 outline outline-2 outline-transparent transition duration-200 group-hover:skew-y-1 group-hover:scale-105 group-hover:rounded-md group-focus:skew-y-1 group-focus:scale-105 group-focus:rounded-md group-focus:outline-black sm:text-6xl">
              Jeff Beltran
            </h1>
          </Link>
          <h2 className="mt-6 text-lg leading-8 text-stone-600">
            Coding by day, entrepreneuring by night.
          </h2>
        </div>
      </div>

      <ul className="space-y-4">
        {data.map((post) => (
          <li key={post._id}>
            <Link
              className="group flex flex-col gap-4 overflow-hidden bg-white px-4 py-4 shadow-md outline outline-2 outline-transparent transition duration-300 hover:scale-105 hover:rounded-md hover:outline hover:outline-yellow-300 focus:scale-105 focus:rounded-md focus:outline focus:outline-yellow-300 sm:px-6"
              to={`/posts/${post.pageMeta.slug.current}`}
            >
              <div>
                <h3 className="font-mono text-2xl font-bold">
                  {post.pageMeta.title}
                </h3>
                <p className="text-xs text-stone-400">
                  Published:{" "}
                  <time date-time={post.pageMeta.published}>
                    {post.pageMeta.published}
                  </time>
                </p>
              </div>
              <p className="line-clamp-4">
                {toPlainText(post.content).slice(0, 500)}
              </p>
              <p className="bg-stone-50 p-2 font-mono group-hover:rounded-md group-hover:bg-yellow-300">
                Read Post...
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
