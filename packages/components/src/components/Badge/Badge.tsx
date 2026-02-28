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
    /**
     * Test ID applied to the badge root element. The dismiss button (when present) uses this value suffixed with `-dismiss`.
     * @default 'badge'
     */
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
    const { t } = useTranslation();

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

    const dismissButton = onDismiss ? (
        <button
            type="button"
            aria-label={t('Badge_dismiss', { label: ariaLabel || title || '' })}
            className={styles.dismiss}
            data-test-id={`${dataTestId}-dismiss`}
            disabled={disabled}
            onClick={onDismiss}
        >
            <IconCross size="12" />
        </button>
    ) : null;

    // When both onClick and onDismiss are provided, render as siblings inside a
    // wrapper div to avoid nesting interactive elements (invalid HTML / a11y issue).
    if (onClick && onDismiss) {
        return (
            <div {...commonProps}>
                <button
                    type="button"
                    aria-label={ariaLabel || title}
                    className={styles.inner}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <BadgeContent status={status}>{children}</BadgeContent>
                </button>
                {dismissButton}
            </div>
        );
    }

    if (onClick) {
        return (
            <button type="button" disabled={disabled} {...commonProps} onClick={onClick}>
                <BadgeContent status={status}>{children}</BadgeContent>
            </button>
        );
    }

    return (
        <div {...commonProps}>
            <BadgeContent status={status}>{children}</BadgeContent>
            {dismissButton}
        </div>
    );
};

const BadgeContent = ({ children, status }: { children: ReactNode; status?: BadgeStatusProps['status'] }) => (
    <>
        {status && <BadgeStatus status={status} />}
        {children}
    </>
);
