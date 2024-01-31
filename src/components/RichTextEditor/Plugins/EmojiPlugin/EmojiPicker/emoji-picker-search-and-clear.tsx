/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cn } from '@udecode/cn';
import { UseEmojiPickerType } from '@udecode/plate-emoji';
import { Icons } from '@components/RichTextEditor/components/Icons';

export type EmojiPickerSearchAndClearProps = Pick<UseEmojiPickerType, 'i18n' | 'searchValue' | 'clearSearch'>;

export function EmojiPickerSearchAndClear({ i18n, searchValue, clearSearch }: EmojiPickerSearchAndClearProps) {
    return (
        <>
            <span className={cn('tw-absolute tw-left-2 tw-top-1/2 tw-z-10 tw-flex tw-h-5 tw-w-5 tw--translate-y-1/2')}>
                <Icons.search />
            </span>
            {searchValue && (
                <button
                    title={i18n.clear}
                    aria-label="Clear"
                    type="button"
                    className={cn(
                        'tw-absolute tw-right-0 tw-top-1/2 tw-flex tw-h-8 tw-w-8 tw--translate-y-1/2 tw-cursor-pointer tw-border-none tw-bg-transparent',
                    )}
                    onClick={clearSearch}
                >
                    <Icons.clear className="tw-h-full tw-w-full" />
                </button>
            )}
        </>
    );
}
