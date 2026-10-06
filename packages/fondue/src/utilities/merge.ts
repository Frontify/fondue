/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Cleans and joins an array of inputs with possible undefined or boolean values.
 *
 * @param classNames Array of class names
 * @returns Clean string to be used for class name
 * @deprecated This function is deprecated and will be removed in the next major version.
 */
export const merge = (classNames: (string | undefined | boolean)[]): string => classNames.filter(Boolean).join(' ');
