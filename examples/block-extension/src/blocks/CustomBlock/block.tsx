import { HTMLProps, ReactNode, useCallback, useEffect, useState } from 'react';
import {
  Link,
  gql,
  useBlockState,
  useEventListener,
  useRequestData,
  useShopifyClient,
  useTheme,
  useToast,
  RichText,
} from 'instant-client';

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

  return (
    <Box
      className={[
        'shadow-lg text-orange-600',
        customizer.padding === 'lg' ? 'p-10' : 'p-3',
      ].join(' ')}
    >
      Title: <b style={{ color: colors.primary.s700 }}>{content.title}</b>
      {!!content.link && <Link to={content.link}>Google</Link>}
      Locale: {request.locale}
      <Box className="mt-4" style={{ color: customizer.textColor }}>
        <h1 className="text-lg animate-spin">Products</h1>

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
      <Box className="mt-4">Toggle: {`${customizer.toggle}`}</Box>
      <Box className="mt-4">{content.date}</Box>
      <Box className="mt-4">{content.select}</Box>
      <Box className="mt-4">
        <RichText value={content.richText} />
      </Box>
      <img alt="test" src={content.image?.filename} />
      <div className="flex flex-col gap-5 p-5">
        {content?.cards?.map(({ value }: any, idx: number) => (
          <div
            key={idx}
            className="bg-white w-full rounded shadow-lg overflow-hidden"
          >
            {!!value?.cardImage && (
              <img src={value?.cardImage?.filename} alt="" />
            )}

            <div className="bg-white p-5 flex flex-col gap-6">
              {!!value?.cardTitle && (
                <h3 className="text-purple-700 text-md font-bold">
                  {value?.cardTitle}
                </h3>
              )}

              {!!value?.cardButtons?.length && (
                <div className="bg-white flex flex-wrap gap-3">
                  {value?.cardButtons?.map(
                    (
                      {
                        value: button,
                      }: {
                        value: { link: any; text: string };
                      },
                      jdx: number,
                    ) =>
                      button?.link || button?.text ? (
                        <Link
                          key={jdx}
                          className="bg-purple-300 text-purple-800 text-xs px-5 py-3 no-underline"
                          to={button?.link}
                        >
                          {button?.text}
                        </Link>
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
