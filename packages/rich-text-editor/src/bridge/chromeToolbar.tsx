/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button as FondueButton, Dropdown, Tooltip, useFondueTheme } from '@frontify/fondue-components';
import { IconCheckMark } from '@frontify/fondue-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import { type JsonValue } from '#/model';

import { useEditorOverlay, useOverlayContainer } from './overlays';
import { type EditorApi, type OverlayProps, useEditorApi } from './plugin';
import styles from './styles/chromeToolbar.module.scss';

// Node chrome sits inside the surface, so its controls take no Tab stop of their own; Alt+F10 reaches them.
const OUT_OF_TAB_ORDER = -1;

/** The node chrome toolbar: one Alt+F10 stop with arrow-key movement between its buttons. */
export const NodeChromeToolbar = ({
    'aria-label': label,
    children,
}: {
    readonly 'aria-label': string;
    readonly children: ReactNode;
}) => {
    // Radix writes `ltr` unless told, so the arrows follow the theme's visual order.
    const { dir } = useFondueTheme();
    return (
        <Toolbar.Root aria-label={label} dir={dir} tabIndex={OUT_OF_TAB_ORDER} data-rte-node-chrome="">
            {children}
        </Toolbar.Root>
    );
};
NodeChromeToolbar.displayName = 'NodeChromeToolbar';

/**
 * A button of `NodeChromeToolbar`; `label` is its accessible name, and its content when it has no `icon`, else its
 * tooltip.
 */
export const NodeChromeButton = ({
    label,
    icon,
    pressed,
    disabled,
    describedBy,
    onClick,
}: {
    readonly label: string;
    readonly icon?: ReactNode;
    readonly pressed?: boolean;
    readonly disabled?: boolean;
    /** The `id` of the text that describes the button, such as a prompt shown beside the chrome. */
    readonly describedBy?: string;
    readonly onClick: () => void;
}) => {
    const container = useOverlayContainer();
    const button = (
        <Toolbar.Button
            type="button"
            className={styles.button}
            aria-label={label}
            aria-describedby={describedBy}
            aria-pressed={pressed}
            disabled={disabled}
            tabIndex={OUT_OF_TAB_ORDER}
            onClick={onClick}
        >
            {icon ?? label}
        </Toolbar.Button>
    );
    if (icon === undefined) {
        return button;
    }
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                {label}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};
NodeChromeButton.displayName = 'NodeChromeButton';

/** The Fondue-button item for chrome toolbars with few buttons; `NodeChromeButton` stays plain for node chrome's mount cost. */
export const ChromeToolbarButton = ({
    label,
    icon,
    describedBy,
    onPress,
}: {
    /** The accessible name and the tooltip. */
    readonly label: string;
    readonly icon: ReactNode;
    /** The `id` of the text that describes the button. */
    readonly describedBy?: string;
    readonly onPress: (control: HTMLElement) => void;
}) => {
    const container = useOverlayContainer();
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Toolbar.Button
                    asChild
                    tabIndex={OUT_OF_TAB_ORDER}
                    className={styles.fondueButton}
                    aria-label={label}
                    aria-describedby={describedBy}
                    onMouseDown={keepFocus}
                    onClick={(event) => {
                        onPress(event.currentTarget);
                    }}
                >
                    <FondueButton size="small" aspect="square" emphasis="weak">
                        {icon}
                    </FondueButton>
                </Toolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                {label}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};
ChromeToolbarButton.displayName = 'ChromeToolbarButton';

/**
 * A node chrome button that opens a Fondue `Dropdown` of `children`, its items, with focus on the checked item, else
 * the first; Radix returns focus to the button when the menu closes. `label` is the button's accessible name and
 * holds its visible `text`.
 */
