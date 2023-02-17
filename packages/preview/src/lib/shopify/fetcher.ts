import { GraphQLClient } from 'graphql-request';
import { useStore } from '../../components';

export const useShopifyFetcher = <TData, TVariables>(
  query: string,
): (() => Promise<TData>) => {
  const { store } = useStore();

  const shopifyIntegration = store?.integrations?.shopify || {};

  const graphqlClient = new GraphQLClient(
    `https://${shopifyIntegration.shopId}/api/2023-01/graphql.json`,
    {
      fetch,
      headers: {
        'X-Shopify-Storefront-Access-Token':
          shopifyIntegration.storefrontAccessToken,
      },
    },
  );

  return async (variables?: TVariables) =>
    graphqlClient.request(query, variables);
};
