import { defineBlock } from 'instant-client/src';
import { CustomBlock } from './block';
import '../test.css';
import './styles.css';

export default defineBlock({
  component: CustomBlock,
  preview: {
    decorators: [
      (children) => <div className="p-6 bg-gray-400">{children}</div>,
    ],
  },
  customizerSchema: {
    fields: [{ type: 'text', name: 'textColor', preview: '#A020F0' }],
  },
  contentSchema: {
    fields: [
      { type: 'text', name: 'title', preview: 'haha' },
      { type: 'text', name: 'tqitle', preview: 'w' },
    ],
  },
});
