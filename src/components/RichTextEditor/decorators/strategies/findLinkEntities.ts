/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ContentBlock, ContentState } from "draft-js";

export default function findLinkEntities(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState,
): void {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
    }, callback);
}
