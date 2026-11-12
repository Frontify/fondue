/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    type EditorControlApi,
    onlyTypeOf,
    ownTypeOf,
    PARAGRAPH,
    type RteContent,
    type RteMarkState,
    type RteSelectionSnapshot,
} from '#/core';

import { toolbarItemProps } from './toolbarItem';

/**
 * What a toolbar entry's `render` is handed, composed from the control API alone.
 * A small fake editor stands in for the real one: it keeps a selection snapshot
 * and changes it the way the commands would, so each test presses a control and
 * then reads what the control shows afterwards: the outcome, not which
 * command ran.
 */

type Block = RteSelectionSnapshot['block'] & object;

const snapshot = (overrides: Partial<RteSelectionSnapshot> = {}): RteSelectionSnapshot => ({
    isCollapsed: true,
    text: '',
    block: { type: PARAGRAPH },
    blocks: [{ type: PARAGRAPH }],
    marks: {},
    history: { canUndo: false, canRedo: false },
    ...overrides,
});

/** A content, and the type its toolbar entry toggles when the content declares several. */
type Subject = { content: RteContent; type?: string };

const LIST_ITEM = 'listItem';

const LABEL = 'Control';

const allOf = (value: Record<string, unknown> = {}): RteMarkState => ({ coverage: 'all', value });

const fakeEditor = (initial: Partial<RteSelectionSnapshot> = {}) => {
    let selection = snapshot(initial);
    const inserted: { type: string; value?: Record<string, unknown> }[] = [];
    let openEditor: string | null = null;

    const setBlocks = (blocks: Block[]): void => {
        selection = { ...selection, block: blocks[0] ?? null, blocks };
    };

    const api: EditorControlApi = {
        selection: { get: () => selection },
        text: { beforeCaret: () => '', afterCaret: () => '', deleteBefore: () => {} },
        marks: {
            toggle: (type, value) => {
                const { [type]: present, ...others } = selection.marks;
                selection = {
                    ...selection,
                    marks: present === undefined ? { ...others, [type]: allOf(value) } : others,
                };
            },
            set: (type, value) => {
                selection = { ...selection, marks: { ...selection.marks, [type]: allOf(value) } };
            },
            removeAll: () => {
                const removed = Object.keys(selection.marks).length > 0;
                selection = { ...selection, marks: {} };
                return removed;
            },
            getRun: (type) => {
                const mark = selection.marks[type];
                if (mark?.coverage !== 'all') {
                    return null;
                }
                return { value: mark.value, text: selection.text };
            },
        },
        blocks: {
            setType: (type, value) => setBlocks([{ type, ...value }, ...selection.blocks.slice(1)]),
            updateAttributes: () => {},
            toggleAttribute: () => 'set',
            resetAttributes: () => {},
            split: () => false,
        },
        lists: {
            // Wraps the text block in a list and an item, or takes it out again.
            toggle: (type) => {
                const [textBlock = { type: PARAGRAPH }, ...around] = selection.blocks;
                const inList = around.some((block) => block.type === type);
                setBlocks(
                    inList
                        ? [textBlock, ...around.filter((block) => block.type !== type && block.type !== LIST_ITEM)]
                        : [textBlock, { type: LIST_ITEM }, { type }, ...around],
                );
            },
            indent: () => false,
            outdent: () => false,
            split: () => false,
            unwrapAll: () => false,
        },
        insert: (type, value) => {
            inserted.push({ type, value });
        },
        insertText: () => {},
        history: { undo: () => {}, redo: () => {} },
        isEmpty: () => false,
        group: (run) => run(),
        announce: () => {},
        focus: () => {},
        blur: () => {},
        editors: {
            open: (type) => {
                openEditor = type;
            },
            close: () => {
                openEditor = null;
            },
        },
    };

    return {
        api,
        /** What the entry toggling `type` (default: the content's only type) is handed right now. */
        props: ({ content, type }: Subject) =>
            toolbarItemProps(
                { own: ownTypeOf(content, type ?? onlyTypeOf(content)), label: LABEL },
                api,
                api.selection.get(),
            ),
        inserted,
        openEditor: () => openEditor,
    };
};

const markPlugin: Subject = {
    content: defineContent({
        marks: {
            link: defineMark<{ href: string }>({
                toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
                parse: [],
            }),
        },
    }),
};

const listPlugin: Subject = {
    content: defineContent({
        blocks: {
            bulletList: defineBlock({ content: { items: LIST_ITEM }, toHtml: () => ({ tag: 'ul' }), parse: [] }),
            [LIST_ITEM]: defineBlock({ content: { blocks: [PARAGRAPH] }, toHtml: () => ({ tag: 'li' }), parse: [] }),
        },
    }),
    type: 'bulletList',
};

