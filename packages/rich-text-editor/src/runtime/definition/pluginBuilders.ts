/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, PluginKey } from 'prosemirror-state';

import {
    CONTENT_CHECKS_FEATURE,
    CONTENT_ISSUES_PLUGIN,
    declaresNodeIds,
    INPUT_RULES_PLUGIN,
    keyHandlersPlugin,
    NODE_IDS_PLUGIN,
} from '#/model/internal';

import { batchOf, rootOf } from './appends';
import { type KeyHandlerEntry, type withInputRules } from './contributions';
import { bindKeyEntries, createKeymapContext, handleBoundKeyDown } from './keyBindings';
import { NORMALIZE_META, type NORMALIZERS } from './normalizers';
import {
    type EngineCommand,
    type EngineImplementations,
    type KeymapEntry,
    ORIGIN_META,
    type PluginOrigin,
} from './types';

/** The first feature that contributes a plugin, or the plugin ID for the package's plugins no feature owns. */
export const pluginOriginOf = (features: ReturnType<typeof withInputRules>, id: string): PluginOrigin => {
    const contributor = features.find(
        (feature) =>
            id === `keymap:${feature.id}` ||
            id === keyHandlersPlugin(feature.id).id ||
            (id === INPUT_RULES_PLUGIN.id && feature.inputRules.length > 0) ||
            (id === NODE_IDS_PLUGIN.id && declaresNodeIds(feature.declaration)) ||
            (id === CONTENT_ISSUES_PLUGIN.id && feature.id === CONTENT_CHECKS_FEATURE),
    );
    if (contributor === undefined) {
        return { featureId: id, capability: id };
    }

    return { featureId: contributor.id, capability: id };
};

/** The plugin that repairs the document with `normalizer` after a change. */
export const normalizerPlugin = (normalizer: (typeof NORMALIZERS)[string]): Plugin =>
    new Plugin({
        key: normalizer.key,
        state: normalizer.field,
        appendTransaction: (transactions, _old, state) => {
            const batch = batchOf(transactions);
            const timing: unknown = rootOf(transactions)?.getMeta(NORMALIZE_META);
            // Outside a commit no id function is on the batch, and a composition batch is repaired once input settles.
            if (batch === undefined || timing === 'later') {
                return null;
            }

            // A batch that kept the document has nothing to repair, unless it settles a composition.
            if (timing !== 'now' && !transactions.some(({ docChanged }) => docChanged)) {
                return null;
            }

            const repair = normalizer.normalize(state, batch.generateId);
            if (repair === null) {
                return null;
            }

            return repair.setMeta(ORIGIN_META, 'normalization');
        },
    });

/** The plugin `id` that runs the key context and key handlers the editor parts declare for it. */
export const keyPlugin = (
    id: string,
    keymap: readonly KeymapEntry[],
    keyHandlers: readonly KeyHandlerEntry[],
    commands: ReadonlyMap<string, EngineCommand>,
    implementations: EngineImplementations,
): Plugin => {
    const context = createKeymapContext(id, commands, implementations);
    bindKeyEntries(context, keymap, keyHandlers);
    if (Object.keys(context.other).length === 0 && Object.keys(context.apple).length === 0) {
        return new Plugin({ key: new PluginKey(id) });
    }

    return new Plugin({ key: new PluginKey(id), props: { handleKeyDown: handleBoundKeyDown(context) } });
};
