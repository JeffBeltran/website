import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "~/routes/resource.og";

import { buildSanityImage } from "./sanityImage.server";

import type { SanityPostDocument } from "./SanitySchemas";
import type { SatoriOptions } from "satori";
import type { z } from "zod";

// Load the font from the "public" directory
const geistMonoFont = (baseUrl: string, fontWeight: string) =>
  fetch(new URL(`${baseUrl}/fonts/mono/GeistMono-${fontWeight}.otf`)).then(
    (res) => res.arrayBuffer(),
  );

const geistSansFont = (baseUrl: string, fontWeight: string) =>
  fetch(new URL(`${baseUrl}/fonts/sans/Geist-${fontWeight}.otf`)).then((res) =>
    res.arrayBuffer(),
  );

export async function createPostOGImage(
  postData: z.infer<typeof SanityPostDocument>,
  requestUrl: string,
) {
  const image = buildSanityImage(postData.pageMeta.image)
    .width(400)
    .height(OG_IMAGE_HEIGHT)
    .url();

  const options: SatoriOptions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: "GeistMono-Bold",
        data: await geistMonoFont(requestUrl, "Bold"),
        style: "normal",
      },
      {
        name: "Geist-Black",
        data: await geistSansFont(requestUrl, "Black"),
        style: "normal",
      },
    ],
  };

  // Design the image and generate an SVG with "satori"
  const svg = await satori(
    <div
      style={{
        width: options.width,
        height: options.height,
        background: `url(${image})`,
        backgroundColor: "#fde047",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 800,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: 50,
            flexGrow: 1,
            fontFamily: "Geist-Black",
            fontSize: 65,
            backgroundColor: "#fff",
            backgroundImage:
              "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f5f5f4' fill-opacity='1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
          }}
        >
          {postData.pageMeta.title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#fde047",
            paddingRight: 50,
            paddingLeft: 50,
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: "GeistMono-Bold",
            fontSize: 30,
          }}
        >
          <p>{postData.pageMeta.published}</p>
          <p>JeffBeltran.com</p>
        </div>
      </div>
    </div>,
    options,
  );

  // Convert the SVG to PNG with "resvg"
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}
