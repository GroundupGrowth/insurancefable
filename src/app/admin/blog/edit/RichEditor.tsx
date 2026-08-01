'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { buildExtensions } from './extensions';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Columns3,
  Eraser,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Rows3,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Underline,
  Undo2,
  Youtube as YoutubeIcon,
} from 'lucide-react';

/* WordPress-grade article editor for the blog publisher.

   The imported corpus is full of markup Tiptap has no schema for — Gravity
   Forms, Shortcodes Ultimate accordions/columns (su-*), SVGs, styled divs.
   Three mechanisms keep the visual editor from destroying it:

   1. RawHtmlBlock: any div/form/section/svg/iframe/figure/etc. is captured
      verbatim as an atomic block (rendered live, editable as raw HTML via its
      badge) and serialized back byte-for-byte.
   2. preserveAttrs: style/class/id survive on every ordinary node the schema
      does understand (paragraphs, headings, lists, tables, images, links).
   3. The body is only rewritten when the user actually edits it — opening and
      saving a post without touching the body keeps the stored HTML identical
      (see the edit page's dirty tracking).

   Plus a WordPress-style Visual/HTML tab pair: the HTML tab always round-trips
   perfectly, whatever the markup. */

export type EditorMode = 'visual' | 'html';

export interface RichEditorHandle {
  /** Current body HTML, whichever tab is active. */
  getHTML: () => string;
}

interface ModalRequest {
  kind: 'link' | 'image' | 'youtube' | 'rawhtml';
  pos?: number;
  initial?: string;
}

