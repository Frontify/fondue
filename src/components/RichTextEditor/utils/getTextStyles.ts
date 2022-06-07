/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextStyleType } from '../types';

export enum TextStyles {
    ELEMENT_HEADING1 = 'heading1',
    ELEMENT_HEADING2 = 'heading2',
    ELEMENT_HEADING3 = 'heading3',
    ELEMENT_HEADING4 = 'heading4',
    ELEMENT_CUSTOM1 = 'custom1',
    ELEMENT_CUSTOM2 = 'custom2',
    ELEMENT_PARAGRAPH = 'p',
}

export const textStyleTitles: Record<TextStyles, string> = {
    [TextStyles.ELEMENT_HEADING1]: 'Heading 1',
    [TextStyles.ELEMENT_HEADING2]: 'Heading 2',
    [TextStyles.ELEMENT_HEADING3]: 'Heading 3',
    [TextStyles.ELEMENT_HEADING4]: 'Heading 4',
    [TextStyles.ELEMENT_CUSTOM1]: 'Custom 01',
    [TextStyles.ELEMENT_CUSTOM2]: 'Custom 02',
    [TextStyles.ELEMENT_PARAGRAPH]: 'Paragraph',
};

export const textStyleClassnames: Record<TextStyles, string> = {
    [TextStyles.ELEMENT_HEADING1]: 'tw-font-bold tw-text-xxxl',
    [TextStyles.ELEMENT_HEADING2]: 'tw-font-bold tw-text-xxl',
    [TextStyles.ELEMENT_HEADING3]: 'tw-text-xl',
    [TextStyles.ELEMENT_HEADING4]: 'tw-text-lg',
    [TextStyles.ELEMENT_CUSTOM1]: 'tw-text-sm',
    [TextStyles.ELEMENT_CUSTOM2]: 'tw-text-sm tw-font-sans tw-font-semibold',
    [TextStyles.ELEMENT_PARAGRAPH]: '',
};

export const getTextStyles = (identifier: TextStyleType['type'], textStyles?: TextStyleType[]) =>
    textStyles?.find(({ type }) => type === identifier)?.className || textStyleClassnames[identifier];
