/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { type MouseEvent, useCallback, type ReactNode } from 'react';

import { Button } from '../Button/Button';

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
    style?: BadgeStyle;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * @default false
     */
    dismissable?: boolean;
    /**
     * Click handler on dismiss
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;
    'data-test-id'?: string;
    children: ReactNode;
};

export const Badge = ({
    'data-test-id': dataTestId = 'badge',
    children,
    disabled = false,
    dismissable = false,
    emphasis = 'strong',
    onDismiss,
    style = 'default',
}: BadgeProps) => {
    const handleDismissPress = useCallback((event: MouseEvent<HTMLButtonElement>) => onDismiss?.(event), [onDismiss]);

    return (
        <div
            className={styles.root}
            data-disabled={disabled}
            data-dismissable={dismissable}
            data-emphasis={emphasis}
            data-style={style}
            data-test-id={dataTestId}
        >
            {children}
            {dismissable && (
                <button className={styles.dismiss} disabled={disabled} onClick={handleDismissPress}>
                    <IconCross size="16" />
                </button>
            )}
        </div>
    );
};
