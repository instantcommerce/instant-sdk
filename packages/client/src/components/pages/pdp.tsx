import { ComponentType } from 'react';
import { useBlockContext } from 'src/BlockProvider';

function createComponentWrapper<T>(componentType: T): T {
  return function ComponentWrapper(props: any) {
    const { components } = useBlockContext();
    const Component: ComponentType = components?.[componentType as any] as any;

    if (!components) {
      return null;
    }

    return Component;
  } as any;
}

const createRemoteReactComponent = <Type extends string>(
  componentType: Type,
): ComponentType<{}> => {
  const wrapper = createComponentWrapper(componentType) as any;
  wrapper.displayName = componentType;
  return wrapper;
};

const Gallery = createRemoteReactComponent<'Gallery'>('Gallery');

export const Pdp = { Gallery };