export default function RichEditor({
  initialHtml,
  onDirty,
  onReady,
  uploadImage,
}: {
  initialHtml: string;
  onDirty: () => void;
  onReady: (handle: RichEditorHandle) => void;
  uploadImage: (file: File) => Promise<string>;
}) {
  const [mode, setMode] = useState<EditorMode>('visual');
  const [htmlDraft, setHtmlDraft] = useState(initialHtml);
  const [lossy, setLossy] = useState(false);
  const [modal, setModal] = useState<ModalRequest | null>(null);
  const [modalValue, setModalValue] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [, bump] = useReducer((x: number) => x + 1, 0);
  const loadedRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const htmlDraftRef = useRef(htmlDraft);
  htmlDraftRef.current = htmlDraft;

  const extensions = useMemo(() => buildExtensions(), []);

  const editor = useEditor({
    extensions,
    content: initialHtml,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'article-body-editor' },
    },
    onUpdate: () => {
      if (loadedRef.current) onDirty();
    },
    onSelectionUpdate: () => bump(),
    onTransaction: () => bump(),
  });

  /* Round-trip check: if loading + serializing changes the structure beyond
     whitespace, warn that Visual mode may simplify this article. */
  useEffect(() => {
    if (!editor) return;
    loadedRef.current = true;
    try {
      const normalize = (html: string) =>
        html
          .replace(/\s+/g, ' ')
          .replace(/> </g, '><')
          .trim();
      const counts = (html: string) => {
        const tally: Record<string, number> = {};
        for (const match of html.matchAll(/<([a-zA-Z][a-zA-Z0-9-]*)/g)) {
          const tag = match[1].toLowerCase();
          tally[tag] = (tally[tag] ?? 0) + 1;
        }
        return tally;
      };
      const before = counts(initialHtml);
      const after = counts(editor.getHTML());
      const watched = ['table', 'iframe', 'form', 'img', 'div', 'ul', 'ol', 'caption', 'tfoot', 'span'];
      const changed = watched.some((tag) => (before[tag] ?? 0) !== (after[tag] ?? 0));
      setLossy(changed && normalize(initialHtml) !== normalize(editor.getHTML()));
    } catch {
      /* the warning is best-effort */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  /* Raw-block "edit" badges call back into React through editor storage. */
  useEffect(() => {
    if (!editor) return;
    (editor.storage as unknown as Record<string, unknown>).rawHtmlEdit = (pos: number, html: string) => {
      setModal({ kind: 'rawhtml', pos, initial: html });
      setModalValue(html);
      setModalError(null);
    };
  }, [editor]);

  const getHTML = useCallback(() => {
    if (modeRef.current === 'html') return htmlDraftRef.current;
    return editor?.getHTML() ?? htmlDraftRef.current;
  }, [editor]);

  useEffect(() => {
    onReady({ getHTML });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHTML]);

  const switchMode = (next: EditorMode) => {
    if (!editor || next === mode) return;
    if (next === 'html') {
      setHtmlDraft(editor.getHTML());
    } else {
      editor.commands.setContent(htmlDraft);
    }
    setMode(next);
  };

  const openModal = (kind: ModalRequest['kind'], initial = '') => {
    setModal({ kind, initial });
    setModalValue(initial);
    setModalError(null);
  };

  const applyModal = async () => {
    if (!editor || !modal) return;
    const value = modalValue.trim();
    if (modal.kind === 'link') {
      if (!value) {
        editor.chain().focus().unsetLink().run();
      } else {
        const href = /^(https?:\/\/|\/|#|mailto:|tel:)/.test(value) ? value : `https://${value}`;
        editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
      }
    } else if (modal.kind === 'image') {
      if (!value) return;
      editor.chain().focus().setImage({ src: value }).run();
    } else if (modal.kind === 'youtube') {
      if (!value) return;
      const ok = editor.chain().focus().setYoutubeVideo({ src: value }).run();
      if (!ok) {
        setModalError('That does not look like a YouTube URL.');
        return;
      }
    } else if (modal.kind === 'rawhtml' && typeof modal.pos === 'number') {
      const { state, view } = editor;
      view.dispatch(state.tr.setNodeMarkup(modal.pos, undefined, { html: modalValue }));
      onDirty();
    }
    setModal(null);
  };

  const handleImageFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : String(error));
      setTimeout(() => setUploadError(null), 8000);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  if (!editor) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-12 text-[#0D1B3D]/40 text-sm">
        Loading editor…
      </div>
    );
  }

  const inTable = editor.isActive('table');

  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-black/5 px-3 py-2 flex flex-wrap items-center gap-1 sticky top-0 z-20 bg-white">
        <ToolButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo2 className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo2 className="w-4 h-4" />
        </ToolButton>
        <Divider />
        <ToolButton title="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
          <Pilcrow className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Heading 4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
          <Heading4 className="w-4 h-4" />
        </ToolButton>
        <Divider />
        <ToolButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <Underline className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </ToolButton>
        <Divider />
        <ToolButton
          title="Link"
          active={editor.isActive('link')}
          onClick={() => openModal('link', (editor.getAttributes('link').href as string) ?? '')}
        >
          <Link2 className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Remove link" disabled={!editor.isActive('link')} onClick={() => editor.chain().focus().unsetLink().run()}>
          <Link2Off className="w-4 h-4" />
        </ToolButton>
        <Divider />
        <ToolButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </ToolButton>
        <Divider />
        <ToolButton title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          <AlignLeft className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          <AlignCenter className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          <AlignRight className="w-4 h-4" />
        </ToolButton>
        <Divider />
        <ToolButton
          title="Insert table"
          active={inTable}
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <TableIcon className="w-4 h-4" />
        </ToolButton>
        <ToolButton title={uploading ? 'Uploading…' : 'Upload image'} disabled={uploading} onClick={() => fileRef.current?.click()}>
          <ImagePlus className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="YouTube video" onClick={() => openModal('youtube')}>
          <YoutubeIcon className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="w-4 h-4" />
        </ToolButton>
        <ToolButton title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          <Eraser className="w-4 h-4" />
        </ToolButton>

        <span className="flex-1" />
        <div className="flex items-center rounded-lg bg-[#F5F5F5] p-0.5 text-xs font-medium">
          {(['visual', 'html'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => switchMode(tab)}
              className={`px-3 py-1.5 rounded-md transition-colors duration-150 ${
                mode === tab ? 'bg-[#0D1B3D] text-white' : 'text-[#0D1B3D]/60 hover:text-[#0D1B3D]'
              }`}
            >
              {tab === 'visual' ? 'Visual' : 'HTML'}
            </button>
          ))}
        </div>
      </div>

      {/* Table controls appear while the cursor is in a table */}
      {inTable && mode === 'visual' && (
        <div className="border-b border-black/5 px-3 py-1.5 flex flex-wrap items-center gap-1 bg-[#FAFAFA]">
          <TableAction label="+ Row" title="Add row below" icon={<Rows3 className="w-3.5 h-3.5" />} onClick={() => editor.chain().focus().addRowAfter().run()} />
          <TableAction label="+ Column" title="Add column right" icon={<Columns3 className="w-3.5 h-3.5" />} onClick={() => editor.chain().focus().addColumnAfter().run()} />
          <TableAction label="Delete row" onClick={() => editor.chain().focus().deleteRow().run()} />
          <TableAction label="Delete column" onClick={() => editor.chain().focus().deleteColumn().run()} />
          <TableAction label="Header row" onClick={() => editor.chain().focus().toggleHeaderRow().run()} />
          <TableAction label="Merge cells" onClick={() => editor.chain().focus().mergeOrSplit().run()} />
          <TableAction label="Delete table" icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => editor.chain().focus().deleteTable().run()} />
        </div>
      )}

      {(lossy || uploadError) && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-amber-800 text-xs leading-relaxed">
          {uploadError ??
            'This article contains custom layouts (forms, accordions, styled boxes) shown here as "Custom HTML" blocks. They are preserved exactly. For fine control over those sections, use the HTML tab.'}
        </div>
      )}

      {/* Content area — .article-body styling makes Visual mode true WYSIWYG */}
      {mode === 'visual' ? (
        <div className="article-editor">
          <EditorContent editor={editor} className="article-body px-6 py-6 md:px-10 md:py-8" />
        </div>
      ) : (
        <textarea
          value={htmlDraft}
          onChange={(event) => {
            setHtmlDraft(event.target.value);
            onDirty();
          }}
          spellCheck={false}
          className="w-full min-h-[36rem] font-mono text-xs leading-relaxed text-[#0D1B3D] p-6 outline-none resize-y"
        />
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleImageFile(file);
        }}
      />

      {/* Small prompt modal for links / embeds / raw HTML */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6" onClick={() => setModal(null)}>
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[#0D1B3D] font-medium mb-3">
              {modal.kind === 'link' && 'Link URL'}
              {modal.kind === 'image' && 'Image URL'}
              {modal.kind === 'youtube' && 'YouTube video URL'}
              {modal.kind === 'rawhtml' && 'Edit custom HTML block'}
            </p>
            {modal.kind === 'rawhtml' ? (
              <textarea
                value={modalValue}
                onChange={(event) => setModalValue(event.target.value)}
                spellCheck={false}
                className="w-full min-h-[16rem] font-mono text-xs leading-relaxed text-[#0D1B3D] border border-black/10 rounded-xl p-4 outline-none focus:border-black/30 resize-y"
              />
            ) : (
              <input
                autoFocus
                value={modalValue}
                onChange={(event) => setModalValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    void applyModal();
                  }
                }}
                placeholder={
                  modal.kind === 'youtube' ? 'https://www.youtube.com/watch?v=…' : 'https://…'
                }
                className="bg-white border border-black/10 text-[#0D1B3D] text-sm rounded-xl px-4 py-2.5 w-full outline-none focus:border-black/30"
              />
            )}
            {modalError && <p className="text-red-600 text-sm mt-2">{modalError}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void applyModal()}
                className="bg-[#0D1B3D] text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-black/10 mx-1" />;
}

function ToolButton({
  title,
  active,
  disabled,
  onClick,
  children,
}: {
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors duration-100 disabled:opacity-30 ${
        active ? 'bg-[#0D1B3D] text-white' : 'text-[#0D1B3D]/70 hover:bg-black/5'
      }`}
    >
      {children}
    </button>
  );
}

function TableAction({
  label,
  title,
  icon,
  onClick,
}: {
  label: string;
  title?: string;
  icon?: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title ?? label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-[#0D1B3D]/70 hover:text-[#0D1B3D] hover:bg-black/5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors duration-100"
    >
      {icon}
      {label}
    </button>
  );
}
