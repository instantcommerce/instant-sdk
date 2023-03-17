import { defineSection, useBlockState } from '@instantcommerce/sdk';
import '../../styles/global.css';

const Hero = () => {
  const { content } = useBlockState();

  return (
    <div className="p-8 min-h-[600px] bg-gray-800">
      <h1 className="text-8xl text-white">{content.title}</h1>
    </div>
  );
};

const HeroBlock = defineSection({
  component: Hero,
  customizerSchema: {
    fields: {
      color: { type: 'text' },
    },
  },
  contentSchema: {
    fields: {
      title: { type: 'text', label: 'Title', preview: 'Hero title' },
    },
  },
});

export default HeroBlock;
