/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// Stories import only the package public API — the consumer-plugin stories at
// the bottom double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout) and inline element (Embed) without
// touching the package.
//
// One story per plugin, each mounting that plugin alone, so what a plugin
// contributes on its own is visible; the ones that need company to do anything
// (autoformat, reset formatting) say so.
import {
    AlignPlugin,
    AutoformatPlugin,
    BlurOnBreakPlugin,
    BoldPlugin,
    BulletListPlugin,
    CheckListPlugin,
    CodePlugin,
    createColumnBreakPlugin,
    createMentionPlugin,
    createTextStylePlugin,
    defaultPlugins,
    EmojiPlugin,
    FontColorPlugin,
    ImagePlugin,
    ItalicPlugin,
    LinkPlugin,
    type MentionItem,
    NumberedListPlugin,
    QuotePlugin,
    ResetFormattingPlugin,
    type RteBlock,
    type RteDocument,
    type RteInlineNode,
    type RtePlugin,
    type RteText,
    RichTextEditor,
    SoftBreakPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from './index';

// A self-contained SVG so the stories need no network.
const SAMPLE_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80"><rect width="320" height="80" rx="8" fill="#7c3aed"/><text x="160" y="48" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle">image block</text></svg>',
)}`;

/** Who can be mentioned is the app's business, which is why the mention plugin is a factory. */
const MENTIONABLE: MentionItem[] = [
    { id: 'jane', label: 'Jane Doe', hint: 'jane@example.com' },
    { id: 'john', label: 'John Smith', hint: 'john@example.com' },
    { id: 'ada', label: 'Ada Lovelace', hint: 'ada@example.com' },
    { id: 'design', label: 'Design team', hint: 'group' },
    { id: 'engineering', label: 'Engineering team', hint: 'group' },
];

/** Everything the package ships, plus the ones that need arguments. */
const ALL_PLUGINS: RtePlugin[] = [...defaultPlugins, createMentionPlugin({ items: MENTIONABLE })];

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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[TextStylePlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Which styles an editor offers is the host's call, so the plugin is a factory.
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
                    plugins={[createTextStylePlugin({ styles: ['paragraph', 'heading2', 'heading3'] })]}
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
                { type: 'quote', children: [{ text: 'A quote block — toggle it with the ❝ button.' }] },
                { type: 'paragraph', children: [{ text: 'A paragraph. Put the caret here and toggle.' }] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[QuotePlugin]} />
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
                { type: 'paragraph', children: [{ text: 'The 🖼 button asks for a URL and inserts a block.' }] },
                { type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image block' },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>Spike-level UX: a real implementation opens an asset picker.</p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[ImagePlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BoldPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[ItalicPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[UnderlinePlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[StrikethroughPlugin]} />
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
                    children: [{ text: 'Call ' }, { text: 'toggleMark()', code: true }, { text: ' (⌘E).' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[CodePlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[SubscriptPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[SuperscriptPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[FontColorPlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A value mark with its own flyout: link text, href, and an open-in-new-tab flag. */
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
                        { text: ' — open the flyout on it to edit or remove it, or on nothing to add one.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[LinkPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[AlignPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BulletListPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[NumberedListPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[CheckListPlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// ---------------------------------------------------------------------------
// Comboboxes
// ---------------------------------------------------------------------------

/** Typing `:` opens the picker at the caret; the 🙂 button opens the same one. */
export const Emoji: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>:</code> and then a name — <code>:tha</code> finds &quot;thanks&quot;.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[EmojiPlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * A factory: whom you can mention is not something the package can know, so the
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
                    Type <code>@</code> to open the picker. A mention is a void inline element, so it deletes as one.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[createMentionPlugin({ items: MENTIONABLE })]} />
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
                        TextStylePlugin,
                        QuotePlugin,
                        BoldPlugin,
                        ItalicPlugin,
                        UnderlinePlugin,
                        StrikethroughPlugin,
                        CodePlugin,
                        BulletListPlugin,
                        NumberedListPlugin,
                        CheckListPlugin,
                        AutoformatPlugin,
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[SoftBreakPlugin]} />
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
                <p className={HINT}>Select something, then hit T̶x̶.</p>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[TextStylePlugin, BoldPlugin, AlignPlugin, BulletListPlugin, ResetFormattingPlugin]}
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BoldPlugin, ItalicPlugin, BlurOnBreakPlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Lays the content out in columns and lets the author say where each one ends.
 * A factory: the column count belongs to the editor instance, not the document.
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
                <p className={HINT}>The ⇥| button inserts a break where the caret is.</p>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[createColumnBreakPlugin({ columns: 2, gap: 24 })]}
                />
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
 * the two comboboxes (`@` for mentions, `:` for emoji).
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
                { type: 'quote', children: [{ text: 'A quote block — toggle with the ❝ button.' }] },
                { type: 'textStyle', style: 'imageCaption', children: [{ text: 'An image caption text style.' }] },
                { type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image block' },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>@</code> to mention someone, <code>:</code> for emoji, <code>## </code> for a heading,
                    <code> - </code> for a list, <code>**bold**</code> for a mark.
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

const HighlightPlugin: RtePlugin = {
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
    toolbar: (api) => (
        <button
            type="button"
            aria-pressed={api.isMarkActive('highlight')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => api.toggleMark('highlight')}
            className={toolbarButtonClasses(api.isMarkActive('highlight'))}
        >
            Highlight
        </button>
    ),
    hotkeys: { 'Mod-h': (api) => api.toggleMark('highlight') },
};

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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BoldPlugin, HighlightPlugin]} />
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

const CalloutPlugin: RtePlugin = {
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
        const active = api.getCurrentBlock()?.type === 'callout';
        return (
            <button
                type="button"
                aria-pressed={active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => (active ? api.setBlockType('paragraph') : api.setBlockType('callout'))}
                className={toolbarButtonClasses(active)}
            >
                💡
            </button>
        );
    },
};

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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BoldPlugin, CalloutPlugin]} />
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

const EmbedPlugin: RtePlugin = {
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
    combobox: {
        trigger: '/',
        items: (query) => EMBEDS.filter((embed) => embed.label.toLowerCase().includes(query.toLowerCase())),
        onSelect: (item, api) => {
            api.insert('embed', { provider: item.id });
            api.insertText(' ');
        },
    },
};

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
                <RichTextEditor value={doc} onChange={setDoc} plugins={[...defaultPlugins, EmbedPlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};
