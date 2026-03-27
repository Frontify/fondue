/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS as dateLocale } from 'date-fns/locale';

const translations = {
    Badge_dismiss: 'Dismiss ${label}',
    Card_deselect: 'Deselect',
    Card_select: 'Select',
    ColorPicker_blueChannel: 'Blue Color Channel',
    ColorPicker_greenChannel: 'Green Color Channel',
    ColorPicker_hexValue: 'Hex color value',
    ColorPicker_opacity: 'Color Opacity',
    ColorPicker_redChannel: 'Red Color Channel',
    ColorPicker_selectColor: 'Select Color',
    ColorPicker_selectFormat: 'Select a color format',
    DatePicker_selectDate: 'Select Date',
    Dialog_close: 'Close',
    Flyout_close: 'Close',
    Notice_dismiss: 'Dismiss notice',
    Select_additionalItemsSelected: '${count} additional items selected',
    Select_clear: 'clear input',
    Select_error: 'Error',
    Select_multipleItemsSelected: '${count} items selected',
    Select_selectedCount: '${count} selected: ${items}',
    Select_singleItemSelected: '1 item selected',
    Select_toggleMenu: 'toggle menu',
    Switch_defaultLabel: 'Switch',
    Table_sortAscending: 'Sort ascending',
    Table_sortByAscending: 'Sort by ${column} ascending',
    Table_sortByDescending: 'Sort by ${column} descending',
    Table_sortDescending: 'Sort descending',
};

export const enUS = {
    translationStrings: translations,
    dateLocale,
};
