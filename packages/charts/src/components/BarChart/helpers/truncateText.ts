/* (c) Copyright Frontify Ltd., all rights reserved. */

export const DEFAULT_MAX_LABEL_LENGTH = 12;
const ELLIPSIS = '...';

export const truncateTextLabel = (value: string, maxLength: number = DEFAULT_MAX_LABEL_LENGTH) => {
    if (value.length <= maxLength) {
        return value;
    }
    return `${value.slice(0, Math.max(0, maxLength - ELLIPSIS.length)).trimEnd()}${ELLIPSIS}`;
};
