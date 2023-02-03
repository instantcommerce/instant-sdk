import { useEffect, useMemo } from 'react';
import {
  ArrowCounterClockwise,
  ArrowRight,
  ArrowSquareOut,
  Faders,
  Star,
  XCircle,
} from 'phosphor-react';
import { BlockType } from 'types/api';
import { useBlocks, Button, useConfig, Select } from '..';
import { useProductsQuery } from '../../lib';
import { Logo } from './Logo';

export const TopBar = () => {
  const { selectedBlock, blocksManifest, reloadPreview } = useBlocks();
  const {
    setRightPanelVisible,
    rightPanelVisible,
    updateBookmarks,
    bookmarks,
    getUrl,
    selectedStore,
    setSelectedStore,
    selectedProduct,
    setSelectedProduct,
  } = useConfig();

  const shouldShowProductSelect = !!(
    selectedBlock && blocksManifest?.[selectedBlock]?.type === BlockType.Page
  );

  const blockName = useMemo(
    () =>
      selectedBlock ? blocksManifest?.[selectedBlock]?.name : 'Select block',
    [selectedBlock, blocksManifest],
  );

  const availableStores = useMemo(
    () =>
      window.__INSTANT_STORES__?.map(({ name, hostname }) => ({
        label: name,
        value: hostname,
      })),
    [],
  );

  const { data, error, isLoading } = useProductsQuery(
    {
      first: 10,
    },
    {
      enabled: !!selectedStore && shouldShowProductSelect,
    },
  );

  const availableProducts = useMemo(
    () =>
      data?.products?.edges?.map(({ node }) => ({
        label: node.title,
        value: node.handle,
      })) || [],
    [data],
  );

  useEffect(() => {
    if (
      !isLoading &&
      !error &&
      data?.products?.edges?.length &&
      !selectedProduct
    ) {
      setSelectedProduct(data.products.edges[0].node);
    }
  }, [data]);

  return (
    <nav className="sticky top-0 z-30 flex shrink-0 h-12 w-full bg-white border-b border-gray-100 px-2">
      <div className="flex w-full items-center justify-between relative pl-2">
        <div className="flex items-center">
          <Logo />

          {!!availableStores ? (
            <>
              <div className="w-[1px] bg-gray-200 mr-2 h-6 my-auto ml-5" />

              <Select
                className="text-[13px] border-none shadow-none"
                itemClassName="text-[13px]"
                options={availableStores}
                value={selectedStore?.hostname}
                onValueChange={(value) => {
                  const store = window.__INSTANT_STORES__?.find(
                    ({ hostname }) => hostname === value,
                  );

                  if (store) {
                    setSelectedStore(store);
                  }
                }}
              />
            </>
          ) : (
            <Button
              href="http://docs.instantcommerce.io/"
              variant="warning"
              className="h-7 ml-4 px-2 gap-[6px]"
            >
              Login to access your store
              <ArrowRight size={16} />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1 mx-auto absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
          <h1 className="text-sm">{blockName}</h1>
          {selectedBlock && (
            <Button
              iconOnly
              variant="unstyled"
              onClick={() => updateBookmarks(blockName)}
            >
              <Star
                size={16}
                weight={bookmarks?.includes(blockName) ? 'fill' : 'regular'}
              />
            </Button>
          )}
        </div>

        <div className="flex gap-1.5 items-center">
          {shouldShowProductSelect && (
            <>
              <Select
                className="max-w-[140px] text-[13px] border-none shadow-none"
                itemClassName="text-[13px]"
                options={availableProducts}
                value={selectedProduct?.handle}
                onValueChange={(value) => {
                  const product = data?.products?.edges?.find(
                    ({ node }) => node.handle === value,
                  );

                  if (product) {
                    setSelectedProduct(product.node);
                  }
                }}
              />

              <div className="w-[1px] bg-gray-200 h-[30px]" />
            </>
          )}

          <div className="flex gap-1.5">
            <Button iconOnly onClick={reloadPreview}>
              <ArrowCounterClockwise size={18} />
            </Button>

            <Button
              iconOnly
              to={getUrl({
                product: selectedProduct?.handle || '',
                viewMode: 'fullScreen',
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowSquareOut size={18} />
            </Button>

            <Button
              iconOnly
              onClick={() => {
                setRightPanelVisible(!rightPanelVisible);
              }}
            >
              {rightPanelVisible ? <XCircle size={18} /> : <Faders size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
