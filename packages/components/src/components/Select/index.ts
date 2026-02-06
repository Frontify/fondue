/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ComboboxMultiple } from './ComboboxMultiple';
import { ComboboxSingle } from './ComboboxSingle';
import { ForwardedRefSelectItem, ForwardedRefSelectItemGroup } from './components/SelectItem';
import { SelectMultiple } from './SelectMultiple';
import { SelectSingle } from './SelectSingle';
import { ForwardedRefSelectSlot } from './components/SelectSlot';

type ComboboxComponent = typeof ComboboxSingle & {
    Multiple: typeof ComboboxMultiple;
};

// @ts-expect-error We support both Select and Select.Combobox as the Root
const Combobox: ComboboxComponent = ComboboxSingle;
Combobox.Multiple = ComboboxMultiple;

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectSingle & {
    Multiple: typeof SelectMultiple;
    Combobox: ComboboxComponent;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
    Slot: typeof ForwardedRefSelectSlot;
} = SelectSingle;

Select.displayName = 'Select';
Select.Multiple = SelectMultiple;
Select.Multiple.displayName = 'Select.Multiple';
Select.Combobox = Combobox;
Select.Combobox.displayName = 'Select.Combobox';
Select.Combobox.Multiple = ComboboxMultiple;
Select.Combobox.Multiple.displayName = 'Select.Combobox.Multiple';
Select.Item = ForwardedRefSelectItem;
Select.Item.displayName = 'Select.Item';
Select.Group = ForwardedRefSelectItemGroup;
Select.Group.displayName = 'Select.Group';
Select.Slot = ForwardedRefSelectSlot;
Select.Slot.displayName = 'Select.Slot';
