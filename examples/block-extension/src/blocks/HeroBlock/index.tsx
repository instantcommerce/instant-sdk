import {
  defineBlock,
  InferBlockState,
  useBlockState,
} from '@instantcommerce/sdk';
import './index.css';

const Hero = () => {
  const { content } = useBlockState<InferBlockState<typeof HeroBlock>>();

  return (
    <div className="p-8 min-h-[600px] bg-gray-800">
      <h1 className="text-8xl text-white">{content.title}</h1>
    </div>
  );
};

const HeroBlock = defineBlock({
  component: Hero,
  customizerSchema: {
    fields: {
      color: { type: 'text' },
    },
  } as const,
  contentSchema: {
    fields: {
      title: { type: 'text', label: 'Title', preview: 'Hero title' },
    },
  } as const,
});

export default HeroBlock;
