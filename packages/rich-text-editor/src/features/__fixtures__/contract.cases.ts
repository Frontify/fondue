/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node } from 'prosemirror-model';
import { EditorState, Selection, TextSelection, Transaction } from 'prosemirror-state';
import { expect, type it as runnerIt, vi } from 'vitest';

import { compileDefinition, type Normalizer, NORMALIZERS } from '#/definition';
import { featureFixtures } from '#/features/conformance/fixtures';
import { compileContentModel, createEmptyDocument, type Feature, type RichTextDocument } from '#/model';
import { compiledModel } from '#/model/compile';
import { decodeToTree } from '#/model/decode';
import { findInvalidPayload } from '#/model/values';
import { CAPABILITIES } from '#/runtime/capabilities';
import { createTestEnvironment } from '#/testing';

/** A valid payload for each shipped command that declares one, so the case runs it for real. */
const PAYLOADS: Readonly<Record<string, unknown>> = { 'text.insert': { text: 'a' } };
// The globals through which a capability would reach the network or schedule work.
const FORBIDDEN = [
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'setTimeout',
    'setInterval',
    'setImmediate',
    'queueMicrotask',
    'requestAnimationFrame',
    'requestIdleCallback',
    'MessageChannel',
];

/** Replaces each forbidden global with a spy that throws, until `vi.unstubAllGlobals`, and returns the spies. */
const stubForbidden = (label: string) => {
    const failing = (name: string) =>
        vi.fn(() => {
            throw new Error(`${label} called ${name}.`);
        });
    // Only what the test environment has; a global it lacks cannot be reached anyway.
    const stubs = FORBIDDEN.filter((name) => name in globalThis).map((name) => {
        const stub = failing(name);
        vi.stubGlobal(name, stub);
        return stub;
    });
    const { navigator: current } = globalThis;
    if (current !== undefined) {
        const sendBeacon = failing('navigator.sendBeacon');
        vi.stubGlobal('navigator', Object.create(current, { sendBeacon: { value: sendBeacon } }));
        stubs.push(sendBeacon);
    }
    return stubs;
};

const fixturesOf = (features: readonly Feature[]) =>
    features.flatMap((feature) => Object.values(featureFixtures[feature.id] ?? {}));

/**
 * Registers one case per command of `features`, which runs it over every fixture of those features, selected
 * whole and at a caret, while the network and timers fail: the command returns a boolean, never a promise, and
 * dispatches at most one transaction before it returns (SPEC-rich-text-runtime/AC-038).
 */
export const commandCases = (features: readonly Feature[]): void => {
    // The runner's global `it`, as the contract suite takes it, so a stand-in runner collects these cases too.
    const { it } = globalThis as unknown as { readonly it: typeof runnerIt };
    const model = compileContentModel(features, { id: 'feature-contract', version: 1 });
    for (const { id } of compiledModel(model).commands) {
        it(`SPEC-rich-text-runtime/AC-038 runs ${id} synchronously with no I/O or timer, dispatching at most once`, () => {
            const engine = compileDefinition(model, CAPABILITIES);
            const command = engine.commands.get(id);
            if (command === undefined) {
                throw new Error(`${id} has no capability implementation.`);
            }
            const payload = PAYLOADS[id];
            expect(findInvalidPayload(command.payload, payload)).toBe(undefined);
            const states = [createEmptyDocument(model), ...fixturesOf(features)].flatMap((document) => {
                const { tree } = decodeToTree({ ...document, model: model.ref }, model);
                if (tree === undefined) {
                    throw new Error('A fixture of the features does not decode.');
                }
                const state = EditorState.create({ doc: engine.schema.nodeFromJSON(tree) });
                const { doc } = state;
                const whole = TextSelection.between(doc.resolve(0), doc.resolve(doc.content.size));
                return [
                    state.apply(state.tr.setSelection(whole)),
                    state.apply(state.tr.setSelection(Selection.atEnd(doc))),
                ];
            });
            const stubs = stubForbidden(id);
            let changed = false;
            try {
                for (const state of states) {
                    const dispatched: Transaction[] = [];
                    const result: unknown = command.run(state, (transaction) => dispatched.push(transaction), payload);
                    expect(typeof result).toBe('boolean');
                    // A command that applies dispatches exactly one transaction before it returns, and one that does not, none.
                    let expected = 0;
                    if (result === true) {
                        expected = 1;
                    }
                    expect(dispatched.length).toBe(expected);
                    changed ||= dispatched.some((transaction) => transaction.doc !== state.doc);
                }
            } finally {
                vi.unstubAllGlobals();
            }
            expect(stubs.filter((stub) => stub.mock.calls.length > 0)).toEqual([]);
            // At least one fixture state gives the command a document change to make.
            expect(changed).toBe(true);
        });
    }
};

