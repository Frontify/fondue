/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { BadgeStatus, type BadgeStatusProps } from './BadgeStatus';
import styles from './styles/badge.module.scss';

type BadgeStyle = 'default' | 'positive' | 'highlight' | 'warning' | 'negative';

type BadgeEmphasis = 'strong' | 'weak';

type BadgeSize = 'default' | 'small';

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
     * @default 'default'
     */
    size?: BadgeSize;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * Click handler
     */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Click handler on dismiss - providing this will show the dismiss button
     */
    onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
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
    emphasis = 'strong',
    onClick,
    onDismiss,
    size = 'default',
    status,
    title,
    variant = 'default',
}: BadgeProps) => {
    const commonProps = {
        'aria-label': ariaLabel || title,
        'data-component': 'badge',
        'data-disabled': disabled,
        'data-dismissable': !!onDismiss,
        'data-emphasis': emphasis,
        'data-size': size,
        'data-test-id': dataTestId,
        'data-variant': variant,
        className: styles.root,
        title,
    };

    const contentProps = {
        'aria-label': ariaLabel || title,
        disabled,
        onDismiss,
        status,
    };

    if (onClick) {
        return (
            <button type="button" disabled={disabled} {...commonProps} onClick={onClick}>
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

const BadgeContent = ({ 'aria-label': ariaLabel, children, disabled = false, onDismiss, status }: BadgeProps) => {
    const { t } = useTranslation();

    return (
        <>
            {status && <BadgeStatus status={status} />}
            {children}
            {onDismiss && (
                <button
                    type="button"
                    aria-label={t('Badge_dismiss', { label: ariaLabel || '' })}
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
