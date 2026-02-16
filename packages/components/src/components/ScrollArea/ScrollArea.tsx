/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { type ForwardedRef, forwardRef, type ReactElement, type ReactNode } from 'react';

import { useFondueTheme } from '../ThemeProvider/ThemeProvider';

import styles from './styles/scrollArea.module.scss';

export type ScrollAreaProps = {
    /**
     * Controls scrollbar visibility. `'hover'` shows on mouse-over, `'scroll'` shows while scrolling, `'auto'` shows when content overflows, `'always'` keeps scrollbars permanently visible.
     * @default "hover"
     */
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    /**
     * Controls whether scrollbars reserve space in the layout. `'stable'` prevents content shift when scrollbars appear, `'auto'` lets the browser decide.
     * @default "auto"
     */
    scrollbarGutter?: 'auto' | 'stable' | 'stable-horizontal' | 'stable-vertical';
    /**
     * Maximum height before vertical scrolling activates. Accepts CSS values or numbers (pixels).
     * @default "100%"
     */
    maxHeight?: string | number;
    /**
     * Maximum width before horizontal scrolling activates. Accepts CSS values or numbers (pixels).
     * @default "100%"
     */
    maxWidth?: string | number;
    /**
     * Controls the inner padding of the scroll area. `'compact'` for most use cases, `'spacious'` for breathing room.
     * @default "compact"
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * Shows an inset shadow at the scroll edges to indicate more content is available.
     * @default false
     */
    showShadow?: boolean;
    'data-test-id'?: string;
    children: ReactNode;
};

const ScrollAreaComponent = (
    {
        type = 'hover',
        maxHeight = '100%',
        maxWidth = '100%',
        showShadow = false,
        scrollbarGutter = 'auto',
        padding,
        children,
        'data-test-id': dataTestId = 'fondue-scroll-area',
    }: ScrollAreaProps,
    ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
    const { dir } = useFondueTheme();

    return (
        <RadixScrollArea.Root
            type={type}
            dir={dir}
            className={styles.root}
            style={{ maxWidth }}
            data-test-id={dataTestId}
        >
            <RadixScrollArea.Viewport
                ref={ref}
                className={styles.viewport}
                style={{ maxHeight }}
                data-scroll-padding={padding}
                data-show-shadow={showShadow}
                data-scrollbar-type={type}
                data-scrollbar-gutter={scrollbarGutter}
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
