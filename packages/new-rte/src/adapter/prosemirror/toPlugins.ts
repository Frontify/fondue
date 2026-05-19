/* (c) Copyright Frontify Ltd., all rights reserved. */

import { baseKeymap } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { type Command, type Plugin } from 'prosemirror-state';

import { type EditorControlApi } from '#/core/editor-api';
import { type FondueRtePlugin } from '#/core/plugin';

const convertKeys = (mousetrap: string): string =>
    mousetrap
        .split('+')
        .map((part) => {
            const lower = part.toLowerCase();
            if (lower === 'mod') {
                return 'Mod';
            }
            if (lower === 'shift') {
                return 'Shift';
            }
            if (lower === 'alt' || lower === 'option') {
                return 'Alt';
            }
            if (lower === 'ctrl') {
                return 'Ctrl';
            }
            if (lower === 'cmd' || lower === 'meta') {
                return 'Meta';
            }
            if (lower === 'enter') {
                return 'Enter';
            }
            if (lower === 'space') {
                return 'Space';
            }
            const first = part.charAt(0);
            return part.length === 1 ? part.toLowerCase() : first.toUpperCase() + part.slice(1).toLowerCase();
        })
        .join('-');

export type BuildPluginsArgs = {
    plugins: FondueRtePlugin[];
    getApi: () => EditorControlApi;
};

export const buildPlugins = ({ plugins, getApi }: BuildPluginsArgs): Plugin[] => {
    const result: Plugin[] = [history()];

    result.push(
        keymap({
            'Mod-z': undo,
            'Mod-y': redo,
            'Mod-Shift-z': redo,
        }),
    );

    const hotkeyMap: Record<string, Command> = {};
    for (const plugin of plugins) {
        for (const hotkey of plugin.hotkeys ?? []) {
            const pmKey = convertKeys(hotkey.keys);
            hotkeyMap[pmKey] = () => {
                hotkey.command(getApi(), new KeyboardEvent('keydown'));
                return true;
            };
        }
    }
    if (Object.keys(hotkeyMap).length > 0) {
        result.push(keymap(hotkeyMap));
    }

    result.push(keymap(baseKeymap));

    return result;
};
