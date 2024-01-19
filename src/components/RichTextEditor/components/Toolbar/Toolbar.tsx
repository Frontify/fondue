/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn, withRef, withVariants } from '@udecode/cn';
import { VariantProps, cva } from 'class-variance-authority';

import { Icons } from '../Icons';

import { Separator } from './Separator';
import { withTooltip } from './Tooltip';
import { merge } from '@utilities/merge';

export const Toolbar = withCn(ToolbarPrimitive.Root, 'tw-relative tw-flex tw-select-none tw-items-center tw-gap-1');

export const ToolbarToggleGroup = withCn(ToolbarPrimitive.ToolbarToggleGroup, 'tw-flex tw-items-center');

export const ToolbarLink = withCn(ToolbarPrimitive.Link, 'tw-font-medium tw-underline tw-underline-offset-4');

export const ToolbarSeparator = withCn(
    ToolbarPrimitive.Separator,
    'tw-my-1 tw-w-[1px] tw-shrink-0 tw-bg-slate-200 dark:tw-bg-slate-800',
);

const toolbarButtonVariants = cva(
    cn(
        'tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-950 focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 dark:tw-ring-offset-slate-950 dark:tw-focus-visible:tw-ring-slate-300',
    ),
    {
        variants: {
            variant: {
                default:
                    'tw-bg-transparent hover:tw-bg-slate-100 hover:tw-text-slate-500 aria-checked:tw-bg-slate-100 aria-checked:tw-text-slate-900 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-400 dark:aria-checked:tw-bg-slate-800 dark:aria-checked:tw-text-slate-50',
                outline:
                    'tw-border tw-border-slate-200 tw-bg-transparent hover:tw-bg-slate-100 hover:tw-text-slate-900 dark:tw-border-slate-800 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-50',
            },
            size: {
                default: 'tw-h-10 tw-px-3',
                sm: 'tw-h-9 tw-px-2',
                lg: 'tw-h-11 tw-px-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'sm',
        },
    },
);

const ToolbarButton = withTooltip(
    // eslint-disable-next-line react/display-name
    React.forwardRef<
        React.ElementRef<typeof ToolbarToggleItem>,
        Omit<React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>, 'asChild' | 'value'> &
            VariantProps<typeof toolbarButtonVariants> & {
                pressed?: boolean;
                isDropdown?: boolean;
            }
    >(({ isDropdown, children, pressed, ...props }, ref) => {
        return typeof pressed === 'boolean' ? (
            <ToolbarToggleGroup type="single" value="single" disabled={props.disabled}>
                <ToolbarToggleItem
                    ref={ref}
                    className={merge([
                        '!tw-w-6 !tw-h-6 !tw-items-center !tw-px-2 tw-ml-0.5 !tw-text-text-weak !tw-rounded-[6px] !tw-flex !tw-justify-center  disabled:!tw-cursor-not-allowed disabled:!tw-opacity-50 disabled:!tw-pointer-events-auto',
                        pressed && !props.disabled ? '!tw-bg-box-selected' : '',
                        !props.disabled ? 'hover:!tw-bg-box-selected hover:!tw-text-box-selected-inverse' : '',
                    ])}
                    value={pressed ? 'single' : ''}
                    {...props}
                >
                    {isDropdown ? (
                        <>
                            <div className="tw-flex tw-flex-1">{children}</div>
                            <div>
                                <Icons.arrowDown className="tw-ml-0.5 tw-h-4 tw-w-4" data-icon />
                            </div>
                        </>
                    ) : (
                        children
                    )}
                </ToolbarToggleItem>
            </ToolbarToggleGroup>
        ) : (
            <div className="tw-flex tw-items-center">
                <ToolbarPrimitive.Button
                    ref={ref}
                    className={merge([
                        '!tw-w-6 !tw-h-6 !tw-items-center !tw-px-2 tw-ml-0.5 !tw-text-text-weak !tw-rounded-[6px] !tw-flex !tw-justify-center  disabled:!tw-cursor-not-allowed disabled:!tw-opacity-50 disabled:!tw-pointer-events-auto',
                        pressed && !props.disabled ? '!tw-bg-box-selected' : '',
                        !props.disabled ? 'hover:!tw-bg-box-selected hover:!tw-text-box-selected-inverse' : '',
                    ])}
                    {...props}
                >
                    {children}
                </ToolbarPrimitive.Button>
            </div>
        );
    }),
);
ToolbarButton.displayName = 'ToolbarButton';
export { ToolbarButton };

export const ToolbarToggleItem = withVariants(ToolbarPrimitive.ToggleItem, toolbarButtonVariants, ['variant', 'size']);

export const ToolbarGroup = withRef<
    'div',
    {
        noSeparator?: boolean;
    }
>(({ className, children, noSeparator }, ref) => {
    const childArr = React.Children.map(children, (c) => c);
    if (!childArr || childArr.length === 0) {
        return null;
    }

    return (
        <div ref={ref} className={cn('tw-flex', className)}>
            {!noSeparator && (
                <div className="tw-h-full tw-py-1">
                    <Separator orientation="vertical" />
                </div>
            )}

            <div className="tw-mx-1 tw-flex tw-items-center tw-gap-1">{children}</div>
        </div>
    );
});
