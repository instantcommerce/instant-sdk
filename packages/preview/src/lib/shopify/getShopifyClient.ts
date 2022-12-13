import { GraphQLClient } from 'graphql-request';

export const getShopifyClient = (
  shopId: string,
  storefrontAccessToken: string,
) => {
  const graphqlClient = new GraphQLClient(
    `https://${shopId}/api/2022-07/graphql.json`,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      fetch,
    },
  );

  return graphqlClient;
};
