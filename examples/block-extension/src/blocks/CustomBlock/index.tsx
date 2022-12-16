import { defineBlock } from 'instant-client';
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
      number: { type: 'number', min: 2, max: 80, fractionDigits: 3 },
      padding: {
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Large', value: 'lg' },
        ],
        previewValue: 'sm',
      },
      textColor: { type: 'color', previewValue: '#A020F0' },
      text: { type: 'text', maxLength: 1 },
    },
  },
  contentSchema: {
    fields: {
      title: { type: 'text', previewValue: 'Title' },
      select: {
        type: 'select',
        previewValue: 'value1',
        options: [
          { value: 'value1', label: 'Option 1' },
          { value: 'value2', label: 'Option 2' },
        ],
      },
      date: {
        type: 'date',
        previewValue: '2022-12-12 08:12',
        withTime: true,
      },
      image: {
        type: 'image',
        previewValue:
          'https://images.unsplash.com/photo-1669962367460-00b711b2e3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      },
      link: {
        type: 'link',
        previewValue: 'https://google.com',
      },
      richText: {
        type: 'richText',
        previewValue: 'Rich text',
        toolbar: [],
      },
    },
  },
});
