import {
  ArrowUUpLeft,
  ArrowUUpRight,
  Code,
  FileCode,
  KeyReturn,
  ListBullets,
  ListNumbers,
  Quotes,
  TextBolder,
  TextHFive,
  TextHFour,
  TextHOne,
  TextHSix,
  TextHThree,
  TextHTwo,
  TextItalic,
  TextStrikethrough,
  TextT,
} from 'phosphor-react';
import { Button } from '../Button';

const IconButton = ({ children, isActive, ...props }: any) => (
  <Button iconOnly variant={isActive ? 'gray' : 'unstyled'} {...props}>
    {children}
  </Button>
);

export const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-around gap-[2px] mb-3">
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        isActive={editor.isActive('bold')}
      >
        <TextBolder size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        isActive={editor.isActive('italic')}
      >
        <TextItalic size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        isActive={editor.isActive('strike')}
      >
        <TextStrikethrough size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
        isActive={editor.isActive('code')}
      >
        <Code size={16} />
      </IconButton>

      {/* TODO: DO WE NEED THIS? */}
      {/* <IconButton onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </IconButton>

      <IconButton onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </IconButton> */}

      <IconButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        isActive={editor.isActive('paragraph')}
      >
        <TextT size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <TextHOne size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <TextHTwo size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <TextHThree size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        isActive={editor.isActive('heading', { level: 4 })}
      >
        <TextHFour size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        isActive={editor.isActive('heading', { level: 5 })}
      >
        <TextHFive size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        isActive={editor.isActive('heading', { level: 6 })}
      >
        <TextHSix size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        isActive={editor.isActive('bulletList')}
      >
        <ListBullets size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        isActive={editor.isActive('orderedList')}
      >
        <ListNumbers size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
        isActive={editor.isActive('codeBlock')}
      >
        <FileCode size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        isActive={editor.isActive('blockquote')}
      >
        <Quotes size={16} />
      </IconButton>

      <IconButton onClick={() => editor.chain().focus().setHardBreak().run()}>
        <KeyReturn size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <ArrowUUpLeft size={16} />
      </IconButton>

      <IconButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <ArrowUUpRight size={16} />
      </IconButton>
    </div>
  );
};
