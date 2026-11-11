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

/**
 * The lowest numeric `font-weight` that reads as bold.
 */
const BOLD_WEIGHT = 600;

/**
 * Whether a `font-weight` value is not bold.
 */
export const isNormalWeight = (value: string): boolean => {
    const weight = value.trim().toLowerCase();
    if (weight === 'normal' || weight === 'lighter') {
        return true;
    }
    return weight !== '' && Number(weight) < BOLD_WEIGHT;
};

/**
 * Whether a `font-weight` value is bold, such as `700`.
 */
export const isBoldWeight = (value: string): boolean => {
    const weight = value.trim().toLowerCase();
    if (weight === 'bold' || weight === 'bolder') {
        return true;
    }
    return Number(weight) >= BOLD_WEIGHT;
};

/**
 * Whether a `text-decoration` or `text-decoration-line` value draws this line (`underline`, `line-through`).
 */
export const hasDecorationLine = (value: string, line: string): boolean =>
    value.toLowerCase().split(/\s+/).includes(line);

/**
 * Whether the element's own style resets the weight: Google Docs wraps copies in `<b style="font-weight: normal">`.
 */
export const declaresNormalWeight = (element: HTMLElement): boolean =>
    // Read as the browser does, like the `font-weight` style rules, so `font` shorthands and invalid values agree.
    isNormalWeight(element.style.getPropertyValue('font-weight'));
