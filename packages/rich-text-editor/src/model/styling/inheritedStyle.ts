/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * For a parse rule's `value` function: whether CSS gives `element` a style that it or an ancestor declares, such as
 * an underline a pasted `span` inherits from its parent. The answer is that of the nearest element for which
 * `declared` returns a boolean, `false` when none does, so a `declared` that returns `undefined` for an element that
 * says nothing hands the question to its parent. `cache` holds each answer, so every element is read once and its
 * descendants reuse it; keep one cache per style, since an element holds the same style for as long as an import
 * reads it.
 */
export const inheritedAnswer = (
    element: Element,
    cache: WeakMap<Element, boolean>,
    declared: (element: Element) => boolean | undefined,
): boolean => {
    const unanswered: Element[] = [];
    let answer = false;
    for (let current: Element | null = element; current !== null; current = current.parentElement) {
        const known = cache.get(current);
        if (known !== undefined) {
            answer = known;
            break;
        }

        unanswered.push(current);
        const own = declared(current);
        if (own !== undefined) {
            answer = own;
            break;
        }
    }

    for (const each of unanswered) {
        cache.set(each, answer);
    }

    return answer;
};

/**
 * For a `declared` function of `inheritedAnswer`: the `text-decoration` lines `element` sets itself, from the
 * `text-decoration-line` longhand or the `text-decoration` shorthand, lowercased, such as `['underline']`.
 */
export const decorationLines = (element: Element): string[] => {
    const style = (element as HTMLElement).style as CSSStyleDeclaration | undefined;
    if (style === undefined) {
        return [];
    }

    let value = style.getPropertyValue('text-decoration-line');
    if (value.trim() === '') {
        value = style.getPropertyValue('text-decoration');
    }

    return value.toLowerCase().split(/\s+/);
};
