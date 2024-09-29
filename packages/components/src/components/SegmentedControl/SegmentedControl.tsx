/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import styles from './styles/segmentedControl.module.scss';

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
            data-fondue-component="SegmentedControl"
            ref={ref}
            {...rootProps}
            className={styles.root}
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
            <div className={styles.activeIndicator} />
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
    <ToggleGroupPrimitive.Item ref={ref} {...itemProps} className={styles.item} asChild={false}>
        {/* Separator */}
        <span className={styles.separator} />
        <span className={styles.itemLabel}>
            {/* Active children */}
            <span className={styles.itemLabelActive}>{children}</span>

            {/* Inactive children */}
            <span className={styles.itemLabelInactive}>{children}</span>
        </span>
    </ToggleGroupPrimitive.Item>
);
SegmentedControlItem.displayName = 'SegmentedControl.Item';

export const SegmentedControl = {
    Root: forwardRef<HTMLDivElement, SegmentedControlRootProps>(SegmentedControlRoot),
    Item: forwardRef<HTMLButtonElement, SegmentedControlItemProps>(SegmentedControlItem),
};
