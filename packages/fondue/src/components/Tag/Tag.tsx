/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type MouseEvent, useRef } from 'react';

import IconCross from '@foundation/Icon/Generated/IconCross';
import { IconSize } from '@foundation/Icon/IconSize';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

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
        'tw-border tw-bg-base tw-text-text-weak tw-border-line hover:tw-text-text hover:tw-border-line-strong',
    [TagType.Selected]:
        'tw-bg-box-neutral hover:tw-bg-box-neutral-hover tw-text-text-weak hover:tw-text-box-neutral-inverse-hover',
    [TagType.SelectedWithFocus]:
        'tw-bg-box-selected-strong hover:tw-bg-box-selected-strong-hover tw-text-box-selected-strong-inverse',
    [TagType.PreviouslySelected]:
        'tw-bg-base tw-border tw-text-box-selected-strong tw-border-box-selected-strong hover:tw-bg-box-neutral hover:tw-text-box-selected-inverse hover:tw-border-box-selected-inverse',
};

export type TagProps = { 'data-test-id'?: string } & (TagPropsUnselected | TagPropsSelected);

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

export const Tag = ({ type, label, onClick, size = TagSize.Medium, 'data-test-id': dataTestId = 'tag' }: TagProps) => {
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
            data-test-id={dataTestId}
            className={merge([
                'tw-inline-flex tw-items-center tw-rounded-full tw-text-xs tw-transition-colors tw-group tw-outline-none tw-break-word',
                size === TagSize.Small ? 'tw-px-1.5 tw-py-0.5' : 'tw-px-2.5 tw-py-1',
                tagStyles[type],
                isClickable ? 'tw-cursor-pointer' : 'tw-cursor-default',
                isFocusVisible && FOCUS_STYLE,
            ])}
            {...mergeProps(buttonProps, focusProps)}
        >
            {label}
            {isClickable && (
                <span
                    data-test-id={`${dataTestId}-reject-icon`}
                    className="tw-opacity-80 group-hover:tw-opacity-100 tw-transition-opacity tw-ml-1 tw-leading-[0]"
                >
                    <IconCross size={IconSize.Size12} />
                </span>
            )}
        </button>
    );
};
Tag.displayName = 'FondueTag';
