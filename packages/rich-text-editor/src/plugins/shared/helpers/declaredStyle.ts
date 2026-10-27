/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * A CSS property as written in an element's own `style` attribute (`#f00` stays
 * `#f00`), or null when not declared. Never inherited or computed values. Matches
 * whole property names, and the last declaration wins.
 */
export const declaredStyle = (element: HTMLElement, property: string): string | null => {
    const declarations = (element.getAttribute('style') ?? '').split(';');
    let found: string | null = null;
    for (const declaration of declarations) {
        const colon = declaration.indexOf(':');
        if (colon !== -1 && declaration.slice(0, colon).trim().toLowerCase() === property) {
            found = declaration
                .slice(colon + 1)
                .replace(/!important\s*$/i, '')
                .trim();
        }
    }
    return found === '' ? null : found;
};

/** Whether the element's own style resets the weight: Google Docs wraps copies in `<b style="font-weight: normal">`. */
export const declaresNormalWeight = (element: HTMLElement): boolean =>
    /^(normal|lighter|[1-4]00)$/i.test(declaredStyle(element, 'font-weight') ?? '');

/** Whether the element's own style makes it bold, such as `font-weight: 700` on a span. */
export const declaresBoldWeight = (element: HTMLElement): boolean =>
    /^(bold|bolder|[6-9]00)$/i.test(declaredStyle(element, 'font-weight') ?? '');

/** Whether the element's own `text-decoration` draws this line (`underline`, `line-through`). */
export const declaresDecoration = (element: HTMLElement, line: string): boolean =>
    [declaredStyle(element, 'text-decoration'), declaredStyle(element, 'text-decoration-line')].some(
        (value) => value?.toLowerCase().split(/\s+/).includes(line) === true,
    );
