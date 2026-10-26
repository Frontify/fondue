/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createPortalStore, type PortalEntry } from '#/bridge/portals';
import { type RecoveryService, type ServiceContext } from '#/index';
import { runtimeOf } from '#/runtime/runtime';

import { para, chromeBlock, serviceOf, settle, mount, installPersistenceHooks } from './fixtures/mounted';

vi.mock('#/bridge/portals', { spy: true });
const { createPortalStore: actualStore } = await vi.importActual<{
    readonly createPortalStore: typeof createPortalStore;
}>('#/bridge/portals');

installPersistenceHooks();

describe('recovery', () => {
    it('stores the candidate of a view fault and reports the receipt', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const store = vi.fn((checkpoint: Parameters<RecoveryService['store']>[0]) =>
            Promise.resolve({ stamp: checkpoint.stamp, receiptId: 'receipt-1' }),
        );
        const { handle, type, diagnostics, unmount } = mount({
            service: serviceOf().service,
            recovery: { store },
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        type('x');
        const { session, sequence } = handle().getSummary();

        act(() => {
            runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
        });
        await settle();

        expect(handle().getSummary().phase).toBe('faulted');
        expect(store).toHaveBeenCalledTimes(1);
        const [[checkpoint]] = store.mock.calls as unknown as [[Parameters<RecoveryService['store']>[0]]];
        expect(checkpoint).toMatchObject({ stamp: { ...session, sequence: sequence + 1 }, acknowledgedRevision: null });
        expect(checkpoint.document).toEqual(handle().getRecoveryCandidate());
        expect(diagnostics.filter(({ code }) => code === 'runtime.recovery-stored')).toEqual([
            {
                code: 'runtime.recovery-stored',
                severity: 'info',
                messageKey: 'runtime.recovery-stored',
                details: { receiptId: 'receipt-1' },
            },
        ]);
        unmount();
    });

    it('stores the acknowledged revision of the session with the candidate, in the context of the session', async () => {
        vi.mocked(createPortalStore).mockImplementationOnce(() => {
            const store = actualStore();

            return {
                ...store,
                set: (entry: PortalEntry) => {
                    if (entry.state.attrs.language === 'boom') {
                        throw new Error('node view failed');
                    }

                    store.set(entry);
                },
            };
        });
        const store = vi.fn((checkpoint: Parameters<RecoveryService['store']>[0]) =>
            Promise.resolve({ stamp: checkpoint.stamp, receiptId: 'receipt-1' }),
        );
        const { handle, unmount } = mount({
            service: serviceOf().service,
            recovery: { store },
            revision: 'revision-1',
            blocks: [para('ab'), chromeBlock('b1')],
        });
        await act(async () => {
            await vi.advanceTimersByTimeAsync(0);
        });
        const { session } = handle().getSummary();

        act(() => {
            runtimeOf(handle())?.nodeActions('b1').update({ language: 'boom' });
        });
        await settle();

        const [[checkpoint, context]] = store.mock.calls as unknown as [
            [Parameters<RecoveryService['store']>[0], ServiceContext],
        ];
        expect(checkpoint.acknowledgedRevision).toBe('revision-1');
        expect(context.session).toEqual(session);
        unmount();
    });

    it('states the host obligations for browser-stored checkpoints on the switching documents page', () => {
        const page = readFileSync(
            join(dirname(fileURLToPath(import.meta.url)), '..', 'persistence.stories.tsx'),
            'utf8',
        );

        expect(page).toMatch(/namespace[^.]*by user, tenant and document/i);
        expect(page).toMatch(/retention period/i);
        expect(page).toMatch(/delete[^.]*on logout and on account switch/i);
    });
});
