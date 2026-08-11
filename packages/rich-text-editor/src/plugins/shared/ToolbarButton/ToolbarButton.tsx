/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { type ButtonHTMLAttributes, type ComponentProps, forwardRef, type MouseEvent, type ReactNode } from 'react';

type ToolbarButtonProps = {
    children: ReactNode;
    /** Omit for buttons that are actions rather than toggles — it drives `aria-pressed`. */
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    /**
     * Names the button and gives it its tooltip. Required, because every label is
     * an icon: an icon carries no accessible name of its own, so without this
     * there is nothing for a screen reader to announce.
     */
    title: string;
    /**
     * Anything else lands on the button. This is what lets the button be used as
     * a `Flyout.Trigger`: the flyout clones it with its own handler and its
     * `aria-expanded`/`data-state` attributes, and they have to reach the DOM.
     */
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'title' | 'children'>;

/**
 * Shared chrome for the built-in toolbar buttons: Fondue's `Button` in its
 * small, low-emphasis form. Not part of the editor's API — a plugin's toolbar
 * is plain React, so this is simply a local component the shipped plugins
 * happen to share.
 *
 * Takes a ref because a flyout trigger has to be able to anchor to it.
 */
export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(function ToolbarButton(
    { children, active, disabled, onClick, title, ...rest },
    ref,
): ReactNode {
    // Fondue's Button declares only the props it acts on and spreads the rest
    // onto the <button>, so the attributes a toolbar toggle needs still reach
    // the DOM without being part of its prop type: the pressed state, the
    // mousedown handler below, and whatever a flyout clones onto its trigger.
    const domProps = {
        ...rest,
        'aria-pressed': active,
        onMouseDown: (event: MouseEvent<HTMLButtonElement>) => {
            // Never take the selection away from the editor. Done before
            // handing the event on, so a flyout trigger still sees it.
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
            // Fondue has no toggle button, so the two states borrow the closest
            // pair it does have: the quiet filled button for on, the ghost for off.
            emphasis={active === true ? 'default' : 'weak'}
            disabled={disabled}
            title={title}
            aria-label={title}
            onPress={onClick}
        >
            {children}
        </Button>
    );
});
