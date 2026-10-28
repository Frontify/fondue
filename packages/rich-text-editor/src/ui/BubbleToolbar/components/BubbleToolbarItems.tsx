/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChromeBoundary } from '#/bridge/nodeViews/components/ChromeBoundary';
import { NO_ATTRS } from '#/bridge/nodeViews/helpers/noAttrs';
import { Item } from '#/ui/components/Item';
import { TextStyle } from '#/ui/components/TextStyle';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';

type BubbleToolbarItemsProps = {
    items: readonly ToolbarItem[];
    strings: ToolbarStrings;
};

/** The bubble toolbar's items, each isolated so one that throws leaves only its own place empty. */
export const BubbleToolbarItems = ({ items, strings }: BubbleToolbarItemsProps) =>
    items.map((item) => {
        let content = <Item item={item} disabled={false} strings={strings} keepsFocus outOfTabOrder />;
        if (item.options !== undefined) {
            content = <TextStyle item={item} disabled={false} keepsFocus outOfTabOrder />;
        }

        // An item that throws leaves only its own place empty, with no message to read between the items.
        return (
            <ChromeBoundary key={item.key} message="" attrs={NO_ATTRS}>
                {content}
            </ChromeBoundary>
        );
    });

BubbleToolbarItems.displayName = 'BubbleToolbarItems';
