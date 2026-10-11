/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type ContentNodeJSON } from '#/model';
import {
    done,
    item,
    itemOutline,
    list,
    LIST_KINDS,
    type ListKind,
    listModel,
    listOutline,
    outlineOf,
} from '#/react/__tests__/fixtures/lists';
import { mountText } from '#/react/__tests__/fixtures/text';
import { pressKey } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = listModel();
type Mounted = ReturnType<typeof mountText>;

const INDENT = { bullet: 'list.indent', ordered: 'list.indent', task: 'task.indent' } as const;
const TOGGLE = { bullet: 'list.bullet.toggle', ordered: 'list.ordered.toggle', task: 'list.task.toggle' } as const;

/** `items` as the list at `depth`: inside `depth - 1` outer items, each the only item of its list. */
const atDepth = (kind: ListKind, depth: number, items: readonly ContentNodeJSON[]): ContentNodeJSON => {
    let node = list(kind, items);
    for (let level = depth - 1; level >= 1; level -= 1) {
        node = list(kind, [item(kind, `outer${level}`, node)]);
    }
    return node;
};
/** The outline of `atDepth` with these item outlines. */
const outlineAt = (kind: ListKind, depth: number, items: readonly unknown[]): unknown => {
    let node = listOutline(kind, items);
    for (let level = depth - 1; level >= 1; level -= 1) {
        node = listOutline(kind, [itemOutline(kind, `outer${level}`, node)]);
    }
    return node;
};
const one = (kind: ListKind) => itemOutline(kind, 'one');
const three = (kind: ListKind) => itemOutline(kind, 'three');

/** The position `offset` characters into the first textblock that holds `value`, or the first empty one for ''. */
const positionOf = (view: EditorView, value: string, offset = 0): number => {
    let found: number | undefined;
    view.state.doc.descendants((node, pos) => {
        const matches = value === '' && node.content.size === 0;
        if (found === undefined && node.isTextblock && (matches || (value !== '' && node.textContent === value))) {
            found = pos + 1 + offset;
        }
        return found === undefined;
    });
    if (found === undefined) {
        throw new Error(`No textblock holds "${value}".`);
    }
    return found;
};
const caret = ({ view }: Mounted, value: string, offset = 0) => {
    const at = positionOf(view, value, offset);
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, at)));
};
/** Presses `key` at the surface and returns whether the editor prevented it. */
const press = ({ view }: Mounted, key: string, init: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
    view.dom.dispatchEvent(event);
    return event.defaultPrevented;
};
const emptyItem = (kind: ListKind): ContentNodeJSON => {
    const content = [{ type: 'paragraph', attrs: { lang: null }, content: [] }];
    if (kind === 'task') {
        return { type: 'task_item', attrs: { nodeId: 'task-empty', checked: false }, content };
    }
    return { type: 'list_item', content };
};
const mountList = (block: ContentNodeJSON) => mountText({ model, blocks: [block] });
/** The modifier `Mod` stands for on the platform the test environment reports. */
const MOD: KeyboardEventInit = { ctrlKey: true };
if (/Mac|iP(hone|[oa]d)/.test(navigator.platform)) {
    Object.assign(MOD, { ctrlKey: false, metaKey: true });
}

