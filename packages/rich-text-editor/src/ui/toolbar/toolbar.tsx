/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip, useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject, useContext } from 'react';

import { SessionContext, useCommandQuery } from '#/bridge/hooks';
import { useOverlayContainer } from '#/bridge/overlays';
import { ariaShortcut, useApplePlatform } from '#/ui/shortcuts';

import {
    Icon,
    keepFocus,
    returnFocus,
    runItem,
    tabStop,
    type ToolbarItem,
    type ToolbarStrings,
    useShortcut,
} from './item';
import { More, type ModeSwitch } from './more';
import styles from './styles/toolbar.module.scss';
import { useFitting } from './use-fitting';

export { type ToolbarItem, type ToolbarStrings } from './item';
export { More, type ModeSwitch } from './more';

/** One toolbar button, with its tooltip in the editor's portal container. */
export const Item = ({
    item,
    disabled,
    strings,
    keepsFocus,
    outOfTabOrder,
}: {
    readonly item: ToolbarItem;
    readonly disabled: boolean;
    readonly strings: ToolbarStrings;
    /** A press leaves focus in the surface: in the bubble toolbar and the docked toolbar (SPEC-rich-text-accessibility/AC-027). */
    readonly keepsFocus: boolean;
    /** The item takes no Tab stop, as in the bubble toolbar (SPEC-rich-text-react/AC-042). */
    readonly outOfTabOrder: boolean;
}) => {
    const runtime = useContext(SessionContext);
    const container = useOverlayContainer();
    const state = useCommandQuery(item.command, item.payload);
    let pressed: boolean | 'mixed' | undefined;
    if (item.toggle) {
        pressed = state.active;
    }
    // A command the editor cannot run now keeps its item focusable, with the reason in the tooltip (SPEC-rich-text-react/AC-038).
    let unavailable: true | undefined;
    let reason: string | undefined;
    if (!disabled && !state.enabled) {
        unavailable = true;
        reason = strings.reason(state.disabledReason ?? '');
    }
    let onMouseDown: typeof keepFocus | undefined;
    if (keepsFocus) {
        onMouseDown = keepFocus;
    }
    const { shortcut, keyshortcuts } = useShortcut(item);
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <RadixToolbar.Button
                    {...tabStop(outOfTabOrder)}
                    type="button"
                    className={styles.item}
                    aria-label={item.label}
                    aria-pressed={pressed}
                    aria-keyshortcuts={keyshortcuts}
                    aria-disabled={unavailable}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onMouseDown={onMouseDown}
                    onClick={async (event) => {
                        const button = event.currentTarget;
                        if (runtime === undefined || unavailable) {
                            return;
                        }
                        await runItem(runtime, item, keepsFocus);
                        returnFocus(runtime, [button.closest('[role="toolbar"]')]);
                    }}
                >
                    <Icon name={item.icon} />
                </RadixToolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                <span className={styles.tooltip}>
                    <span data-rte-tooltip-label="">{item.label}</span>
                    {shortcut !== undefined && <kbd>{shortcut}</kbd>}
                </span>
                {reason !== undefined && <span className={styles.reason}>{reason}</span>}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};

/**
 * The fixed toolbar on Radix Toolbar: one Tab stop whose items arrow, Home and End move between, in visual order under
 * `rtl` (SPEC-rich-text-react/AC-032, AC-033).
 */
export const FixedToolbar = ({
    items,
    strings,
    disabled,
    surfaceId,
    shortcut,
    testId,
    toolbarRef,
    modeSwitch,
    docked,
}: {
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    /** The editor is `disabled`: every item is disabled and the toolbar leaves the Tab order (SPEC-rich-text-react/AC-029). */
    readonly disabled: boolean;
    readonly surfaceId: string;
    /** The package key binding that moves focus here (SPEC-rich-text-react/AC-079). */
    readonly shortcut: string;
    readonly testId: string;
    /** The toolbar element, which Alt+F10 focuses (SPEC-rich-text-react/AC-034). */
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    /** The More row that switches to the bubble toolbar (SPEC-rich-text-react/AC-095). */
    readonly modeSwitch: ModeSwitch;
    /** The bottom inset of the on-screen keyboard while the toolbar docks above it, else `undefined` (SPEC-rich-text-react/AC-096). */
    readonly docked: number | undefined;
}) => {
    const { dir } = useFondueTheme();
    const apple = useApplePlatform();
    const itemsKey = items.map(({ key }) => key).join(' ');
    const shown = useFitting(toolbarRef, items.length, itemsKey);
    let className = styles.root;
    if (docked !== undefined) {
        className = `${styles.root} ${styles.docked}`;
    }
    return (
        <RadixToolbar.Root
            ref={toolbarRef}
            className={className}
            style={{ insetBlockEnd: docked }}
            dir={dir}
            aria-label={strings.label}
            aria-controls={surfaceId}
            aria-keyshortcuts={ariaShortcut(shortcut, apple)}
            data-test-id={`${testId}-toolbar`}
        >
            {items.slice(0, shown).map((item) => (
                <Item
                    key={item.key}
                    item={item}
                    disabled={disabled}
                    strings={strings}
                    keepsFocus={docked !== undefined}
                    outOfTabOrder={false}
                />
            ))}
            <More
                items={items.slice(shown)}
                strings={strings}
                disabled={disabled}
                keepsFocus={docked !== undefined}
                outOfTabOrder={false}
                modeSwitch={modeSwitch}
            />
        </RadixToolbar.Root>
    );
};