const containerPlugin: Subject = {
    content: defineContent({
        blocks: {
            callout: defineBlock({ content: { blocks: [PARAGRAPH] }, toHtml: () => ({ tag: 'aside' }), parse: [] }),
        },
    }),
};

const textBlockPlugin: Subject = {
    content: defineContent({
        blocks: {
            quote: defineBlock({ content: 'text', toHtml: () => ({ tag: 'blockquote' }), parse: [] }),
        },
    }),
};

const voidBlockPlugin: Subject = {
    content: defineContent({
        blocks: {
            divider: defineBlock({ toHtml: () => ({ tag: 'hr' }), parse: [] }),
        },
    }),
};

const inlinePlugin: Subject = {
    content: defineContent({
        inlines: {
            mention: defineInline<{ id: string }>({ toHtml: ({ id }) => ({ tag: 'span', children: id }), parse: [] }),
        },
    }),
};

const attributePlugin: Subject = {
    content: defineContent({ blockAttributes: { align: { style: (value) => ({ 'text-align': value }) } } }),
};

const LINK = { href: 'https://example.com' };

describe('what a toolbar entry acts on', () => {
    it('is the type it names, whichever kind of node that is', () => {
        const content = defineContent({
            ...inlinePlugin.content,
            blocks: { ...textBlockPlugin.content.blocks, ...voidBlockPlugin.content.blocks },
            marks: markPlugin.content.marks,
        });

        expect(ownTypeOf(content, 'link')).toEqual({ kind: 'mark', type: 'link' });
        expect(ownTypeOf(content, 'quote')).toEqual({ kind: 'textBlock', type: 'quote' });
        expect(ownTypeOf(content, 'divider')).toEqual({ kind: 'voidBlock', type: 'divider' });
        expect(ownTypeOf(content, 'mention')).toEqual({ kind: 'inline', type: 'mention' });
    });

    it('is a block by what that block holds', () => {
        expect(ownTypeOf(listPlugin.content, 'bulletList')).toEqual({ kind: 'list', type: 'bulletList' });
        expect(ownTypeOf(containerPlugin.content, 'callout')).toEqual({ kind: 'container', type: 'callout' });
    });

    it('is nothing when it names no type, or one the content does not declare', () => {
        expect(ownTypeOf(attributePlugin.content, undefined)).toEqual({ kind: 'none' });
        expect(ownTypeOf(markPlugin.content, 'bold')).toEqual({ kind: 'none' });
        expect(ownTypeOf(undefined, 'bold')).toEqual({ kind: 'none' });
    });
});

describe('a mark plugin', () => {
    it('turns its mark on with the value given, and off again', () => {
        const editor = fakeEditor({ text: 'here', isCollapsed: false });

        editor.props(markPlugin).toggle(LINK);

        expect(editor.props(markPlugin).isActive).toBe(true);
        expect(editor.props(markPlugin).selectedNode).toEqual({ type: 'link', value: LINK, text: 'here' });

        editor.props(markPlugin).toggle();

        expect(editor.props(markPlugin).isActive).toBe(false);
        expect(editor.props(markPlugin).selectedNode).toBeNull();
    });

    it('is not active at the edge of its run, where typing would not carry the mark, but still finds it', () => {
        const editor = fakeEditor();
        editor.api.marks.getRun = () => ({ value: LINK, text: 'here' });

        const props = editor.props(markPlugin);

        expect(props.isActive).toBe(false);
        expect(props.selectedNode).toEqual({ type: 'link', value: LINK, text: 'here' });
    });

    it('is mixed when only part of the selection carries its mark', () => {
        const editor = fakeEditor({ text: 'here', isCollapsed: false, marks: { link: { coverage: 'some' } } });

        const props = editor.props(markPlugin);

        expect(props.isActive).toBe('mixed');
    });

    it('is not mixed when another mark is partial', () => {
        const editor = fakeEditor({ text: 'here', isCollapsed: false, marks: { bold: { coverage: 'some' } } });

        expect(editor.props(markPlugin).isActive).toBe(false);
    });

    it('opens the editor of its mark', () => {
        const editor = fakeEditor();

        editor.props(markPlugin).openEditor();

        expect(editor.openEditor()).toBe('link');
    });
});

