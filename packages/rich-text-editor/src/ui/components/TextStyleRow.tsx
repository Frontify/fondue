/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { type MutableRefObject, type RefObject } from 'react';

import { CheckedSlot } from '#/bridge/chrome/components/CheckedSlot';
import { type EditorPort } from '#/runtime/port';
import { returnFocus, runItem, type ToolbarItem } from '#/ui/helpers/items';

type TextStyleOption = NonNullable<ToolbarItem['options']>[number];

type TextStyleRowProps = {
    option: TextStyleOption;
    checked: boolean;
    runtime: EditorPort | undefined;
    contentRef: RefObject<HTMLDivElement | null>;
    ranRef: MutableRefObject<boolean>;
};

/** One text style row: a radio that runs the row's command and then returns focus to the surface. */
export const TextStyleRow = ({ option, checked, runtime, contentRef, ranRef }: TextStyleRowProps) => (
    <Dropdown.Item
        // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
        {...{ role: 'menuitemradio', 'aria-checked': checked }}
        onSelect={async () => {
            if (runtime === undefined) {
                return;
            }

            ranRef.current = true;
            await runItem(runtime, option, false);
            returnFocus(runtime, [contentRef.current]);
        }}
    >
        {/* An element, since Fondue's `Dropdown.Item` wraps text beside another child in an unkeyed span. */}
        {option.brand === undefined ? (
            <span>{option.label}</span>
        ) : (
            <span style={option.brand.preview} data-rte-style-preview="">
                {option.label}
            </span>
        )}
        {checked && <CheckedSlot />}
    </Dropdown.Item>
);

TextStyleRow.displayName = 'TextStyleRow';
