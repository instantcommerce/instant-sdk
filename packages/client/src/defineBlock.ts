import { createElement, ReactElement, ReactNode } from 'react';
import { render as remoteRender, RemoteRoot } from '@remote-ui/react';

/** This relative import forces types from this package to be included in this bundle */
import { BlockType } from '../../types/api';
import {
  DefineContentSchema,
  DefineCustomizerSchema,
} from '../../types/schemas';

import { BlockProvider } from './BlockProvider';
import { BlockContextValue } from './BlockProvider/context';

export type RenderCallback = (
  element: RemoteRoot,
  blockProps: BlockContextValue,
) => void;

export type RenderElement = Parameters<typeof remoteRender>[0];

interface DefineSectionParams {
  /** React component rendered by the block */
  component: () => RenderElement | ReactElement;
  preview?: {
    /** Wrap the block in one or more decorators for previewing */
    decorators?: Array<(component: ReactElement) => ReactNode>;
  };
  /** The customizer schema that can be filled in within the admin's customizer */
  customizerSchema?: DefineCustomizerSchema;
  /** The content schema that is synced to the CMS */
  contentSchema?: DefineContentSchema;
}

type DefineComponentParams = Omit<DefineSectionParams, 'contentSchema'>;

type DefinePageParams = Omit<DefineSectionParams, 'contentSchema'>;

const renderFunction =
  (
    component: DefineSectionParams['component'],
    decorators: NonNullable<DefineSectionParams['preview']>['decorators'],
  ) =>
  (blockProps) => {
    const renderedComponent =
      typeof component === 'function' ? createElement(component) : component;

    const result =
      decorators?.reduce((total, decorator) => {
        return decorator(total);
      }, renderedComponent as any) || renderedComponent;

    return createElement(BlockProvider, {
      children: result,
      blockProps,
    });
  };

export const defineSection = ({
  component,
  preview: { decorators } = {},
  customizerSchema,
  contentSchema,
}: DefineSectionParams) => ({
  render: renderFunction(component, decorators),
  contentSchema,
  customizerSchema,
  type: BlockType.Section,
});

/** @deprecated Use `defineSection` instead */
export const defineBlock = defineSection;

export const defineComponent = ({
  component,
  preview: { decorators } = {},
  customizerSchema,
}: DefineComponentParams) => ({
  render: renderFunction(component, decorators),
  customizerSchema,
  type: BlockType.Component,
});

export const definePage = ({
  component,
  preview: { decorators } = {},
  customizerSchema,
}: DefinePageParams) => ({
  render: renderFunction(component, decorators),
  customizerSchema,
  type: BlockType.Page,
});
