import type { types as t } from '@babel/core';

export const runtimePublicPath = '/@react-refresh';

export const preambleCode = `
import RefreshRuntime from "__BASE__${runtimePublicPath.slice(1)}"
RefreshRuntime.injectIntoGlobalHook(self)
self.$RefreshReg$ = () => {}
self.$RefreshSig$ = () => (type) => type
self.__vite_plugin_react_preamble_installed__ = true
`;

const header = `
import RefreshRuntime from "${runtimePublicPath}";

let prevRefreshReg;
let prevRefreshSig;

if (import.meta.hot) {
  if (!self.__vite_plugin_react_preamble_installed__) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +
      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"
    );
  }

  prevRefreshReg = self.$RefreshReg$;
  prevRefreshSig = self.$RefreshSig$;
  self.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, __SOURCE__ + " " + id)
  };
  self.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}`.replace(/[\n]+/gm, '');

const timeout = `
  if (!self.__vite_plugin_react_timeout) {
    self.__vite_plugin_react_timeout = setTimeout(() => {
        self.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
`;

const footer = `
if (import.meta.hot) {
  self.$RefreshReg$ = prevRefreshReg;
  self.$RefreshSig$ = prevRefreshSig;

  import.meta.hot.on('worker-reload', (data) => {
    self.reload(data.timestamp);
  });

  __ACCEPT__
}`;

const checkAndAccept = `
function isReactRefreshBoundary(mod) {
  if (mod == null || typeof mod !== 'object') {
    return false;
  }
  let hasExports = false;
  let areAllExportsComponents = true;
  for (const exportName in mod) {
    hasExports = true;
    if (exportName === '__esModule') {
      continue;
    }
    const desc = Object.getOwnPropertyDescriptor(mod, exportName);
    if (desc && desc.get) {
      // Don't invoke getters as they may have side effects.
      return false;
    }
    const exportValue = mod[exportName];
    if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }
  return hasExports && areAllExportsComponents;
}

import.meta.hot.accept(mod => {
  if (isReactRefreshBoundary(mod)) {
    ${timeout}
  } else {
    import.meta.hot.invalidate();
  }
});
`;

export function addRefreshWrapper(
  code: string,
  id: string,
  accept: boolean,
): string {
  return (
    header.replace('__SOURCE__', JSON.stringify(id)) +
    code +
    footer.replace('__ACCEPT__', accept ? checkAndAccept : timeout)
  );
}

export function isRefreshBoundary(ast: t.File): boolean {
  // Every export must be a potential React component.
  // We'll also perform a runtime check that's more robust as well (isLikelyComponentType).
  return ast.program.body.every((node) => {
    if (node.type !== 'ExportNamedDeclaration') {
      return true;
    }
    const { declaration, specifiers } = node;
    if (declaration) {
      if (declaration.type === 'ClassDeclaration') return false;
      if (declaration.type === 'VariableDeclaration') {
        return declaration.declarations.every((variable) =>
          isComponentLikeIdentifier(variable.id),
        );
      }
      if (declaration.type === 'FunctionDeclaration') {
        return !!declaration.id && isComponentLikeIdentifier(declaration.id);
      }
    }
    return specifiers.every((spec) => {
      return isComponentLikeIdentifier(spec.exported);
    });
  });
}

function isComponentLikeIdentifier(node: t.Node): boolean {
  return node.type === 'Identifier' && isComponentLikeName(node.name);
}

function isComponentLikeName(name: string): boolean {
  return typeof name === 'string' && name[0] >= 'A' && name[0] <= 'Z';
}
