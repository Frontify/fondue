/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MentionCombobox as MentionComboboxPlate } from '@udecode/plate';
import { MentionComboboxItem } from './MentionCombobox';
import { MentionableItems } from './types';
import { filterItems } from './helpers';

// eslint-disable-next-line react/display-name
export const MentionInline = (items: MentionableItems) => () => {
    return <MentionComboboxPlate items={items} filter={filterItems} onRenderItem={MentionComboboxItem} />;
};
