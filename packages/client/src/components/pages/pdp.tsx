import { ComponentType, createElement, ReactNode } from 'react';
import { useBlockContext } from 'src/BlockProvider';

function createComponentWrapper<T, P>(componentType: T): T {
  return function ComponentWrapper({ children }: any) {
    const { components } = useBlockContext();
    const element = components?.[componentType as any] as any;

    const [Component, props]: [ComponentType, P] =
      (Array.isArray(element) ? (element as any) : [element, {}]) || [];

    if (!Component) {
      return null;
    }

    if (typeof Component === 'function') {
      return createElement(Component, props || {}, children);
    }

    return Component;
  } as any;
}

const createRemoteReactComponent = <
  Type extends string,
  Props = Record<string, never>,
>(
  componentType: Type,
): ComponentType<Props> => {
  const wrapper = createComponentWrapper<Type, Props>(componentType) as any;
  wrapper.displayName = componentType;
  return wrapper;
};

export const Container = createRemoteReactComponent<
  'Container',
  { children: ReactNode }
>('Container');
export const ColumnGallery = createRemoteReactComponent<
  'ColumnGallery',
  { children: ReactNode }
>('ColumnGallery');
export const Gallery = createRemoteReactComponent<'Gallery'>('Gallery');
export const ColumnMain = createRemoteReactComponent<
  'ColumnMain',
  { children: ReactNode }
>('ColumnMain');
export const Form = createRemoteReactComponent<'Form', { children: ReactNode }>(
  'Form',
);
export const MainInfo = createRemoteReactComponent<'MainInfo'>('MainInfo');
export const Price = createRemoteReactComponent<'Price'>('Price');
export const Rating = createRemoteReactComponent<'Rating'>('Rating');
export const VariantSelects =
  createRemoteReactComponent<'VariantSelects'>('VariantSelects');
export const SellingPlans =
  createRemoteReactComponent<'SellingPlans'>('SellingPlans');
export const NotificationMessage =
  createRemoteReactComponent<'NotificationMessage'>('NotificationMessage');
export const AddToCartSection = createRemoteReactComponent<
  'AddToCartSection',
  { children: ReactNode }
>('AddToCartSection');
export const QuantityInput =
  createRemoteReactComponent<'QuantityInput'>('QuantityInput');
export const AddToCartButtons =
  createRemoteReactComponent<'AddToCartButtons'>('AddToCartButtons');
export const PaymentIcons =
  createRemoteReactComponent<'PaymentIcons'>('PaymentIcons');
export const Details = createRemoteReactComponent<'Details'>('Details');
export const Usps = createRemoteReactComponent<'Usps'>('Usps');

export const Pdp = {
  Container,
  ColumnGallery,
  Gallery,
  ColumnMain,
  Form,
  MainInfo,
  Price,
  Rating,
  VariantSelects,
  SellingPlans,
  NotificationMessage,
  AddToCartSection,
  QuantityInput,
  AddToCartButtons,
  PaymentIcons,
  Details,
  Usps,
};
