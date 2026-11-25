/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { type MarkdownLoss, parseMarkdown, serializeToMarkdown, type MarkdownOptions } from '../codecs';
// Stories import only the package public API. The plugins have their own story
// file (`PluginExamples.stories.tsx`); this one is about the editor itself — the props
// that are its own rather than a plugin's.
import { definePlugin, RichTextEditor, RichTextRenderer, type RteDocument, type RtePlugin } from '../index';
import {
    boldPlugin,
    bulletListContent,
    type BulletLevelLook,
    bulletListPlugin,
    checkListContent,
    checkListPlugin,
    columnBreakPlugin,
    defaultPlugins,
    italicPlugin,
    linkContent,
    linkPlugin,
    type MentionItem,
    mentionPlugin,
    numberedListContent,
    type NumberedLevelLook,
    numberedListPlugin,
    quoteContent,
    quotePlugin,
    tablePlugin,
    type TextLinkLook,
    textStyleContent,
    textStylePlugin,
    type TextStylePluginOptions,
    type TextStyleLook,
} from '../plugins';

/** Who can be mentioned is the app's business, which is why the mention plugin requires it as an option. */
const MENTIONABLE: readonly MentionItem[] = [
    { id: 'jane', username: 'jane', name: 'Jane Doe' },
    { id: 'john', username: 'john', name: 'John Smith' },
    { id: 'design', username: 'design', name: 'Design team', kind: 'group' },
];

/** Where a mention links to — a profile page in a real app. */
const profileHref = (mention: MentionItem): string => `#/people/${mention.id}`;

/**
 * Story chrome is styled with the `@frontify/fondue-tokens` Tailwind preset
 * (`tw-` prefix, token-backed utilities). The package itself ships plain CSS —
 * Tailwind is Storybook-only here.
 */
/** One column on a phone; beside the JSON panel the editor takes what is left, and `minmax(0, …)` lets it shrink. */
const LAYOUT =
    'tw-grid tw-grid-cols-1 md:tw-grid-cols-[minmax(0,1fr)_minmax(0,24rem)] tw-content-start tw-items-start tw-gap-4 tw-p-4 tw-font-primary';
const JSON_PANEL =
    'tw-m-0 tw-min-h-[200px] tw-overflow-auto tw-rounded tw-bg-surface-dim tw-text-primary tw-p-3 tw-font-monospace tw-text-x-small tw-leading-medium';
const HINT = 'tw-col-span-full tw-m-0 tw-body-small tw-text-secondary';

/**
 * The box around a renderer. The package draws none of its own — no border,
 * background or inset — so an app wraps it the same way.
 */
const SURFACE = 'tw-rounded tw-border tw-border-solid tw-border-line-mid tw-bg-surface tw-p-medium';

/** The field box around an editor, with Fondue Textarea's hover and focus looks. */
const FRAME = `${SURFACE} hover:tw-border-line-strong focus-within:tw-border-line-strong has-[[data-keyboard-focus=true]]:tw-ring-focus`;

/** Inline, so it wins over FRAME's hover and focus borders. */
const ERROR_FRAME_STYLE: CSSProperties = { borderColor: 'var(--color-error-default)' };

const FIELD = 'tw-flex tw-flex-col tw-gap-2 tw-max-w-xl tw-p-4 tw-font-primary';
const FIELD_LABEL = 'tw-body-small tw-text-primary';
const FIELD_ERROR = 'tw-m-0 tw-body-small';
const FIELD_ERROR_STYLE: CSSProperties = { color: 'var(--color-error-default)' };

const REQUIRED_LABEL_ID = 'required-story-label';
const INVALID_LABEL_ID = 'invalid-story-label';
const INVALID_ERROR_ID = 'invalid-story-error';
const INVALID_ERROR_TEXT = 'Enter a description.';

const buttonClasses = (active: boolean): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-solid tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Editor',
    component: RichTextEditor,
    parameters: {
        status: {
            type: 'experimental',
        },
    },
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
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            text: 'A list item — Tab nests, Shift-Tab lifts',
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
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className={FRAME}>
                        <RichTextEditor value={doc} onChange={setDoc} plugins={defaultPlugins} />
                    </div>
                    <div className={SURFACE}>
                        <RichTextRenderer value={doc} plugins={defaultPlugins} />
                    </div>
                </div>

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
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={defaultPlugins}
                        placeholder="Write something…"
                    />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** The editor sets `aria-required`; the host's label draws the asterisk. */
export const Required: Story = {
    args: { required: true },
    argTypes: { required: { control: 'boolean' } },
    render: (args) => {
        let asterisk: ReactNode = null;
        if (args.required) {
            asterisk = <span aria-hidden="true"> *</span>;
        }

        return (
            <div className={FIELD}>
                <span id={REQUIRED_LABEL_ID} className={FIELD_LABEL}>
                    Description
                    {asterisk}
                </span>
                <div className={FRAME}>
                    <RichTextEditor
                        plugins={defaultPlugins}
                        aria-labelledby={REQUIRED_LABEL_ID}
                        required={args.required}
                    />
                </div>
            </div>
        );
    },
};

