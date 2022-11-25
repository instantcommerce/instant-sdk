import { useEffect, useRef } from 'react';

type InstantEvent = 'addToCart' | 'checkout' | 'loadPage' | 'updateCartLine';

export const useEventListener = (
  event: InstantEvent,
  listener: (ev: Event) => any,
  options?: AddEventListenerOptions,
) => {
  const savedListener = useRef<EventListener>(listener);
  const cleanup = useRef(() => {});

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    /** Convert `addToCart` to `instantAddToCart` */
    const eventName = `instant${event.charAt(0).toUpperCase()}${event.slice(
      1,
    )}`;

    window.addEventListener(eventName, savedListener.current, options);

    cleanup.current = () => {
      window.removeEventListener(eventName, savedListener.current, options);
    };

    return cleanup.current;
  }, [event, options]);

  return cleanup.current;
};
