/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ComponentProps, type ForwardedRef, type MouseEventHandler, type ReactNode } from 'react';

import styles from './styles/card.module.scss';

export type CardActionProps = {
    'data-test-id'?: string;
    children?: ReactNode;
};

export const CardAction = (
    { 'data-test-id': dataTestId = 'fondue-card-action', children }: CardActionProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.action} data-test-id={dataTestId}>
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
} & Omit<ComponentProps<'button'>, 'children' | 'ref' | 'onClick' | 'aria-label'>;

export const CardActionButton = (
    {
        'data-test-id': dataTestId = 'fondue-card-action-button',
        'aria-label': ariaLabel,
        onClick,
        children,
        ...rest
    }: CardActionButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <button
            ref={ref}
            className={styles.actionButton}
            data-test-id={dataTestId}
            aria-label={ariaLabel}
            type="button"
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};
CardActionButton.displayName = 'Card.ActionButton';