/** The editor sets `aria-invalid` and `aria-errormessage`; the host draws the red border and the message. */
export const Invalid: Story = {
    args: { status: 'error' },
    argTypes: { status: { control: 'inline-radio', options: ['neutral', 'error'] } },
    render: (args) => {
        const isInvalid = args.status === 'error';
        let frameStyle: CSSProperties = {};
        if (isInvalid) {
            frameStyle = ERROR_FRAME_STYLE;
        }

        return (
            <div className={FIELD}>
                <span id={INVALID_LABEL_ID} className={FIELD_LABEL}>
                    Description
                </span>
                <div className={FRAME} style={frameStyle}>
                    <RichTextEditor
                        plugins={defaultPlugins}
                        aria-labelledby={INVALID_LABEL_ID}
                        aria-describedby={INVALID_ERROR_ID}
                        aria-errormessage={INVALID_ERROR_ID}
                        status={args.status}
                    />
                </div>
                <p id={INVALID_ERROR_ID} className={FIELD_ERROR} style={FIELD_ERROR_STYLE} hidden={!isInvalid}>
                    {INVALID_ERROR_TEXT}
                </p>
            </div>
        );
    },
};

/** How many paragraphs the long document of `MaxRows` holds. */
const MAX_ROWS_PARAGRAPH_COUNT = 20;

/** How many lines of body text `MaxRows` shows before the content scrolls. */
const MAX_ROWS_STORY_ROWS = 8;

/** `maxRows` caps the content at that many lines; past it the content scrolls below the toolbar. */
export const MaxRows: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: Array.from({ length: MAX_ROWS_PARAGRAPH_COUNT }, (_, index) => ({
                type: 'paragraph' as const,
                children: [{ text: `Paragraph ${index + 1}: scroll the content, the toolbar stays where it is.` }],
            })),
        });

        return (
            <div className={LAYOUT}>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={defaultPlugins}
                        maxRows={MAX_ROWS_STORY_ROWS}
                    />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * `toolbarPlacement` decides where the controls live.
 *
 * The default, `'top'`, puts them in a row above the content, always there —
 * what a field in a dense form wants, where a bar over the text would cover
 * what is being read.
 *
 * `'floating'` hangs them over the selected text and shows them only while
 * there is a selection: select a few words to see the bar, and note that it
 * follows the text as the page scrolls. See the `FloatingToolbar` story.
 */
export const ToolbarPlacement: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: 'Select a few of these words and the floating toolbar appears over them.',
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: 'Switch the placement with the button above to compare the two.',
                        },
                    ],
                },
            ],
        });
        const [floating, setFloating] = useState(false);

        return (
            <div className={LAYOUT}>
                <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                    <button type="button" className={buttonClasses(floating)} onClick={() => setFloating(!floating)}>
                        toolbarPlacement: {floating ? 'floating' : 'top'}
                    </button>
                    <div className="tw-w-full">
                        <div className={FRAME}>
                            <RichTextEditor
                                value={doc}
                                onChange={setDoc}
                                plugins={defaultPlugins}
                                toolbarPlacement={floating ? 'floating' : 'top'}
                            />
                        </div>
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * The floating bar, Notion-style. Select text and it appears over it: a "Turn
 * into" menu naming the block (text, headings, lists, quote), the inline marks
 * (bold, italic, link, colour…), alignment, subscript, superscript and reset
 * formatting, all in the bar itself.
 *
 * Type `/` on an empty line for the command menu: the same block types, plus
 * what can only be inserted (a column break). Keep typing to filter, ↑/↓ to
 * move, Enter or Tab to run, Escape to close. With text selected, Alt+F10 moves focus to the bar.
 */
export const FloatingToolbar: Story = {
    render: () => {
        const plugins = [...defaultPlugins, columnBreakPlugin()];
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Select some of this text to see the floating toolbar over it.' }],
                },
                { type: 'paragraph', children: [] },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>Select text for the bar, or type / on the empty line below for the command menu.</p>
                <div>
                    <div className={FRAME}>
                        <RichTextEditor
                            value={doc}
                            onChange={setDoc}
                            plugins={plugins}
                            toolbarPlacement="floating"
                            placeholder="Type / for commands"
                        />
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * `RichTextRenderer` draws a stored document with no editing engine — what a
 * published page or an SSR pass wants. Same `plugins` list as the editor.
 */
export const Renderer: Story = {
    render: () => {
        const doc: RteDocument = {
            version: 1,
            blocks: [
                {
                    type: 'textStyle',
                    style: 'heading2',
                    children: [{ text: 'Rendered, not edited' }],
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'This is ' },
                        { text: 'RichTextRenderer', bold: true },
                        { text: ' — JSON to React, no ProseMirror.' },
                    ],
                },
            ],
        };

        return (
            <div className={LAYOUT}>
                <div className={SURFACE}>
                    <RichTextRenderer value={doc} plugins={defaultPlugins} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * `readonly` shows the content without allowing edits — the toolbar goes with
 * it. A readonly editor draws the document the way `RichTextRenderer` does, so
 * toggling it keeps the content but not the selection: there is no editing
 * engine to hold one while readonly.
 */
export const Readonly: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'textStyle',
                    style: 'heading3',
                    children: [{ text: 'Read this, do not change it' }],
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Toggling readonly keeps the ' },
                        { text: 'content', bold: true },
                        {
                            text: ' and takes the toolbar away.',
                        },
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
                        <div className={FRAME}>
                            <RichTextEditor
                                value={doc}
                                onChange={setDoc}
                                plugins={defaultPlugins}
                                readonly={readonly}
                            />
                        </div>
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * A document saved by a newer version of the editor may hold what this one
 * would lose on save, so it is shown read-only with a notice saying why. The
 * notice text is the `newerVersion` label.
 */
export const NewerVersion: Story = {
    render: () => (
        <div className={LAYOUT}>
            <div className={FRAME}>
                <RichTextEditor
                    value={
                        {
                            // Far above any real version, so the story keeps showing the notice.
                            version: 1000,
                            blocks: [{ type: 'paragraph', children: [{ text: 'Saved by a newer editor.' }] }],
                        } as unknown as RteDocument
                    }
                    plugins={defaultPlugins}
                />
            </div>
        </div>
    ),
};

/**
 * `showEditor={false}` drops the editor's own UI — the toolbar and the `/` menu —
 * so only the content is rendered. The editor draws no box either way: the
 * frame here is the story's, as an app would draw it. Toggle the two
 * independently to see which does what.
 */
export const ContentOnly: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'textStyle',
                    style: 'heading3',
                    children: [{ text: 'Just the content' }],
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'No box, no toolbar — the ' },
                        { text: 'content', bold: true },
                        {
                            text: ' sits in the page as if it were written there.',
                        },
                    ],
                },
                {
                    type: 'bulletList',
                    children: [
                        {
                            type: 'listItem',
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [{ text: 'Plugin styling is untouched' }],
                                },
                            ],
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
                        <div className={FRAME}>
                            <RichTextEditor
                                value={doc}
                                onChange={setDoc}
                                plugins={defaultPlugins}
                                showEditor={showEditor}
                                readonly={readonly}
                            />
                        </div>
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
            blocks: [
                {
                    type: 'paragraph',
                    children: [{ text: 'Edit me, then click outside the editor.' }],
                },
            ],
        });
        const [committed, setCommitted] = useState<RteDocument | null>(null);

        return (
            <div className={LAYOUT}>
                <p className={HINT}>The panel on the right only updates on blur, not on every keystroke.</p>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} onBlur={setCommitted} plugins={defaultPlugins} />
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

