/* (c) Copyright Frontify Ltd., all rights reserved. */

import { es as dateLocale } from 'date-fns/locale';

import { type Translations } from './types';

const translations = {
    ColorPicker_selectColor: 'Seleccionar color',
    ColorPicker_selectFormat: 'Seleccionar un formato de color',
    ColorPicker_hexValue: 'Valor de color hexadecimal',
    ColorPicker_redChannel: 'Canal de color rojo',
    ColorPicker_greenChannel: 'Canal de color verde',
    ColorPicker_blueChannel: 'Canal de color azul',
    ColorPicker_opacity: 'Opacidad del color',
    Dialog_close: 'Cerrar',
    Flyout_close: 'Cerrar',
    Select_clear: 'borrar entrada',
    Select_toggleMenu: 'alternar menú',
    Switch_defaultLabel: 'Interruptor',
    Select_error: 'Error de selección',
    Select_selectedCount: '${count} seleccionado: ${items}',
    Select_singleItemSelected: '1 elemento seleccionado',
    Select_multipleItemsSelected: '${count} elementos seleccionados',
    Select_additionalItemsSelected: '${count} elementos adicionales seleccionados',
    Table_sortByDescending: 'Ordenar por ${column} descendente',
    Table_sortByAscending: 'Ordenar por ${column} ascendente',
    Table_sortDescending: 'Ordenar descendente',
    Table_sortAscending: 'Ordenar ascendente',
    Badge_dismiss: 'Cerrar ${label}',
    Notice_dismiss: 'Cerrar aviso',
};

export const esES: Translations = {
    translationStrings: translations,
    dateLocale,
};
