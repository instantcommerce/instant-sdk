import { HTMLProps, ReactNode, useCallback, useEffect, useState } from 'react';
import {
  gql,
  useBlockState,
  useEventListener,
  useRequestData,
  useShopifyClient,
  useTheme,
  useToast,
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
    </Box>
  );
};
