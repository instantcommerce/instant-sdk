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
    fields: {
      textColor: { type: 'text', preview: '#A020F0' },
    },
  },
  contentSchema: {
    fields: {
      title: { type: 'text', preview: 'Title' },
      select: {
        type: 'select',
        preview: 'value1',
        options: [
          { value: 'value1', label: 'Option 1' },
          { value: 'value2', label: 'Option 2' },
        ],
      },
      date: {
        type: 'date',
        preview: '2022-12-12',
      },
      image: {
        type: 'image',
        preview:
          'https://images.unsplash.com/photo-1669962367460-00b711b2e3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      },
      link: {
        type: 'link',
        preview: 'https://google.com',
      },
      richText: {
        type: 'richText',
        preview: 'Rich text',
        toolbar: [],
      },
    },
  },
});
