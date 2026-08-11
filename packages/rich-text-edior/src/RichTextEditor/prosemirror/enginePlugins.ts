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

export const buildEnginePlugins = (
    plugins: RtePlugin[],
    bundle: SchemaBundle,
    getApi: () => EditorControlApi,
): PmPlugin[] => {
    const triggers = declaredTriggers(plugins);

    return [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo, 'Mod-Shift-z': redo }),
        keymap(buildKeyCommands(plugins, getApi)),
        ...buildInputRules(plugins, bundle.schema, bundle.itemTypeByList),
        ...(triggers.length > 0 ? [triggerPlugin(triggers)] : []),
        keymap(baseKeymap),
    ];
};
