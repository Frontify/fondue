/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { createHandle } from '../../session/handle';
import { createStore } from '../../session/store';

const schema = new Schema({
    nodes: { doc: { content: 'paragraph+' }, paragraph: { content: 'text*', group: 'block' }, text: {} },
});

const setup = () => {
    const interactionRoots = new Set<HTMLElement>();
    const session = { documentId: 'd', sessionId: 's', generation: 0 };
    const captureRange = vi.fn(() => ({ status: 'rejected' }) as never);
    const update = vi.fn();
    const handle = createHandle({
        identity: { session: () => session, commitSequence: () => 3, sequence: () => 2 },
        lifecycle: { phase: () => 'ready' },
        mode: { mode: () => 'editable', set: vi.fn() },
        composition: { active: () => false },
        store: createStore(EditorState.create({ schema })),
        shown: { snapshot: vi.fn() },
        saving: { status: vi.fn(), request: vi.fn() },
        faults: { candidate: vi.fn() },
        commands: { query: vi.fn(), execute: vi.fn() },
        queue: { enqueue: vi.fn() },
        targets: { captureRange, releaseTarget: vi.fn() },
        replace: { replaceDocument: vi.fn() },
        policy: { update },
        focus: { focus: vi.fn() },
        interactionRoots,
        subscribe: vi.fn(),
        dispose: vi.fn(),
    });
    return { handle, interactionRoots, captureRange, update, session };
};

describe('createHandle', () => {
    it('summarizes the session from the services that own each part', () => {
        const { handle, session } = setup();
        expect(handle.getSummary()).toMatchObject({
            session,
            phase: 'ready',
            mode: 'editable',
            commitSequence: 3,
            sequence: 2,
            compositionActive: false,
        });
    });

    it('captures the selection with no range, and passes a policy update on as one argument', () => {
        const { handle, captureRange, update } = setup();
        handle.captureTarget({ purpose: 'insert', onIntersectingEdit: 'map' });
        expect(captureRange).toHaveBeenCalledWith({ purpose: 'insert', onIntersectingEdit: 'map' }, undefined);
        const policy = {} as never;
        handle.updatePolicy(policy);
        expect(update).toHaveBeenCalledWith(policy);
    });

    it('adds an interaction root until its unsubscribe runs', () => {
        const { handle, interactionRoots } = setup();
        const element = document.createElement('div');
        const unsubscribe = handle.registerInteractionRoot(element);
        expect(interactionRoots.has(element)).toBe(true);
        unsubscribe();
        expect(interactionRoots.has(element)).toBe(false);
    });
});
