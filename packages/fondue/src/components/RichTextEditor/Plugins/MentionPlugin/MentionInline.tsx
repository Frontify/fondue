/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MentionableItems } from './types';
import { filterItems } from './helpers';
import { MentionCombobox } from '@components/RichTextEditor/Plugins/MentionPlugin/MentionCombobox/MentionCombobox';

// eslint-disable-next-line react/display-name
export const MentionInline = (items: MentionableItems) => () => {
    return <MentionCombobox items={items} filter={filterItems} />;
};
