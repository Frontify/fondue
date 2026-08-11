/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// Stories import only the package public API — the consumer-plugin stories
// below double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout), and inline element (Embed)
// without touching the package.
import {
    AutoformatPlugin,
    BlurOnBreakPlugin,
    BoldPlugin,
    BulletListPlugin,
    CheckListPlugin,
    createColumnBreakPlugin,
    createMentionPlugin,
    defaultPlugins,
    EmojiPlugin,
    HeadingPlugin,
    ItalicPlugin,
    LinkPlugin,
    NumberedListPlugin,
    type MentionItem,
    type RteBlock,
    type RteDocument,
    type RteInlineNode,
    type RtePlugin,
    type RteText,
    RichTextEditor,
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

/** Everything the package ships, plus the one plugin that needs arguments. */
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
    title: 'Rich Text Editor',
    component: RichTextEditor,
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

// ---------------------------------------------------------------------------
// Editor configurations
// ---------------------------------------------------------------------------

/**
 * Every built-in plugin: marks, value marks, blocks, lists, a void block, and
 * the two comboboxes (`@` for mentions, `:` for emoji).
 *
 * `useState<RteDocument>` is the only type annotation an app needs: it
 * checks the document literal (block types, their attrs, and the mark keys on
 * every text node) and types `onChange` on the way back out.
 */
export const AllPlugins: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'heading', level: 2, children: [{ text: 'A heading — switch levels in the style dropdown' }] },
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
                { type: 'textStyle', variant: 'imageCaption', children: [{ text: 'An image caption text style.' }] },
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

/** No plugins at all: a plain-paragraph editor. No toolbar renders. */
export const PlainText: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Just paragraphs. No plugins, no toolbar, no marks.' }] }],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A reduced configuration: inline formatting only, no block types — a comment box. */
export const CommentBox: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Marks and mentions only — no headings, no lists, no images.' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[
                        BoldPlugin,
                        ItalicPlugin,
                        LinkPlugin,
                        EmojiPlugin,
                        createMentionPlugin({ items: MENTIONABLE }),
                    ]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * The props that are about the editor rather than its content: `placeholder`
 * (drawn on the empty document, where typing will start), `readonly` (content
 * without a toolbar) and `onBlur` (the document as it stood when focus left).
 *
 * Note that opening the link flyout takes focus out of the editable element, so
 * it commits too — plugin UI is outside the editor as far as the DOM is
 * concerned.
 */
export const PlaceholderReadonlyAndBlur: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });
        const [readonly, setReadonly] = useState(false);
        const [committed, setCommitted] = useState<RteDocument | null>(null);

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Starts empty, so the placeholder shows. Type, then click away — the panel on the right only updates
                    on blur. Toggling readonly keeps the content and the selection, and takes the toolbar away.
                </p>
                <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                    <button
                        type="button"
                        className={toolbarButtonClasses(readonly)}
                        onClick={() => setReadonly(!readonly)}
                    >
                        readonly: {String(readonly)}
                    </button>
                    <div className="tw-w-full">
                        <RichTextEditor
                            value={doc}
                            onChange={setDoc}
                            onBlur={setCommitted}
                            plugins={defaultPlugins}
                            placeholder="Write something…"
                            readonly={readonly}
                        />
                    </div>
                </div>
                <pre className={JSON_PANEL}>
                    {committed === null
                        ? 'Nothing committed yet — type, then click outside the editor.'
                        : JSON.stringify(committed, null, 2)}
                </pre>
            </div>
        );
    },
};

/**
 * The three list types on their own. Enter splits an item, Tab nests it,
 * Shift-Tab lifts it, and switching list type converts the list in place.
 */
export const Lists: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'numberedList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                { type: 'paragraph', children: [{ text: 'Numbered, then Tab on the next line' }] },
                            ],
                        },
                        {
                            type: 'listItem',
                            children: [{ type: 'paragraph', children: [{ text: 'Second item' }] }],
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type <code>- </code>, <code>1. </code> or <code>[] </code> on an empty line to start a list.
                </p>
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[BulletListPlugin, NumberedListPlugin, CheckListPlugin, BoldPlugin, AutoformatPlugin]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** Typing shortcuts only: markdown prefixes, wrapping delimiters, and typography. */
export const Autoformat: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Try <code>### </code>, <code>**bold**</code>, <code>`code`</code>, <code>~~struck~~</code>,
                    <code> {'->'} </code>, <code>(c)</code>, <code>1/2</code>, <code>...</code> and <code>&quot;</code>.
                </p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={ALL_PLUGINS} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A single-line editor: Enter commits (blurs) instead of adding a paragraph. */
export const SingleLine: Story = {
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

/** Content laid out in columns, with an explicit break block to end one. */
export const Columns: Story = {
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
                <RichTextEditor
                    value={doc}
                    onChange={setDoc}
                    plugins={[HeadingPlugin, BoldPlugin, createColumnBreakPlugin({ columns: 2, gap: 24 })]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * The document is controlled from outside: the buttons replace the editor
 * content through the `value` prop. The literals they pass need no annotation
 * — `setDoc` supplies the type.
 */
export const ControlledValue: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Use the buttons above to replace this content.' }] }],
        });

        return (
            <div className={LAYOUT}>
                <div className="tw-col-span-full tw-flex tw-gap-2">
                    <button
                        type="button"
                        className={toolbarButtonClasses(false)}
                        onClick={() =>
                            setDoc({
                                version: 1,
                                blocks: [
                                    { type: 'heading', level: 2, children: [{ text: 'Loaded document' }] },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'This content was set from outside the editor.' }],
                                    },
                                ],
                            })
                        }
                    >
                        Load sample
                    </button>
                    <button
                        type="button"
                        className={toolbarButtonClasses(false)}
                        onClick={() =>
                            setDoc({ version: 1, blocks: [{ type: 'paragraph', children: [{ text: '' }] }] })
                        }
                    >
                        Clear
                    </button>
                </div>
                <RichTextEditor value={doc} onChange={setDoc} plugins={ALL_PLUGINS} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** Two independent editors with different configurations on one page. */
export const TwoEditors: Story = {
    render: () => {
        const [fullDoc, setFullDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'heading', level: 3, children: [{ text: 'Full editor' }] },
                { type: 'paragraph', children: [{ text: 'All plugins mounted.' }] },
            ],
        });
        const [boldDoc, setBoldDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Bold-only editor — instances are independent.' }] }],
        });

        return (
            <div className="tw-grid">
                <div className={LAYOUT}>
                    <RichTextEditor value={fullDoc} onChange={setFullDoc} plugins={ALL_PLUGINS} />
                    <pre className={JSON_PANEL}>{JSON.stringify(fullDoc, null, 2)}</pre>
                </div>
                <div className={LAYOUT}>
                    <RichTextEditor value={boldDoc} onChange={setBoldDoc} plugins={[BoldPlugin]} />
                    <pre className={JSON_PANEL}>{JSON.stringify(boldDoc, null, 2)}</pre>
                </div>
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
        marks: [{ key: 'highlight', render: ({ children }) => <mark>{children}</mark> }],
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
    // Plain CSS on purpose: this is the plugin `styles` contract, which the
    // editor scopes to its own content — Tailwind never reaches in here.
    styles: 'mark { background: #fde68a; border-radius: 2px; }',
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
