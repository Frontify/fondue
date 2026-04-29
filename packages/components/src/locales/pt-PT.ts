/* (c) Copyright Frontify Ltd., all rights reserved. */

import { pt as dateLocale } from 'date-fns/locale';

import { type LocaleConfig } from './types';

const translations = {
    Badge_dismiss: 'Fechar ${label}',
    Card_deselect: 'Desselecionar',
    Card_select: 'Selecionar',
    ColorPicker_blueChannel: 'Canal de cor azul',
    ColorPicker_greenChannel: 'Canal de cor verde',
    ColorPicker_hexValue: 'Valor de cor hexadecimal',
    ColorPicker_opacity: 'Opacidade da cor',
    ColorPicker_redChannel: 'Canal de cor vermelho',
    ColorPicker_selectColor: 'Selecionar cor',
    ColorPicker_selectFormat: 'Selecionar um formato de cor',
    DatePicker_selectDate: 'Selecionar data',
    Dialog_close: 'Fechar',
    Flyout_close: 'Fechar',
    Notice_dismiss: 'Fechar aviso',
    Select_additionalItemsSelected: '${count} items adicionais selecionados',
    Select_clear: 'limpar entrada',
    Select_error: 'Erro',
    Select_multipleItemsSelected: '${count} items selecionados',
    Select_selectedCount: '${count} selecionado: ${items}',
    Select_singleItemSelected: '1 item selecionado',
    Select_toggleMenu: 'alternar menu',
    Switch_defaultLabel: 'Interruptor',
    Table_sortAscending: 'Ordenar ascendente',
    Table_sortByAscending: 'Ordenar por ${column} ascendente',
    Table_sortByDescending: 'Ordenar por ${column} descendente',
    Table_sortDescending: 'Ordenar descendente',
};

export const ptPT: LocaleConfig = {
    translationStrings: translations,
    dateLocale,
};
