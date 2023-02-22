/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ComboboxItemProps, EmojiItemData } from '@udecode/plate';

export const EmojiComboboxItem = ({ item }: ComboboxItemProps<EmojiItemData>): JSX.Element => {
    const {
        data: { id, emoji },
    } = item;

    return (
        <div className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
            {emoji} :{id}:
        </div>
    );
};
