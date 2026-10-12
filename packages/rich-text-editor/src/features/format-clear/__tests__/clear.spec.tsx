/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { AllSelection, TextSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { align } from '#/features/blocks-align/feature';
import { formatClear } from '#/features/format-clear/feature';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { language } from '#/features/marks-language/feature';
import { type ContentNodeJSON, defineFeature } from '#/model';
import { mountText, para, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { setSelection } from '#/testing';

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
    textModel([...textFeatures(), align(), language(), formatClear(), listItem(), bulletList(), ...extras()]);

const first = (handle: ReturnType<typeof mountText>['handle']) => handle.getSnapshot().document.content.content?.[0];

describe('clear formatting', () => {
    it('removes formatting marks and keeps language, links, mentions, lists and block attributes', () => {
        const { handle } = mountText({ model: model(), blocks: [item()] });
        setSelection(handle, { text: 'Styled' });

        expect(handle.execute('format.inline.clear').status).toBe('applied');

        const block = first(handle);
        expect(block?.type).toBe('bullet_list');
        const paragraph = block?.content?.[0]?.content?.[0];
        expect(paragraph?.type).toBe('paragraph');
        expect(paragraph?.attrs).toMatchObject({ lang: 'de', align: 'center', styleId: 'body' });
        expect(paragraph?.content?.[0]?.marks?.map((mark) => mark.type).sort()).toEqual([
            'language',
            'link',
            'mention',
        ]);
        expect(paragraph?.content?.[0]?.text).toBe('Styled');
    });

    it('turns a formatted list item into a plain paragraph', () => {
        const { handle } = mountText({ model: model(), blocks: [item()] });
        setSelection(handle, { text: 'Styled' });

        expect(handle.execute('format.clear').status).toBe('applied');

        const block = first(handle);
        expect(block?.type).toBe('paragraph');
        expect(block?.attrs).toMatchObject({ lang: 'de', align: null });
        expect(block?.content?.[0]?.marks).toBeUndefined();
        expect(block?.content?.[0]?.text).toBe('Styled');
        expect(handle.execute('history.undo').status).toBe('applied');
        expect(first(handle)?.type).toBe('bullet_list');
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
        expect(first(handle)?.content?.[0]?.text).toBe('Styled');
        expect(first(handle)?.content?.[0]?.marks).toBeUndefined();
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
