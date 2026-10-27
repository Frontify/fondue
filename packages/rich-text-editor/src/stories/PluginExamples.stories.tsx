/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';

// Stories import only the package public API. The consumer-plugin stories at
// the bottom double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout) and inline element (Embed) without
// touching the package.
//
// One story per plugin, each mounting that plugin alone, so what a plugin
// contributes on its own is visible. The ones that need company to do anything
// (markdown shortcuts, reset formatting) say so.
import {
    alignPlugin,
    blurOnBreakPlugin,
    boldPlugin,
    bulletListPlugin,
    checkListPlugin,
    codePlugin,
    columnBreakPlugin,
    defaultPlugins,
    defineBlock,
    defineInline,
    defineMark,
    emojiPlugin,
    fontColorPlugin,
    italicPlugin,
    linkPlugin,
    type MentionItem,
    mentionPlugin,
    type MentionValue,
    numberedListPlugin,
    quotePlugin,
    resetFormattingPlugin,
    type RteDocument,
    type RteDocumentWith,
    type RtePlugin,
    RichTextEditor,
    softBreakPlugin,
    strikethroughPlugin,
    subscriptPlugin,
    superscriptPlugin,
    textStylePlugin,
    underlinePlugin,
} from '../index';

/** An avatar as an app would hand one over; inline here so the story needs no network. */
const ADA_AVATAR = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><rect width="22" height="22" fill="#7a5cff"/><text x="11" y="15" font-size="10" font-family="sans-serif" fill="#fff" text-anchor="middle">AL</text></svg>',
)}`;

/** Who can be mentioned is the app's business, which is why the mention plugin requires it as an option. */
const MENTIONABLE: readonly MentionItem[] = [
    { id: 'jane', username: 'jane', name: 'Jane Doe' },
    { id: 'john', username: 'john', name: 'John Smith' },
    { id: 'ada', username: 'ada', name: 'Ada Lovelace', image: ADA_AVATAR },
    { id: 'design', username: 'design', name: 'Design team', kind: 'group' },
    { id: 'engineering', username: 'engineering', name: 'Engineering team', kind: 'group' },
    { id: 'all', username: 'all', name: 'Everyone in this document', kind: 'all' },
];

/** Where a mention links to — a profile page in a real app. Everyone has no profile, so `@all` is text. */
const profileHref = (mention: MentionValue): string | undefined =>
    mention.kind === 'all' ? undefined : `#/people/${mention.id}`;

/** Everything the package ships, plus the ones that need arguments. */
const ALL_PLUGINS: readonly RtePlugin[] = [...defaultPlugins, mentionPlugin({ items: MENTIONABLE, href: profileHref })];

/**
 * Story chrome is styled with the `@frontify/fondue-tokens` Tailwind preset
 * (`tw-` prefix, token-backed utilities). The package itself ships plain CSS —
 * Tailwind is Storybook-only here.
 */
const LAYOUT = 'tw-grid tw-grid-cols-2 tw-content-start tw-gap-4 tw-p-4 tw-font-primary';
const JSON_PANEL =
    'tw-m-0 tw-min-h-[200px] tw-overflow-auto tw-rounded tw-bg-surface-dim tw-p-3 tw-font-monospace tw-text-x-small tw-leading-medium';
const HINT = 'tw-col-span-full tw-m-0 tw-body-small tw-text-secondary';

/**
 * The field box around an editor. The editor draws none of its own — no
 * border, background or inset — so an app wraps it the same way.
 */
const FRAME =
    'tw-rounded tw-border tw-border-solid tw-border-line-mid tw-bg-surface tw-px-small tw-py-x-small tw-shadow hover:tw-border-line-strong focus-within:tw-border-line-strong';

const toolbarButtonClasses = (active: boolean): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-solid tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins',
    component: RichTextEditor,
    parameters: {
        status: {
            type: 'beta',
        },
    },
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

