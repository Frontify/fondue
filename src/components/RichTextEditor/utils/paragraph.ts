import { BlockStyleTypes } from "../renderer/renderBlockStyles";
import { BlockElement, FormattedText } from "../RichTextEditor";

type ParagraphNode = {
    type: BlockStyleTypes.Paragraph;
    children: (FormattedText | BlockElement)[];
};

export const createParagraphNode = (children: (FormattedText | BlockElement)[]): ParagraphNode => ({
    type: BlockStyleTypes.Paragraph,
    children,
});
