/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ListStyles, ListStylesTitles, TextStyles, TextStylesTitles } from './types';

export const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

export const textStyleTitles: TextStylesTitles = {
    [TextStyles.ELEMENT_HEADING1]: 'Heading 1',
    [TextStyles.ELEMENT_HEADING2]: 'Heading 2',
    [TextStyles.ELEMENT_HEADING3]: 'Heading 3',
    [TextStyles.ELEMENT_HEADING4]: 'Heading 4',
    [TextStyles.ELEMENT_CUSTOM1]: 'Custom 01',
    [TextStyles.ELEMENT_CUSTOM2]: 'Custom 02',
    [TextStyles.ELEMENT_CUSTOM3]: 'Custom 03',
    [TextStyles.ELEMENT_PARAGRAPH]: 'Paragraph',
};

export const listTitle: ListStylesTitles = {
    [ListStyles.UL]: 'Bullet List',
    [ListStyles.OL]: 'List',
    [ListStyles.CHECKLIST_ITEM]: 'Checklist',
};

export const TEXT_STYLE_ID = { ...ListStyles, ...TextStyles };
export const TEXT_STYLE_TITLES = { ...listTitle, ...textStyleTitles };
