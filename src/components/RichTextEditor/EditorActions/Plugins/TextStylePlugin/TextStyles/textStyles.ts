/* (c) Copyright Frontify Ltd., all rights reserved. */

export const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

export enum ListStyle {
    UL = 'ul',
    OL = 'ol',
    CHECKLIST_ITEM = 'checkbox_item',
}
export const listStyleTitle: Record<ListStyle, string> = {
    [ListStyle.UL]: 'Bullet List',
    [ListStyle.OL]: 'List',
    [ListStyle.CHECKLIST_ITEM]: 'Checklist',
};

export enum TextStyle {
    ELEMENT_HEADING1 = 'heading1',
    ELEMENT_HEADING2 = 'heading2',
    ELEMENT_HEADING3 = 'heading3',
    ELEMENT_HEADING4 = 'heading4',
    ELEMENT_CUSTOM1 = 'custom1',
    ELEMENT_CUSTOM2 = 'custom2',
    ELEMENT_CUSTOM3 = 'custom3',
    ELEMENT_PARAGRAPH = 'p',
}

export const textStyleTitle: Record<TextStyle, string> = {
    [TextStyle.ELEMENT_HEADING1]: 'Heading 1',
    [TextStyle.ELEMENT_HEADING2]: 'Heading 2',
    [TextStyle.ELEMENT_HEADING3]: 'Heading 3',
    [TextStyle.ELEMENT_HEADING4]: 'Heading 4',
    [TextStyle.ELEMENT_CUSTOM1]: 'Custom 01',
    [TextStyle.ELEMENT_CUSTOM2]: 'Custom 02',
    [TextStyle.ELEMENT_CUSTOM3]: 'Custom 03',
    [TextStyle.ELEMENT_PARAGRAPH]: 'Paragraph',
};

export const AVAILABLE_STYLE_TITLES = { ...listStyleTitle, ...textStyleTitle };
export const AVAILABLE_STYLE = Object.values({ ...ListStyle, ...TextStyle });

export type AvailableStyles = ListStyle | TextStyle;
