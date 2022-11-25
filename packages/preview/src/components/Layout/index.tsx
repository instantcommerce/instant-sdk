import { ChangeEvent, ReactNode } from 'react';
import { useMemo } from 'react';
import { ArrowsInSimple, CaretCircleDoubleLeft, Moon } from 'phosphor-react';
import { twJoin } from 'tailwind-merge';
import {
  Button,
  ColorInput,
  useConfig,
  Input,
  InputGroup,
  Select,
  Slider,
  Tabs,
  Toggle,
  ToggleGroup,
  Tooltip,
  useBlocks,
  screenSizes,
} from '..';
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
  const {
    rightPanelVisible,
    darkModeEnabled,
    setDarkModeEnabled,
    leftPanelVisible,
    setLeftPanelVisible,
    setScreenSize,
    updateConfig,
    params,
    getUrl,
  } = useConfig();

  const contentSchema = useMemo(
    () => (
      <div className="px-3 py-6">
        {blocksManifest?.[selectedBlock]?.contentSchema?.fields?.map(
          (field) => {
            const baseProps = {
              label: field.name,
              direction: 'row',
              key: field.name,
              defaultValue: field.preview,
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setPreviewValue('content', field.name, e.target.value);
              },
            };
            switch (field.type) {
              case 'TEXT':
                return <Input {...baseProps} />;

              default:
                return <Input {...baseProps} />;
            }
          },
        )}
      </div>
    ),
    [selectedBlock, blocksManifest],
  );

  const customizerSchema = useMemo(
    () => (
      <div className="flex flex-col gap-5 pt-2 pb-6">
        <InputGroup title="Input group">
          {blocksManifest?.[selectedBlock]?.customizerSchema?.fields?.map(
            (field) => {
              const baseProps = {
                label: field.name,
                direction: 'row',
                key: field.name,
                defaultValue: field.preview,
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setPreviewValue('customizer', field.name, e.target.value);
                },
              };

              switch (field.name) {
                case 'textColor':
                  return <ColorInput {...baseProps} />;

                default:
                  return <Input {...baseProps} />;
              }
            },
          )}
        </InputGroup>

        <InputGroup title="Dummy inputs">
          <Input label="Label" />
          <Input label="Label2" />
          <Select items={['test', 'test2']} label="Label" direction="row" />
          <ToggleGroup
            options={['option1', 'option2']}
            label="Label"
            direction="row"
          />
        </InputGroup>

        <InputGroup title="Dummy inputs 2">
          <ColorInput label="Overlay color" color="Gray-300" />
          <Toggle
            label="Image overlay"
            info="Turn the overlay hover effect on or off which will help separating content from the background."
          />

          <Slider
            label="Overlay opacity"
            info="With this slider you can adjust the overlay opacity"
          />
        </InputGroup>
      </div>
    ),
    [selectedBlock, blocksManifest],
  );

  return (
    <div className="flex flex-1 flex-col w-full">
      {params?.viewMode === 'fullScreen' ? (
        <div className="h-full w-full max-w-[calc(100%-40px)] max-h-[calc(100%-60px)] overflow-auto flex items-center mb-5 mr-5 ml-5">
          {children}
        </div>
      ) : (
        <>
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
                rightPanelVisible ? 'pr-80' : 'pr-4',
                leftPanelVisible ? 'pl-[12.5rem]' : 'pl-4',
                'flex flex-row flex-1 min-w-0',
              )}
            >
              <div className="flex flex-col flex-1 min-w-0">
                <div className="sticky top-12 z-50 flex items-center justify-between p-2">
                  <div className="flex gap-1.5">
                    <Button
                      onClick={() => {
                        updateConfig({ leftPanel: !leftPanelVisible });
                        setLeftPanelVisible(!leftPanelVisible);
                      }}
                      variant={darkModeEnabled ? 'dark' : 'white'}
                      iconOnly
                    >
                      <CaretCircleDoubleLeft size={16} />
                    </Button>

                    <Select
                      items={screenSizes}
                      defaultValue={screenSizes[0].value}
                      variant={darkModeEnabled ? 'dark' : 'light'}
                      onValueChange={setScreenSize}
                    />
                  </div>

                  <div className="flex gap-1.5">
                    <Button
                      to={
                        params?.scale === '50'
                          ? getUrl({ scale: undefined })
                          : getUrl({ scale: '50' })
                      }
                      variant={darkModeEnabled ? 'dark' : 'white'}
                    >
                      <ArrowsInSimple size={16} />
                      {params?.scale === '50' ? '100%' : '50%'}
                    </Button>

                    <Tooltip content="Toggle dark mode">
                      <Button
                        onClick={() => {
                          updateConfig({ darkMode: !darkModeEnabled });
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

                <div className="h-full w-full max-w-[calc(100%-40px)] max-h-[calc(100%-60px)] overflow-auto flex items-center mb-5 mr-5 ml-5">
                  {children}
                </div>
              </div>
            </main>

            <aside
              className={`${
                rightPanelVisible ? 'translate-x-0' : 'translate-x-full'
              } absolute right-0 transition-transform bg-white h-full flex flex-col shrink-0 w-80 border-l border-gray-100 py-2`}
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
        </>
      )}
    </div>
  );
};
