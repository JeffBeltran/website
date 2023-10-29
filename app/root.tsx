import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { z } from "zod";

import stylesheet from "~/tailwind.css";

import { PreviewModeBubble } from "./components/preview-mode-bubble";
import { commitSession, getSession, SessionKey } from "./sessions";

import type {
  LoaderFunctionArgs,
  LinksFunction,
  SerializeFrom,
} from "@remix-run/node";

const ENV_SCHEMA = z.object({
  SANITY_PROJECT_ID: z.string(),
  SANITY_DATASET: z.string(),
});
declare global {
  interface Window {
    ENV: z.infer<typeof ENV_SCHEMA>;
  }
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const ENV = ENV_SCHEMA.parse({
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
  });

  const url = new URL(request.url);
  const query = url.searchParams.get("preview");
  const previewRequested = query !== null;

  const session = await getSession(request.headers.get("Cookie"));

  // if preview request we want to first get the current request url,
  // then redirect to the same url without the preview query param
  if (previewRequested) {
    session.set(SessionKey.Enum.previewToken, process.env.SANITY_PREVIEW_TOKEN);

    const redirectUrl = new URL(request.url);

    redirectUrl.searchParams.delete("preview");

    // now get the relative url without the preview query param
    const redirectUrlString = redirectUrl.pathname + redirectUrl.search;

    return redirect(redirectUrlString, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({
    ENV,
    previewMode: !!session.get(SessionKey.Enum.previewToken),
  });
}

export type RootData = SerializeFrom<typeof loader>;

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <PreviewModeBubble />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
