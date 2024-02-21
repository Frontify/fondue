/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { ComboboxItemProps } from '@udecode/plate-combobox';
import { EmojiItemData } from '@udecode/plate-emoji';

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
