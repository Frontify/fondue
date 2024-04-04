/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComboboxItemProps } from '@udecode/plate-combobox';
import { type EmojiItemData } from '@udecode/plate-emoji';
import { type ReactElement } from 'react';

export const EmojiComboboxItem = ({ item }: ComboboxItemProps<EmojiItemData>): ReactElement => {
    const {
        data: { id, emoji },
    } = item;

    return (
        <div className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
            {emoji} :{id}:
        </div>
    );
};
