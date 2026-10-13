/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import {
    defineBlock,
    defineMark,
    type EditorControlApi,
    ownTypeOf,
    type RteBlockNode,
    type RtePlugin,
    type RteSelectionSnapshot,
} from '#/core';

import { toolbarItemProps } from './toolbarItem';

/**
 * What a plugin's toolbar item is handed, composed from the control API alone —
 * so a fake API stands in for the editor, and each test checks which commands a
 * prop turns into.
 */

const snapshot = (overrides: Partial<RteSelectionSnapshot> = {}): RteSelectionSnapshot => ({
    isCollapsed: true,
    text: '',
    block: { type: 'paragraph' },
    blocks: [{ type: 'paragraph' }],
    marks: {},
    ...overrides,
});

const fakeApi = (
    selection: RteSelectionSnapshot = snapshot(),
    run: ReturnType<EditorControlApi['marks']['getRun']> = null,
) => {
    const api = {
        selection: { get: vi.fn(() => selection), replaceWithText: vi.fn() },
        marks: {
            toggle: vi.fn(),
            removeAll: vi.fn(),
            getRun: vi.fn(() => run),
            select: vi.fn(() => run !== null),
        },
        blocks: { setType: vi.fn(), updateAttributes: vi.fn(), resetAttributes: vi.fn() },
        lists: {
            toggle: vi.fn(),
            indent: vi.fn(() => true),
            outdent: vi.fn(() => true),
            split: vi.fn(() => true),
            unwrapAll: vi.fn(() => true),
        },
        insert: vi.fn(),
        insertText: vi.fn(),
        focus: vi.fn(),
        blur: vi.fn(),
        editors: { open: vi.fn(), close: vi.fn() },
    } satisfies EditorControlApi;
    return api;
};

const markPlugin: RtePlugin = {
    id: 'link',
    marks: {
        link: defineMark<{ href: string }>({
            toHtml: ({ href }) => ({ tag: 'a', attrs: { href }, children: true }),
            parse: [],
        }),
    },
};

const listPlugin: RtePlugin = {
    id: 'bullets',
    blocks: {
        bulletList: defineBlock({ content: { items: 'listItem' }, toHtml: () => ({ tag: 'ul' }), parse: [] }),
        listItem: defineBlock({ content: { blocks: ['paragraph'] }, toHtml: () => ({ tag: 'li' }), parse: [] }),
    },
};

const textBlockPlugin: RtePlugin = {
    id: 'quote',
    blocks: {
        quote: defineBlock({ content: 'text', toHtml: () => ({ tag: 'blockquote' }), parse: [] }),
    },
};

const voidBlockPlugin: RtePlugin = {
    id: 'image',
    blocks: {
        image: defineBlock({ toHtml: () => ({ tag: 'img' }), parse: [] }),
    },
};

const attributePlugin: RtePlugin = {
    id: 'align',
    blockAttributes: { align: { style: (value) => ({ 'text-align': value }) } },
};

const LINK = { href: 'https://example.com' };

describe('a mark plugin', () => {
    it('is active when the selection carries its mark', () => {
        const selection = snapshot({ marks: { link: LINK } });

        expect(toolbarItemProps(ownTypeOf(markPlugin), fakeApi(selection), selection).isActive).toBe(true);
    });

    it('is not active at the edge of its run, where typing would not carry the mark', () => {
        const api = fakeApi(snapshot(), { value: LINK, text: 'here' });

        const props = toolbarItemProps(ownTypeOf(markPlugin), api, snapshot());

        expect(props.isActive).toBe(false);
        expect(props.selectedNode).toEqual({ type: 'link', value: LINK, text: 'here' });
    });

    it('has no selected node away from its mark', () => {
        expect(toolbarItemProps(ownTypeOf(markPlugin), fakeApi(), snapshot()).selectedNode).toBeNull();
    });

    it('toggles its mark with the value given', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(markPlugin), api, snapshot()).toggle(LINK);

        expect(api.marks.toggle).toHaveBeenCalledWith('link', LINK);
    });

    it('sets a value by taking the mark off its whole run and putting it back with the new value', () => {
        const selection = snapshot({ marks: { link: LINK } });
        const api = fakeApi(selection, { value: LINK, text: 'here' });

        toolbarItemProps(ownTypeOf(markPlugin), api, selection).setValue({ href: 'https://new.example' });

        expect(api.marks.select).toHaveBeenCalledWith('link');
        expect(api.marks.toggle.mock.calls).toEqual([['link'], ['link', { href: 'https://new.example' }]]);
    });

    it('sets a value on a selection without the mark by only putting it on', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(markPlugin), api, snapshot()).setValue(LINK);

        expect(api.marks.toggle.mock.calls).toEqual([['link', LINK]]);
    });

    it('removes the mark from its whole run', () => {
        const selection = snapshot({ marks: { link: LINK } });
        const api = fakeApi(selection, { value: LINK, text: 'here' });

        toolbarItemProps(ownTypeOf(markPlugin), api, selection).remove();

        expect(api.marks.select).toHaveBeenCalledWith('link');
        expect(api.marks.toggle.mock.calls).toEqual([['link']]);
    });

    it('replaces the text of its whole run', () => {
        const api = fakeApi(snapshot(), { value: LINK, text: 'here' });

        toolbarItemProps(ownTypeOf(markPlugin), api, snapshot()).setText('there');

        expect(api.marks.select).toHaveBeenCalledWith('link');
        expect(api.selection.replaceWithText).toHaveBeenCalledWith('there');
        expect(api.marks.select.mock.invocationCallOrder[0]).toBeLessThan(
            api.selection.replaceWithText.mock.invocationCallOrder[0] ?? 0,
        );
    });
});

