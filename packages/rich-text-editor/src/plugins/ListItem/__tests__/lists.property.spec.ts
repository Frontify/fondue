/* (c) Copyright Frontify Ltd., all rights reserved. */

import fc from 'fast-check';
import { type Node } from 'prosemirror-model';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { describe, expect, it } from 'vitest';

import { type ContentNodeJSON } from '#/model';
import { fcSettings, seeded } from '#/plugins/__tests__/fixtures/generated';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { type ListKind, listModel } from '#/react/__tests__/fixtures/lists';
import { extensionsOf } from '#/react/compile/engine';
import { RUNTIME_PLUGINS } from '#/runtime/capabilities';
import { compileDefinition } from '#/runtime/definition';
import { canUndo } from '#/runtime/history';

const model = listModel();
const engine = compileDefinition(model, RUNTIME_PLUGINS, extensionsOf(model, unitsOf(model)));
const KINDS: readonly ListKind[] = ['bullet', 'ordered', 'task'];
const ITEMS = new Set(['list_item', 'task_item']);

type Shape = {
    kind: ListKind;
    start: number;
    items: readonly { checked: boolean; children: Shape | null }[];
};
/** Nested bullet, ordered and task lists, mixed, up to three levels deep. */
const shape = fc
    .letrec<{ list: Shape; nested: Shape | null }>((tie) => ({
        list: fc.record({
            kind: fc.constantFrom(...KINDS),
            start: fc.nat({ max: 9 }),
            items: fc.array(fc.record({ checked: fc.boolean(), children: tie('nested') }), {
                minLength: 1,
                maxLength: 3,
            }),
        }),
        nested: fc.option(tie('list'), { depthSize: 'small', freq: 2 }),
    }))
    .list.filter((list) => depthOf(list) <= 3);

const depthOf = (list: Shape | null): number => {
    if (list === null) {
        return 0;
    }

    return 1 + Math.max(...list.items.map(({ children }) => depthOf(children)));
};

/** A document of the list with numbered words, which no step can merge into another word's text. */
const documentOf = (list: Shape): Node => {
    let words = 0;
    const listJson = ({ kind, start, items }: Shape): ContentNodeJSON => {
        const content = items.map(({ checked, children }): ContentNodeJSON => {
            words += 1;
            const blocks: ContentNodeJSON[] = [{ type: 'paragraph', content: [{ type: 'text', text: `w${words}.` }] }];
            if (children !== null) {
                blocks.push(listJson(children));
            }

            if (kind === 'task') {
                return { type: 'task_item', attrs: { nodeId: `t${words}`, checked }, content: blocks };
            }

            return { type: 'list_item', content: blocks };
        });
        if (kind === 'bullet') {
            return { type: 'bullet_list', content };
        }

        if (kind === 'ordered') {
            return { type: 'ordered_list', attrs: { start }, content };
        }

        return { type: 'task_list', content };
    };

    const blocks = [{ type: 'paragraph', content: [{ type: 'text', text: 'before.' }] }, listJson(list)];

    return engine.schema.nodeFromJSON({ type: 'doc', content: blocks });
};

const viewOf = (doc: Node) =>
    new EditorView(document.createElement('div'), { state: EditorState.create({ doc, plugins: engine.plugins }) });

/** The textblocks of the document, with the position inside each. */
const textblocks = (doc: Node): { node: Node; pos: number }[] => {
    const found: { node: Node; pos: number }[] = [];
    doc.descendants((node, pos) => {
        if (node.isTextblock) {
            found.push({ node, pos: pos + 1 });
        }
    });

    return found;
};

const itemsIn = (doc: Node) => {
    let count = 0;
    doc.descendants((node) => {
        if (ITEMS.has(node.type.name)) {
            count += 1;
        }
    });

    return count;
};

const caretAt = (view: EditorView, pick: number, offset: number) => {
    const blocks = textblocks(view.state.doc);
    const block = blocks[pick % blocks.length];
    if (block === undefined) {
        return;
    }

    const at = block.pos + (offset % (block.node.content.size + 1));
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, at)));
};

