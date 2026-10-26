/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, Node, Slice } from 'prosemirror-model';
import { type EditorState, type Transaction } from 'prosemirror-state';
import { Step, StepResult } from 'prosemirror-transform';
import { describe, expect, it, vi } from 'vitest';

import { defineEditor } from '#/index';
import { compileContentModel, type JsonValue } from '#/model';
import { fixtureHeadingSet, fixtureMention, fixtureTable } from '#/plugins/__tests__/fixtures/features';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { link } from '#/plugins/Link/feature';
import { pressKey, setSelection, typeText } from '#/testing';

import { authoringOf } from '../policy';
import { type AuthoringPolicy } from '../types';

import {
    boldModel,
    stored,
    para,
    strong,
    words,
    start,
    undoSteps,
    ALLOW,
    forbid,
    mention,
    heading,
    textOf,
    installRuntimeHooks,
} from './fixtures/start';

installRuntimeHooks();

const policyModel = compileContentModel([core(), bold(), fixtureTable(), fixtureMention(), fixtureHeadingSet()], {
    id: 'test.bold',
    version: 1,
});
const table = (nodeId: string, ...paragraphs: readonly JsonValue[]) => ({
    type: 'table',
    attrs: { nodeId },
    content: paragraphs,
});
const boldBreak = { type: 'hard_break', marks: [{ type: 'bold' }] };
/** A step class the policy check does not know, which swaps in the document it was given. */
class SwapStep extends Step {
    constructor(private readonly next: Node) {
        super();
    }
    apply() {
        return StepResult.ok(this.next);
    }
    invert(doc: Node) {
        return new SwapStep(doc);
    }
    map() {
        return this;
    }
    toJSON() {
        return { stepType: 'swap' };
    }
}

