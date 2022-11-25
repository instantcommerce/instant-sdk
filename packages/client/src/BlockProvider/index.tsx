import { ReactNode, useMemo } from 'react';

import { BlockContext, BlockContextValue } from './context';

export * from './useBlockContext';

export const BlockProvider = ({
  children,
  blockProps,
}: {
  children: ReactNode;
  blockProps: BlockContextValue;
}) => {
  const contextValue = useMemo(() => blockProps, [blockProps]);

  return (
    <BlockContext.Provider value={contextValue}>
      {children}
    </BlockContext.Provider>
  );
};
