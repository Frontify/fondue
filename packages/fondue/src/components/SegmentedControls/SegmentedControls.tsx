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
import { ReactElement, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type IconItem = {
    id: string;
    icon: ReactElement<IconProps>;
    value?: string;
    ariaLabel: string;
    disabled?: boolean;
};

export type TextOrNumberItem = {
    id: string;
    value: string | number;
    disabled?: boolean;
};

export type SegmentSize = 'small' | 'medium';

export type SegmentedControlsProps = {
    id?: string;
    items: (TextOrNumberItem | IconItem)[];
    activeItemId?: string;
    onChange: (id: string) => void;
    ariaLabel?: string;
    disabled?: boolean;
    hugWidth?: boolean;
    size?: SegmentSize;
};

const isIconItem = (item: TextOrNumberItem | IconItem): item is IconItem => (item as IconItem).icon !== undefined;

interface SegmentedControlsItemProps {
    id: string;
    item: TextOrNumberItem | IconItem;
    disabled: boolean;
    radioGroupState: RadioGroupState;
    size?: SegmentSize;
}

const SegmentedControlsItem = forwardRef<HTMLDivElement, SegmentedControlsItemProps>((props, ref) => {
    const { id, item, disabled, radioGroupState, size } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isActive = item.id === radioGroupState.selectedValue;
    const { inputProps } = useRadio(
        {
            value: item.id,
            'aria-label': isIconItem(item) ? item.ariaLabel : item.value.toString(),
            isDisabled: disabled,
            id: isActive ? id : undefined,
        },
        radioGroupState,
        inputRef,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const handleMockLabelClick = () => {
        if (!disabled) {
            radioGroupState.setSelectedValue(item.id);
            inputRef.current?.focus();
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
        <div key={item.id} ref={ref} className={merge(['tw-relative', isFocusVisible && FOCUS_STYLE])}>
            <VisuallyHidden>
                <input {...inputProps} {...focusProps} data-test-id="fondue-segmented-controls-input" ref={inputRef} />
            </VisuallyHidden>
            <div
                // TODO: Change element back to label when bug #2380 from @react-aria is fixed
                // https://github.com/adobe/react-spectrum/issues/2380
                onClick={handleMockLabelClick}
                role="none"
                data-test-id={getSegmentedControlsItemTestId()}
                className={merge([
                    'tw-relative tw-w-full tw-py-1.5 tw-inline-flex tw-justify-center tw-items-center tw-font-sans tw-font-normal tw-h-full tw-text-center',
                    size === 'small' ? 'tw-px-2' : 'tw-px-4',
                    isActive && !disabled
                        ? 'tw-transition tw-ease-in-out tw-delay-300 tw-text-text tw-bg-base'
                        : 'tw-text-text-weak',
                    disabled
                        ? 'tw-text-box-disabled-inverse tw-bg-box-disabled tw-h-[2.15rem] tw-rounded hover:tw-cursor-not-allowed tw-border-line-x-strong'
                        : 'hover:tw-text-text hover:tw-cursor-pointer',
                ])}
            >
                <span className="tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-flex">
                    {isIconItem(item) && <span className="tw-leading-3">{item.icon}</span>}
                    {item.value && <span className={isIconItem(item) ? 'tw-ml-2' : ''}>{item.value.toString()}</span>}
                </span>
            </div>
        </div>
    );
});

SegmentedControlsItem.displayName = 'SegmentedControlsItem';

export const SegmentedControls = ({
    id: propId,
    items,
    activeItemId,
    onChange,
    ariaLabel = 'SegmentedControls',
    disabled = false,
    hugWidth = false,
    size,
}: SegmentedControlsProps): ReactElement => {
    const hasEnabledItems = useMemo(() => items.some((item) => !item.disabled), [items]);
    const id = useMemoizedId(propId);
    const groupProps = { onChange, value: activeItemId, label: ariaLabel, isDisabled: disabled };
    const radioGroupState = useRadioGroupState(groupProps);
    const { radioGroupProps, labelProps } = useRadioGroup(groupProps, radioGroupState);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const itemContainerRef = useRef<HTMLFieldSetElement>(null);
    const [activeBorderDimensions, setActiveBorderDimensions] = useState<{ left: string; width: string } | null>(null);
    const itemElements = useMemo(() => {
        return items.map((item, index) => (
            <SegmentedControlsItem
                id={id}
                item={item}
                disabled={item.disabled ?? disabled}
                radioGroupState={radioGroupState}
                ref={(el) => (itemsRef.current[index] = el)}
                key={`fondue-segmented-controls-${id}-item-${item.id}`}
                size={size}
            />
        ));
    }, [items, id, disabled, radioGroupState, size]);

    const selectedIndex = hasEnabledItems
        ? items.findIndex((item, index) => {
              const isActiveItem = item.id === radioGroupState.selectedValue;
              if (item.disabled && isActiveItem) {
                  if (index > 0) {
                      const previousIndex = index - 1;
                      radioGroupState.setSelectedValue(items[previousIndex].id);
                  } else {
                      const nextIndex = index + 1;
                      radioGroupState.setSelectedValue(items[nextIndex].id);
                  }
              }
              return isActiveItem;
          })
        : -1;

    const alignment = hugWidth ? 'tw-flex' : 'tw-grid tw-grid-flow-col tw-auto-cols-fr tw-justify-evenly';

    const getSliderX = useCallback(() => {
        const itemLeft = itemsRef.current[selectedIndex]?.getBoundingClientRect().left ?? 0;
        const containerLeft = itemContainerRef.current?.getBoundingClientRect().left ?? 0;
        const containerWidth = itemContainerRef.current?.offsetWidth ?? 0;

        const distanceBetween = itemLeft - (containerLeft + 1);
        const left = (distanceBetween / containerWidth) * 100;

        return `${left}%`;
    }, [selectedIndex]);

    const getSliderWidth = useCallback(() => {
        const widthInt = itemsRef.current[selectedIndex]?.offsetWidth ?? 0;
        const containerWidth = itemContainerRef.current?.offsetWidth ?? 0;

        const percentage = (widthInt / (containerWidth - 2)) * 100;

        return `${percentage}%`;
    }, [selectedIndex]);

    const setSliderDimensions = useCallback(() => {
        const dimensions = itemsRef.current
            ? { left: getSliderX(), width: getSliderWidth() }
            : { left: '0%', width: '0px' };
        setActiveBorderDimensions(dimensions);
    }, [getSliderWidth, getSliderX]);

    useEffect(() => {
        if (selectedIndex >= 0) {
            setSliderDimensions();
        }
        window.addEventListener('resize', setSliderDimensions);

        return () => {
            window.removeEventListener('resize', setSliderDimensions);
        };
    }, [selectedIndex, setSliderDimensions]);

    return (
        <div className={merge([hugWidth ? 'tw-inline-flex' : 'tw-flex', 'tw-relative'])}>
            <fieldset
                {...radioGroupProps}
                data-test-id="fondue-segmented-controls"
                className={merge([
                    'tw-relative tw-divide-x tw-divide-line-strong tw-w-full tw-h-9 tw-p-0 tw-border tw-border-solid tw-border-line-strong tw-m-0 tw-bg-base-alt tw-rounded tw-font-sans tw-text-sm tw-select-none',
                    alignment,
                ])}
                ref={itemContainerRef}
            >
                {itemElements}
            </fieldset>
            <VisuallyHidden>
                <span {...labelProps}>{ariaLabel}</span>
            </VisuallyHidden>
            {activeItemId && activeBorderDimensions && (
                <motion.div
                    aria-hidden="true"
                    // div border is not included in width so it must be subtracted from translation.
                    animate={activeBorderDimensions ?? { left: '0%', width: '0%' }}
                    initial={false}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className={merge([
                        'tw-absolute tw-h-9 tw-box-content tw-border tw-rounded tw-pointer-events-none tw--top-px',
                        disabled
                            ? 'tw-border-line-x-strong hover:tw-cursor-not-allowed'
                            : 'tw-border-line-xx-strong tw-bg-transparent',
                    ])}
                />
            )}
        </div>
    );
};
SegmentedControls.displayName = 'FondueSegmentedControls';
