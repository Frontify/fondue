/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyleTypes } from "../../renderer/renderBlockStyles";
import { FormattedText } from "../../RichTextEditor";

type LinkNode = {
    type: BlockStyleTypes.Link;
    url: string;
    children: FormattedText[];
};

export const createLinkNode = (url: string, text: string): LinkNode => ({
    type: BlockStyleTypes.Link,
    url,
    children: [{ text }],
});
