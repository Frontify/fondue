/* (c) Copyright Frontify Ltd., all rights reserved. */

export const convertCamelCaseToKebabCase = (str: string): string => {
    return str.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
};
