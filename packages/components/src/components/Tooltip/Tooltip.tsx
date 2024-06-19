/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { tooltipArrowStyles, tooltipContentStyles } from './styles/tooltipStyles';

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
export type TooltipTriggerProps = { children: ReactNode; 'data-test-id'?: string };
export type TooltipContentProps = {
    /**
     * @default spacious
     */
    padding?: 'spacious' | 'compact';
    /**
     * Defines the preffered side of the tooltip. It will not be respected if there are collisions with the viewport.
     */
    side?: 'top' | 'right' | 'bottom' | 'left';
    maxWidth?: string;
    className?: string;
    children: ReactNode;
    'data-test-id'?: string;
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

export const TooltipTrigger = (
    { children, 'data-test-id': dataTestId = 'fondue-tooltip-content' }: TooltipTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <RadixTooltip.Trigger data-test-id={dataTestId} asChild ref={ref}>
            {children}
        </RadixTooltip.Trigger>
    );
};
TooltipTrigger.displayName = 'Tooltip.Trigger';

export const TooltipContent = (
    {
        children,
        className,
        maxWidth,
        'data-test-id': dataTestId = 'fondue-tooltip-content',
        ...props
    }: TooltipContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixTooltip.Portal>
            <RadixTooltip.Content
                data-test-id={dataTestId}
                className={cn(
                    tooltipContentStyles({
                        ...props,
                    }),
                    className,
                )}
                style={{ maxWidth }}
                collisionPadding={16}
                sideOffset={8}
                ref={ref}
                {...props}
            >
                {children}

                <RadixTooltip.Arrow asChild>
                    <div aria-hidden="true" className={tooltipArrowStyles} />
                </RadixTooltip.Arrow>
            </RadixTooltip.Content>
        </RadixTooltip.Portal>
    );
};
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
    Root: TooltipRoot,
    Trigger: forwardRef<HTMLButtonElement, TooltipTriggerProps>(TooltipTrigger),
    Content: forwardRef<HTMLDivElement, TooltipContentProps>(TooltipContent),
};
