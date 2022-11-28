import { HTMLProps, ReactNode, useEffect, useState } from "react";
import {
  gql,
  useBlockState,
  useShopifyClient,
  useTheme,
  useToast,
} from "instant-client";

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
  const { content, customizations } = useBlockState();
  const { colors } = useTheme();
  const shopifyClient = useShopifyClient();
  const toast = useToast();

  const [products, setProducts] = useState<ProductsConnection>();

  const loadProducts = async () => {
    try {
      const result = await shopifyClient.request<Products>(gql`
        query products {
          products(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `);

      setProducts(result.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProducts();

    toast.create({ message: "Test" });
  }, []);

  if (!products) {
    return <></>;
  }

  return (
    <Box className="shadow-lg text-orange-600">
      Title: <b style={{ color: colors.primary.s700 }}>{content.title}</b>
      <a href="https://google.com">Google</a>
      <Box className="mt-4" style={{ color: customizations.textColor }}>
        <h1 className="text-lg">Products</h1>

        {products?.edges?.map(({ node }) => (
          <Box key={node.id}>{node.title}</Box>
        ))}

        <button onClick={console.log}>Test</button>
      </Box>
    </Box>
  );
};