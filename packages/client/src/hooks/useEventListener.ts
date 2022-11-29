import { useEffect, useRef } from 'react';

type InstantEventType =
  | 'addToCart'
  | 'checkout'
  | 'loadPage'
  | 'updateCartLine';

interface InstantEvent
  extends Omit<
    Event,
    'preventDefault' | 'stopPropagation' | 'stopImmediatePropagation'
  > {}

export const useEventListener = (
  event: InstantEventType,
  listener: (ev: InstantEvent) => any,
  options?: AddEventListenerOptions & { preventDefault?: boolean },
) => {
  const savedListener = useRef<EventListener>(listener);
  const cleanup = useRef(() => {});

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    if (typeof self === 'undefined') {
      return;
    }

    /** Convert `addToCart` to `instantAddToCart` */
    const eventName = `instant${event.charAt(0).toUpperCase()}${event.slice(
      1,
    )}`;

    (self as any).addInstantEventListener(
      eventName,
      savedListener.current,
      options,
    );

    cleanup.current = () => {
      (self as any).removeInstantEventListener(
        eventName,
        savedListener.current,
        options,
      );
    };

    return cleanup.current;
  }, [event, options]);

  return cleanup.current;
};
