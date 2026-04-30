/* (c) Copyright Frontify Ltd., all rights reserved. */

import { nl as dateLocale } from 'date-fns/locale';

import { type LocaleConfig } from './types';

const translations = {
    Badge_dismiss: 'Sluit ${label}',
    Card_deselect: 'Deselecteren',
    Card_select: 'Selecteren',
    ColorPicker_blueChannel: 'Blauw kleurkanaal',
    ColorPicker_greenChannel: 'Groen kleurkanaal',
    ColorPicker_hexValue: 'Hex-kleurwaarde',
    ColorPicker_opacity: 'Kleurdekking',
    ColorPicker_redChannel: 'Rood kleurkanaal',
    ColorPicker_selectColor: 'Selecteer kleur',
    ColorPicker_selectFormat: 'Selecteer een kleurformaat',
    DatePicker_selectDate: 'Selecteer datum',
    Dialog_close: 'Sluiten',
    Flyout_close: 'Sluiten',
    Notice_dismiss: 'Melding sluiten',
    Select_additionalItemsSelected: '${count} extra items geselecteerd',
    Select_clear: 'invoer wissen',
    Select_error: 'Fout',
    Select_multipleItemsSelected: '${count} items geselecteerd',
    Select_selectedCount: '${count} geselecteerd: ${items}',
    Select_singleItemSelected: '1 item geselecteerd',
    Select_toggleMenu: 'menu schakelen',
    Switch_defaultLabel: 'Schakelaar',
    Table_sortAscending: 'Sorteer oplopend',
    Table_sortByAscending: 'Sorteer op ${column} oplopend',
    Table_sortByDescending: 'Sorteer op ${column} aflopend',
    Table_sortDescending: 'Sorteer aflopend',
};

export const nlNL: LocaleConfig = {
    translationStrings: translations,
    dateLocale,
};
