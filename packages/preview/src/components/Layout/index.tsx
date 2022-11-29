import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { ArrowsInSimple, CaretCircleDoubleLeft, Moon } from 'phosphor-react';
import { twJoin } from 'tailwind-merge';
import {
  Button,
  ColorInput,
  useConfig,
  ImageInput,
  Input,
  InputGroup,
  Select,
  Tabs,
  Tooltip,
  useBlocks,
  screenSizes,
  RichText,
  PreviewWrapper,
  IFRAME_DEFAULT_SIZE,
} from '..';
import { SchemaTypes } from '../BlocksProvider/context';
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';

const tabs = [
  {
    title: 'Content',
    value: 'contentSchema',
  },
  {
    title: 'Customizer',
    value: 'customizerSchema',
  },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const { selectedBlock, blocksManifest, setPreviewValue } = useBlocks();
  const [iframeSize, setIframeSize] = useState(IFRAME_DEFAULT_SIZE);

  const {
    rightPanelVisible,
    darkModeEnabled,
    setDarkModeEnabled,
    leftPanelVisible,
    setLeftPanelVisible,
    setScreenSize,
    params,
    scale,
    setScale,
    iframeWidth,
    iframeHeight,
    setWidth,
    setHeight,
  } = useConfig();

  useEffect(() => {
    setIframeSize({ width: iframeWidth, height: iframeHeight });
  }, [iframeWidth, iframeHeight]);

  const renderField = (
    schema: SchemaTypes,
    field: {
      name: string;
      type: string;
      preview: string;
      options?: string[];
    },
  ) => {
    const baseProps = {
      label: field.name,
      key: field.name,
      id: field.name,
      defaultValue: field.preview,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setPreviewValue(schema, field.name, e.target.value);
      },
    };

    switch (field.type) {
      case 'TEXT':
        return <Input {...baseProps} direction="row" />;

      case 'COLOR':
        return (
          <ColorInput
            {...baseProps}
            direction="row"
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'SELECT':
        return (
          <Select
            {...baseProps}
            options={field.options || []}
            direction="row"
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'IMAGE':
        return <ImageInput {...baseProps} direction="row" />;

      case 'DATE':
        return <Input type="date" {...baseProps} direction="row" />;

      case 'RICH_TEXT':
        return <RichText {...baseProps} direction="col" />;

      default:
        return null;
    }
  };

  const contentSchema = useMemo(() => {
    if (selectedBlock) {
      return (
        <div className="px-3 py-6">
          {blocksManifest?.[selectedBlock]?.contentSchema?.fields?.map(
            (field: any) => renderField('content', field),
          )}
        </div>
      );
    }
  }, [selectedBlock, blocksManifest]);

  const customizerSchema = useMemo(() => {
    if (selectedBlock) {
      return (
        <div className="flex flex-col gap-5 pt-2 pb-6">
          <InputGroup title="Input group">
            {blocksManifest?.[selectedBlock]?.customizerSchema?.fields?.map(
              (field: any) => renderField('customizer', field),
            )}
          </InputGroup>
        </div>
      );
    }
  }, [selectedBlock, blocksManifest]);

  return params?.viewMode === 'fullScreen' ? (
    <div className="h-full w-full">{children}</div>
  ) : (
    <div className="flex flex-1 flex-col w-full">
      <TopBar />

      <div className="flex flex-row flex-1 relative">
        <SideBar
          className={`${
            leftPanelVisible ? 'translate-x-0' : '-translate-x-full'
          } absolute left-0 transition-transform`}
        />

        <main
          className={twJoin(
            darkModeEnabled ? 'bg-[#1E1E1E]' : 'bg-gray-50',
            rightPanelVisible ? 'pr-96' : 'pr-4',
            leftPanelVisible ? 'pl-[12.5rem]' : 'pl-4',
            'flex flex-row flex-1 min-w-0',
          )}
        >
          <div className="flex flex-col flex-1 min-w-0">
            <div className="sticky top-12 z-50 p-2">
              <div className="relative w-full h-full flex items-center justify-between">
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => {
                      setLeftPanelVisible(!leftPanelVisible);
                    }}
                    variant={darkModeEnabled ? 'dark' : 'white'}
                    iconOnly
                  >
                    <CaretCircleDoubleLeft size={16} />
                  </Button>

                  <Select
                    options={[[screenSizes[0]], screenSizes.slice(1)]}
                    defaultValue={screenSizes[0].value}
                    variant={darkModeEnabled ? 'dark' : 'light'}
                    onValueChange={(val) => setScreenSize(Number(val))}
                  />
                </div>

                <div className="flex gap-1.5 items-center text-xs text-primary-700 absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                  <input
                    className="w-12 text-center bg-transparent px-2 py-1 focus:bg-primary-100 focus:outline-1 focus:outline-primary-200 [-moz-appearance]-none"
                    value={iframeSize.width}
                    type="number"
                    onChange={(e) => {
                      setWidth(Number(e.target.value));
                    }}
                  />
                  x
                  <input
                    className="w-12 text-center bg-transparent px-2 py-1 focus:bg-primary-100 focus:outline-1 focus:outline-primary-200"
                    value={iframeSize.height}
                    type="number"
                    onChange={(e) => {
                      setHeight(Number(e.target.value));
                    }}
                  />
                </div>
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => setScale(scale ? undefined : 50)}
                    variant={darkModeEnabled ? 'dark' : 'white'}
                  >
                    <ArrowsInSimple size={16} />
                    {scale ? '100%' : '50%'}
                  </Button>

                  <Tooltip content="Toggle dark mode">
                    <Button
                      onClick={() => {
                        setDarkModeEnabled(!darkModeEnabled);
                      }}
                      variant={darkModeEnabled ? 'dark' : 'white'}
                      iconOnly
                    >
                      <Moon size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="h-full w-full max-w-[calc(100%-40px)] max-h-[calc(100%-60px)] overflow-auto flex items-center mb-5 mr-5 ml-5">
              <PreviewWrapper onSizeChange={setIframeSize}>
                {children}
              </PreviewWrapper>
            </div>
          </div>
        </main>

        <aside
          className={`${
            rightPanelVisible ? 'translate-x-0' : 'translate-x-full'
          } absolute right-0 transition-transform bg-white h-full flex flex-col shrink-0 border-l border-gray-100 py-2 overflow-y-auto w-96`}
        >
          <Tabs
            tabs={tabs}
            content={{
              contentSchema,
              customizerSchema,
            }}
          />
        </aside>
      </div>
    </div>
  );
};
