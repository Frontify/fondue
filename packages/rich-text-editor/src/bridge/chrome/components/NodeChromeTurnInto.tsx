/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { useEditorApi } from '../../pluginApi/hooks/useEditorApi';
import { turnIntoChoices, TurnIntoContext, type TurnIntoNode } from '../helpers/turnInto';

import { NodeChromeMenu } from './NodeChromeMenu';
import { OptionItem } from './OptionItem';

type TurnIntoItemsProps = { node: TurnIntoNode; onPick: () => void };

const TurnIntoItems = ({ node, onPick }: TurnIntoItemsProps) => {
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

export type NodeChromeTurnIntoProps = { current: string; node: TurnIntoNode };

/** The Turn into menu of node chrome: a button named by the block's `current` type, whose items convert the block. */
export const NodeChromeTurnInto = ({ current, node }: NodeChromeTurnIntoProps) => {
    const api = useEditorApi();
    // A converted block's chrome unmounts with its menu, so a pick returns focus here and Escape in the close handler.
    const toSurface = () => api?.focus();

    return (
        <NodeChromeMenu
            label={node.context.translate('RichTextEditor_turnIntoCurrent', { type: current })}
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

NodeChromeTurnInto.displayName = 'NodeChromeTurnInto';
