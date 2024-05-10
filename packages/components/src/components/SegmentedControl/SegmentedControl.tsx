/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ReactNode } from 'react';

import { useControllableState } from '#/hooks/useControllableState';

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
    /**
     * Initial value when uncontrolled
     */
    defaultValue: string;
    /**
     * Externally controlled value
     */
    value?: string;
    disabled?: boolean;
    /**
     * Callback when the value changes
     */
    onValueChange?: (value: string) => void;
    children: ReactNode;
};

export const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlRootProps>(
    ({ children, value: propsValue, defaultValue, onValueChange, ...rootProps }, ref) => {
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
    },
);
SegmentedControlRoot.displayName = 'SegmentedControl.Root';

type SegmentedControlItemProps = {
    children: ReactNode;
    value: string;
};

export const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
    ({ children, ...itemProps }, ref) => (
        <ToggleGroupPrimitive.Item ref={ref} {...itemProps} className={segmentedControlItemStyles} asChild={false}>
            {/* Separator */}
            <span className={segmentedControlItemSeparatorStyles} />
            <span className={segmentedControlItemLabelStyles}>
                {/* Active children */}
                <span className={segmentedControlItemLabelActiveStyles}>{children}</span>

                {/* Inactive children */}
                <span className={segmentedControlItemLabelInactiveStyles}>{children}</span>
            </span>
        </ToggleGroupPrimitive.Item>
    ),
);
SegmentedControlItem.displayName = 'SegmentedControl.Item';

export const SegmentedControl = {
    Root: SegmentedControlRoot,
    Item: SegmentedControlItem,
};
