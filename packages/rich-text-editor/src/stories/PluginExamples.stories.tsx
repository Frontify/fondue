/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ReactNode, useRef, useState } from 'react';

// Stories import only the package public API. The consumer-plugin stories at
// the bottom double as proof that the plugin contract is open: they define a
// custom mark (Highlight), block (Callout) and inline element (Embed) without
// touching the package.
//
// One story per plugin, each mounting that plugin alone, so what a plugin
// contributes on its own is visible. The ones that need company to do anything
// (markdown shortcuts, reset formatting) say so.
import {
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    RichTextEditor,
    RichTextRenderer,
    type RteDocument,
    type RteDocumentWith,
    type RtePlugin,
    toPlainText,
} from '../index';
import {
    alignPlugin,
    blurOnBreakPlugin,
    boldContent,
    boldPlugin,
    type ButtonLook,
    bulletListPlugin,
    checkListPlugin,
    codePlugin,
    columnBreakPlugin,
    defaultPlugins,
    emojiPlugin,
    fontColorPlugin,
    italicPlugin,
    type LinkAppearance,
    type LinkDestination,
    linkPlugin,
    type MentionItem,
    mentionPlugin,
    type MentionValue,
    numberedListPlugin,
    quotePlugin,
    resetFormattingPlugin,
    softBreakPlugin,
    strikethroughPlugin,
    subscriptPlugin,
    superscriptPlugin,
    tablePlugin,
    textStylePlugin,
    typographyPlugin,
    underlinePlugin,
} from '../plugins';

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

/** A search that fails for the query "fail", to show the retry. */
const searchMentionable = (query: string): Promise<readonly MentionItem[]> => {
    if (query === 'fail') {
        return Promise.reject(new Error('The people service is down'));
    }
    const needle = query.toLowerCase();
    return Promise.resolve(
        MENTIONABLE.filter((item) => item.username.includes(needle) || item.name.toLowerCase().includes(needle)),
    );
};

/** Everything the package ships, plus the ones that need arguments. */
const ALL_PLUGINS: readonly RtePlugin[] = [...defaultPlugins, mentionPlugin({ items: MENTIONABLE, href: profileHref })];

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
const LIST = 'tw-m-0 tw-body-small';

/**
 * The box around a renderer. The package draws none of its own — no border,
 * background or inset — so an app wraps it the same way.
 */
const SURFACE = 'tw-rounded tw-border tw-border-solid tw-border-line-mid tw-bg-surface tw-p-medium';

/** The field box around an editor: the surface, with a stronger border on hover and while the caret is inside, as Fondue's Textarea does. */
const FRAME = `${SURFACE} hover:tw-border-line-strong focus-within:tw-border-line-strong`;

const toolbarButtonClasses = (active: boolean | 'mixed'): string =>
    [
        'tw-body-small tw-rounded tw-border tw-border-solid tw-border-line-strong tw-px-2 tw-py-1 tw-text-secondary tw-cursor-pointer',
        active ? 'tw-bg-container-secondary' : 'tw-bg-transparent',
    ].join(' ');

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Plugins',
    component: RichTextEditor,
    parameters: {
        status: {
            type: 'experimental',
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

/** ⇧⌘X, or the toolbar button. */
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
                        { text: ' text (⇧⌘X).' },
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

/** The app's own pages, as a search service would return them. */
const INTERNAL_PAGES: readonly LinkDestination[] = [
    { id: 'brand', label: 'Brand guidelines', href: 'https://brand.frontify.com/guidelines' },
    { id: 'logos', label: 'Logo library', href: 'https://brand.frontify.com/logos' },
    { id: 'colors', label: 'Colour palette', href: 'https://brand.frontify.com/colors' },
    { id: 'press', label: 'Press kit', href: 'https://frontify.com/press' },
];

/** How long the fake lookup takes, so the story shows the field while it searches. */
const FAKE_LOOKUP_MS = 300;

/** A fake lookup that gives up when aborted, as a real request would. */
const searchPages = (query: string, signal: AbortSignal): Promise<readonly LinkDestination[]> =>
    new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const needle = query.toLowerCase();
            resolve(INTERNAL_PAGES.filter((page) => page.label.toLowerCase().includes(needle)));
        }, FAKE_LOOKUP_MS);
        signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });

