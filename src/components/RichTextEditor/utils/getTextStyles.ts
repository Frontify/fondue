/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum TextStyles {
    ELEMENT_HEADING1 = "heading1",
    ELEMENT_HEADING2 = "heading2",
    ELEMENT_HEADING3 = "heading3",
    ELEMENT_HEADING4 = "heading4",
    ELEMENT_CUSTOM1 = "custom1",
    ELEMENT_CUSTOM2 = "custom2",
}

export type TextStyleType = {
    type: TextStyles;
    className: string;
};

export const textStyleClassnames: Record<TextStyles, string> = {
    [TextStyles.ELEMENT_HEADING1]: "tw-font-bold tw-text-xxxl",
    [TextStyles.ELEMENT_HEADING2]: "tw-font-bold tw-text-xxl",
    [TextStyles.ELEMENT_HEADING3]: "tw-text-xl",
    [TextStyles.ELEMENT_HEADING4]: "tw-text-lg",
    [TextStyles.ELEMENT_CUSTOM1]: "tw-text-sm",
    [TextStyles.ELEMENT_CUSTOM2]: "tw-text-sm tw-font-sans tw-font-semibold",
};

export const getTextStyles = (identifier: TextStyleType["type"], textStyles?: TextStyleType[]) =>
    textStyles?.find(({ type }) => type === identifier)?.className || textStyleClassnames[identifier];
