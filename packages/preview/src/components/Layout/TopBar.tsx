import { useEffect, useMemo, useState } from 'react';
import {
  ArrowCounterClockwise,
  ArrowRight,
  ArrowSquareOut,
  CaretDown,
  Faders,
  Star,
  XCircle,
} from 'phosphor-react';
import { BlockType } from 'types/api';
import { useBlocks, Button, useConfig, Select, useStore } from '..';
import { useProductsQuery } from '../../lib';
import { Logo } from './Logo';
import { ProductsModal } from './ProductsModal';

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
  const { store } = useStore();
  const [isProductsModalOpen, setProductsModalOpen] = useState(false);

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
      enabled: !!selectedStore && !!store && shouldShowProductSelect,
    },
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
              <ProductsModal
                onProductSelect={(product) => {
                  setSelectedProduct(product);
                  setProductsModalOpen(false);
                }}
                open={isProductsModalOpen}
                onOpenChange={(open) => {
                  setProductsModalOpen(open);
                }}
                trigger={
                  <button className="max-w-[140px] text-[13px] text-gray-600 border-none shadow-none font-medium flex items-center gap-2 p-2 border rounded w-full h-8 content-between">
                    <span className="pointer-events-none text-ellipsis overflow-hidden whitespace-nowrap">
                      {selectedProduct?.title}
                    </span>

                    <div className="transition-transform duration-200 w-3 ml-auto">
                      <CaretDown size={16} />
                    </div>
                  </button>
                }
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
