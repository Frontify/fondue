/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import {
    EmojiPickerContent,
    EmojiPickerNavigation,
    EmojiPickerPreview,
    EmojiPickerSearchAndClear,
    EmojiPickerSearchBar,
    UseEmojiPickerType,
} from '@udecode/plate';
import { EmojiPickerSearchBarStyle, EmojiPickerSearchAndClearStyle } from './EmojiPickerStyles';

export const EmojiPicker = ({
    i18n,
    searchValue,
    setSearch,
    clearSearch,
    isSearching,
    hasFound,
    searchResult,
    emoji,
    setEmoji,
    selectEmoji,
    emojiLibrary,
    icons,
    handleCategoryClick,
    focusedCategory,
    visibleCategories,
    refs,
    settings,
}: UseEmojiPickerType) => {
    return (
        <div className="tw-w-[316px] tw-h-[350px] tw-flex tw-flex-col tw-bg-base tw-shadow-md tw-rounded tw-border tw-border-line">
            <EmojiPickerNavigation
                i18n={i18n}
                emojiLibrary={emojiLibrary}
                icons={icons}
                focusedCategory={focusedCategory}
                onClick={handleCategoryClick}
            />
            <EmojiPickerSearchBar
                i18n={i18n}
                setSearch={setSearch}
                searchValue={searchValue}
                styles={EmojiPickerSearchBarStyle}
            >
                <EmojiPickerSearchAndClear
                    i18n={i18n}
                    clearSearch={clearSearch}
                    searchValue={searchValue}
                    styles={EmojiPickerSearchAndClearStyle}
                />
            </EmojiPickerSearchBar>
            <EmojiPickerContent
                i18n={i18n}
                setEmoji={setEmoji}
                emojiLibrary={emojiLibrary}
                isSearching={isSearching}
                searchResult={searchResult}
                visibleCategories={visibleCategories}
                selectEmoji={selectEmoji}
                settings={settings}
                refs={refs}
            />
            <EmojiPickerPreview i18n={i18n} emoji={emoji} hasFound={hasFound} isSearching={isSearching} />
        </div>
    );
};
