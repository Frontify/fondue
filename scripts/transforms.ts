/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Converts any give input to kebab-case
 *
 * @param name String in any case (PascalCase, camelCase, ...)
 * @returns String in kebab-case
 */
export const toKebabCase = (name: string): string =>
    name
        .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
        .replaceAll(/[\s_]+/g, '-')
        .toLowerCase();
