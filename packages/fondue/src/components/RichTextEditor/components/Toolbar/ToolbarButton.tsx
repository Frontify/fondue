/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as React from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { withCn } from '@udecode/cn';

import { Icons } from './Icons';

import { withTooltip } from './Tooltip';
import { merge } from '@utilities/merge';

export const Toolbar = withCn(ToolbarPrimitive.Root, 'tw-relative tw-flex tw-select-none tw-items-center tw-gap-1');

export const ToolbarToggleGroup = withCn(ToolbarPrimitive.ToolbarToggleGroup, 'tw-flex tw-items-center');

export const ToolbarToggleItem = ToolbarPrimitive.ToggleItem;

const ToolbarButton = withTooltip(
    // eslint-disable-next-line react/display-name
    React.forwardRef<
        React.ElementRef<typeof ToolbarToggleItem>,
        Omit<React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>, 'asChild' | 'value'> & {
            pressed?: boolean;
            isDropdown?: boolean;
        }
    >(({ isDropdown, children, pressed, ...props }, ref) => {
        return typeof pressed === 'boolean' ? (
            <ToolbarToggleGroup type="single" value="single" disabled={props.disabled}>
                <ToolbarToggleItem
                    ref={ref}
                    data-testid="ToolbarButton"
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
                    data-testid="ToolbarButton"
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
