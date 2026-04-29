/* (c) Copyright Frontify Ltd., all rights reserved. */

import { pl as dateLocale } from 'date-fns/locale';

import { type LocaleConfig } from './types';

const translations = {
    Badge_dismiss: 'Zamknij ${label}',
    Card_deselect: 'Odznacz',
    Card_select: 'Wybierz',
    ColorPicker_blueChannel: 'Niebieski kanał koloru',
    ColorPicker_greenChannel: 'Zielony kanał koloru',
    ColorPicker_hexValue: 'Wartość koloru szesnastkowego',
    ColorPicker_opacity: 'Przezroczystość koloru',
    ColorPicker_redChannel: 'Czerwony kanał koloru',
    ColorPicker_selectColor: 'Wybierz kolor',
    ColorPicker_selectFormat: 'Wybierz format koloru',
    DatePicker_selectDate: 'Wybierz datę',
    Dialog_close: 'Zamknij',
    Flyout_close: 'Zamknij',
    Notice_dismiss: 'Zamknij powiadomienie',
    Select_additionalItemsSelected: '${count} dodatkowych elementów wybranych',
    Select_clear: 'wyczyść pole',
    Select_error: 'Błąd',
    Select_multipleItemsSelected: '${count} elementów wybranych',
    Select_selectedCount: '${count} wybranych: ${items}',
    Select_singleItemSelected: '1 element wybrany',
    Select_toggleMenu: 'przełącz menu',
    Switch_defaultLabel: 'Przełącznik',
    Table_sortAscending: 'Sortuj rosnąco',
    Table_sortByAscending: 'Sortuj według ${column} rosnąco',
    Table_sortByDescending: 'Sortuj według ${column} malejąco',
    Table_sortDescending: 'Sortuj malejąco',
};

export const plPL: LocaleConfig = {
    translationStrings: translations,
    dateLocale,
};
