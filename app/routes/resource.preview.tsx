import { json, redirect } from "@remix-run/node";

import {
  SessionKey,
  commitSession,
  destroySession,
  getSession,
} from "~/sessions";

import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set(SessionKey.Enum.previewToken, process.env.SANITY_PREVIEW_TOKEN);

  return redirect(`/`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
