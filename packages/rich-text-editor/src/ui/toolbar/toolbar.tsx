/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip, useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject, useContext } from 'react';

import { SessionContext, useCommandQuery } from '#/bridge/hooks';
import { ariaShortcut, useApplePlatform } from '#/ui/shortcuts';

import { Icon, returnFocus, runItem, type ToolbarItem, type ToolbarStrings, useShortcut } from './item';
import { More } from './more';
import styles from './styles/toolbar.module.scss';
import { useFitting } from './use-fitting';

export { type ToolbarItem, type ToolbarStrings } from './item';

const Item = ({
    item,
    disabled,
    strings,
}: {
    readonly item: ToolbarItem;
    readonly disabled: boolean;
    readonly strings: ToolbarStrings;
}) => {
    const runtime = useContext(SessionContext);
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
    const { shortcut, keyshortcuts } = useShortcut(item);
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <RadixToolbar.Button
                    type="button"
                    className={styles.item}
                    aria-label={item.label}
                    aria-pressed={pressed}
                    aria-keyshortcuts={keyshortcuts}
                    aria-disabled={unavailable}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onClick={async (event) => {
                        const button = event.currentTarget;
                        if (runtime === undefined || unavailable) {
                            return;
                        }
                        await runItem(runtime, item);
                        returnFocus(runtime, [button.closest('[role="toolbar"]')]);
                    }}
                >
                    <Icon name={item.icon} />
                </RadixToolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact">
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
}) => {
    const { dir } = useFondueTheme();
    const apple = useApplePlatform();
    const itemsKey = items.map(({ key }) => key).join(' ');
    const shown = useFitting(toolbarRef, items.length, itemsKey);
    return (
        <RadixToolbar.Root
            ref={toolbarRef}
            className={styles.root}
            dir={dir}
            aria-label={strings.label}
            aria-controls={surfaceId}
            aria-keyshortcuts={ariaShortcut(shortcut, apple)}
            data-test-id={`${testId}-toolbar`}
        >
            {items.slice(0, shown).map((item) => (
                <Item key={item.key} item={item} disabled={disabled} strings={strings} />
            ))}
            {shown < items.length && <More items={items.slice(shown)} strings={strings} disabled={disabled} />}
        </RadixToolbar.Root>
    );
};
