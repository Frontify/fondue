/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/badge.module.scss';

type ButtonStyle = 'default' | 'positive' | 'highlight' | 'warning' | 'negative';

type ButtonEmphasis = 'strong' | 'weak';

type BadgeProps = {
    /**
     * @default 'strong'
     */
    emphasis?: ButtonEmphasis;
    /**
     * @default 'default'
     */
    style?: ButtonStyle;
    /**
     * @default false
     */
    disabled?: boolean;
    'data-test-id'?: string;
    children: ReactNode;
};

export const Badge = ({
    'data-test-id': dataTestId = 'badge',
    children,
    disabled = false,
    emphasis = 'strong',
    style = 'default',
}: BadgeProps) => {
    return (
        <div
            className={styles.root}
            data-disabled={disabled}
            data-emphasis={emphasis}
            data-style={style}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};