/**
 * Given a `search`, the "Link to" field offers the app's own pages as the
 * author types.
 */
export const LinkWithSearch: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: 'Select this text and press Mod-k to add a link.' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Open the link form and type <code>logo</code> in Link to: the list shows one page after a short
                    wait. Press Down or Tab to reach the pages, then Enter or a click to pick one, or keep typing an
                    address. A pick fills an empty Text field with the page name.
                </p>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[linkPlugin({ search: searchPages })]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** How a brand's theme could look each button; the values a host would take from its guideline variables. */
const BUTTON_LOOKS: Record<LinkAppearance, ButtonLook> = {
    primary: {
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: '#5b3df5',
        borderColor: '#5b3df5',
        borderRadius: '999px',
        paddingTop: '8px',
        paddingRight: '20px',
        paddingBottom: '8px',
        paddingLeft: '20px',
        hover: { backgroundColor: '#3f27c4', borderColor: '#3f27c4' },
    },
    secondary: {
        fontWeight: '600',
        color: '#5b3df5',
        backgroundColor: '#ece9ff',
        borderColor: '#ece9ff',
        borderRadius: '999px',
        paddingTop: '8px',
        paddingRight: '20px',
        paddingBottom: '8px',
        paddingLeft: '20px',
        hover: { backgroundColor: '#d9d3ff', borderColor: '#d9d3ff' },
    },
    tertiary: {
        fontWeight: '600',
        color: '#5b3df5',
        borderColor: '#5b3df5',
        borderWidth: '2px',
        borderRadius: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        hover: { color: '#3f27c4', borderColor: '#3f27c4' },
    },
};

/**
 * A link can look like a button. Adding `'button'` to `kinds` adds a Style select to the link
 * form, and `look.button` says how each style looks, here with literal values where a host would
 * pass its guideline variables. A plain link stays a plain link.
 */
