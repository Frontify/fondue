/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import styles from './styles/segmentedControl.module.scss';

export type SegmentedControlRootProps<TValue extends string = string> = {
    id?: string;
    /**
     * Should contain `SegmentedControl.Item` components.
     */
    children: ReactNode;
    /**
     * The initially selected value for uncontrolled usage.
     */
    defaultValue?: TValue;
    /**
     * The controlled selected value. Use together with `onValueChange`.
     */
    value?: TValue;
    /**
     * Callback fired when the selected option changes.
     * @param value - The value of the newly selected item
     */
    onValueChange?: (value: TValue) => void;
    /**
     * Prevents interaction with the entire control.
     * @default false
     */
    disabled?: boolean;
    /**
     * When `true`, the control sizes to fit its content. When `false`, it expands to fill its container width.
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
    /**
     * The label content displayed inside the segment — text, an icon, or both.
     */
    children: ReactNode;
    /**
     * A unique value that identifies this option. Passed to `onValueChange` when selected.
     */
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

/**
 * A compact, horizontal toggle group for switching between 2–4 mutually exclusive options.
 * Use `SegmentedControl.Root` as the container and `SegmentedControl.Item` for each option.
 */
export const SegmentedControl = {
    Root: forwardRef(SegmentedControlRoot) as <TValue extends string = string>(
        props: SegmentedControlRootProps<TValue> & { ref?: ForwardedRef<HTMLDivElement> },
    ) => ReactElement,
    Item: forwardRef(SegmentedControlItem),
};
