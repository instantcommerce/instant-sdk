import { Fragment } from 'react';
import { CaretRight } from 'phosphor-react';
import { Button } from '../..';

interface BreadcrumbsProps {
  blockName?: string;
  breadCrumbs: { label: string; value: string }[];
  subschema?: string;
  setSubschema(val: string | null): void;
}

export const BreadCrumbs = ({
  blockName,
  breadCrumbs = [],
  subschema,
  setSubschema,
}: BreadcrumbsProps) => {
  return (
    <div className="flex items-center mb-5 gap-1">
      <Button variant="unstyled" onClick={() => setSubschema(null)}>
        {blockName}
      </Button>

      {!!breadCrumbs?.length && <CaretRight size={12} />}

      {breadCrumbs?.map((item, idx) =>
        idx < breadCrumbs?.length - 1 ? (
          <Fragment key={`${item}-${idx}`}>
            <Button
              variant="unstyled"
              onClick={() => {
                const schemaPath = subschema?.split('.') || [];
                const idx = schemaPath.findIndex((a) => a === item.value);
                const newSchema = schemaPath.slice(0, idx + 2);

                setSubschema(newSchema.join('.'));
              }}
            >
              {item.label}
            </Button>

            <CaretRight size={12} />
          </Fragment>
        ) : (
          <span key={`${item}-${idx}`}>{item.label}</span>
        ),
      )}
    </div>
  );
};
