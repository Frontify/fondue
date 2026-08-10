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

const toolbarButtonStyle = (active: boolean): React.CSSProperties => ({
    fontSize: 13,
    lineHeight: 1,
    padding: '3px 8px',
    border: '1px solid #d1d5db',
    background: active ? '#fde68a' : 'transparent',
    cursor: 'pointer',
    borderRadius: 4,
    color: '#374151',
    fontFamily: 'inherit',
});

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
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                padding: 16,
                boxSizing: 'border-box',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                alignContent: 'start',
            }}
        >
            {header ? <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>{header(doc, setDoc)}</div> : null}
            <RichTextEditor value={doc} onChange={setDoc} plugins={plugins} />
            <pre
                style={{
                    background: '#f4f4f4',
                    padding: 12,
                    margin: 0,
                    overflow: 'auto',
                    fontSize: 12,
                    lineHeight: 1.4,
                    borderRadius: 4,
                    minHeight: 200,
                }}
            >
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
                { type: 'heading', level: 2, children: [{ text: 'A heading — toggle levels with H1/H2/H3' }] },
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
        <div style={{ display: 'grid', gap: 0 }}>
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
            style={toolbarButtonStyle(api.isMarkActive('highlight'))}
        >
            Highlight
        </button>
    ),
    hotkeys: { 'Mod-h': (api) => api.toggleMark('highlight') },
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
                        style={{
                            margin: 0,
                            padding: '8px 12px',
                            background: '#fffbeb',
                            border: '1px solid #fcd34d',
                            borderRadius: 6,
                        }}
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
                style={toolbarButtonStyle(active)}
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
                            style={{
                                background: '#ede9fe',
                                color: '#6d28d9',
                                borderRadius: 4,
                                padding: '0 4px',
                                fontWeight: 500,
                            }}
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
            style={toolbarButtonStyle(false)}
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