/** A toolbar item that throws when told to, standing in for any bug in a plugin's UI. */
const crashingPlugin = (crash: boolean): RtePlugin =>
    definePlugin({
        id: 'crashing',
        toolbar: [
            {
                label: 'Crashing',
                render: () => {
                    if (crash) {
                        throw new Error('A toolbar item threw while rendering.');
                    }
                    return null;
                },
            },
        ],
    });
const WORKING_PLUGINS = [...defaultPlugins, crashingPlugin(false)];
const CRASHING_PLUGINS = [...defaultPlugins, crashingPlugin(true)];

/**
 * When something in the editor throws while rendering, the editor shows its
 * content read-only with a message and Try again, and hands the error to
 * `onError`; the rest of the page stays. Try again while the bug is still
 * there shows the same view again.
 */
export const CrashFallback: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Type something, then break the editor.' }] }],
        });
        const [crash, setCrash] = useState(false);
        const [report, setReport] = useState<string | null>(null);
        let plugins = WORKING_PLUGINS;
        if (crash) {
            plugins = CRASHING_PLUGINS;
        }

        return (
            <div className={LAYOUT}>
                <div className="tw-col-span-full tw-flex tw-gap-2">
                    <button type="button" className={buttonClasses(crash)} onClick={() => setCrash(true)}>
                        Break the editor
                    </button>
                    <button type="button" className={buttonClasses(!crash)} onClick={() => setCrash(false)}>
                        Fix the bug
                    </button>
                </div>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={plugins}
                        aria-label="Description"
                        onError={(error) => setReport(error.message)}
                    />
                </div>
                <pre className={JSON_PANEL}>{report ?? 'No crash yet: break the editor to see onError here.'}</pre>
            </div>
        );
    },
};

/**
 * The document is controlled from outside: the buttons replace the editor
 * content through the `value` prop. A literal passed straight to `setDoc`
 * needs no annotation, and one kept in a variable takes `RteDocument`. Save
 * keeps the document as it stands, and Cancel hands the saved one back, the
 * way a host discards an edit.
 */
