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
      number: { type: 'number', min: 2, max: 80, decimals: 3 },
      padding: {
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Large', value: 'lg' },
        ],
        preview: 'sm',
      },
      textColor: { type: 'color', preview: '#A020F0' },
      text: { type: 'text', maxLength: 1 },
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
        preview: '2022-12-12 08:12',
        withTime: true,
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
      Cards: {
        type: 'subSchema',
        label: 'Cards',
        allowed: ['Card'],
        isTranslatable: true,
        isRequired: false,
        max: 3,
        preview: [
          {
            name: 'Card',
            preview: {
              cardTitle: 'Card title',
              cardImage:
                'https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg',
              cardButtons: [
                {
                  name: 'Button',
                  preview: {
                    text: 'Button',
                    link: 'https://a.storyblok.com/f/145828/5000x3333/564e281ca1/force-majeure-du8abwm5z2g-unsplash.jpg',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    subschemas: [
      {
        name: 'Button',
        fields: {
          text: {
            type: 'text',
            label: 'Text',
            isTranslatable: true,
            isRequired: true,
            maxLength: 40,
          },
          link: {
            type: 'link',
            label: 'Link',
            isTranslatable: true,
            isRequired: true,
          },
        },
      },
      {
        name: 'Card',
        fields: {
          cardImage: {
            type: 'image',
            label: 'Image',
            isRequired: true,
          },
          cardTitle: {
            type: 'text',
            label: 'Title',
            isTranslatable: true,
            isRequired: true,
          },
          cardButtons: {
            type: 'subSchema',
            label: 'Buttons',
            isRequired: false,
            max: 2,
            allowed: ['Button'],
          },
        },
      },
    ],
  },
});
