/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import { BadgeStatus, type BadgeStatusProps } from './BadgeStatus';
import styles from './styles/badge.module.scss';

type BadgeStyle = 'default' | 'positive' | 'highlight' | 'warning' | 'negative';

type BadgeEmphasis = 'strong' | 'weak';

type BadgeProps = {
    /**
     * @default 'strong'
     */
    emphasis?: BadgeEmphasis;
    /**
     * @default 'default'
     */
    variant?: BadgeStyle;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * Click handler
     */
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * @default false
     */
    dismissable?: boolean;
    /**
     * Click handler on dismiss
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * The color of the status dot
     */
    status?: BadgeStatusProps['status'];
    title?: string;
    'aria-label'?: string;
    'data-test-id'?: string;
    children: ReactNode;
};

export const Badge = ({
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'badge',
    children,
    disabled = false,
    dismissable = false,
    emphasis = 'strong',
    onClick,
    onDismiss,
    status,
    title,
    variant,
}: BadgeProps) => {
    const commonProps = {
        'aria-label': ariaLabel || title,
        className: styles.root,
        'data-disabled': disabled,
        'data-dismissable': dismissable,
        'data-emphasis': emphasis,
        'data-test-id': dataTestId,
        'data-variant': variant,
        title,
    };

    const contentProps = {
        'aria-label': ariaLabel || title,
        disabled,
        dismissable,
        onDismiss,
        status,
    };

    if (onClick) {
        return (
            <button disabled={disabled} {...commonProps} onClick={onClick}>
                <BadgeContent {...contentProps}>{children}</BadgeContent>
            </button>
        );
    }

    return (
        <div {...commonProps}>
            <BadgeContent {...contentProps}>{children}</BadgeContent>
        </div>
    );
};

const BadgeContent = ({
    'aria-label': ariaLabel,
    children,
    disabled = false,
    dismissable = false,
    onDismiss,
    status,
}: BadgeProps) => {
    return (
        <>
            {status && <BadgeStatus status={status} />}
            {children}
            {dismissable && (
                <button
                    aria-label={`Dismiss ${ariaLabel}`}
                    className={styles.dismiss}
                    disabled={disabled}
                    onClick={onDismiss}
                >
                    <IconCross size="12" />
                </button>
            )}
        </>
    );
};
