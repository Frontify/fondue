/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EngineImplementations } from '#/definition';
import { BASE_KEYS_PLUGIN, BLOCK_DECORATIONS_PLUGIN } from '#/model/capabilities';

import { blockDecorationsPlugin } from './decorations';
import { baseKeysPlugin } from './keys';

/** The package plugins the runtime builds, by plugin ID. */
export const RUNTIME_PLUGINS: EngineImplementations = {
    plugins: {
        [BASE_KEYS_PLUGIN.id]: baseKeysPlugin,
        [BLOCK_DECORATIONS_PLUGIN.id]: blockDecorationsPlugin,
    },
};
