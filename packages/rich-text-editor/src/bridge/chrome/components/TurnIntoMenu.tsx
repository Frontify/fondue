/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { type JsonValue } from '#/model';
import { type CommandState } from '#/runtime/port';

import { type EditorApi, type OverlayProps } from '../../pluginApi/plugin';
import { SessionContext } from '../../session/helpers/sessionContext';
import { turnIntoChoices, TurnIntoContext } from '../helpers/turnInto';

import { type MenuOption, OptionsMenu } from './OptionsMenu';

/**
 * The Turn into menu that a command opens at the selection, as a More row does: it lists what the node takes, marks and
 * focuses the current type, and a pick selects `node` and converts it, or changes nothing for the current type.
 */
export const TurnIntoMenu = ({
    label,
    node,
    ...overlay
}: OverlayProps & {
    label: string;
    /** The node the menu acts on, wherever the selection goes while it is open. */
    node: Parameters<EditorApi['select']>[0];
}) => {
    const entries = useContext(TurnIntoContext);
    const runtime = useContext(SessionContext);
    const query = (command: string, payload: JsonValue | undefined): CommandState => {
        if (runtime === undefined) {
            return { enabled: false, active: false, disabledReason: null };
        }

        return runtime.handle.query(command, payload);
    };

    const options: MenuOption[] = [];
    for (const { entry, current } of turnIntoChoices(entries, query)) {
        options.push({
            key: entry.key,
            label: entry.label,
            command: entry.command,
            checked: current,
            // The current type changes nothing, as a toggle command would turn it off.
            inert: current,
            ...(entry.payload === undefined ? {} : { payload: entry.payload }),
        });
    }

    return <OptionsMenu label={label} options={options} node={node} {...overlay} />;
};

TurnIntoMenu.displayName = 'TurnIntoMenu';