export const ControlledValue: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: 'Use the buttons above to replace this content.',
                        },
                    ],
                },
            ],
        });
        const [saved, setSaved] = useState(doc);

        return (
            <div className={LAYOUT}>
                <div className="tw-col-span-full tw-flex tw-gap-2">
                    <button
                        type="button"
                        className={buttonClasses(false)}
                        onClick={() => {
                            const sample: RteDocument = {
                                version: 1,
                                blocks: [
                                    {
                                        type: 'textStyle',
                                        style: 'heading2',
                                        children: [{ text: 'Loaded document' }],
                                    },
                                    {
                                        type: 'paragraph',
                                        children: [
                                            {
                                                text: 'This content was set from outside the editor.',
                                            },
                                        ],
                                    },
                                ],
                            };
                            setDoc(sample);
                            setSaved(sample);
                        }}
                    >
                        Load sample
                    </button>
                    <button type="button" className={buttonClasses(false)} onClick={() => setSaved(doc)}>
                        Save
                    </button>
                    <button type="button" className={buttonClasses(false)} onClick={() => setDoc(saved)}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className={buttonClasses(false)}
                        onClick={() =>
                            setDoc({
                                version: 1,
                                blocks: [
                                    {
                                        type: 'paragraph',
                                        children: [{ text: '' }],
                                    },
                                ],
                            })
                        }
                    >
                        Clear
                    </button>
                </div>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={defaultPlugins} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** An annotation as a host stored it: a heading, inline formatting, a line break, an empty paragraph, a hand-typed list, a quote and a bare URL. */
const STORED_ANNOTATION = `## Feedback

The **new logo** is *close*, see the [brand guide](https://example.com/guide).
The second line stays in the same paragraph.

&nbsp;

- First point
- Second point

> Keep the margins as they are.

https://example.com`;

const MARKDOWN_OPTIONS: MarkdownOptions = { plugins: defaultPlugins, breaks: true };

/** The Markdown and the losses wrap, so a long line shows whole. */
const MARKDOWN_PANEL = `${JSON_PANEL} tw-whitespace-pre-wrap tw-break-words`;

const NO_LOSSES = 'No losses';

const formatLoss = ({ type, path }: MarkdownLoss): string => `${type} at ${path.join('.')}`;

type MarkdownRoundTripProps = {
    markdown: string;
    options: MarkdownOptions;
    plugins: readonly RtePlugin[];
};

const MarkdownRoundTrip = ({ markdown: stored, options, plugins }: MarkdownRoundTripProps) => {
    const [doc, setDoc] = useState(() => parseMarkdown(stored, options));
    const { markdown, losses } = useMemo(() => serializeToMarkdown(doc, options), [doc, options]);

    let lossesText = NO_LOSSES;
    if (losses.length > 0) {
        lossesText = losses.map(formatLoss).join('\n');
    }

    return (
        <div className={LAYOUT}>
            <p className={HINT}>
                Stored Markdown is read into the editor. Edit it: the Markdown on the right is what a host would save.
            </p>
            <div className={FRAME}>
                <RichTextEditor value={doc} onChange={setDoc} plugins={plugins} />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-4">
                <pre className={MARKDOWN_PANEL}>{markdown}</pre>
                <pre className={MARKDOWN_PANEL}>{lossesText}</pre>
            </div>
        </div>
    );
};

/**
 * Markdown in, an editable document, Markdown out. The stored Markdown is read into the editor with
 * `parseMarkdown`, and `serializeToMarkdown` writes the document back as you edit, listing in `losses`
 * what the Markdown could not keep.
 */
export const Markdown: Story = {
    render: () => (
        <MarkdownRoundTrip markdown={STORED_ANNOTATION} options={MARKDOWN_OPTIONS} plugins={defaultPlugins} />
    ),
};

/** A heading and a table as a host stored them: bold in a cell, and inline code holding an escaped pipe. */
const STORED_TABLE = `## Type scale

| Size | Weight | Use |
| --- | --- | --- |
| 12 | **bold** | Caption |
| 16 | regular | \`a\\|b\` |`;

const TABLE_PLUGINS = [...defaultPlugins, tablePlugin()];

const MARKDOWN_TABLE_OPTIONS: MarkdownOptions = { plugins: TABLE_PLUGINS, breaks: true };

/**
 * A GFM table read into the editor. Edit a cell and the Markdown on the right follows. Merge two cells from the
 * table menu and the table is written as paragraphs, with a loss listed.
 */
export const MarkdownTable: Story = {
    render: () => (
        <MarkdownRoundTrip markdown={STORED_TABLE} options={MARKDOWN_TABLE_OPTIONS} plugins={TABLE_PLUGINS} />
    ),
};

/**
 * Nothing is mounted automatically: with no plugins the editor is a
 * plain-paragraph field, and no toolbar renders.
 */
export const PlainText: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: 'Just paragraphs. No plugins, no toolbar, no marks.',
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[]} />
                </div>
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
                    children: [
                        {
                            text: 'Marks and mentions only — no headings, no lists, no images.',
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[
                            boldPlugin(),
                            italicPlugin(),
                            linkPlugin(),
                            mentionPlugin({
                                items: MENTIONABLE,
                                href: profileHref,
                            }),
                        ]}
                    />
                </div>
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
 * share one plugin array and nothing derived from it is rebuilt on render.
 * Worth copying in an app that mounts many: build the plugin array once, at
 * module level, rather than inside the component.
 */
export const ManyEditors: Story = {
    render: () => {
        const [docs, setDocs] = useState<RteDocument[]>(() =>
            Array.from({ length: MANY }, (_, index): RteDocument => ({
                version: 1,
                blocks: [
                    {
                        type: 'paragraph',
                        children: [{ text: `Editor ${index + 1} — type here.` }],
                    },
                ],
            })),
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
                    <div key={MANY_KEYS[index]} className={FRAME}>
                        <RichTextEditor
                            value={doc}
                            onChange={(next) =>
                                setDocs((previous) => previous.map((held, at) => (at === index ? next : held)))
                            }
                            plugins={defaultPlugins}
                        />
                    </div>
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
                {
                    type: 'textStyle',
                    style: 'heading3',
                    children: [{ text: 'Full editor' }],
                },
                {
                    type: 'paragraph',
                    children: [{ text: 'The default plugins are mounted.' }],
                },
            ],
        });
        const [boldDoc, setBoldDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: 'Bold-only editor — its own state, its own toolbar.',
                        },
                    ],
                },
            ],
        });

        return (
            <div className="tw-grid">
                <div className={LAYOUT}>
                    <div className={FRAME}>
                        <RichTextEditor value={fullDoc} onChange={setFullDoc} plugins={defaultPlugins} />
                    </div>
                    <pre className={JSON_PANEL}>{JSON.stringify(fullDoc, null, 2)}</pre>
                </div>
                <div className={LAYOUT}>
                    <div className={FRAME}>
                        <RichTextEditor value={boldDoc} onChange={setBoldDoc} plugins={[boldPlugin()]} />
                    </div>
                    <pre className={JSON_PANEL}>{JSON.stringify(boldDoc, null, 2)}</pre>
                </div>
            </div>
        );
    },
};

