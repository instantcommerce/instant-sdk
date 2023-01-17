import { ButtonHTMLAttributes, useMemo } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { useBlocks } from '../BlocksProvider';
import { Button } from '../Button';
import { useConfig } from '../ConfigProvider';

interface SidebarSectionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  items: { name: string; url: string }[];
  selectedItem: string;
}

const SidebarSection = ({
  title,
  items,
  selectedItem,
}: SidebarSectionProps) => {
  const { setSelectedBlock } = useBlocks();
  const { getUrl } = useConfig();

  return (
    <div className="font-medium">
      <h2 className="px-3 py-4 mb-2 text-sm leading-4 text-gray-700 font-medium border-b border-b-gray-100">
        {title}
      </h2>

      <ul className="text-xs text-gray-600 px-1 leading-5">
        {items?.map(({ name, url }) => (
          <li key={url}>
            <Button
              variant="unstyled"
              className={twJoin(
                'px-2 py-[6px] rounded w-full text-left',
                name === selectedItem && ' bg-primary-100 text-primary-700',
              )}
              to={getUrl({ block: name })}
              onClick={() => setSelectedBlock(url)}
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SideBar = ({ className }: { className?: string }) => {
  const { selectedBlock, blocksManifest } = useBlocks();
  const { bookmarks } = useConfig();

  const blocks = useMemo(
    () =>
      Object.keys(blocksManifest)
        ?.filter((key) => !bookmarks?.includes(blocksManifest[key]?.name))
        ?.map((key) => ({
          name: blocksManifest[key]?.name,
          type: blocksManifest[key]?.type,
          url: key,
        })),
    [blocksManifest, bookmarks],
  );

  const sections = useMemo(
    () => blocks?.filter((block) => block?.type === 'section'),
    [blocks],
  );

  const pages = useMemo(
    () => blocks?.filter((block) => block?.type === 'page'),
    [blocks],
  );

  const components = useMemo(
    () => blocks?.filter((block) => block?.type === 'component'),
    [blocks],
  );

  const bookmarkItems = useMemo(
    () =>
      Object.keys(blocksManifest)
        ?.filter((key) => bookmarks?.includes(blocksManifest[key]?.name))
        ?.map((key) => ({ name: blocksManifest[key]?.name, url: key })),
    [bookmarks],
  );

  const selectedItem = useMemo(
    () =>
      blocksManifest?.[selectedBlock || Object.keys(blocksManifest)[0]]?.name,
    [selectedBlock],
  );

  return (
    <aside
      className={twMerge(
        'shrink-0 w-50 h-full bg-white border-r border-gray-100',
        className,
      )}
    >
      <nav className="flex flex-col gap-y-3">
        {!!bookmarkItems?.length && (
          <SidebarSection
            title="Bookmarks"
            items={bookmarkItems}
            selectedItem={selectedItem}
          />
        )}

        {!!sections?.length && (
          <SidebarSection
            title="Sections"
            items={sections}
            selectedItem={selectedItem}
          />
        )}

        {!!pages?.length && (
          <SidebarSection
            title="Pages"
            items={pages}
            selectedItem={selectedItem}
          />
        )}

        {!!components?.length && (
          <SidebarSection
            title="Components"
            items={components}
            selectedItem={selectedItem}
          />
        )}
      </nav>
    </aside>
  );
};
