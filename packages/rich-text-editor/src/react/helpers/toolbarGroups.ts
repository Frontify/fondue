/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPart, type PluginToolbarEntry } from '#/bridge/pluginApi/plugin';
import { type CommandRef } from '#/model';
import { type AuthoringPolicy } from '#/runtime/port';

/** The groups a presentation with no toolbar builds, in toolbar order. */
const GROUPS = ['history', 'text', 'marks', 'color', 'link', 'lists', 'align', 'insert', 'panels'] as const;

/** The one toolbar control whose rows are the entries of the `text` group. */
const TEXT_STYLE = 'text-style';

type Placed = {
    entry: PluginToolbarEntry;
    pluginIndex: number;
    entryIndex: number;
};

const refOf = (entry: PluginToolbarEntry): CommandRef => {
    if (entry.payload === undefined) {
        return entry.command;
    }

    return { command: entry.command, payload: entry.payload };
};

/**
 * One group per name in toolbar order, from the installed entries that name it. A feature the policy lets no author
 * create adds none. Entries with a rank come first, ascending by rank, then by plugin and entry order; entries
 * without one follow in that same plugin and entry order.
 */
export const toolbarGroups = (
    plugins: readonly EditorPart[],
    authoring: AuthoringPolicy,
): readonly (readonly CommandRef[])[] => {
    const placed: Placed[] = [];
    for (let pluginIndex = 0; pluginIndex < plugins.length; pluginIndex += 1) {
        const plugin = plugins[pluginIndex];
        if (plugin === undefined || authoring.features[plugin.feature]?.create === false) {
            continue;
        }

        const entries = plugin.toolbar ?? [];
        for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
            const entry = entries[entryIndex];
            if (entry === undefined || entry.group === undefined || entry.node !== undefined) {
                continue;
            }

            placed.push({ entry, pluginIndex, entryIndex });
        }
    }

    const groups: CommandRef[][] = [];
    for (const name of GROUPS) {
        const rows = placed
            .filter(({ entry }) => entry.group === name)
            .sort((left, right) => {
                const leftRank = left.entry.rank;
                const rightRank = right.entry.rank;
                if (leftRank !== undefined && rightRank === undefined) {
                    return -1;
                }

                if (leftRank === undefined && rightRank !== undefined) {
                    return 1;
                }

                if (leftRank !== undefined && rightRank !== undefined && leftRank !== rightRank) {
                    return leftRank - rightRank;
                }

                if (left.pluginIndex !== right.pluginIndex) {
                    return left.pluginIndex - right.pluginIndex;
                }

                return left.entryIndex - right.entryIndex;
            });
        if (rows.length === 0) {
            continue;
        }

        if (name === 'text') {
            groups.push([TEXT_STYLE]);
            continue;
        }

        groups.push(rows.map(({ entry }) => refOf(entry)));
    }

    return groups;
};
