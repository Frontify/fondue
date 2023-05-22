/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize } from '@components/MenuItem';
import { MenuItem } from '@components/MenuItem/MenuItem';
import { getInteractionModality } from '@react-aria/interactions';
import { useOption } from '@react-aria/listbox';
import { merge } from '@utilities/merge';
import { useActor } from '@xstate/react';
import React, { ReactElement, useRef } from 'react';
import { IconOptions } from './LinkChooser';
import { DropdownState, LinkChooserState, SectionState } from './state/types';
import { ImageMenuItemProps, SearchResult, SearchResultOptionProps } from './types';
import { findSection } from './utils/helpers';

export const SearchResultOption = ({
    item,
    state,
    keyItemRecord,
    machineService,
}: SearchResultOptionProps): ReactElement => {
    const ref = useRef<HTMLLIElement>(null);
    const { optionProps, isDisabled, isSelected, isFocused } = useOption(
        {
            key: item.key,
            shouldFocusOnHover: false,
        },
        state,
        ref,
    );
    const [
        {
            context: { extraSections, currentSectionId },
            matches,
        },
    ] = useActor(machineService);

    const menuItem = keyItemRecord[item.key];
    const decorator = menuItem.icon ? IconOptions[menuItem.icon] : undefined;
    const currentSection = findSection(extraSections, currentSectionId);
    const isLoaded = (currentState: DropdownState) =>
        matches(`${LinkChooserState.Focused}.${currentState}.${SectionState.Loaded}`);

    const isFocusVisible = getInteractionModality() !== 'pointer';

    const renderExtraSection = (menuItem: SearchResult) =>
        currentSection?.renderPreview?.(menuItem) || <ImageMenuItem {...menuItem} />;

    return (
        <li
            {...optionProps}
            ref={ref}
            className={merge([
                'tw-relative hover:tw-bg-black-10 tw-list-none tw-outline-none',
                isDisabled && 'tw-pointer-events-none tw-top-px',
                isFocused && isFocusVisible && 'tw-bg-black-10',
            ])}
        >
            {isLoaded(DropdownState.Default) && (
                <MenuItem {...menuItem} active={isSelected} decorator={decorator} size={MenuItemContentSize.Large} />
            )}
            {isLoaded(DropdownState.ExtraSection) && renderExtraSection(menuItem)}
        </li>
    );
};

const ImageMenuItem = ({ title, subtitle, preview }: ImageMenuItemProps): ReactElement => (
    <div className="tw-flex tw-px-5 tw-py-1.5 tw-cursor-pointer">
        <div className="tw-flex tw-flex-shrink-0 tw-w-[75px] tw-h-[75px] tw-max-w-xs tw-bg-black-0 tw-rounded">
            {preview && <img className="tw-w-full tw-object-contain" src={preview} alt={title as string} />}
        </div>
        <div className="tw-flex tw-flex-col tw-justify-center tw-ml-4">
            <p className="tw-block tw-text-md tw-leading-tight tw-hover:underline tw-text-black-80">{title}</p>
            {subtitle && <p className="tw-text-[12px] tw-text-black-80">{subtitle}</p>}
        </div>
    </div>
);
