import { createElement, ReactElement, ReactNode } from 'react';
import { render as remoteRender, RemoteRoot } from '@remote-ui/react';

import { BlockProvider } from './BlockProvider';
import { BlockContextValue } from './BlockProvider/context';

export type RenderCallback = (
  element: RemoteRoot,
  blockProps: BlockContextValue,
) => void;

export type RenderElement = Parameters<typeof remoteRender>[0];

function render(
  contentSchema: any,
  customizerSchema: any,
  callback: RenderCallback,
) {
  (self as any).render(contentSchema, customizerSchema, callback);
}

interface DefineBlockParams {
  title?: string;
  component: () => RenderElement | ReactElement;
  preview?: {
    decorators?: Array<(component: ReactElement) => ReactNode>;
  };
  customizerSchema?: {};
  contentSchema?: {};
}

export const defineBlock = ({
  title,
  component,
  preview: { decorators } = {},
  customizerSchema,
  contentSchema,
}: DefineBlockParams) => {
  render(contentSchema, customizerSchema, (root, blockProps) => {
    const renderedComponent =
      typeof component === 'function' ? createElement(component) : component;

    const result =
      decorators?.reduce((total, decorator) => {
        return decorator(total);
      }, renderedComponent as any) || renderedComponent;

    remoteRender(
      createElement(BlockProvider, {
        children: result,
        blockProps,
      }),
      root,
    );
  });
};
