/* (c) Copyright Frontify Ltd., all rights reserved. */

import { de as dateLocale } from 'date-fns/locale';

import { type Translations } from './types';

const translations = {
    Badge_dismiss: '${label} schließen',
    Card_deselect: 'Abwählen',
    Card_select: 'Auswählen',
    ColorPicker_blueChannel: 'Blauer Farbkanal',
    ColorPicker_greenChannel: 'Grüner Farbkanal',
    ColorPicker_hexValue: 'Hex-Farbwert',
    ColorPicker_opacity: 'Deckkraft',
    ColorPicker_redChannel: 'Roter Farbkanal',
    ColorPicker_selectColor: 'Farbe auswählen',
    ColorPicker_selectFormat: 'Farbformat auswählen',
    DatePicker_selectDate: 'Datum auswählen',
    Dialog_close: 'Schließen',
    Flyout_close: 'Schließen',
    Notice_dismiss: 'Meldung schließen',
    Select_additionalItemsSelected: '${count} weitere Elemente ausgewählt',
    Select_clear: 'Eingabe löschen',
    Select_error: 'Fehler',
    Select_multipleItemsSelected: '${count} Elemente ausgewählt',
    Select_selectedCount: '${count} ausgewählt: ${items}',
    Select_singleItemSelected: '1 Element ausgewählt',
    Select_toggleMenu: 'Menü umschalten',
    Switch_defaultLabel: 'Schalter',
    Table_sortAscending: 'Aufsteigend sortieren',
    Table_sortByAscending: 'Nach ${column} aufsteigend sortieren',
    Table_sortByDescending: 'Nach ${column} absteigend sortieren',
    Table_sortDescending: 'Absteigend sortieren',
};

export const deDE: Translations = {
    translationStrings: translations,
    dateLocale,
};