/** The guideline settings a host defines around its editors; the looks below read them. */
type GuidelineVariables = Record<`--f-theme-settings-${string}`, string>;

const LIGHT_GUIDELINE: GuidelineVariables = {
    '--f-theme-settings-heading1-font-family': 'Georgia, serif',
    '--f-theme-settings-heading1-font-size': '36px',
    '--f-theme-settings-heading1-color': 'rgb(120, 40, 20)',
    '--f-theme-settings-heading2-font-size': '28px',
    '--f-theme-settings-heading2-text-transform': 'uppercase',
    '--f-theme-settings-custom1-letter-spacing': '0.1em',
    '--f-theme-settings-custom2-color': 'rgb(30, 90, 60)',
    '--f-theme-settings-image-title-color': 'rgb(20, 60, 120)',
    '--f-theme-settings-image-caption-font-size': '11px',
    '--f-theme-settings-body-font-size': '16px',
    '--f-theme-settings-body-color': 'rgb(40, 40, 60)',
    '--f-theme-settings-quote-font-style': 'italic',
    '--f-theme-settings-quote-color': 'rgb(90, 50, 110)',
    '--f-theme-settings-link-color': 'rgb(190, 40, 90)',
    '--f-theme-settings-link-font-weight': '600',
    '--f-theme-settings-list-bullet1-shape': "'–'",
    '--f-theme-settings-list-bullet1-color': 'rgb(190, 40, 90)',
    '--f-theme-settings-list-bullet2-color': 'rgb(30, 90, 60)',
    '--f-theme-settings-list-bullet2-size': '1.4em',
    '--f-theme-settings-list-numbered1-counter-type': 'upper-roman',
    '--f-theme-settings-list-numbered1-color': 'rgb(20, 60, 120)',
};

