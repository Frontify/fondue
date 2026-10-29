/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { compileContentModel } from '#/model';
import { core } from '#/plugins/Core/feature';
import { image } from '#/plugins/Image/feature';
import { liveDocumentOf } from '#/runtime/port';

import { mediaOf } from '../session/lifecycle/uploadsWiring';

import { installRuntimeHooks, para, start, stored } from './fixtures/start';

installRuntimeHooks();

describe('media session', () => {
    it('is absent from a session whose model lacks media.image', () => {
        const { runtime } = start(stored(para()));

        expect(mediaOf(runtime)).toBeUndefined();
    });

    it('is present when the model installs media.image, with the media types it takes', () => {
        const model = compileContentModel([core(), image()], { id: 'test.bold', version: 1 });
        const { runtime } = start(stored(para()), { model });

        expect(mediaOf(runtime)?.uploads.accepts).toContain('image/png');
        expect(typeof mediaOf(runtime)?.placeAsset).toBe('function');
    });

    it('reports a rejection from uploads.begin', async () => {
        const model = compileContentModel([core(), image()], { id: 'test.bold', version: 1 });
        const session = start(stored(para()), {
            model,
            uploads: {
                upload: () => new Promise(() => undefined),
                releaseUnused: () => Promise.resolve(),
            },
        });
        const media = mediaOf(session.runtime);
        if (media === undefined) {
            throw new Error('expected a media session');
        }

        media.uploads.begin = () => Promise.reject(new TypeError('secret text'));
        const document = liveDocumentOf(session.runtime);
        const uploads = document.uploads;
        if (uploads === undefined) {
            throw new Error('expected uploads');
        }

        const started = uploads.begin([new File(['x'], 'a.png', { type: 'image/png' })], {
            origin: 'paste',
            range: document.selectedRange(),
        });
        expect(started).toBe(true);
        await Promise.resolve();

        expect(session.diagnostics).toEqual([
            {
                code: 'runtime.plugin-error',
                severity: 'error',
                messageKey: 'runtime.plugin-error',
                details: { name: 'TypeError' },
            },
        ]);
        expect(JSON.stringify(session.diagnostics)).not.toContain('secret text');
    });
});
