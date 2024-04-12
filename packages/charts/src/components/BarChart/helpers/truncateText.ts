/* (c) Copyright Frontify Ltd., all rights reserved. */

export const truncateTextLabel = (value: string) => {
    if (value.length <= 12) {
        return value;
    }
    return `${value.slice(0, 9).trimEnd()}...`;
};
