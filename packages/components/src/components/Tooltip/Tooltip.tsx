/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { ThemeProvider, useFondueTheme } from '../ThemeProvider/ThemeProvider';

import styles from './styles/tooltip.module.scss';

export type TooltipRootProps = {
    /**
     * The controlled open state. Use together with `onOpenChange` for programmatic control.
     */
    open?: boolean;
    /**
     * Callback fired when the tooltip opens or closes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The delay in milliseconds before the tooltip appears on hover. Set to `0` for instant display.
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
     * When `true`, merges the trigger's props and behavior onto its child element instead of rendering a wrapper button.
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
     * Controls the inner padding. `'spacious'` for text tooltips, `'compact'` for dense layouts.
     * @default "spacious"
     */
    padding?: 'spacious' | 'compact';
    /**
     * The preferred side the tooltip appears on. Falls back to the opposite side if there isn't enough viewport space.
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * The maximum width of the tooltip. Accepts any CSS length value.
     */
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
                    className={[styles.root, className].filter(Boolean).join(' ')}
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

/** An informational popup — compose `Root` with `Trigger` and `Content` sub-components. */
export const Tooltip = {
    Root: TooltipRoot,
    Trigger: forwardRef<HTMLButtonElement, TooltipTriggerProps>(TooltipTrigger),
    Content: forwardRef<HTMLDivElement, TooltipContentProps>(TooltipContent),
};
