import { createElement, ReactElement, ReactNode } from 'react';
import { render as remoteRender, RemoteRoot } from '@remote-ui/react';
import { Narrow } from 'ts-toolbelt/out/Function/Narrow';
/** This relative import forces types from this package to be included in this bundle */
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

function render(
  callback: RenderCallback,
  contentSchema?: DefineContentSchema,
  customizerSchema?: DefineCustomizerSchema,
) {
  (self as any).render(callback, contentSchema, customizerSchema);
}

type DefineBlockParams = {
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
};

export const defineBlock = <T>(params: Narrow<T>) => {
  const {
    component,
    preview: { decorators } = {},
    customizerSchema,
    contentSchema,
  } = params as DefineBlockParams;

  render(
    (root, blockProps) => {
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
    },
    contentSchema,
    customizerSchema,
  );

  return params;
};

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export type LinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      linktype?: 'story';
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      linktype?: 'asset' | 'url';
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: 'email';
      [k: string]: any;
    };

export interface RichTextStoryblok {
  content?: RichTextStoryblok[];
  marks?: RichTextStoryblok[];
  attrs?: any;
  text?: string;
  type: string;
}

type ContentFieldValues<
  C extends DefineContentSchema<
    C['subschemas'] extends { subschemas: any } ? C['subschemas'] : {}
  >,
  T extends C['fields'][keyof C['fields']],
  S extends C['subschemas'],
> = T extends {
  type: 'image';
}
  ? AssetStoryblok
  : T extends {
      type: 'link';
    }
  ? LinkStoryblok
  : T extends {
      type: 'richText';
    }
  ? RichTextStoryblok
  : T extends {
      type: 'select';
    }
  ? T['options'][number]['value']
  : T extends {
      type: 'subschema';
    }
  ? ContentSubschema<C, T, S>
  : string;

type ContentSubschema<
  C extends DefineContentSchema<
    C['subschemas'] extends { subschemas: any } ? C['subschemas'] : {}
  >,
  T extends C['fields'][keyof C['fields']],
  S extends C['subschemas'],
  A extends keyof S = keyof S,
> = {
  subschema: A;
  value: ContentSubschemaValues<C, T, S, A>;
}[];

type ContentSubschemaValues<
  C extends DefineContentSchema<
    C['subschemas'] extends { subschemas: any } ? C['subschemas'] : {}
  >,
  T extends C['fields'][keyof C['fields']],
  S extends C['subschemas'],
  A extends keyof S,
  B extends keyof S[A] = keyof S[A],
  D = S[A][B],
> = {
  [K in keyof D]: D[K]; // ContentFieldValues<C, S[A]['fields'][K], S>;
};

type ContentFields<
  T extends DefineContentSchema<
    T['subschemas'] extends { subschemas: any } ? T['subschemas'] : {}
  >,
> = {
  [name in keyof T['fields']]: T['fields'][name] extends {
    isRequired: true;
  }
    ? ContentFieldValues<T, T['fields'][name], T['subschemas']>
    : ContentFieldValues<T, T['fields'][name], T['subschemas']> | undefined;
};

type CustomizerFieldValues<
  T extends DefineCustomizerSchema['fields'][keyof DefineCustomizerSchema['fields']],
> = T extends {
  type: 'number';
}
  ? number
  : T extends {
      type: 'toggle';
    }
  ? boolean
  : T extends {
      type: 'select';
    }
  ? T['options'][number]['value']
  : string;

type CustomizerFields<T extends DefineCustomizerSchema['fields']> = {
  [name in keyof T]: T[name] extends {
    isRequired: true;
  }
    ? CustomizerFieldValues<T[name]>
    : CustomizerFieldValues<T[name]> | undefined;
};

export interface InferBlockState<T extends DefineBlockParams> {
  content: T['contentSchema'] extends { fields: any }
    ? ContentFields<T['contentSchema']>
    : {};
  customizer: T['customizerSchema'] extends { fields: any }
    ? CustomizerFields<T['customizerSchema']['fields']>
    : {};
}
