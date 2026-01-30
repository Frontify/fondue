/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import styles from './styles/segmentedControl.module.scss';

export type SegmentedControlRootProps<TValue extends string = string> = {
    id?: string;
    children: ReactNode;
    /**
     * The default value of the segmented control
     * Used for uncontrolled components
     */
    defaultValue?: TValue;
    /**
     * The controlled value of the segmented control
     */
    value?: TValue;
    /**
     * Event handler called when the value changes
     */
    onValueChange?: (value: TValue) => void;
    /**
     * Disable the segmented control
     * @default false
     */
    disabled?: boolean;
    /**
     * Specify if the segmented control should only take the width of its content
     * @default true
     */
    hugWidth?: boolean;
};

export const SegmentedControlRoot = <TValue extends string = string>(
    {
        children,
        value: propsValue,
        defaultValue,
        onValueChange,
        hugWidth = true,
        ...rootProps
    }: SegmentedControlRootProps<TValue>,
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
            className={styles.root}
            onValueChange={(value) => {
                if (value) {
                    setValue(value as TValue);
                }
            }}
            value={value}
            type="single"
            asChild={false}
            data-hug-width={hugWidth}
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
    Root: forwardRef(SegmentedControlRoot) as <TValue extends string = string>(
        props: SegmentedControlRootProps<TValue> & { ref?: ForwardedRef<HTMLDivElement> },
    ) => ReactElement,
    Item: forwardRef(SegmentedControlItem),
};
