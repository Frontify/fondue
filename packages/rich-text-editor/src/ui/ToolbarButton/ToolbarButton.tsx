/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Tooltip } from '@frontify/fondue-components';
import { type ButtonHTMLAttributes, type ComponentProps, forwardRef, type ReactNode, useState } from 'react';

import { ariaKeyShortcut, readableShortcut } from '../shortcut';

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
