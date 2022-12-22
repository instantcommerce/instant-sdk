import { defineBlock, useBlockState } from '@instantcommerce/sdk';
import './styles.css';

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
    fields: {
      color: { type: 'color', label: 'Test color' },
    },
  },
  contentSchema: {
    fields: {
      title: { type: 'text', label: 'Title', preview: 'Hero title' },
    },
  },
});
