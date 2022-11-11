/* (c) Copyright Frontify Ltd., all rights reserved. */

export const convertCamelCaseToKebabCase = (str: string): string => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};
