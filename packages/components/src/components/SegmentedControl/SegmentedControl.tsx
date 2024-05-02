/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type ReactNode, forwardRef } from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import {
    segmentedControlActiveIndicatorStyles,
    segmentedControlItemLabelActiveStyles,
    segmentedControlItemLabelInactiveStyles,
    segmentedControlItemLabelStyles,
    segmentedControlItemSeparatorStyles,
    segmentedControlItemStyles,
    segmentedControlRootStyles,
} from './styles/SegmentedControlStyles';

export type SegmentedControlRootProps = {
    children: ReactNode;
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
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
