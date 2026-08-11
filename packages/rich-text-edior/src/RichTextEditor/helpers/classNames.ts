/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Joins the class names that are actually set. Also the one place that turns a
 * CSS-module lookup into a plain string — every one of them is typed as possibly
 * missing.
 */
export const classNames = (...names: (string | false | undefined)[]): string => names.filter(Boolean).join(' ');
