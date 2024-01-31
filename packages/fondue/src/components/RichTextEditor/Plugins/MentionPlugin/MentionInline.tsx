/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_MENTION, MentionCombobox, autoUpdate } from '@udecode/plate';
import { MentionComboboxItem, MentionComboboxStyles } from './MentionCombobox';
import { MentionableItems } from './types';
import { filterItems } from './helpers';
import { getMentionOnSelectItem } from './getMentionOnSelectItem';

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
            floatingOptions={{
                whileElementsMounted(...args) {
                    return autoUpdate(...args, { animationFrame: true });
                },
            }}
            onSelectItem={getMentionOnSelectItem({
                key: ELEMENT_MENTION,
            })}
        />
    );
};
