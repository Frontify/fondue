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
     * Controls visual weight. Use `'strong'` for high-priority information, `'weak'` for subtle or secondary content.
     * @default 'strong'
     */
    emphasis?: BadgeEmphasis;
    /**
     * Conveys the tone. `'default'` for neutral, `'positive'` for success, `'highlight'` for informational, `'warning'` for caution, `'negative'` for critical.
     * @default 'default'
     */
    variant?: BadgeStyle;
    /**
     * Controls the badge size. Use `'small'` when space is limited or the badge plays a secondary role.
     * @default 'default'
     */
    size?: BadgeSize;
    /**
     * Prevents interaction and dims the badge visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Click handler. When provided, the badge renders as a button element.
     */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Dismiss handler. When provided, a dismiss button is shown, useful for filters or removable selections.
     */
    onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Displays a status dot to reflect live states or activity. Accepts a preset (`'positive'`, `'warning'`, etc.) or a custom color value.
     */
    status?: BadgeStatusProps['status'];
    /**
     * Tooltip text shown on hover. Also used as the accessible name when no `aria-label` is provided.
     */
    title?: string;
    'aria-label'?: string;
    'data-test-id'?: string;
    /**
     * The badge content — typically short text, a number, or a label.
     */
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
