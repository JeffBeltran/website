import { useMatches } from "@remix-run/react";

import type { RootData } from "app/root";

export const useRootData = () => {
  const matches = useMatches();
  const LoaderData = (matches.find((route) => {
    return route.id === "root";
  })?.data || {}) as RootData;

  return LoaderData;
};
