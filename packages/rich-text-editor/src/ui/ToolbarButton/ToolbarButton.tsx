/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Tooltip } from '@frontify/fondue-components';
import {
    type ButtonHTMLAttributes,
    type ComponentProps,
    forwardRef,
    type MouseEvent,
    type ReactNode,
    useState,
} from 'react';

import { isApple } from '../platform';

import styles from './toolbarButton.module.scss';

type ToolbarButtonProps = {
    children: ReactNode;
    /**
     * Whether the toggle is on; drives `aria-pressed`. `'mixed'` means only part of the selection has it. Omit for buttons that are actions, not toggles.
     */
    active?: boolean | 'mixed';
    disabled?: boolean;
    onClick?: () => void;
    /**
     * Accessible name and tooltip. Required: the labels are icons, which have no name of their own.
     */
    title: string;
    /**
     * The matching hotkey, written as in a plugin's `hotkeys` (`Mod-b`). Shown in the tooltip and `aria-keyshortcuts`; the binding is the plugin's.
     */
    shortcut?: string;
    // Other props reach the button so it works as a `Flyout.Trigger`, whose injected handlers and `aria-expanded` must hit the DOM.
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'title' | 'children'>;

/**
 * `Mod-Shift-x` as `aria-keyshortcuts` spells it: `Meta+Shift+X` on Apple systems, `Control+Shift+X` elsewhere
 */
export const ariaKeyShortcut = (shortcut: string, apple = isApple()): string =>
    shortcut
        .split('-')
        .map((part) => (part === 'Mod' ? (apple ? 'Meta' : 'Control') : part.length === 1 ? part.toUpperCase() : part))
        .join('+');

const APPLE_SYMBOLS: Record<string, string> = { Mod: '⌘', Shift: '⇧', Alt: '⌥', Ctrl: '⌃' };

/**
 * The order macOS menus list modifiers in, whatever order the shortcut is written in
 */
const APPLE_MODIFIER_ORDER = ['Ctrl', 'Alt', 'Shift', 'Mod'];

const appleOrder = (part: string): number => {
    const index = APPLE_MODIFIER_ORDER.indexOf(part);
    if (index === -1) {
        return APPLE_MODIFIER_ORDER.length;
    }
    return index;
};

/**
 * `Mod-Shift-x` as people read it: `⇧⌘X` on Apple systems, `Ctrl+Shift+X` elsewhere
 */
export const readableShortcut = (shortcut: string, apple = isApple()): string => {
    const parts = shortcut.split('-').map((part) => (part.length === 1 ? part.toUpperCase() : part));
    if (apple) {
        const ordered = [...parts].sort((first, second) => appleOrder(first) - appleOrder(second));
        return ordered.map((part) => APPLE_SYMBOLS[part] ?? part).join('');
    }
    return parts.map((part) => (part === 'Mod' ? 'Ctrl' : part)).join('+');
};

/**
 * The toolbar button the built-in plugins share: Fondue's small square
 * low-emphasis `Button` with a pressed state for toggles and a tooltip naming
 * it. Not editor API. Takes a ref so a flyout can anchor to it.
 */
export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(function ToolbarButton(
    { children, active, disabled, onClick, title, shortcut, className, ...rest },
    ref,
): ReactNode {
    // Fondue's Button spreads undeclared props onto the <button>, so these still reach the DOM.
    const domProps = {
        ...rest,
        'aria-pressed': active,
        'aria-keyshortcuts': shortcut === undefined ? undefined : ariaKeyShortcut(shortcut),
        onMouseDown: (event: MouseEvent<HTMLButtonElement>) => {
            // Keep the selection in the editor; runs before the flyout trigger's own handler.
            event.preventDefault();
            rest.onMouseDown?.(event);
        },
    } as ComponentProps<typeof Button>;

    const [tooltipOpen, setTooltipOpen] = useState(false);
    // A flyout this button opened is the layer Escape belongs to; a tooltip over it would take the key first.
    const ownFlyoutOpen = rest['aria-expanded'] === true || rest['aria-expanded'] === 'true';
    // Nor does it come back as the flyout closes, over a pointer that rested here, to take the next Escape.
    if (ownFlyoutOpen && tooltipOpen) {
        setTooltipOpen(false);
    }

    return (
        <Tooltip.Root
            open={tooltipOpen}
            onOpenChange={(next) => {
                if (!ownFlyoutOpen) {
                    setTooltipOpen(next);
                }
            }}
        >
            <Tooltip.Trigger asChild>
                <Button
                    {...domProps}
                    ref={ref}
                    type="button"
                    size="small"
                    aspect="square"
                    // Both states are the ghost button; "on" is drawn by our stylesheet.
                    emphasis="weak"
                    className={[styles.button, className].filter(Boolean).join(' ')}
                    disabled={disabled}
                    aria-label={title}
                    onPress={onClick}
                >
                    {children}
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact">
                <span className={styles.tooltip}>
                    <span>{title}</span>
                    {shortcut === undefined ? null : <kbd>{readableShortcut(shortcut)}</kbd>}
                </span>
            </Tooltip.Content>
        </Tooltip.Root>
    );
});
