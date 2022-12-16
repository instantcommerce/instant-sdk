import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useMemo } from 'react';
import humanizeString from 'humanize-string';
import {
  CaretCircleDoubleLeft,
  CaretCircleDoubleRight,
  Faders,
  Image,
  Moon,
  Sun,
  WarningCircle,
} from 'phosphor-react';
import { twJoin, twMerge } from 'tailwind-merge';
import {
  Button,
  ColorInput,
  StatusMessage,
  useConfig,
  ImageInput,
  Input,
  Select,
  Tabs,
  Tooltip,
  useBlocks,
  screenSizes,
  RichText,
  PreviewWrapper,
  IFRAME_DEFAULT_SIZE,
} from '..';
import {
  BlockContentSchema,
  BlockCustomizerSchema,
  SchemaTypes,
} from '../BlocksProvider/context';
import { scales } from '../ConfigProvider';
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
      | BlockContentSchema['fields'][number]
      | BlockCustomizerSchema['fields'][number],
  ) => {
    const baseProps = {
      label: field.label || humanizeString(field.name),
      key: field.name,
      id: field.name,
      name: field.name,
      defaultValue: field.preview,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setPreviewValue(schema, field.name, e.target.value);
      },
    };

    switch (field.type) {
      case 'text':
        return (
          <Input
            {...baseProps}
            maxLength={field.maxLength !== null ? field.maxLength : undefined}
          />
        );

      case 'color':
        return (
          <ColorInput
            {...baseProps}
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'select':
        return (
          <Select
            {...baseProps}
            options={field.options || []}
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'image':
      case 'link':
        return <ImageInput {...baseProps} />;

      case 'date':
        return (
          <Input
            type={field.withTime ? 'datetime-local' : 'date'}
            {...baseProps}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            {...baseProps}
            min={field.min !== null ? field.min : undefined}
            max={field.max !== null ? field.max : undefined}
            fractionDigits={field.fractionDigits}
          />
        );

      case 'richText':
        return <RichText {...baseProps} />;

      default:
        return null;
    }
  };

  const renderSchema = ({
    type,
    emptyMessage,
  }: {
    type: SchemaTypes;
    emptyMessage: ReactNode;
  }) => {
    if (selectedBlock) {
      let content = null;
      const schema =
        blocksManifest?.[selectedBlock]?.[
          type === 'content' ? 'contentSchema' : 'customizerSchema'
        ];

      if (schema?.fields?.length) {
        let hasDuplicateFieldNames: string | false = false;

        for (
          let i = 0;
          i < schema.fields.length && !hasDuplicateFieldNames;
          i += 1
        ) {
          for (
            let j = 0;
            j < schema.fields.length && !hasDuplicateFieldNames;
            j += 1
          ) {
            if (i !== j && schema.fields[i].name === schema.fields[j].name) {
              hasDuplicateFieldNames = schema.fields[j].name;
            }
          }
        }

        if (!hasDuplicateFieldNames) {
          content = schema.fields.map((field) => renderField(type, field));
        } else {
          content = (
            <StatusMessage
              type="error"
              icon={WarningCircle}
              title="Schema field names should be unique"
              description={`Check the schema definition for fields with name "${hasDuplicateFieldNames}".`}
              button={{
                href: 'https://docs.instantcommerce.io',
                text: 'Learn more',
              }}
            />
          );
        }
      } else {
        content = emptyMessage;
      }

      if (content) {
        return <div className="flex flex-col gap-4 px-3 py-6">{content}</div>;
      }
    }

    return null;
  };

  const contentSchema = useMemo(
    () =>
      renderSchema({
        type: 'content',
        emptyMessage: (
          <StatusMessage
            icon={Faders}
            title="No customizer schema found"
            description="Props of exported .tsx elements from your blocks will appear here."
            button={{
              href: 'https://docs.instantcommerce.io',
              text: 'Learn more',
            }}
          />
        ),
      }),
    [selectedBlock, blocksManifest],
  );

  const customizerSchema = useMemo(
    () =>
      renderSchema({
        type: 'customizer',
        emptyMessage: (
          <StatusMessage
            icon={Image}
            title="No CMS schema found"
            description="Storyblok schema and sub-schema fields will appear here."
            button={{
              href: 'https://docs.instantcommerce.io',
              text: 'Learn more',
            }}
          />
        ),
      }),
    [selectedBlock, blocksManifest],
  );

  return params?.viewMode === 'fullScreen' ? (
    <div className="h-full w-full">{children}</div>
  ) : (
    <div className="flex flex-1 flex-col w-full h-full">
      <TopBar />

      <div className="flex flex-row flex-1 relative h-full min-h-0">
        <SideBar
          className={twJoin(
            'absolute left-0 transition-transform',
            leftPanelVisible ? 'translate-x-0' : '-translate-x-full',
          )}
        />

        <main
          className={twJoin(
            darkModeEnabled ? 'bg-[#1E1E1E]' : 'bg-gray-50',
            rightPanelVisible && 'pr-96',
            leftPanelVisible && 'pl-[12.5rem]',
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
                    {leftPanelVisible ? (
                      <CaretCircleDoubleLeft size={18} />
                    ) : (
                      <CaretCircleDoubleRight size={18} />
                    )}
                  </Button>

                  <Select
                    className={twMerge(
                      'text-xs text-[13px] h-[30px] shadow-none',
                      darkModeEnabled
                        ? 'border-gray-800 hover:border-gray-700 focus:border-gray-700'
                        : 'border-white hover:border-primary-100 focus:border-gray-200',
                    )}
                    itemClassName="text-[13px]"
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
                      'w-[38px] text-center bg-transparent outline-none rounded focus:ring-1 px-[3px] py-px [-moz-appearance]-none',
                      darkModeEnabled
                        ? 'focus:bg-gray-800 ring-gray-700'
                        : 'focus:bg-primary-100 ring-primary-200',
                    )}
                    value={iframeSize.width}
                    type="number"
                    min={1}
                    max={9999}
                    onChange={(e) => {
                      setWidth(
                        Math.max(1, Math.min(9999, parseInt(e.target.value))),
                      );
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
                    className={twMerge(
                      'w-[38px] text-center bg-transparent outline-none rounded focus:ring-1 px-[3px] py-px [-moz-appearance]-none',
                      darkModeEnabled
                        ? 'focus:bg-gray-800 ring-gray-700'
                        : 'focus:bg-primary-100 ring-primary-200',
                    )}
                    value={iframeSize.height}
                    type="number"
                    min={1}
                    max={9999}
                    onChange={(e) => {
                      setHeight(
                        Math.max(1, Math.min(9999, parseInt(e.target.value))),
                      );
                    }}
                  />
                </div>

                <div className="flex gap-1.5">
                  <Select
                    className={twMerge(
                      'text-xs text-[13px] h-[30px] shadow-none',
                      darkModeEnabled
                        ? 'border-gray-800 hover:border-gray-700 focus:border-gray-700'
                        : 'border-white hover:border-primary-100 focus:border-gray-200',
                    )}
                    itemClassName="text-[13px]"
                    options={scales}
                    defaultValue={scales[0].value}
                    value={`${scale}`}
                    variant={darkModeEnabled ? 'dark' : 'light'}
                    onValueChange={(val) => {
                      const value = Number(val);

                      setScale(value);
                    }}
                  />

                  <Tooltip
                    content="Toggle dark mode"
                    variant={darkModeEnabled ? 'dark' : 'light'}
                  >
                    <Button
                      onClick={() => {
                        setDarkModeEnabled(!darkModeEnabled);
                      }}
                      variant={darkModeEnabled ? 'dark' : 'white'}
                      iconOnly
                    >
                      {darkModeEnabled ? <Sun size={18} /> : <Moon size={18} />}
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
          className={twJoin(
            'absolute right-0 transition-transform bg-white h-full flex flex-col shrink-0 border-l border-gray-100 py-2 overflow-y-auto w-96',
            rightPanelVisible ? 'translate-x-0' : 'translate-x-full',
          )}
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
