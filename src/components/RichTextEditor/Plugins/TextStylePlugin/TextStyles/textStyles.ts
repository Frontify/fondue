/* (c) Copyright Frontify Ltd., all rights reserved. */

export const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

export enum ListStyles {
    UL = 'ul',
    OL = 'ol',
    CHECKLIST_ITEM = 'checkbox_item',
    LIC = 'lic',
}
export const listStyleTitle: Record<ListStyles, string> = {
    [ListStyles.UL]: 'Bullet List',
    [ListStyles.OL]: 'List',
    [ListStyles.CHECKLIST_ITEM]: 'Checklist',
    [ListStyles.LIC]: 'List Item Content',
};

export enum ButtonStyles {
    ELEMENT_BUTTON_PRIMARY = 'buttonPrimary',
    ELEMENT_BUTTON_SECONDARY = 'buttonSecondary',
    ELEMENT_BUTTON_TERTIARY = 'buttonTertiary',
}

export enum TextStyles {
    ELEMENT_HEADING1 = 'heading1',
    ELEMENT_HEADING2 = 'heading2',
    ELEMENT_HEADING3 = 'heading3',
    ELEMENT_HEADING4 = 'heading4',
    ELEMENT_CUSTOM1 = 'custom1',
    ELEMENT_CUSTOM2 = 'custom2',
    ELEMENT_CUSTOM3 = 'custom3',
    ELEMENT_IMAGE_TITLE = 'imageTitle',
    ELEMENT_IMAGE_CAPTION = 'imageCaption',
    ELEMENT_QUOTE = 'quote',
    ELEMENT_LINK = 'link',
    ELEMENT_PARAGRAPH = 'p',
}

export type SelectableTextStyles = Exclude<TextStyles, TextStyles.ELEMENT_LINK>;

export const textStyleTitle: Record<TextStyles, string> = {
    [TextStyles.ELEMENT_HEADING1]: 'Heading 1',
    [TextStyles.ELEMENT_HEADING2]: 'Heading 2',
    [TextStyles.ELEMENT_HEADING3]: 'Heading 3',
    [TextStyles.ELEMENT_HEADING4]: 'Heading 4',
    [TextStyles.ELEMENT_CUSTOM1]: 'Custom 1',
    [TextStyles.ELEMENT_CUSTOM2]: 'Custom 2',
    [TextStyles.ELEMENT_CUSTOM3]: 'Custom 3',
    [TextStyles.ELEMENT_QUOTE]: 'Quote',
    [TextStyles.ELEMENT_LINK]: 'Link',
    [TextStyles.ELEMENT_PARAGRAPH]: 'Body Text',
    [TextStyles.ELEMENT_IMAGE_TITLE]: 'Image Title',
    [TextStyles.ELEMENT_IMAGE_CAPTION]: 'Image Caption',
};

export const AVAILABLE_STYLE_TITLES = { ...listStyleTitle, ...textStyleTitle };
export const AVAILABLE_STYLE = Object.values({ ...ListStyles, ...TextStyles });

export type AvailableStyles = ListStyles | TextStyles;