const DARK_GUIDELINE: GuidelineVariables = {
    '--f-theme-settings-heading1-font-family': 'Georgia, serif',
    '--f-theme-settings-heading1-font-size': '36px',
    '--f-theme-settings-heading1-color': 'rgb(255, 190, 150)',
    '--f-theme-settings-heading2-font-size': '28px',
    '--f-theme-settings-heading2-text-transform': 'uppercase',
    '--f-theme-settings-custom1-letter-spacing': '0.1em',
    '--f-theme-settings-custom2-color': 'rgb(150, 230, 190)',
    '--f-theme-settings-image-title-color': 'rgb(150, 190, 255)',
    '--f-theme-settings-image-caption-font-size': '11px',
    '--f-theme-settings-body-font-size': '16px',
    '--f-theme-settings-body-color': 'rgb(220, 220, 235)',
    '--f-theme-settings-quote-font-style': 'italic',
    '--f-theme-settings-quote-color': 'rgb(210, 170, 235)',
    '--f-theme-settings-link-color': 'rgb(255, 150, 190)',
    '--f-theme-settings-link-font-weight': '600',
    '--f-theme-settings-list-bullet1-shape': "'–'",
    '--f-theme-settings-list-bullet1-color': 'rgb(255, 150, 190)',
    '--f-theme-settings-list-bullet2-color': 'rgb(150, 230, 190)',
    '--f-theme-settings-list-bullet2-size': '1.4em',
    '--f-theme-settings-list-numbered1-counter-type': 'upper-roman',
    '--f-theme-settings-list-numbered1-color': 'rgb(150, 190, 255)',
};

/**
 * Each look reads the guideline variables the host defines. `heading3` reads one that
 * no section defines, so it keeps Fondue's look.
 */
const GUIDELINE_LOOKS: TextStylePluginOptions['look'] = {
    heading1: {
        fontFamily: 'var(--f-theme-settings-heading1-font-family)',
        fontSize: 'var(--f-theme-settings-heading1-font-size)',
        color: 'var(--f-theme-settings-heading1-color)',
    },
    heading2: {
        fontSize: 'var(--f-theme-settings-heading2-font-size)',
        textTransform: 'var(--f-theme-settings-heading2-text-transform)',
    },
    heading3: { fontSize: 'var(--f-theme-settings-heading3-font-size)' },
    custom1: { letterSpacing: 'var(--f-theme-settings-custom1-letter-spacing)' },
    custom2: { color: 'var(--f-theme-settings-custom2-color)' },
    imageTitle: { color: 'var(--f-theme-settings-image-title-color)' },
    imageCaption: { fontSize: 'var(--f-theme-settings-image-caption-font-size)' },
    body: {
        fontSize: 'var(--f-theme-settings-body-font-size)',
        color: 'var(--f-theme-settings-body-color)',
    },
    // The quote's line height is one no section defines, so it keeps Fondue's look.
    quote: {
        fontStyle: 'var(--f-theme-settings-quote-font-style)',
        lineHeight: 'var(--f-theme-settings-quote-line-height)',
        color: 'var(--f-theme-settings-quote-color)',
    },
};

const GUIDELINE_LINK_LOOK: TextLinkLook = {
    fontWeight: 'var(--f-theme-settings-link-font-weight)',
    color: 'var(--f-theme-settings-link-color)',
};

/** The room between a marker and its text, which guideline settings do not hold, so the host sets it. */
const GUIDELINE_MARKER_GAP = '0.5em';

/** A bullet level read from the guideline's list variables, as the brand SDK names them. */
const guidelineBulletLevel = (level: number): BulletLevelLook => ({
    marker: `var(--f-theme-settings-list-bullet${level}-shape)`,
    color: `var(--f-theme-settings-list-bullet${level}-color)`,
    size: `var(--f-theme-settings-list-bullet${level}-size)`,
    gap: GUIDELINE_MARKER_GAP,
});

const guidelineNumberedLevel = (level: number): NumberedLevelLook => ({
    marker: `var(--f-theme-settings-list-numbered${level}-counter-type)`,
    color: `var(--f-theme-settings-list-numbered${level}-color)`,
});

// The third levels read variables no section defines, so they keep Fondue's marker.
const GUIDELINE_BULLET_LOOK = [guidelineBulletLevel(1), guidelineBulletLevel(2), guidelineBulletLevel(3)] as const;
const GUIDELINE_NUMBERED_LOOK = [
    guidelineNumberedLevel(1),
    guidelineNumberedLevel(2),
    guidelineNumberedLevel(3),
] as const;

const HOST_STYLING_PLUGINS = [
    textStylePlugin({ look: GUIDELINE_LOOKS }),
    bulletListPlugin({ look: GUIDELINE_BULLET_LOOK }),
    numberedListPlugin({ look: GUIDELINE_NUMBERED_LOOK }),
    checkListPlugin(),
    quotePlugin(),
    linkPlugin({ look: { text: GUIDELINE_LINK_LOOK } }),
];

// The renderer takes content only, with the same looks, so a page that only shows documents ships no editing code.
const HOST_STYLING_CONTENT = [
    textStyleContent({ look: GUIDELINE_LOOKS }),
    bulletListContent({ look: GUIDELINE_BULLET_LOOK }),
    numberedListContent({ look: GUIDELINE_NUMBERED_LOOK }),
    checkListContent,
    quoteContent,
    linkContent({ look: { text: GUIDELINE_LINK_LOOK } }),
];

