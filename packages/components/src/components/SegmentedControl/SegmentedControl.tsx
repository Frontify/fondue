/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type Ref, type ReactNode } from 'react';

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
    ref?: Ref<HTMLDivElement>;
};

export const SegmentedControlRoot = ({
    children,
    value: propsValue,
    defaultValue,
    onValueChange,
    ...rootProps
}: SegmentedControlRootProps) => {
    const [value, setValue] = useControllableState({
        prop: propsValue,
        defaultProp: defaultValue,
        onChange: onValueChange,
    });

    return (
        <ToggleGroupPrimitive.Root
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
    ref?: Ref<HTMLButtonElement>;
};

export const SegmentedControlItem = ({ children, ...itemProps }: SegmentedControlItemProps) => (
    <ToggleGroupPrimitive.Item {...itemProps} className={segmentedControlItemStyles} asChild={false}>
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
    Root: SegmentedControlRoot,
    Item: SegmentedControlItem,
};
