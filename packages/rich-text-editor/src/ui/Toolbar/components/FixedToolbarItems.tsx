/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ChromeBoundary } from '#/bridge/nodeViews/components/ChromeBoundary';
import { NO_ATTRS } from '#/bridge/nodeViews/helpers/noAttrs';
import { Item } from '#/ui/components/Item';
import { TextStyle } from '#/ui/components/TextStyle';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';

type FixedToolbarItemsProps = {
    items: readonly ToolbarItem[];
    disabled: boolean;
    strings: ToolbarStrings;
    keepsFocus: boolean;
};

/** The fixed toolbar's visible items, each isolated so one that throws leaves only its own place empty. */
export const FixedToolbarItems = ({ items, disabled, strings, keepsFocus }: FixedToolbarItemsProps) =>
    items.map((item) => {
        let content = (
            <Item item={item} disabled={disabled} strings={strings} keepsFocus={keepsFocus} outOfTabOrder={false} />
        );
        if (item.options !== undefined) {
            content = <TextStyle item={item} disabled={disabled} keepsFocus={keepsFocus} outOfTabOrder={false} />;
        }

        // An item that throws leaves only its own place empty, with no message to read between the items.
        return (
            <ChromeBoundary key={item.key} message="" attrs={NO_ATTRS}>
                {content}
            </ChromeBoundary>
        );
    });

FixedToolbarItems.displayName = 'FixedToolbarItems';
