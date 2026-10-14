/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { type ButtonHTMLAttributes, type ComponentProps, forwardRef, type MouseEvent, type ReactNode } from 'react';

import styles from './toolbarButton.module.scss';

type ToolbarButtonProps = {
    children: ReactNode;
    /** Omit for buttons that are actions rather than toggles — it drives `aria-pressed`. */
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    /** Accessible name and tooltip. Required: the labels are icons, which have no name of their own. */
    title: string;
    /** The matching hotkey, written as in a plugin's `hotkeys` (`Mod-b`). Shown in the tooltip and `aria-keyshortcuts`; the binding is the plugin's. */
    shortcut?: string;
    // Other props reach the button so it works as a `Flyout.Trigger`, whose injected handlers and `aria-expanded` must hit the DOM.
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'title' | 'children'>;

const isApple = (): boolean => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/** `Mod-Shift-x` as `aria-keyshortcuts` spells it: `Meta+Shift+X` on Apple systems, `Control+Shift+X` elsewhere. */
export const ariaKeyShortcut = (shortcut: string, apple = isApple()): string =>
    shortcut
        .split('-')
        .map((part) => (part === 'Mod' ? (apple ? 'Meta' : 'Control') : part.length === 1 ? part.toUpperCase() : part))
        .join('+');

const APPLE_SYMBOLS: Record<string, string> = { Mod: '⌘', Shift: '⇧', Alt: '⌥', Ctrl: '⌃' };

/** `Mod-Shift-x` as people read it: `⌘⇧X` on Apple systems, `Ctrl+Shift+X` elsewhere. */
export const readableShortcut = (shortcut: string, apple = isApple()): string => {
    const parts = shortcut.split('-').map((part) => (part.length === 1 ? part.toUpperCase() : part));
    return apple
        ? parts.map((part) => APPLE_SYMBOLS[part] ?? part).join('')
        : parts.map((part) => (part === 'Mod' ? 'Ctrl' : part)).join('+');
};

/**
 * The toolbar button the built-in plugins share: Fondue's low-emphasis `Button`
 * with a pressed state for toggles. Not editor API. Takes a ref so a flyout can anchor to it.
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

    return (
        <Button
            {...domProps}
            ref={ref}
            type="button"
            size="medium"
            // Both states are the ghost button; "on" is drawn by our stylesheet.
            emphasis="weak"
            className={[styles.button, className].filter(Boolean).join(' ')}
            disabled={disabled}
            title={shortcut === undefined ? title : `${title} (${readableShortcut(shortcut)})`}
            aria-label={title}
            onPress={onClick}
        >
            {children}
        </Button>
    );
});
