/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useContext, useRef } from 'react';

import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { useOverlayContainer } from '#/bridge/overlays';

import { keepFocus, returnFocus, runItem, tabStop, type ToolbarItem } from './item';
import styles from './styles/toolbar.module.scss';

/**
 * The text style picker: its trigger names the active block type, a stored heading level the policy cannot create
 * included, and its rows set the block types the author may create (SPEC-rich-text-react, Default toolbars).
 */
export const TextStyle = ({
    item,
    disabled,
    keepsFocus,
    outOfTabOrder,
}: {
    readonly item: ToolbarItem;
    readonly disabled: boolean;
    readonly keepsFocus: boolean;
    readonly outOfTabOrder: boolean;
}) => {
    const runtime = useContext(SessionContext);
    const container = useOverlayContainer();
    const contentRef = useRef<HTMLDivElement>(null);
    // A row that ran its command sends focus to the surface rather than back to the trigger.
    const ranRef = useRef(false);
    const options = item.options ?? [];
    const active = useSessionValue((session) => {
        if (session === undefined) {
            return -1;
        }
        return options.findIndex(({ command, payload }) => session.handle.query(command, payload).active === true);
    }, Object.is);
    let label = item.label;
    const shown = options[active];
    if (shown !== undefined) {
        label = shown.label;
    }
    let onMouseDown: typeof keepFocus | undefined;
    if (keepsFocus) {
        onMouseDown = keepFocus;
    }
    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <RadixToolbar.Button
                    {...tabStop(outOfTabOrder)}
                    type="button"
                    className={`${styles.item} ${styles.picker}`}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onMouseDown={onMouseDown}
                >
                    {label}
                </RadixToolbar.Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                ref={contentRef}
                container={container}
                onCloseAutoFocus={(event) => {
                    if (ranRef.current) {
                        event.preventDefault();
                        ranRef.current = false;
                    }
                }}
            >
                {options
                    .filter(({ offered }) => offered)
                    .map((option) => (
                        <Dropdown.Item
                            key={option.key}
                            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
                            {...{ role: 'menuitemradio', 'aria-checked': option === shown }}
                            onSelect={async () => {
                                if (runtime === undefined) {
                                    return;
                                }
                                ranRef.current = true;
                                await runItem(runtime, option, false);
                                returnFocus(runtime, [contentRef.current]);
                            }}
                        >
                            {option.label}
                        </Dropdown.Item>
                    ))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
