/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, type ReactNode, useContext, useId } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { PARAGRAPH, type RteBlockNode, type RteInlineElementNode, type RtePlugin } from '#/domain';
import { type EditorHandle } from '#/ports';

import { mountDocument } from './mount';

/**
 * What the reader sees before the editor arrives — which has to be, exactly,
 * what they see after it. The swap happens under their eyes and in the middle of
 * a sentence, so every check here compares the two drawings rather than either
 * against markup written out by hand: markup in a test is a third opinion, and
 * it is the agreement that matters.
 */

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

type ImageBlock = { type: 'image'; src?: string; alt?: string };
type MentionInline = { type: 'mention'; id?: string; label?: string };

/**
 * The theme a host puts around its editors. It is here to make the point the
 * whole design turns on: a feature reading this renders one thing mounted in the
 * host's tree and another probed on its own, so a drawing that called `render`
 * itself would disagree with the editor about a plugin nobody here has seen.
 */
const ThemeContext = createContext('host-theme');

const ThemedBadge = ({ children }: { children: ReactNode }): ReactNode => {
    const theme = useContext(ThemeContext);
    return (
        <span className={`badge-${theme}`} id={useId()}>
            {children}
        </span>
    );
};

const features: RtePlugin[] = [
    { id: 'bold', schema: { marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong> }] } },
    {
        id: 'fontColor',
        schema: {
            marks: [
                {
                    key: 'color',
                    attributes: { color: { default: 'inherit' } },
                    // A colour wraps the decorations it must show through, so it
                    // asks to sit outside the marks declared before it.
                    nesting: -1,
                    render: ({ children, value }) => <span style={{ color: String(value.color) }}>{children}</span>,
                },
            ],
        },
    },
    // The consumer feature: a real component, not a bare element.
    {
        id: 'badge',
        schema: { marks: [{ key: 'badge', render: ({ children }) => <ThemedBadge>{children}</ThemedBadge> }] },
    },
    {
        id: 'bulletList',
        schema: {
            blocks: [
                {
                    type: 'bulletList',
                    content: 'blocks',
                    contains: ['listItem'],
                    isList: true,
                    render: ({ children }) => <ul>{children}</ul>,
                },
                {
                    type: 'listItem',
                    content: 'blocks',
                    contains: [PARAGRAPH],
                    render: ({ children }) => <li>{children}</li>,
                },
            ],
        },
    },
    {
        id: 'image',
        schema: {
            blocks: [
                {
                    type: 'image',
                    isVoid: true,
                    attributes: { src: {}, alt: { default: '' } },
                    parseRules: [{ tag: 'img' }],
                    render: ({ node }) => {
                        const image = node as ImageBlock;
                        return <img src={image.src ?? ''} alt={image.alt ?? ''} />;
                    },
                },
            ],
        },
    },
    {
        id: 'mention',
        schema: {
            inlines: [
                {
                    type: 'mention',
                    attributes: { id: {}, label: { default: 'someone' } },
                    parseRules: [{ tag: 'span[data-mention-id]' }],
                    render: ({ node }) => {
                        const mention = node as MentionInline;
                        return <span data-mention-id={String(mention.id)}>@{mention.label}</span>;
                    },
                },
            ],
        },
    },
    { id: 'align', schema: { blockAttributes: [{ name: 'align', toStyle: (value) => `text-align: ${value}` }] } },
];

const teardown: (() => void)[] = [];

/** Mount a document, readonly or not, and hand back the element holding the content. */
const mount = (blocks: RteBlockNode[], { placeholder = '', readOnly }: { placeholder?: string; readOnly: boolean }) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    let handle: EditorHandle | null = null;
    const mounted = mountDocument({
        container,
        initialDoc: { version: 1, blocks },
        plugins: features,
        readOnly,
        placeholder,
        contentClassName: 'content',
        placeholderClassName: 'placeholder',
        probe: reactRenderProbe,
        onDocChange: () => {},
        onStateChange: () => {},
        onBlur: () => {},
        onEditable: (next) => {
            handle = next;
        },
    });
    teardown.push(() => {
        mounted.destroy();
        container.remove();
    });
    return {
        mounted,
        container,
        editable: (): EditorHandle | null => handle,
        /** Whichever element is holding the content right now. */
        element: (): HTMLElement =>
            (container.querySelector('[contenteditable]') ?? container.firstElementChild) as HTMLElement,
    };
};

/**
 * The engine's editing half is fetched, so becoming editable finishes later. The
 * first fetch of a test run has a module to evaluate and takes far longer than
 * the rest, hence a deadline rather than a count of turns.
 */
const editable = async (editor: ReturnType<typeof mount>): Promise<HTMLElement> => {
    const deadline = Date.now() + 5000;
    while (!editor.editable() && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 5));
    }
    if (!editor.editable()) {
        throw new Error('the document never became editable');
    }
    return editor.element();
};

/**
 * The content, with the marks of being editable taken off it. All three exist to
 * tell the browser where a caret may go, and none of them draws anything:
 *
 * - `contenteditable="false"`, on everything without text of its own;
 * - the class on a trailing break;
 * - the trailing break itself, where the block has other content — measured: a
 *   `<br>` after something adds no line. The break in an EMPTY block is a
 *   different thing and is left in, because there it carries the block's whole
 *   height, which is why the drawn document puts one there too.
 */
