export const blockTemplate = (
  name: string,
) => `import { defineBlock, useBlockState } from "@instantcommerce/sdk";

const ${name} = () => {
  const { content, customizer } = useBlockState();

  return (
    <div>
      <h1 style={{ color: customizer.color }}>
        {content.title}
      </h1>
    </div>
  );
};

export default defineBlock({
  component: ${name},
  customizerSchema: {
    fields: {
      color: { type: "color", label: "Color" },
    },
  },
  contentSchema: {
    fields: {
      title: { type: "text", label: "Title", preview: 'Hero title' },
    },
  },
});
;
`;
