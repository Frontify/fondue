/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from '@foundation/Icon/IconSize';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { MouseEvent, ReactElement, useRef } from 'react';
import { IconCross } from '@foundation/Icon';

export enum TagType {
    Suggested = 'Suggested',
    Selected = 'Selected',
    SelectedWithFocus = 'SelectedWithFocus',
    PreviouslySelected = 'PreviouslySelected',
}

export enum TagSize {
    Small = 'Small',
    Medium = 'Medium',
}

export const tagStyles: Record<TagType, string> = {
    [TagType.Suggested]:
        'tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-border-black-20 dark:tw-border-white hover:tw-border-black-40 dark:hover:tw-border-black-20 tw-text-black-80 dark:tw-text-white dark:hover:tw-text-black-20',
    [TagType.Selected]:
        'tw-bg-black-5 hover:tw-bg-black-10 dark:hover:tw-bg-black-20 tw-border-black-5 hover:tw-border-black-10 dark:hover:tw-border-black-20 tw-text-black-80 hover:tw-text-black-100',
    [TagType.SelectedWithFocus]:
        'tw-bg-violet-60 dark:tw-bg-violet-50 hover:tw-bg-violet-70 dark:hover:tw-bg-violet-60 tw-border-violet-60 dark:tw-border-violet-50 hover:tw-border-violet-70 dark:hover:tw-border-violet-60 tw-text-white',
    [TagType.PreviouslySelected]:
        'tw-bg-white dark:tw-bg-black-100 hover:tw-bg-black-0 dark:hover:tw-bg-black-superdark tw-text-violet-60 dark:tw-text-violet-50 hover:tw-text-violet-70 dark:hover:tw-text-violet-60',
};

export type TagProps = TagPropsUnselected | TagPropsSelected;

type TagPropsSelected = {
    type: TagType.Selected | TagType.SelectedWithFocus;
    label: string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    size?: TagSize;
};

type TagPropsUnselected = {
    type: TagType.Suggested | TagType.PreviouslySelected;
    label: string;
    onClick?: null;
    size?: TagSize;
};

export const Tag = ({ type, label, onClick, size = TagSize.Medium }: TagProps): ReactElement => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const { isFocusVisible, focusProps } = useFocusRing();
    const isClickable = (type === TagType.Selected || type === TagType.SelectedWithFocus) && onClick;
    const { buttonProps } = useButton(
        {
            onPress: () => isClickable && onClick(),
        },
        ref,
    );

    return (
        <button
            data-test-id="tag"
            className={merge([
                'tw-inline-flex tw-items-center tw-border tw-border-solid tw-rounded-full tw-text-xs tw-transition-colors tw-group  tw-break-word',
                size === TagSize.Small ? 'tw-px-[6px] tw-py-[2px]' : 'tw-px-2.5 tw-py-1',
                tagStyles[type],
                isClickable ? 'tw-cursor-pointer' : 'tw-cursor-default',
                isFocusVisible && FOCUS_STYLE,
            ])}
            {...mergeProps(buttonProps, focusProps)}
        >
            {label}
            {isClickable && (
                <span
                    data-test-id="tag-reject-icon"
                    className="tw-opacity-80 group-hover:tw-opacity-100 tw-transition-opacity tw-ml-1"
                >
                    <IconCross size={IconSize.Size12} />
                </span>
            )}
        </button>
    );
};
