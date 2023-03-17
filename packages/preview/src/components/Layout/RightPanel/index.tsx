import { ChangeEvent, Fragment, ReactNode, useState } from 'react';
import { useMemo } from 'react';
import humanizeString from 'humanize-string';
import get from 'lodash/get';
import { Faders, Image, WarningCircle, Trash, Plus } from 'phosphor-react';
import { twJoin } from 'tailwind-merge';
import {
  Button,
  StatusMessage,
  useConfig,
  ImageInput,
  Input,
  Select,
  Tabs,
  useBlocks,
  RichText,
  Modal,
  ColorInput,
  Toggle,
} from '../..';
import {
  BlockContentSchema,
  BlockCustomizerSchema,
  SchemaTypes,
} from '../../BlocksProvider/context';
import { BreadCrumbs } from './Breadcrumbs';

const tabs = [
  {
    title: 'Customizer',
    value: 'customizerSchema',
  },
  {
    title: 'Content',
    value: 'contentSchema',
  },
];

export const RightPanel = () => {
  const { selectedBlock, blocksManifest, setPreviewValue, previewValues } =
    useBlocks();
  const [addFieldModalOpen, setAddFieldModalOpen] = useState<
    Extract<BlockContentSchema['fields'][number], { type: 'subschema' }> | false
  >(false);
  const [subschema, setSubschema] = useState<string | null>(null);

  const { rightPanelVisible } = useConfig();

  const blockSubschemas = useMemo(
    () =>
      selectedBlock
        ? blocksManifest?.[selectedBlock]?.contentSchema?.subschemas
        : [],
    [selectedBlock, blocksManifest],
  );

  const subschemas = useMemo(
    () =>
      blockSubschemas?.reduce((acc, curr) => {
        acc[curr.name] = curr;

        return acc;
      }, {} as any),
    [blockSubschemas],
  );

  const getSubschemaDisplayName = (subschema: string) =>
    subschemas?.[subschema]?.displayName || humanizeString(subschema);

  const getPreviewContent = (subschemaField: string) =>
    get(
      selectedBlock ? previewValues?.[selectedBlock]?.content : {},
      subschemaField || '',
    );

  const breadCrumbs = useMemo(() => {
    const paths = subschema?.split('.');
    const breadCrumbs: { label: string; value: string }[] = [];

    if (paths) {
      for (let i = 0; i < paths.length; i += 1) {
        const label = getSubschemaDisplayName(
          (getPreviewContent(paths.slice(0, i + 2).join('.')) as any)
            ?.subschema,
        );

        if (i === paths.length - 2) {
          breadCrumbs.push({
            label,
            value: paths[i],
          });
          i += 1;
        } else {
          breadCrumbs.push({
            label,
            value: paths[i],
          });
          i += 2;
        }
      }
    }

    return breadCrumbs;
  }, [subschema]);

  const addPreviewItem = (subschemaField: string, item: string) => {
    if (subschemaField) {
      setPreviewValue('content', subschemaField, [
        ...(getPreviewContent(subschemaField) || []),
        { subschema: item },
      ]);
    }
  };

  const removePreviewItem = (subschemaField: string, idx: number) => {
    if (subschemaField) {
      const currentValues = [...(getPreviewContent(subschemaField) || [])];

      if (currentValues?.length) {
        currentValues.splice(idx, 1);
        setPreviewValue('content', subschemaField, currentValues);
      }
    }
  };

  const renderField = (
    schema: SchemaTypes,
    field:
      | BlockContentSchema['fields'][number]
      | BlockCustomizerSchema['fields'][number],
    layer: number = 1,
  ) => {
    const fieldPath = field.name.split('.');
    const fieldName = fieldPath[fieldPath.length - 1];

    const baseProps = {
      label: field.label || humanizeString(field.name),
      key: field.name,
      id: field.name,
      name: field.name,
      defaultValue:
        typeof field.preview === 'object'
          ? field.preview?.[fieldName]
          : field.preview,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setPreviewValue(schema, field.name, e.target.value);
      },
    };

    switch (field.type) {
      case 'text':
        return (
          <Input
            {...baseProps}
            direction={layer <= 1 ? 'row' : 'col'}
            maxLength={field.maxLength !== null ? field.maxLength : undefined}
          />
        );

      case 'color':
        return (
          <ColorInput
            {...baseProps}
            direction={layer <= 1 ? 'row' : 'col'}
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
            direction={layer <= 1 ? 'row' : 'col'}
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'toggle':
        return (
          <Toggle
            {...baseProps}
            defaultValue={undefined}
            onChange={undefined}
            direction={layer <= 1 ? 'row' : 'col'}
            defaultChecked={baseProps.defaultValue}
            onCheckedChange={(checked) => {
              setPreviewValue(schema, field.name, checked);
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
            type={field.withTime ? 'datetime-local' : 'date'}
            {...baseProps}
            direction={layer <= 1 ? 'row' : 'col'}
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
            direction={layer <= 1 ? 'row' : 'col'}
          />
        );

      case 'richText':
        return (
          <RichText
            {...baseProps}
            onChange={(value: string) => {
              setPreviewValue(schema, field.name, value);
            }}
          />
        );

      case 'subschema': {
        const fieldPreview: any[] = selectedBlock
          ? (get(
              previewValues?.[selectedBlock]?.content,
              field.name,
              [],
            ) as any[])
          : [];

        return (
          <div className="flex flex-col gap-1.5">
            <div className="w-full flex justify-between items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium">
                {baseProps.label}
              </span>
            </div>

            <div
              className={twJoin(
                'flex flex-col gap-2',
                'rounded p-2 border border-gray-300',
              )}
            >
              {fieldPreview.length ? (
                fieldPreview.map((f, idx) => {
                  const renderedSubschema = subschemas?.[f.subschema];

                  return (
                    <Button
                      key={`${idx}-${f.name}`}
                      variant="unstyled"
                      className="bg-gray-100 text-gray-900 h-[30px] px-1.5 rounded flex items-center justify-between text-xs"
                      onClick={() => {
                        setSubschema(`${field.name}.${idx}`);
                      }}
                    >
                      {renderedSubschema.displayName ||
                        humanizeString(renderedSubschema.name)}

                      <Button
                        variant="unstyled"
                        iconOnly
                        onClick={(e) => {
                          e.stopPropagation();
                          removePreviewItem(field.name, idx);
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                    </Button>
                  );
                })
              ) : (
                <div>No items</div>
              )}

              {(!fieldPreview?.length ||
                !field.max ||
                fieldPreview.length < field.max) && (
                <Button
                  variant="secondary"
                  className="bg-primary-100 border-primary-300 text-primary-500 flex items-center justify-center mt-2"
                  onClick={() => {
                    if (field.allowed.length === 1) {
                      addPreviewItem(field.name, field.allowed[0]);
                    } else {
                      setAddFieldModalOpen(field);
                    }
                  }}
                >
                  <Plus size={14} /> Element
                </Button>
              )}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const renderGroupName = (
    field:
      | BlockContentSchema['fields'][number]
      | BlockCustomizerSchema['fields'][number],
    previousField:
      | BlockContentSchema['fields'][number]
      | BlockCustomizerSchema['fields'][number],
  ) => {
    if (
      (!previousField && 'groupName' in field && field.groupName) ||
      (previousField &&
        'groupName' in previousField &&
        'groupName' in field &&
        previousField?.groupName !== field.groupName)
    ) {
      return (
        <div className="text-sm w-full border-b border-gray-100 text-gray-700 pb-2 font-medium">
          {field.groupName}
        </div>
      );
    }

    return null;
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
          const subschemaPreviewValue = get(
            previewValues?.[selectedBlock]?.content,
            subschema!,
            '',
          ) as any;
          const currentSubschema =
            subschemas?.[subschemaPreviewValue.subschema];

          if (type === 'content' && subschema && currentSubschema) {
            content = (
              <div className="text-xs">
                <BreadCrumbs
                  blockName={blocksManifest?.[selectedBlock]?.name}
                  breadCrumbs={breadCrumbs}
                  subschema={subschema}
                  setSubschema={setSubschema}
                />

                <div className="text-gray-500 mb-3">
                  {breadCrumbs[breadCrumbs.length - 1].label}
                </div>

                <div className="bg-white rounded-lg border border-gray-300 p-2 flex flex-col gap-4">
                  {currentSubschema?.fields.map(
                    (f: any, index: number, array: any[]) => {
                      return (
                        <Fragment key={f.name}>
                          {renderField(
                            'content',
                            {
                              ...f,
                              name: [subschema, 'value', f.name].join('.'),
                              preview: subschemaPreviewValue.value?.[f.name],
                            },
                            2,
                          )}
                        </Fragment>
                      );
                    },
                  )}
                </div>
              </div>
            );
          } else if (type === 'customizer') {
            const customizerSchema = schema as BlockCustomizerSchema;
            const groupedFields = customizerSchema.fields.filter(
              (field: any) => field.groupName,
            );
            const ungroupedFields = customizerSchema?.fields
              ?.filter((field) => !field.groupName)
              .map((field) => ({ groupName: 'Miscellaneous', ...field }));

            content = [...groupedFields, ...ungroupedFields].map(
              (field: any, index: number, array: any[]) => (
                <Fragment key={field.name}>
                  {renderGroupName(field, index > 0 ? array[index - 1] : null)}
                  {renderField(type, field)}
                </Fragment>
              ),
            );
          } else {
            content = schema.fields.map((field: any) => (
              <Fragment key={field.name}>{renderField(type, field)}</Fragment>
            ));
          }
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
    [selectedBlock, blocksManifest, subschema, previewValues],
  );

  const customizerSchema = useMemo(
    () =>
      renderSchema({
        type: 'customizer',
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
    [selectedBlock, blocksManifest, subschema, previewValues],
  );

  return (
    <>
      <Modal
        open={!!addFieldModalOpen}
        title="Insert element"
        onOpenChange={(open) => {
          if (!open) {
            setAddFieldModalOpen(false);
          }
        }}
      >
        {!!addFieldModalOpen && (
          <>
            {!!addFieldModalOpen?.allowed?.length ? (
              addFieldModalOpen.allowed.map((allowed, i) => (
                <Button
                  key={`${allowed}-${i}`}
                  onClick={() => {
                    if (addFieldModalOpen) {
                      addPreviewItem(addFieldModalOpen.name, allowed);
                    }

                    setAddFieldModalOpen(false);
                  }}
                  variant="unstyled"
                  className="p-3 text-sm text-gray-700 rounded border border-gray-300 shadow-sm h-auto font-medium hover:text-primary-700 hover:bg-primary-100 hover:border-primary-500 transition-colors"
                >
                  {allowed.charAt(0).toUpperCase()}
                  {allowed.slice(1)}
                </Button>
              ))
            ) : (
              <p>Add allowed subschema(s) in the field</p>
            )}
          </>
        )}
      </Modal>

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
    </>
  );
};
