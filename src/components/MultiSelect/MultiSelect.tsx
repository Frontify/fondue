/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checklist, ChecklistDirection } from '@components/Checklist/Checklist';
import { Tag, TagSize, TagType } from '@components/Tag';
import { Trigger, TriggerEmphasis } from '@components/Trigger';
import { Text } from '@typography/Text';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { getInputWidth, getPaddingClasses } from './helpers';
import { Menu } from '@components/Menu';
import { MenuItem } from '@components/MenuItem';
import { useClickOutside } from '@hooks/useClickOutside';
import { DefaultItem, NoSearchResults, OptionalItems } from './SelectMenuItems';
import { CheckboxState } from '@components/Checkbox/Checkbox';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { DEFAULT_DROPDOWN_MAX_HEIGHT, useDropdownAutoHeight } from '@components/Dropdown/useDropdownAutoHeight';
import { DEFAULT_DROPDOWN_MIN_ANIMATION_HEIGHT } from '@components/Dropdown/Dropdown';

export enum MultiSelectType {
    Default = 'Default',
    Summarized = 'Summarized',
}

export enum MultiSelectSize {
    Small = 'Small',
    Medium = 'Medium',
}

export enum MultiSelectEmphasis {
    Default = 'Default',
    Weak = 'Weak',
}

export type MultiSelectItem = {
    value: string;
    isCategory?: boolean;
    isDivider?: boolean;
    avatar?: React.ReactNode;
    imgSrc?: string;
    ariaLabel?: string;
};

export type MultiSelectProps = {
    items: MultiSelectItem[];
    activeItemKeys: (string | number)[];
    disabled?: boolean;
    onSelectionChange: (keys: (string | number)[]) => void;
    ariaLabel?: string;
    label?: string;
    placeholder?: string;
    type?: MultiSelectType;
    size?: MultiSelectSize;
    validation?: Validation;
    emphasis?: MultiSelectEmphasis;
    decorator?: React.ReactNode;
    filterable?: boolean;
    filterLabel?: string;
    noResultsLabel?: string;
    summarizedLabel?: string;
    indeterminateItemKeys?: (string | number)[];
    flip?: boolean;
};

export type Item = {
    label: string;
    value: string;
    avatar?: React.ReactNode;
    isCategory?: boolean;
    isDivider?: boolean;
    imgSrc?: string;
    ariaLabel?: string;
};

