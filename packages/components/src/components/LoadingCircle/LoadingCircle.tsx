/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ForwardedRef } from 'react';

import styles from './styles/loadingCircleStyles.module.scss';

export type LoadingCircleProps = {
    /**
     * Controls the visual state. `'progress'` for an active spinner, `'success'` for a completed state, `'danger'` for a failed state.
     * @default "progress"
     */
    variant?: 'progress' | 'success' | 'danger';
    /**
     * Controls the spinner size. `'xx-small'` for inline indicators, `'medium'` for standard loading states, `'large'` for full-page spinners.
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
