/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyleTypes } from "../../renderer/renderBlockStyles";
import { FormattedText } from "../../RichTextEditor";

type ListItemNode = {
    type: BlockStyleTypes.ListItem;
    children: FormattedText[];
};

export const createListItemNode = (text: string): ListItemNode => ({
    type: BlockStyleTypes.ListItem,
    children: [{ text }],
});