export const MultiSelect: FC<MultiSelectProps> = ({
    items,
    activeItemKeys,
    onSelectionChange,
    ariaLabel = 'Select list',
    disabled = false,
    placeholder,
    label,
    filterLabel,
    noResultsLabel,
    type = MultiSelectType.Default,
    size = MultiSelectSize.Medium,
    validation = Validation.Default,
    emphasis = MultiSelectEmphasis.Default,
    decorator = null,
    filterable = false,
    summarizedLabel: summarizedLabelFromProps,
    indeterminateItemKeys,
    flip = false,
}) => {
    const [open, setOpen] = useState(false);
    const [checkboxes, setCheckboxes] = useState<Item[]>([]);
    const hasResults = !!checkboxes.find((item) => !item.isCategory && !item.isDivider);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);

    const [multiSelectMenuRef, setMultiSelectMenuRef] = useState<null | HTMLDivElement>(null);
    const [triggerRef, setTriggerRef] = useState<HTMLDivElement | null>(null);

    const filterInputRef = useRef<HTMLInputElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();

    const { maxHeight } = useDropdownAutoHeight({ current: triggerRef }, { isOpen: open, autoResize: true });

    const hasSelectedItems = activeItemKeys.length > 0;
    const summarizedLabel = summarizedLabelFromProps ?? [activeItemKeys.length, 'selected'].join(' ');
    const inputWidth = getInputWidth(hasSelectedItems, filterLabel, placeholder);

    const handleClose = () => setOpen(false);

    useClickOutside(null, handleClose, [multiSelectRef?.current as HTMLElement, multiSelectMenuRef as HTMLElement]);

    const heightIsReady = maxHeight !== DEFAULT_DROPDOWN_MAX_HEIGHT;

    const toggleOpen = () => setOpen((open) => !open);

    const { buttonProps } = useButton(
        {
            onPress: toggleOpen,
            onKeyDown: (e) => {
                if (e.key === 'Escape') {
                    setOpen(false);
                }
            },
            elementType: 'div',
        },
        { current: triggerRef },
    );

    const toggleSelection = (key: string | number) => {
        const keySet = new Set(activeItemKeys);

        if (keySet.has(key)) {
            keySet.delete(key);
        } else {
            keySet.add(key);
        }

        onSelectionChange(Array.from(keySet));
    };

    const handleSpacebarToggle = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Space' && (filterInputRef.current !== document.activeElement || !filterable)) {
            toggleOpen();
        }
    };

    const getDecoratorClasses = () => {
        if (emphasis === MultiSelectEmphasis.Weak) {
            return hasSelectedItems ? '' : 'tw-text-text-weak';
        }

        return '';
    };

    const getTagType = () => {
        if (emphasis === MultiSelectEmphasis.Weak || !open) {
            return TagType.Selected;
        }
        return TagType.SelectedWithFocus;
    };

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckboxes(
            items
                .filter((item) => {
                    if (item.isCategory || item.isDivider) {
                        return true;
                    }

                    return item.value.toLowerCase().includes(e.currentTarget.value.toLowerCase());
                })
                .map((item) => ({ ...item, label: item.value })),
        );
    };

    useEffect(() => {
        setCheckboxes(
            items.map((item) => {
                const checkboxBaseItem = { ...item, label: item.value };
                if (indeterminateItemKeys?.includes(item.value)) {
                    return { ...checkboxBaseItem, state: CheckboxState.Mixed };
                }
                return checkboxBaseItem;
            }),
        );
    }, [items, indeterminateItemKeys]);

    const popperInstance = usePopper(triggerRef, multiSelectMenuRef, {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'flip',
                enabled: flip,
            },
        ],
    });

    return (
        <div className="tw-relative" ref={multiSelectRef}>
            <Trigger
                disabled={disabled}
                buttonProps={buttonProps}
                isFocusVisible={isFocusVisible}
                isOpen={open}
                validation={validation}
                emphasis={emphasis === MultiSelectEmphasis.Default ? TriggerEmphasis.Default : TriggerEmphasis.Weak}
            >
                <div className={merge(['tw-flex tw-flex-1 tw-gap-2', getPaddingClasses(size)])} ref={setTriggerRef}>
                    <div
                        className="tw-flex tw-flex-1 tw-gap-2 focus:tw-outline-0"
                        onClick={(e) => {
                            if (e.target === filterInputRef.current && open) {
                                return;
                            }
                            toggleOpen();
                        }}
                        role="button"
                        {...focusProps}
                        tabIndex={0}
                        onKeyDown={handleSpacebarToggle}
                    >
                        <div className="tw-flex tw-flex-wrap tw-gap-2 tw-outline-none tw-items-center tw-min-h-[28px]">
                            {decorator && <div className={getDecoratorClasses()}>{decorator}</div>}
                            {label && hasSelectedItems && <Text weight="strong">{label}</Text>}
                            {type === MultiSelectType.Default &&
                                activeItemKeys.map((key) => (
                                    <Tag
                                        key={key}
                                        type={getTagType()}
                                        label={key.toString()}
                                        size={size === MultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                        onClick={() => toggleSelection(key)}
                                    />
                                ))}

                            {type === MultiSelectType.Summarized && (hasSelectedItems || summarizedLabelFromProps) && (
                                <Tag
                                    type={getTagType()}
                                    label={summarizedLabel}
                                    size={size === MultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                    onClick={
                                        indeterminateItemKeys?.length === 0 ? () => onSelectionChange([]) : undefined
                                    }
                                />
                            )}

                            {!filterable && activeItemKeys.length === 0 && placeholder && (
                                <Text color="weak">{placeholder}</Text>
                            )}
                        </div>
                        {filterable && (
                            <input
                                ref={filterInputRef}
                                className="focus:tw-outline-0 tw-text-s tw-bg-transparent"
                                style={{ maxWidth: inputWidth }}
                                placeholder={activeItemKeys.length === 0 ? placeholder : filterLabel}
                                onChange={handleFilterChange}
                            />
                        )}
                    </div>
                </div>
            </Trigger>

            {open &&
                heightIsReady &&
                emphasis === MultiSelectEmphasis.Default &&
                createPortal(
                    <AnimatePresence>
                        <motion.div
                            ref={setMultiSelectMenuRef}
                            className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-30 tw-bg-base tw-min-w-[18rem]"
                            key="content"
                            style={{
                                ...popperInstance.styles.popper,
                                width: triggerRef?.getBoundingClientRect().width,
                            }}
                            {...popperInstance.attributes.popper}
                            initial={false} //disabling animation for now
                            animate={{ height: 'auto' }}
                            transition={{ ease: [0.04, 0.62, 0.23, 0.98], duration: 0.5 }}
                        >
                            <FocusScope restoreFocus>
                                <div
                                    className="tw-p-4 tw-overflow-y-auto tw-overflow-x-hidden tw-w-full tw-relative"
                                    style={{ maxHeight }}
                                >
                                    <Checklist
                                        activeValues={activeItemKeys.map((key) => key.toString())}
                                        setActiveValues={onSelectionChange}
                                        checkboxes={checkboxes.filter((item) => !item.isDivider && !item.isCategory)}
                                        direction={ChecklistDirection.Vertical}
                                        ariaLabel={ariaLabel}
                                    />
                                </div>
                            </FocusScope>
                        </motion.div>
                    </AnimatePresence>,
                    document.body,
                )}
            {open &&
                heightIsReady &&
                emphasis === MultiSelectEmphasis.Weak &&
                createPortal(
                    <AnimatePresence>
                        <motion.div
                            ref={setMultiSelectMenuRef}
                            style={{
                                ...popperInstance.styles.popper,
                                width: 'fit-content',
                                zIndex: 30,
                            }}
                            {...popperInstance.attributes.popper}
                            initial={{ height: DEFAULT_DROPDOWN_MIN_ANIMATION_HEIGHT }}
                            animate={{ height: 'auto' }}
                            transition={{ ease: [0.04, 0.62, 0.23, 0.98], duration: 0.5 }}
                        >
                            <Menu open={open} onClose={handleClose}>
                                {checkboxes.length > 0 && hasResults ? (
                                    checkboxes.map((item, index) => {
                                        const { label, value, avatar, imgSrc } = item;
                                        const isChecked = !!activeItemKeys.find((key) => key === value);
                                        const handleMenuItemClick = () => toggleSelection(label);

                                        if (item.isCategory || item.isDivider) {
                                            return (
                                                <OptionalItems
                                                    key={value + item}
                                                    {...{
                                                        checkboxes,
                                                        index,
                                                    }}
                                                />
                                            );
                                        }

                                        return (
                                            <MenuItem checked={isChecked} onClick={handleMenuItemClick} key={value}>
                                                <DefaultItem {...{ label, value, avatar, imgSrc, isChecked }} />
                                            </MenuItem>
                                        );
                                    })
                                ) : (
                                    <NoSearchResults label={noResultsLabel} />
                                )}
                            </Menu>
                        </motion.div>
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
};
