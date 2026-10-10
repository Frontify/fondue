/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { fixtureItalic } from '#/features/__fixtures__/features';
import { featuresById } from '#/features/registry';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { RichTextReader } from '#/reader';
import { pressKey, setSelection, typeText } from '#/testing';

import { done, item, list, listModel, outline } from '../../../fixtures/editor/lists';
import { mountText, storedIn } from '../../../fixtures/editor/text';

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
    it('SPEC-rich-text-format/AC-031 keeps every nodeId when a task item moves, and when the move is undone and redone', () => {
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

    it('SPEC-rich-text-editing/AC-031 renders a native checkbox in the chrome slot, labelled by the item text and showing checked', async () => {
        const { environment } = mountText({ model, blocks: [tasks] });
        await act(() => environment.flushMicrotasks());

        const checked = screen.getByRole('checkbox', { name: 'Approve the palette' });
        const unchecked = screen.getByRole('checkbox', { name: 'Update the templates' });

        expect([checked, unchecked].map((box) => [box.tagName, (box as HTMLInputElement).checked])).toEqual([
            ['INPUT', true],
            ['INPUT', false],
        ]);
        expect(checked.closest('[data-rte-chrome]')?.getAttribute('contenteditable')).toBe('false');
        expect(checked.closest('ul > li')).not.toBeNull();
    });

    it('SPEC-rich-text/AC-032 renders the shipped task checkbox in a custom model with an outside feature', async () => {
        const custom = compileContentModel([...featuresById(['core', 'lists.task']), fixtureItalic()], {
            id: 'test.custom-tasks',
            version: 1,
        });
        const { environment } = mountText({ model: custom, blocks: [tasks] });
        await act(() => environment.flushMicrotasks());

        expect(screen.getByRole('checkbox', { name: 'Approve the palette' })).toBeChecked();
    });

    it('SPEC-rich-text-output/AC-004 renders a disabled native checkbox in the reader that shows checked and is labelled by the first paragraph', () => {
        const nested = list('task', [item('task', 'Social media')]);
        const document = storedIn(model, [list('task', [done('Approve the palette', nested), item('task', 'Print')])]);
        const { container } = render(<RichTextReader document={document} model={model} />);
        const reader = within(container);

        const approve = reader.getByRole('checkbox', { name: 'Approve the palette', checked: true });
        const print = reader.getByRole('checkbox', { name: 'Print', checked: false });

        expect([approve, print].map((box) => (box as HTMLInputElement).disabled)).toEqual([true, true]);
        expect(reader.getByRole('checkbox', { name: 'Social media' })).toBeDisabled();
    });

    it('SPEC-rich-text-output/AC-023 reads [ ] and [x] items as task items with lists.task installed, and as bulleted items with the literal text otherwise', () => {
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

    it('SPEC-rich-text-editing/AC-027 keeps a checked item checked when Enter at its start puts the new, unchecked item before it', () => {
        const { handle } = mountText({ model, blocks: [list('task', [done('Buy milk')])] });
        setSelection(handle, { text: 'Buy milk', from: 0, to: 0 });

        pressKey(handle, 'Enter');

        expect(checksOf(handle)).toEqual([{ '': false }, { 'Buy milk': true }]);
    });

    it('SPEC-rich-text-editing/AC-075 checks only the item at the caret when "[x] " turns a bulleted list into a task list', () => {
        const { handle } = mountText({ model, blocks: [list('bullet', [item('bullet', 'A'), item('bullet', 'B')])] });
        setSelection(handle, { text: 'B', from: 1, to: 1 });

        pressKey(handle, 'Enter');
        typeText(handle, '[x] ');

        expect(checksOf(handle).flatMap((check) => Object.values(check))).toEqual([false, false, true]);
    });

    it('SPEC-rich-text-editing/AC-030 runs Mod-Enter in a task item as one task.setChecked', () => {
        const { handle, changes } = mountText({ model, blocks: [tasks] });
        setSelection(handle, { text: 'Update the templates', from: 1, to: 1 });

        pressKey(handle, 'Mod-Enter');

        expect(changes.map(({ commandId }) => commandId)).toEqual(['task.setChecked']);
        expect(checksOf(handle)).toEqual([{ 'Approve the palette': true }, { 'Update the templates': true }]);
    });

    it("SPEC-rich-text-editing/AC-031 labels a checkbox by its item's first paragraph, not by the tasks nested in it", async () => {
        const nested = list('task', [item('task', 'Parent', list('task', [item('task', 'Child')]))]);
        const { environment } = mountText({ model, blocks: [nested] });
        await act(() => environment.flushMicrotasks());

        expect(screen.getAllByRole('checkbox').map((box) => box.getAttribute('aria-labelledby') !== null)).toEqual([
            true,
            true,
        ]);
        expect(screen.getByRole('checkbox', { name: 'Parent' })).toBeDefined();
        expect(screen.getByRole('checkbox', { name: 'Child' })).toBeDefined();
    });
});
