import humanizeString from 'humanize-string';
import type { ContentSchemaInput } from 'types/api';
import type { DefineContentSchema } from 'types/schemas';

import { schemaFieldTypeMapping } from './schemaFieldTypeMapping';

const formatField = (
  field: DefineContentSchema['fields'][number] & { name: string },
) => ({
  ...field,
  label: field.label || humanizeString(field.name),
  type: schemaFieldTypeMapping[field.type],
  /** Set optional booleans */
  isRequired: !!field.isRequired,
  isTranslatable: !!field.isTranslatable,
  ...(field.type === 'date'
    ? {
        withTime: !!field.withTime,
      }
    : {}),
});

/**
 * Convert contentSchema from format used by defineBlock,
 * to format expected by the API.
 */
export const parseContentSchema = (
  input: DefineContentSchema,
  blockName: string,
): ContentSchemaInput => {
  try {
    const fields = Object.entries(input.fields).map(([name, field]: any) =>
      formatField({ ...field, name }),
    );
    const subschemas = Object.entries(input.subschemas || {})?.map(
      ([subschemaName, subschema]) => ({
        ...subschema,
        name: subschemaName,
        fields: Object.entries(subschema.fields).map(([name, field]: any) =>
          formatField({ ...field, name }),
        ),
      }),
    );

    /** @todo remove when API type is correct */
    // @ts-ignore
    return {
      name: blockName,
      ...input,
      fields,
      subschemas,
    };
  } catch (err) {
    throw new Error(
      `Failed to parse content schema: ${err?.toString?.() || 'Unknown error'}`,
    );
  }
};