const press = (view: EditorView, key: string, init: KeyboardEventInit = {}) => {
    view.dom.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }));
};

/** Every place a list item's text starts or ends, where Backspace or Delete meets a list boundary. */
const boundaries = (doc: Node): number[] => {
    const found: number[] = [];
    doc.descendants((node, pos) => {
        if (ITEMS.has(node.type.name)) {
            let size = 0;
            if (node.firstChild !== null) {
                size = node.firstChild.content.size;
            }

            found.push(pos + 2, pos + 2 + size);
        }
    });

    return found;
};

describe(seeded('list edits'), () => {
    it('keeps all text and every other item on Backspace and Delete at a list boundary', () => {
        fc.assert(
            fc.property(shape, fc.nat(), fc.constantFrom('Backspace', 'Delete'), (list, pick, key) => {
                const view = viewOf(documentOf(list));
                const places = boundaries(view.state.doc);
                const at = places[pick % places.length] ?? 1;
                view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, at)));
                const before = view.state.doc;

                press(view, key);

                // A key lifts or joins at most the item at the caret, so no nested list turns into paragraphs.
                expect(view.state.doc.textContent).toBe(before.textContent);
                expect(itemsIn(view.state.doc)).toBeGreaterThanOrEqual(itemsIn(before) - 1);
                view.destroy();
            }),
            fcSettings(500),
        );
    });

    type Step =
        | {
              kind: 'key';
              key: string;
              init: KeyboardEventInit;
              pick: number;
              offset: number;
          }
        | { kind: 'paste'; pick: number; offset: number }
        | { kind: 'toggle'; command: string; pick: number };
    const at = { pick: fc.nat(), offset: fc.nat() };
    const step: fc.Arbitrary<Step> = fc.oneof(
        fc.record({
            kind: fc.constant('key' as const),
            key: fc.constantFrom('Enter', 'Backspace', 'Delete', 'Tab'),
            init: fc.constantFrom<KeyboardEventInit>({}, { shiftKey: true }),
            ...at,
        }),
        fc.record({ kind: fc.constant('paste' as const), ...at }),
        fc.record({
            kind: fc.constant('toggle' as const),
            command: fc.constantFrom('list.bullet.toggle', 'list.ordered.toggle', 'list.task.toggle'),
            pick: fc.nat(),
        }),
    );

    it('keeps all text in order through list edits, and undoing every step restores the document exactly', () => {
        let taken = 0;
        let changed = 0;
        fc.assert(
            fc.property(shape, fc.array(step, { maxLength: 20, size: 'max' }), (list, steps) => {
                const view = viewOf(documentOf(list));
                const original: unknown = view.state.doc.toJSON();
                for (const [index, next] of steps.entries()) {
                    const before = view.state.doc.textContent;
                    const docBefore = view.state.doc;
                    let pasted = '';
                    if (next.kind === 'toggle') {
                        caretAt(view, next.pick, 0);
                        engine.commands.get(next.command)?.run(view.state, view.dispatch, { start: 1 });
                    } else {
                        caretAt(view, next.pick, next.offset);
                    }

                    if (next.kind === 'key') {
                        press(view, next.key, next.init);
                    }

                    if (next.kind === 'paste') {
                        pasted = `P${index}.`;
                        view.pasteHTML(`<ul><li><p>${pasted}</p></li></ul>`);
                    }

                    const after = view.state.doc.textContent;
                    taken += 1;
                    if (view.state.doc !== docBefore) {
                        changed += 1;
                    }

                    // The pasted words sit in one place, and every other word keeps its order.
                    expect(after.replace(pasted, '')).toBe(before);
                }

                while (canUndo(view.state)) {
                    engine.commands.get('history.undo')?.run(view.state, view.dispatch);
                }

                expect(view.state.doc.toJSON()).toEqual(original);
                view.destroy();
            }),
            fcSettings(1000),
        );
        // Most steps change the document, so the property is not met by doing nothing.
        expect(changed).toBeGreaterThan(taken / 2);
    }, 120_000);
});
