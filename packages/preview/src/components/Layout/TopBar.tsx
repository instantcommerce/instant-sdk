import { useMemo } from 'react';
import {
  ArrowCounterClockwise,
  ArrowSquareOut,
  Faders,
  Star,
  XCircle,
} from 'phosphor-react';
import { useBlocks, Button, useConfig, Select } from '..';
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
  } = useConfig();

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

  return (
    <nav className="sticky top-0 z-30 flex shrink-0 h-12 w-full bg-white border-b border-gray-100 px-2">
      <div className="flex w-full items-center justify-between relative pl-2">
        <div className="flex items-center">
          <Logo />

          <div className="w-[1px] bg-gray-200 mr-2 h-6 my-auto ml-5" />

          {!!selectedStore && !!availableStores && (
            <Select
              className="text-[13px] border-none shadow-none"
              itemClassName="text-[13px]"
              options={availableStores}
              value={selectedStore.hostname}
              onValueChange={(value) => {
                const store = window.__INSTANT_STORES__?.find(
                  ({ hostname }) => hostname === value,
                );

                if (store) {
                  setSelectedStore(store);
                }
              }}
            />
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

        <div className="flex gap-1.5">
          <Button iconOnly onClick={reloadPreview}>
            <ArrowCounterClockwise size={18} />
          </Button>

          <Button
            iconOnly
            to={getUrl({ viewMode: 'fullScreen' })}
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
    </nav>
  );
};
