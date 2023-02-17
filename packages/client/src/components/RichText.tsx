import { HTMLProps } from 'react';
import {
  RenderOptions,
  NODE_HEADING,
  NODE_CODEBLOCK,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_OL,
  NODE_UL,
  NODE_LI,
  NODE_HR,
  NODE_BR,
  NODE_IMAGE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKE,
  MARK_UNDERLINE,
  MARK_CODE,
  MARK_LINK,
  MARK_STYLED,
} from 'storyblok-rich-text-react-renderer';
import { createRemoteReactComponent } from './createRemoteReactComponent';

export {
  NODE_HEADING,
  NODE_CODEBLOCK,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_OL,
  NODE_UL,
  NODE_LI,
  NODE_HR,
  NODE_BR,
  NODE_IMAGE,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKE,
  MARK_UNDERLINE,
  MARK_CODE,
  MARK_LINK,
  MARK_STYLED,
};

export interface RichTextProps
  extends RenderOptions,
    HTMLProps<HTMLDivElement> {
  value: any;
}

export const RichText = createRemoteReactComponent<'RichText', RichTextProps>(
  'RichText',
);