const HOST_STYLING_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [
        { type: 'textStyle', style: 'heading1', children: [{ text: 'Heading 1' }] },
        { type: 'textStyle', style: 'heading2', children: [{ text: 'Heading 2' }] },
        { type: 'textStyle', style: 'heading3', children: [{ text: 'Heading 3, Fondue look' }] },
        { type: 'textStyle', style: 'heading4', children: [{ text: 'Heading 4' }] },
        { type: 'textStyle', style: 'custom1', children: [{ text: 'Custom 1' }] },
        { type: 'textStyle', style: 'custom2', children: [{ text: 'Custom 2' }] },
        { type: 'textStyle', style: 'custom3', children: [{ text: 'Custom 3' }] },
        { type: 'textStyle', style: 'imageTitle', children: [{ text: 'Image title' }] },
        { type: 'textStyle', style: 'imageCaption', children: [{ text: 'Image caption' }] },
        { type: 'paragraph', children: [{ text: 'Body text takes the body look.' }] },
        {
            type: 'bulletList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'A bullet item' }] },
                        {
                            type: 'bulletList',
                            children: [
                                {
                                    type: 'listItem',
                                    children: [
                                        { type: 'paragraph', children: [{ text: 'A second-level item' }] },
                                        {
                                            type: 'bulletList',
                                            children: [
                                                {
                                                    type: 'listItem',
                                                    children: [
                                                        {
                                                            type: 'paragraph',
                                                            children: [{ text: 'A third-level item, Fondue marker' }],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'numberedList',
            children: [
                {
                    type: 'listItem',
                    children: [
                        { type: 'paragraph', children: [{ text: 'A numbered item' }] },
                        {
                            type: 'numberedList',
                            children: [
                                {
                                    type: 'listItem',
                                    children: [{ type: 'paragraph', children: [{ text: 'A second-level item' }] }],
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
                    checked: false,
                    children: [{ type: 'paragraph', children: [{ text: 'A check item' }] }],
                },
            ],
        },
        { type: 'quote', children: [{ text: 'A quote takes the quote look.' }] },
        {
            type: 'paragraph',
            children: [
                { text: 'A ' },
                { text: 'link', link: { href: 'https://example.com' } },
                { text: ' takes the link look.' },
            ],
        },
    ],
};

type HostStylingSectionProps = {
    title: string;
    guideline: GuidelineVariables;
};

const HostStylingSection = ({ title, guideline }: HostStylingSectionProps) => {
    const [doc, setDoc] = useState<RteDocument>(HOST_STYLING_DOCUMENT);

    return (
        // A CSS variable is not a CSSProperties key, which only the cast tells the compiler.
        <div className="tw-grid tw-gap-4 tw-bg-surface tw-p-4" style={guideline as CSSProperties}>
            <p className="tw-m-0 tw-body-small tw-text-secondary">{title}</p>
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={HOST_STYLING_PLUGINS} />
                </div>
                <div className={FRAME}>
                    <RichTextRenderer value={doc} plugins={HOST_STYLING_CONTENT} />
                </div>
            </div>
        </div>
    );
};

const LOOKS_DEFAULT: TextStyleLook = {
    heading1: { fontFamily: 'Georgia, serif', fontSize: '36px', color: 'rgb(120, 40, 20)' },
    heading2: { textTransform: 'uppercase' },
    custom1: { letterSpacing: '0.1em' },
    custom2: { color: 'rgb(30, 90, 60)' },
    custom3: { fontWeight: '700' },
    imageTitle: { color: 'rgb(20, 60, 120)' },
    imageCaption: { fontSize: '11px' },
    body: { fontSize: '16px', lineHeight: '1.7', color: 'rgb(40, 40, 60)' },
    quote: { fontStyle: 'italic', color: 'rgb(90, 50, 110)' },
};

const LINK_LOOK_DEFAULT: TextLinkLook = { fontWeight: '600', color: 'rgb(190, 40, 90)' };

const LOOKS_TEXT_STYLE_KEYS = [
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'custom1',
    'custom2',
    'custom3',
    'imageTitle',
    'imageCaption',
];

const LOOKS_FIELDS = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'fontStyle',
    'lineHeight',
    'letterSpacing',
    'textTransform',
    'textDecoration',
    'marginTop',
    'marginBottom',
    'color',
];

const LOOKS_LEGEND_LINES = [
    `Keys, one per text style: ${LOOKS_TEXT_STYLE_KEYS.join(', ')}.`,
    'Keys for the rest: body (plain paragraphs and list items), quote.',
    `Fields: ${LOOKS_FIELDS.join(', ')}.`,
    'linkPlugin({ look: { text } }) takes the same fields but textDecoration, marginTop and marginBottom.',
    "A key or field left out keeps Fondue's look.",
    'A value that could end its CSS declaration early throws.',
];

const LOOKS_CODE_INDENT = 4;
const LOOKS_LEGEND = 'tw-m-0 tw-pl-4 tw-body-small tw-text-secondary';
const LOOKS_ERROR = 'tw-m-0 tw-rounded tw-bg-surface-dim tw-p-3 tw-body-small tw-text-primary';

type LooksStoryArgs = {
    look: TextStyleLook;
    linkLook: TextLinkLook;
};

const looksConfigurationCode = ({ look, linkLook }: LooksStoryArgs): string =>
    [
        `textStylePlugin({ look: ${JSON.stringify(look, null, LOOKS_CODE_INDENT)} })`,
        `linkPlugin({ look: { text: ${JSON.stringify(linkLook, null, LOOKS_CODE_INDENT)} } })`,
    ].join('\n');

type LooksPluginsResult = { status: 'ready'; plugins: RtePlugin[] } | { status: 'invalid'; message: string };

// Both plugins throw on a value that could end its CSS declaration early, so a bad Controls entry is reported here.
const looksPluginsFor = ({ look, linkLook }: LooksStoryArgs): LooksPluginsResult => {
    try {
        return {
            status: 'ready',
            plugins: [
                textStylePlugin({ look }),
                bulletListPlugin(),
                numberedListPlugin(),
                checkListPlugin(),
                quotePlugin(),
                linkPlugin({ look: { text: linkLook } }),
            ],
        };
    } catch (error) {
        if (error instanceof Error) {
            return { status: 'invalid', message: error.message };
        }
        throw error;
    }
};

type LooksSurfacesProps = {
    looks: LooksStoryArgs;
    doc: RteDocument;
    onChange: (doc: RteDocument) => void;
};

const LooksSurfaces = ({ looks, doc, onChange }: LooksSurfacesProps) => {
    const { look, linkLook } = looks;
    const result = useMemo(() => looksPluginsFor({ look, linkLook }), [look, linkLook]);

    switch (result.status) {
        case 'invalid':
            return (
                <p role="alert" className={LOOKS_ERROR}>
                    {result.message}
                </p>
            );
        case 'ready':
            return (
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <div className={FRAME}>
                        <RichTextEditor value={doc} onChange={onChange} plugins={result.plugins} />
                    </div>
                    <div className={FRAME}>
                        <RichTextRenderer value={doc} plugins={result.plugins} />
                    </div>
                </div>
            );
    }
};

type LooksPlaygroundProps = {
    looks: LooksStoryArgs;
};

const LooksPlayground = ({ looks }: LooksPlaygroundProps) => {
    const [doc, setDoc] = useState<RteDocument>(HOST_STYLING_DOCUMENT);

    return (
        <div className="tw-grid tw-gap-4 tw-p-4 tw-font-primary">
            <pre className={JSON_PANEL}>
                <code>{looksConfigurationCode(looks)}</code>
            </pre>
            <ul className={LOOKS_LEGEND}>
                {LOOKS_LEGEND_LINES.map((line) => (
                    <li key={line}>{line}</li>
                ))}
            </ul>
            {/* The plugin list is read at mount, so a change to the looks remounts both surfaces. */}
            <LooksSurfaces key={JSON.stringify(looks)} looks={looks} doc={doc} onChange={setDoc} />
        </div>
    );
};

/**
 * The configuration of `textStylePlugin({ look })` and `linkPlugin({ look: { text } })` as plain values, printed above the
 * editor and the renderer. Edit `look` or `linkLook` in Controls and both surfaces redraw.
 */
export const Look: StoryObj<LooksStoryArgs> = {
    args: { look: LOOKS_DEFAULT, linkLook: LINK_LOOK_DEFAULT },
    argTypes: { look: { control: 'object' }, linkLook: { control: 'object' } },
    // The meta's editor props are not this story's args, so Controls lists only the looks.
    parameters: { controls: { include: ['look', 'linkLook'] } },
    render: ({ look, linkLook }) => <LooksPlayground looks={{ look, linkLook }} />,
};

/**
 * The usual production setup: the values are `var(--f-theme-settings-…)`, so one editor configuration follows the section (light or dark) it sits in.
 * A host sets the look of each text style, body text and quotes with `textStylePlugin({ look })`, of links with `linkPlugin({ look: { text } })`, and of list markers per level with `bulletListPlugin({ look })` and `numberedListPlugin({ look })`, usually from its guideline settings,
 * and hands the renderer `textStyleContent({ look })`, `linkContent({ look: { text } })`, `bulletListContent({ look })` and `numberedListContent({ look })` with the same values.
 * Anything the host leaves out, or a variable nobody defines, keeps Fondue's look.
 * The editor and the renderer draw the same.
 */
export const LookFromGuidelineVariables: Story = {
    name: 'Looks from guideline variables',
    render: () => (
        <div className="tw-grid tw-font-primary">
            <ThemeProvider theme="light">
                <HostStylingSection title="Light section" guideline={LIGHT_GUIDELINE} />
            </ThemeProvider>
            <ThemeProvider theme="dark">
                <HostStylingSection title="Dark section" guideline={DARK_GUIDELINE} />
            </ThemeProvider>
        </div>
    ),
};
