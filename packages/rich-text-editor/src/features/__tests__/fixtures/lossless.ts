/* (c) Copyright Frontify Ltd., all rights reserved. */

import { featuresById } from '#/features';
import { fontColor } from '#/features/marks-font-color/feature';
import { registry } from '#/features/registry';
import { compileContentModel } from '#/model';

// Every shipped feature whose HTML support is lossless: all but mentions and images, which media.upload needs.
const LOSSY = new Set(['mentions', 'media.image', 'media.upload']);

/**
 * The model of the shipped features whose HTML support is lossless. Font colour reads a pasted literal colour back
 * only with `literalColors`, which its stored literal values need to round trip.
 */
export const losslessModel = compileContentModel(
    [
        ...featuresById(Object.keys(registry).filter((id) => !LOSSY.has(id) && id !== 'marks.font-color')),
        fontColor({ literalColors: true }),
    ],
    { id: 'test.lossless', version: 1 },
);
