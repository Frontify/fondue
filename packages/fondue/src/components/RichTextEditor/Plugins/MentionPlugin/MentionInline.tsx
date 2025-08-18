/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionCombobox } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionCombobox/MentionCombobox';

import { filterItems } from './helpers';
import { type MentionableItems } from './types';

export const MentionInline = (items: MentionableItems) => () => {
    return <MentionCombobox items={items} filter={filterItems} />;
};
