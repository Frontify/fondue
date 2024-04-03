/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TComboboxItemBase } from '@udecode/plate-combobox';

export const filterItems = (value: string) => (item: TComboboxItemBase) =>
    item.text.toLowerCase().includes(value.toLowerCase());