/** A node with every attribute that has an engine default set to it, so a `nodeId` is missing, as engine-made nodes start. */
const withDefaults = (node: Node): Node => {
    if (node.isText) {
        return node;
    }
    const attrs: Record<string, unknown> = { ...node.attrs };
    for (const [name, spec] of Object.entries(node.type.spec.attrs ?? {})) {
        if ('default' in spec) {
            attrs[name] = spec.default;
        }
    }
    return node.type.create(attrs, Fragment.fromArray(node.children.map(withDefaults)), node.marks);
};

const stepsOf = (transaction: Transaction | null) => {
    if (transaction === null) {
        return null;
    }
    return transaction.steps.map((step): unknown => step.toJSON());
};

/**
 * Registers two cases per normalizer that `features` install, over valid states generated from their fixtures, or
 * from `documents`: each document, its blocks twice over, and its nodes with every defaulted attribute at its
 * default. A normalizer returns the same steps for equal states and nothing on its own output (SPEC-rich-text/AC-057),
 * and runs synchronously with no I/O or timer (SPEC-rich-text/AC-059).
 */
export const normalizerCases = (features: readonly Feature[], documents?: readonly RichTextDocument[]): void => {
    const { it } = globalThis as unknown as { readonly it: typeof runnerIt };
    const model = compileContentModel(features, { id: 'feature-contract', version: 1 });
    const given = documents ?? fixturesOf(features);
    const statesOf = () => {
        const { schema } = compileDefinition(model);
        return given.flatMap((document) => {
            const { tree } = decodeToTree({ ...document, model: model.ref }, model);
            if (tree === undefined) {
                throw new Error('A fixture of the features does not decode.');
            }
            const doc = schema.nodeFromJSON(tree);
            const variants = [doc, doc.copy(doc.content.append(doc.content)), withDefaults(doc)];
            return variants.filter((variant) => {
                try {
                    variant.check();
                    return true;
                } catch {
                    return false;
                }
            });
        });
    };
    // Read at run time, so a case runs the normalizer that is registered then.
    const normalizerOf = (id: string) => NORMALIZERS[id] as Normalizer;
    for (const { id } of compiledModel(model).plugins) {
        if (NORMALIZERS[id] === undefined) {
            continue;
        }
        it(`SPEC-rich-text/AC-057 runs the ${id} normalizer to equal steps on equal states and to nothing on its output`, () => {
            const normalize = normalizerOf(id);
            let repaired = false;
            for (const doc of statesOf()) {
                const ids = createTestEnvironment({ seed: 1 }).ids;
                const equal = doc.type.schema.nodeFromJSON(doc.toJSON());
                // The clock moves between the two runs, so a normalizer that reads it gives equal states other steps.
                vi.useFakeTimers({ toFake: ['Date', 'performance'] });
                let first: Transaction | null;
                let second: Transaction | null;
                try {
                    first = normalize(EditorState.create({ doc }), ids);
                    vi.advanceTimersByTime(1000);
                    second = normalize(EditorState.create({ doc: equal }), createTestEnvironment({ seed: 1 }).ids);
                } finally {
                    vi.useRealTimers();
                }
                expect(stepsOf(second)).toEqual(stepsOf(first));
                if (first !== null) {
                    repaired = true;
                    expect(stepsOf(normalize(EditorState.create({ doc: first.doc }), ids))).toBe(null);
                }
            }
            // At least one generated state gives the normalizer something to repair.
            expect(repaired).toBe(true);
        });
        it(`SPEC-rich-text/AC-059 runs the ${id} normalizer synchronously with no I/O or timer`, () => {
            const normalize = normalizerOf(id);
            const states = statesOf().map((doc) => EditorState.create({ doc }));
            const ids = createTestEnvironment({ seed: 1 }).ids;
            const stubs = stubForbidden(`The ${id} normalizer`);
            // A normalizer schedules no promise work either, which the command case allows for an upload hand-off.
            const then = vi.spyOn(Promise.prototype, 'then').mockImplementation(() => {
                throw new Error(`The ${id} normalizer called Promise.prototype.then.`);
            });
            let scheduled = 0;
            try {
                for (const state of states) {
                    const result: unknown = normalize(state, ids);
                    expect(result === null || result instanceof Transaction).toBe(true);
                }
            } finally {
                scheduled = then.mock.calls.length;
                then.mockRestore();
                vi.unstubAllGlobals();
            }
            expect(stubs.filter((stub) => stub.mock.calls.length > 0)).toEqual([]);
            expect(scheduled).toBe(0);
        });
    }
};
