/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TComboboxItemBase } from '@udecode/plate';

export const filterItems = (value: string) => (item: TComboboxItemBase) =>
    // eslint-disable-next-line unicorn/prefer-includes
    item.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