export const NodeChromeMenu = ({
    label,
    text,
    command,
    onCloseAutoFocus,
    children,
}: {
    readonly label: string;
    readonly text: string;
    /** The command its items run, which the button names in `data-rte-command`, as a drag's alternative does. */
    readonly command?: string;
    /** Runs as the closed menu returns focus, which `event.preventDefault()` keeps where an item sent it. */
    readonly onCloseAutoFocus?: (event: Event) => void;
    readonly children: ReactNode;
}) => {
    const container = useOverlayContainer();
    const [open, setOpen] = useState(false);
    // A touch toggles the menu on its release over the button, so a press that becomes a scroll changes nothing.
    const touchRef = useRef(false);
    const openAtPressRef = useRef(false);
    // Radix focuses the first item as the menu opens, so the checked one takes focus a frame later.
    const focusChecked = useCallback((content: HTMLDivElement | null) => {
        if (content === null) {
            return;
        }
        requestAnimationFrame(() =>
            content.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]')?.focus(),
        );
    }, []);
    return (
        <Dropdown.Root
            open={open}
            onOpenChange={(next) => {
                if (!touchRef.current) {
                    setOpen(next);
                }
            }}
        >
            <Dropdown.Trigger asChild>
                <Toolbar.Button
                    type="button"
                    className={styles.button}
                    aria-label={label}
                    tabIndex={OUT_OF_TAB_ORDER}
                    data-rte-command={command}
                    onPointerDown={(event) => {
                        touchRef.current = event.pointerType !== 'mouse';
                        openAtPressRef.current = open;
                    }}
                    onPointerCancel={() => {
                        touchRef.current = false;
                    }}
                    onPointerUp={(event) => {
                        const touched = touchRef.current;
                        touchRef.current = false;
                        if (!touched) {
                            return;
                        }
                        const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
                        const { clientX, clientY } = event;
                        if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
                            setOpen(!openAtPressRef.current);
                        }
                    }}
                >
                    {text}
                </Toolbar.Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                ref={focusChecked}
                container={container}
                {...(onCloseAutoFocus === undefined ? {} : { onCloseAutoFocus })}
            >
                {children}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
NodeChromeMenu.displayName = 'NodeChromeMenu';

/** One item of a node chrome menu: a radio item when `checked` is set, else a plain item. */
export const OptionItem = ({
    checked,
    onSelect,
    children,
}: {
    readonly checked?: boolean | undefined;
    readonly onSelect: () => void;
    readonly children: ReactNode;
}) => {
    let semantics = {};
    if (checked !== undefined) {
        semantics = { role: 'menuitemradio', 'aria-checked': checked };
    }
    return (
        // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
        <Dropdown.Item {...semantics} onSelect={onSelect}>
            {children}
        </Dropdown.Item>
    );
};
OptionItem.displayName = 'OptionItem';

/** One choice of an options menu: the command it runs, with its payload, on the node the menu opened for. */
export type MenuOption = {
    readonly key: string;
    readonly label: string;
    readonly command: string;
    readonly payload?: JsonValue;
    /** A radio item, checked or not; a plain item without. */
    readonly checked?: boolean;
    /** The option runs nothing and keeps the selection: it only closes the menu and returns focus to the surface. */
    readonly inert?: boolean;
};

/**
 * A node chrome menu that a command opens at the selection, as a More row does: focus on the checked item, else the
 * first; an item selects the node the menu opened for, then runs its command and returns focus to the surface, and
 * Escape returns focus to the opener.
 */
export const OptionsMenu = ({
    label,
    options,
    node,
    close: onClose,
}: OverlayProps & {
    readonly label: string;
    readonly options: readonly MenuOption[];
    /** The node the menu acts on, wherever the selection goes while it is open. */
    readonly node: Parameters<EditorApi['select']>[0];
}) => {
    const api = useEditorApi();
    const [open, setOpen] = useState(true);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const { contentRef } = overlay;
    // Radix focuses the content of a menu with no trigger, so the checked item takes focus a frame later.
    const focusChecked = useCallback(
        (content: HTMLDivElement | null) => {
            contentRef(content);
            if (content === null) {
                return;
            }
            requestAnimationFrame(() =>
                (
                    content.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]') ??
                    content.querySelector<HTMLElement>('[role^="menuitem"]')
                )?.focus(),
            );
        },
        [contentRef],
    );
    return (
        <Dropdown.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Dropdown.Content ref={focusChecked} aria-label={label} container={overlay.container}>
                {options.map((option) => (
                    <OptionItem
                        key={option.key}
                        checked={option.checked}
                        onSelect={() => {
                            overlay.returnFocusTo(null);
                            close(false);
                            if (option.inert === true) {
                                api?.focus();
                                return;
                            }
                            api?.select(node);
                            api?.commands.execute(option.command, option.payload);
                        }}
                    >
                        {option.label}
                    </OptionItem>
                ))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

/** The check mark of a checked menu row, so its state shows by more than colour. */
export const CheckedSlot = () => (
    <Dropdown.Slot name="right">
        <IconCheckMark size={16} aria-hidden />
    </Dropdown.Slot>
);

/**
 * A press that keeps focus and the on-screen keyboard in the surface. It
 * prevents the `mousedown` that moves focus, since WebKit drops the click of a touch whose `pointerdown` was prevented.
 */
export const keepFocus = (event: { preventDefault(): void }): void => event.preventDefault();
