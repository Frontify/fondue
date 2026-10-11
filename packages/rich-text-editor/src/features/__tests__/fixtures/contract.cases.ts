/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState, Selection, TextSelection, type Transaction } from 'prosemirror-state';
import { expect, type it as runnerIt, vi } from 'vitest';

import { compileDefinition } from '#/definition';
import { featureFixtures } from '#/features/conformance/fixtures';
import { compileContentModel, createEmptyDocument, type Feature } from '#/model';
import { compiledModel } from '#/model/compile';
import { decodeToTree } from '#/model/decode';
import { findInvalidPayload } from '#/model/values';
import { CAPABILITIES } from '#/runtime/capabilities';

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

/**
 * Registers one case per command of `features`, which runs it over every fixture of those features, selected
 * whole and at a caret, while the network and timers fail: the command returns a boolean, never a promise, and
 * dispatches at most one transaction before it returns.
 */
export const commandCases = (features: readonly Feature[]): void => {
    // The runner's global `it`, as the contract suite takes it, so a stand-in runner collects these cases too.
    const { it } = globalThis as unknown as { readonly it: typeof runnerIt };
    const model = compileContentModel(features, { id: 'feature-contract', version: 1 });
    for (const { id } of compiledModel(model).commands) {
        it(`runs ${id} synchronously with no I/O or timer, dispatching at most once`, () => {
            const engine = compileDefinition(model, CAPABILITIES);
            const command = engine.commands.get(id);
            if (command === undefined) {
                throw new Error(`${id} has no capability implementation.`);
            }
            const payload = PAYLOADS[id];
            expect(findInvalidPayload(command.payload, payload)).toBe(undefined);
            const documents = features.flatMap((feature) => Object.values(featureFixtures[feature.id] ?? {}));
            const states = [createEmptyDocument(model), ...documents].flatMap((document) => {
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
            const failing = (name: string) =>
                vi.fn(() => {
                    throw new Error(`${id} called ${name}.`);
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
