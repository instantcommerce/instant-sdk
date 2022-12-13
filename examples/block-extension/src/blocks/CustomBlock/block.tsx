import { HTMLProps, ReactNode, useCallback, useEffect, useState } from 'react';
import {
  gql,
  useBlockState,
  useEventListener,
  useRequestData,
  useShopifyClient,
  useTheme,
  useToast,
} from 'instant-client/src';

const Box = ({
  children,
  ...props
}: { children?: ReactNode } & HTMLProps<HTMLDivElement>) => {
  return <div {...props}>{children}</div>;
};

interface ProductsConnection {
  edges: {
    node: {
      id: string;
      title: string;
    };
  }[];
}

interface Products {
  products: ProductsConnection;
}

export const CustomBlock = () => {
  const { content, customizer } = useBlockState();
  const { colors } = useTheme();
  const shopifyClient = useShopifyClient();
  const toast = useToast();
  const request = useRequestData();

  const [products, setProducts] = useState<ProductsConnection>();

  // const onAddToCart = useCallback((ev: any) => {
  //   console.log(ev);
  // }, []);

  // useEventListener('addToCart', onAddToCart, {
  //   preventDefault: true,
  // });

  // const loadProducts = async () => {
  //   try {
  //     const result = await shopifyClient.request<Products>(gql`
  //       query products {
  //         products(first: 10) {
  //           edges {
  //             node {
  //               id
  //               title
  //             }
  //           }
  //         }
  //       }
  //     `);

  //     setProducts(result.products);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   loadProducts();

  //   toast.create({ message: 'Test' });
  // }, []);

  // if (!products) {
  //   return <></>;
  // }

  console.log(content, 'cont');

  return (
    <Box className="shadow-lg text-orange-600">
      Title: <b style={{ color: colors.primary.s700 }}>{content.title}</b>
      <a href="https://google.com">Google</a>
      Locale: {request.locale}
      <Box className="mt-4" style={{ color: customizer.textColor }}>
        <h1 className="text-lg">Products</h1>

        {/* {products?.edges?.map(({ node }) => (
          <Box key={node.id}>{node.title}</Box>
        ))} */}

        <button
          type="button"
          onClick={() => {
            toast.create({ message: 'Test' });
          }}
        >
          Test
        </button>
      </Box>
      <Box className="mt-4">{content.date}</Box>
      <Box className="mt-4">{content.select}</Box>
      <Box className="mt-4">{content.link}</Box>
      <Box className="mt-4">{content.richText}</Box>
      <img alt="test" src={content.image} />
      <div className="flex flex-col gap-5 p-5">
        {content?.cards?.map(({ preview }) => (
          <div className="bg-white w-full rounded shadow-lg overflow-hidden">
            {!!preview?.cardImage && <img src={preview?.cardImage} />}

            <div className="bg-white p-5 flex flex-col gap-6">
              {!!preview?.cardTitle && (
                <h3 className="text-purple-700 text-md font-bold">
                  {preview?.cardTitle}
                </h3>
              )}

              {!!preview?.cardButtons?.length && (
                <div className="bg-white flex flex-wrap gap-3">
                  {preview?.cardButtons?.map(
                    ({
                      preview: buttonPreview,
                    }: {
                      preview: { link: string; text: string };
                    }) =>
                      buttonPreview?.link || buttonPreview?.text ? (
                        <a
                          className="bg-purple-300 text-purple-800 text-xs px-5 py-3 no-underline"
                          href={buttonPreview?.link}
                        >
                          {buttonPreview?.text}
                        </a>
                      ) : null,
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};
