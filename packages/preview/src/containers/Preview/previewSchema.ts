import {
  ContentSchemaInputField,
  CustomizerSchemaInputField,
} from 'types/schemas';
import { SchemaTypes } from '../../components/BlocksProvider/context';

type FieldType =
  | ContentSchemaInputField['type']
  | CustomizerSchemaInputField['type'];

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

    data[name] = formatFieldValue(field.type as FieldType, value, schema);

    return data;
  }, {} as any);
