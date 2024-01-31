/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn } from '@udecode/cn';
import { EmojiSettings, UseEmojiPickerType } from '@udecode/plate-emoji';
import { EmojiPickerContent } from './emoji-picker-content';
import { EmojiPickerNavigation } from './emoji-picker-navigation';
import { EmojiPickerPreview } from './emoji-picker-preview';
import { EmojiPickerSearchAndClear } from './emoji-picker-search-and-clear';
import { EmojiPickerSearchBar } from './emoji-picker-search-bar';
import {
    emojiCategoryIcons,
    emojiSearchIcons,
} from '@components/RichTextEditor/Plugins/EmojiPlugin/EmojiPicker/emoji-icons';

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
                'tw-flex tw-flex-col tw-rounded tw-bg-white dark:tw-bg-slate-950',
                'tw-h-[350px] tw-w-[316px] tw-shadow-[rgb(15_15_15_/_5%)_0_0_0_1px,_rgb(15_15_15_)]',
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
