/* (c) Copyright Frontify Ltd., all rights reserved. */

export const toTitleCase = (value: string) => {
    return value.replaceAll(
        /\w\S*/g,
        (valueToReplace) => valueToReplace.charAt(0).toUpperCase() + valueToReplace.substring(1).toLowerCase(),
    );
};
