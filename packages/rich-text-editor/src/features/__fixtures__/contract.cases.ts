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
const FORBIDDEN = ['fetch', 'XMLHttpRequest', 'setTimeout', 'setInterval', 'queueMicrotask', 'requestAnimationFrame'];

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
            const stubs = FORBIDDEN.map((name) => {
                const stub = vi.fn(() => {
                    throw new Error(`${id} called ${name}.`);
                });
                vi.stubGlobal(name, stub);
                return stub;
            });
            try {
                for (const state of states) {
                    const dispatched: Transaction[] = [];
                    const result: unknown = command.run(state, (transaction) => dispatched.push(transaction), payload);
                    expect(typeof result).toBe('boolean');
                    expect(dispatched.length).toBeLessThanOrEqual(1);
                }
            } finally {
                vi.unstubAllGlobals();
            }
            expect(stubs.filter((stub) => stub.mock.calls.length > 0)).toEqual([]);
        });
    }
};
