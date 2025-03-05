/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { forwardRef, type ForwardedRef, type ReactNode } from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import { Tooltip } from '../Tooltip/Tooltip';

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
    /**
     * Specify if the segmented control should only take the width of its content
     * @default true
     */
    hugWidth?: boolean;
};

export const SegmentedControlRoot = (
    {
        children,
        value: propsValue,
        defaultValue,
        onValueChange,
        hugWidth = true,
        ...rootProps
    }: SegmentedControlRootProps,
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
                    setValue(value);
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
    tooltip?: string;
    value: string;
};

export const SegmentedControlTooltipItem = forwardRef(
    ({ children, tooltip, ...itemProps }: SegmentedControlItemProps, ref: ForwardedRef<HTMLButtonElement>) => (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <ToggleGroupPrimitive.Item ref={ref} {...itemProps} className={styles.item} asChild>
                    <button tabIndex={-1} className={styles.item}>
                        <SegmentedControlItemContent>{children}</SegmentedControlItemContent>
                    </button>
                </ToggleGroupPrimitive.Item>
            </Tooltip.Trigger>

            <Tooltip.Content>{tooltip}</Tooltip.Content>
        </Tooltip.Root>
    ),
);
SegmentedControlTooltipItem.displayName = 'SegmentedControlTooltipItem';

export const SegmentedControlItem = (
    { children, tooltip, ...itemProps }: SegmentedControlItemProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    if (tooltip) {
        return (
            <SegmentedControlTooltipItem ref={ref} tooltip={tooltip} {...itemProps}>
                {children}
            </SegmentedControlTooltipItem>
        );
    }

    return (
        <ToggleGroupPrimitive.Item ref={ref} {...itemProps} className={styles.item}>
            <SegmentedControlItemContent>{children}</SegmentedControlItemContent>
        </ToggleGroupPrimitive.Item>
    );
};
SegmentedControlItem.displayName = 'SegmentedControl.Item';

const SegmentedControlItemContent = ({ children }: { children: ReactNode }) => (
    <>
        {/* Separator */}
        <span className={styles.separator} />
        <span className={styles.itemLabel}>
            {/* Active children */}
            <span className={styles.itemLabelActive}>{children}</span>

            {/* Inactive children */}
            <span className={styles.itemLabelInactive}>{children}</span>
        </span>
    </>
);

export const SegmentedControl = {
    Root: forwardRef<HTMLDivElement, SegmentedControlRootProps>(SegmentedControlRoot),
    Item: forwardRef<HTMLButtonElement, SegmentedControlItemProps>(SegmentedControlItem),
};
