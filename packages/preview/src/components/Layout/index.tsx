import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useMemo } from 'react';
import humanizeString from 'humanize-string';
import {
  ArrowsInSimple,
  CaretCircleDoubleLeft,
  Moon,
  Sun,
} from 'phosphor-react';
import { twJoin, twMerge } from 'tailwind-merge';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';
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
    params,
    scale,
    setScale,
    iframeWidth,
    iframeHeight,
    setWidth,
    setHeight,
    screenSize,
    setScreenSize,
    updateDimensions,
  } = useConfig();

  useEffect(() => {
    setIframeSize({ width: iframeWidth, height: iframeHeight });
  }, [iframeWidth, iframeHeight]);

  const renderField = (
    schema: SchemaTypes,
    field:
      | DefineContentSchema['fields'][0]
      | DefineCustomizerSchema['fields'][0],
  ) => {
    const baseProps = {
      label: field.label || humanizeString(field.name),
      key: field.name,
      id: field.name,
      defaultValue: field.preview,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setPreviewValue(schema, field.name, e.target.value);
      },
    };

    switch (field.type) {
      case 'text':
        return <Input {...baseProps} direction="row" />;

      // case 'color':
      //   return (
      //     <ColorInput
      //       {...baseProps}
      //       direction="row"
      //       onChange={(value: string) => {
      //         setPreviewValue(schema, field.name, value);
      //       }}
      //     />
      //   );

      case 'select':
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

      case 'image':
        return <ImageInput {...baseProps} direction="row" />;

      case 'date':
        return <Input type="date" {...baseProps} direction="row" />;

      case 'richText':
        return <RichText {...baseProps} direction="col" />;

      default:
        return null;
    }
  };

  const contentSchema = useMemo(() => {
    if (selectedBlock) {
      return (
        <div className="flex flex-col gap-4 px-3 py-6">
          {blocksManifest?.[selectedBlock]?.contentSchema?.fields?.map(
            (field) => renderField('content', field),
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
              (field) => renderField('customizer', field),
            )}
          </InputGroup>
        </div>
      );
    }
  }, [selectedBlock, blocksManifest]);

  return params?.viewMode === 'fullScreen' ? (
    <div className="h-full w-full">{children}</div>
  ) : (
    <div className="flex flex-1 flex-col w-full h-full">
      <TopBar />

      <div className="flex flex-row flex-1 relative h-full min-h-0">
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
            'flex flex-row flex-1 min-w-0 ',
          )}
        >
          <div
            id="preview-wrapper"
            className="flex flex-col flex-1 min-w-0 overflow-auto"
          >
            <div id="preview-top-bar" className="sticky top-0 z-50 p-2">
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
                    className="text-xs h-[30px]"
                    options={[[screenSizes[0]], screenSizes.slice(1)]}
                    defaultValue={screenSizes[0].value}
                    value={`${screenSize}`}
                    variant={darkModeEnabled ? 'dark' : 'light'}
                    onValueChange={(val) => {
                      const value = Number(val);
                      const reset = !value;

                      setScreenSize(value);

                      if (reset) {
                        updateDimensions(value, reset);
                      }
                    }}
                  />
                </div>

                <div
                  className={twMerge(
                    'flex gap-1.5 items-center text-xs absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4',
                    darkModeEnabled ? 'text-primary-300' : 'text-primary-700',
                  )}
                >
                  <input
                    className={twMerge(
                      'w-12 text-center bg-transparent px-2 py-1 focus:outline-1 [-moz-appearance]-none',
                      darkModeEnabled
                        ? 'focus:bg-primary-900 focus:outline-primary-800'
                        : 'focus:bg-primary-100 focus:outline-primary-200',
                    )}
                    value={iframeSize.width}
                    type="number"
                    min={1}
                    max={9999}
                    onChange={(e) => {
                      setWidth(Number(e.target.value));
                    }}
                  />
                  <span
                    className={
                      darkModeEnabled ? 'text-gray-400' : 'text-gray-600'
                    }
                  >
                    x
                  </span>
                  <input
                    className="w-12 text-center bg-transparent px-2 py-1 focus:bg-primary-100 focus:outline-1 focus:outline-primary-200"
                    value={iframeSize.height}
                    type="number"
                    min={1}
                    max={9999}
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
                      {darkModeEnabled ? <Sun size={16} /> : <Moon size={16} />}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-1 overflow-hidden">
              <PreviewWrapper
                onSizeChange={setIframeSize}
                onResizeStart={() => {
                  setScreenSize(0);
                  updateDimensions(0);
                }}
              >
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
