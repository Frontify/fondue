/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { AllSelection, TextSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { align } from '#/features/blocks-align/feature';
import { codeBlock } from '#/features/blocks-code/feature';
import { formatClear } from '#/features/format-clear/feature';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { language } from '#/features/marks-language/feature';
import { type ContentNodeJSON, defineFeature } from '#/model';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const extras = () => [
    defineFeature({
        id: 'fixture.kept-marks',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: {
            link: {
                attrs: { href: { type: 'url', required: true } },
                html: ['a', { href: { attr: 'href' } }, 0],
                parse: [{ tag: 'a[href]', attrs: { href: { from: 'href' } } }],
            },
            mention: { attrs: {}, html: ['span', 0], parse: [{ tag: 'span[data-mention]' }] },
        },
    })(),
    defineFeature({
        id: 'fixture.color-marks',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: {
            font_color: {
                attrs: { value: { type: 'color', required: true } },
                html: ['span', 0],
                parse: [],
            },
            highlight: {
                attrs: { value: { type: 'color', required: true } },
                html: ['mark', 0],
                parse: [],
            },
        },
    })(),
    defineFeature({
        id: 'fixture.block-style',
        version: 1,
        requires: [
            { id: 'core', version: 1 },
            { id: 'blocks.heading', version: 1 },
        ],
        attributes: {
            styleId: {
                on: ['paragraph', 'heading'],
                value: { type: 'id', nullable: true, default: null },
                html: { attr: 'data-rte-style' },
            },
        },
    })(),
];

const formatting = [
    'bold',
    'italic',
    'underline',
    'strike',
    'code',
    'subscript',
    'superscript',
    'font_color',
    'highlight',
];

const marked = (): ContentNodeJSON => ({
    type: 'text',
    text: 'Styled',
    marks: [
        ...formatting.map((type) => {
            if (type === 'font_color' || type === 'highlight') {
                return { type, attrs: { value: '#112233' } };
            }
            return { type };
        }),
        { type: 'language', attrs: { lang: 'de', dir: null } },
        { type: 'link', attrs: { href: 'https://example.com' } },
        { type: 'mention' },
    ],
});

const item = (): ContentNodeJSON => ({
    type: 'bullet_list',
    attrs: { marker: null },
    content: [
        {
            type: 'list_item',
            content: [
                {
                    type: 'paragraph',
                    attrs: { lang: 'de', align: 'center', styleId: 'body' },
                    content: [marked()],
                },
            ],
        },
    ],
});

const model = () =>
    textModel([
        ...textFeatures(),
        align(),
        codeBlock(),
        language(),
        formatClear(),
        listItem(),
        bulletList(),
        ...extras(),
    ]);

const first = (handle: ReturnType<typeof mountText>['handle']) => handle.getSnapshot().document.content.content?.[0];
const childAt = (node: ContentNodeJSON | undefined, index: number) => {
    const children = node?.content;
    return children?.[index];
};

describe('clear formatting', () => {
    it('removes formatting marks and keeps language, links, mentions, lists and block attributes', () => {
        const { handle } = mountText({ model: model(), blocks: [item()] });
        setSelection(handle, { text: 'Styled' });

        expect(handle.execute('format.inline.clear').status).toBe('applied');

        const block = first(handle);
        expect(block?.type).toBe('bullet_list');
        const paragraph = childAt(childAt(block, 0), 0);
        expect(paragraph?.type).toBe('paragraph');
        expect(paragraph?.attrs).toMatchObject({ lang: 'de', align: 'center', styleId: 'body' });
        const run = childAt(paragraph, 0);
        const marks = run?.marks;
        expect(marks?.map((mark) => mark.type).sort()).toEqual(['language', 'link', 'mention']);
        expect(run?.text).toBe('Styled');
    });

    it('turns a formatted list item into a plain paragraph', () => {
        const { handle } = mountText({ model: model(), blocks: [item()] });
        setSelection(handle, { text: 'Styled' });

        expect(handle.execute('format.clear').status).toBe('applied');

        const block = first(handle);
        expect(block?.type).toBe('paragraph');
        expect(block?.attrs).toMatchObject({ lang: 'de', align: null });
        const run = childAt(block, 0);
        expect(run?.marks).toBeUndefined();
        expect(run?.text).toBe('Styled');
        expect(handle.execute('history.undo').status).toBe('applied');
        expect(first(handle)?.type).toBe('bullet_list');
    });

    it('drops the marks a caret would type with', () => {
        const { handle } = mountText({ model: model(), blocks: [para(text('Plain'))] });
        setSelection(handle, { text: 'Plain', from: 2, to: 2 });
        act(() => {
            handle.execute('mark.bold.toggle');
        });
        const before = handle.query('mark.bold.toggle').active;

        expect(handle.execute('format.clear').status).toBe('applied');

        expect([before, handle.query('mark.bold.toggle').active]).toEqual([true, false]);
    });

    it.each([
        ['a paragraph', para(text('Bold word', 'bold'))],
        [
            'a heading',
            { type: 'heading', attrs: { nodeId: 'title', level: 1, lang: null }, content: [text('Bold word', 'bold')] },
        ],
    ] as const)('clears the whole textblock around a caret in %s, and typing after it is plain', (_name, block) => {
        const { handle } = mountText({ model: model(), blocks: [block] });
        setSelection(handle, { text: 'Bold word', from: 4, to: 4 });

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(first(handle)?.type).toBe('paragraph');
        expect(childAt(first(handle), 0)?.marks).toBeUndefined();
        act(() => {
            typeText(handle, 'x');
        });
        const typed = first(handle)?.content;
        expect(typed?.map((node) => [node.text, node.marks])).toEqual([['Boldx word', undefined]]);
    });

    it('runs clear formatting from the toolbar button', () => {
        const { handle } = mountText({
            model: model(),
            blocks: [item()],
            toolbar: [['format.clear']],
        });
        setSelection(handle, { text: 'Styled' });

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Clear formatting' }));
        });

        expect(first(handle)?.type).toBe('paragraph');
        expect(first(handle)?.attrs).toMatchObject({ align: null });
        const run = childAt(first(handle), 0);
        expect(run?.text).toBe('Styled');
        expect(run?.marks).toBeUndefined();
    });
});

