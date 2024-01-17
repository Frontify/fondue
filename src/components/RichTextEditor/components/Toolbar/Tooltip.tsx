/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;
export const TooltipContent = TooltipPrimitive.Content;

export function withTooltip<T extends React.ComponentType<any> | keyof HTMLElementTagNameMap>(Component: T) {
    // eslint-disable-next-line react/display-name
    return React.forwardRef<
        React.ElementRef<T>,
        React.ComponentPropsWithoutRef<T> & {
            tooltip?: React.ReactNode;
        }
    >(({ tooltip, ...props }, ref) => {
        const [mounted, setMounted] = React.useState(false);

        React.useEffect(() => {
            setMounted(true);
        }, []);

        const component = <Component ref={ref} {...(props as any)} />;

        if (tooltip && mounted) {
            return (
                <TooltipProvider>
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>{component}</TooltipTrigger>
                        <TooltipPortal>
                            <TooltipContent className=" tw-z-50 !tw-bg-text !tw-border !tw-border-line-strong !tw-text-box-neutral-strong-inverse !tw-py-2 !tw-px-3 !-tw-mb-1 !tw-rounded !tw-shadow-lg !tw-text-xs">
                                {tooltip}
                            </TooltipContent>
                        </TooltipPortal>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return component;
    });
}
