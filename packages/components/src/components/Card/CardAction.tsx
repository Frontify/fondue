/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ComponentProps, type ForwardedRef, type MouseEventHandler, type ReactNode } from 'react';

import { Button } from '../Button/Button';

import styles from './styles/card.module.scss';

/**
 * Wraps a single action in the card's action area. Any extra props — notably
 * `data-*` attributes (e.g. an analytics/onboarding-tour selector) — are
 * forwarded to the underlying `<div>`, so consumers don't need an extra wrapper.
 */
export type CardActionProps = {
    'data-test-id'?: string;
    children?: ReactNode;
} & Omit<ComponentProps<'div'>, 'children' | 'ref' | 'className'>;

export const CardAction = (
    { 'data-test-id': dataTestId = 'fondue-card-action', children, ...rest }: CardActionProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.action} data-test-id={dataTestId} {...rest}>
            {children}
        </div>
    );
};
CardAction.displayName = 'Card.Action';

export const ForwardedRefCardAction = forwardRef<HTMLDivElement, CardActionProps>(CardAction);

export type CardActionButtonProps = {
    'data-test-id'?: string;
    /**
     * Accessible label for the button.
     */
    'aria-label'?: string;
    /**
     * Click callback for the button.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
} & Omit<ComponentProps<'button'>, 'children' | 'ref' | 'onClick' | 'aria-label' | 'role'>;

export const CardActionButton = (
    {
        'data-test-id': dataTestId = 'fondue-card-action-button',
        'aria-label': ariaLabel,
        children,
        ...rest
    }: CardActionButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <Button
            ref={ref}
            data-test-id={dataTestId}
            aria-label={ariaLabel}
            emphasis="weak"
            size="small"
            aspect="square"
            {...rest}
        >
            {children}
        </Button>
    );
};
CardActionButton.displayName = 'Card.ActionButton';
