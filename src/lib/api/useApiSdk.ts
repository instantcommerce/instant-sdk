import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";

import { getSdk } from "./sdk";
import { config } from "~/config";

export const useApiSdk = () => {
  const accessToken = config.get("accessToken");
  const organization = config.get("organization");
  const storeId = config.get("storeId");

  const sdk = useMemo(() => {
    const graphqlClient = new GraphQLClient(`${process.env["API_URL"]}/graphql`, {
      headers: {
        ...(accessToken ? { "x-instant-access-token": accessToken } : {}),
        ...(organization ? { "x-instant-organization": organization } : {}),
        ...(storeId ? { "x-instant-store-id": storeId } : {}),
      },
    });

    return getSdk(graphqlClient);
  }, [getSdk]);

  return sdk;
};