describe('the List keys table', () => {
    for (const kind of LIST_KINDS) {
        for (const depth of [1, 2, 3]) {
            const where = `${kind} list at depth ${depth}`;
            const three3 = [item(kind, 'one'), item(kind, 'two'), item(kind, 'three')];

            it(`splits a non-empty item at the caret with Enter in a ${where}`, () => {
                const mounted = mountList(atDepth(kind, depth, three3));
                caret(mounted, 'two', 1);

                expect(press(mounted, 'Enter')).toBe(true);
                expect(outlineOf(mounted.handle)).toEqual([
                    outlineAt(kind, depth, [one(kind), itemOutline(kind, 't'), itemOutline(kind, 'wo'), three(kind)]),
                ]);
            });

            it(`deletes a selection across items as outside lists with Backspace and Delete in a ${where}`, () => {
                for (const key of ['Backspace', 'Delete']) {
                    const mounted = mountList(atDepth(kind, depth, three3));
                    const { view } = mounted;
                    const from = positionOf(view, 'one', 1);
                    const to = positionOf(view, 'three', 3);
                    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)));

                    press(mounted, key);

                    expect(outlineOf(mounted.handle)).toEqual([outlineAt(kind, depth, [itemOutline(kind, 'oee')])]);
                    mounted.unmount();
                }
            });

            it(`leaves one empty paragraph after select all and Delete in a ${where}`, () => {
                const mounted = mountList(atDepth(kind, depth, three3));
                caret(mounted, 'two');

                pressKey(mounted.handle, 'Mod-a');
                press(mounted, 'Delete');

                expect(mounted.handle.getSnapshot().document.content.content).toEqual([
                    { type: 'paragraph', attrs: { lang: null } },
                ]);
            });

            if (depth === 1) {
                it(`turns an empty top-level item into a paragraph after the list, splitting it, with Enter in a ${kind} list`, () => {
                    const mounted = mountList(list(kind, [item(kind, 'one'), emptyItem(kind), item(kind, 'three')]));
                    caret(mounted, '');

                    expect(press(mounted, 'Enter')).toBe(true);
                    expect(outlineOf(mounted.handle)).toEqual([
                        listOutline(kind, [one(kind)]),
                        '',
                        listOutline(kind, [three(kind)]),
                    ]);
                });

                it(`turns a top-level item into a paragraph with its child list after it on Backspace at its start in a ${kind} list`, () => {
                    const child = list(kind, [item(kind, 'child')]);
                    const mounted = mountList(
                        list(kind, [item(kind, 'one'), item(kind, 'two', child), item(kind, 'three')]),
                    );
                    caret(mounted, 'two');

                    expect(press(mounted, 'Backspace')).toBe(true);
                    expect(outlineOf(mounted.handle)).toEqual([
                        listOutline(kind, [one(kind)]),
                        'two',
                        listOutline(kind, [itemOutline(kind, 'child')]),
                        listOutline(kind, [three(kind)]),
                    ]);
                });

                it(`turns a top-level item into a paragraph with Shift+Tab in a ${kind} list`, () => {
                    const mounted = mountList(list(kind, three3));
                    caret(mounted, 'two');

                    expect(press(mounted, 'Tab', { shiftKey: true })).toBe(true);
                    expect(outlineOf(mounted.handle)).toEqual([
                        listOutline(kind, [one(kind)]),
                        'two',
                        listOutline(kind, [three(kind)]),
                    ]);
                });
            } else {
                // The nested item moves one level out, after the item that held its list.
                const outdented = (moved: unknown) => {
                    const outer = itemOutline(kind, `outer${depth - 1}`, listOutline(kind, [one(kind)]));
                    return outlineAt(kind, depth - 1, [outer, moved]);
                };

                it(`outdents an empty nested item one level with Enter in a ${where}`, () => {
                    const mounted = mountList(atDepth(kind, depth, [item(kind, 'one'), emptyItem(kind)]));
                    caret(mounted, '');

                    expect(press(mounted, 'Enter')).toBe(true);
                    expect(outlineOf(mounted.handle)).toEqual([outdented(itemOutline(kind, ''))]);
                });

                it(`outdents a nested item one level on Backspace at the start of its first paragraph in a ${where}`, () => {
                    const mounted = mountList(atDepth(kind, depth, [item(kind, 'one'), item(kind, 'two')]));
                    caret(mounted, 'two');

                    expect(press(mounted, 'Backspace')).toBe(true);
                    expect(outlineOf(mounted.handle)).toEqual([outdented(itemOutline(kind, 'two'))]);
                });

                for (const [name, key, init] of [
                    ['Mod+[', '[', MOD],
                    ['Shift+Tab', 'Tab', { shiftKey: true }],
                ] as const) {
                    it(`outdents a nested item with its children on ${name} in a ${where}`, () => {
                        const child = list(kind, [item(kind, 'child')]);
                        const mounted = mountList(atDepth(kind, depth, [item(kind, 'one'), item(kind, 'two', child)]));
                        caret(mounted, 'two');

                        expect(press(mounted, key, init)).toBe(true);
                        const moved = itemOutline(kind, 'two', listOutline(kind, [itemOutline(kind, 'child')]));
                        expect(outlineOf(mounted.handle)).toEqual([outdented(moved)]);
                    });
                }
            }

            for (const [name, key, init] of [
                ['Mod+]', ']', MOD],
                ['Tab', 'Tab', {}],
            ] as const) {
                it(`nests an item with its children under its previous sibling on ${name} in a ${where}`, () => {
                    const child = list(kind, [item(kind, 'child')]);
                    const mounted = mountList(
                        atDepth(kind, depth, [item(kind, 'one'), item(kind, 'two', child), item(kind, 'three')]),
                    );
                    caret(mounted, 'two');

                    expect(press(mounted, key, init)).toBe(true);
                    const nested = itemOutline(kind, 'two', listOutline(kind, [itemOutline(kind, 'child')]));
                    expect(outlineOf(mounted.handle)).toEqual([
                        outlineAt(kind, depth, [itemOutline(kind, 'one', listOutline(kind, [nested])), three(kind)]),
                    ]);
                });
            }

            it(`returns not-applicable for the indent command and passes Mod+] and Tab on an item with no previous sibling in a ${where}`, () => {
                const mounted = mountList(atDepth(kind, depth, three3));
                caret(mounted, 'one');
                const before = mounted.handle.getSnapshot().document;

                const result = mounted.handle.execute(INDENT[kind]);
                const modPrevented = press(mounted, ']', MOD);
                const tabPrevented = press(mounted, 'Tab');

                expect(result).toEqual({ status: 'rejected', code: 'not-applicable' });
                expect([modPrevented, tabPrevented]).toEqual([false, false]);
                expect(mounted.handle.getSnapshot().document).toEqual(before);
            });

            it(`turns the selected items into paragraphs with the toggle of their own type in a ${where}`, () => {
                const mounted = mountList(atDepth(kind, depth, three3));
                caret(mounted, 'two');

                let payload: { readonly start: number } | undefined;
                if (kind === 'ordered') {
                    payload = { start: 1 };
                }
                const result = mounted.handle.execute(TOGGLE[kind], payload as never);

                expect(result.status).toBe('applied');
                expect(outlineOf(mounted.handle)).toEqual([
                    outlineAt(kind, depth, [one(kind)]),
                    'two',
                    listOutline(kind, [three(kind)]),
                ]);
            });
        }
    }

    it('unchecks the new item of a split inside a checked task item in the root transaction, before any appended transaction, and gives it a new nodeId after the commit', () => {
        const mounted = mountList(list('task', [done('Approve'), item('task', 'Print')]));
        const { view, handle } = mounted;
        caret(mounted, 'Approve', 3);
        const plugin = view.state.plugins.find((candidate) =>
            (candidate as unknown as { key: string }).key.startsWith('list-keys$'),
        );
        if (plugin === undefined) {
            throw new Error('The model has no list keys.');
        }
        const roots: Transaction[] = [];
        const stub = { state: view.state, dispatch: (transaction: Transaction) => roots.push(transaction) };
        const { handleKeyDown } = plugin.props;
        handleKeyDown?.call(plugin, stub as unknown as EditorView, new KeyboardEvent('keydown', { key: 'Enter' }));
        const [root] = roots;
        if (root === undefined) {
            throw new Error('Enter dispatched nothing.');
        }
        const rootChecked = root.doc.child(0).children.map((node) => node.attrs.checked as unknown);

        press(mounted, 'Enter');
        const [taskList] = handle.getSnapshot().document.content.content ?? [];
        if (taskList === undefined) {
            throw new Error('The task list is gone.');
        }
        const ids = (taskList.content ?? []).map(({ attrs }) => attrs?.nodeId);

        expect(rootChecked).toEqual([true, false, false]);
        expect(outlineOf(handle)).toEqual([
            {
                tasks: [
                    ['[x]', 'App'],
                    ['[ ]', 'rove'],
                    ['[ ]', 'Print'],
                ],
            },
        ]);
        expect(ids[0]).toBe('task-Approve');
        expect(typeof ids[1]).toBe('string');
        expect(new Set(ids).size).toBe(3);
    });
});
