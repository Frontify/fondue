/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { useControllableState } from '#/hooks/useControllableState';
import { FOCUS_OUTLINE } from '#/utilities/focusStyle';
import { cn } from '#/utilities/styleUtilities';

import {
    segmentedControlActiveIndicatorStyles,
    segmentedControlItemLabelActiveStyles,
    segmentedControlItemLabelInactiveStyles,
    segmentedControlItemLabelStyles,
    segmentedControlItemSeparatorStyles,
    segmentedControlItemStyles,
    segmentedControlRootStyles,
} from './styles/segmentedControlStyles';

export type SegmentedControlRootProps = {
    id?: string;
    children: ReactNode;
    /**
     * The default value of the segmented control
     * Used for uncontrolled components
     */
    defaultValue: string;
    /**
     * The controlled value of the segmented control
     */
    value?: string;
    /**
     * Event handler called when the value changes
     */
    onValueChange?: (value: string) => void;
    /**
     * Disable the segmented control
     * @default false
     */
    disabled?: boolean;
};

export const SegmentedControlRoot = (
    { children, value: propsValue, defaultValue, onValueChange, ...rootProps }: SegmentedControlRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const [value, setValue] = useControllableState({
        prop: propsValue,
        defaultProp: defaultValue,
        onChange: onValueChange,
    });

    return (
        <ToggleGroupPrimitive.Root
            ref={ref}
            {...rootProps}
            className={segmentedControlRootStyles}
            onValueChange={(value) => {
                if (value) {
                    setValue(value);
                }
            }}
            value={value}
            type="single"
            asChild={false}
            aria-disabled={rootProps.disabled}
        >
            {children}
            {/* Active indicator */}
            <div className={segmentedControlActiveIndicatorStyles} />
        </ToggleGroupPrimitive.Root>
    );
};
SegmentedControlRoot.displayName = 'SegmentedControl.Root';

type SegmentedControlItemProps = {
    children: ReactNode;
    value: string;
};

export const SegmentedControlItem = (
    { children, ...itemProps }: SegmentedControlItemProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => (
    <ToggleGroupPrimitive.Item
        ref={ref}
        {...itemProps}
        className={cn(segmentedControlItemStyles, FOCUS_OUTLINE)}
        asChild={false}
    >
        {/* Separator */}
        <span className={segmentedControlItemSeparatorStyles} />
        <span className={segmentedControlItemLabelStyles}>
            {/* Active children */}
            <span className={segmentedControlItemLabelActiveStyles}>{children}</span>

            {/* Inactive children */}
            <span className={segmentedControlItemLabelInactiveStyles}>{children}</span>
        </span>
    </ToggleGroupPrimitive.Item>
);
SegmentedControlItem.displayName = 'SegmentedControl.Item';

export const SegmentedControl = {
    Root: forwardRef<HTMLDivElement, SegmentedControlRootProps>(SegmentedControlRoot),
    Item: forwardRef<HTMLButtonElement, SegmentedControlItemProps>(SegmentedControlItem),
};
