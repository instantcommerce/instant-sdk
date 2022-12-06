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
    fields: [{ type: 'text', name: 'textColor', preview: '#A020F0' }],
  },
  contentSchema: {
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Title',
        isTranslatable: true,
        isRequired: true,
        preview: 'Placeholder',
      },
      {
        type: 'richText',
        name: 'description',
        label: 'Description',
        isTranslatable: true,
        isRequired: false,
        toolbar: ['bold', 'italic', 'underline', 'link'],
      },
      {
        type: 'subSchema',
        name: 'heroSlider',
        label: 'Hero slider',
        allowed: ['HeroContent', 'Button'],
        isTranslatable: true,
        isRequired: false,
        max: 2,
        preview: [
          {
            name: 'HeroContent',
            preview: {
              heroContentTitle: 'title',
            },
          },
          { name: 'Button' },
        ],
      },
      {
        type: 'image',
        name: 'background',
        label: 'Background',
        isTranslatable: false,
        isRequired: true,
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
        name: 'HeroContent',
        fields: [
          {
            type: 'image',
            name: 'heroContentImage',
            label: 'Image',
            isRequired: true,
          },
          {
            type: 'text',
            name: 'heroContentTitle',
            label: 'Title',
            isTranslatable: true,
            isRequired: true,
          },
          {
            type: 'subSchema',
            name: 'heroContentButtons',
            label: 'Buttons',
            isRequired: false,
            allowed: ['Button'],
          },
        ],
      },
    ],
  },
});
