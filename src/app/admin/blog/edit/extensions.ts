import { Extension, Mark, Node, type Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

/* Tiptap schema for the blog publisher — kept free of React so the round-trip
   safety of the imported WordPress corpus can be tested headlessly.

   The corpus contains markup Tiptap has no schema for (Gravity Forms,
   Shortcodes Ultimate accordions/columns, SVGs, styled divs). Three mechanisms
   keep the visual editor from destroying it:

   1. RawHtmlBlock captures any such element verbatim as an atomic block and
      serializes it back byte-for-byte.
   2. preserveAttrs keeps style/class/id on every node the schema DOES
      understand.
   3. StyledSpan/Superscript/SmallText keep the inline elements WP loves. */

const RAW_BLOCK_TAGS = [
  'div',
  'form',
  'section',
  'fieldset',
  'svg',
  'figure',
  'footer',
  'iframe',
  'style',
  // two posts carry hand-added JSON-LD script tags in the body — keep them
  'script',
  'noscript',
];

export const RawHtmlBlock = Node.create({
  name: 'rawHtmlBlock',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return { html: { default: '' } };
  },
  parseHTML() {
    return [
      ...RAW_BLOCK_TAGS.map((tag) => ({
        tag,
        // Below the specific extensions (default 50): a div[data-youtube-video]
        // wrapper must fall through to the Youtube extension's iframe rule.
        priority: 40,
        getAttrs: (el: HTMLElement | string) => {
          if (typeof el === 'string') return false;
          if (el.hasAttribute('data-youtube-video')) return false;
          return { html: el.outerHTML };
        },
      })),
      {
        // Linked images (WP "click to enlarge"): the link mark can't wrap a
        // block image, so without this the <a> would be dropped. Priority above
        // the link mark rule so the whole thing is captured verbatim.
        tag: 'a',
        priority: 60,
        getAttrs: (el: HTMLElement | string) => {
          if (typeof el === 'string') return false;
          return el.querySelector('img') ? { html: el.outerHTML } : false;
        },
      },
    ];
  },
  renderHTML({ node }) {
    // Only ever runs in a DOM environment (editor client-side / test harness).
    const tpl = document.createElement('template');
    tpl.innerHTML = (node.attrs.html as string) || '<div></div>';
    return (tpl.content.firstElementChild ?? document.createElement('div')) as HTMLElement;
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('div');
      dom.className = 'raw-html-view';
      dom.contentEditable = 'false';
      const content = document.createElement('div');
      content.className = 'raw-html-view-content';
      content.innerHTML = node.attrs.html as string;
      const badge = document.createElement('button');
      badge.type = 'button';
      badge.className = 'raw-html-view-badge';
      badge.textContent = 'Custom HTML · edit';
      badge.addEventListener('mousedown', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      badge.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const storage = editor.storage as unknown as Record<string, unknown>;
        const handler = storage.rawHtmlEdit as ((pos: number, html: string) => void) | undefined;
        const pos = typeof getPos === 'function' ? getPos() : undefined;
        if (handler && typeof pos === 'number') handler(pos, node.attrs.html as string);
      });
      dom.append(content, badge);
      return { dom };
    };
  },
});

const KEEP_ATTRS = ['style', 'class', 'id'] as const;
const keepAttrConfig = () =>
  Object.fromEntries(
    KEEP_ATTRS.map((name) => [
      name,
      {
        default: null as string | null,
        parseHTML: (el: HTMLElement) => el.getAttribute(name),
        renderHTML: (attrs: Record<string, unknown>) =>
          attrs[name] ? { [name]: attrs[name] as string } : {},
      },
    ])
  );

const imgAttrConfig = () =>
  Object.fromEntries(
    ['width', 'height', 'srcset', 'sizes', 'loading', 'decoding'].map((name) => [
      name,
      {
        default: null as string | null,
        parseHTML: (el: HTMLElement) => el.getAttribute(name),
        renderHTML: (attrs: Record<string, unknown>) =>
          attrs[name] ? { [name]: attrs[name] as string } : {},
      },
    ])
  );

export const PreserveAttrs = Extension.create({
  name: 'preserveAttrs',
  addGlobalAttributes() {
    return [
      {
        types: [
          'paragraph',
          'heading',
          'bulletList',
          'orderedList',
          'listItem',
          'blockquote',
          'table',
          'tableRow',
          'tableHeader',
          'tableCell',
          'image',
          'horizontalRule',
          'link',
        ],
        attributes: keepAttrConfig(),
      },
      { types: ['image'], attributes: imgAttrConfig() },
    ];
  },
});

export const StyledSpan = Mark.create({
  name: 'styledSpan',
  addAttributes() {
    return keepAttrConfig();
  },
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (el: HTMLElement | string) => {
          if (typeof el === 'string') return false;
          return el.getAttribute('style') || el.getAttribute('class') || el.getAttribute('id')
            ? {}
            : false;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
});

/* Empty TOC jump anchors (<a id="section"></a>) — 355 of them across the
   corpus. Without this the schema drops them and every in-page table of
   contents breaks the moment a legacy article is edited visually. */
export const AnchorTarget = Node.create({
  name: 'anchorTarget',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return Object.fromEntries(
      ['id', 'name'].map((attr) => [
        attr,
        {
          default: null as string | null,
          parseHTML: (el: HTMLElement) => el.getAttribute(attr),
          renderHTML: (attrs: Record<string, unknown>) =>
            attrs[attr] ? { [attr]: attrs[attr] as string } : {},
        },
      ])
    );
  },
  parseHTML() {
    return [
      {
        tag: 'a',
        priority: 70,
        getAttrs: (el: HTMLElement | string) => {
          if (typeof el === 'string') return false;
          if (el.getAttribute('href')) return false;
          if (el.querySelector('img')) return false;
          return el.getAttribute('id') || el.getAttribute('name') ? {} : false;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['a', HTMLAttributes];
  },
});

export const Superscript = Mark.create({
  name: 'superscriptLite',
  parseHTML() {
    return [{ tag: 'sup' }];
  },
  renderHTML() {
    return ['sup', 0];
  },
});

export const SmallText = Mark.create({
  name: 'smallLite',
  parseHTML() {
    return [{ tag: 'small' }];
  },
  renderHTML() {
    return ['small', 0];
  },
});

export function buildExtensions(): Extensions {
  return [
    StarterKit.configure({
      link: { openOnClick: false, autolink: false, defaultProtocol: 'https' },
      heading: { levels: [2, 3, 4] },
    }),
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    Image,
    Youtube.configure({ nocookie: true, width: 640, height: 360 }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder: 'Start writing the article…' }),
    RawHtmlBlock,
    PreserveAttrs,
    StyledSpan,
    AnchorTarget,
    Superscript,
    SmallText,
  ];
}