describe('the authoring policy and limits', () => {
    it('rejects a paste over maxDocumentNodes and one of a forbidden node type, keeping the view state', () => {
        const overLimit = '<p>b</p><p>c</p><p>d</p>';
        const tableHtml = '<section data-pm-slice="0 0 []" data-table="t-2"><p>x</p></section>';
        const counted = start(stored(para(words('a'))), { model: policyModel, limits: { maxDocumentNodes: 6 } });
        const before = counted.view.state;
        counted.view.pasteHTML(overLimit);
        expect(counted.view.state).toBe(before);
        counted.view.pasteHTML('<p>b</p>');
        expect(counted.handle.getSummary().commitSequence).toBe(1);
        // The same pastes apply where no limit or policy stops them.
        const open = start(stored(para(words('a'))), { model: policyModel });
        open.view.pasteHTML(overLimit);
        open.view.pasteHTML(tableHtml);
        expect(open.changes.map(({ origin }) => origin)).toEqual(['paste', 'paste']);
        expect(open.view.state.doc.childCount).toBeGreaterThan(3);

        const forbidden = start(stored(para(words('a'))), {
            model: policyModel,
            policy: forbid('fixture.table', 'create'),
        });
        const kept = forbidden.view.state;
        forbidden.view.pasteHTML(tableHtml);
        expect(forbidden.view.state).toBe(kept);
        expect(forbidden.changes).toEqual([]);
        forbidden.view.pasteHTML('<p>x</p>');
        expect(forbidden.changes.map(({ origin }) => origin)).toEqual(['paste']);
    });

    it('measures only the changed path on each keystroke after the first', () => {
        const { handle } = start(stored(...Array.from({ length: 500 }, (_, index) => para(words(`block ${index}`)))));
        setSelection(handle, { text: 'block 499', from: 9, to: 9 });
        typeText(handle, 'a');
        const encode = vi.spyOn(TextEncoder.prototype, 'encode');

        typeText(handle, 'bcde');

        // Each keystroke measures the new document, paragraph and text node; the other 499 blocks stay cached.
        expect(encode.mock.calls.length).toBeLessThanOrEqual(4 * 3);
        encode.mockRestore();
    });

    it('rejects typing from the byte limit on, counting bytes with no toJSON call', () => {
        // Stands in for a large document: 1,500 blocks and about 100,000 characters.
        const blocks = Array.from({ length: 1500 }, (_, index) =>
            para(strong('b'.repeat(16)), words(`${index} `.padEnd(51, 'x'))),
        );
        const large = {
            ...stored(...blocks),
            requiredCapabilities: [
                { id: 'core', version: 1 },
                { id: 'marks.bold', version: 1 },
            ],
        };
        const size = new TextEncoder().encode(JSON.stringify(large)).byteLength;
        const { handle, view } = start(large, { limits: { maxDocumentBytes: size + 8 } });
        const last = '1499 '.padEnd(51, 'x');
        setSelection(handle, { text: last, from: last.length, to: last.length });
        const toJSON = vi.spyOn(Node.prototype, 'toJSON');

        const accepted: number[] = [];
        for (let index = 0; index < 100; index += 1) {
            const before = view.state;
            typeText(handle, 'y');
            if (view.state === before) {
                continue;
            }

            accepted.push(index);
        }

        expect(accepted).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
        expect(toJSON).not.toHaveBeenCalled();
        toJSON.mockRestore();
    });

    it('refuses typing and accepts a delete in a document within maxDocumentBytes that the count of every installed capability puts over it', () => {
        const input = stored(para(words('abc')));
        const { document } = start(input, { model: policyModel }).handle.getSnapshot();
        const size = new TextEncoder().encode(JSON.stringify(document)).byteLength;
        const { handle, view } = start(input, { model: policyModel, limits: { maxDocumentBytes: size + 1 } });
        setSelection(handle, { text: 'abc', from: 3, to: 3 });
        const loaded = view.state.doc;

        typeText(handle, 'y');
        const typed = view.state.doc;
        view.dispatch(view.state.tr.delete(3, 4));

        expect(document.requiredCapabilities).toEqual([{ id: 'core', version: 1 }]);
        expect(typed).toBe(loaded);
        expect(textOf(view.state.doc)).toBe('ab');
    });

    it('reads every step kind, empty step maps and an unknown step class included', () => {
        // Positions: `ab` 1-3 and a break 3-4; bold `cd` 6-8; `e` 10-11 and a bold break 11-12.
        const input = stored(
            para(words('ab'), { type: 'hard_break' }),
            para(strong('cd')),
            para(words('e'), boldBreak),
        );
        const cases: readonly (readonly [string, Partial<AuthoringPolicy>, (state: EditorState) => Transaction])[] = [
            ['AttrStep', forbid('core', 'edit'), (state) => state.tr.setNodeAttribute(0, 'lang', 'de')],
            ['DocAttrStep', forbid('core', 'edit'), (state) => state.tr.setDocAttribute('lang', 'de')],
            [
                'AddMarkStep',
                forbid('marks.bold', 'create'),
                (state) => state.tr.addMark(1, 3, state.schema.mark('bold')),
            ],
            [
                'AddNodeMarkStep',
                forbid('marks.bold', 'create'),
                (state) => state.tr.addNodeMark(3, state.schema.mark('bold')),
            ],
            [
                'RemoveMarkStep',
                forbid('marks.bold', 'remove'),
                (state) => state.tr.removeMark(6, 8, state.schema.mark('bold')),
            ],
            [
                'RemoveNodeMarkStep',
                forbid('marks.bold', 'remove'),
                (state) => state.tr.removeNodeMark(11, state.schema.mark('bold')),
            ],
            [
                'SwapStep',
                forbid('core', 'edit'),
                (state) => {
                    const first = state.doc.firstChild as Node;
                    const changed = first.type.create({ ...first.attrs, lang: 'de' }, first.content);
                    const next = state.doc.replace(0, first.nodeSize, new Slice(Fragment.from(changed), 0, 0));

                    return state.tr.step(new SwapStep(next));
                },
            ],
        ];
        for (const [name, policy, build] of cases) {
            const forbidden = start(input, { policy });
            const before = forbidden.view.state;
            forbidden.view.dispatch(build(before));
            expect({ name, kept: forbidden.view.state === before }).toEqual({ name, kept: true });

            const allowed = start(input);
            allowed.view.dispatch(build(allowed.view.state));
            expect({ name, changes: allowed.changes.length }).toEqual({ name, changes: 1 });
        }
    });

    it('keeps an existing table editable and movable under create: false and rejects pasting another', () => {
        const { handle, view, changes } = start(stored(table('t-1', para(words('a'))), para(words('b'))), {
            model: policyModel,
            policy: forbid('fixture.table', 'create'),
        });
        const moved = view.state.doc.firstChild as Node;
        const move = view.state.tr.delete(0, moved.nodeSize);
        view.dispatch(move.insert(move.doc.content.size, moved));
        setSelection(handle, { text: 'a', from: 1, to: 1 });
        typeText(handle, 'z');
        const before = view.state;
        view.pasteHTML('<section data-pm-slice="0 0 []" data-table="t-2"><p>c</p></section>');

        expect(changes.map(({ origin }) => origin)).toEqual(['unknown', 'input']);
        expect(view.state).toBe(before);
        expect(view.state.doc.lastChild?.type.name).toBe('table');
        expect(view.state.doc.lastChild?.textContent).toBe('az');

        const open = start(stored(table('t-1', para(words('a'))), para(words('b'))), { model: policyModel });
        setSelection(open.handle, { text: 'b', from: 1, to: 1 });
        open.view.pasteHTML('<section data-pm-slice="0 0 []" data-table="t-2"><p>c</p></section>');
        const tables: string[] = [];
        open.view.state.doc.descendants((node) => {
            if (node.type.name === 'table') {
                tables.push(node.attrs.nodeId as string);
            }

            return node.isBlock;
        });
        expect(tables).toEqual(['t-1', 't-2']);
    });

    it('lets bold be removed from part of a run and typed inside under create: false, but not added', () => {
        const created = (setup: (session: ReturnType<typeof start>) => void, policy: Partial<AuthoringPolicy>) => {
            const session = start(stored(para(words('ab '), strong('one two three'))), { policy });
            setup(session);

            return session.changes.length;
        };

        const unboldMiddle = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'two' });
            pressKey(handle, 'Mod-b');
        };

        const typeInside = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'two', from: 1, to: 1 });
            typeText(handle, 'x');
        };

        const boldNew = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'ab' });
            pressKey(handle, 'Mod-b');
        };

        const boldNextToRun = ({ handle }: ReturnType<typeof start>) => {
            setSelection(handle, { text: 'b ' });
            pressKey(handle, 'Mod-b');
        };

        const noCreate = forbid('marks.bold', 'create');

        // Bolding text next to a run extends that run, which is an edit of it.
        expect([unboldMiddle, typeInside, boldNew, boldNextToRun].map((change) => created(change, noCreate))).toEqual([
            1, 1, 0, 1,
        ]);
        expect(created(typeInside, forbid('marks.bold', 'edit'))).toBe(0);
    });

    it('rejects changes to the attributes or content of an existing occurrence per feature', () => {
        const typeInto = (text: string) => (session: ReturnType<typeof start>) => {
            setSelection(session.handle, { text, from: 1, to: 1 });
            typeText(session.handle, 'x');
        };

        const cases: readonly (readonly [string, JsonValue, (session: ReturnType<typeof start>) => void])[] = [
            ['core', para(words('ab')), typeInto('ab')],
            ['marks.bold', para(strong('ab')), typeInto('ab')],
            ['fixture.table', table('t-1', para(words('ab'))), typeInto('ab')],
            [
                'fixture.mention',
                para(words('a'), mention('m-1')),
                ({ view }) => view.dispatch(view.state.tr.setNodeAttribute(2, 'label', 'Ada')),
            ],
            [
                'fixture.heading-set',
                heading(2, words('ab')),
                (session) => {
                    setSelection(session.handle, { text: 'ab', from: 1, to: 1 });
                    session.handle.execute('heading.set', { level: 3 });
                },
            ],
        ];
        for (const [featureId, block, change] of cases) {
            const session = start(stored(block), { model: policyModel, policy: forbid(featureId, 'edit') });
            change(session);
            expect({ featureId, changes: session.changes }).toEqual({ featureId, changes: [] });
            // The same change applies under a policy that allows everything.
            const open = start(stored(block), { model: policyModel });
            change(open);
            expect({ featureId, applied: open.changes.length }).toEqual({ featureId, applied: 1 });
        }
    });

    it('rejects deleting a mention by Backspace, by range delete and by cut under remove: false', () => {
        const input = stored(para(words('a'), mention('m-1'), words('b')));
        const backspace = (session: ReturnType<typeof start>) => {
            session.runtime.select({ anchor: 3, head: 3 });
            const key = new KeyboardEvent('keydown', { key: 'Backspace', keyCode: 8, bubbles: true, cancelable: true });
            session.view.dom.dispatchEvent(key);
        };

        const ways: readonly (readonly [string, (session: ReturnType<typeof start>) => void])[] = [
            ['Backspace', backspace],
            ['range delete', ({ view }) => view.dispatch(view.state.tr.delete(1, 4))],
            [
                'cut',
                ({ runtime, view }) => {
                    runtime.select({ anchor: 1, head: 4 });
                    const cut = new ClipboardEvent('cut', {
                        clipboardData: new DataTransfer(),
                        bubbles: true,
                        cancelable: true,
                    });
                    view.dom.dispatchEvent(cut);
                },
            ],
        ];
        for (const [name, remove] of ways) {
            const kept = start(input, { model: policyModel, policy: forbid('fixture.mention', 'remove') });
            remove(kept);
            expect({ name, text: textOf(kept.view.state.doc) }).toEqual({ name, text: 'a@b' });

            const removed = start(input, { model: policyModel });
            remove(removed);
            expect({ name, removed: !textOf(removed.view.state.doc).includes('@') }).toEqual({ name, removed: true });
        }
    });

    it('applies a new policy to the next query and commit with the same view, schema and plugins', () => {
        const { handle, runtime, view, changes } = start(stored(para(words('ab'))));
        typeText(handle, 'x');
        const { schema, plugins } = view.state;
        setSelection(handle, { text: 'xab' });
        expect(handle.query('mark.bold.toggle').enabled).toBe(true);

        handle.updatePolicy({ ...authoringOf(boldModel), features: forbid('marks.bold', 'create').features ?? {} });
        expect(handle.query('mark.bold.toggle')).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
        pressKey(handle, 'Mod-b');

        expect(changes).toHaveLength(1);
        expect(runtime.view).toBe(view);
        expect(view.isDestroyed).toBe(false);
        expect(runtime.view?.state.schema).toBe(schema);
        expect(view.state.plugins).toBe(plugins);
        expect(undoSteps(handle)).toBe(1);
    });

    it('notifies a command state selector of a new policy before updatePolicy returns, with no commit', () => {
        const { handle, runtime } = start(stored(para(words('ab'))), { model: policyModel });
        let returned = false;
        const seen: (readonly [boolean, boolean])[] = [];
        runtime.watch(
            () => handle.query('heading.set', { level: 2 }).enabled,
            Object.is,
            (enabled) => seen.push([enabled, returned]),
        );
        const sequence = handle.getSummary().commitSequence;

        handle.updatePolicy({
            ...authoringOf(policyModel),
            features: forbid('fixture.heading-set', 'create').features ?? {},
        });
        returned = true;

        expect(seen).toEqual([[false, false]]);
        expect(handle.getSummary().commitSequence).toBe(sequence);
    });

    it('rejects an unknown policy feature and unsafe policy values in defineEditor and updatePolicy', () => {
        const unknown = { features: { 'acme.missing': ALLOW } };
        const unsafe = { features: { core: { ...ALLOW, create: () => true } } } as unknown as Partial<AuthoringPolicy>;
        const { handle } = start(stored(para()));
        const codeOf = (call: () => unknown) => {
            try {
                call();
            } catch (error) {
                return error;
            }

            return undefined;
        };

        expect(
            codeOf(() => defineEditor({ id: 'x', model: boldModel, policy: unknown, plugins: unitsOf(boldModel) })),
        ).toMatchObject({
            code: 'definition.unknown-policy-feature',
        });
        expect(
            codeOf(() => handle.updatePolicy({ ...authoringOf(boldModel), features: unknown.features })),
        ).toMatchObject({
            code: 'definition.unknown-policy-feature',
            details: { feature: 'acme.missing' },
        });
        expect(
            codeOf(() => handle.updatePolicy({ ...authoringOf(boldModel), features: unsafe.features ?? {} })),
        ).toMatchObject({
            code: 'definition.invalid-option',
            details: { path: '/policy/features/core/create' },
        });
    });
});

