import { useMemo } from 'react';
import { GraphQLClient, RequestDocument } from 'graphql-request';
import { useBlockContext } from '../BlockProvider';

const apiVersion = '2022-07';

export const useShopifyClient = () => {
  const { store } = useBlockContext();

  const client = useMemo(
    () =>
      !store?.integrations?.shopify?.shopId ||
      !store.integrations.shopify.storefrontAccessToken
        ? null
        : new GraphQLClient(
            `https://${store.integrations.shopify.shopId}/api/${apiVersion}/graphql.json`,
            {
              fetch,
              headers: {
                'X-Shopify-Storefront-Access-Token':
                  store.integrations.shopify.storefrontAccessToken,
              },
            },
          ),
    [],
  );

  /** @todo fix types for variables */
  const request = <T = any, V = any>(
    document: RequestDocument,
    variables?: V,
  ) => {
    if (!client) {
      throw new Error('Shopify integration needs to be active');
    }

    // @ts-ignore
    return client.request<T, V>(document, variables);
  };

  return { request };
};
