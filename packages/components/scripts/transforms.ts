/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Converts any given input to kebab-case
 *
 * @param name String in any case (PascalCase, camelCase, ...)
 * @returns String in kebab-case
 */
export const toKebabCase = (name: string): string =>
    name
        .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
        .replaceAll(/[\s_]+/g, '-')
        .toLowerCase();
/**
 * Converts any given input to UPPERCASE_SNAKE_CASE
 *
 * @param name String in any case (PascalCase, camelCase, ...)
 * @returns String in UPPERCASE_SNAKE_CASE
 */
export const toUpperSnakeCase = (name: string): string => name.replaceAll(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();

/**
 * Converts any given input to camelCase
 *
 * @param name String in any case (PascalCase, kebab-case, ...)
 * @returns String in camelCase
 */
export const toCamelCase = (name: string): string => {
    const kebabCase = toKebabCase(name);
    return kebabCase.replaceAll(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());
};
