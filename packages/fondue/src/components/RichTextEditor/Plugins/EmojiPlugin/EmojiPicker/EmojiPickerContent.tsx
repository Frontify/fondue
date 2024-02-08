/* (c) Copyright Frontify Ltd., all rights reserved. */

import { memo, useCallback } from 'react';
import { Emoji, EmojiCategoryList, EmojiSettings, GridRow, UseEmojiPickerType } from '@udecode/plate-emoji';

export type EmojiPickerContentProps = Pick<
    UseEmojiPickerType,
    | 'i18n'
    | 'onMouseOver'
    | 'onSelectEmoji'
    | 'emojiLibrary'
    | 'isSearching'
    | 'searchResult'
    | 'visibleCategories'
    | 'refs'
    | 'settings'
>;

export type EmojiButtonProps = {
    index: number;
    emoji: Emoji;
    onSelect: (emoji: Emoji) => void;
    onMouseOver: (emoji?: Emoji) => void;
};

export type RowOfButtonsProps = Pick<UseEmojiPickerType, 'onMouseOver' | 'onSelectEmoji' | 'emojiLibrary'> & {
    row: GridRow;
};

const Button = memo(({ index, emoji, onSelect, onMouseOver }: EmojiButtonProps) => {
    return (
        <button
            type="button"
            aria-label={emoji?.skins[0]?.native}
            tabIndex={-1}
            data-index={index}
            onClick={() => onSelect(emoji)}
            onMouseEnter={() => onMouseOver(emoji)}
            onMouseLeave={() => onMouseOver()}
            className="tw-group/emojibutton tw-relative tw-flex tw-h-9 tw-w-9 tw-cursor-pointer tw-items-center tw-justify-center tw-border-none tw-bg-transparent tw-text-2xl tw-leading-none"
        >
            <div
                aria-hidden="true"
                className="tw-absolute tw-inset-0 tw-rounded-full tw-bg-[rgba(0,0,0,0.05)] tw-opacity-0 group-hover/emojibutton:tw-opacity-100"
            />
            <span data-emoji-set="native" className="tw-relative">
                {emoji?.skins[0]?.native}
            </span>
        </button>
    );
});
Button.displayName = 'Button';

const RowOfButtons = memo(({ row, emojiLibrary, onSelectEmoji, onMouseOver }: RowOfButtonsProps) => (
    <div key={row.id} data-index={row.id} className="tw-flex">
        {row.elements.map((emojiId, index) => (
            <Button
                key={emojiId}
                index={index}
                emoji={emojiLibrary.getEmoji(emojiId)}
                onSelect={onSelectEmoji}
                onMouseOver={onMouseOver}
            />
        ))}
    </div>
));
RowOfButtons.displayName = 'RowOfButtons';

export function EmojiPickerContent({
    i18n,
    onSelectEmoji,
    onMouseOver,
    emojiLibrary,
    isSearching = false,
    searchResult,
    visibleCategories,
    refs,
    settings = EmojiSettings,
}: EmojiPickerContentProps) {
    const rowWidth = settings.perLine.value * settings.buttonSize.value;

    const isCategoryVisible = useCallback(
        (categoryId: EmojiCategoryList) => {
            return visibleCategories.has(categoryId) ? visibleCategories.get(categoryId) : false;
        },
        [visibleCategories],
    );

    const EmojiList = useCallback(() => {
        return emojiLibrary
            .getGrid()
            .sections()
            .map(({ id: categoryId }) => {
                const section = emojiLibrary.getGrid().section(categoryId);
                const { buttonSize } = settings;

                return (
                    <div key={categoryId} data-id={categoryId} ref={section.root} style={{ width: rowWidth }}>
                        <div className="tw-sticky tw--top-px tw-z-[1] tw-bg-white/90 tw-p-1 tw-backdrop-blur-[4px]">
                            {i18n.categories[categoryId]}
                        </div>
                        <div
                            className="tw-relative tw-flex tw-flex-wrap"
                            style={{ height: section.getRows().length * buttonSize.value }}
                        >
                            {isCategoryVisible(categoryId) &&
                                section
                                    .getRows()
                                    .map((row: GridRow, index) => (
                                        <RowOfButtons
                                            key={index}
                                            emojiLibrary={emojiLibrary}
                                            row={row}
                                            onSelectEmoji={onSelectEmoji}
                                            onMouseOver={onMouseOver}
                                        />
                                    ))}
                        </div>
                    </div>
                );
            });
    }, [emojiLibrary, rowWidth, i18n.categories, isCategoryVisible, onSelectEmoji, onMouseOver, settings]);

    const SearchList = useCallback(() => {
        return (
            <div data-id="search" style={{ width: rowWidth }}>
                <div className="tw-sticky tw--top-px tw-z-[1] tw-bg-white/90 tw-p-1 tw-backdrop-blur-[4px]">
                    {i18n.searchResult}
                </div>
                <div className="tw-relative tw-flex tw-flex-wrap">
                    {searchResult.map((emoji: Emoji, index: number) => (
                        <Button
                            key={emoji.id}
                            index={index}
                            emoji={emojiLibrary.getEmoji(emoji.id)}
                            onSelect={onSelectEmoji}
                            onMouseOver={onMouseOver}
                        />
                    ))}
                </div>
            </div>
        );
    }, [emojiLibrary, rowWidth, i18n.searchResult, searchResult, onSelectEmoji, onMouseOver]);

    return (
        <div
            className={
                'tw-h-full tw-min-h-[50%] tw-overflow-y-auto tw-overflow-x-hidden tw-px-3 [&::-webkit-scrollbar]:tw-w-4 [&::-webkit-scrollbar-button]:tw-hidden [&::-webkit-scrollbar-button]:tw-h-0 [&::-webkit-scrollbar-button]:tw-w-0 [&::-webkit-scrollbar-thumb]:hover:tw-bg-[#f3f4f6] [&::-webkit-scrollbar-thumb]:tw-min-h-[65px] [&::-webkit-scrollbar-thumb]:tw-rounded-2xl [&::-webkit-scrollbar-thumb]:tw-border-solid [&::-webkit-scrollbar-thumb]:tw-border-4 [&::-webkit-scrollbar-thumb]:tw-border-white [&::-webkit-scrollbar-track]:tw-border-0'
            }
            data-id="scroll"
            ref={refs.current.contentRoot}
        >
            <div ref={refs.current.content} className="tw-h-full">
                {isSearching ? SearchList() : EmojiList()}
            </div>
        </div>
    );
}
