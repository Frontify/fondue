/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { EditorState } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { compileContentModel, defaultLimits } from '#/model';
import { bold } from '#/plugins/Bold/feature';
import { core } from '#/plugins/Core/feature';
import { heading } from '#/plugins/Heading/feature';
import { compileDefinition } from '#/runtime/definition';

import { authoringOf, createPolicyCheck } from '../../guards/policy';
import { createPolicy } from '../../session/state/policy';

const model = compileContentModel([core(), bold()], { id: 'test.policy', version: 1 });
const { schema } = compileDefinition(model);
const docOf = (text: string) => schema.node('doc', null, [schema.node('paragraph', null, [schema.text(text)])]);
const make = (initial = authoringOf(model), limits = defaultLimits, onUpdate: (next: unknown) => void = () => {}) =>
    createPolicy({ model, limits, initial, capabilities: [], onUpdate });
const bolding = () => {
    const state = EditorState.create({ doc: docOf('abc') });

    return state.tr.addMark(1, 3, schema.marks.bold!.create());
};

describe('createPolicy', () => {
    it('reads the initial policy at revision zero', () => {
        const initial = authoringOf(model);
        const policy = make(initial);
        expect(policy.current()).toBe(initial);
        expect(policy.revision()).toBe(0);
    });

    it('replaces the policy on update, counts a revision, then tells onUpdate with the new policy', () => {
        const calls: string[] = [];
        const policy = make(authoringOf(model), defaultLimits, (next) => {
            calls.push(`${policy.revision()}:${(next as { enterBehavior: string }).enterBehavior}`);
        });
        policy.update({ ...authoringOf(model), enterBehavior: 'none' });
        expect(policy.current().enterBehavior).toBe('none');
        expect(policy.revision()).toBe(1);
        expect(calls).toEqual(['1:none']);
    });

    it('throws on a policy for an uninstalled feature and keeps the old one without a revision', () => {
        const onUpdate = vi.fn();
        const policy = make(authoringOf(model), defaultLimits, onUpdate);
        const before = policy.current();
        const bad = {
            ...before,
            features: { ...before.features, unknown: { create: true, edit: true, remove: true, paste: true } },
        };
        expect(() => policy.update(bad)).toThrow();
        expect(policy.current()).toBe(before);
        expect(policy.revision()).toBe(0);
        expect(onUpdate).not.toHaveBeenCalled();
    });

    it('breaks a change that the policy forbids, as the final check and the write refusal report it', () => {
        const policy = make();
        const base = policy.current();
        const transaction = bolding();
        const check = () => policy.finalCheck(transaction.before, transaction.doc, transaction.mapping);
        expect(check()).toEqual({ policy: false, limit: undefined });
        expect(policy.writeRefusal(transaction.before, transaction)).toBeUndefined();
        policy.update({
            ...base,
            features: { ...base.features, 'marks.bold': { create: false, edit: true, remove: true, paste: true } },
        });
        expect(policy.breaks(transaction.before, transaction.doc, transaction.mapping)).toBe(true);
        expect(check()).toEqual({ policy: true, limit: undefined });
        expect(policy.writeRefusal(transaction.before, transaction)).toBe('policy');
    });

    it('reports the limit a document exceeds over the one it came from, and refuses the write as a limit', () => {
        const policy = make(authoringOf(model), { ...defaultLimits, maxTextLength: 3 });
        const state = EditorState.create({ doc: docOf('abc') });
        const transaction = state.tr.insertText('d', 4);
        expect(policy.exceeds(state.doc, state.doc)).toBeUndefined();
        expect(policy.exceeds(transaction.doc, state.doc)).toBe('maxTextLength');
        expect(policy.finalCheck(state.doc, transaction.doc, transaction.mapping).limit).toBe('maxTextLength');
        expect(policy.writeRefusal(state.doc, transaction)).toBe('limit');
    });

    it('measures against the capabilities it is given last', () => {
        const policy = make(authoringOf(model), { ...defaultLimits, maxDocumentBytes: 400 });
        const doc = docOf('abc');
        const before = policy.exceeds(doc, docOf('ab'));
        policy.setCapabilities(Array.from({ length: 40 }, (_, index) => ({ id: `acme.feature-${index}`, version: 1 })));
        expect(before).toBeUndefined();
        expect(policy.exceeds(doc, docOf('ab'))).toBe('maxDocumentBytes');
    });

    it('refuses a command whose policy or state refusal says so, and nothing else', () => {
        const policy = make();
        const state = EditorState.create({ doc: docOf('abc') });
        const refuses = (value: boolean) => ({ refuses: () => value }) as never;
        expect(policy.refusal({} as never, state, undefined)).toBeUndefined();
        expect(policy.refusal({ policyRefuses: () => true } as never, state, undefined)).toBe('not-allowed');
        expect(policy.refusal(refuses(true), state, undefined)).toBe('not-allowed');
        expect(policy.refusal(refuses(false), state, undefined)).toBeUndefined();
    });

    it('refuses a heading whose level is missing or not a number', () => {
        const headingModel = compileContentModel([core(), heading()], { id: 'test.heading', version: 1 });
        const { schema: headingSchema } = compileDefinition(headingModel);
        const text = headingSchema.text('Hi');
        const before = headingSchema.node('doc', null, [headingSchema.node('paragraph', null, [text])]);
        const refused = (level: unknown) => {
            const after = headingSchema.node('doc', null, [headingSchema.node('heading', { level }, [text])]);
            const state = EditorState.create({ doc: before });
            const transaction = state.tr.replaceWith(0, before.content.size, after.content);

            return createPolicyCheck(headingModel)(
                authoringOf(headingModel),
                transaction.before,
                transaction.doc,
                transaction.mapping,
            );
        };

        expect(refused(null)).toBe(true);
        expect(refused('nope')).toBe(true);
    });
});
