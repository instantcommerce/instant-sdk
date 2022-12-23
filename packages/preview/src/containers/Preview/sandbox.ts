import { retain, createRemoteRoot, RemoteChannel } from '@remote-ui/core';
import { endpoint } from '@shopify/web-worker/worker';

import type { BlockContextValue } from 'instant-client/BlockProvider/context';
import type { RenderCallback } from 'instant-client/defineBlock';

endpoint.callable('addInstantEventListener');
endpoint.callable('removeInstantEventListener');
endpoint.callable('addSchemas');
endpoint.callable('updateStyle');
endpoint.callable('reload');

let renderCallback: undefined | RenderCallback;

// We bring third-party code into the environment by running `importScripts()` below.
// We expect that code to call `self.render`, which we define below, to register
// to receive the `RemoteRoot` object it needs to start rendering.
Reflect.defineProperty(self, 'render', {
  value: (
    callback: RenderCallback,
    contentSchema?: any,
    customizerSchema?: any,
  ) => {
    (endpoint.call as any).addSchemas(contentSchema, customizerSchema);
    renderCallback = callback;
  },
  writable: false,
});

Reflect.defineProperty(self, 'addInstantEventListener', {
  value: (...args: any[]) =>
    (endpoint.call as any).addInstantEventListener(...args),
  writable: false,
});

Reflect.defineProperty(self, 'removeInstantEventListener', {
  value: (...args: any[]) =>
    (endpoint.call as any).removeInstantEventListener(...args),
  writable: false,
});

Reflect.defineProperty(self, 'reload', {
  value: () =>
    (
      endpoint.call as {
        reload(): Promise<void>;
      }
    ).reload(),
  writable: false,
});

Reflect.defineProperty(self, 'updateStyle', {
  value: (id: string, content: string) =>
    (endpoint.call as any).updateStyle(id, content),
  writable: false,
});

Reflect.defineProperty(self, 'removeStyle', {
  value: (id: string) => (endpoint.call as any).removeStyle(id),
  writable: false,
});

Reflect.defineProperty(location, 'reload', {
  value: (timestamp: number) => (endpoint.call as any).reload(),
  writable: false,
});

export async function run(script: string, channel: RemoteChannel) {
  // `channel` is a function, which is proxied over from the main thread. If you ever
  // "hold on" to a function you receive this way in order to call it later, you
  // **must** call `retain()` in order to prevent it from being automatically garbage
  // collected.
  retain(channel);

  await import(/* @vite-ignore */ script);

  if (renderCallback == null) {
    throw new Error(
      `The ${script} script did not register a callback to render UI. Make sure that code runs self.onRender().`,
    );
  }
}

let root: ReturnType<typeof createRemoteRoot>;

export async function render(
  channel: RemoteChannel,
  blockProps: BlockContextValue,
) {
  retain(channel);
  retain(blockProps);

  if (!root) {
    root = createRemoteRoot(channel, {
      components: [],
      strict: false,
      strictComponents: false,
    });

    renderCallback!(root, blockProps);
    root.mount();
  } else {
    renderCallback!(root, blockProps);
  }
}

endpoint.expose({ run, render });
