/* (c) Copyright Frontify Ltd., all rights reserved. */

import { it as dateLocale } from 'date-fns/locale';

import { type LocaleConfig } from './types';

const translations = {
    Badge_dismiss: 'Chiudi ${label}',
    Card_deselect: 'Deseleziona',
    Card_select: 'Seleziona',
    ColorPicker_blueChannel: 'Canale colore blu',
    ColorPicker_greenChannel: 'Canale colore verde',
    ColorPicker_hexValue: 'Valore colore esadecimale',
    ColorPicker_opacity: 'Opacità del colore',
    ColorPicker_redChannel: 'Canale colore rosso',
    ColorPicker_selectColor: 'Seleziona colore',
    ColorPicker_selectFormat: 'Seleziona un formato di colore',
    DatePicker_selectDate: 'Seleziona data',
    Dialog_close: 'Chiudi',
    Flyout_close: 'Chiudi',
    Notice_dismiss: 'Chiudi avviso',
    Select_additionalItemsSelected: '${count} elementi aggiuntivi selezionati',
    Select_clear: 'cancella input',
    Select_error: 'Errore',
    Select_multipleItemsSelected: '${count} elementi selezionati',
    Select_selectedCount: '${count} selezionato: ${items}',
    Select_singleItemSelected: '1 elemento selezionato',
    Select_toggleMenu: 'attiva menu',
    Switch_defaultLabel: 'Interruttore',
    Table_sortAscending: 'Ordina crescente',
    Table_sortByAscending: 'Ordina per ${column} crescente',
    Table_sortByDescending: 'Ordina per ${column} decrescente',
    Table_sortDescending: 'Ordina decrescente',
};

export const itIT: LocaleConfig = {
    translationStrings: translations,
    dateLocale,
};
