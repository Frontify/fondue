/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum TextStyles {
    ELEMENT_HEADING1 = 'heading1',
    ELEMENT_HEADING2 = 'heading2',
    ELEMENT_HEADING3 = 'heading3',
    ELEMENT_HEADING4 = 'heading4',
    ELEMENT_CUSTOM1 = 'custom1',
    ELEMENT_CUSTOM2 = 'custom2',
    ELEMENT_CUSTOM3 = 'custom3',
    ELEMENT_PARAGRAPH = 'p',
}

export const textStyleTitles: Record<TextStyles, string> = {
    [TextStyles.ELEMENT_HEADING1]: 'Heading 1',
    [TextStyles.ELEMENT_HEADING2]: 'Heading 2',
    [TextStyles.ELEMENT_HEADING3]: 'Heading 3',
    [TextStyles.ELEMENT_HEADING4]: 'Heading 4',
    [TextStyles.ELEMENT_CUSTOM1]: 'Custom 01',
    [TextStyles.ELEMENT_CUSTOM2]: 'Custom 02',
    [TextStyles.ELEMENT_CUSTOM3]: 'Custom 03',
    [TextStyles.ELEMENT_PARAGRAPH]: 'Paragraph',
};
