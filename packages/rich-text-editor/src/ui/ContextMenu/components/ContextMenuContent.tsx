/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type Ref, useContext } from 'react';

import { OptionItem } from '#/bridge/chrome/components/OptionItem';
import { TurnIntoContext, turnIntoChoices, type TurnIntoEntry } from '#/bridge/chrome/helpers/turnInto';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { MoreRow } from '#/ui/components/MoreRow';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { type useRowRuns } from '#/ui/hooks/useRowRuns';

const rowOf = ({ key, command, payload, label }: TurnIntoEntry): ToolbarItem => ({
    key,
    command,
    payload,
    toggle: false,
    label,
    icon: '',
    bindings: [],
    groupStart: false,
    bubble: false,
});

// Fondue's group heading is a labelled span that axe rejects inside a menu, so the group takes the name instead.
const labelGroup = (label: string) => (group: HTMLDivElement | null) => {
    group?.setAttribute('aria-label', label);
    group?.querySelector('span[aria-label]')?.setAttribute('aria-hidden', 'true');
};

/** The Turn into group: the conversions the selected node takes, none for a node that takes no other type. */
const TurnInto = ({ label, runs }: { label: string; runs: ReturnType<typeof useRowRuns> }) => {
    const runtime = useContext(SessionContext);
    const entries = useContext(TurnIntoContext);
    if (runtime === undefined) {
        return null;
    }

    const choices = turnIntoChoices(entries, (command, payload) => runtime.handle.query(command, payload));
    if (choices.every(({ current }) => current)) {
        return null;
    }

    return (
        // Fondue's sub-content takes no `container`, so a group keeps the items inside the editor's overlay root.
        <Dropdown.Group heading={label} ref={labelGroup(label)}>
            {choices.map(({ entry, current }) => (
                <OptionItem
                    key={entry.key}
                    checked={current}
                    onSelect={async () => {
                        // The current type changes nothing, as a toggle command would turn it off.
                        if (current) {
                            runs.ran();
                            runtime.handle.focus();

                            return;
                        }

                        await runs.onRun(rowOf(entry));
                    }}
                >
                    {entry.label}
                </OptionItem>
            ))}
        </Dropdown.Group>
    );
};

/** The context menu's content, which loads when the menu first opens so the editor's initial load holds none of it. */
export const ContextMenuContent = ({
    contentRef,
    label,
    container,
    items,
    strings,
    turnIntoLabel,
    runs,
}: {
    contentRef: Ref<HTMLDivElement>;
    label: string;
    container: HTMLElement | null;
    items: readonly ToolbarItem[];
    strings: ToolbarStrings;
    turnIntoLabel: string;
    runs: ReturnType<typeof useRowRuns>;
}) => (
    <Dropdown.Content
        ref={contentRef}
        aria-label={label}
        container={container}
        onCloseAutoFocus={runs.onCloseAutoFocus}
    >
        {items.map((item) => (
            <MoreRow key={item.key} item={item} strings={strings} onRun={runs.onRun} />
        ))}
        <TurnInto label={turnIntoLabel} runs={runs} />
    </Dropdown.Content>
);
ContextMenuContent.displayName = 'ContextMenuContent';
