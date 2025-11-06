/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

import styles from './styles/tooltip.module.scss';

export type TooltipRootProps = {
    /**
     * Sets the open state of the tooltip.
     */
    open?: boolean;
    /**
     * Callback that is called when the open state of the tooltip changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The delay in milliseconds before the tooltip appears.
     * @default 700
     */
    enterDelay?: number;
    children: Array<ReactElement<TooltipTriggerProps | TooltipContentProps>>;
};

export const TooltipRoot = ({ children, enterDelay = 700, open, onOpenChange }: TooltipRootProps) => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root delayDuration={enterDelay} open={open} onOpenChange={onOpenChange}>
                {children}
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
TooltipRoot.displayName = 'Tooltip.Root';

export type TooltipTriggerProps = {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
    children: ReactNode;
    'data-test-id'?: string;
};

export const TooltipTrigger = (
    { asChild = false, children, 'data-test-id': dataTestId = 'fondue-tooltip-trigger' }: TooltipTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixTooltip.Trigger
            data-tooltip-trigger
            data-test-id={dataTestId}
            type={!asChild ? 'button' : undefined}
            asChild={asChild}
            ref={ref}
        >
            {children}
        </RadixTooltip.Trigger>
    );
};
TooltipTrigger.displayName = 'Tooltip.Trigger';

export type TooltipContentProps = {
    /**
     * @default "spacious"
     */
    padding?: 'spacious' | 'compact';
    /**
     * Defines the preferred side of the tooltip. It will not be respected if there are collisions with the viewport.
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    maxWidth?: string;
    className?: string;
    children: ReactNode;
    'data-test-id'?: string;
};

export const TooltipContent = (
    {
        children,
        className,
        maxWidth,
        'data-test-id': dataTestId = 'fondue-tooltip-content',
        padding = 'spacious',
        side,
    }: TooltipContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { theme, dir } = useFondueTheme();

    const getAdjustedSide = (side?: 'top' | 'right' | 'bottom' | 'left') => {
        if (!side || dir === 'ltr') {
            return side;
        }

        if (side === 'left') {
            return 'right';
        }
        if (side === 'right') {
            return 'left';
        }

        return side;
    };

    return (
        <RadixTooltip.Portal>
            <ThemeProvider theme={theme} dir={dir}>
                <RadixTooltip.Content
                    dir={dir}
                    data-test-id={dataTestId}
                    data-tooltip-spacing={padding}
                    className={cn(styles.root, className)}
                    style={{ maxWidth }}
                    collisionPadding={16}
                    sideOffset={8}
                    ref={ref}
                    side={getAdjustedSide(side)}
                >
                    {children}
                    <RadixTooltip.Arrow aria-hidden="true" className={styles.arrow} />
                </RadixTooltip.Content>
            </ThemeProvider>
        </RadixTooltip.Portal>
    );
};
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
    Root: TooltipRoot,
    Trigger: forwardRef<HTMLButtonElement, TooltipTriggerProps>(TooltipTrigger),
    Content: forwardRef<HTMLDivElement, TooltipContentProps>(TooltipContent),
};
