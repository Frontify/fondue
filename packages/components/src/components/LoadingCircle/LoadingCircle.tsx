/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import styles from './styles/loadingCircleStyles.module.scss';

export type LoadingCircleProps = {
    /**
     * The  variant of the loading circle.
     * @default 'progress'
     */
    variant?: 'progress' | 'success' | 'danger';
    /**
     * The size of the loading circle
     * @default "medium"
     */
    size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
    'data-test-id'?: string;
};

export const LoadingCircle = forwardRef<HTMLDivElement, LoadingCircleProps>(
    (
        {
            variant = 'progress',
            size = 'medium',
            'data-test-id': dataTestId = 'fondue-loading-circle-content',
        }: LoadingCircleProps,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <div
                ref={ref}
                data-test-id={dataTestId}
                data-variant={variant}
                data-size={size}
                className={styles.root}
            ></div>
        );
    },
);
LoadingCircle.displayName = 'LoadingCircle';
