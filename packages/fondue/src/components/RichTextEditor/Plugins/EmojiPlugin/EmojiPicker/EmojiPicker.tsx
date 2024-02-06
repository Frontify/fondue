/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn } from '@udecode/cn';
import { EmojiSettings, UseEmojiPickerType } from '@udecode/plate-emoji';
import { EmojiPickerContent } from './EmojiPickerContent';
import { EmojiPickerNavigation } from './EmojiPickerNavigation';
import { EmojiPickerPreview } from './EmojiPickerPreview';
import { EmojiPickerSearchAndClear } from './EmojiPickerSearchAndClear';
import { EmojiPickerSearchBar } from './EmojiPickerSearchBar';
import {
    emojiCategoryIcons,
    emojiSearchIcons,
} from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiPicker/EmojiIcons';

export function EmojiPicker({
    settings = EmojiSettings,
    i18n,
    searchValue,
    setSearch,
    clearSearch,
    isSearching,
    hasFound,
    searchResult,
    emoji,
    onSelectEmoji,
    onMouseOver,
    emojiLibrary,
    handleCategoryClick,
    focusedCategory,
    visibleCategories,
    refs,
}: Omit<UseEmojiPickerType, 'icons'>) {
    return (
        <div
            className={cn(
                'tw-flex tw-flex-col tw-rounded tw-bg-base tw-shadow-md tw-h-[350px] tw-border-line tw-border tw-w-[316px]',
            )}
        >
            <EmojiPickerNavigation
                i18n={i18n}
                emojiLibrary={emojiLibrary}
                icons={{
                    categories: emojiCategoryIcons,
                    search: emojiSearchIcons,
                }}
                focusedCategory={focusedCategory}
                onClick={handleCategoryClick}
            />
            <EmojiPickerSearchBar i18n={i18n} setSearch={setSearch} searchValue={searchValue}>
                <EmojiPickerSearchAndClear i18n={i18n} clearSearch={clearSearch} searchValue={searchValue} />
            </EmojiPickerSearchBar>
            <EmojiPickerContent
                i18n={i18n}
                emojiLibrary={emojiLibrary}
                isSearching={isSearching}
                searchResult={searchResult}
                visibleCategories={visibleCategories}
                settings={settings}
                onSelectEmoji={onSelectEmoji}
                onMouseOver={onMouseOver}
                refs={refs}
            />
            <EmojiPickerPreview i18n={i18n} emoji={emoji} hasFound={hasFound} isSearching={isSearching} />
        </div>
    );
}
