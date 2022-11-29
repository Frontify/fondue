/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checklist, ChecklistDirection } from '@components/Checklist/Checklist';
import { Tag, TagSize, TagType } from '@components/Tag/Tag';
import { Trigger } from '@components/Trigger/Trigger';
import { useButton } from '@react-aria/button';
import { FocusScope, useFocusRing } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import { mergeProps } from '@react-aria/utils';
import { merge } from '@utilities/merge';
import { Validation } from '@utilities/validation';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useRef, useState } from 'react';
import { getPaddingClasses } from './helpers';

export enum MultiSelectType {
    Default = 'Default',
    Summarized = 'Summarized',
}

export enum MultiSelectSize {
    Small = 'Small',
    Medium = 'Medium',
}

export type MultiSelectItem = {
    value: string;
    ariaLabel?: string;
};

export type MultiSelectProps = {
    items: MultiSelectItem[];
    activeItemKeys: (string | number)[];
    disabled?: boolean;
    onSelectionChange: (keys: (string | number)[]) => void;
    ariaLabel?: string;
    placeholder?: string;
    type?: MultiSelectType;
    size?: MultiSelectSize;
    validation?: Validation;
};

export const MultiSelect: FC<MultiSelectProps> = ({
    items,
    activeItemKeys,
    onSelectionChange,
    ariaLabel = 'Select list',
    disabled = false,
    placeholder,
    type = MultiSelectType.Default,
    size = MultiSelectSize.Medium,
    validation = Validation.Default,
}) => {
    const [open, setOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();
    const checkboxes = items.map((item) => ({ ...item, label: item.value }));

    const { overlayProps } = useOverlay(
        {
            isOpen: open,
            onClose: () => setOpen(false),
            shouldCloseOnBlur: true,
            isDismissable: true,
            shouldCloseOnInteractOutside: (element) =>
                element && element.tagName !== 'BUTTON' && element.tagName !== 'svg',
        },
        overlayRef,
    );

    const { buttonProps } = useButton(
        {
            onPress: () => {
                setOpen(true);
            },
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

    const summarizedLabel = [activeItemKeys.length, `option${activeItemKeys.length > 1 ? 's' : ''}`, 'selected'].join(
        ' ',
    );

    return (
        <div className="tw-relative">
            <Trigger
                disabled={disabled}
                buttonProps={buttonProps}
                isFocusVisible={isFocusVisible}
                isOpen={open}
                validation={validation}
            >
                <div
                    {...mergeProps(buttonProps, focusProps)}
                    ref={triggerRef}
                    className={merge([
                        'tw-flex-1 tw-flex tw-flex-wrap tw-gap-1 tw-min-h-[34px] tw-outline-none',
                        getPaddingClasses(size, activeItemKeys.length > 0),
                    ])}
                >
                    {type === MultiSelectType.Default &&
                        activeItemKeys.map((key) => (
                            <Tag
                                key={key}
                                type={open ? TagType.SelectedWithFocus : TagType.Selected}
                                label={key.toString()}
                                size={size === MultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                                onClick={() => toggleSelection(key)}
                            />
                        ))}

                    {type === MultiSelectType.Summarized && activeItemKeys.length > 0 && (
                        <Tag
                            type={open ? TagType.SelectedWithFocus : TagType.Selected}
                            label={summarizedLabel}
                            size={size === MultiSelectSize.Small ? TagSize.Small : TagSize.Medium}
                            onClick={() => onSelectionChange([])}
                        />
                    )}

                    {activeItemKeys.length === 0 && placeholder && (
                        <div className="tw-text-black-60 tw-text-s">{placeholder}</div>
                    )}
                </div>
            </Trigger>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="tw-absolute tw-left-0 tw-w-full tw-overflow-hidden tw-p-0 tw-shadow-mid tw-list-none tw-m-0 tw-mt-2 tw-z-10 tw-bg-base"
                        key="content"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <FocusScope restoreFocus>
                            <div {...overlayProps} ref={overlayRef} className="tw-p-4">
                                <Checklist
                                    activeValues={activeItemKeys.map((key) => key.toString())}
                                    setActiveValues={onSelectionChange}
                                    checkboxes={checkboxes}
                                    direction={ChecklistDirection.Vertical}
                                    ariaLabel={ariaLabel}
                                />
                            </div>
                        </FocusScope>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
