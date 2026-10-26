/* (c) Copyright Frontify Ltd., all rights reserved. */

import { splitBlock } from 'prosemirror-commands';
import { Node } from 'prosemirror-model';
import { Plugin, type Transaction } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { compileContentModel, type JsonValue, type ResourceLimits } from '#/model';
import { limitsOf } from '#/model/internal';
import { fixtureHeadingSet, fixtureMedia } from '#/plugins/__tests__/fixtures/features';
import { countingIds } from '#/plugins/__tests__/fixtures/notes';
import { vocabularyLists, vocabularyMention } from '#/plugins/__tests__/fixtures/vocabulary';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { type EngineCommand, ORIGIN_META } from '#/runtime/definition';
import { setSelection, typeText } from '#/testing';

import { createLimitCheck } from '../guards/limits';

import { stored, para, words, start, contentOf, undoSteps, forbid, installRuntimeHooks } from './fixtures/start';

installRuntimeHooks();

describe('node IDs', () => {
    const idModel = compileContentModel(
        [core(), bold(), fixtureHeadingSet(), vocabularyLists(), fixtureMedia(), vocabularyMention()],
        {
            id: 'test.bold',
            version: 1,
        },
    );
    /** Inserts a copy of the top-level block at the selection after it, as `block.duplicate` does. */
    const duplicate: EngineCommand = {
        run: (state, dispatch) => {
            const { $from } = state.selection;
            const index = $from.index(0);
            if (dispatch !== undefined) {
                dispatch(state.tr.insert($from.posAtIndex(index + 1, 0), state.doc.child(index)));
            }

            return true;
        },
        active: () => false,
    };
    const titled = (nodeId: string, value: string) => ({
        type: 'heading',
        attrs: { nodeId, level: 2 },
        content: [words(value)],
    });
    const task = (nodeId: string, value: string) => ({
        type: 'task_item',
        attrs: { nodeId, checked: false },
        content: [para(words(value))],
    });
    const figure = { type: 'figure', attrs: { nodeId: 'f-1' }, content: [para(words('Logo'))] };
    const embed = { type: 'embed', attrs: { nodeId: 'e-1', url: 'https://www.youtube.com/watch?v=1' } };
    const person = (nodeId: string) => ({
        type: 'mention',
        attrs: { nodeId, resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada' },
    });
    /** The `nodeId`s of the published document, in document order. */
    const idsIn = (value: unknown): unknown[] => {
        if (Array.isArray(value)) {
            return value.flatMap(idsIn);
        }

        if (typeof value !== 'object' || value === null) {
            return [];
        }

        const { attrs, content } = value as {
            attrs?: { nodeId?: unknown };
            content?: unknown;
        };
        const own: unknown[] = [];
        if (attrs !== undefined && 'nodeId' in attrs) {
            own.push(attrs.nodeId);
        }

        return [...own, ...idsIn(content)];
    };

    /** Splits the node `depth` levels around the caret, as Enter in a list item does. */
    const splitAt =
        (depth: number) =>
        ({ view }: ReturnType<typeof start>) =>
            view.dispatch(view.state.tr.split(view.state.selection.from, depth));
    const cases: readonly (readonly [string, JsonValue, (session: ReturnType<typeof start>) => void, unknown[]])[] = [
        [
            'turns a paragraph into a heading',
            para(words('ab')),
            ({ handle }) => {
                setSelection(handle, { text: 'ab', from: 1, to: 1 });
                handle.execute('heading.set', { level: 2 });
            },
            ['node-2'],
        ],
        [
            'splits a heading in the middle',
            titled('h-1', 'cd'),
            (session) => {
                setSelection(session.handle, { text: 'cd', from: 1, to: 1 });
                splitBlock(session.view.state, (transaction) => session.view.dispatch(transaction));
            },
            ['h-1', 'node-2'],
        ],
        [
            'splits a heading at the start',
            titled('h-1', 'cd'),
            (session) => {
                setSelection(session.handle, { text: 'cd', from: 0, to: 0 });
                splitBlock(session.view.state, (transaction) => session.view.dispatch(transaction));
            },
            ['h-1'],
        ],
        [
            'splits a heading at its very start into two headings, which leaves the ID on the part with the content',
            titled('h-1', 'cd'),
            (session) => {
                setSelection(session.handle, { text: 'cd', from: 0, to: 0 });
                splitAt(1)(session);
            },
            ['node-2', 'h-1'],
        ],
        [
            'splits a task item in the middle',
            { type: 'task_list', content: [task('t-1', 'gh')] },
            (session) => {
                setSelection(session.handle, { text: 'gh', from: 1, to: 1 });
                splitAt(2)(session);
            },
            ['t-1', 'node-2'],
        ],
        [
            'splits a task item at the start, which leaves the ID on the part with the content',
            { type: 'task_list', content: [task('t-1', 'gh')] },
            (session) => {
                setSelection(session.handle, { text: 'gh', from: 0, to: 0 });
                splitAt(2)(session);
            },
            ['node-2', 't-1'],
        ],
        [
            'duplicates a figure',
            figure,
            ({ handle }) => {
                setSelection(handle, { nodeId: 'f-1' });
                handle.execute('block.duplicate');
            },
            ['f-1', 'node-2'],
        ],
        [
            'duplicates an embed',
            embed,
            ({ handle }) => {
                setSelection(handle, { nodeId: 'e-1' });
                handle.execute('block.duplicate');
            },
            ['e-1', 'node-2'],
        ],
        [
            'pastes a copy of a mention before its original, which keeps the ID',
            para(words('a'), person('m-1')),
            ({ view }) => view.dispatch(view.state.tr.insert(1, view.state.doc.firstChild?.child(1) as Node)),
            ['node-2', 'm-1'],
        ],
        [
            'pastes a copy of a mention after its original, which keeps the ID',
            para(words('a'), person('m-1')),
            ({ view }) => view.dispatch(view.state.tr.insert(3, view.state.doc.firstChild?.child(1) as Node)),
            ['m-1', 'node-2'],
        ],
    ];
    for (const [name, block, act, ids] of cases) {
        it(`${name} and gives each node without a unique nodeId a new one in the same batch`, () => {
            const appended: Transaction[] = [];
            const seen = new Plugin({
                state: {
                    init: () => null,
                    apply: (transaction) => {
                        if (transaction.getMeta('appendedTransaction') !== undefined) {
                            appended.push(transaction);
                        }

                        return null;
                    },
                },
            });
            const session = start(stored(block), {
                model: idModel,
                plugins: [seen],
                commands: { 'block.duplicate': duplicate },
            });
            const original = session.view.state.doc;
            const before = idsIn(original.toJSON());

            act(session);

            expect(session.changes).toHaveLength(1);
            const published = idsIn(contentOf(session.changes[0]));
            expect(published).toEqual(ids);
            expect(new Set(published).size).toBe(published.length);
            expect(published).toEqual(expect.arrayContaining(before));
            expect(appended.length > 0).toBe(published.some((id) => !before.includes(id)));
            // The repair has origin `normalization` and joins the root's history event, while the event keeps the root's origin.
            for (const transaction of appended) {
                expect(transaction.getMeta(ORIGIN_META)).toBe('normalization');
                expect(transaction.getMeta('addToHistory')).toBeUndefined();
            }

            expect(session.changes[0]?.origin).not.toBe('normalization');
            // One undo step reverts the change with its repair.
            expect(undoSteps(session.handle)).toBe(1);
            expect(session.view.state.doc.eq(original)).toBe(true);
        });
    }

    it('reads only the nodes a keystroke, a mark step or an attribute step changed, and leaves a stored repeated nodeId alone', () => {
        const blocks: JsonValue[] = [para(words('a'), person('m-1'), person('m-1'))];
        for (let index = 0; index < 5000; index += 1) {
            blocks.push(titled(`h-${index}`, 'Title'), para(words('Some text')));
        }

        const { handle, changes, view } = start(stored(...blocks), {
            model: idModel,
            policy: forbid('fixture.mention', 'create'),
            limits: { maxDocumentNodes: 1_000_000, maxDocumentBytes: 100_000_000 },
        });
        const { nodesBetween } = Node.prototype;
        /** The nodes `act` visits, with a nested walk counted once, since it gets the counting callback already. */
        const visitsOf = (act: () => void) => {
            let visits = 0;
            let depth = 0;
            const counted = vi
                .spyOn(Node.prototype, 'nodesBetween')
                .mockImplementation(function (this: Node, from, to, visit, at) {
                    if (depth > 0) {
                        return nodesBetween.call(this, from, to, visit, at);
                    }

                    depth += 1;
                    try {
                        return nodesBetween.call(
                            this,
                            from,
                            to,
                            (...args) => {
                                visits += 1;

                                return visit(...args);
                            },
                            at,
                        );
                    } finally {
                        depth -= 1;
                    }
                });
            try {
                act();
            } finally {
                counted.mockRestore();
            }

            return visits;
        };

        setSelection(handle, { text: 'Some text', from: 4, to: 4 });
        const heading = view.state.doc.child(0).nodeSize;

        const typed = visitsOf(() => typeText(handle, 'x'));
        const marked = visitsOf(() =>
            view.dispatch(view.state.tr.addMark(heading + 1, heading + 3, view.state.schema.mark('bold'))),
        );
        const attributed = visitsOf(() => view.dispatch(view.state.tr.setNodeAttribute(heading, 'level', 3)));

        expect(changes.map(({ origin }) => origin)).toEqual(['input', 'unknown', 'unknown']);
        expect({ typed: typed < 50, marked: marked < 50, attributed: attributed < 50 }).toEqual({
            typed: true,
            marked: true,
            attributed: true,
        });
    });

    it('installs the IDs a query drew, so execute publishes what query judged', () => {
        const queried = start(stored(para(words('ab'))), { model: idModel });
        setSelection(queried.handle, { text: 'ab', from: 1, to: 1 });
        for (let count = 0; count < 3; count += 1) {
            expect(queried.handle.query('heading.set', { level: 2 }).enabled).toBe(true);
        }

        expect(queried.handle.execute('heading.set', { level: 2 }).status).toBe('applied');
        expect(contentOf(queried.changes[0])).toMatchObject({ content: [{ attrs: { nodeId: 'node-2' } }] });

        // The session id and seven further draws leave the next id as `node-9`, one byte shorter than `node-10`.
        const atNine = (limits: Partial<ResourceLimits>) => {
            const generateId = countingIds();
            const session = start(stored(para(words('ab'))), { model: idModel, limits, generateId });
            for (let count = 0; count < 7; count += 1) {
                generateId();
            }

            setSelection(session.handle, { text: 'ab', from: 1, to: 1 });

            return session;
        };

        const open = atNine({ maxDocumentBytes: 100_000_000 });
        open.handle.execute('heading.set', { level: 2 });
        const exceeds = createLimitCheck(idModel, [{ id: 'core', version: 1 }]);
        let low = 1;
        let high = 100_000;
        while (low < high) {
            const middle = Math.floor((low + high) / 2);
            if (exceeds(open.view.state.doc, limitsOf({ maxDocumentBytes: middle }))) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }

        const tight = atNine({ maxDocumentBytes: low });

        expect(tight.handle.query('heading.set', { level: 2 }).enabled).toBe(true);
        expect(tight.handle.execute('heading.set', { level: 2 }).status).toBe('applied');
        expect(contentOf(tight.changes[0])).toMatchObject({ content: [{ attrs: { nodeId: 'node-9' } }] });
    });
});
