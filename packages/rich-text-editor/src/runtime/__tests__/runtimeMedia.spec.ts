/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { compileContentModel } from '#/model';
import { core } from '#/plugins/Core/feature';
import { image } from '#/plugins/Image/feature';

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
});
