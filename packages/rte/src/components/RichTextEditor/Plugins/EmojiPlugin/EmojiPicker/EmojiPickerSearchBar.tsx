/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type UseEmojiPickerType } from '@udecode/plate-emoji';
import { type ReactNode } from 'react';

export type EmojiPickerSearchBarProps = {
    children: ReactNode;
} & Pick<UseEmojiPickerType, 'i18n' | 'searchValue' | 'setSearch'>;

export function EmojiPickerSearchBar({ i18n, searchValue, setSearch, children }: EmojiPickerSearchBarProps) {
    return (
        <div className="tw-flex tw-items-center tw-px-2">
            <div className="tw-relative tw-flex tw-grow">
                <input
                    type="text"
                    placeholder={i18n.search}
                    autoComplete="off"
                    aria-label="Search"
                    className="tw-block tw-w-full tw-leading-4 tw-appearance-none tw-rounded-lg tw-border-0 tw-bg-[rgb(243,244,246)] tw-px-8 tw-py-2 tw-outline-none"
                    onChange={(event) => setSearch(event.target.value)}
                    value={searchValue}
                />
                {children}
            </div>
        </div>
    );
}
