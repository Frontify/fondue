/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ComponentPropsWithoutRef, ComponentType, ElementRef, ReactNode, forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { zIndexLayers } from '@components/RichTextEditor/helpers/zIndexLayers';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;
export const TooltipContent = TooltipPrimitive.Content;

export function withTooltip<T extends ComponentType<any> | keyof HTMLElementTagNameMap>(Component: T) {
    const WrappedComponent = forwardRef<
        ElementRef<T>,
        ComponentPropsWithoutRef<T> & {
            tooltip?: ReactNode;
        }
    >(({ tooltip, ...props }, ref) => {
        const component = <Component ref={ref} {...(props as any)} />;

        if (tooltip) {
            return (
                <TooltipProvider>
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>{component}</TooltipTrigger>
                        <TooltipPortal>
                            <TooltipContent
                                style={{
                                    zIndex: zIndexLayers.toolbarTooltip,
                                }}
                                className="tw-bg-text tw-border tw-border-line-strong tw-text-box-neutral-strong-inverse tw-py-2 tw-px-3 tw-rounded tw-shadow-lg tw-text-xs"
                            >
                                {tooltip}
                            </TooltipContent>
                        </TooltipPortal>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return component;
    });
    WrappedComponent.displayName = 'WrappedComponent';
    return WrappedComponent;
}
