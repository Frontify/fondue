/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type AriaAttributes, type AriaRole, useId } from 'react';

import { CheckedSlot } from '#/bridge/chrome/components/CheckedSlot';
import { useCommandQuery } from '#/bridge/pluginApi/hooks/useCommandQuery';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { useOpenPanel } from '#/ui/hooks/useOpenPanel';
import { useShortcut } from '#/ui/hooks/useShortcut';
import styles from '#/ui/styles/toolbar.module.scss';

import { ToolbarIcon } from './ToolbarIcon';

export const MoreRow = ({
    item,
    strings,
    onRun,
}: {
    item: ToolbarItem;
    strings: ToolbarStrings;
    onRun: (item: ToolbarItem) => Promise<void>;
}) => {
    const state = useCommandQuery(item.command, item.payload);
    const openPanel = useOpenPanel();
    const { shortcut, keyshortcuts } = useShortcut(item);
    const reasonId = useId();
    // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes through the spread.
    let semantics: { role: AriaRole } & Pick<AriaAttributes, 'aria-checked' | 'aria-disabled'>;
    // A brand style row is one of the block's styles, as in the text style picker.
    const radio = item.brand !== undefined;
    let shown = state.active;
    if (item.toggle && item.control !== undefined && item.control === openPanel) {
        shown = true;
    }

    const checked = radio ? shown === true : shown !== false;
    if (radio) {
        semantics = { role: 'menuitemradio', 'aria-checked': checked };
    } else if (item.toggle) {
        semantics = { role: 'menuitemcheckbox', 'aria-checked': shown };
    } else {
        semantics = { role: 'menuitem' };
    }

    // An unavailable row stays focusable with its reason, as a toolbar item does; a checked style is already set.
    let reason: string | undefined;
    let describedBy: string | undefined;
    if (!state.enabled && !(radio && checked)) {
        reason = strings.reason(state.disabledReason ?? '');
        describedBy = reasonId;
        semantics['aria-disabled'] = true;
    }

    return (
        <Dropdown.Item
            {...semantics}
            aria-describedby={describedBy}
            aria-keyshortcuts={keyshortcuts}
            onSelect={async (event) => {
                if (reason !== undefined) {
                    event.preventDefault();

                    return;
                }

                await onRun(item);
            }}
        >
            <Dropdown.Slot name="left">
                <ToolbarIcon name={item.icon} />
            </Dropdown.Slot>
            <span>{item.label}</span>
            {item.toggle && checked && <CheckedSlot />}
            {shortcut !== undefined && <Dropdown.Shortcut>{shortcut}</Dropdown.Shortcut>}
            {reason !== undefined && (
                <span id={reasonId} aria-hidden className={styles.reason}>
                    {reason}
                </span>
            )}
        </Dropdown.Item>
    );
};

MoreRow.displayName = 'MoreRow';
