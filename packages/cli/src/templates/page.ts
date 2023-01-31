export const pageTemplate = (
  name: string,
) => `import { definePage, useBlockState } from "@instantcommerce/sdk";

const ${name} = () => {
  const { customizer } = useBlockState();

  return (
    TODO
  );
};

export default definePage({
  component: ${name},
  customizerSchema: {
    fields: {
      color: { type: "color", label: "Color" },
    },
  },
});
;
`;
