/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ReactNode, useEffect, useState } from 'react';

// Stories import only the package public API — the consumer-plugin stories at
// the bottom double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout) and inline element (Embed) without
// touching the package.
//
// One story per plugin, each mounting that plugin alone, so what a plugin
// contributes on its own is visible; the ones that need company to do anything
// (autoformat, reset formatting) say so.
import {
    alignPlugin,
    autoformatPlugin,
    blurOnBreakPlugin,
    boldPlugin,
    bulletListPlugin,
    checkListPlugin,
    codePlugin,
    columnBreakPlugin,
    defaultPlugins,
    fontColorPlugin,
    imagePlugin,
    italicPlugin,
    linkPlugin,
    type MentionItem,
    mentionPlugin,
    numberedListPlugin,
    quotePlugin,
    resetFormattingPlugin,
    type RteBlock,
    type FloatingContext,
    type RteDocument,
    type RteInlineNode,
    type RtePlugin,
    type RteText,
    RichTextEditor,
    softBreakPlugin,
    strikethroughPlugin,
    subscriptPlugin,
    superscriptPlugin,
    textStylePlugin,
    underlinePlugin,
} from './index';

// A self-contained SVG so the stories need no network.
const SAMPLE_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80"><rect width="320" height="80" rx="8" fill="#7c3aed"/><text x="160" y="48" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle">image block</text></svg>',
)}`;

/** Who can be mentioned is the app's business, which is why the mention plugin requires it as an option. */
const MENTIONABLE: MentionItem[] = [
    { id: 'jane', label: 'Jane Doe', hint: 'jane@example.com' },
    { id: 'john', label: 'John Smith', hint: 'john@example.com' },
    { id: 'ada', label: 'Ada Lovelace', hint: 'ada@example.com' },
    { id: 'design', label: 'Design team', hint: 'group' },
    { id: 'engineering', label: 'Engineering team', hint: 'group' },
];

/** Everything the package ships, plus the ones that need arguments. */
const ALL_PLUGINS: RtePlugin[] = [...defaultPlugins, mentionPlugin({ items: MENTIONABLE })];

/**
 * Story chrome is styled with the `@frontify/fondue-tokens` Tailwind preset (`tw-` prefix, token-backed
 * utilities). The package itself ships plain CSS — Tailwind is Storybook-only here.
 */
const LAYOUT = 'tw-grid tw-grid-cols-2 tw-content-start tw-gap-4 tw-p-4 tw-font-primary';
const JSON_PANEL =
    'tw-m-0 tw-min-h-[200px] tw-overflow-auto tw-rounded tw-bg-surface-dim tw-p-3 tw-font-monospace tw-text-x-small tw-leading-medium';
const HINT = 'tw-col-span-full tw-m-0 tw-text-body-small tw-text-weak';

const toolbarButtonClasses = (active: boolean): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins',
    component: RichTextEditor,
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

// ---------------------------------------------------------------------------
// Block types
// ---------------------------------------------------------------------------

/**
 * Every typography preset as one block type carrying a `style`: the heading
 * scale and the presets kept beside it, picked in a single dropdown that draws
 * each option in the style it applies.
 */
export const TextStyle: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
                { type: 'textStyle', style: 'heading3', children: [{ text: 'Heading 3' }] },
                { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
                { type: 'textStyle', style: 'imageCaption', children: [{ text: 'An image caption' }] },
                { type: 'paragraph', children: [{ text: 'A paragraph — the dropdown switches this one too.' }] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[textStylePlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Which styles an editor offers is the host's call, so it is a constructor option.
 * This one offers two heading levels and nothing else — and because the offered
 * set is also what pasted HTML may become, an `h1` pasted in here lands as a
 * paragraph rather than as a heading the dropdown cannot show.
 */
export const TextStyleSubset: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'textStyle', style: 'heading2', children: [{ text: 'Only two levels on offer' }] },
                { type: 'paragraph', children: [{ text: 'Open the dropdown: paragraph, heading 2, heading 3.' }] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[textStylePlugin({ styles: ['paragraph', 'heading2', 'heading3'] })]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A quote block, toggled from the toolbar and back to a paragraph the same way. */
export const Quote: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'quote', children: [{ text: 'A quote block — toggle it with the quote button.' }] },
                { type: 'paragraph', children: [{ text: 'A paragraph. Put the caret here and toggle.' }] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[quotePlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A void block: no text children, everything lives in attributes. */
export const Image: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'The image button asks for a URL and inserts a block.' }] },
                { type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image block' },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>Spike-level UX: a real implementation opens an asset picker.</p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[imagePlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Marks
// ---------------------------------------------------------------------------

/** ⌘B, or the toolbar button. */
export const Bold: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Some ' }, { text: 'bold', bold: true }, { text: ' text (⌘B).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** ⌘I, or the toolbar button. */
export const Italic: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Some ' }, { text: 'italic', italic: true }, { text: ' text (⌘I).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[italicPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** ⌘U, or the toolbar button. */
export const Underline: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Some ' }, { text: 'underlined', underline: true }, { text: ' text (⌘U).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[underlinePlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** ⌘⇧X, or the toolbar button. */
export const Strikethrough: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Some ' },
                        { text: 'struck-through', strikethrough: true },
                        { text: ' text (⌘⇧X).' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[strikethroughPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** Inline code, ⌘E. */
export const Code: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Call ' }, { text: 'marks.toggle()', code: true }, { text: ' (⌘E).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[codePlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** ⌘, — the mark for chemistry and footnote-style indices. */
export const Subscript: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'H' }, { text: '2', subscript: true }, { text: 'O (⌘,).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[subscriptPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** ⌘. — the counterpart to subscript. */
export const Superscript: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'x' }, { text: '2', superscript: true }, { text: ' + 1 (⌘.).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[superscriptPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A mark that carries a value: the dropdown reads the colour off the selection. */
export const FontColor: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Some ' },
                        { text: 'coloured', fontColor: { color: '#e11d48' } },
                        { text: ' text — “Colour” clears it again.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[fontColorPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * A value mark with its own flyout: link text, href, and an open-in-new-tab
 * flag. It also brings a panel — click a link and the editor shows what it
 * points at underneath it, with edit and remove alongside.
 */
export const Link: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'A ' },
                        { text: 'link', link: { href: 'https://example.com' } },
                        { text: ' — click it for its panel, or select text and use the toolbar to add one.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[linkPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Block attributes
// ---------------------------------------------------------------------------

/**
 * Alignment is an attribute on every text block rather than a block type, so it
 * applies to block types this plugin knows nothing about. Clicking the active
 * alignment clears it.
 */
export const Align: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'paragraph', align: 'center', children: [{ text: 'This paragraph is centred.' }] },
                { type: 'paragraph', align: 'right', children: [{ text: 'This one is right-aligned.' }] },
                { type: 'paragraph', children: [{ text: 'This one carries no alignment at all.' }] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[alignPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

/** Enter splits an item, Tab nests it, Shift-Tab lifts it. */
export const BulletList: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'An item — Enter for the next one' }] },
                                {
                                    type: 'bulletList',
                                    children: [
                                        {
                                            type: 'listItem',
                                            children: [
                                                { type: 'paragraph', children: [{ text: 'A nested item (Tab)' }] },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[bulletListPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** The same item shape as the bulleted list, numbered per level (decimal → alpha → roman). */
export const NumberedList: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'numberedList',
                    children: [
                        {
                            type: 'listItem',
                            children: [{ type: 'paragraph', children: [{ text: 'First' }] }],
                        },
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'Second — Tab nests it under First' }] },
                            ],
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[numberedListPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A to-do list: the same nesting, plus a `checked` attribute per item. */
export const CheckList: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'checkList',
                    children: [
                        {
                            type: 'checkItem',
                            checked: true,
                            children: [{ type: 'paragraph', children: [{ text: 'Click a checkbox to toggle it' }] }],
                        },
                        {
                            type: 'checkItem',
                            children: [{ type: 'paragraph', children: [{ text: 'Still to do' }] }],
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[checkListPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Comboboxes
// ---------------------------------------------------------------------------

/**
 * Whom you can mention is not something the package can know, so the
 * candidates (and the trigger character) come from the app.
 */
export const Mention: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Ask ' },
                        { type: 'mention', id: 'jane', label: 'Jane Doe' },
                        { text: ' about it.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>@</code> to open the picker. A mention is a void inline element: clicking one puts the
                    caret after it, and it deletes as one.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[mentionPlugin({ items: MENTIONABLE })]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Plugins without a schema of their own
// ---------------------------------------------------------------------------

/**
 * Typing shortcuts only: markdown prefixes, wrapping delimiters and typography.
 * A rule naming a mark, block or list that is not mounted simply never fires, so
 * this story mounts the plugins its rules target.
 */
export const Autoformat: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Try <code>### </code>, <code>&gt; </code>, <code>- </code>, <code>1. </code>, <code>[] </code>,
                    <code> **bold**</code>, <code>`code`</code>, <code>~~struck~~</code>, <code>{'->'}</code>,
                    <code> (c)</code>, <code>1/2</code>, <code>...</code> and <code>&quot;</code>.
                </p>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[
                        textStylePlugin(),
                        quotePlugin(),
                        boldPlugin(),
                        italicPlugin(),
                        underlinePlugin(),
                        strikethroughPlugin(),
                        codePlugin(),
                        bulletListPlugin(),
                        numberedListPlugin(),
                        checkListPlugin(),
                        autoformatPlugin(),
                    ]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** Shift-Enter breaks the line without ending the block. No toolbar: the keybinding is the whole feature. */
export const SoftBreak: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'One block,' }, { type: 'break' }, { text: 'two lines.' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>Shift-Enter adds a line to this block; Enter starts a new one — watch the JSON.</p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[softBreakPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Puts the selection back to plain text: marks gone, block type back to
 * paragraph, alignment cleared, lists unwrapped. It owns no schema — it only
 * drives the control API, so it needs something to undo.
 */
export const ResetFormatting: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'textStyle',
                    style: 'heading2',
                    align: 'center',
                    children: [{ text: 'A centred heading with ' }, { text: 'bold', bold: true }, { text: ' in it' }],
                },
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [{ type: 'paragraph', children: [{ text: 'A list item, for the unwrapping' }] }],
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>Select something, then hit the eraser button.</p>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[
                        textStylePlugin(),
                        boldPlugin(),
                        alignPlugin(),
                        bulletListPlugin(),
                        resetFormattingPlugin(),
                    ]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** Enter commits (blurs) instead of adding a paragraph — a single-line editor. */
export const BlurOnBreak: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'A title field. Press Enter to commit.' }] }],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[boldPlugin(), italicPlugin(), blurOnBreakPlugin()]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Lays the content out in columns and lets the author say where each one ends.
 * The column count belongs to the editor instance, not the document.
 */
export const ColumnBreak: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'First column.' }] },
                { type: 'columnBreak' },
                { type: 'paragraph', children: [{ text: 'Second column, after the break.' }] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>The column-break button inserts a break where the caret is.</p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[columnBreakPlugin({ columns: 2, gap: 24 })]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Everything at once
// ---------------------------------------------------------------------------

/**
 * Every built-in plugin: marks, value marks, blocks, lists, a void block, and
 * the mention combobox (`@`).
 */
export const AllPlugins: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'textStyle',
                    style: 'heading2',
                    children: [{ text: 'A heading — switch styles in the dropdown' }],
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Try typing here. Toggle ' },
                        { text: 'bold', bold: true },
                        { text: ' (⌘B), ' },
                        { text: 'italic', italic: true },
                        { text: ' (⌘I), ' },
                        { text: 'underline', underline: true },
                        { text: ', ' },
                        { text: 'strikethrough', strikethrough: true },
                        { text: ', ' },
                        { text: 'code', code: true },
                        { text: ', ' },
                        { text: 'colour', fontColor: { color: '#e11d48' } },
                        { text: ', or a ' },
                        { text: 'link', link: { href: 'https://example.com' } },
                        { text: '.' },
                    ],
                },
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'A list item — Tab nests, Shift-Tab lifts' }] },
                                {
                                    type: 'numberedList',
                                    children: [
                                        {
                                            type: 'listItem',
                                            children: [{ type: 'paragraph', children: [{ text: 'A nested item' }] }],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'checkList',
                    children: [
                        {
                            type: 'checkItem',
                            checked: true,
                            children: [{ type: 'paragraph', children: [{ text: 'Click a checkbox to toggle it' }] }],
                        },
                        {
                            type: 'checkItem',
                            children: [{ type: 'paragraph', children: [{ text: 'Still to do' }] }],
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    align: 'center',
                    children: [{ text: 'This paragraph is centred.' }],
                },
                { type: 'quote', children: [{ text: 'A quote block — toggle with the quote button.' }] },
                { type: 'textStyle', style: 'imageCaption', children: [{ text: 'An image caption text style.' }] },
                { type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image block' },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>@</code> to mention someone, <code>## </code> for a heading, <code> - </code> for a list,{' '}
                    <code>**bold**</code> for a mark.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={ALL_PLUGINS} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Consumer plugins — defined here, not in the package
// ---------------------------------------------------------------------------

/** A consumer-defined mark, plus the type its plugin writes on text nodes. */
type HighlightMark = {
    highlight?: boolean;
};

const highlightPlugin = (): RtePlugin => ({
    id: 'highlight',
    schema: {
        marks: [
            {
                key: 'highlight',
                // A plugin styles what it renders. The shipped plugins use SCSS
                // modules; a story is free to use the Tailwind it already has.
                render: ({ children }) => (
                    <mark className="tw-rounded-small tw-bg-container-warning tw-text-container-warning-on-warning-container">
                        {children}
                    </mark>
                ),
            },
        ],
    },
    toolbar: (api) => {
        const active = 'highlight' in api.selection.get().marks;
        return (
            <button
                type="button"
                aria-pressed={active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => api.marks.toggle('highlight')}
                className={toolbarButtonClasses(active)}
            >
                Highlight
            </button>
        );
    },
    hotkeys: { 'Mod-h': (api) => api.marks.toggle('highlight') },
});

/**
 * The type juggling a consumer plugin costs: one type argument naming the
 * extra mark. Everything the shipped plugins contribute stays checked.
 */
export const ConsumerMark: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument<RteBlock<RteText & HighlightMark>>>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'This ' },
                        { text: 'highlight', highlight: true },
                        {
                            text: ' mark comes from a plugin defined in the story file — the package was not modified for it.',
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin(), highlightPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A consumer-defined block type, following the shipped QuoteBlock pattern. */
type CalloutBlock = {
    type: 'callout';
    children: RteInlineNode[];
};

const calloutPlugin = (): RtePlugin => ({
    id: 'callout',
    schema: {
        blocks: [
            {
                type: 'callout',
                render: ({ children }) => (
                    <aside className="tw-m-0 tw-rounded-medium tw-border tw-border-warning tw-bg-container-warning tw-px-3 tw-py-2">
                        {children}
                    </aside>
                ),
                parseRules: [{ tag: 'aside' }],
            },
        ],
    },
    toolbar: (api) => {
        const active = api.selection.get().block?.type === 'callout';
        return (
            <button
                type="button"
                aria-pressed={active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => (active ? api.blocks.setType('paragraph') : api.blocks.setType('callout'))}
                className={toolbarButtonClasses(active)}
            >
                💡
            </button>
        );
    },
});

/** An extra block type joins the official union in the same type argument. */
export const ConsumerBlock: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument<RteBlock | CalloutBlock>>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'A consumer-defined block type: hit 💡 to toggle a callout.' }],
                },
                {
                    type: 'callout',
                    children: [{ text: 'This callout block comes from a plugin defined in the story file.' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin(), calloutPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * A consumer-defined void inline element, driven by its own combobox — the same
 * contract the shipped mention plugin uses, from outside the package.
 */
type EmbedInline = {
    type: 'embed';
    provider: string;
};

const EMBEDS = [
    { id: 'figma', label: 'Figma file', hint: '🎨' },
    { id: 'loom', label: 'Loom recording', hint: '🎥' },
    { id: 'sheet', label: 'Spreadsheet', hint: '📊' },
];

/**
 * A consumer-written picker, to show what the floating contract gives an external
 * plugin: the editor anchors this at the trigger and hands over the keys through
 * `onKeys`; the list, the highlight and what picking one does are all local.
 */
const EmbedPicker = ({ context }: { context: FloatingContext }): ReactNode => {
    const { api, query, clearQuery, close, onKeys } = context;
    const found = EMBEDS.filter((embed) => embed.label.toLowerCase().includes(query.toLowerCase()));
    // Tagged with its query, so a new list starts at the top on its own.
    const [highlighted, setHighlighted] = useState({ query, index: 0 });
    const active = highlighted.query === query ? Math.min(highlighted.index, found.length - 1) : 0;

    const choose = (item: (typeof EMBEDS)[number]): void => {
        clearQuery();
        api.insert('embed', { provider: item.id });
        api.insertText(' ');
    };

    useEffect(() =>
        onKeys((event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                const step = event.key === 'ArrowDown' ? 1 : found.length - 1;
                setHighlighted({ query, index: (active + step) % found.length });
                return true;
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
                const item = found[active];
                if (item) {
                    choose(item);
                }
                return true;
            }
            if (event.key === 'Escape') {
                close();
                return true;
            }
            return false;
        }),
    );

    return (
        <ul role="listbox" aria-label="Embed suggestions" className="tw-m-0 tw-list-none tw-p-0 tw-text-body-small">
            {found.map((item, index) => (
                <li key={item.id} role="option" aria-selected={index === active}>
                    <button
                        type="button"
                        // Never take the selection away from the editor.
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(item)}
                        onMouseEnter={() => setHighlighted({ query, index })}
                        className={`tw-flex tw-w-full tw-gap-2 tw-rounded-small tw-px-2 tw-py-1 tw-text-left ${
                            index === active ? 'tw-bg-container-selected' : 'tw-bg-transparent'
                        }`}
                    >
                        <span aria-hidden>{item.hint}</span>
                        <span>{item.label}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
};

const embedPlugin = (): RtePlugin => ({
    id: 'embed',
    schema: {
        inlines: [
            {
                type: 'embed',
                attributes: { provider: { parseFromDomAttribute: 'data-embed' } },
                render: ({ node }) => {
                    // A render function knows what it declared, so it reads its own inline type.
                    const embed = node as EmbedInline;
                    return (
                        <span
                            data-embed={embed.provider}
                            className="tw-rounded-small tw-bg-container-highlight tw-px-1 tw-font-medium tw-text-container-highlight-on-highlight-container"
                        >
                            {`▤ ${embed.provider}`}
                        </span>
                    );
                },
                parseRules: [{ tag: 'span[data-embed]' }],
            },
        ],
    },
    floating: [{ anchor: { trigger: '/' }, render: (context) => <EmbedPicker context={context} /> }],
});

/** A consumer inline element widens the same parameter as a consumer mark. */
export const ConsumerInline: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument<RteBlock<EmbedInline>>>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Attach a ' },
                        { type: 'embed', provider: 'figma' },
                        { text: ' — or type / to pick another one.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>/</code> to open the consumer plugin&apos;s own picker.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[...defaultPlugins, embedPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};
