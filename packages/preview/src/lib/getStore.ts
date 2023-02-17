import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(
  `${
    import.meta.env.VITE_API_URL || 'https://api.instantcommerce.app'
  }/graphql`,
  {
    fetch,
    headers: {
      'x-instant-client': 'Storefront',
    },
  },
);

const PublicStoreFragmentFragmentDoc = gql`
  fragment PublicStoreFragment on PublicStore {
    id
    name
    slug
    assets {
      ...AssetFragment
    }
    integrations {
      shopify {
        shopId
        storefrontAccessToken
      }
      storyblok {
        publicKey
      }
    }
    languages {
      isDefault
      locale
      localizedName
    }
    organization {
      slug
    }
    primaryDomain {
      url
    }
    snippets {
      id
      isPrioritized
      bypassCookieIntegration
      type
      url
    }
    storefront {
      config {
        theme {
          colors {
            grayscale {
              ...ColorShadesFragment
            }
            primary {
              ...ColorShadesFragment
            }
            text
          }
          typography {
            display {
              font
              transform
            }
            heading {
              font
              transform
            }
            paragraph {
              font
              transform
            }
          }
        }
      }
    }
  }

  fragment ColorShadesFragment on ColorShadesField {
    s50
    s100
    s200
    s300
    s400
    s500
    s600
    s700
    s800
    s900
  }

  fragment AssetFragment on PublicAsset {
    id
    mimeType
    name
    type
    url
  }
`;

const previewQuery = gql`
  query previewStoreByHostname($hostname: String!) {
    previewStoreByHostname(hostname: $hostname) {
      ...PublicStoreFragment
    }
  }
  ${PublicStoreFragmentFragmentDoc}
`;

const publicQuery = gql`
  query publicStoreByHostname($hostname: String!) {
    publicStoreByHostname(hostname: $hostname) {
      ...PublicStoreFragment
    }
  }
  ${PublicStoreFragmentFragmentDoc}
`;

export const getStore = async (url: URL) => {
  const storeHostname = url.hostname;
  const isPreview = storeHostname?.startsWith('preview-');

  const store = await client.request(isPreview ? previewQuery : publicQuery, {
    hostname: storeHostname,
  });

  return isPreview ? store.previewStoreByHostname : store.publicStoreByHostname;
};
