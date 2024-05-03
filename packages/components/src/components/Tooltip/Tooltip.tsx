/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { tooltipArrowStyles, tooltipContentStyles } from './styles/tooltipStyles';

export type TooltipRootProps = { enterDelay: number; children?: ReactNode };
export type TooltipTriggerProps = { children?: ReactNode };
export type TooltipContentProps = {
    withArrow?: boolean;
    padding?: 'spacious' | 'compact';
    maxWidth?: string;
    maxHeight?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    ignoreCollisions?: boolean;
    className?: string;
    children?: ReactNode;
};

const TooltipRoot = ({ children, enterDelay = 700 }: TooltipRootProps) => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root delayDuration={enterDelay} open={true}>
                {children}
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
TooltipRoot.displayName = 'Tooltip.Root';

const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
    return <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>;
};
TooltipTrigger.displayName = 'Tooltip.Trigger';

const TooltipContent = ({
    children,
    className,
    maxWidth,
    maxHeight,
    withArrow = true,
    ignoreCollisions,
    ...props
}: TooltipContentProps) => {
    return (
        <RadixTooltip.Portal>
            <RadixTooltip.Content
                className={cn(
                    tooltipContentStyles({
                        ...props,
                    }),
                    maxWidth && `tw-max-w-${maxWidth}`,
                    maxHeight && `tw-max-h-${maxHeight}`,
                    className,
                )}
                sideOffset={5}
                arrowPadding={5}
                avoidCollisions={!ignoreCollisions}
                {...props}
            >
                {children}
                {withArrow && (
                    <RadixTooltip.Arrow asChild>
                        <div data-test-id="popper-arrow" aria-hidden="true" className={tooltipArrowStyles} />
                    </RadixTooltip.Arrow>
                )}
            </RadixTooltip.Content>
        </RadixTooltip.Portal>
    );
};
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = {
    Root: TooltipRoot,
    Trigger: TooltipTrigger,
    Content: TooltipContent,
};
