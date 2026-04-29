/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fr as dateLocale } from 'date-fns/locale';

import { type LocaleConfig } from './types';

const translations = {
    Badge_dismiss: 'Fermer ${label}',
    Card_deselect: 'Désélectionner',
    Card_select: 'Sélectionner',
    ColorPicker_blueChannel: 'Canal de couleur bleu',
    ColorPicker_greenChannel: 'Canal de couleur vert',
    ColorPicker_hexValue: 'Valeur de couleur hexadécimale',
    ColorPicker_opacity: 'Opacité de la couleur',
    ColorPicker_redChannel: 'Canal de couleur rouge',
    ColorPicker_selectColor: 'Sélectionner une couleur',
    ColorPicker_selectFormat: 'Sélectionner un format de couleur',
    DatePicker_selectDate: 'Sélectionner une date',
    Dialog_close: 'Fermer',
    Flyout_close: 'Fermer',
    Notice_dismiss: "Fermer l'avis",
    Select_additionalItemsSelected: '${count} éléments additionnels sélectionnés',
    Select_clear: 'effacer la saisie',
    Select_error: 'Erreur',
    Select_multipleItemsSelected: '${count} éléments sélectionnés',
    Select_selectedCount: '${count} sélectionné: ${items}',
    Select_singleItemSelected: '1 élément sélectionné',
    Select_toggleMenu: 'basculer le menu',
    Switch_defaultLabel: 'Interrupteur',
    Table_sortAscending: 'Trier par ordre croissant',
    Table_sortByAscending: 'Trier par ${column} croissant',
    Table_sortByDescending: 'Trier par ${column} décroissant',
    Table_sortDescending: 'Trier par ordre décroissant',
};

export const frCH: LocaleConfig = {
    translationStrings: translations,
    dateLocale,
};