export const ButtonLinks: Story = {
    name: 'Button links',
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [
                {
                    type: 'paragraph',
                    children: [
                        { text: 'Primary', link: { href: 'https://example.com', appearance: 'primary' } },
                        { text: ' ' },
                        { text: 'Secondary', link: { href: 'https://example.com', appearance: 'secondary' } },
                        { text: ' ' },
                        { text: 'Tertiary', link: { href: 'https://example.com', appearance: 'tertiary' } },
                        { text: ' ' },
                        { text: 'A plain link', link: { href: 'https://example.com' } },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Click a button and choose Edit: the form has a Style select, with No style to make it a plain link
                    again.
                </p>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[linkPlugin({ kinds: ['text', 'button'], look: { button: BUTTON_LOOKS } })]}
                    />
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
                    shows an avatar when the app gives one. Type <code>@fail</code> to see a search that fails, with its
                    retry.
                </p>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[mentionPlugin({ items: searchMentionable, href: profileHref })]}
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
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[emojiPlugin()]} />
                </div>
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

/** Typographic shortcuts as you type; technical text such as `--flag` or `x <= 5` stays as typed. */
export const Typography: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({
            version: 1,
            blocks: [{ type: 'paragraph', children: [{ text: '' }] }],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Try <code>a -- b</code>, <code>&lt;-&gt;</code>, <code>"quoted"</code>, <code>don't</code>,{' '}
                    <code>3x4 </code>, <code>2^2 </code>, and see <code>--flag</code>, <code>--&gt;</code>, and{' '}
                    <code>x &lt;= 5</code> stay as typed.
                </p>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={[
                            codePlugin(),
                            typographyPlugin({ groups: ['quotes', 'ellipsis', 'dashes', 'symbols', 'numeric'] }),
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
 * Puts the selection back to plain text: marks gone (links stay), block type
 * back to paragraph, alignment cleared, lists unwrapped. It owns no schema — it only
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
                <p className={HINT}>
                    Put the caret in a block (or select some text), then hit the eraser button. One undo brings
                    everything back.
                </p>
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

/**
 * Enter commits instead of adding a paragraph, what a single-line editor wants.
 * `onBreak` hears the commit (here it files the text below and clears the
 * field), and checks for empty text itself.
 */
export const BlurOnBreak: Story = {
    render: () => {
        const [doc, setDoc] = useState<RteDocument>({ version: 1, blocks: [{ type: 'paragraph', children: [] }] });
        const [submitted, setSubmitted] = useState<{ id: number; text: string }[]>([]);
        // The plugin is built once, so its `onBreak` reads the document through a ref.
        const docRef = useRef(doc);
        docRef.current = doc;
        const [plugins] = useState<RtePlugin[]>(() => [
            boldPlugin(),
            italicPlugin(),
            blurOnBreakPlugin({
                onBreak: () => {
                    const text = toPlainText(docRef.current);
                    if (text.trim() === '') {
                        return;
                    }
                    setSubmitted((previous) => [...previous, { id: previous.length, text }]);
                    setDoc({ version: 1, blocks: [{ type: 'paragraph', children: [] }] });
                },
            }),
        ]);

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Press Enter to submit: the text moves to the list below and the field clears. Enter on an empty
                    field submits nothing.
                </p>
                <div className={FRAME}>
                    <RichTextEditor
                        value={doc}
                        onChange={setDoc}
                        plugins={plugins}
                        placeholder="Type a comment"
                        aria-label="Comment"
                    />
                </div>
                <ul className={LIST}>
                    {submitted.map(({ id, text }) => (
                        <li key={id}>{text}</li>
                    ))}
                </ul>
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

/** Cells as the story writes them: one paragraph of text. */
const tableCell = (text: string, colspan?: number) => ({
    type: 'tableCell' as const,
    ...(colspan === undefined ? {} : { colspan }),
    children: [{ type: 'paragraph' as const, children: [{ text }] }],
});

const tableHeader = (text: string) => ({
    type: 'tableHeader' as const,
    children: [{ type: 'paragraph' as const, children: [{ text }] }],
});

/**
 * A table: type / and pick Table to insert one with a header row. Tab and
 * Shift+Tab move between cells, Tab in the last cell adds a row, and dragging
 * across cells selects them. A stored merged cell keeps its span. The readonly
 * view below draws the same document.
 */
export const Table: Story = {
    render: () => {
        const plugins = [...defaultPlugins, tablePlugin()];
        const [doc, setDoc] = useState<RteDocument>(() => ({
            version: 1,
            blocks: [
                { type: 'paragraph', children: [{ text: 'The team, with a merged cell in the last row:' }] },
                {
                    type: 'table',
                    children: [
                        {
                            type: 'tableRow',
                            children: [tableHeader('Name'), tableHeader('Role'), tableHeader('Team')],
                        },
                        {
                            type: 'tableRow',
                            children: [tableCell('Ada'), tableCell('Engineer'), tableCell('Platform')],
                        },
                        {
                            type: 'tableRow',
                            children: [tableCell('Grace'), tableCell('Away until March', 2)],
                        },
                    ],
                },
                { type: 'paragraph', children: [] },
            ],
        }));

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    Type / on the empty line for Table. Tab moves between cells. With the caret in a table, the Table
                    button in the toolbar adds and deletes rows and columns and toggles the headers. Drag across cells
                    and choose Merge cells to merge them; Split cell takes a merged cell apart.
                </p>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className={FRAME}>
                        <RichTextEditor
                            value={doc}
                            onChange={setDoc}
                            plugins={plugins}
                            placeholder="Type / for commands"
                        />
                    </div>
                    <div className={SURFACE}>
                        <RichTextRenderer value={doc} plugins={plugins} />
                    </div>
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
    'acme-highlight'?: boolean;
};

const acmeHighlightContent = defineContent({
    marks: {
        'acme-highlight': defineMark({
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
});

const acmeHighlightPlugin = () =>
    definePlugin({
        content: acmeHighlightContent,
        toolbar: [
            {
                label: 'Highlight',
                shortcut: 'Mod-Shift-u',
                render: ({ isActive, toggle, label }) => (
                    <button
                        type="button"
                        aria-pressed={isActive}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => toggle()}
                        className={toolbarButtonClasses(isActive)}
                    >
                        {label}
                    </button>
                ),
            },
        ],
    });

const acmeEditorPlugins = [boldPlugin(), acmeHighlightPlugin()];
const acmeRendererContent = [boldContent, acmeHighlightContent];

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
                        { text: 'highlight', 'acme-highlight': true },
                        {
                            text: ' mark comes from a plugin defined in the story file — the package was not modified for it.',
                        },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className={FRAME}>
                        <RichTextEditor value={doc} onChange={setDoc} plugins={acmeEditorPlugins} />
                    </div>
                    <div className={SURFACE}>
                        <RichTextRenderer value={doc} plugins={acmeRendererContent} />
                    </div>
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/** A consumer-defined block type, following the shipped QuoteBlock pattern. */
type CalloutBlock = {
    type: 'acme-callout';
    children: RtePlugin.InlineNode[];
};

const acmeCalloutContent = defineContent({
    blocks: {
        'acme-callout': defineBlock({
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
});

const acmeCalloutPlugin = () =>
    definePlugin({
        content: acmeCalloutContent,
        toolbar: [
            {
                label: 'Callout',
                render: ({ isActive, toggle, label }) => (
                    <button
                        type="button"
                        aria-label={label}
                        aria-pressed={isActive}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => toggle()}
                        className={toolbarButtonClasses(isActive)}
                    >
                        💡
                    </button>
                ),
            },
        ],
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
                    type: 'acme-callout',
                    children: [{ text: 'This callout block comes from a plugin defined in the story file.' }],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[boldPlugin(), acmeCalloutPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};

/**
 * A consumer-defined void inline element whose `edit` view draws its own
 * picker while it has no value — the same contract the shipped mention plugin
 * uses, from outside the package.
 */
type EmbedInline = {
    type: 'acme-embed';
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

type EmbedDraftProps = {
    onChoose: (provider: string) => void;
    onRemove: () => void;
};

/**
 * A consumer-written picker, showing what an inline's `edit` view gives
 * an external plugin: the node is inserted without a value, and the component
 * completes it with `setValue` — or takes it away with `remove`.
 */
const EmbedDraft = ({ onChoose, onRemove }: EmbedDraftProps): ReactNode => (
    <fieldset aria-label="Embed suggestions" className="tw-m-0 tw-inline-flex tw-gap-1 tw-border-0 tw-p-0">
        {EMBEDS.map((item) => (
            <button
                key={item.id}
                type="button"
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
    </fieldset>
);

const acmeEmbedContent = defineContent({
    inlines: {
        'acme-embed': defineInline<EmbedValue>({
            toHtml: ({ provider }) => ({
                tag: 'span',
                attrs: { 'data-embed': provider, class: embedClasses },
                children: `▤ ${provider}`,
            }),
            parse: [{ tag: 'span[data-embed]', value: (element) => ({ provider: element.dataset.embed ?? '' }) }],
        }),
    },
});

const AcmeEmbedEdit = ({ value, setValue, remove, api }: RtePlugin.EditProps<EmbedValue, EmbedValue | null>) => {
    if (value === null) {
        return (
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
        );
    }
    return <span data-embed={value.provider} className={embedClasses}>{`▤ ${value.provider}`}</span>;
};

const acmeEmbedPlugin = () =>
    definePlugin({
        content: acmeEmbedContent,
        // The editor's `/` menu owns the `/` key, so the embed is one of its entries.
        commands: [{ id: 'acme-embed', label: 'Embed', group: 'insert', run: (api) => api.insert('acme-embed') }],
        edit: { 'acme-embed': AcmeEmbedEdit },
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
                        { type: 'acme-embed', provider: 'figma' },
                        { text: ' — or, on an empty line, type /embed to pick another one.' },
                    ],
                },
            ],
        });

        return (
            <div className={LAYOUT}>
                <p className={HINT}>
                    On an empty line, type <code>/embed</code> and press Enter to open the consumer plugin&apos;s own
                    picker.
                </p>
                <div className={FRAME}>
                    <RichTextEditor value={doc} onChange={setDoc} plugins={[...defaultPlugins, acmeEmbedPlugin()]} />
                </div>
                <pre className={JSON_PANEL}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
        );
    },
};
