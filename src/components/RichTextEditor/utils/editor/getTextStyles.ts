import { TextStylesType } from "@components/RichTextEditor";
import { headingTypeClassname } from "@components/RichTextEditor/renderer/renderBlockStyles";

export const getTextStyles = (identifier: TextStylesType["type"], textStyles?: TextStylesType[]) =>
    textStyles?.find(({ type }) => type === identifier)?.className || headingTypeClassname[identifier];