// Block types

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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[textStylePlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Which styles an editor offers is the host's call, so it is a constructor
 * option. This one offers two heading levels and nothing else — and because the
 * offered set is also what pasted HTML may become, an `h1` pasted in here lands
 * as a paragraph rather than as a heading the dropdown cannot show.
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
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[textStylePlugin({ styles: ['paragraph', 'heading2', 'heading3'] })]}
                    />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[quotePlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Marks

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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[italicPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[underlinePlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[strikethroughPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[codePlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[subscriptPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[superscriptPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[fontColorPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[linkPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Block attributes

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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[alignPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Lists

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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[bulletListPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[numberedListPlugin()]} />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[checkListPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Inline elements

/**
 * Whom you can mention is not something the package can know, so the
 * candidates (and the trigger character) come from the app. Given as a list,
 * they are matched against what is typed by username and name; a function
 * instead does its own lookup.
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
                        { type: 'mention', id: 'jane', username: 'jane', name: 'Jane Doe' },
                        { text: ' or ' },
                        { type: 'mention', id: 'design', username: 'design', name: 'Design team', kind: 'group' },
                        { text: ' about it, and tell ' },
                        { type: 'mention', id: 'all', username: 'all', name: 'Everyone in this document', kind: 'all' },
                        { text: '.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>@</code> to open the picker. A mention is a void inline element: clicking one puts the
                    caret after it, and it deletes as one. A mention names a person, a group or everyone; the picker
                    shows an avatar when the app gives one.
                </p>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[mentionPlugin({ items: MENTIONABLE, href: profileHref })]}
                    />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Plugins without a schema of their own

/**
 * Emoji go into the text as the characters they are, so the document holds no
 * emoji node: pick one from the toolbar, or type `:` and a shortcode.
 */
export const Emoji: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Shipped it 🚀' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>:smi</code> for suggestions, or <code>:tada:</code> to insert 🎉 outright. A colon inside
                    a word (<code>10:30</code>) or followed by a space stays a colon.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[emojiPlugin()]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * Markdown shortcuts: prefixes and wrapping delimiters, declared by the plugins
 * they target. A rule naming a mark, block or list that is not mounted simply never fires,
 * so this story mounts the plugins its rules target.
 */
export const MarkdownShortcuts: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Try <code>### </code>, <code>&gt; </code>, <code>- </code>, <code>1. </code>, <code>[] </code>,
                    <code> **bold**</code>, <code>`code`</code>, and <code>~~struck~~</code>.
                </p>
                <div className={FRAME}>
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
                        ]}
                    />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[softBreakPlugin()]} />
                </div>
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
                <div className={FRAME}>
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
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[boldPlugin(), italicPlugin(), blurOnBreakPlugin()]}
                    />
                </div>
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
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[columnBreakPlugin({ columns: 2, gap: '24px' })]}
                    />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Everything at once

/**
 * Every built-in plugin: marks, value marks, blocks, lists, a void block, and
 * mentions (`@`).
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
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>@</code> to mention someone, <code>## </code> for a heading, <code> - </code> for a list,{' '}
                    <code>**bold**</code> for a mark.
                </p>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={ALL_PLUGINS} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

// Consumer plugins — defined here, not in the package

/** A consumer-defined mark, plus the type its plugin writes on text nodes. */
type HighlightMark = {
    highlight?: boolean;
};

const highlightPlugin = (): RtePlugin => ({
    id: 'highlight',
    marks: {
        highlight: defineMark({
            toHtml: () => ({
                tag: 'mark',
                attrs: {
                    class: 'tw-rounded-small tw-bg-container-warning tw-text-container-warning-on-warning-container',
                },
                children: true,
            }),
            parse: [{ tag: 'mark' }],
        }),
    },
    toolbarItem: ({ api, selection }) => {
        const active = 'highlight' in selection.marks;
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
 * The type juggling a consumer plugin costs: one type argument naming the extra
 * mark. Everything the shipped plugins contribute stays checked.
 */
export const ConsumerMark: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocumentWith<{ mark: HighlightMark }>>({
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin(), highlightPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A consumer-defined block type, following the shipped QuoteBlock pattern. */
type CalloutBlock = {
    type: 'callout';
    children: RtePlugin.InlineNode[];
};

const calloutPlugin = (): RtePlugin => ({
    id: 'callout',
    blocks: {
        callout: defineBlock({
            content: 'text',
            toHtml: () => ({
                tag: 'aside',
                attrs: {
                    class: 'tw-m-0 tw-rounded-medium tw-border tw-border-solid tw-border-warning tw-bg-container-warning tw-px-3 tw-py-2',
                },
                children: true,
            }),
            parse: [{ tag: 'aside' }],
        }),
    },
    toolbarItem: ({ api, selection }) => {
        const active = selection.block?.type === 'callout';
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
        const [doc, setDoc] = useState<RteDocumentWith<{ block: CalloutBlock }>>({
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin(), calloutPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * A consumer-defined void inline element whose `render.edit` draws its own
 * picker while it has no value — the same contract the shipped mention plugin
 * uses, from outside the package.
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

type EmbedValue = Omit<EmbedInline, 'type'>;

const embedClasses =
    'tw-rounded-small tw-bg-container-highlight tw-px-1 tw-font-medium tw-text-container-highlight-on-highlight-container';

/**
 * A consumer-written picker, showing what an inline's `render.edit` gives
 * an external plugin: the node is inserted without a value, and the component
 * completes it with `setValue` — or takes it away with `remove`.
 */
const EmbedDraft = ({
    onChoose,
    onRemove,
}: {
    onChoose: (provider: string) => void;
    onRemove: () => void;
}): ReactNode => (
    <span role="listbox" aria-label="Embed suggestions" className="tw-inline-flex tw-gap-1">
        {EMBEDS.map((item) => (
            <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={false}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onChoose(item.id)}
                className="tw-rounded-small tw-bg-container-secondary tw-px-1"
            >
                <span aria-hidden>{item.hint}</span> {item.label}
            </button>
        ))}
        <button type="button" aria-label="Cancel" onClick={onRemove} className="tw-px-1">
            ×
        </button>
    </span>
);

const embedPlugin = (): RtePlugin => ({
    id: 'embed',
    inlines: {
        embed: defineInline<EmbedValue>({
            toHtml: ({ provider }) => ({
                tag: 'span',
                attrs: { 'data-embed': provider, class: embedClasses },
                children: `▤ ${provider}`,
            }),
            parse: [{ tag: 'span[data-embed]', value: (element) => ({ provider: element.dataset.embed ?? '' }) }],
            render: {
                edit: ({ value, setValue, remove, api }) =>
                    value === null ? (
                        <EmbedDraft
                            onChoose={(provider) => {
                                setValue({ provider });
                                api.focus();
                            }}
                            onRemove={() => {
                                remove();
                                api.focus();
                            }}
                        />
                    ) : (
                        <span data-embed={value.provider} className={embedClasses}>{`▤ ${value.provider}`}</span>
                    ),
            },
        }),
    },
    // An empty embed, which its `render.edit` then takes over.
    hotkeys: { '/': (api) => api.insert('embed') },
});

/** A consumer inline element widens the same parameter as a consumer mark. */
export const ConsumerInline: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocumentWith<{ inline: EmbedInline }>>({
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[...defaultPlugins, embedPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};
