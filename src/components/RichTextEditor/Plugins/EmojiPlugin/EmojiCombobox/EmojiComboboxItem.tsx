/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { ComboboxItemProps, EmojiItemData } from '@udecode/plate';

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
