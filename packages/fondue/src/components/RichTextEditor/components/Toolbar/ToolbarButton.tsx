/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

import { withTooltip } from './Tooltip';
import { merge } from '@utilities/merge';
import { IconCaretDown16 } from '@foundation/Icon';

const ToolbarButtonComponent = forwardRef<
    ElementRef<typeof ToolbarPrimitive.ToggleItem>,
    Omit<ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>, 'asChild' | 'value'> & {
        pressed?: boolean;
        isDropdown?: boolean;
    }
>(({ isDropdown, children, pressed, ...props }, ref) => {
    return typeof pressed === 'boolean' ? (
        <ToolbarPrimitive.ToolbarToggleGroup
            className="tw-flex tw-items-center"
            type="single"
            value="single"
            disabled={props.disabled}
        >
            <ToolbarPrimitive.ToggleItem
                ref={ref}
                data-testid="ToolbarButton"
                className={merge([
                    '!tw-w-6 !tw-h-6 !tw-items-center !tw-px-2 tw-ml-0.5 !tw-text-text-weak !tw-rounded-[6px] !tw-flex !tw-justify-center  disabled:!tw-cursor-not-allowed disabled:!tw-opacity-50 disabled:!tw-pointer-events-auto',
                    pressed && !props.disabled ? '!tw-bg-box-selected' : '',
                    !props.disabled ? 'hover:!tw-bg-box-selected hover:!tw-text-box-selected-inverse' : '',
                ])}
                value={pressed ? 'single' : ''}
                {...props}
                tabIndex={0}
            >
                {isDropdown ? (
                    <>
                        <div className="tw-flex tw-flex-1">{children}</div>
                        <div className="tw-w-4 tw-ml-0.5">
                            <IconCaretDown16 />
                        </div>
                    </>
                ) : (
                    children
                )}
            </ToolbarPrimitive.ToggleItem>
        </ToolbarPrimitive.ToolbarToggleGroup>
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
                tabIndex={0}
            >
                {children}
            </ToolbarPrimitive.Button>
        </div>
    );
});

ToolbarButtonComponent.displayName = 'ToolbarButtonComponent';

const ToolbarButton = withTooltip(ToolbarButtonComponent);

ToolbarButton.displayName = 'ToolbarButton';

export { ToolbarButton };