describe('a list plugin', () => {
    it('wraps the selection in its list, and is active anywhere inside it with the list as the selected node', () => {
        const editor = fakeEditor({ text: 'item' });

        editor.props(listPlugin).toggle();

        expect(editor.props(listPlugin).isActive).toBe(true);
        expect(editor.props(listPlugin).selectedNode).toEqual({ type: 'bulletList', value: {}, text: 'item' });
    });

    it('unwraps its list when toggled inside it', () => {
        const editor = fakeEditor();
        editor.props(listPlugin).toggle();

        editor.props(listPlugin).toggle();

        expect(editor.props(listPlugin).isActive).toBe(false);
        expect(editor.api.selection.get().blocks).toEqual([{ type: PARAGRAPH }]);
    });
});

describe('a text block plugin', () => {
    it('turns the block into its type with the value given, attributes as the selected node value', () => {
        const editor = fakeEditor();

        editor.props(textBlockPlugin).toggle({ cite: 'Ada' });

        expect(editor.props(textBlockPlugin).isActive).toBe(true);
        expect(editor.props(textBlockPlugin).selectedNode).toEqual({ type: 'quote', value: { cite: 'Ada' }, text: '' });
    });

    it('turns its block back into a paragraph when toggled while active', () => {
        const editor = fakeEditor({ block: { type: 'quote' }, blocks: [{ type: 'quote' }] });

        editor.props(textBlockPlugin).toggle();

        expect(editor.props(textBlockPlugin).isActive).toBe(false);
        expect(editor.api.selection.get().block).toEqual({ type: PARAGRAPH });
    });
});

describe('a container block plugin', () => {
    it('leaves the document alone on toggle, rather than turning text into a block that holds blocks', () => {
        const editor = fakeEditor();
        const before = editor.api.selection.get();

        expect(() => editor.props(containerPlugin).toggle()).not.toThrow();
        expect(editor.api.selection.get()).toBe(before);
        expect(editor.inserted).toEqual([]);
    });

    it('is active inside its block, and opens its editor', () => {
        const editor = fakeEditor({ blocks: [{ type: PARAGRAPH }, { type: 'callout', tone: 'info' }] });

        expect(editor.props(containerPlugin).isActive).toBe(true);
        expect(editor.props(containerPlugin).selectedNode?.value).toEqual({ tone: 'info' });

        editor.props(containerPlugin).openEditor();

        expect(editor.openEditor()).toBe('callout');
    });
});

describe('a void block plugin', () => {
    it('inserts its block on toggle, with the value given', () => {
        const editor = fakeEditor();

        editor.props(voidBlockPlugin).toggle({ thick: true });

        expect(editor.inserted).toEqual([{ type: 'divider', value: { thick: true } }]);
    });

    it('is active while its block is selected', () => {
        const editor = fakeEditor({ block: { type: 'divider' }, blocks: [{ type: 'divider' }] });

        expect(editor.props(voidBlockPlugin).isActive).toBe(true);
    });
});

describe('an inline plugin', () => {
    it('inserts its inline on toggle', () => {
        const editor = fakeEditor();

        editor.props(inlinePlugin).toggle();

        expect(editor.inserted).toEqual([{ type: 'mention', value: undefined }]);
    });

    it('opens its editor, how a toolbar button hands over to a mention picker', () => {
        const editor = fakeEditor();

        editor.props(inlinePlugin).openEditor();

        expect(editor.openEditor()).toBe('mention');
    });

    it('is never active and has no selected node: the selection sits beside an inline, not in it', () => {
        const props = fakeEditor().props(inlinePlugin);

        expect(props.isActive).toBe(false);
        expect(props.selectedNode).toBeNull();
    });
});

describe('an entry with no type of its own', () => {
    it('is never active, has no selected node, and does nothing on toggle or openEditor', () => {
        const editor = fakeEditor();
        const before = editor.api.selection.get();
        const props = editor.props(attributePlugin);

        props.toggle();
        props.openEditor();

        expect(props.isActive).toBe(false);
        expect(props.selectedNode).toBeNull();
        expect(editor.api.selection.get()).toBe(before);
        expect(editor.inserted).toEqual([]);
        expect(editor.openEditor()).toBeNull();
    });

    it('hands over the api and the selection it was given', () => {
        const editor = fakeEditor();
        const selection = editor.api.selection.get();

        const props = toolbarItemProps({ own: { kind: 'none' }, label: LABEL }, editor.api, selection);

        expect(props.api).toBe(editor.api);
        expect(props.selection).toBe(selection);
    });

    it('hands over the label and shortcut of the entry', () => {
        const editor = fakeEditor();

        const props = toolbarItemProps(
            { own: { kind: 'none' }, label: LABEL, shortcut: 'Mod-k' },
            editor.api,
            editor.api.selection.get(),
        );

        expect(props.label).toBe(LABEL);
        expect(props.shortcut).toBe('Mod-k');
    });
});
