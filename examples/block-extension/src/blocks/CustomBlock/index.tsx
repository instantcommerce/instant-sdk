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
        preview: 'value1',
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
        type: 'link',
        name: 'link',
        preview: 'https://google.com',
      },
      {
        type: 'richText',
        name: 'richText',
        preview: 'Rich text',
        toolbar: [],
      },
      {
        type: 'subSchema',
        name: 'cardsGrid',
        label: 'Cards grid',
        allowed: ['Cards'],
        isTranslatable: true,
        isRequired: false,
        max: 3,
        preview: [
          {
            name: 'Cards',
            preview: {
              cardItems: [
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
        ],
      },
    ],
    subschemas: [
      {
        name: 'Button',
        fields: [
          {
            type: 'text',
            name: 'text',
            label: 'Text',
            isTranslatable: true,
            isRequired: true,
            maxLength: 40,
          },
          {
            type: 'link',
            name: 'link',
            label: 'Link',
            isTranslatable: true,
            isRequired: true,
          },
        ],
      },
      {
        name: 'Card',
        fields: [
          {
            type: 'image',
            name: 'cardImage',
            label: 'Image',
            isRequired: true,
          },
          {
            type: 'text',
            name: 'cardTitle',
            label: 'Title',
            isTranslatable: true,
            isRequired: true,
          },
          {
            type: 'subSchema',
            name: 'cardButtons',
            label: 'Buttons',
            isRequired: false,
            max: 2,
            allowed: ['Button'],
          },
        ],
      },
      {
        name: 'Cards',
        fields: [
          {
            type: 'subSchema',
            name: 'cardItems',
            label: 'Cards',
            isRequired: false,
            max: 3,
            allowed: ['Card'],
          },
        ],
      },
    ],
  },
});
