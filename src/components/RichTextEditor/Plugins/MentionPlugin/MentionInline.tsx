/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionCombobox } from '@udecode/plate';
import { MentionComboboxItem, MentionComboboxStyles } from './MentionCombobox';
import { MentionableItems } from './types';
import { filterItems } from './helpers';

// eslint-disable-next-line react/display-name
export const MentionInline = (items: MentionableItems) => () => {
    return (
        <MentionCombobox
            items={items}
            filter={filterItems}
            onRenderItem={MentionComboboxItem}
            styles={MentionComboboxStyles}
            classNames={{
                item: 'tw-group',
                highlightedItem: 'tw-group',
            }}
        />
    );
};
