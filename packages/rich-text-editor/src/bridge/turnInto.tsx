/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { type CodecContext, type JsonValue } from '#/model';
import { type CommandState } from '#/runtime/port';

import { NodeChromeMenu, OptionItem } from './chromeToolbar';
import { useEditorApi } from './plugin';

/** One block conversion of the Turn into menus: the command that makes it, and its label. */
export interface TurnIntoEntry {
    readonly key: string;
    readonly command: string;
    readonly payload: JsonValue | undefined;
    readonly label: string;
}

/** The conversions the editor offers, which node chrome and the context menu narrow to what their block takes. */
export const TurnIntoContext = createContext<readonly TurnIntoEntry[]>([]);
TurnIntoContext.displayName = 'RichTextEditorTurnIntoContext';

/** One entry the block can take, and whether it is the block's current type. */
export interface TurnIntoChoice {
    readonly entry: TurnIntoEntry;
    readonly current: boolean;
}

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
export interface TurnIntoNode {
    readonly context: { readonly t: CodecContext['t'] };
    readonly execute: (command: string, payload?: JsonValue) => unknown;
    readonly query: (command: string, payload?: JsonValue) => CommandState;
}

const TurnIntoItems = ({ node, onPick }: { readonly node: TurnIntoNode; readonly onPick: () => void }) => {
    const entries = useContext(TurnIntoContext);
    const choices = turnIntoChoices(entries, (command, payload) => node.query(command, payload));
    return choices.map(({ entry, current }) => (
        <OptionItem
            key={entry.key}
            checked={current}
            onSelect={() => {
                // The current type changes nothing, as a toggle command would turn it off.
                if (!current) {
                    node.execute(entry.command, entry.payload);
                }
                onPick();
            }}
        >
            {entry.label}
        </OptionItem>
    ));
};

/** The Turn into menu of node chrome: a button named by the block's `current` type, whose items convert the block. */
export const NodeChromeTurnInto = ({ current, node }: { readonly current: string; readonly node: TurnIntoNode }) => {
    const api = useEditorApi();
    // A converted block's chrome unmounts with its menu, so a pick returns focus here and Escape in the close handler.
    const toSurface = () => api?.focus();
    return (
        <NodeChromeMenu
            label={node.context.t('RichTextEditor_turnIntoCurrent', { type: current })}
            text={current}
            onCloseAutoFocus={(event) => {
                event.preventDefault();
                toSurface();
            }}
        >
            <TurnIntoItems node={node} onPick={toSurface} />
        </NodeChromeMenu>
    );
};
