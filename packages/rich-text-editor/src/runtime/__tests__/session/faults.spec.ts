/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';
import { describe, expect, it, vi } from 'vitest';

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/internal';

import { createFaults } from '../../session/lifecycle/faults';
import { createLifecycle } from '../../session/state/lifecycle';
import { type RecoveryService } from '../../types';

const schema = new Schema({
    nodes: {
        doc: { content: 'paragraph+' },
        paragraph: { content: 'text*', group: 'block' },
        text: {},
    },
});

const found = diagnostic('runtime.view-fault', undefined, undefined, 'error');

const setup = (service?: RecoveryService) => {
    const calls: string[] = [];
    const reported: Diagnostic[] = [];
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const session = { documentId: 'd', sessionId: 's', generation: 0 };
    const faults = createFaults({
        lifecycle,
        identity: { session: () => session, sequence: () => 4 },
        encode: () => ({ type: 'doc' }) as never,
        saving: { status: () => ({ revision: 'r1' }) as never },
        composition: {
            reset: () => calls.push('reset'),
        },
        shown: {
            takeProvisional: () => {
                calls.push('take');

                return undefined;
            },
        },
        view: { refresh: () => calls.push('refresh'), cancelReady: () => calls.push('cancelReady') },
        queue: () => ({ settle: (code) => calls.push(`queue:${code}`) }),
        targets: () => ({
            coordinator: {
                settle: () => calls.push('coordinator.settle'),
                abortWhere: (matches: () => boolean) => calls.push(`abort:${String(matches())}`),
            } as never,
        }),
        report: (diagnostic) => {
            calls.push('report');
            reported.push(diagnostic);
        },
        notify: () => calls.push('notify'),
        recovery: () => service,
    });
    const attached = { dom: document.createElement('div') } as unknown as EditorView;
    const candidate = EditorState.create({ schema });

    return { faults, calls, reported, lifecycle, attached, candidate };
};

describe('createFaults', () => {
    it('cancels composition before the phase, then the ready frame, provisional, view, queue, report and async results', () => {
        const { faults, calls, lifecycle, reported } = setup();
        faults.fault(found);
        expect(lifecycle.phase()).toBe('faulted');
        expect(calls).toEqual([
            'reset',
            'cancelReady',
            'take',
            'refresh',
            'queue:not-ready',
            'report',
            'coordinator.settle',
            'abort:true',
            'notify',
        ]);
        expect(reported).toEqual([found]);
    });

    it('does nothing for a fault after dispose', () => {
        const { faults, calls, lifecycle } = setup();
        lifecycle.to('disposed');
        faults.fault(found);
        expect(calls).toEqual([]);
        expect(lifecycle.phase()).toBe('disposed');
    });

    it('stops the view, keeps the candidate and stores a recovery checkpoint', async () => {
        const store = vi.fn(() => Promise.resolve({ receiptId: 'rc' }));
        const { faults, attached, candidate, reported, lifecycle } = setup({ store } as unknown as RecoveryService);
        expect(faults.hasRecovery()).toBe(false);
        expect(faults.candidate()).toBeNull();
        faults.viewFault(attached, candidate);
        expect(attached.dom.getAttribute('contenteditable')).toBe('false');
        expect(faults.hasRecovery()).toBe(true);
        expect(faults.candidate()).toEqual({ type: 'doc' });
        expect(store).toHaveBeenCalledWith(
            {
                stamp: { documentId: 'd', sessionId: 's', generation: 0, sequence: 5 },
                acknowledgedRevision: 'r1',
                document: { type: 'doc' },
            },
            { signal: lifecycle.ended, session: { documentId: 'd', sessionId: 's', generation: 0 } },
        );
        await Promise.resolve();
        await Promise.resolve();
        expect(reported.map((diagnostic) => diagnostic.code)).toEqual([
            'runtime.view-fault',
            'runtime.recovery-stored',
        ]);
    });

    it('offers the candidate only while faulted', () => {
        const { faults, attached, candidate, lifecycle } = setup();
        faults.viewFault(attached, candidate);
        expect(faults.candidate()).not.toBeNull();
        lifecycle.to('disposed');
        expect(faults.candidate()).toBeNull();
    });

    it('stores no recovery while the next document of a replacement installs', () => {
        const store = vi.fn(() => Promise.resolve({ receiptId: 'rc' }));
        const { faults, attached, candidate } = setup({ store } as unknown as RecoveryService);
        const result = faults.withoutRecovery(() => {
            faults.viewFault(attached, candidate);

            return 7;
        });
        expect(result).toBe(7);
        expect(store).not.toHaveBeenCalled();
        expect(faults.hasRecovery()).toBe(true);
    });

    it('survives a store that throws or rejects', async () => {
        const { faults, attached, candidate } = setup({
            store: () => {
                throw new Error('x');
            },
        } as unknown as RecoveryService);
        expect(() => faults.viewFault(attached, candidate)).not.toThrow();
        const rejecting = setup({ store: () => Promise.reject(new Error('x')) } as unknown as RecoveryService);
        rejecting.faults.viewFault(rejecting.attached, rejecting.candidate);
        await Promise.resolve();
        await Promise.resolve();
        expect(rejecting.reported).toHaveLength(1);
    });
});
