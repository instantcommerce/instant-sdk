import { HTMLProps, ReactNode } from 'react';
import { createRemoteReactComponent } from './createRemoteReactComponent';

export interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode;
  to: any;
}

export const Link = createRemoteReactComponent<'Link', LinkProps>('Link');
