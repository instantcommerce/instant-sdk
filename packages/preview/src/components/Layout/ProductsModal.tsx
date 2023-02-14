import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import { twMerge } from 'tailwind-merge';
import { ProductsQuery, useProductsQuery } from '../../lib';
import { Button, ButtonProps } from '../Button';
import { Input } from '../Input';
import { Modal, ModalProps } from '../Modal';

const LIMIT = 6;

const PaginationButton = ({
  children,
  isLoading,
  ...props
}: ButtonProps & { isLoading?: boolean }) => (
  <Button
    {...props}
    variant="unstyled"
    className={twMerge(
      'text-sm gap-2 h-5',
      props.disabled && 'text-gray-400',
      isLoading && 'cursor-wait',
    )}
  >
    {children}
  </Button>
);

interface ProductsModalProps extends ModalProps {
  onProductSelect: (
    product: ProductsQuery['products']['edges'][number]['node'],
  ) => void;
}

export const ProductsModal = ({
  onProductSelect,
  ...props
}: ProductsModalProps) => {
  const [params, setParams] = useState<any>({});

  const { data, error, isLoading, isFetching, isPreviousData } =
    useProductsQuery(
      { ...params, ...(params.before ? { last: LIMIT } : { first: LIMIT }) },
      {
        keepPreviousData: true,
      },
    );

  return (
    <Modal
      title="Select product to preview"
      className="border-none p-0 gap-0"
      {...props}
    >
      <div className="px-4 pb-2">
        <Input
          placeholder="Search products"
          name="search"
          value={params.query || ''}
          onChange={(e) => {
            setParams({
              ...params,
              after: undefined,
              before: undefined,
              query: e.target.value,
            });
          }}
        />
      </div>

      {error ? (
        <div className="text-left text-sm text-red-500">
          Failed to load products
        </div>
      ) : isLoading ? (
        <div className="text-left text-sm text-gray-500">Loading...</div>
      ) : (
        <div className="relative">
          {!data?.products?.edges?.length ? (
            <div className="text-left text-sm text-gray-500">
              No products found
            </div>
          ) : (
            <div className="flex flex-col border-t-[0.5px] border-gray-300">
              {data?.products?.edges?.map(({ node: product }) => (
                <button
                  key={product.id}
                  className="flex flex-row items-center text-left gap-2 p-4 border-b-[0.5px] border-gray-300"
                  onClick={() => {
                    onProductSelect(product);
                  }}
                >
                  {!!product.images?.edges?.length && (
                    <img
                      src={product.images.edges[0].node.url}
                      alt={product.title}
                      className="w-6 h-6 object-cover"
                    />
                  )}

                  <div className="text-xs text-gray-800 font-medium">
                    {product.title}
                  </div>
                </button>
              ))}
            </div>
          )}

          {isFetching && (
            <div className="absolute top-0 left-0 w-full h-full cursor-wait bg-white bg-opacity-50" />
          )}
        </div>
      )}

      <div className="flex flex-row justify-between items-center p-4">
        <PaginationButton
          disabled={
            isPreviousData ||
            isLoading ||
            isFetching ||
            !data?.products?.pageInfo?.hasPreviousPage
          }
          onClick={() => {
            setParams({
              ...params,
              after: undefined,
              before: data?.products?.pageInfo?.startCursor,
            });
          }}
          isLoading={isLoading || isFetching}
        >
          <ArrowLeft size={20} />
          Previous
        </PaginationButton>

        <PaginationButton
          disabled={
            isPreviousData ||
            isLoading ||
            isFetching ||
            !data?.products?.pageInfo?.hasNextPage
          }
          isLoading={isLoading || isFetching}
          onClick={() => {
            setParams({
              ...params,
              before: undefined,
              after: data?.products?.pageInfo?.endCursor,
            });
          }}
        >
          Next
          <ArrowRight size={20} />
        </PaginationButton>
      </div>
    </Modal>
  );
};
