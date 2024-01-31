import React from 'react';
import { cn } from '@udecode/cn';
import {
  EmojiCategoryList,
  IEmojiFloatingLibrary,
  UseEmojiPickerType,
} from '@udecode/plate-emoji';

export type EmojiPickerNavigationProps = Pick<
  UseEmojiPickerType,
  'i18n' | 'emojiLibrary' | 'icons' | 'focusedCategory'
> & {
  onClick: (id: EmojiCategoryList) => void;
};

const getBarProperty = (
  emojiLibrary: IEmojiFloatingLibrary,
  focusedCategory?: EmojiCategoryList
) => {
  let width = 0;
  let position = 0;
  if (focusedCategory) {
    width = 100 / emojiLibrary.getGrid().size;
    position = focusedCategory
      ? emojiLibrary.indexOf(focusedCategory) * 100
      : 0;
  }

  return { width, position };
};

export function EmojiPickerNavigation({
  i18n,
  icons,
  emojiLibrary,
  focusedCategory,
  onClick,
}: EmojiPickerNavigationProps) {
  const { width, position } = getBarProperty(emojiLibrary, focusedCategory);

  return (
    <nav
      id='emoji-nav'
      className="tw-'mb-2.5 tw-border-0 tw-border-b tw-border-solid tw-border-b-gray-100 tw-p-3'"
    >
      <div className="tw-'relative tw-flex'">
        {emojiLibrary
          .getGrid()
          .sections()
          .map(({ id }) => (
            <button
              key={id}
              aria-label={i18n.categories[id]}
              title={i18n.categories[id]}
              type='button'
              className={cn(
                "tw-'flex tw-grow tw-cursor-pointer tw-items-center tw-justify-center tw-border-none tw-bg-transparent tw-fill-current tw-text-sm tw-text-gray-500 hover:tw-text-gray-800'",
                id === focusedCategory &&
                  "tw-'pointer-events-none tw-fill-current tw-text-blue-600'"
              )}
              onClick={() => onClick(id)}
            >
              <span style={{ width: '20px', height: '20px' }}>
                {icons.categories[id].outline}
              </span>
            </button>
          ))}
        <div
          className="tw-'absolute tw--bottom-3 tw-left-0 tw-h-[3px] tw-w-full tw-rounded-t tw-bg-blue-600 tw-opacity-100 tw-transition-transform tw-duration-200'"
          style={{
            visibility: `${focusedCategory ? 'visible' : 'hidden'}`,
            width: `${width}%`,
            transform: `translateX(${position}%)`,
          }}
        />
      </div>
    </nav>
  );
}
