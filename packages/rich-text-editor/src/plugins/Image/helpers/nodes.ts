/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON } from '#/model';

/** Every node of `node`, itself first, in document order; walked with a stack, so a deep document still reads. */
export const nodesOf = (node: ContentNodeJSON): readonly ContentNodeJSON[] => {
    const found: ContentNodeJSON[] = [];
    const pending = [node];
    for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
        found.push(next);
        pending.push(...[...(next.content ?? [])].reverse());
    }

    return found;
};

/** The `figure` that holds the image `nodeId` in the stored `document`, or `undefined`. */
export const figureOf = (document: ContentNodeJSON, nodeId: string): ContentNodeJSON | undefined =>
    nodesOf(document).find((node) => node.type === 'figure' && node.content?.[0]?.attrs?.nodeId === nodeId);