describe('a list plugin', () => {
    const inList = snapshot({
        text: 'item',
        blocks: [{ type: 'paragraph' }, { type: 'listItem' }, { type: 'bulletList' }],
    });

    it('is active anywhere inside its list, with the list as the selected node', () => {
        const props = toolbarItemProps(ownTypeOf(listPlugin), fakeApi(inList), inList);

        expect(props.isActive).toBe(true);
        expect(props.selectedNode).toEqual({ type: 'bulletList', value: {}, text: 'item' });
    });

    it('is not active outside its list', () => {
        expect(toolbarItemProps(ownTypeOf(listPlugin), fakeApi(), snapshot()).isActive).toBe(false);
    });

    it('toggles its list', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(listPlugin), api, snapshot()).toggle();

        expect(api.lists.toggle).toHaveBeenCalledWith('bulletList');
    });

    it('removes its list by toggling it off when inside it', () => {
        const api = fakeApi(inList);

        toolbarItemProps(ownTypeOf(listPlugin), api, inList).remove();

        expect(api.lists.toggle).toHaveBeenCalledWith('bulletList');
    });

    it('does nothing on remove outside its list', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(listPlugin), api, snapshot()).remove();

        expect(api.lists.toggle).not.toHaveBeenCalled();
    });
});

describe('a text block plugin', () => {
    const inQuote = snapshot({
        block: { type: 'quote' },
        blocks: [{ type: 'quote', align: 'center' } as RteBlockNode],
    });

    it('is active in its block, with the block attributes as the value', () => {
        const props = toolbarItemProps(ownTypeOf(textBlockPlugin), fakeApi(inQuote), inQuote);

        expect(props.isActive).toBe(true);
        expect(props.selectedNode).toEqual({ type: 'quote', value: { align: 'center' }, text: '' });
    });

    it('turns the block into its type when not active', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(textBlockPlugin), api, snapshot()).toggle({ level: 1 });

        expect(api.blocks.setType).toHaveBeenCalledWith('quote', { level: 1 });
    });

    it('turns its block back into a paragraph when active', () => {
        const api = fakeApi(inQuote);

        toolbarItemProps(ownTypeOf(textBlockPlugin), api, inQuote).toggle();

        expect(api.blocks.setType).toHaveBeenCalledWith('paragraph', undefined);
    });

    it('removes itself by turning its block back into a paragraph', () => {
        const api = fakeApi(inQuote);

        toolbarItemProps(ownTypeOf(textBlockPlugin), api, inQuote).remove();

        expect(api.blocks.setType).toHaveBeenCalledWith('paragraph', undefined);
    });

    it('sets a value as attributes on the blocks', () => {
        const api = fakeApi(inQuote);

        toolbarItemProps(ownTypeOf(textBlockPlugin), api, inQuote).setValue({ align: 'right' });

        expect(api.blocks.updateAttributes).toHaveBeenCalledWith({ align: 'right' });
        expect(api.marks.toggle).not.toHaveBeenCalled();
    });

    it('replaces the selected text without growing the selection first', () => {
        const api = fakeApi(inQuote);

        toolbarItemProps(ownTypeOf(textBlockPlugin), api, inQuote).setText('new');

        expect(api.marks.select).not.toHaveBeenCalled();
        expect(api.selection.replaceWithText).toHaveBeenCalledWith('new');
    });
});

describe('a void block plugin', () => {
    it('inserts its block on toggle, with the value given', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(voidBlockPlugin), api, snapshot()).toggle({ src: 'a.png' });

        expect(api.insert).toHaveBeenCalledWith('image', { src: 'a.png' });
    });

    it('is active while its block is selected', () => {
        const selected = snapshot({ block: { type: 'image' }, blocks: [{ type: 'image' }] });

        expect(toolbarItemProps(ownTypeOf(voidBlockPlugin), fakeApi(selected), selected).isActive).toBe(true);
    });

    it('does nothing on remove', () => {
        const selected = snapshot({ block: { type: 'image' }, blocks: [{ type: 'image' }] });
        const api = fakeApi(selected);

        toolbarItemProps(ownTypeOf(voidBlockPlugin), api, selected).remove();

        expect(api.insert).not.toHaveBeenCalled();
        expect(api.blocks.setType).not.toHaveBeenCalled();
    });

    it('opens its editor', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(voidBlockPlugin), api, snapshot()).openEditor();

        expect(api.editors.open).toHaveBeenCalledWith('image');
    });
});

describe('a plugin with no type of its own', () => {
    it('is never active and has no selected node', () => {
        const props = toolbarItemProps(ownTypeOf(attributePlugin), fakeApi(), snapshot());

        expect(props.isActive).toBe(false);
        expect(props.selectedNode).toBeNull();
    });

    it('does nothing on toggle, remove or openEditor', () => {
        const api = fakeApi();
        const props = toolbarItemProps(ownTypeOf(attributePlugin), api, snapshot());

        props.toggle();
        props.remove();
        props.openEditor();

        const calls = [api.marks.toggle, api.lists.toggle, api.blocks.setType, api.insert, api.editors.open].flatMap(
            (command) => command.mock.calls,
        );
        expect(calls).toEqual([]);
    });

    it('still sets a value as block attributes', () => {
        const api = fakeApi();

        toolbarItemProps(ownTypeOf(attributePlugin), api, snapshot()).setValue({ align: 'left' });

        expect(api.blocks.updateAttributes).toHaveBeenCalledWith({ align: 'left' });
    });

    it('hands over the api and the selection it was given', () => {
        const api = fakeApi();
        const selection = snapshot();

        const props = toolbarItemProps(ownTypeOf(attributePlugin), api, selection);

        expect(props.api).toBe(api);
        expect(props.selection).toBe(selection);
    });
});
