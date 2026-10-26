/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextSelection } from 'prosemirror-state';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type ContentNodeJSON } from '#/model';
import { mentions } from '#/plugins';
import { fixtureMention } from '#/plugins/__tests__/fixtures/features';
import { done, item, list, LIST_KINDS, type ListKind, listModel, outlineOf } from '#/react/__tests__/fixtures/lists';
import { mountText, para, text } from '#/react/__tests__/fixtures/text';
import { type CommandResult } from '#/runtime/types';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = listModel([fixtureMention()]);
type Handle = ReturnType<typeof mountText>['handle'];

/** Bold text, a mention and plain text, the inline content every conversion keeps. */
const INLINE: readonly ContentNodeJSON[] = [
    text('Brand', 'bold'),
    { type: 'mention', attrs: { nodeId: 'mention-1', label: 'Ada' } },
    text(' guide'),
];
const heading: ContentNodeJSON = {
    type: 'heading',
    attrs: { nodeId: 'heading-1', level: 2, lang: null },
    content: [...INLINE],
};

/** The content of the first textblock in the document. */
const firstInline = (handle: Handle): unknown => {
    const pending = [...(handle.getSnapshot().document.content.content ?? [])];
    for (let node = pending.shift(); node !== undefined; node = pending.shift()) {
        if (node.type === 'paragraph' || node.type === 'heading') {
            return node.content;
        }

        pending.unshift(...(node.content ?? []));
    }

    return undefined;
};

const run = (handle: Handle, command: string, payload?: unknown): CommandResult =>
    (handle.execute as (id: string, payload?: unknown) => CommandResult)(command, payload);

describe('block conversions', () => {
    const targets: readonly (readonly [string, string, unknown])[] = [
        ['a paragraph', 'paragraph.set', undefined],
        ['a heading', 'heading.set', { level: 3 }],
        ['a bulleted list item', 'list.bullet.toggle', undefined],
        ['a numbered list item', 'list.ordered.toggle', { start: 1 }],
        ['a task item', 'list.task.toggle', undefined],
        ['a quote', 'quote.toggle', undefined],
    ];
    for (const [name, command, payload] of targets) {
        it(`keeps the marks and the mention of a heading converted to ${name}`, () => {
            const { handle } = mountText({ model, blocks: [heading] });
            setSelection(handle, { text: 'Brand', from: 2, to: 2 });

            expect(run(handle, command, payload).status).toBe('applied');
            expect(firstInline(handle)).toEqual(INLINE);
        });
    }

    const transitions: readonly (readonly [string, ContentNodeJSON, string, unknown])[] = [
        ['a paragraph to a heading', para(...INLINE), 'heading.set', { level: 2 }],
        ['a paragraph to a list item', para(...INLINE), 'list.bullet.toggle', undefined],
        [
            'a bulleted to a numbered list',
            list('bullet', [{ type: 'list_item', content: [para(...INLINE)] }]),
            'list.ordered.toggle',
            { start: 1 },
        ],
        ['a paragraph into a quote', para(...INLINE), 'quote.toggle', undefined],
        ['a paragraph out of a quote', { type: 'blockquote', content: [para(...INLINE)] }, 'quote.toggle', undefined],
    ];
    for (const [name, block, command, payload] of transitions) {
        it(`keeps inline formatting and references when ${name} converts`, () => {
            const { handle } = mountText({ model, blocks: [block] });
            setSelection(handle, { text: 'Brand', from: 2, to: 2 });

            expect(run(handle, command, payload).status).toBe('applied');
            expect(firstInline(handle)).toEqual(INLINE);
        });
    }
});

