/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from '@foundation/Icon/IconProps';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { useFocusRing } from '@react-aria/focus';
import { setInteractionModality } from '@react-aria/interactions';
import { useRadio, useRadioGroup } from '@react-aria/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { RadioGroupState, useRadioGroupState } from '@react-stately/radio';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { motion } from 'framer-motion';
import React, { ReactElement, useMemo, useRef } from 'react';

export type IconItem = {
    id: string;
    icon: ReactElement<IconProps>;
    value?: string;
    ariaLabel: string;
};

export type TextOrNumberItem = {
    id: string;
    value: string | number;
};

export type SegmentedControlsProps = {
    id?: string;
    items: (TextOrNumberItem | IconItem)[];
    activeItemId?: string;
    onChange: (id: string) => void;
    ariaLabel?: string;
    disabled?: boolean;
};

const isIconItem = (item: TextOrNumberItem | IconItem): item is IconItem => (item as IconItem).icon !== undefined;

interface SegmentedControlsItemProps {
    id: string;
    item: TextOrNumberItem | IconItem;
    disabled: boolean;
    radioGroupState: RadioGroupState;
}

const SegmentedControlsItem = (props: SegmentedControlsItemProps) => {
    const { id, item, disabled, radioGroupState } = props;
    const ref = useRef<HTMLInputElement | null>(null);
    const isActive = item.id === radioGroupState.selectedValue;
    const { inputProps } = useRadio(
        {
            value: item.id,
            'aria-label': isIconItem(item) ? item.ariaLabel : item.value.toString(),
            isDisabled: disabled,
            id: isActive ? id : undefined,
        },
        radioGroupState,
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const handleMockLabelClick = () => {
        if (!disabled) {
            radioGroupState.setSelectedValue(item.id);
            ref.current?.focus();
            setInteractionModality('pointer');
        }
    };

    const getSegmentedControlsItemTestId = () => {
        switch (true) {
            case isIconItem(item):
                return 'fondue-segmented-controls-item-icon';
            case typeof item.value === 'string':
                return 'fondue-segmented-controls-item-text';
            default:
                return 'fondue-segmented-controls-item-number';
        }
    };

    return (
        <div key={item.id} className={merge(['tw-relative', isFocusVisible && FOCUS_STYLE])}>
            <div
                // TODO: Change element back to label when bug #2380 from @react-aria is fixed
                // https://github.com/adobe/react-spectrum/issues/2380
                role="none"
                onClick={handleMockLabelClick}
                data-test-id={getSegmentedControlsItemTestId()}
                className={merge([
                    'tw-relative tw-w-full tw-inline-flex tw-justify-center tw-items-center tw-font-sans tw-font-normal tw-h-full tw-text-center',
                    isActive && !disabled ? 'tw-text-black' : 'tw-text-black-80',
                    !disabled ? 'hover:tw-text-black hover:tw-cursor-pointer' : '',
                ])}
            >
                <VisuallyHidden>
                    <input {...inputProps} {...focusProps} data-test-id="fondue-segmented-controls-input" ref={ref} />
                </VisuallyHidden>
                <span className="tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-flex">
                    {isIconItem(item) && (
                        <span className="tw-leading-3" aria-label={item.ariaLabel}>
                            {item.icon}
                        </span>
                    )}
                    {item.value && <span className={isIconItem(item) ? 'tw-ml-2' : ''}>{item.value.toString()}</span>}
                </span>
            </div>
        </div>
    );
};

export const SegmentedControls = ({
    id: propId,
    items,
    activeItemId,
    onChange,
    ariaLabel = 'SegmentedControls',
    disabled = false,
}: SegmentedControlsProps): ReactElement => {
    const id = useMemoizedId(propId);
    const groupProps = { onChange, value: activeItemId, label: ariaLabel, isDisabled: disabled };
    const radioGroupState = useRadioGroupState(groupProps);
    const { radioGroupProps } = useRadioGroup(groupProps, radioGroupState);
    const itemElements = useMemo(() => {
        return items.map((item) => (
            <SegmentedControlsItem
                id={id}
                item={item}
                disabled={disabled}
                radioGroupState={radioGroupState}
                key={`fondue-segmented-controls-${id}-item-${item.id}`}
            />
        ));
    }, [items, id, disabled, radioGroupState]);
    const selectedIndex = items.findIndex((item) => item.id === radioGroupState.selectedValue);

    return (
        <div className="tw-flex">
            <fieldset
                {...radioGroupProps}
                data-test-id="fondue-segmented-controls"
                className="tw-relative tw-h-9 tw-w-full tw-grid tw-grid-flow-col tw-auto-cols-fr tw-justify-evenly tw-p-0 tw-border tw-border-black-20 tw-m-0 tw-bg-black-0 tw-rounded tw-font-sans tw-text-s tw-select-none"
            >
                <motion.div
                    aria-hidden="true"
                    // div border is not included in width so it must be subtracted from translation.
                    animate={{ x: `calc(${100 * selectedIndex}% - ${2 * selectedIndex}px)` }}
                    initial={false}
                    transition={{ type: 'tween', duration: 0.3 }}
                    style={{
                        width: `${100 / items.length}%`,
                    }}
                    hidden={!activeItemId}
                    className={merge([
                        'tw-absolute tw--inset-px tw-h-full tw-box-content tw-border tw-rounded tw-pointer-events-none',
                        disabled
                            ? 'tw-border-line-x-strong tw-border-opacity-30 tw-bg-black-0'
                            : 'tw-border-black tw-bg-white',
                    ])}
                />
                {itemElements}
            </fieldset>
        </div>
    );
};
SegmentedControls.displayName = 'FondueSegmentedControls';
