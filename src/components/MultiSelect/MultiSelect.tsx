/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checklist, ChecklistDirection } from '@components/Checklist/Checklist';
import { Tag, TagSize, TagType } from '@components/Tag';
import { Trigger, TriggerEmphasis } from '@components/Trigger/Trigger';
import { Text } from '@typography/Text';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, KeyboardEvent, useRef, useState } from 'react';
import { getPaddingClasses } from './helpers';
import { Menu } from '@components/Menu';
import { MenuItem } from '..';
import { IconCheckMark16 } from '@foundation/Icon';
import { useClickOutside } from '@hooks/useClickOutside';

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
    menuItem?: React.ReactNode;
    filterLabel?: string;
    noResultsLabel?: string;
};

export const MultiSelect: FC<MultiSelectProps> = ({
    items,
    activeItemKeys,
    onSelectionChange,
    ariaLabel = 'Select list',
    label,
    disabled = false,
    placeholder,
    filterLabel,
    noResultsLabel,
    type = MultiSelectType.Default,
    size = MultiSelectSize.Medium,
    validation = Validation.Default,
    emphasis = MultiSelectEmphasis.Default,
    decorator = null,
    filterable = false,
    menuItem,
}) => {
    const [open, setOpen] = useState(false);
    const [checkboxes, setCheckboxes] = useState(items.map((item) => ({ ...item, label: item.value })));
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const multiSelectRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const filterInputRef = useRef<HTMLInputElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();

    const handleClickOutside = () => {
        if (emphasis === MultiSelectEmphasis.Weak) {
            setOpen(false);
        }
    };

    useClickOutside(menuRef?.current, handleClickOutside, [multiSelectRef?.current as HTMLElement]);

    const toggleOpen = () => setOpen((open) => !open);

    const { overlayProps } = useOverlay(
        {
            isOpen: open,
            onClose: () => setOpen(false),
            shouldCloseOnBlur: true,
            isDismissable: true,
            shouldCloseOnInteractOutside: (element) => {
                return element && element.tagName !== 'BUTTON' && element.tagName !== 'svg';
            },
        },
        overlayRef,
    );

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
        triggerRef,
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

    const summarizedLabel = [activeItemKeys.length, 'selected'].join(' ');

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
                <div
                    className={merge([
                        'tw-flex tw-flex-1 tw-gap-2',
                        getPaddingClasses(size, activeItemKeys.length > 0),
                    ])}
                >
                    <div
                        className="tw-flex tw-flex-1 tw-gap-2 focus:tw-outline-0"
                        onClick={(e) => {
                            console.log('TESTTTTTTTTT');

                            if (e.target === filterInputRef.current && open) return;
                            toggleOpen();
                        }}
                        role="button"
                        {...focusProps}
                        tabIndex={0}
                        onKeyDown={handleSpacebarToggle}
                    >
                        <div
                            className={`tw-flex tw-flex-wrap tw-gap-2 tw-outline-none tw-items-center tw-min-h-[34px] ${
                                emphasis === MultiSelectEmphasis.Default ? '' : ''
                            }`}
                        >
                            {decorator && (
                                <div
                                    className={
                                        emphasis === MultiSelectEmphasis.Weak
                                            ? activeItemKeys.length > 0
                                                ? ''
                                                : 'tw-text-text-weak'
                                            : ''
                                    }
                                >
                                    {decorator}
                                </div>
                            )}
                            {placeholder && label && activeItemKeys.length > 0 && <Text weight="strong">{label}</Text>}
                            {type === MultiSelectType.Default &&
                                activeItemKeys.map((key) => (
                                    <Tag
                                        key={key}
                                        type={
                                            emphasis === MultiSelectEmphasis.Weak
                                                ? TagType.Selected
                                                : open
                                                ? TagType.SelectedWithFocus
                                                : TagType.Selected
                                        }
                                        label={key.toString()}
                                        size={size === MultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                        onClick={() => toggleSelection(key)}
                                    />
                                ))}

                            {type === MultiSelectType.Summarized && activeItemKeys.length > 0 && (
                                <Tag
                                    type={
                                        emphasis === MultiSelectEmphasis.Weak
                                            ? TagType.Selected
                                            : open
                                            ? TagType.SelectedWithFocus
                                            : TagType.Selected
                                    }
                                    label={summarizedLabel}
                                    size={size === MultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                    onClick={() => onSelectionChange([])}
                                />
                            )}

                            {!filterable && activeItemKeys.length === 0 && placeholder && (
                                <Text color="weak">{placeholder}</Text>
                            )}
                        </div>
                        {filterable && (
                            <input
                                ref={filterInputRef}
                                className="focus:tw-outline-0 tw-text-s"
                                placeholder={activeItemKeys.length === 0 ? label : filterLabel}
                                onChange={(e) => {
                                    setCheckboxes(
                                        items
                                            .filter((item) =>
                                                item.value.toLowerCase().includes(e.currentTarget.value.toLowerCase()),
                                            )
                                            .map((item) => ({ ...item, label: item.value })),
                                    );
                                }}
                            />
                        )}
                    </div>
                </div>
            </Trigger>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-30 tw-bg-base tw-min-w-[18rem]"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            {emphasis === MultiSelectEmphasis.Default ? (
                                <div {...overlayProps} ref={overlayRef} className="tw-p-4">
                                    <Checklist
                                        activeValues={activeItemKeys.map((key) => key.toString())}
                                        setActiveValues={onSelectionChange}
                                        checkboxes={checkboxes.filter((item) => !item.isDivider && !item.isCategory)}
                                        direction={ChecklistDirection.Vertical}
                                        ariaLabel={ariaLabel}
                                    />
                                </div>
                            ) : (
                                <div ref={menuRef}>
                                    <Menu open={open} onClose={() => setOpen(false)}>
                                        {checkboxes.length > 0 ? (
                                            checkboxes.map((item) => {
                                                const isChecked = activeItemKeys.find((key) => key === item.value);

                                                if (item.isCategory)
                                                    return (
                                                        <div className="tw-w-full tw-text-left tw-py-2 tw-px-5">
                                                            <Text weight="strong">{item.label}</Text>
                                                        </div>
                                                    );
                                                if (item.isDivider)
                                                    return (
                                                        <div className="tw-border-t tw-w-full tw-border-solid tw-my-2 tw-border-line" />
                                                    );

                                                return (
                                                    <MenuItem
                                                        checked={!!isChecked}
                                                        onClick={() => toggleSelection(item.label)}
                                                        key={item.value}
                                                    >
                                                        {/* TODO: Create these variants in MenuItem */}
                                                        <div
                                                            className={`tw-flex tw-items-center tw-justify-between ${
                                                                isChecked ? 'tw-text-text-interactive' : ''
                                                            }`}
                                                        >
                                                            <div className="tw-flex tw-gap-3 tw-items-center">
                                                                {item.imgSrc && (
                                                                    <img
                                                                        src={item.imgSrc}
                                                                        className="tw-w-[1.5rem] tw-h-[1.5rem] tw-rounded-[50%] tw-object-cover tw-z-10"
                                                                    />
                                                                )}
                                                                <Text color={isChecked ? 'interactive' : 'weak'}>
                                                                    {item.label}
                                                                </Text>
                                                            </div>
                                                            {isChecked && <IconCheckMark16 />}
                                                        </div>
                                                        {menuItem}
                                                    </MenuItem>
                                                );
                                            })
                                        ) : (
                                            <div className="tw-py-2 tw-px-5">
                                                <Text color="weak">{noResultsLabel}</Text>
                                            </div>
                                        )}
                                    </Menu>
                                </div>
                            )}
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
