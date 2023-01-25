/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Text } from '@typography/Text';
import { IconCheckMark16 } from '@foundation/Icon';
import { Item } from '../MultiSelect';

export const DividerItem = () => {
    return <div className="tw-border-t tw-w-full tw-border-solid tw-my-2 tw-border-line" />;
};

type CategoryItemProps = {
    label: string;
};

// Min width for the MenuItem content should be 18rem
// CategoryItem and NoSearchResults will add the MenuItem internal padding of 2.5rem since they are not being
// rendered inside a MenuItem component due to hover state
export const CategoryItem = ({ label }: CategoryItemProps) => {
    return (
        <div className="tw-w-full tw-text-left tw-py-2 tw-px-5 tw-min-w-[20.5rem]">
            <Text weight="strong">{label}</Text>
        </div>
    );
};

type DefaultItemProps = {
    label: string;
    value: string;
    avatar?: React.ReactNode;
    isChecked?: boolean;
    imgSrc?: string;
};

export const DefaultItem = ({ label, value, avatar = <></>, imgSrc, isChecked = false }: DefaultItemProps) => {
    return (
        <div
            className={`tw-flex tw-items-center tw-justify-between tw-min-w-[18rem] ${
                isChecked ? 'tw-text-text-interactive' : ''
            }`}
        >
            <div className="tw-flex tw-gap-3 tw-items-center">
                {avatar}
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt={value}
                        className="tw-w-[1.5rem] tw-h-[1.5rem] tw-rounded-[50%] tw-object-cover tw-z-10"
                    />
                )}
                <Text color={isChecked ? 'interactive' : 'weak'}>{label}</Text>
            </div>
            {isChecked && (
                <div className="tw-ml-2">
                    <IconCheckMark16 />
                </div>
            )}
        </div>
    );
};

type NoSearchResultsProps = {
    label?: string;
};

export const NoSearchResults = ({ label = '' }: NoSearchResultsProps) => {
    return (
        <div className="tw-py-2 tw-px-5 tw-min-w-[20.5rem]">
            <Text color="weak">{label}</Text>
        </div>
    );
};

type OptionalItemsProps = {
    checkboxes: Item[];
    index: number;
};

export const OptionalItems = ({ checkboxes, index }: OptionalItemsProps) => {
    const { value, label, isCategory, isDivider } = checkboxes[index];
    const isNextItemDivider = checkboxes[index + 1]?.isCategory || checkboxes[index + 1]?.isDivider;
    const isPrevItemCategory = checkboxes[index - 1]?.isCategory;
    const hasItemAfterCategory = !checkboxes[index + 2]?.isCategory && checkboxes[index + 2]?.value;
    const hasNextValue = checkboxes[index + 1] && !isNextItemDivider;

    if (isCategory) {
        return !hasNextValue ? <></> : <CategoryItem key={value} label={label} />;
    }
    if (isDivider) {
        return isPrevItemCategory || !hasItemAfterCategory ? <></> : <DividerItem key={value + index} />;
    }
    return null;
};
