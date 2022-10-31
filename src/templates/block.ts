export const blockTemplate = (name: string) => `import React from "react";
import { DynamicBlock } from "@instantcommerce/client";

export const ${name} = () => {
  return <DynamicBlock>Custom code...</DynamicBlock>;
};
`;
