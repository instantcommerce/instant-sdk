import { ComponentType } from 'react';

export const createRemoteReactComponent = <
  Type extends string,
  Props = Record<string, never>,
>(
  componentType: Type,
): ComponentType<Props> => {
  const globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : global;

  return (
    globalObject.__internal_create_remote_component
      ? globalObject.__internal_create_remote_component(componentType)
      : componentType
  ) as any;
};
