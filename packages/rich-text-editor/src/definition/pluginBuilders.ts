/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keydownHandler } from 'prosemirror-keymap';
import { type Command, Plugin, PluginKey } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import {
    CONTENT_CHECKS_FEATURE,
    CONTENT_ISSUES_PLUGIN,
    declaresNodeIds,
    INPUT_RULES_PLUGIN,
    keyHandlersPlugin,
    NODE_IDS_PLUGIN,
    isApple,
    isPlatformBinding,
    keyOn,
    modOn,
} from '#/model/internal';

import { batchOf, rootOf } from './appends';
import { type KeyHandlerEntry, type withInputRules } from './contributions';
import { NORMALIZE_META, type NORMALIZERS } from './normalizers';
import {
    type EngineCommand,
    type EngineImplementations,
    type KeymapEntry,
    ORIGIN_META,
    type PluginOrigin,
} from './types';

/** The first feature that contributes a plugin, or the plugin ID for the package's plugins no feature owns. */
export const originOf = (features: ReturnType<typeof withInputRules>, id: string): PluginOrigin => {
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

/** The plugin `id` that runs the key bindings and key handlers the editor parts declare for it. */
export const keyPlugin = (
    id: string,
    keymap: readonly KeymapEntry[],
    keyHandlers: readonly KeyHandlerEntry[],
    commands: ReadonlyMap<string, EngineCommand>,
    implementations: EngineImplementations,
): Plugin => {
    // A binding that starts with `mac:` or `other:` runs only on that platform.
    const apple: Record<string, Command> = {};
    const other: Record<string, Command> = {};
    const bindKey = (key: string, run: Command) => {
        const appleKey = keyOn(key, true);
        if (appleKey !== undefined) {
            apple[modOn(appleKey, true)] = run;
        }

        const otherKey = keyOn(key, false);
        if (otherKey !== undefined) {
            other[modOn(otherKey, false)] = run;
        }
    };

    const bind = (entry: KeymapEntry) => {
        const command = commands.get(entry.command);
        if (entry.plugin !== id || command === undefined) {
            return;
        }

        bindKey(entry.key, (state, dispatch, view) => {
            if (command.viaExecute === true && view !== undefined && implementations.execute !== undefined) {
                return implementations.execute(view, entry.command, entry.payload);
            }

            return command.run(state, dispatch, entry.payload);
        });
    };

    const bindHandler = ({ plugin, key, handler: given }: KeyHandlerEntry) => {
        if (plugin !== id) {
            return;
        }

        // A key that took its key keeps the caret in sight, as the base keys do.
        const handler: EngineCommand = {
            ...given,
            run: (state, dispatch, payload, context) => {
                if (dispatch === undefined) {
                    return given.run(state, undefined, payload, context);
                }

                return given.run(state, (transaction) => dispatch(transaction.scrollIntoView()), payload, context);
            },
        };
        bindKey(key, (state, dispatch, view) => {
            if (view !== undefined && implementations.handleKey !== undefined) {
                return implementations.handleKey(view, handler);
            }

            return handler.run(state, dispatch);
        });
    };

    // Plain bindings first, so on its platform a prefixed one of the same key wins.
    for (const entry of keymap) {
        if (!isPlatformBinding(entry.key)) {
            bind(entry);
        }
    }

    for (const binding of keyHandlers) {
        if (!isPlatformBinding(binding.key)) {
            bindHandler(binding);
        }
    }

    for (const entry of keymap) {
        if (isPlatformBinding(entry.key)) {
            bind(entry);
        }
    }

    for (const binding of keyHandlers) {
        if (isPlatformBinding(binding.key)) {
            bindHandler(binding);
        }
    }

    if (Object.keys(other).length === 0 && Object.keys(apple).length === 0) {
        return new Plugin({ key: new PluginKey(id) });
    }

    const handlers = { apple: keydownHandler(apple), other: keydownHandler(other) };
    const handleKeyDown = (view: EditorView, event: KeyboardEvent) => {
        // The tooltips name the bindings of the same platform check.
        const owner = view.dom.ownerDocument.defaultView;
        if (owner !== null && isApple(owner.navigator)) {
            return handlers.apple(view, event);
        }

        return handlers.other(view, event);
    };

    return new Plugin({ key: new PluginKey(id), props: { handleKeyDown } });
};
