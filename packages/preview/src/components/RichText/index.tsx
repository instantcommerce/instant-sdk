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
  onChange: EditorContentProps['onChange'];
} & InputWrapperProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  return (
    <InputWrapper {...props} direction="col">
      <MenuBar editor={editor} />

      <EditorContent
        editor={editor}
        className={twJoin(
          'h-[200px] w-full p-3 border border-gray-200 rounded',
          '[&_.ProseMirror]:w-full [&_.ProseMirror]:h-full [&_.ProseMirror-focused]:outline-none',
          'focus-within:outline focus-within:outline-2 focus-within:outline-primary-700 focus-within:border-transparent',
        )}
      />
    </InputWrapper>
  );
};
