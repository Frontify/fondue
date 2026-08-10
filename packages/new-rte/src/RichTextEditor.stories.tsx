/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// Stories import only the package public API — the consumer-plugin stories
// below double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout), and inline element (Mention)
// without touching the package.
import {
    BoldPlugin,
    defaultPlugins,
    type RteBlock,
    type RteDocument,
    type RteInlineNode,
    type RtePlugin,
    type RteText,
    ItalicPlugin,
    LinkPlugin,
    RichTextEditor,
} from './index';

// A self-contained SVG so the stories need no network.
const SAMPLE_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80"><rect width="320" height="80" rx="8" fill="#7c3aed"/><text x="160" y="48" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle">image block</text></svg>',
)}`;

/**
 * Story chrome is styled with the `@frontify/fondue-tokens` Tailwind preset (`tw-` prefix, token-backed
 * utilities). The package itself ships plain CSS — Tailwind is Storybook-only here.
 */
const LAYOUT = 'tw-grid tw-grid-cols-2 tw-content-start tw-gap-4 tw-p-4 tw-font-primary';
const JSON_PANEL =
    'tw-m-0 tw-min-h-[200px] tw-overflow-auto tw-rounded tw-bg-surface-dim tw-p-3 tw-font-monospace tw-text-x-small tw-leading-medium';

const toolbarButtonClasses = (active: boolean): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

const meta: Meta<typeof RichTextEditor> = {
    title: 'RTE v2 / Spike',
    component: RichTextEditor,
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

// ---------------------------------------------------------------------------
// Editor configurations
// ---------------------------------------------------------------------------

/**
 * Every built-in plugin: marks, value marks, blocks, and a void block.
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
                        { text: ' (⌘I), or a ' },
                        { text: 'link', link: { href: 'https://example.com' } },
                        { text: '.' },
                    ],
                },
                { type: 'quote', children: [{ text: 'A quote block — toggle with the ❝ button.' }] },
                { type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image block' },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={defaultPlugins} />
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
                    children: [{ text: 'Marks only — headings, quotes, and images are not mounted here.' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[BoldPlugin, ItalicPlugin, LinkPlugin]} />
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
                <RichTextEditor value={doc} onChange={setDoc} plugins={defaultPlugins} />
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
                    <RichTextEditor value={fullDoc} onChange={setFullDoc} plugins={defaultPlugins} />
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

/** A consumer-defined void inline element. */
type MentionInline = {
    type: 'mention';
    id: string;
    label: string;
};

const MentionPlugin: RtePlugin = {
    id: 'mention',
    schema: {
        inlines: [
            {
                type: 'mention',
                attributes: {
                    id: { parseFromDomAttribute: 'data-mention-id' },
                    label: { parseFromDomAttribute: 'data-mention-label' },
                },
                render: ({ node }) => {
                    // A render function knows what it declared, so it reads its own inline type.
                    const mention = node as MentionInline;
                    return (
                        <span
                            data-mention-id={mention.id}
                            data-mention-label={mention.label}
                            className="tw-rounded-small tw-bg-container-highlight tw-px-1 tw-font-medium tw-text-container-highlight-on-highlight-container"
                        >
                            @{mention.label}
                        </span>
                    );
                },
                parseRules: [{ tag: 'span[data-mention-id]' }],
            },
        ],
    },
    toolbar: (api) => (
        <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
                // Spike-level UX; a real implementation opens a user picker on `@`.
                const label = window.prompt('Mention who?');
                if (label) {
                    api.insert('mention', { id: label.toLowerCase(), label });
                }
            }}
            className={toolbarButtonClasses(false)}
        >
            @
        </button>
    ),
};

/** A consumer inline element widens the same parameter as a consumer mark. */
export const ConsumerInline: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument<RteBlock<MentionInline>>>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Ask ' },
                        { type: 'mention', id: 'jane', label: 'Jane' },
                        { text: ' about the review — or insert your own mention with the @ button.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={[...defaultPlugins, MentionPlugin]} />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};
