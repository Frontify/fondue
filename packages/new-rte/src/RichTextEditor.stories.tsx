/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';

// Stories import only the package public API — the consumer-plugin stories
// below double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout), and inline element (Mention)
// without touching the package.
import {
    BoldPlugin,
    createDocument,
    defaultPlugins,
    type FondueRtePlugin,
    type FrontifyBlockNode,
    type FrontifyDocument,
    type FrontifyInlineElementNode,
    type FrontifyInlineNode,
    ItalicPlugin,
    LinkPlugin,
    RichTextEditor,
} from './index';

// A self-contained SVG so the stories need no network.
const SAMPLE_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80"><rect width="320" height="80" rx="8" fill="#7c3aed"/><text x="160" y="48" font-family="sans-serif" font-size="20" fill="#fff" text-anchor="middle">image block</text></svg>',
)}`;

/**
 * Story chrome is styled with the Fondue Tailwind preset (`tw-` prefix, token-backed
 * utilities). The package itself ships plain CSS — Tailwind is Storybook-only here.
 */
const toolbarButtonClasses = (active: boolean): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

/** Editor + live document JSON, side by side. */
const Demo = ({
    plugins,
    initial,
    header,
}: {
    plugins: FondueRtePlugin[];
    initial: FrontifyDocument;
    header?: (doc: FrontifyDocument, setDoc: (doc: FrontifyDocument) => void) => ReactNode;
}): ReactNode => {
    const [doc, setDoc] = useState(initial);
    return (
        <div className="tw-grid tw-grid-cols-2 tw-content-start tw-gap-4 tw-p-4 tw-font-primary">
            {header ? <div className="tw-col-span-full tw-flex tw-gap-2">{header(doc, setDoc)}</div> : null}
            <RichTextEditor value={doc} onChange={setDoc} plugins={plugins} />
            <pre className="tw-m-0 tw-min-h-[200px] tw-overflow-auto tw-rounded tw-bg-surface-dim tw-p-3 tw-font-monospace tw-text-x-small tw-leading-medium">
                {JSON.stringify(doc, null, 2)}
            </pre>
        </div>
    );
};

const meta: Meta<typeof RichTextEditor> = {
    title: 'RTE v2 / Spike',
    component: RichTextEditor,
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

// ---------------------------------------------------------------------------
// Editor configurations
// ---------------------------------------------------------------------------

/** Every built-in plugin: marks, value marks, blocks, and a void block. */
export const AllPlugins: Story = {
    render: () => (
        <Demo
            plugins={defaultPlugins}
            initial={createDocument([
                { type: 'heading', level: 2, children: [{ text: 'A heading — switch levels in the style dropdown' }] },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Try typing here. Toggle ' },
                        { text: 'bold', bold: true },
                        { text: ' (⌘B), ' },
                        { text: 'italic', italic: true },
                        { text: ' (⌘I), or a ' },
                        { text: 'link', link: { href: 'https://frontify.com' } },
                        { text: '.' },
                    ],
                },
                { type: 'quote', children: [{ text: 'A quote block — toggle with the ❝ button.' }] },
                { type: 'image', src: SAMPLE_IMAGE, alt: 'Sample image block' },
            ])}
        />
    ),
};

/** No plugins at all: a plain-paragraph editor. No toolbar renders. */
export const PlainText: Story = {
    render: () => (
        <Demo
            plugins={[]}
            initial={createDocument([
                { type: 'paragraph', children: [{ text: 'Just paragraphs. No plugins, no toolbar, no marks.' }] },
            ])}
        />
    ),
};

/** A reduced configuration: inline formatting only, no block types — a comment box. */
export const CommentBox: Story = {
    render: () => (
        <Demo
            plugins={[BoldPlugin, ItalicPlugin, LinkPlugin]}
            initial={createDocument([
                {
                    type: 'paragraph',
                    children: [{ text: 'Marks only — headings, quotes, and images are not mounted here.' }],
                },
            ])}
        />
    ),
};

/** The document is controlled from outside: load and clear replace the editor content via the value prop. */
export const ControlledValue: Story = {
    render: () => (
        <Demo
            plugins={defaultPlugins}
            initial={createDocument([
                { type: 'paragraph', children: [{ text: 'Use the buttons above to replace this content.' }] },
            ])}
            header={(_doc, setDoc) => (
                <>
                    <button
                        type="button"
                        className={toolbarButtonClasses(false)}
                        onClick={() =>
                            setDoc(
                                createDocument([
                                    { type: 'heading', level: 2, children: [{ text: 'Loaded document' }] },
                                    {
                                        type: 'paragraph',
                                        children: [{ text: 'This content was set from outside the editor.' }],
                                    },
                                ]),
                            )
                        }
                    >
                        Load sample
                    </button>
                    <button
                        type="button"
                        className={toolbarButtonClasses(false)}
                        onClick={() => setDoc(createDocument([{ type: 'paragraph', children: [{ text: '' }] }]))}
                    >
                        Clear
                    </button>
                </>
            )}
        />
    ),
};

/** Two independent editors with different configurations on one page. */
export const TwoEditors: Story = {
    render: () => (
        <div className="tw-grid">
            <Demo
                plugins={defaultPlugins}
                initial={createDocument([
                    { type: 'heading', level: 3, children: [{ text: 'Full editor' }] },
                    { type: 'paragraph', children: [{ text: 'All plugins mounted.' }] },
                ])}
            />
            <Demo
                plugins={[BoldPlugin]}
                initial={createDocument([
                    { type: 'paragraph', children: [{ text: 'Bold-only editor — instances are independent.' }] },
                ])}
            />
        </div>
    ),
};

// ---------------------------------------------------------------------------
// Consumer plugins — defined here, not in the package
// ---------------------------------------------------------------------------

/** A consumer-defined mark. */
const HighlightPlugin: FondueRtePlugin = {
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

export const ConsumerMark: Story = {
    render: () => (
        <Demo
            plugins={[BoldPlugin, HighlightPlugin]}
            initial={createDocument([
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
            ])}
        />
    ),
};

/** A consumer-defined block type, following the shipped QuoteBlock pattern. */
type CalloutBlock = {
    type: 'callout';
    children: FrontifyInlineNode[];
};

const isCalloutBlock = (node: FrontifyBlockNode): node is CalloutBlock => node.type === 'callout';

const CalloutPlugin: FondueRtePlugin = {
    id: 'callout',
    schema: {
        blocks: [
            {
                type: 'callout',
                render: ({ children, attributes }) => (
                    <aside
                        {...attributes}
                        className="tw-m-0 tw-rounded-medium tw-border tw-border-warning tw-bg-container-warning tw-px-3 tw-py-2"
                    >
                        {children}
                    </aside>
                ),
                parseRules: [{ tag: 'aside' }],
            },
        ],
    },
    toolbar: (api) => {
        const current = api.getCurrentBlock();
        const active = current !== null && isCalloutBlock(current);
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

export const ConsumerBlock: Story = {
    render: () => (
        <Demo
            plugins={[BoldPlugin, CalloutPlugin]}
            initial={createDocument<CalloutBlock>([
                {
                    type: 'paragraph',
                    children: [{ text: 'A consumer-defined block type: hit 💡 to toggle a callout.' }],
                },
                {
                    type: 'callout',
                    children: [{ text: 'This callout block comes from a plugin defined in the story file.' }],
                },
            ])}
        />
    ),
};

/** A consumer-defined void inline element. */
type MentionInline = {
    type: 'mention';
    id: string;
    label: string;
};

const isMention = (node: FrontifyInlineElementNode): node is MentionInline => node.type === 'mention';

const MentionPlugin: FondueRtePlugin = {
    id: 'mention',
    schema: {
        inlines: [
            {
                type: 'mention',
                attributes: {
                    id: { parseFromDomAttribute: 'data-mention-id' },
                    label: { parseFromDomAttribute: 'data-mention-label' },
                },
                render: ({ node, attributes }) => {
                    const mention = isMention(node) ? node : null;
                    return (
                        <span
                            {...attributes}
                            data-mention-id={mention?.id}
                            data-mention-label={mention?.label}
                            className="tw-rounded-small tw-bg-container-highlight tw-px-1 tw-font-medium tw-text-container-highlight-on-highlight-container"
                        >
                            @{mention?.label}
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
                    api.insertInline('mention', { id: label.toLowerCase(), label });
                }
            }}
            className={toolbarButtonClasses(false)}
        >
            @
        </button>
    ),
};

export const ConsumerInline: Story = {
    render: () => (
        <Demo
            plugins={[...defaultPlugins, MentionPlugin]}
            initial={createDocument([
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Ask ' },
                        { type: 'mention', id: 'jane', label: 'Jane' },
                        { text: ' about the review — or insert your own mention with the @ button.' },
                    ],
                },
            ])}
        />
    ),
};
