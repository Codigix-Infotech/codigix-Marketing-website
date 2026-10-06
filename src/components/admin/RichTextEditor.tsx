'use client';

import { useEffect, useState } from 'react';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { TableKit } from '@tiptap/extension-table';
import {
  AlignCenter, AlignLeft, AlignRight, Bold, Code, Code2, Eraser, Heading2, Heading3, Heading4, Highlighter, ImagePlus,
  Italic, Link2, List, ListOrdered, Minus, Pilcrow, Quote, Redo2, Strikethrough, Table, Underline, Undo2, Unlink,
} from 'lucide-react';
import { mediaUrl } from '@/lib/config';
import { MediaPickerModal, uploadImages } from './MediaLibrary';
import { Button, cx, Field, Input, Modal, Textarea, useToast } from './ui';

function ToolButton({ onClick, active, disabled, label, children }: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cx(
        'h-8 w-8 inline-flex items-center justify-center rounded-lg text-slate-600 transition-colors disabled:opacity-30',
        active ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-100'
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="w-px h-5 bg-slate-200 mx-1" />;

function LinkModal({ editor, open, onClose }: { editor: Editor; open: boolean; onClose: () => void }) {
  const [url, setUrl] = useState('');
  const [newTab, setNewTab] = useState(false);
  useEffect(() => {
    if (open) {
      const attrs = editor.getAttributes('link');
      setUrl(attrs.href || '');
      setNewTab(attrs.target === '_blank');
    }
  }, [open, editor]);
  const apply = () => {
    const chain = editor.chain().focus().extendMarkRange('link');
    if (!url) chain.unsetLink().run();
    else chain.setLink({ href: url, target: newTab ? '_blank' : null } as { href: string; target?: string | null }).run();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Insert link"
      size="max-w-md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={apply}>Apply</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="URL" hint="Use relative links like /contact or /blog/my-post for internal links (good for SEO).">
          <Input autoFocus value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… or /page" onKeyDown={(e) => e.key === 'Enter' && apply()} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" checked={newTab} onChange={(e) => setNewTab(e.target.checked)} /> Open in new tab (external links)
        </label>
      </div>
    </Modal>
  );
}

function ImageModal({ editor, open, onClose, folder }: { editor: Editor; open: boolean; onClose: () => void; folder: string }) {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [picker, setPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (open) {
      setSrc('');
      setAlt('');
    }
  }, [open]);
  const insert = () => {
    if (!src) return;
    editor.chain().focus().setImage({ src: mediaUrl(src), alt, title: alt }).run();
    onClose();
  };
  return (
    <>
      <Modal
        open={open && !picker}
        onClose={onClose}
        title="Insert image"
        footer={
          <>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={insert} disabled={!src || !alt}>Insert image</Button>
          </>
        }
      >
        <div className="space-y-4">
          {src ? (
            <img src={mediaUrl(src)} alt="" className="w-full max-h-60 object-contain rounded-lg bg-slate-50 border border-slate-200" />
          ) : (
            <div className="flex gap-2">
              <label className="flex-1">
                <span className="sr-only">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files?.length) return;
                    setUploading(true);
                    try {
                      const [m] = await uploadImages([e.target.files[0]], folder);
                      setSrc(m.url);
                    } catch (err) {
                      toast((err as Error).message, 'error');
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
                <span className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-sm text-slate-500 hover:border-indigo-400 cursor-pointer">
                  {uploading ? 'Uploading…' : 'Upload from computer'}
                </span>
              </label>
              <button type="button" onClick={() => setPicker(true)} className="flex-1 h-24 rounded-lg border-2 border-dashed border-slate-200 text-sm text-slate-500 hover:border-indigo-400">
                Choose from library
              </button>
            </div>
          )}
          <Field label="…or image URL">
            <Input value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="Alt text" required hint="Describe the image for Google Images & screen readers. Include your keyword naturally if relevant.">
            <Input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="e.g. Dermatologist consulting a patient in Pune clinic" />
          </Field>
        </div>
      </Modal>
      <MediaPickerModal open={picker} onClose={() => setPicker(false)} onSelect={(m) => setSrc(m.url)} folder={folder} />
    </>
  );
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing your article…', folder = 'blog', minimal = false }: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  folder?: string;
  minimal?: boolean;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [source, setSource] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: null, target: null } },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      Highlight,
      TableKit.configure({ table: { resizable: false } }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-a:text-indigo-600 prose-img:rounded-xl px-5 py-4',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  });

  // Sync when the value is replaced from outside (e.g. after loading a post).
  useEffect(() => {
    if (editor && !editor.isFocused && value !== editor.getHTML() && !(editor.isEmpty && !value)) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return <div className="h-[480px] rounded-xl border border-slate-200 bg-slate-50 animate-pulse" />;

  const block = editor.isActive('heading', { level: 2 }) ? 'h2' : editor.isActive('heading', { level: 3 }) ? 'h3' : editor.isActive('heading', { level: 4 }) ? 'h4' : 'p';

  return (
    <div className="tiptap-editor rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-400 transition">
      <div className="sticky top-16 z-10 flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-white/95 backdrop-blur px-2 py-1.5 rounded-t-xl">
        <ToolButton label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo() || source}><Undo2 size={16} /></ToolButton>
        <ToolButton label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo() || source}><Redo2 size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Paragraph" active={block === 'p'} onClick={() => editor.chain().focus().setParagraph().run()}><Pilcrow size={16} /></ToolButton>
        <ToolButton label="Heading 2 (main section)" active={block === 'h2'} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></ToolButton>
        <ToolButton label="Heading 3 (sub-section)" active={block === 'h3'} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></ToolButton>
        {!minimal && <ToolButton label="Heading 4" active={block === 'h4'} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}><Heading4 size={16} /></ToolButton>}
        <Divider />
        <ToolButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></ToolButton>
        <ToolButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolButton>
        <ToolButton label="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline size={16} /></ToolButton>
        <ToolButton label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></ToolButton>
        <ToolButton label="Highlight" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter size={16} /></ToolButton>
        {!minimal && <ToolButton label="Inline code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={16} /></ToolButton>}
        <Divider />
        <ToolButton label="Link" active={editor.isActive('link')} onClick={() => setLinkOpen(true)}><Link2 size={16} /></ToolButton>
        {editor.isActive('link') && <ToolButton label="Remove link" onClick={() => editor.chain().focus().unsetLink().run()}><Unlink size={16} /></ToolButton>}
        <ToolButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></ToolButton>
        <ToolButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></ToolButton>
        <ToolButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></ToolButton>
        <ToolButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={16} /></ToolButton>
        <ToolButton label="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={16} /></ToolButton>
        <ToolButton label="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Insert image" onClick={() => setImageOpen(true)}><ImagePlus size={16} /></ToolButton>
        {!minimal && (
          <ToolButton label="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table size={16} /></ToolButton>
        )}
        <ToolButton label="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><Eraser size={16} /></ToolButton>
        <div className="ml-auto">
          <ToolButton label={source ? 'Visual editor' : 'HTML source'} active={source} onClick={() => setSource((s) => !s)}><Code2 size={16} /></ToolButton>
        </div>
        {editor.isActive('table') && (
          <div className="w-full flex flex-wrap gap-1 pt-1.5 mt-1 border-t border-slate-100">
            {[
              ['+ Row', () => editor.chain().focus().addRowAfter().run()],
              ['+ Column', () => editor.chain().focus().addColumnAfter().run()],
              ['− Row', () => editor.chain().focus().deleteRow().run()],
              ['− Column', () => editor.chain().focus().deleteColumn().run()],
              ['Toggle header', () => editor.chain().focus().toggleHeaderRow().run()],
              ['Delete table', () => editor.chain().focus().deleteTable().run()],
            ].map(([label, fn]) => (
              <button key={label as string} type="button" onClick={fn as () => void} className="text-xs px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                {label as string}
              </button>
            ))}
          </div>
        )}
      </div>

      {source ? (
        <Textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            editor.commands.setContent(e.target.value, { emitUpdate: false });
          }}
          className="!rounded-none !rounded-b-xl !border-0 font-mono text-xs min-h-[460px] !ring-0"
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <LinkModal editor={editor} open={linkOpen} onClose={() => setLinkOpen(false)} />
      <ImageModal editor={editor} open={imageOpen} onClose={() => setImageOpen(false)} folder={folder} />
    </div>
  );
}