const bullets = (...items: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'bullet_list',
    attrs: { marker: null },
    content: [...items],
});
const bullet = (value: string, ...children: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'list_item',
    content: [para(text(value)), ...children],
});
const nestedLists = () => [
    para(text('Before')),
    bullets(bullet('One', bullets(bullet('Nested'))), bullet('Two')),
    para(text('After')),
];
const outline = (handle: ReturnType<typeof mountText>['handle']) =>
    (handle.getSnapshot().document.content.content ?? []).map((block) => [
        block.type,
        block.content?.[0]?.text ?? null,
    ]);
const plainOutline = [
    ['paragraph', 'Before'],
    ['paragraph', 'One'],
    ['paragraph', 'Nested'],
    ['paragraph', 'Two'],
    ['paragraph', 'After'],
];

describe('clear formatting across lists', () => {
    it('lifts every list item, nested ones included, out of a selection that starts before the list and ends after it', () => {
        const { handle, view } = mountText({ model: model(), blocks: nestedLists() });
        act(() => {
            view.dispatch(
                view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, view.state.doc.content.size - 1)),
            );
        });

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(outline(handle)).toEqual(plainOutline);
        expect(handle.execute('history.undo').status).toBe('applied');
        expect(outline(handle)).toEqual([
            ['paragraph', 'Before'],
            ['bullet_list', null],
            ['paragraph', 'After'],
        ]);
    });

    it('lifts every list item out of a select-all', () => {
        const { handle, view } = mountText({ model: model(), blocks: nestedLists() });
        act(() => {
            view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
        });

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(outline(handle)).toEqual(plainOutline);
    });
});

describe('clear formatting of the selection and the view', () => {
    it('keeps an all selection as it was', () => {
        const { handle, view } = mountText({ model: model(), blocks: nestedLists() });
        act(() => {
            view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
        });

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(view.state.selection).toBeInstanceOf(AllSelection);
    });

    it('scrolls the selection into view', () => {
        const { handle, view } = mountText({ model: model(), blocks: [bullets(bullet('Plain'))] });
        setSelection(handle, { text: 'Plain' });
        const scrolls = () => (view.state as unknown as { scrollToSelection: number }).scrollToSelection;
        const before = scrolls();

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(scrolls()).toBe(before + 1);
    });

    it('lifts a code block out of a list item that also holds a paragraph', () => {
        const code: ContentNodeJSON = { type: 'code_block', attrs: { languageId: null }, content: [text('let a')] };
        const listed = bullets({ type: 'list_item', content: [para(text('Intro')), code] });
        const { handle } = mountText({ model: model(), blocks: [listed] });
        setSelection(handle, { text: 'let a', from: 2, to: 2 });

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(outline(handle)).toEqual([
            ['paragraph', 'Intro'],
            ['paragraph', 'let a'],
        ]);
    });
});

describe('clear formatting of block attributes', () => {
    const indent = defineFeature({
        id: 'fixture.indent',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        attributes: {
            indent: {
                on: ['paragraph'],
                value: { type: 'integer', min: 0, max: 8, default: 0 },
                html: { attr: 'data-indent' },
            },
        },
    })();

    it('restores each cleared attribute to its declared default', () => {
        const indented = textModel([...textFeatures(), align(), formatClear(), indent]);
        const { handle } = mountText({
            model: indented,
            blocks: [
                { type: 'paragraph', attrs: { lang: null, align: 'center', indent: 2 }, content: [text('Moved')] },
            ],
        });
        setSelection(handle, { text: 'Moved' });

        expect(handle.execute('format.clear').status).toBe('applied');

        expect(first(handle)?.attrs).toMatchObject({ align: null, indent: 0 });
    });
});
