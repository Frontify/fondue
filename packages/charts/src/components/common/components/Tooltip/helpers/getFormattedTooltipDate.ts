/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getFormattedTooltipDate = (timestamp?: Date, locale?: string) => {
    if (timestamp) {
        return new Intl.DateTimeFormat(locale ?? Intl.DateTimeFormat().resolvedOptions().locale, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }).format(timestamp);
    } else {
        return '';
    }
};
