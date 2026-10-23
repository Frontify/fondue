/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip, useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type ComponentType, type MutableRefObject, useCallback, useContext, useRef } from 'react';

import { keepFocus } from '#/bridge/chrome-toolbar';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { useCommandQuery } from '#/bridge/hooks';
import { useOverlayContainer } from '#/bridge/overlays';
import { useApplePlatform } from '#/bridge/platform';
import { type ToolbarControlProps } from '#/bridge/plugin';
import { SessionContext } from '#/bridge/session';
import { ariaShortcut } from '#/ui/shortcuts';

import { Icon, pressItem, runItem, tabStop, type ToolbarItem, type ToolbarStrings, useShortcut } from './item';
import { More, type ModeSwitch } from './more';
import styles from './styles/toolbar.module.scss';
import { TextStyle } from './text-style';
import { useFitting } from './use-fitting';

export { type ToolbarItem, type ToolbarStrings } from './item';
export { More, type ModeSwitch } from './more';

interface ItemProps {
    readonly item: ToolbarItem;
    readonly disabled: boolean;
    readonly strings: ToolbarStrings;
    /** A press leaves focus in the surface: in the bubble toolbar and the docked toolbar. */
    readonly keepsFocus: boolean;
    /** The item takes no Tab stop, as in the bubble toolbar. */
    readonly outOfTabOrder: boolean;
}

/** One toolbar item: a plugin's own control, else the standard button. */
export const Item = (props: ItemProps) => {
    const { item } = props;
    if (item.component !== undefined) {
        return <PluginControl {...props} control={item.component} />;
    }
    return <Button {...props} />;
};

/** A plugin's own control, which the toolbar fits, runs and returns focus from as it does the standard button. */
const PluginControl = ({
    item,
    disabled,
    keepsFocus,
    outOfTabOrder,
    control: Control,
}: ItemProps & { readonly control: ComponentType<ToolbarControlProps> }) => {
    const runtime = useContext(SessionContext);
    const elementRef = useRef<HTMLElement | null>(null);
    const controlRef = useCallback((element: HTMLElement | null) => {
        // The toolbar fits items and moves focus between them by this attribute, so it sits on the focusable control.
        element?.setAttribute('data-rte-toolbar-item', '');
        elementRef.current = element;
    }, []);
    const { shortcut, keyshortcuts } = useShortcut(item);
    const run = async () => {
        const element = elementRef.current;
        if (runtime === undefined) {
            return;
        }
        if (element === null) {
            await runItem(runtime, item, keepsFocus);
            return;
        }
        await pressItem(runtime, item, element, keepsFocus);
    };
    return (
        <span className={styles.control} data-group-start={item.groupStart || undefined}>
            <Control
                label={item.label}
                icon={item.icon}
                disabled={disabled}
                outOfTabOrder={outOfTabOrder}
                controlRef={controlRef}
                run={run}
                shortcut={shortcut}
                keyshortcuts={keyshortcuts}
            />
        </span>
    );
};

/** One toolbar button, with its tooltip in the editor's portal container. */
const Button = ({ item, disabled, strings, keepsFocus, outOfTabOrder }: ItemProps) => {
    const runtime = useContext(SessionContext);
    const container = useOverlayContainer();
    const state = useCommandQuery(item.command, item.payload);
    let pressed: boolean | 'mixed' | undefined;
    if (item.toggle) {
        pressed = state.active;
    }
    // A command the editor cannot run now keeps its item focusable, with the reason in the tooltip.
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
                        if (runtime === undefined || unavailable) {
                            return;
                        }
                        await pressItem(runtime, item, event.currentTarget, keepsFocus);
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
 * `rtl`.
 */
export const FixedToolbar = ({
    items,
    menu,
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
    /** The rows that only More holds, below the items that do not fit. */
    readonly menu: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    /** The editor is `disabled`: every item is disabled and the toolbar leaves the Tab order. */
    readonly disabled: boolean;
    readonly surfaceId: string;
    /** The package key binding that moves focus here. */
    readonly shortcut: string;
    readonly testId: string;
    /** The toolbar element, which Alt+F10 focuses. */
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    /** The More row that switches to the bubble toolbar. */
    readonly modeSwitch: ModeSwitch;
    /** The bottom inset of the on-screen keyboard while the toolbar docks above it, else `undefined`. */
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
    // A transformed ancestor, as a host dialog's, moves the origin of fixed positioning, so it is measured first, as
    // Fondue's `Dropdown` places its virtual trigger.
    useClientLayoutEffect(() => {
        const element = toolbarRef.current;
        const view = element?.ownerDocument.defaultView;
        if (element === null || view === null || view === undefined || docked === undefined) {
            return undefined;
        }
        element.style.insetBlockStart = '0px';
        const { top, height } = element.getBoundingClientRect();
        element.style.insetBlockStart = `${view.innerHeight - docked - height - top}px`;
        return () => {
            element.style.insetBlockStart = '';
        };
    }, [toolbarRef, docked]);
    return (
        <RadixToolbar.Root
            ref={toolbarRef}
            className={className}
            dir={dir}
            aria-label={strings.label}
            aria-controls={surfaceId}
            aria-keyshortcuts={ariaShortcut(shortcut, apple)}
            data-test-id={`${testId}-toolbar`}
        >
            {items.slice(0, shown).map((item) => {
                if (item.options !== undefined) {
                    return (
                        <TextStyle
                            key={item.key}
                            item={item}
                            disabled={disabled}
                            keepsFocus={docked !== undefined}
                            outOfTabOrder={false}
                        />
                    );
                }
                return (
                    <Item
                        key={item.key}
                        item={item}
                        disabled={disabled}
                        strings={strings}
                        keepsFocus={docked !== undefined}
                        outOfTabOrder={false}
                    />
                );
            })}
            <More
                items={[...items.slice(shown), ...menu]}
                strings={strings}
                disabled={disabled}
                keepsFocus={docked !== undefined}
                outOfTabOrder={false}
                modeSwitch={modeSwitch}
            />
        </RadixToolbar.Root>
    );
};
