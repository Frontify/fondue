/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

import { type ContentModel } from '#/model';
import { compiledModel, type KeymapEntry } from '#/model/compile';

import { buildSchema } from './schema';

export interface CompiledDefinition {
    readonly schema: Schema;
    /** Key bindings in plugin order; features that bind one key run in that order. */
    readonly keymap: readonly KeymapEntry[];
    /** One instance per plugin ID, in plugin order. */
    readonly plugins: readonly Plugin[];
}

/** Turns a content model into the engine's schema, keymap and plugins; a plugin holds only its key until its capability is implemented. */
export const compileDefinition = (model: ContentModel): CompiledDefinition => {
    const { keymap, plugins } = compiledModel(model);
    return {
        schema: buildSchema(model),
        keymap,
        plugins: plugins.map(({ id }) => new Plugin({ key: new PluginKey(id) })),
    };
};
