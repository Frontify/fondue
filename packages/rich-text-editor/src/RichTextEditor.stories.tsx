/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

// Stories import only the package public API. The plugins have their own story
// file (`plugins.stories.tsx`); this one is about the editor itself — the props
// that are its own rather than a plugin's.
import {
    boldPlugin,
    mentionPlugin,
    defaultPlugins,
    italicPlugin,
    linkPlugin,
    type MentionItem,
    type RteDocument,
    RichTextEditor,
} from './index';

/** Who can be mentioned is the app's business, which is why the mention plugin requires it as an option. */
const MENTIONABLE: MentionItem[] = [
    { id: 'jane', label: 'Jane Doe', hint: 'jane@example.com' },
    { id: 'john', label: 'John Smith', hint: 'john@example.com' },
    { id: 'design', label: 'Design team', hint: 'group' },
];

/**
 * Story chrome is styled with the `@frontify/fondue-tokens` Tailwind preset
 * (`tw-` prefix, token-backed utilities). The package itself ships plain CSS —
 * Tailwind is Storybook-only here.
 */
const LAYOUT = 'tw-grid tw-grid-cols-2 tw-content-start tw-gap-4 tw-p-4 tw-font-primary';
const JSON_PANEL =
    'tw-m-0 tw-min-h-[200px] tw-overflow-auto tw-rounded tw-bg-surface-dim tw-p-3 tw-font-monospace tw-text-x-small tw-leading-medium';
const HINT = 'tw-col-span-full tw-m-0 tw-text-body-small tw-text-weak';

const buttonClasses = (active: boolean): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Editor',
    component: RichTextEditor,
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

/**
 * The editor with the zero-configuration plugins mounted.
 *
 * `useState<RteDocument>` is the only type annotation an app needs: it checks
 * the document literal (block types, their attrs, and the mark keys on every
 * text node) and types `onChange` on the way back out.
 */
export const Default: Story = {
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
                        { text: ' (⌘I), or a ' },
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
                            ],
                        },
                    ],
                },
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

/** `placeholder` is drawn on the empty document, where typing will start. */
export const Placeholder: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>Starts empty, so the placeholder shows. It goes away on the first character.</p>
                <RichTextEditor value={doc} onChange={setDoc} plugins={defaultPlugins} placeholder="Write something…" />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * `toolbarPlacement` decides where the controls live.
 *
 * The default, `'floating'`, hangs them over the selected text and shows them
 * only while there is a selection: select a few words to see the bar, and note
 * that it follows the text as the page scrolls.
 *
 * `'top'` puts them inside the frame as a strip above the content, always there
 * — what a field in a dense form wants, where a bar over the text would cover
 * what is being read.
 */
