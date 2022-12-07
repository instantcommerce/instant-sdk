import { defineBlock, useBlockState } from 'instant-client';
import './index.css';

const HeroBlock = () => {
  const { content } = useBlockState();

  return (
    <div className="p-8 min-h-[600px] bg-gray-800">
      <h1 className="text-8xl text-white">{content.title}</h1>
    </div>
  );
};

export default defineBlock({
  component: HeroBlock,
  customizerSchema: {
    fields: [{ type: 'text', name: 'Test color' }],
  },
  contentSchema: {
    fields: [
      { type: 'text', name: 'title', label: 'Title', preview: 'Hero title' },
    ],
  },
});
