import { getShopifyClient } from './getShopifyClient';

export const useShopifyFetcher = <TData, TVariables>(
  query: string,
): (() => Promise<TData>) => {
  const { shopId, storefrontAccessToken } = integrations?.shopify || {};

  const graphqlClient = getShopifyClient(shopId!, storefrontAccessToken!);

  return async (variables?: TVariables) =>
    graphqlClient.request(query, variables);
};
