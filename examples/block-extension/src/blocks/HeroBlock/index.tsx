import {
  defineBlock,
  useBlockState,
  InferBlockState,
} from 'instant-client/src';
import './index.css';

const Hero = () => {
  const { content } = useBlockState<InferBlockState<typeof HeroBlock>>();
  type Test = NonNullable<
    typeof HeroBlock['contentSchema']
  >['fields'][number]['name'];

  return (
    <div className="p-8 min-h-[600px] bg-gray-800">
      <h1 className="text-8xl text-white">{content.title}</h1>
    </div>
  );
};

const HeroBlock = defineBlock({
  component: Hero,
  customizerSchema: {
    fields: [{ type: 'text', name: 'Test color' }],
  },
  contentSchema: {
    fields: [
      { type: 'text', name: 'title', label: 'Title', preview: 'Hero title' },
      { type: 'select', name: 'select', options: [{ key: '', value: '' }] },
    ],
  },
});

export default HeroBlock;
