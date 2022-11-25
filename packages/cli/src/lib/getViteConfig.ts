import { InlineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import instantSdk from "vite-plugin-instant-sdk";
import { dirname } from "~/config";

export const getViteConfig = async (
  mode = "development",
  overrides?: Partial<InlineConfig>,
  blockIdsMap?: Record<string, Record<"id", string>>
) => {
  return mergeConfig(
    {
      configFile: `${dirname}/vite.config.ts`,
      root: dirname,
      plugins: [
        react({
          fastRefresh: false,
          /** @todo investigate */
          jsxRuntime: mode === "development" ? "automatic" : "classic",
        }),
        instantSdk({
          blockIdsMap,
        }) as any,
      ],
    } as InlineConfig,
    overrides || {}
  );
};
