/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { tooltipArrowStyles, tooltipContentStyles } from './styles/tooltipStyles';

export type TooltipRootProps = {
    enterDelay?: number;
    children: Array<ReactElement<TooltipTriggerProps | TooltipContentProps>>;
};
export type TooltipTriggerProps = { children: ReactNode };
export type TooltipContentProps = {
    padding?: 'spacious' | 'compact';
    maxWidth?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    ignoreCollisions?: boolean;
    className?: string;
    children: string | ReactElement<HTMLParagraphElement | HTMLSpanElement>;
};

export const TooltipRoot = ({ children, enterDelay = 700 }: TooltipRootProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root ref={ref} delayDuration={enterDelay}>
                {children}
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
TooltipRoot.displayName = 'Tooltip.Root';

export const TooltipTrigger = ({ children }: TooltipTriggerProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <RadixTooltip.Trigger ref={ref}>{children}</RadixTooltip.Trigger>;
};
TooltipTrigger.displayName = 'Tooltip.Trigger';

export const TooltipContent = (
    { children, className, maxWidth, ignoreCollisions, ...props }: TooltipContentProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <RadixTooltip.Portal>
            <RadixTooltip.Content
                className={cn(
                    tooltipContentStyles({
                        ...props,
                    }),
                    className,
                )}
                style={{ maxWidth }}
                avoidCollisions={!ignoreCollisions}
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
    Root: forwardRef<HTMLDivElement, TooltipRootProps>(TooltipRoot),
    Trigger: forwardRef<HTMLDivElement, TooltipTriggerProps>(TooltipTrigger),
    Content: forwardRef<HTMLDivElement, TooltipContentProps>(TooltipContent),
};
