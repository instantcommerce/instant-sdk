import {
  ContentSchemaInputField,
  CustomizerSchemaInputField,
} from 'types/schemas';
import { SchemaTypes } from '../../components/BlocksProvider/context';

type FieldType =
  | ContentSchemaInputField['type']
  | CustomizerSchemaInputField['type'];

const FIELD_PREVIEWS: Record<FieldType, any> = {
  color: '#CCCCCC',
  date: '2022-03-08T12:49:54.540Z',
  image:
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80',
  link: '#',
  number: '1234',
  richText: {
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
  select: 'Lorem',
  subschema: [],
  text: 'Lorem ipsum dolor sit amet',
  toggle: true,
};

const formatFieldValue = (type: FieldType, value: any, schema: any) => {
  switch (type) {
    case 'image': {
      return {
        id: 123,
        alt: 'Alt text',
        name: 'Name',
        focus: null,
        title: 'Title',
        filename: value,
        copyright: '',
        fieldtype: 'asset',
      };
    }
    case 'link': {
      return {
        id: '',
        url: value,
        linktype: 'url',
        fieldtype: 'multilink',
      };
    }
    case 'richText': {
      if (typeof value === 'string') {
        return {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: value,
                  type: 'text',
                },
              ],
            },
          ],
        };
      }

      return value;
    }
    case 'subschema': {
      return value?.map((subschemaField: any) => {
        const subschema = schema?.subschemas?.[subschemaField.subschema];

        return {
          ...subschemaField,
          value: Object.keys(subschemaField.value || {}).reduce((all, key) => {
            all[key] = formatFieldValue(
              subschema?.fields?.[key]?.type,
              subschemaField.value[key],
              schema,
            );
            return all;
          }, {} as any),
        };
      });
    }
    default:
      return value;
  }
};

export const previewSchema = (
  schemaType: SchemaTypes,
  schema: any,
  previewValues?: Record<SchemaTypes, Record<string, string>>,
) =>
  Object.entries(schema.fields).reduce((data: any, [name, field]: any) => {
    const value = previewValues?.[schemaType]?.[name];

    data[name] = formatFieldValue(
      field.type as FieldType,
      typeof value !== 'undefined'
        ? value
        : FIELD_PREVIEWS[field.type as FieldType],
      schema,
    );

    return data;
  }, {} as any);
