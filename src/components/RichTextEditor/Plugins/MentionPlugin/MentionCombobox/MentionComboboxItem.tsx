/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ComboboxItemProps } from '@udecode/plate';
import { MentionItemData } from '../types';

export const MentionComboboxItem = ({ item }: ComboboxItemProps<MentionItemData>): JSX.Element => {
    const {
        data: { image, category },
        key,
        text,
    } = item;

    return (
        <div className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
            {image && (
                <span>
                    <img src={image} alt={`${category}-${text}`} />
                </span>
            )}
            <span>
                {key}={text}
            </span>
        </div>
    );
};
