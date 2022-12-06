export const blockTemplate = (
  name: string,
) => `import { defineBlock, useBlockState } from "instant-client";

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
    fields: [{ type: "color", name: "Color" }],
  },
  contentSchema: {
    fields: [{ type: "text", name: "title", label: "Title", preview: 'Hero title' }],
  },
});
;
`;
