/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { tooltipArrowStyles, tooltipContentStyles } from './styles/tooltipStyles';

export type TooltipRootProps = {
    enterDelay?: number;
    children: Array<ReactElement<TooltipTriggerProps | TooltipContentProps>>;
};
export type TooltipTriggerProps = { children: ReactNode; 'data-test-id'?: string };
export type TooltipContentProps = {
    padding?: 'spacious' | 'compact';
    maxWidth?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    ignoreCollisions?: boolean;
    className?: string;
    children: string | ReactElement<HTMLParagraphElement | HTMLSpanElement>;
    'data-test-id'?: string;
};

export const TooltipRoot = ({ children, enterDelay = 700 }: TooltipRootProps) => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root delayDuration={enterDelay}>{children}</RadixTooltip.Root>
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
        ignoreCollisions,
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
    Root: TooltipRoot,
    Trigger: forwardRef<HTMLButtonElement, TooltipTriggerProps>(TooltipTrigger),
    Content: forwardRef<HTMLDivElement, TooltipContentProps>(TooltipContent),
};
