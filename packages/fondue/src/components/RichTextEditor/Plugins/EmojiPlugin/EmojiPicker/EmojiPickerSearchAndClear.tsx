/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross20, IconMagnifier16 } from '@foundation/Icon';
import { UseEmojiPickerType } from '@udecode/plate-emoji';

export type EmojiPickerSearchAndClearProps = Pick<UseEmojiPickerType, 'i18n' | 'searchValue' | 'clearSearch'>;

export function EmojiPickerSearchAndClear({ i18n, searchValue, clearSearch }: EmojiPickerSearchAndClearProps) {
    return (
        <>
            <span className="tw-absolute tw-left-2 tw-top-1/2 tw-flex tw-h-4 tw-w-4 tw--translate-y-1/2">
                <IconMagnifier16 />
            </span>
            {searchValue && (
                <button
                    title={i18n.clear}
                    aria-label="Clear"
                    type="button"
                    className="tw-absolute tw-right-1.5 tw-top-1/2 tw-flex tw-h-5 tw-w-5 tw--translate-y-1/2 tw-cursor-pointer tw-border-none tw-bg-transparent"
                    onClick={clearSearch}
                >
                    <IconCross20 />
                </button>
            )}
        </>
    );
}
