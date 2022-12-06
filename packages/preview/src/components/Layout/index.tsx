import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import humanizeString from 'humanize-string';
import {
  ArrowsInSimple,
  CaretCircleDoubleLeft,
  Moon,
  PencilSimple,
} from 'phosphor-react';
import { twJoin } from 'tailwind-merge';
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
  Modal,
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
  const [addFieldModalOpen, setAddFieldModalOpen] = useState(false);
  const [subSchema, setSubschema] = useState(null);
  const [allowedSchemas, setAllowedSchemas] = useState([]);

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

  const subschemas = blocksManifest?.[
    selectedBlock
  ]?.contentSchema?.subschemas?.reduce((acc, curr) => {
    acc[curr.name] = curr.fields;

    return acc;
  }, {});

  const subschemaOptions = useMemo(
    () =>
      blocksManifest?.[selectedBlock]?.contentSchema?.subschemas?.filter(
        (item) =>
          !allowedSchemas?.length || allowedSchemas?.includes(item.name),
      ),
    [allowedSchemas, selectedBlock, blocksManifest],
  );

  const renderField = (
    schema: SchemaTypes,
    field:
      | DefineContentSchema['fields'][0]
      | DefineCustomizerSchema['fields'][0],
    layer: number = 1,
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
        return <Input {...baseProps} direction={layer <= 1 ? 'row' : 'col'} />;

      // case 'color':
      //   return (
      //     <ColorInput
      //       {...baseProps}
      //       direction={layer <= 1 ? "row" : 'col'}
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
            direction={layer <= 1 ? 'row' : 'col'}
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'image':
      case 'link':
        return (
          <ImageInput {...baseProps} direction={layer <= 1 ? 'row' : 'col'} />
        );

      case 'date':
        return (
          <Input
            type="date"
            {...baseProps}
            direction={layer <= 1 ? 'row' : 'col'}
          />
        );

      case 'richText':
        return <RichText {...baseProps} direction="col" />;

      case 'subSchema':
        return (
          <div className="flex flex-col gap-1.5">
            <div className="w-full flex justify-between items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium">
                {field.name}
              </span>

              <Button
                iconOnly
                variant="unstyled"
                onClick={() => {
                  setSubschema(field.name);
                  setAllowedSchemas(field.allowed);
                }}
              >
                <PencilSimple weight="fill" size={16} color="#2E90FA" />
              </Button>
            </div>

            <div
              className={twJoin(
                'flex flex-col gap-2',
                'rounded p-2 border border-gray-300',
              )}
            >
              {field?.preview?.map((f) => (
                <Button variant="gray">{f.name}</Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  console.log(blocksManifest?.[selectedBlock], subschemas, subSchema);

  const contentSchema = useMemo(() => {
    if (selectedBlock) {
      return (
        <div className="flex flex-col px-3 py-6 gap-5">
          {subSchema ? (
            <div className="text-xs">
              <div className="mb-5">{subSchema}</div>

              <div className="text-gray-500 mb-3">{subSchema}</div>

              <div className="bg-gray-100 rounded-xl p-2 flex flex-col gap-2">
                {blocksManifest?.[selectedBlock]?.contentSchema?.fields
                  ?.find((f) => f.name === subSchema)
                  ?.preview?.map((item) => (
                    <div className="bg-white flex flex-col gap-2 p-2 rounded-lg border border-gray-300">
                      <div className="text-gray-500">{item?.name}</div>

                      {subschemas[item.name]?.map((f) =>
                        renderField('content', f, 2),
                      )}
                    </div>
                  ))}

                <Button
                  variant="secondary"
                  className="bg-primary-100 border-primary-300 text-primary-500 flex items-center justify-center mt-2"
                  onClick={() => {
                    setAddFieldModalOpen(true);
                  }}
                >
                  + Element
                </Button>
              </div>
            </div>
          ) : (
            blocksManifest?.[selectedBlock]?.contentSchema?.fields?.map(
              (field) => renderField('content', field),
            )
          )}
        </div>
      );
    }
  }, [selectedBlock, blocksManifest, subSchema]);

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
      <Modal
        open={addFieldModalOpen}
        title="Insert element"
        onOpenChange={setAddFieldModalOpen}
      >
        {subschemaOptions?.map((field) => (
          <Button
            onClick={() =>
              setPreviewValue('content', 'buttons', [
                { name: field.name, schema: subschemas?.[field.name] },
              ])
            }
            variant="unstyled"
            className="p-3 text-sm text-gray-700 rounded border border-gray-300 shadow-sm h-auto font-medium hover:text-primary-700 hover:bg-primary-100 hover:border-primary-500 transition-colors"
          >
            {field.name}
          </Button>
        ))}
      </Modal>
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
