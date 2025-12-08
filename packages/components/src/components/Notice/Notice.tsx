/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import styles from './styles/notice.module.scss';

type NoticeVariant = 'default' | 'highlight' | 'positive' | 'danger' | 'warning';

type NoticeEmphasis = 'default' | 'strong' | 'weak';

type NoticeSize = 'medium' | 'large';

export type NoticeProps = {
    /**
     * @default 'default'
     */
    variant?: NoticeVariant;
    /**
     * @default 'default'
     */
    emphasis?: NoticeEmphasis;
    /**
     * @default 'medium'
     */
    size?: NoticeSize;
    /**
     * Leading icon element
     */
    icon?: ReactNode;
    /**
     * Action element (typically a button)
     */
    action?: ReactNode;
    /**
     * Callback when the dismiss button is clicked
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Custom aria-label for the dismiss button
     */
    'aria-label'?: string;
    /**
     * Test ID for the component
     */
    'data-test-id'?: string;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Message content
     */
    children: ReactNode;
};

export const Notice = ({
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'notice',
    variant = 'default',
    emphasis = 'default',
    size = 'medium',
    icon,
    action,
    onDismiss,
    className = '',
    children,
}: NoticeProps) => {
    const { t } = useTranslation();

    return (
        <div
            data-component="notice"
            data-variant={variant}
            data-emphasis={emphasis}
            data-size={size}
            data-test-id={dataTestId}
            className={`${styles.root} ${className}`.trim()}
            role="status"
            aria-live="polite"
        >
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.content}>{children}</div>
            {action && <div className={styles.action}>{action}</div>}
            {onDismiss && (
                <button
                    type="button"
                    aria-label={ariaLabel || t('Notice_dismiss')}
                    className={styles.dismiss}
                    onClick={onDismiss}
                >
                    <IconCross size={size === 'large' ? '20' : '16'} />
                </button>
            )}
        </div>
    );
};
