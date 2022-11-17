import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";
import { useApp, useStderr } from "ink";
import { config } from "~/config";

import { getSdk } from "./sdk";
import { API_URL } from "./api.constants";

export const useApiSdk = () => {
  const { exit } = useApp();
  const { write } = useStderr();

  const accessToken = config.get("accessToken");
  const organization = config.get("organization");
  const storeId = config.get("storeId");

  const sdk = useMemo(() => {
    const graphqlClient = new GraphQLClient(`${API_URL}/graphql`, {
      headers: {
        ...(accessToken ? { "x-instant-access-token": accessToken } : {}),
        ...(organization ? { "x-instant-organization": organization } : {}),
        ...(storeId ? { "x-instant-store-id": storeId } : {}),
      },
    });

    return getSdk(graphqlClient, async <T>(action: () => Promise<T>) => {
      try {
        return await action();
      } catch (err: any) {
        /** Handle FetchError's as fatal */
        if (err?.type === "system") {
          write(
            "❌ Could not connect to API, please check your internet connection or go to \nhttps://status.instantcommerce.io\n"
          );
          exit(err);
          return err;
        }

        throw err;
      }
    });
  }, [getSdk]);

  return sdk;
};
