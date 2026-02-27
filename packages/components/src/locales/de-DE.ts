/* (c) Copyright Frontify Ltd., all rights reserved. */

import { de as dateLocale } from 'date-fns/locale';

import { type Translations } from './types';

const translations = {
    ColorPicker_selectColor: 'Farbe auswählen',
    ColorPicker_selectFormat: 'Farbformat auswählen',
    ColorPicker_hexValue: 'Hex-Farbwert',
    ColorPicker_redChannel: 'Roter Farbkanal',
    ColorPicker_greenChannel: 'Grüner Farbkanal',
    ColorPicker_blueChannel: 'Blauer Farbkanal',
    ColorPicker_opacity: 'Deckkraft',
    Dialog_close: 'Schließen',
    Flyout_close: 'Schließen',
    Select_clear: 'Eingabe löschen',
    Select_toggleMenu: 'Menü umschalten',
    Select_error: 'Fehler',
    Select_selectedCount: '${count} ausgewählt: ${items}',
    Select_singleItemSelected: '1 Element ausgewählt',
    Select_multipleItemsSelected: '${count} Elemente ausgewählt',
    Select_additionalItemsSelected: '${count} weitere Elemente ausgewählt',
    Switch_defaultLabel: 'Schalter',
    Table_sortByDescending: 'Nach ${column} absteigend sortieren',
    Table_sortByAscending: 'Nach ${column} aufsteigend sortieren',
    Table_sortDescending: 'Absteigend sortieren',
    Table_sortAscending: 'Aufsteigend sortieren',
    Badge_dismiss: '${label} schließen',
    Notice_dismiss: 'Meldung schließen',
};

export const deDE: Translations = {
    translationStrings: translations,
    dateLocale,
};