export const ToolbarPlacement: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Select a few of these words and the floating toolbar appears over them.' }],
                },
                {
                    type: 'paragraph',
                    children: [{ text: 'Switch the placement with the button above to compare the two.' }],
                },
            ],
        });
        const [floating, setFloating] = useState(true);

        return (
            <div className={LAYOUT}>
                <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                    <button type="button" className={buttonClasses(floating)} onClick={() => setFloating(!floating)}>
                        toolbarPlacement: {floating ? 'floating' : 'top'}
                    </button>
                    <div className="tw-w-full">
                        <RichTextEditor
                            value={doc}
                            onChange={setDoc}
                            plugins={defaultPlugins}
                            toolbarPlacement={floating ? 'floating' : 'top'}
                        />
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** `readonly` shows the content without allowing edits — the toolbar goes with it. */
export const Readonly: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'textStyle', style: 'heading3', children: [{ text: 'Read this, do not change it' }] },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Toggling readonly keeps the ' },
                        { text: 'content', bold: true },
                        { text: ' and the selection, and takes the toolbar away.' },
                    ],
                },
            ],
        });
        const [readonly, setReadonly] = useState(true);

        return (
            <div className={LAYOUT}>
                <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                    <button type="button" className={buttonClasses(readonly)} onClick={() => setReadonly(!readonly)}>
                        readonly: {String(readonly)}
                    </button>
                    <div className="tw-w-full">
                        <RichTextEditor value={doc} onChange={setDoc} plugins={defaultPlugins} readonly={readonly} />
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * `showEditor={false}` drops the editor's chrome — border, background, toolbar
 * and the inset around the text — so the document is rendered as plain content.
 * Paired with `readonly` it displays a document without looking like a field.
 * Toggle them independently to see which does what.
 */
export const ContentOnly: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'textStyle', style: 'heading3', children: [{ text: 'Just the content' }] },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'No border, no background, no toolbar — the ' },
                        { text: 'content', bold: true },
                        { text: ' sits in the page as if it were written there.' },
                    ],
                },
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [{ type: 'paragraph', children: [{ text: 'Plugin styling is untouched' }] }],
                        },
                    ],
                },
            ],
        });
        const [showEditor, setShowEditor] = useState(false);
        const [readonly, setReadonly] = useState(true);

        return (
            <div className={LAYOUT}>
                <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                    <div className="tw-flex tw-gap-2">
                        <button
                            type="button"
                            className={buttonClasses(showEditor)}
                            onClick={() => setShowEditor(!showEditor)}
                        >
                            showEditor: {String(showEditor)}
                        </button>
                        <button
                            type="button"
                            className={buttonClasses(readonly)}
                            onClick={() => setReadonly(!readonly)}
                        >
                            readonly: {String(readonly)}
                        </button>
                    </div>
                    <div className="tw-w-full">
                        <RichTextEditor
                            value={doc}
                            onChange={setDoc}
                            plugins={defaultPlugins}
                            showEditor={showEditor}
                            readonly={readonly}
                        />
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * `onBlur` hands over the document as it stood when focus left — the hook to
 * commit on, when saving on every keystroke would be too much. Note that
 * opening the link flyout commits too: plugin UI is outside the editable
 * element as far as the DOM is concerned.
 */
export const CommitOnBlur: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Edit me, then click outside the editor.' }] }],
        });
        const [committed, setCommitted] = useState<RteDocument | null>(null);

        return (
            <div className={LAYOUT}>
                <p className={HINT}>The panel on the right only updates on blur, not on every keystroke.</p>
                <RichTextEditor value={doc} onChange={setDoc} onBlur={setCommitted} plugins={defaultPlugins} />
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
                        className={buttonClasses(false)}
                        onClick={() =>
                            setDoc({
                                version: 1,
                                blocks: [
                                    { type: 'textStyle', style: 'heading2', children: [{ text: 'Loaded document' }] },
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
                        className={buttonClasses(false)}
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

/**
 * Nothing is mounted automatically: with no plugins the editor is a
 * plain-paragraph field, and no toolbar renders.
 */
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

/**
 * The `plugins` prop is the whole configuration surface: a reduced list gives a
 * comment box — inline formatting and mentions, no block types.
 */
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
                    plugins={[boldPlugin(), italicPlugin(), linkPlugin(), mentionPlugin({ items: MENTIONABLE })]}
                />
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** How many editors a page is expected to hold at the top of the range. */
const MANY = 30;

/** Fixed identities for a list that never reorders. */
const MANY_KEYS = Array.from({ length: MANY }, (_, index) => `editor-${index + 1}`);

/**
 * The load case this editor is built for: a page of editors, all live at once.
 *
 * Two things to watch. Mounting is timed and reported above, because that is
 * the cost that lands in one block on first paint. And typing in any one of
 * them should feel exactly as it does in the `Default` story: the engine owns
 * the content DOM, so a keystroke redraws the text it changed and nothing else.
 *
 * `defaultPlugins` is imported rather than built per editor, so all thirty
 * share one set of probed renders. Worth copying in an app that mounts many:
 * build the plugin array once, at module level, rather than inside the
 * component.
 */
export const ManyEditors: Story = {
    render: () => {
        const [docs, setDocs] = useState<RteDocument[]>(() =>
            Array.from(
                { length: MANY },
                (_, index): RteDocument => ({
                    version: 1,
                    blocks: [{ type: 'paragraph', children: [{ text: `Editor ${index + 1} — type here.` }] }],
                }),
            ),
        );
        const startedAtRef = useRef(performance.now());
        const [mountedIn, setMountedIn] = useState<number | null>(null);

        useEffect(() => {
            // A child's effects run before its parent's, so every editor below
            // is already live by the time this one does.
            setMountedIn(performance.now() - startedAtRef.current);
        }, []);

        return (
            <div className="tw-grid tw-gap-4 tw-p-4 tw-font-primary">
                <p className={HINT}>
                    {MANY} editors, each with its own document.
                    {mountedIn === null ? '' : ` Mounted in ${Math.round(mountedIn)}ms.`}
                </p>
                {docs.map((doc, index) => (
                    <RichTextEditor
                        key={MANY_KEYS[index]}
                        value={doc}
                        onChange={(next) =>
                            setDocs((previous) => previous.map((held, at) => (at === index ? next : held)))
                        }
                        plugins={defaultPlugins}
                    />
                ))}
            </div>
        );
    },
};

/** Two editors with different configurations on one page: instances are independent. */
export const TwoEditors: Story = {
    render: () => {
        const [fullDoc, setFullDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                { type: 'textStyle', style: 'heading3', children: [{ text: 'Full editor' }] },
                { type: 'paragraph', children: [{ text: 'The default plugins are mounted.' }] },
            ],
        });
        const [boldDoc, setBoldDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Bold-only editor — its own state, its own toolbar.' }] }],
        });

        return (
            <div className="tw-grid">
                <div className={LAYOUT}>
                    <RichTextEditor value={fullDoc} onChange={setFullDoc} plugins={defaultPlugins} />
                    <pre className={JSON_PANEL}>{JSON.stringify(fullDoc, null, 2)}</pre>
                </div>
                <div className={LAYOUT}>
                    <RichTextEditor value={boldDoc} onChange={setBoldDoc} plugins={[boldPlugin()]} />
                    <pre className={JSON_PANEL}>{JSON.stringify(boldDoc, null, 2)}</pre>
                </div>
            </div>
        );
    },
};
