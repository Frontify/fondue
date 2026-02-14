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
     * Communicates the tone and intent. `'default'` for neutral messages, `'highlight'` for noteworthy information, `'positive'` for success, `'warning'` for caution, `'danger'` for critical errors — use sparingly.
     * @default 'default'
     */
    variant?: NoticeVariant;
    /**
     * Controls visual weight. `'default'` for standard messages, `'strong'` for critical or high-priority information, `'weak'` for subtle, non-urgent messages.
     * @default 'default'
     */
    emphasis?: NoticeEmphasis;
    /**
     * Controls the notice size. `'medium'` for standard use, `'large'` for more prominent messages.
     * @default 'medium'
     */
    size?: NoticeSize;
    /**
     * Leading icon element to enhance recognizability and convey the notice's function at a glance.
     */
    icon?: ReactNode;
    /**
     * Action element (typically a Button). Use when there's a clear, lightweight action related to the message content.
     */
    action?: ReactNode;
    /**
     * Callback when the dismiss button is clicked. When provided, a close icon is displayed allowing users to remove the message.
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
            className={[styles.root, className].filter(Boolean).join(' ')}
            role="status"
            aria-live="polite"
        >
            {icon ? <div className={styles.icon}>{icon}</div> : null}
            <div className={styles.content}>{children}</div>
            {action ? <div className={styles.action}>{action}</div> : null}
            {onDismiss ? (
                <button
                    type="button"
                    aria-label={ariaLabel || t('Notice_dismiss')}
                    className={styles.dismiss}
                    onClick={onDismiss}
                >
                    <IconCross size={size === 'large' ? '20' : '16'} />
                </button>
            ) : null}
        </div>
    );
};
