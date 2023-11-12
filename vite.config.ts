import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import type { ConfigEnv } from "vite";

export default ({ mode }: ConfigEnv) => {
  // Here we add env vars from .env files to process.env.
  // Note the last arg is a blank string so that all env vars
  // are loaded, not just those starting with "VITE_"
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return defineConfig({
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [
      remix({
        ignoredRouteFiles: ["**/.*"],
      }),
      tsconfigPaths(),
    ],
  });
};
