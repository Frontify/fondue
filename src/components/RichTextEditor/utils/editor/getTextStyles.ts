import { TextStyles } from "@components/RichTextEditor";
import { textStyleClassname } from "@components/RichTextEditor/renderer/renderBlockStyles";

export const getTextStyles = (identifier: TextStyles["type"], textStyles?: TextStyles[]) =>
    textStyles?.find(({ type }) => type === identifier)?.className || textStyleClassname[identifier];
