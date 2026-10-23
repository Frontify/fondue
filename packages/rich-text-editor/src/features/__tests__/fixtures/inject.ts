/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeNode } from '#/model/content';

/**
 * A decoded tree with every `href` of a `link` mark set to `href`, as a value that reached the model past every check
 * would be. Tests install it on `decodeToTree` through `vi.mock`, so the editor, the reader and the codecs render it.
 */
export const withInjectedHref = (tree: TreeNode, href: string): TreeNode => {
    const injected: TreeNode = { ...tree };
    if (tree.marks !== undefined) {
        const marks = tree.marks.map((mark) =>
            mark.type === 'link' ? { ...mark, attrs: { ...mark.attrs, href } } : mark,
        );
        Object.assign(injected, { marks });
    }
    if (tree.content !== undefined) {
        const content = tree.content.map((child) => withInjectedHref(child, href));
        Object.assign(injected, { content });
    }
    return injected;
};