const content = (element: HTMLElement): string => {
    const copy = element.cloneNode(true) as HTMLElement;
    for (const br of copy.querySelectorAll('br.ProseMirror-trailingBreak')) {
        if ((br.parentElement?.childNodes.length ?? 0) > 1) {
            br.remove();
        }
    }
    for (const br of copy.querySelectorAll('br')) {
        br.removeAttribute('class');
    }
    for (const element of copy.querySelectorAll('[contenteditable="false"]')) {
        element.removeAttribute('contenteditable');
    }
    return copy.innerHTML;
};

/**
 * The same document twice: as it is shown before the editing half arrives, and
 * as it is once that has taken over. Every check compares the two rather than
 * either against markup written out here — markup in a test is a third opinion,
 * and it is the agreement that matters.
 */
const both = async (blocks: RteBlockNode[], placeholder = ''): Promise<{ shown: string; edited: string }> => {
    const shown = content(mount(blocks, { placeholder, readOnly: true }).element());
    const editor = mount(blocks, { placeholder, readOnly: false });
    return { shown, edited: content(await editable(editor)) };
};

afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

describe('what is shown and what is edited', () => {
    it('agree on text and the marks on it', async () => {
        const { shown, edited: live } = await both([
            {
                type: PARAGRAPH,
                children: [
                    { text: 'plain ' },
                    { text: 'bold', bold: true },
                    { text: ' and ' },
                    { text: 'both', bold: true, color: { color: 'red' } },
                ],
            },
        ]);

        expect(shown).toBe(live);
        // The colour asked to sit outside, so it wraps the bold in both.
        expect(shown).toContain('<span style="color: red;"><strong>both</strong></span>');
    });

    it('agree on a feature that renders a component reading the host context', async () => {
        const { shown, edited: live } = await both([{ type: PARAGRAPH, children: [{ text: 'badged', badge: true }] }]);

        // The point of the whole arrangement: whichever theme and generated id
        // the probe produced, BOTH show it. A second renderer would mount the
        // component in the host's tree and show a different one.
        expect(shown).toBe(live);
    });

    it('agree on nested blocks', async () => {
        const { shown, edited: live } = await both([
            {
                type: 'bulletList',
                children: [
                    { type: 'listItem', children: [{ type: PARAGRAPH, children: [{ text: 'An item.' }] }] },
                    { type: 'listItem', children: [{ type: PARAGRAPH, children: [{ text: 'Another.' }] }] },
                ],
            },
        ]);

        expect(shown).toBe(live);
        expect(shown).toContain('<ul><li><p>An item.</p></li>');
    });

    it('agree on void blocks and inline elements', async () => {
        const { shown, edited: live } = await both([
            { type: 'image', src: 'https://example.com/a.png' } as RteBlockNode,
            {
                type: PARAGRAPH,
                children: [{ text: 'Hi ' }, { type: 'mention', id: 'u1', label: 'Ada' } as RteInlineElementNode],
            },
        ]);

        expect(shown).toBe(live);
        expect(shown).toContain('alt=""');
        expect(shown).toContain('data-mention-id="u1"');
    });

    it('agree on an attribute one feature injects into every text block', async () => {
        const { shown, edited: live } = await both([
            { type: PARAGRAPH, align: 'center', children: [{ text: 'Centred.' }] } as RteBlockNode,
        ]);

        expect(shown).toBe(live);
        expect(shown).toContain('text-align: center');
    });

    it('agree on an empty document, placeholder and all', async () => {
        const { shown, edited: live } = await both([{ type: PARAGRAPH, children: [{ text: '' }] }], 'Write something');

        expect(shown).toBe(live);
        // The block is held open, or it would have no height and the frame would
        // grow the moment the editor took over.
        expect(shown).toContain('<br>');
        expect(shown).toContain('data-placeholder="Write something"');
    });

    it('agree that a document with something else in it is not empty', async () => {
        const { shown, edited: live } = await both(
            [{ type: PARAGRAPH, children: [{ text: '' }] }, { type: 'image', src: 'a.png' } as RteBlockNode],
            'Write something',
        );

        expect(shown).toBe(live);
        expect(shown).not.toContain('data-placeholder');
    });
});

describe('a document that is only shown', () => {
    const paragraph = (text: string): RteBlockNode[] => [{ type: PARAGRAPH, children: [{ text }] }];

    it('never sends for the editing half', async () => {
        const editor = mount(paragraph('for reading'), { readOnly: true });

        // Long enough for it to have arrived, had it been asked for.
        for (let round = 0; round < 5; round++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        expect(editor.container.textContent).toContain('for reading');
        expect(editor.container.querySelector('[contenteditable]')).toBeNull();
        expect(editor.editable()).toBeNull();
    });

    it('follows a document it is handed later', () => {
        const editor = mount(paragraph('first'), { readOnly: true });

        editor.mounted.setDoc({ version: 1, blocks: paragraph('second') });

        expect(editor.container.textContent).toContain('second');
        expect(editor.container.textContent).not.toContain('first');
    });

    it('sends for the editing half once it is allowed to be edited', async () => {
        const editor = mount(paragraph('was readonly'), { readOnly: true });

        editor.mounted.setReadOnly(false);

        const element = await editable(editor);

        expect(element.textContent).toContain('was readonly');
    });

    it('throws on a block type no mounted feature declares', () => {
        expect(() => mount([{ type: 'callout', children: [{ text: 'x' }] }], { readOnly: true })).toThrow(
            /Unknown block type "callout"/,
        );
    });
});
