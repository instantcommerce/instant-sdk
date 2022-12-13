import { Fragment } from 'react';
import { CaretRight } from 'phosphor-react';
import { Button } from '../..';

interface BreadcrumbsProps {
  blockName?: string;
  breadCrumbs: string[];
  setBreadCrumbs(val: string[]): void;
  subSchema?: string;
  setSubschema(val: string | null): void;
}

export const BreadCrumbs = ({
  blockName,
  breadCrumbs = [],
  setBreadCrumbs,
  subSchema,
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
                const schemaPath = subSchema?.split('.') || [];
                const idx = schemaPath.findIndex((a) => a === item);
                const newSchema = schemaPath.slice(0, idx + 1);

                setSubschema(newSchema.join('.'));
                setBreadCrumbs(breadCrumbs.slice(0, idx + 1));
              }}
            >
              {item}
            </Button>

            <CaretRight size={12} />
          </Fragment>
        ) : (
          <span>{item}</span>
        ),
      )}
    </div>
  );
};
