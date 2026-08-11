/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Same rule the legacy editor used, so links that validated there still do. */
const isValidHref = (href: string): boolean => /^(https?:\/\/|mailto:|tel:).+/.test(href);

/** Anything that already names a scheme is left alone; a bare domain gets https. */
const hasScheme = (href: string): boolean => /^[a-z][a-z\d+.-]*:/i.test(href);

/**
 * What to store for what was typed, or null when it cannot be a link. Typing
 * `example.com` is the common case and means https, so it is completed rather
 * than rejected.
 */
export const toHref = (typed: string): string | null => {
    const trimmed = typed.trim();
    if (trimmed === '') {
        return null;
    }
    const candidate = hasScheme(trimmed) ? trimmed : `https://${trimmed}`;
    return isValidHref(candidate) ? candidate : null;
};
