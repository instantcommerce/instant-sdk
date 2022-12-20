import { useEditor, EditorContent, EditorContentProps } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { twJoin } from 'tailwind-merge';
import { InputWrapper, InputWrapperProps } from '../Input/InputWrapper';
import { MenuBar } from './MenuBar';

export const RichText = ({
  defaultValue,
  onChange,
  ...props
}: {
  defaultValue: EditorContentProps['content'];
  onChange(value: any): void;
} & InputWrapperProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  return (
    <InputWrapper
      {...props}
      direction="col"
      labelProps={{
        onClick: () => {
          editor?.commands.focus();
        },
      }}
    >
      <MenuBar editor={editor} />

      <EditorContent
        id={props.id}
        editor={editor}
        className={twJoin(
          'min-h-[200px] w-full p-3 border border-gray-200 rounded',
          '[&_.ProseMirror]:w-full [&_.ProseMirror]:h-full [&_.ProseMirror-focused]:outline-none',
          'focus-within:outline focus-within:outline-1 focus-within:outline-primary-700 focus-within:border-primary-700',
        )}
      />
    </InputWrapper>
  );
};
