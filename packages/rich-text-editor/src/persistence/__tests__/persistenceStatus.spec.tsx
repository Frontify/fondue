/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { STORAGE } from '#/testing/__tests__/fixtures/storage';

import { serviceOf, settle, mount, installPersistenceHooks } from './fixtures/mounted';

const suite = installPersistenceHooks();

describe('save state at load', () => {
    it('runs the persistence suite with every browser storage API failing', () => {
        for (const name of STORAGE) {
            expect(() => {
                Reflect.get(Reflect.get(globalThis, name) as object, 'open');
            }).toThrow(name);
        }

        // The probe above is the only access this suite may make.
        expect(suite.storage().accessed.splice(0)).toEqual([...STORAGE]);
    });

    it('reports unmanaged without services.persistence, after mount and after typing', () => {
        const { handle, type, unmount } = mount();
        expect(handle().getSaveStatus().state).toBe('unmanaged');
        type('x');
        expect(handle().getSaveStatus()).toMatchObject({ state: 'unmanaged', latestSequence: 1 });
        unmount();
    });

    it('resolves requestCommit blocked with unmanaged without services.persistence', async () => {
        const { handle, unmount } = mount();
        await expect(handle().requestCommit({ reason: 'manual' })).resolves.toEqual({
            status: 'blocked',
            code: 'unmanaged',
        });
        unmount();
    });

    it.each([
        ['a new record', null],
        ['an existing record', 'revision-7'],
    ])('sends no write for %s over 60 seconds after load', async (_name, revision) => {
        const { service } = serviceOf();
        const { advance, unmount } = mount({ service, revision });
        advance(60_000);
        await settle();
        expect(service.save).not.toHaveBeenCalled();
        unmount();
    });

    it('starts a new record at latestSequence 0 and acknowledgedSequence -1', () => {
        const { handle, unmount } = mount({ service: serviceOf().service });
        expect(handle().getSaveStatus()).toEqual({
            state: 'clean',
            latestSequence: 0,
            acknowledgedSequence: -1,
            revision: null,
            inFlightOperationId: null,
            diagnostic: null,
        });
        unmount();
    });

    it('starts an existing record at latestSequence 0 and acknowledgedSequence 0', () => {
        const { handle, unmount } = mount({
            service: serviceOf().service,
            revision: 'revision-7',
        });
        expect(handle().getSaveStatus()).toMatchObject({
            state: 'clean',
            latestSequence: 0,
            acknowledgedSequence: 0,
            revision: 'revision-7',
        });
        expect(handle().getSnapshot().acknowledgedRevision).toBe('revision-7');
        unmount();
    });
});
