/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { fixtureItalic } from '#/features/__tests__/fixtures/features';
import { featuresById } from '#/features/registry';
import { compileContentModel, type ContentNodeJSON, defineFeature } from '#/model';
import { done, item, list, listModel, outline, outlineOf } from '#/react/__tests__/fixtures/lists';
import { mountText, para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { RichTextReader } from '#/reader';
import { pressKey, setSelection, typeText } from '#/testing';

/** The node view checkbox lands in its chrome slot once the portal store's microtask renders. */
const mountTasks = async (options: Parameters<typeof mountText>[0]) => {
    const mounted = mountText(options);
    await act(async () => {
        await Promise.resolve();
    });
    return mounted;
};

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = listModel();
const tasks = list('task', [done('Approve the palette'), item('task', 'Update the templates')]);
const idsOf = (handle: ReturnType<typeof mountText>['handle']) => {
    const [taskList] = handle.getSnapshot().document.content.content ?? [];
    if (taskList === undefined) {
        return [];
    }
    return (taskList.content ?? []).map((node) => [node.attrs?.nodeId, outline(node)]);
};

describe('lists.task', () => {
    it('keeps every nodeId when a task item moves, and when the move is undone and redone', () => {
        const { handle } = mountText({ model, blocks: [tasks] });
        setSelection(handle, { text: 'Approve', from: 1, to: 1 });

        const moved = handle.execute('block.move.down');
        const afterMove = idsOf(handle);
        handle.execute('history.undo');
        const afterUndo = idsOf(handle);
        handle.execute('history.redo');

        expect(moved.status).toBe('applied');
        const swapped = [
            ['task-Update the templates', ['[ ]', 'Update the templates']],
            ['task-Approve the palette', ['[x]', 'Approve the palette']],
        ];
        expect(afterMove).toEqual(swapped);
        expect(afterUndo).toEqual([...swapped].reverse());
        expect(idsOf(handle)).toEqual(swapped);
    });

    it('renders a native checkbox in the chrome slot, labelled by the item text and showing checked', async () => {
        await mountTasks({ model, blocks: [tasks] });

        const checked = screen.getByRole('checkbox', { name: 'Approve the palette' });
        const unchecked = screen.getByRole('checkbox', { name: 'Update the templates' });

        expect([checked, unchecked].map((box) => [box.tagName, (box as HTMLInputElement).checked])).toEqual([
            ['INPUT', true],
            ['INPUT', false],
        ]);
        expect(checked.closest('[data-rte-chrome]')?.getAttribute('contenteditable')).toBe('false');
        expect(checked.closest('ul > li')).not.toBeNull();
    });

    it('renders the shipped task checkbox in a custom model with an outside feature', async () => {
        const custom = compileContentModel([...featuresById(['core', 'lists.task']), fixtureItalic()], {
            id: 'test.custom-tasks',
            version: 1,
        });
        await mountTasks({ model: custom, blocks: [tasks] });

        expect(screen.getByRole('checkbox', { name: 'Approve the palette' })).toBeChecked();
    });

    it('renders a disabled native checkbox in the reader that shows checked and is labelled by the first paragraph', () => {
        const nested = list('task', [item('task', 'Social media')]);
        const document = storedIn(model, [list('task', [done('Approve the palette', nested), item('task', 'Print')])]);
        const { container } = render(<RichTextReader document={document} model={model} />);
        const reader = within(container);

        const approve = reader.getByRole('checkbox', { name: 'Approve the palette', checked: true });
        const print = reader.getByRole('checkbox', { name: 'Print', checked: false });

        expect([approve, print].map((box) => (box as HTMLInputElement).disabled)).toEqual([true, true]);
        expect(reader.getByRole('checkbox', { name: 'Social media' })).toBeDisabled();
    });

    it('reads [ ] and [x] items as task items with lists.task installed, and as bulleted items with the literal text otherwise', () => {
        const markdown = '- [ ] Draft\n- [x] Review\n';
        const withTasks = createCodecs(model).fromMarkdown(markdown);
        const withoutTasks = createCodecs(
            compileContentModel(featuresById(['core', 'lists.item', 'lists.bullet']), {
                id: 'test.no-tasks',
                version: 1,
            }),
        ).fromMarkdown(markdown);

        const blocksOf = (result: typeof withTasks): readonly ContentNodeJSON[] => {
            if (result.status === 'blocked') {
                throw new Error('The Markdown does not decode.');
            }
            return result.document.content.content ?? [];
        };
        expect(blocksOf(withTasks).map(outline)).toEqual([
            {
                tasks: [
                    ['[ ]', 'Draft'],
                    ['[x]', 'Review'],
                ],
            },
        ]);
        expect(blocksOf(withoutTasks).map(outline)).toEqual([{ ul: [['[ ] Draft'], ['[x] Review']] }]);
    });

    /** Each task item of the snapshot, in document order, as its first paragraph's text and `checked`. */
    const checksOf = (handle: ReturnType<typeof mountText>['handle']) => {
        const found: Record<string, boolean>[] = [];
        const visit = (node: ContentNodeJSON) => {
            if (node.type === 'task_item') {
                const [first = { type: 'paragraph' }] = node.content ?? [];
                let text = '';
                for (const child of first.content ?? []) {
                    text += child.text ?? '';
                }
                found.push({ [text]: node.attrs?.checked === true });
            }
            for (const child of node.content ?? []) {
                visit(child);
            }
        };
        visit(handle.getSnapshot().document.content);
        return found;
    };

    it('keeps a checked item checked when Enter at its start puts the new, unchecked item before it', () => {
        const { handle } = mountText({ model, blocks: [list('task', [done('Buy milk')])] });
        setSelection(handle, { text: 'Buy milk', from: 0, to: 0 });

        pressKey(handle, 'Enter');

        expect(checksOf(handle)).toEqual([{ '': false }, { 'Buy milk': true }]);
    });

    it('checks only the item at the caret when "[x] " turns a bulleted list into a task list', () => {
        const { handle } = mountText({ model, blocks: [list('bullet', [item('bullet', 'A'), item('bullet', 'B')])] });
        setSelection(handle, { text: 'B', from: 1, to: 1 });

        pressKey(handle, 'Enter');
        typeText(handle, '[x] ');

        const converted = checksOf(handle);
        handle.execute('history.undo');

        expect(converted).toEqual([{ A: false }, { B: false }, { '': true }]);
        expect(outlineOf(handle)).toEqual([{ ul: [['A'], ['B'], ['[x] ']] }]);
    });

    it('runs Mod-Enter in a task item as one task.setChecked', () => {
        const { handle, changes } = mountText({ model, blocks: [tasks] });
        setSelection(handle, { text: 'Update the templates', from: 1, to: 1 });

        pressKey(handle, 'Mod-Enter');

        expect(changes.map(({ commandId }) => commandId)).toEqual(['task.setChecked']);
        expect(checksOf(handle)).toEqual([{ 'Approve the palette': true }, { 'Update the templates': true }]);
    });

    it("labels a checkbox by its item's first paragraph, not by the tasks nested in it", async () => {
        const nested = list('task', [item('task', 'Parent', list('task', [item('task', 'Child')]))]);
        await mountTasks({ model, blocks: [nested] });

        expect(screen.getAllByRole('checkbox').map((box) => box.getAttribute('aria-labelledby') !== null)).toEqual([
            true,
            true,
        ]);
        expect(screen.getByRole('checkbox', { name: 'Parent' })).toBeDefined();
        expect(screen.getByRole('checkbox', { name: 'Child' })).toBeDefined();
    });

    it('counts a lossy block and an island inside a task item once', () => {
        const note = defineFeature({
            id: 'test.note',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                note: {
                    group: 'block',
                    content: 'block+',
                    attrs: {},
                    html: ['aside', 0],
                    parse: [{ tag: 'aside' }],
                },
            },
            formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
        });
        const withNote = listModel([note()]);
        const document = storedIn(withNote, [
            list('task', [
                item(
                    'task',
                    'Keep',
                    { type: 'note', content: [para(text('aside'))] },
                    { type: 'mystery', content: [para(text('gone'))] },
                ),
            ]),
        ]);

        const output = createCodecs(withNote).toHTML(document);

        expect(output.diagnostics.filter(({ code }) => code === 'codecs.lossy-output')).toEqual([
            {
                code: 'codecs.lossy-output',
                severity: 'info',
                messageKey: 'codecs.lossy-output',
                featureId: 'test.note',
                details: { count: 1 },
            },
        ]);
        expect(output.html.match(/data-rte-island=""/g)).toEqual(['data-rte-island=""']);
    });
});
