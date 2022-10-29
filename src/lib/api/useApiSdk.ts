import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";
import { config } from "~/config";
import { getSdk } from "./sdk";
import { API_URL } from "./api.constants";

export const useApiSdk = () => {
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

    return getSdk(graphqlClient);
  }, [getSdk]);

  return sdk;
};
