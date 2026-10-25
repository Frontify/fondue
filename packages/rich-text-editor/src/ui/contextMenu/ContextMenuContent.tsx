/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type Ref, useContext } from 'react';

import { OptionItem } from '#/bridge/chromeToolbar';
import { SessionContext } from '#/bridge/session';
import { TurnIntoContext, turnIntoChoices, type TurnIntoEntry } from '#/bridge/turnInto';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/item';
import { type useRowRuns } from '#/ui/toolbar/More';
import { MoreRow } from '#/ui/toolbar/MoreContent';

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
const TurnInto = ({ label, runs }: { readonly label: string; readonly runs: ReturnType<typeof useRowRuns> }) => {
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
    readonly contentRef: Ref<HTMLDivElement>;
    readonly label: string;
    readonly container: HTMLElement | null;
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    readonly turnIntoLabel: string;
    readonly runs: ReturnType<typeof useRowRuns>;
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
