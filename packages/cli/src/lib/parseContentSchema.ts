import type { ContentSchemaInput } from 'types/api';
import type { DefineContentSchema } from 'types/schemas';
import { schemaFieldTypeMapping } from './schemaFieldTypeMapping';

const formatField = (field: DefineContentSchema['fields'][number]) => ({
  ...field,
  preview: undefined,
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
    const subschemas = input.subschemas?.map((subschema) => ({
      ...subschema,
      fields: Object.entries(subschema.fields).map(([name, field]: any) =>
        formatField({ ...field, name }),
      ),
    }));

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
