/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { type PersistenceService } from '#/index';
import { createFakePersistenceService, typeText } from '#/testing';

import { stored, para, words, start, replacing, installRuntimeHooks } from './fixtures/start';

installRuntimeHooks();

describe('the focus and the replacement of a session', () => {
    it('puts the selection at the start or at the end of the document when it takes focus there', () => {
        const { handle, runtime } = start(stored(para(words('ab'))));

        handle.focus('end');
        const atEnd = runtime.state.selection.from;
        handle.focus('start');

        expect([atEnd, runtime.state.selection.from]).toEqual([3, 1]);
    });

    it('rejects a command as busy and disables its query while a replacement waits for the save', async () => {
        const server = createFakePersistenceService();
        let settleSave: () => void = () => undefined;
        const persistence: PersistenceService = {
            read: (documentId, context) => server.read(documentId, context),
            save: (request, context) =>
                new Promise((resolve) => {
                    settleSave = () => resolve(server.save(request, context));
                }),
        };
        const { handle } = start(stored(para(words('ab'))), { persistence });
        typeText(handle, 'x');
        const replaced = handle.replaceDocument(replacing(handle, stored(para()), { action: 'save' }));
        await vi.advanceTimersByTimeAsync(0);

        expect([
            handle.getSummary().phase,
            handle.execute('text.insert', { text: 'y' }),
            handle.query('text.insert', { text: 'y' }).disabledReason,
        ]).toEqual(['transitioning', { status: 'rejected', code: 'busy' }, 'busy']);
        settleSave();
        await vi.advanceTimersByTimeAsync(0);

        expect(await replaced).toEqual({ status: 'replaced', session: handle.getSummary().session });
        expect(handle.getSummary().phase).toBe('ready');
        expect(handle.getSnapshot().document.content.content).toEqual([{ type: 'paragraph', attrs: { lang: null } }]);
    });
});
