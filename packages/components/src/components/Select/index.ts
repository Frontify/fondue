/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardedRefCombobox } from './Combobox';
import { ForwardedRefSelectItem, ForwardedRefSelectItemGroup } from './SelectItem';
import { SelectMultiple } from './SelectMultiple';
import { SelectSingle } from './SelectSingle';
import { ForwardedRefSelectSlot } from './SelectSlot';

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectSingle & {
    Multiple: typeof SelectMultiple;
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
    Slot: typeof ForwardedRefSelectSlot;
} = SelectSingle;

Select.displayName = 'Select';
Select.Multiple = SelectMultiple;
Select.Multiple.displayName = 'Select.Multiple';
Select.Combobox = ForwardedRefCombobox;
Select.Combobox.displayName = 'Select.Combobox';
Select.Item = ForwardedRefSelectItem;
Select.Item.displayName = 'Select.Item';
Select.Group = ForwardedRefSelectItemGroup;
Select.Group.displayName = 'Select.Group';
Select.Slot = ForwardedRefSelectSlot;
Select.Slot.displayName = 'Select.Slot';
