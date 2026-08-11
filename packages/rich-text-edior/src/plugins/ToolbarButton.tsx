/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ButtonHTMLAttributes, type CSSProperties, forwardRef, type ReactNode } from 'react';

type ToolbarButtonProps = {
    children: ReactNode;
    /** Omit for buttons that are actions rather than toggles — it drives `aria-pressed`. */
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    style?: CSSProperties;
    /** Names a button whose label is only a symbol; also its tooltip. */
    title?: string;
    /**
     * Anything else lands on the button. This is what lets the button be used as
     * a `Flyout.Trigger`: the flyout clones it with its own handler and its
     * `aria-expanded`/`data-state` attributes, and they have to reach the DOM.
     */
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'style' | 'title' | 'children'>;

/**
 * Shared chrome for the built-in toolbar buttons. Not part of the editor's
 * API: a plugin's toolbar is plain React, so this is simply a local component
 * the shipped plugins happen to share.
 *
 * Takes a ref because a flyout trigger has to be able to anchor to it.
 */
export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(function ToolbarButton(
    { children, active, disabled, onClick, style, title, ...rest },
    ref,
): ReactNode {
    return (
        <button
            {...rest}
            ref={ref}
            type="button"
            aria-pressed={active}
            aria-label={title ?? rest['aria-label']}
            title={title}
            disabled={disabled}
            onMouseDown={(event) => {
                // Never take the selection away from the editor. Done before
                // handing the event on, so a flyout trigger still sees it.
                event.preventDefault();
                rest.onMouseDown?.(event);
            }}
            onClick={onClick}
            style={{
                fontSize: 13,
                lineHeight: 1,
                padding: '3px 8px',
                border: '1px solid #d1d5db',
                borderRadius: 4,
                color: '#374151',
                fontFamily: 'inherit',
                background: active ? '#e5e7eb' : 'transparent',
                cursor: disabled ? 'default' : 'pointer',
                opacity: disabled ? 0.4 : 1,
                ...style,
            }}
        >
            {children}
        </button>
    );
});
