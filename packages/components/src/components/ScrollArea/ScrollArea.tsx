/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { type ForwardedRef, forwardRef, type ReactElement, type ReactNode } from 'react';

import styles from './styles/scrollArea.module.scss';

export type ScrollAreaProps = {
    /**
     * "auto" visible when content is overflowing on the corresponding orientation.
     * "always" always visible regardless of whether the content is overflowing.
     * "scroll" visible when the user is scrolling along its corresponding orientation.
     * "hover" when the user is hovering over the scroll area.
     * @default 'hover'
     */
    type?: 'auto' | 'always' | 'scroll' | 'hover';
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
    /**
     * Determines if a inset shadow should be shown the edge of the component
     */
    showShadow?: boolean;
    'data-test-id'?: string;
    children: ReactNode;
};

const ScrollAreaComponent = (
    {
        type,
        maxHeight = '100%',
        maxWidth = '100%',
        showShadow = false,
        children,
        'data-test-id': dataTestId = 'fondue-scroll-area',
    }: ScrollAreaProps,
    ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
    return (
        <RadixScrollArea.Root
            type={type}
            className={styles.root}
            style={{ maxWidth }}
            data-test-id={dataTestId}
            ref={ref}
        >
            <RadixScrollArea.Viewport
                className={styles.viewport}
                style={{ maxHeight }}
                data-test-id={`${dataTestId}-viewport`}
                data-show-shadow={showShadow}
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
