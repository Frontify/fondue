/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

/** One item of a node chrome menu: a radio item when `checked` is set, else a plain item. */
export const OptionItem = ({
    checked,
    onSelect,
    children,
}: {
    /** Whether the radio item is checked; leave out for a plain item. */
    checked?: boolean | undefined;
    /** Runs when the item is chosen, by click or key. */
    onSelect: () => void;
    /** The item's visible label. */
    children: ReactNode;
}) => {
    let semantics = {};
    if (checked !== undefined) {
        semantics = { role: 'menuitemradio', 'aria-checked': checked };
    }

    return (
        // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
        <Dropdown.Item {...semantics} onSelect={onSelect}>
            {children}
        </Dropdown.Item>
    );
};

OptionItem.displayName = 'OptionItem';
