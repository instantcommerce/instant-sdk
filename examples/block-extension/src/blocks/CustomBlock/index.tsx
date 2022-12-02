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
      { type: 'text', name: 'title', preview: 'Title' },
      {
        type: 'select',
        name: 'select',
        preview: 'Select',
        options: [
          { value: 'value1', label: 'Option 1' },
          { value: 'value2', label: 'Option 2' },
        ],
      },
      {
        type: 'date',
        name: 'date',
        preview: '2022-12-12',
      },
      {
        type: 'image',
        name: 'image',
        preview:
          'https://images.unsplash.com/photo-1669962367460-00b711b2e3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      },
      {
        type: 'url',
        name: 'url',
        preview: 'https://google.com',
      },
      {
        type: 'richText',
        name: 'richText',
        preview: 'Rich text',
        toolbar: [],
      },
    ],
  },
});
