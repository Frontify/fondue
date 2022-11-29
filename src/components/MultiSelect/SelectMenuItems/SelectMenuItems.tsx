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

export const CategoryItem = ({ label }: CategoryItemProps) => {
    return (
        <div className="tw-w-full tw-text-left tw-py-2 tw-px-5">
            <Text weight="strong">{label}</Text>
        </div>
    );
};

type DefaultItemProps = {
    label: string;
    value: string;
    isChecked?: boolean;
    imgSrc?: string;
};

export const DefaultItem = ({ label, value, imgSrc, isChecked = false }: DefaultItemProps) => {
    return (
        <div className={`tw-flex tw-items-center tw-justify-between ${isChecked ? 'tw-text-text-interactive' : ''}`}>
            <div className="tw-flex tw-gap-3 tw-items-center">
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt={value}
                        className="tw-w-[1.5rem] tw-h-[1.5rem] tw-rounded-[50%] tw-object-cover tw-z-10"
                    />
                )}
                <Text color={isChecked ? 'interactive' : 'weak'}>{label}</Text>
            </div>
            {isChecked && <IconCheckMark16 />}
        </div>
    );
};

type NoSearchResultsProps = {
    label?: string;
};

export const NoSearchResults = ({ label = '' }: NoSearchResultsProps) => {
    return (
        <div className="tw-py-2 tw-px-5">
            <Text color="weak">{label}</Text>
        </div>
    );
};

type OptionalItemsProps = {
    item: Item;
    index: number;
    isNextItemDivider?: boolean;
    isPreviousItemDivider?: boolean;
};

export const OptionalItems = ({
    item,
    index,
    isNextItemDivider = false,
    isPreviousItemDivider = false,
}: OptionalItemsProps) => {
    const { value, label } = item;

    if (item.isCategory) {
        return isNextItemDivider ? <></> : <CategoryItem key={value} label={label} />;
    }
    if (item.isDivider) {
        return isNextItemDivider || isPreviousItemDivider ? <></> : <DividerItem key={value + index} />;
    }
    return null;
};
