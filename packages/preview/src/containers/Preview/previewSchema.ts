import { SchemaFieldType } from 'types/schemas';
import { SchemaTypes } from '../../components/BlocksProvider/context';

const FIELD_PREVIEWS = {
  [SchemaFieldType.COLOR]: '#CCCCCC',
  [SchemaFieldType.DATE]: '2022-03-08T12:49:54.540Z',
  [SchemaFieldType.IMAGE]: {
    id: 123,
    alt: 'Alt text',
    name: 'Name',
    focus: null,
    title: 'Title',
    filename:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80',
    copyright: '',
    fieldtype: 'asset',
  },
  [SchemaFieldType.LINK]: {
    id: '',
    url: '#',
    linktype: 'url',
    fieldtype: 'multilink',
  },
  [SchemaFieldType.NUMBER]: '1234',
  [SchemaFieldType.RICH_TEXT]: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            text: 'Lorem ipsum dolor',
            type: 'text',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            text: 'Sit amet, consectetur adipiscing elit. Nulla euismod neque a dolor venenatis condimentum. Aenean molestie hendrerit nisi ac auctor. Donec id aliquet lorem. Phasellus nec neque vitae libero pharetra rhoncus. Aliquam erat volutpat. Aenean mattis lorem id felis egestas, quis dapibus tortor faucibus. Nulla facilisi. ',
            type: 'text',
          },
        ],
      },
    ],
  },
  [SchemaFieldType.SELECT]: 'Lorem',
  [SchemaFieldType.SUBSCHEMA]: {},
  [SchemaFieldType.TEXT]: 'Lorem ipsum dolor sit amet',
};

export const previewSchema = (
  schemaType: SchemaTypes,
  schema: any,
  previewValues?: Record<SchemaTypes, Record<string, string>>,
) =>
  Object.entries(schema.fields).reduce((data: any, [name, field]: any) => {
    data[name] =
      previewValues?.[schemaType]?.[name] ||
      FIELD_PREVIEWS[field.type as SchemaFieldType];

    return data;
  }, {} as any);
