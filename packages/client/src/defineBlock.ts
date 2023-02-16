import { createElement, ReactElement, ReactNode } from 'react';

/** This relative import forces types from this package to be included in this bundle */
import { BlockSubtype, BlockType } from '../../types/api';
import {
  DefineContentSchema,
  DefineCustomizerSchema,
} from '../../types/schemas';

import { BlockProvider } from './BlockProvider';

interface DefineSectionParams {
  /** React component rendered by the block */
  component: () => ReactElement;
  preview?: {
    /** Wrap the block in one or more decorators for previewing */
    decorators?: Array<(component: ReactElement) => ReactNode>;
  };
  /** The customizer schema that can be filled in within the admin's customizer */
  customizerSchema?: DefineCustomizerSchema;
  /** The content schema that is synced to the CMS */
  contentSchema?: DefineContentSchema;
}

// type DefineComponentParams = Omit<DefineSectionParams, 'contentSchema'>;

type DefinePageParams = Omit<DefineSectionParams, 'contentSchema'>;

const renderFunction =
  (
    component: DefineSectionParams['component'],
    decorators: NonNullable<DefineSectionParams['preview']>['decorators'],
    type: BlockType,
    subtype?: BlockSubtype,
  ) =>
  (blockProps: any) => {
    const renderedComponent =
      typeof component === 'function'
        ? createElement(component as any)
        : component;

    const result =
      decorators?.reduce((total, decorator) => {
        return decorator(total);
      }, renderedComponent as any) || renderedComponent;

    return createElement(BlockProvider, {
      children: result,
      blockProps: {
        ...(blockProps || {}),
        type,
        subtype,
      },
    });
  };

export const defineSection = ({
  component,
  preview: { decorators } = {},
  customizerSchema,
  contentSchema,
}: DefineSectionParams) => {
  const type = BlockType.Section;

  return {
    render: renderFunction(component, decorators, type),
    contentSchema,
    customizerSchema,
    type,
  };
};

/** @deprecated Use `defineSection` instead */
export const defineBlock = defineSection;

/** @todo enable when implemented */
// export const defineComponent = ({
//   component,
//   preview: { decorators } = {},
//   customizerSchema,
// }: DefineComponentParams) => {
//   const type = BlockType.Component;
//   const subtype = BlockSubtype.CartSidebar;

//   return {
//     render: renderFunction(component, decorators, type, subtype),
//     customizerSchema,
//     type,
//     subtype,
//   };
// };

export const definePage = ({
  component,
  preview: { decorators } = {},
  customizerSchema,
}: DefinePageParams) => {
  const type = BlockType.Page;
  const subtype = BlockSubtype.Pdp;

  return {
    render: renderFunction(component, decorators, type, subtype),
    customizerSchema,
    type,
    subtype,
  };
};
