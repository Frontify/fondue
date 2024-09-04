/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { ForwardedRef, forwardRef, ReactElement, type ReactNode } from 'react';

import styles from './styles/scrollArea.module.scss';

export type ScrollAreaProps = {
    /**
     * Maximum height of the scroll area
     * @default '100%'
     */
    maxHeight?: string | number;
    /**
     * Minimum width of the scroll area
     * @default '100%'
     */
    maxWidth?: string | number;
    'data-test-id'?: string;
    children: ReactNode;
};

const ScrollAreaComponent = (
    {
        maxHeight = '100%',
        maxWidth = '100%',
        children,
        'data-test-id': dataTestId = 'fondue-scroll-area',
    }: ScrollAreaProps,
    ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
    return (
        <RadixScrollArea.Root className={styles.root} style={{ maxWidth }} data-test-id={dataTestId} ref={ref}>
            <RadixScrollArea.Viewport
                className={styles.viewport}
                style={{ maxHeight }}
                data-test-id={`${dataTestId}-viewport`}
            >
                {children}
            </RadixScrollArea.Viewport>
            <RadixScrollArea.Scrollbar
                className={styles.scrollbar}
                orientation="vertical"
                data-test-id={`${dataTestId}-vertical-scrollbar`}
            >
                <RadixScrollArea.Thumb
                    className={styles.thumb}
                    data-test-id={`${dataTestId}-vertical-scrollbar-thumb`}
                />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Scrollbar
                className={styles.scrollbar}
                orientation="horizontal"
                data-test-id={`${dataTestId}-horizontal-scrollbar`}
            >
                <RadixScrollArea.Thumb
                    className={styles.thumb}
                    data-test-id={`${dataTestId}-horizontal-scrollbar-thumb`}
                />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Corner className={styles.corner} data-test-id={`${dataTestId}-corner`} />
        </RadixScrollArea.Root>
    );
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(ScrollAreaComponent);
ScrollArea.displayName = 'ScrollArea';
