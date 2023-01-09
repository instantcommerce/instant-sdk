import {
  DefineContentSchema,
  DefineCustomizerSchema,
  SchemaFieldType,
} from 'types/schemas';

export const schemaFieldTypeMapping: Record<
  | DefineContentSchema['fields'][number]['type']
  | DefineCustomizerSchema['fields'][number]['type'],
  SchemaFieldType
> = {
  color: SchemaFieldType.COLOR,
  date: SchemaFieldType.DATE,
  image: SchemaFieldType.IMAGE,
  link: SchemaFieldType.LINK,
  number: SchemaFieldType.NUMBER,
  richText: SchemaFieldType.RICH_TEXT,
  select: SchemaFieldType.SELECT,
  subschema: SchemaFieldType.SUBSCHEMA,
  text: SchemaFieldType.TEXT,
  toggle: SchemaFieldType.TOGGLE,
};
