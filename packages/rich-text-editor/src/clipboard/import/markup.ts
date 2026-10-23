/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Elements that hold no content of any source, such as the `meta` and `style` that Office and LibreOffice write. */
const NO_CONTENT = 'meta, style, script, link, br.Apple-interchange-newline';

/** The comments under `root`, found without recursion, since hostile input can nest deeper than the call stack. */
const commentsUnder = (root: Node) => {
    const comments: ChildNode[] = [];
    const pending: Node[] = [root];
    for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
        for (let child = node.firstChild; child !== null; child = child.nextSibling) {
            if (child.nodeType === child.COMMENT_NODE) {
                comments.push(child);
            } else if (child.nodeType === child.ELEMENT_NODE) {
                pending.push(child);
            }
        }
    }
    return comments;
};

/**
 * Removes `meta`, `style`, `script` and `link` elements, every comment, including Office's `<!--[if ...]>` ones, and the
 * `br.Apple-interchange-newline` Chrome adds at the start or end of a copied range.
 */
export const removeMarkup = (body: HTMLElement) => {
    for (const element of Array.from(body.querySelectorAll(NO_CONTENT))) {
        element.remove();
    }
    for (const comment of commentsUnder(body)) {
        comment.remove();
    }
};
