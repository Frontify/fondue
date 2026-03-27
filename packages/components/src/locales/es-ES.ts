/* (c) Copyright Frontify Ltd., all rights reserved. */

import { es as dateLocale } from 'date-fns/locale';

import { type Translations } from './types';

const translations = {
    Badge_dismiss: 'Cerrar ${label}',
    Card_deselect: 'Deseleccionar',
    Card_select: 'Seleccionar',
    ColorPicker_blueChannel: 'Canal de color azul',
    ColorPicker_greenChannel: 'Canal de color verde',
    ColorPicker_hexValue: 'Valor de color hexadecimal',
    ColorPicker_opacity: 'Opacidad del color',
    ColorPicker_redChannel: 'Canal de color rojo',
    ColorPicker_selectColor: 'Seleccionar color',
    ColorPicker_selectFormat: 'Seleccionar un formato de color',
    DatePicker_selectDate: 'Seleccionar fecha',
    Dialog_close: 'Cerrar',
    Flyout_close: 'Cerrar',
    Notice_dismiss: 'Cerrar aviso',
    Select_additionalItemsSelected: '${count} elementos adicionales seleccionados',
    Select_clear: 'borrar entrada',
    Select_error: 'Error de selección',
    Select_multipleItemsSelected: '${count} elementos seleccionados',
    Select_selectedCount: '${count} seleccionado: ${items}',
    Select_singleItemSelected: '1 elemento seleccionado',
    Select_toggleMenu: 'alternar menú',
    Switch_defaultLabel: 'Interruptor',
    Table_sortAscending: 'Ordenar ascendente',
    Table_sortByAscending: 'Ordenar por ${column} ascendente',
    Table_sortByDescending: 'Ordenar por ${column} descendente',
    Table_sortDescending: 'Ordenar descendente',
};

export const esES: Translations = {
    translationStrings: translations,
    dateLocale,
};
