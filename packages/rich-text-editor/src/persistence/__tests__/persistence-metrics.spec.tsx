/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runtimeOf } from '#/runtime/runtime';

import {
    model,
    PACKAGE_VERSION,
    serviceOf,
    settle,
    mount,
    replacing,
    replace,
    installPersistenceHooks,
} from './fixtures/mounted';

installPersistenceHooks();

describe('operation metrics', () => {
    it('emits one metric per mount, commit, paste and save round trip, with every field set', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, metrics, type, advance, unmount } = mount({ service, beforeReady: 25 });
        const common = {
            session: handle().getSummary().session,
            packageVersion: PACKAGE_VERSION,
            model: { id: 'test.persistence', version: 1 },
            capabilityIds: model.capabilities.map(({ id }) => id),
            normalizationTransactions: 0,
        };
        type('x');
        act(() => {
            const view = runtimeOf(handle())?.view;
            view?.dispatch(view.state.tr.insertText('p').setMeta('uiEvent', 'paste'));
            view?.dispatch(view.state.tr.insertText('d').setMeta('uiEvent', 'drop'));
        });
        advance(500);
        advance(40);
        calls[0]?.fail();
        await settle();
        advance(1200);
        const [, replay] = calls;
        if (replay === undefined) {
            throw new Error('no replay');
        }
        const replayedFor = Date.now() - replay.at;
        replay.answer();
        await settle();

        expect(metrics).toEqual([
            { ...common, kind: 'mount', durationMs: 16, failureCode: null },
            { ...common, kind: 'commit', durationMs: 0, failureCode: null },
            { ...common, kind: 'paste', durationMs: 0, failureCode: null },
            // A drop is measured as a paste.
            { ...common, kind: 'paste', durationMs: 0, failureCode: null },
            { ...common, kind: 'save', durationMs: 40, failureCode: 'transport' },
            { ...common, kind: 'save', durationMs: replayedFor, failureCode: null },
        ]);
        expect(replayedFor).toBeGreaterThan(0);
        unmount();
    });

    it('emits one replace metric for a replacement, timed from the call to its end', async () => {
        const { service, calls } = serviceOf(true);
        const { handle, metrics, type, advance, flush, unmount } = mount({ service });
        const common = {
            packageVersion: PACKAGE_VERSION,
            model: { id: 'test.persistence', version: 1 },
            capabilityIds: model.capabilities.map(({ id }) => id),
            normalizationTransactions: 0,
        };
        type('x');
        const { session } = handle().getSummary();

        const replaced = handle().replaceDocument(replacing(handle(), { unsaved: { action: 'save' } }));
        await flush();
        advance(40);
        calls[0]?.answer();
        const result = await act(() => replaced);

        const next = { ...session, documentId: 'document-2', generation: 1 };
        expect(result).toEqual({ status: 'replaced', session: next });
        expect(metrics.filter(({ kind }) => kind === 'replace')).toEqual([
            { ...common, session: next, kind: 'replace', durationMs: 40, failureCode: null },
        ]);
        unmount();
    });

    it('reports the code of a rejected replacement as its failureCode', async () => {
        const { handle, metrics, type, unmount } = mount({ service: serviceOf().service });
        type('x');

        expect(await replace(handle())).toEqual({ status: 'rejected', code: 'unsaved' });

        expect(metrics.filter(({ kind }) => kind === 'replace')).toEqual([
            expect.objectContaining({ session: handle().getSummary().session, durationMs: 0, failureCode: 'unsaved' }),
        ]);
        unmount();
    });
});

describe('save metric failure codes', () => {
    it.each([
        ['conflict', { status: 'conflict', currentRevision: 'revision-9' } as const],
        ['forbidden', { status: 'rejected', code: 'forbidden', diagnostics: [] } as const],
    ])('reports failureCode %s on the save metric of that answer', async (failureCode, response) => {
        const { service, calls } = serviceOf(true);
        const { metrics, type, advance, unmount } = mount({ service });
        type('x');
        advance(500);
        calls[0]?.answer(response);
        await settle();
        expect(metrics.filter(({ kind }) => kind === 'save').map((metric) => metric.failureCode)).toEqual([
            failureCode,
        ]);
        unmount();
    });
});
