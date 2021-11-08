/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormattedText } from "../RichTextEditor";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";

type ListItemNode = {
    type: BlockStyleTypes.ListItem;
    children: FormattedText[];
};

export const createListItemNode = (text: string): ListItemNode => ({
    type: BlockStyleTypes.ListItem,
    children: [{ text }],
});
