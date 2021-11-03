import { FormattedText } from "src";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";

type ListItemNode = {
    type: BlockStyleTypes.ListItem;
    children: FormattedText[];
};

export const createListItemNode = (text: string): ListItemNode => ({
    type: BlockStyleTypes.ListItem,
    children: [{ text }],
});
