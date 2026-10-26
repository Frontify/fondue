/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type CodecContext, type JsonValue } from '#/model';
import { type CommandState } from '#/runtime/port';

/** One block conversion of the Turn into menus: the command that makes it, and its label. */
export type TurnIntoEntry = {
    key: string;
    command: string;
    payload: JsonValue | undefined;
    label: string;
};

/** The conversions the editor offers, which node chrome and the context menu narrow to what their block takes. */
export const TurnIntoContext = createContext<readonly TurnIntoEntry[]>([]);
TurnIntoContext.displayName = 'RichTextEditorTurnIntoContext';

/** One entry the block can take, and whether it is the block's current type. */
export type TurnIntoChoice = {
    entry: TurnIntoEntry;
    current: boolean;
};

/**
 * The entries whose command `query` finds enabled, or active as the block's current type; none for a block of no type
 * the entries name, such as a divider that Quote could only wrap. A paragraph inside a quote is a Quote, so Normal text
 * is current only when nothing else is.
 */
export const turnIntoChoices = (
    entries: readonly TurnIntoEntry[],
    query: (command: string, payload: JsonValue | undefined) => CommandState,
): readonly TurnIntoChoice[] => {
    const states = entries.map((entry) => ({ entry, state: query(entry.command, entry.payload) }));
    const held = states.filter(({ state }) => state.active === true);
    const current = held.find(({ entry }) => entry.command !== 'paragraph.set') ?? held[0];
    if (current === undefined) {
        return [];
    }

    return states
        .filter(({ entry, state }) => state.enabled || entry === current.entry)
        .map(({ entry }) => ({ entry, current: entry === current.entry }));
};

/** The command map of node chrome that runs any entry, which `useRichTextNodeView` takes for `NodeChromeTurnInto`. */
export type TurnIntoCommands = Readonly<Record<string, JsonValue | undefined>>;

/** What the Turn into menu reads of its node: `useRichTextNodeView<TurnIntoCommands>()`. */
export type TurnIntoNode = {
    context: { t: CodecContext['t'] };
    execute: (command: string, payload?: JsonValue) => unknown;
    query: (command: string, payload?: JsonValue) => CommandState;
};
