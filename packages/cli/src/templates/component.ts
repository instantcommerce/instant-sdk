export const componentTemplate = (
  name: string,
) => `import { defineComponent, useBlockState } from "@instantcommerce/sdk";

const ${name} = () => {
  const { customizer } = useBlockState();

  return (
    TODO
  );
};

export default defineComponent({
  component: ${name},
  customizerSchema: {
    fields: {
      color: { type: "color", label: "Color" },
    },
  },
});
;
`;
