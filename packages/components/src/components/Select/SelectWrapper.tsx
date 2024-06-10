/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ForwardedRefCombobox } from './Combobox';
import { ForwardedRefSelect, type SelectInput } from './Select';
import { ForwardedRefSelectItem, ForwardedRefSelectItemGroup } from './SelectItem';
import { ForwardedRefSelectSlot } from './SelectSlot';

// @ts-expect-error We support both Select and Select.Combobox as the Root
export const Select: typeof SelectInput & {
    Basic: typeof ForwardedRefSelect;
    Combobox: typeof ForwardedRefCombobox;
    Item: typeof ForwardedRefSelectItem;
    Group: typeof ForwardedRefSelectItemGroup;
    Slot: typeof ForwardedRefSelectSlot;
} = ForwardedRefSelect;
Select.displayName = 'Select';
Select.Basic = ForwardedRefSelect;
Select.Combobox = ForwardedRefCombobox;
Select.Item = ForwardedRefSelectItem;
Select.Group = ForwardedRefSelectItemGroup;
Select.Slot = ForwardedRefSelectSlot;
