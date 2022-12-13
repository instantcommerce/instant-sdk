import { ChangeEvent, Fragment, ReactNode, useEffect, useState } from 'react';
import { useMemo } from 'react';
import humanizeString from 'humanize-string';
import get from 'lodash/get';
import {
  PencilSimple,
  Faders,
  Image,
  WarningCircle,
  Minus,
} from 'phosphor-react';
import { twJoin } from 'tailwind-merge';
import { DefineContentSchema, DefineCustomizerSchema } from 'types/schemas';
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
} from '../..';
import { SchemaTypes } from '../../BlocksProvider/context';
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
  const [addFieldModalOpen, setAddFieldModalOpen] = useState(false);
  const [subSchema, setSubschema] = useState<string | null>(null);
  const [allowedSchemas, setAllowedSchemas] = useState<string[]>([]);
  const [breadCrumbs, setBreadCrumbs] = useState<string[]>([]);

  const { rightPanelVisible } = useConfig();

  const blockSubschemas = selectedBlock
    ? blocksManifest?.[selectedBlock]?.contentSchema?.subschemas
    : [];

  const subschemas = useMemo(
    () =>
      blockSubschemas?.reduce((acc, curr) => {
        acc[curr.name] = curr.fields;

        return acc;
      }, {}),
    [blocksManifest, selectedBlock],
  );

  const subschemaOptions = useMemo(
    () =>
      blockSubschemas?.filter(
        (item) =>
          !allowedSchemas?.length || allowedSchemas?.includes(item.name),
      ),
    [allowedSchemas, selectedBlock, blocksManifest, subSchema],
  );

  const previewContent = get(
    previewValues?.[selectedBlock]?.content,
    subSchema || '',
  );

  useEffect(() => {
    const a = blocksManifest?.[selectedBlock].contentSchema?.fields?.find(
      (f) => f.name === subSchema,
    );

    if (a) {
      setAllowedSchemas(a.allowed);
    }
  }, [subSchema]);

  const addPreviewItem = ({ name }: { name: string }) => {
    if (subSchema) {
      setPreviewValue('content', `${subSchema}`, [
        ...(previewContent || []),
        { name },
      ]);
    }
  };

  const removePreviewItem = (idx: number) => {
    if (subSchema) {
      const currentValues = [...(previewContent || [])];

      if (currentValues?.length) {
        currentValues.splice(idx, 1);
        setPreviewValue('content', `${subSchema}`, currentValues);
      }
    }
  };

  const renderField = (
    schema: SchemaTypes,
    field:
      | DefineContentSchema['fields'][0]
      | DefineCustomizerSchema['fields'][0],
    layer: number = 1,
  ) => {
    const fieldPath = field.name.split('.');
    const fieldName = fieldPath[fieldPath.length - 1];

    const baseProps = {
      label: field.label || humanizeString(field.name),
      key: field.name,
      id: field.name,
      name: field.name,
      value: Object.keys(field.preview || []).length
        ? field.preview?.[fieldName]
        : field.preview,
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
        return <RichText {...baseProps} />;

      case 'subSchema': {
        const fieldPreview = selectedBlock
          ? get(previewValues?.[selectedBlock]?.content, field.name, [])
          : [];

        return (
          <div className="flex flex-col gap-1.5">
            <div className="w-full flex justify-between items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium">
                {fieldName}
              </span>

              <Button
                iconOnly
                variant="unstyled"
                onClick={() => {
                  setSubschema(field.name);
                  setAllowedSchemas(field.allowed);
                  setBreadCrumbs(
                    field.name
                      .split('.')
                      .filter(
                        (item) => item !== 'preview' && isNaN(Number(item)),
                      ),
                  );
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
              {fieldPreview.length ? (
                fieldPreview.map((f) => (
                  <div
                    key={f.name}
                    className="bg-gray-100 text-gray-900 h-[30px] px-1.5 rounded flex items-center text-xs"
                  >
                    {f.name}
                  </div>
                ))
              ) : (
                <div>No items</div>
              )}
            </div>
          </div>
        );
      }

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
          const subschemaPreviewValues = subSchema
            ? get(previewValues?.[selectedBlock]?.content, subSchema, [])
            : [];

          const currentSubschema = blocksManifest[
            selectedBlock
          ]?.contentSchema?.fields?.find((f) => f.name === subSchema);

          content = subSchema ? (
            <div className="text-xs">
              <BreadCrumbs
                blockName={blocksManifest?.[selectedBlock]?.name}
                breadCrumbs={breadCrumbs}
                setBreadCrumbs={setBreadCrumbs}
                subSchema={subSchema}
                setSubschema={setSubschema}
              />

              <div className="text-gray-500 mb-3">
                {breadCrumbs[breadCrumbs.length - 1]}
              </div>

              <div className="bg-gray-100 rounded-xl p-2 flex flex-col gap-2">
                {subschemaPreviewValues?.map((item, idx) => (
                  <div
                    key={item?.name}
                    className="bg-white flex flex-col gap-2 p-2 rounded-lg border border-gray-300"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="text-gray-500">{item?.name}</div>

                      <Button
                        variant="unstyled"
                        iconOnly
                        onClick={() => removePreviewItem(idx)}
                      >
                        <Minus size={16} weight="fill" color="#2E90FA" />
                      </Button>
                    </div>

                    {subschemas?.[item.name]?.map((f) => (
                      <Fragment key={f.name}>
                        {renderField(
                          'content',
                          {
                            ...f,
                            name: [subSchema, idx, 'preview', f.name].join('.'),
                            preview: item.preview,
                          },
                          2,
                        )}
                      </Fragment>
                    ))}
                  </div>
                ))}

                {(!subschemaPreviewValues?.length ||
                  subschemaPreviewValues?.length < currentSubschema?.max) && (
                  <Button
                    variant="secondary"
                    className="bg-primary-100 border-primary-300 text-primary-500 flex items-center justify-center mt-2"
                    onClick={() => {
                      subschemaOptions?.length === 1
                        ? addPreviewItem(subschemaOptions[0])
                        : setAddFieldModalOpen(true);
                    }}
                  >
                    + Element
                  </Button>
                )}
              </div>
            </div>
          ) : (
            schema?.fields?.map((field) => (
              <Fragment key={field.name}>{renderField(type, field)}</Fragment>
            ))
          );
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
    [
      selectedBlock,
      blocksManifest,
      subSchema,
      allowedSchemas,
      subschemaOptions,
      previewValues,
    ],
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
    [selectedBlock, blocksManifest],
  );

  return (
    <>
      <Modal
        open={addFieldModalOpen}
        title="Insert element"
        onOpenChange={setAddFieldModalOpen}
      >
        {subschemaOptions?.map((field, i) => (
          <Button
            key={`${field.name}-${i}`}
            onClick={() => {
              addPreviewItem(field);
              setAddFieldModalOpen(false);
            }}
            variant="unstyled"
            className="p-3 text-sm text-gray-700 rounded border border-gray-300 shadow-sm h-auto font-medium hover:text-primary-700 hover:bg-primary-100 hover:border-primary-500 transition-colors"
          >
            {field.name}
          </Button>
        ))}
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
