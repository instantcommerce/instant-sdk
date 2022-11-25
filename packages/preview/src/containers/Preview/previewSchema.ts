import { SchemaTypes } from '../../components/BlocksProvider/context';

/** @todo get from codegen backend */
enum SchemaFieldType {
  DATE = 'DATE',
  IMAGE = 'IMAGE',
  RICH_TEXT = 'RICH_TEXT',
  SELECT = 'SELECT',
  TEXT = 'TEXT',
  URL = 'URL',
}

const FIELD_PREVIEWS = {
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
  [SchemaFieldType.TEXT]: 'Lorem ipsum dolor sit amet',
  [SchemaFieldType.URL]: {
    id: '',
    url: '#',
    linktype: 'url',
    fieldtype: 'multilink',
  },
};

export const previewSchema = (
  schemaType: SchemaTypes,
  schema: any,
  previewValues?: Record<SchemaTypes, Record<string, string>>,
) =>
  schema.fields.reduce((data: any, field: any) => {
    data[field.name] =
      previewValues?.[schemaType]?.[field.name] ||
      field.preview ||
      FIELD_PREVIEWS[field.type as SchemaFieldType];

    return data;
  }, {} as any);