describe('occurrences the policy pairs across a batch', () => {
    const model = compileContentModel([core(), bold(), link(), fixtureMention()], {
        id: 'test.bold',
        version: 1,
    });
    const linkMark = (href: string) => ({ type: 'link', attrs: { href, openInNewWindow: false, styleId: null } });
    const linked = { type: 'text', text: 'go', marks: [linkMark('https://frontify.com/a')] };
    const atoms = stored(para(words('a'), mention('m-1'), words('b')));
    const cases: readonly (readonly [
        string,
        JsonValue,
        Partial<AuthoringPolicy>,
        (state: EditorState) => Transaction,
        boolean,
    ])[] = [
        [
            'merge',
            stored(para(strong('a')), para(strong('b'))),
            forbid('marks.bold', 'create'),
            (state) => state.tr.join(3),
            true,
        ],
        [
            'gap delete',
            stored(para(strong('a'), words(' x '), strong('b'))),
            forbid('marks.bold', 'create'),
            (state) => state.tr.delete(2, 5),
            true,
        ],
        ['split', stored(para(strong('ab'))), forbid('marks.bold', 'remove'), (state) => state.tr.split(2), true],
        [
            'move',
            stored(para(words('a')), para(strong('b'))),
            { features: { 'marks.bold': { ...ALLOW, create: false, remove: false } } },
            (state) => {
                const moved = state.doc.child(1);

                return state.tr.delete(3, 6).insert(0, moved);
            },
            true,
        ],
        [
            'link href',
            stored(para(linked)),
            { features: { links: { ...ALLOW, create: false, remove: false } } },
            (state) => state.tr.addMark(1, 3, state.schema.mark('link', linkMark('https://frontify.com/b').attrs)),
            true,
        ],
        [
            'link href, edit: false',
            stored(para(linked)),
            forbid('links', 'edit'),
            (state) => state.tr.addMark(1, 3, state.schema.mark('link', linkMark('https://frontify.com/b').attrs)),
            false,
        ],
        [
            'mention replaced',
            atoms,
            { features: { 'fixture.mention': { ...ALLOW, create: false, remove: false } } },
            (state) => state.tr.replaceWith(2, 3, state.schema.node('mention', { nodeId: 'm-2' })),
            false,
        ],
        [
            'mention replaced, edit: false',
            atoms,
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.replaceWith(2, 3, state.schema.node('mention', { nodeId: 'm-2' })),
            true,
        ],
        [
            'bold over a mention',
            atoms,
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.addMark(1, 4, state.schema.mark('bold')),
            true,
        ],
        [
            'text with another link inserted at the end of a link',
            stored(para(linked)),
            forbid('links', 'create'),
            (state) =>
                state.tr.insert(
                    3,
                    state.schema.text('zz', [state.schema.mark('link', linkMark('https://frontify.com/b').attrs)]),
                ),
            false,
        ],
        [
            'a pasted copy of a mention before the untouched one',
            stored(para(words('a'), { type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words('b'))),
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.insert(1, state.schema.node('mention', { nodeId: 'm-1', label: '' })),
            true,
        ],
        [
            'a pasted copy of a mention after the untouched one',
            stored(para(words('a'), { type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words('b'))),
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.insert(3, state.schema.node('mention', { nodeId: 'm-1', label: '' })),
            true,
        ],
        [
            'a label edit of a mention with a pasted copy of its old self, edit: false',
            stored(para(words('a'), { type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words('b'))),
            forbid('fixture.mention', 'edit'),
            (state) => state.tr.setNodeAttribute(2, 'label', 'Bo').insert(3, state.doc.nodeAt(2) as Node),
            false,
        ],
        ...(['remove', 'edit'] as const).map(
            (
                action,
            ): readonly [string, JsonValue, Partial<AuthoringPolicy>, (state: EditorState) => Transaction, boolean] => [
                `a label edit of one of two equal mentions, ${action}: false`,
                stored(
                    para({ type: 'mention', attrs: { nodeId: 'm-1', label: 'Ada' } }, words(' '), {
                        type: 'mention',
                        attrs: { nodeId: 'm-2', label: 'Ada' },
                    }),
                ),
                forbid('fixture.mention', action),
                (state) => state.tr.setNodeMarkup(1, undefined, { ...state.doc.nodeAt(1)?.attrs, label: 'Bo' }),
                action === 'remove',
            ],
        ),
    ];
    for (const [name, input, policy, build, accepted] of cases) {
        const verdict = accepted ? 'accepts' : 'rejects';
        it(`${verdict} ${name}`, () => {
            const { view, changes } = start(input, { model, policy });
            view.dispatch(build(view.state));
            expect(changes.length === 1).toBe(accepted);
            const ids: unknown[] = [];
            view.state.doc.descendants((node) => {
                if ('nodeId' in node.attrs) {
                    ids.push(node.attrs.nodeId);
                }
            });
            expect(ids.every((id) => typeof id === 'string')).toBe(true);
            expect(new Set(ids).size).toBe(ids.length);
        });
    }
});
