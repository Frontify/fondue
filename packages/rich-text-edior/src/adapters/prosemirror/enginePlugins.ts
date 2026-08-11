/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { type Command, type Plugin as PmPlugin } from 'prosemirror-state';

import { type EditorControlApi, type RtePlugin } from '#/domain';

import { buildInputRules } from './inputRules';
import { type SchemaBundle } from './schema';
import { declaredTriggers, triggerPlugin } from './triggers';

/**
 * The engine plugin stack: everything the mounted RTE plugins ask for, plus the
 * baseline behaviour every editor has.
 */

/**
 * More than one plugin may bind the same key; they run in mount order until one
 * reports that it handled it (returning `false` means "not mine").
 */
const buildKeyCommands = (plugins: RtePlugin[], getApi: () => EditorControlApi): Record<string, Command> => {
    const hotkeys = new Map<string, Array<(api: EditorControlApi) => boolean | void>>();
    for (const plugin of plugins) {
        for (const [keys, command] of Object.entries(plugin.hotkeys ?? {})) {
            const handlers = hotkeys.get(keys) ?? [];
            handlers.push(command);
            hotkeys.set(keys, handlers);
        }
    }

    return Object.fromEntries(
        Array.from(hotkeys, ([keys, handlers]): [string, Command] => [
            keys,
            () => handlers.some((handler) => handler(getApi()) !== false),
        ]),
    );
};

/**
 * Enter, Tab and Shift-Tab inside a list. These are not a plugin's keys: the
 * behaviour belongs to being in a list at all, and the commands driving it are
 * the editor's own. A list plugin declares that it *is* a list (`isList`) and
 * gets them — including a list a consumer wrote — instead of every list plugin
 * repeating the same three bindings.
 *
 * All three report "not handled" outside a list, so the baseline below takes
 * over there.
 */
const listKeyCommands = (getApi: () => EditorControlApi): Record<string, Command> => ({
    // The engine's own split deliberately refuses on an empty item at the top
    // level, leaving it to be lifted out of the list instead.
    Enter: () => getApi().lists.split() || getApi().lists.outdent(),
    Tab: () => getApi().lists.indent(),
    'Shift-Tab': () => getApi().lists.outdent(),
});

export const buildEnginePlugins = (
    plugins: RtePlugin[],
    bundle: SchemaBundle,
    getApi: () => EditorControlApi,
): PmPlugin[] => {
    const triggers = declaredTriggers(plugins);
    const hasLists = bundle.itemTypeByList.size > 0;

    return [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Mod-Shift-z': redo }),
        // A plugin's own keys come first, so one may take a key the list
        // behaviour would otherwise claim (blurOnBreak takes Enter).
        keymap(buildKeyCommands(plugins, getApi)),
        ...(hasLists ? [keymap(listKeyCommands(getApi))] : []),
        ...buildInputRules(plugins, bundle.schema, bundle.itemTypeByList),
        ...(triggers.length > 0 ? [triggerPlugin(triggers)] : []),
        keymap(baseKeymap),
    ];
};
