/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS as dateLocale } from 'date-fns/locale';

const translations = {
    AssetInput_browse: 'Browse',
    AssetInput_upload: 'Upload',
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
    Tree_loading: 'Loading…',
    Tree_reorderHint:
        'To reorder, press Control plus Shift plus D to start moving this item, then arrow up or down to position it, Enter to drop, or Escape to cancel.',
};

export const enUS = {
    translationStrings: translations,
    dateLocale,
};
