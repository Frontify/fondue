/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button as FondueButton, Tooltip } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type ComponentType, useCallback, useContext, useRef } from 'react';

import { keepFocus } from '#/bridge/chromeToolbar';
import { useCommandQuery } from '#/bridge/hooks';
import { useOverlayContainer } from '#/bridge/overlays';
import { type ToolbarControlProps } from '#/bridge/pluginApi/plugin';
import { SessionContext } from '#/bridge/session';
import { pressItem, runItem, tabStop, type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { useOpenPanel } from '#/ui/hooks/useOpenPanel';
import { useShortcut } from '#/ui/hooks/useShortcut';
import styles from '#/ui/styles/toolbar.module.scss';

import { ToolbarIcon } from './ToolbarIcon';

export type ItemProps = {
    item: ToolbarItem;
    disabled: boolean;
    strings: ToolbarStrings;
    /** A press leaves focus in the surface: in the bubble toolbar and the docked toolbar. */
    keepsFocus: boolean;
    /** The item takes no Tab stop, as in the bubble toolbar. */
    outOfTabOrder: boolean;
};

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
}: ItemProps & { control: ComponentType<ToolbarControlProps> }) => {
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
    const openPanel = useOpenPanel();
    const state = useCommandQuery(item.command, item.payload);
    let pressed: boolean | 'mixed' | undefined;
    if (item.toggle) {
        pressed = state.active;
        if (item.control !== undefined && item.control === openPanel) {
            pressed = true;
        }
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
                    asChild
                    {...tabStop(outOfTabOrder)}
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
                    <FondueButton size="small" aspect="square" emphasis="weak">
                        <ToolbarIcon name={item.icon} />
                    </FondueButton>
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
