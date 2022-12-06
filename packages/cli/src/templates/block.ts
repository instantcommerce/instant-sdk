export const blockTemplate = (
  name: string,
) => `import { defineBlock, useBlockState } from "instant-client";

const ${name} = () => {
  const { content } = useBlockState();

  return (
    <div>
      <h1>
        {content.title}
      </h1>
    </div>
  );
};

export default defineBlock({
  component: ${name},
  customizerSchema: {
    fields: [{ type: "color", name: "Test color" }],
  },
  contentSchema: {
    fields: [{ type: "text", name: "title", label: "Title", preview: 'Hero title' }],
  },
});
;
`;