describe('block conversions with the shipped mentions', () => {
    const shipped = listModel([mentions()]);
    const inline: readonly ContentNodeJSON[] = [
        text('Brand', 'bold'),
        {
            type: 'mention',
            attrs: { nodeId: 'mention-1', resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada' },
        },
        text(' guide'),
    ];
    const targets: readonly (readonly [string, string, unknown])[] = [
        ['a paragraph', 'paragraph.set', undefined],
        ['a heading', 'heading.set', { level: 3 }],
        ['a bulleted list item', 'list.bullet.toggle', undefined],
        ['a numbered list item', 'list.ordered.toggle', { start: 1 }],
        ['a task item', 'list.task.toggle', undefined],
        ['a quote', 'quote.toggle', undefined],
    ];
    for (const [name, command, payload] of targets) {
        it(`keeps the marks and the mention of a heading converted to ${name}`, () => {
            const { handle } = mountText({
                model: shipped,
                blocks: [
                    { type: 'heading', attrs: { nodeId: 'heading-1', level: 2, lang: null }, content: [...inline] },
                ],
            });
            setSelection(handle, { text: 'Brand', from: 2, to: 2 });

            expect(run(handle, command, payload).status).toBe('applied');
            expect(firstInline(handle)).toEqual(inline);
        });
    }
});

describe('list type toggles', () => {
    /** One item with a nested list of its own type, and a second item; an ordered list starts at 5 and the first task is checked. */
    const source = (kind: ListKind): ContentNodeJSON => {
        const nested = list(kind, [item(kind, 'child')]);
        let first = item(kind, 'one', nested);
        if (kind === 'task') {
            first = done('one', nested);
        }

        return list(kind, [first, item(kind, 'two')], 5);
    };

    const TOGGLES = { bullet: 'list.bullet.toggle', ordered: 'list.ordered.toggle', task: 'list.task.toggle' } as const;

    for (const from of LIST_KINDS) {
        for (const to of LIST_KINDS.filter((kind) => kind !== from)) {
            it(`turns a ${from} list into a ${to} list keeping its items and children, as one undo step`, () => {
                const { handle } = mountText({ model, blocks: [source(from)] });
                const original = outlineOf(handle);
                setSelection(handle, { text: 'two', from: 1, to: 1 });

                let payload: unknown;
                if (to === 'ordered') {
                    payload = { start: 3 };
                }

                const result = run(handle, TOGGLES[to], payload);
                const toggled = outlineOf(handle);
                run(handle, 'history.undo');

                expect(result.status).toBe('applied');
                const keys = { bullet: 'ul', ordered: 'ol', task: 'tasks' };
                // Nested lists keep their own type; new task items are unchecked and leaving a task list drops `checked`.
                const nested = { [keys[from]]: [taskBox(from, ['child'])] };
                expect(toggled).toEqual([
                    { ...startOf(to, 3), [keys[to]]: [taskBox(to, ['one', nested]), taskBox(to, ['two'])] },
                ]);
                expect(outlineOf(handle)).toEqual(original);
                expect(handle.getSnapshot().document.content.content).toEqual([source(from)]);
            });
        }
    }

    it('turns an item of a bulleted list inside a numbered item into a paragraph of that item, not an item of the outer list', () => {
        const { handle } = mountText({
            model,
            blocks: [list('ordered', [item('ordered', 'one', list('bullet', [item('bullet', 'two')]))])],
        });
        setSelection(handle, { text: 'two', from: 1, to: 1 });

        const result = run(handle, 'list.bullet.toggle');

        expect(result.status).toBe('applied');
        expect(outlineOf(handle)).toEqual([{ ol: [['one', 'two']] }]);
    });

    it('splits the inner list around a middle item turned into a paragraph of the outer item', () => {
        const inner = list('bullet', [item('bullet', 'two'), item('bullet', 'three'), item('bullet', 'four')]);
        const { handle } = mountText({ model, blocks: [list('ordered', [item('ordered', 'one', inner)])] });
        setSelection(handle, { text: 'three', from: 1, to: 1 });

        run(handle, 'list.bullet.toggle');
        const toggled = outlineOf(handle);
        run(handle, 'history.undo');

        expect(toggled).toEqual([{ ol: [['one', { ul: [['two']] }, 'three', { ul: [['four']] }]] }]);
        expect(outlineOf(handle)).toEqual([{ ol: [['one', { ul: [['two'], ['three'], ['four']] }]] }]);
    });

    it('starts a new numbered list at the payload start from paragraphs and from a bulleted list', () => {
        const fromParagraphs = mountText({ model, blocks: [para(text('one')), para(text('two'))] });
        const fromBullets = mountText({
            model,
            blocks: [list('bullet', [item('bullet', 'one'), item('bullet', 'two')])],
        });
        const { view } = fromParagraphs;
        view.dispatch(
            view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, view.state.doc.content.size - 1)),
        );
        setSelection(fromBullets.handle, { text: 'two', from: 1, to: 1 });

        const results = [fromParagraphs, fromBullets].map(({ handle }) =>
            handle.execute('list.ordered.toggle', { start: 5 }),
        );

        expect(results.map(({ status }) => status)).toEqual(['applied', 'applied']);

        expect(outlineOf(fromParagraphs.handle)).toEqual([{ ol: [['one'], ['two']], start: 5 }]);
        expect(outlineOf(fromBullets.handle)).toEqual([{ ol: [['one'], ['two']], start: 5 }]);
    });
});

/** An item outline, with the unchecked box of a task item. */
const taskBox = (kind: ListKind, blocks: readonly unknown[]) => {
    if (kind === 'task') {
        return ['[ ]', ...blocks];
    }

    return [...blocks];
};

/** The `start` an outline shows for a list of `kind` that starts at `start`. */
const startOf = (kind: ListKind, start: number) => {
    if (kind === 'ordered') {
        return { start };
    }

    return {};
};

describe('list rules inside a list of another type', () => {
    it.each([
        ['- ', 'ordered', { ul: [['A'], ['']] }, { ol: [['A'], ['- ']] }],
        ['1. ', 'bullet', { ol: [['A'], ['']] }, { ul: [['A'], ['1. ']] }],
        [
            '[ ] ',
            'ordered',
            {
                tasks: [
                    ['[ ]', 'A'],
                    ['[ ]', ''],
                ],
            },
            { ol: [['A'], ['[ ] ']] },
        ],
    ] as const)(
        'turns the list into the rule\'s type for "%s" typed in a new %s item, removes the marker, and one undo restores it',
        (marker, kind, converted, undone) => {
            const { handle } = mountText({ model, blocks: [list(kind, [item(kind, 'A')])] });
            setSelection(handle, { text: 'A', from: 1, to: 1 });

            pressKey(handle, 'Enter');
            typeText(handle, marker);
            const after = outlineOf(handle);
            handle.execute('history.undo');

            expect(after).toEqual([converted]);
            expect(outlineOf(handle)).toEqual([undone]);
        },
    );
});
