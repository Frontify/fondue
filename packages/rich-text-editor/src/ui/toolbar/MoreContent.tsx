/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type AriaAttributes, type AriaRole, type RefObject, useId } from 'react';

import { CheckedSlot } from '#/bridge/chromeToolbar';
import { useCommandQuery } from '#/bridge/hooks';
import { ChromeBoundary, NO_ATTRS } from '#/bridge/PortalHost';
import { useOpenPanel } from '#/ui/panels/context';

import { Icon, type ToolbarItem, type ToolbarStrings, useShortcut } from './item';
import styles from './styles/toolbar.module.scss';

export const MoreRow = ({
    item,
    strings,
    onRun,
}: {
    readonly item: ToolbarItem;
    readonly strings: ToolbarStrings;
    readonly onRun: (item: ToolbarItem) => Promise<void>;
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
                <Icon name={item.icon} />
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

/** The More menu's content, which loads with the toolbar's More so the editor's initial load holds none of it. */
export const MoreContent = ({
    contentRef,
    container,
    items,
    strings,
    blockType,
    modeLabel,
    onRun,
    onCloseAutoFocus,
    onModeSwitch,
}: {
    readonly contentRef: RefObject<HTMLDivElement>;
    readonly container: HTMLElement | null;
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    readonly blockType: string;
    readonly modeLabel: string;
    readonly onRun: (item: ToolbarItem) => Promise<void>;
    readonly onCloseAutoFocus: (event: Event) => void;
    readonly onModeSwitch: () => void;
}) => (
    <Dropdown.Content ref={contentRef} container={container} onCloseAutoFocus={onCloseAutoFocus}>
        {/* The text style picker that does not fit offers its rows here. */}
        {items
            .flatMap((item) => {
                if (item.options === undefined) {
                    return [item];
                }
                // A brand style row applies only to the block types its style names.
                return item.options.filter(
                    ({ offered, brand }) => offered && (brand === undefined || brand.appliesTo.includes(blockType)),
                );
            })
            .map((item) => (
                // A row that throws leaves only its own place empty.
                <ChromeBoundary key={item.key} message="" attrs={NO_ATTRS}>
                    <MoreRow item={item} strings={strings} onRun={onRun} />
                </ChromeBoundary>
            ))}
        <Dropdown.Item onSelect={onModeSwitch}>{modeLabel}</Dropdown.Item>
    </Dropdown.Content>
);
