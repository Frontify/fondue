/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getColumnClasses = (columnCount: number) => {
    if (columnCount === 1) {
        return 'tw-columns-1';
    }
    if (columnCount === 2) {
        return 'tw-columns-1 xs:tw-columns-2';
    }
    if (columnCount === 3) {
        return 'tw-columns-1 xs:tw-columns-2 md:tw-columns-3';
    }
    if (columnCount === 4) {
        return 'tw-columns-1 xs:tw-columns-2 md:tw-columns-3 lg:tw-columns-4';
    }
    if (columnCount === 5) {
        return 'tw-columns-1 xs:tw-columns-2 md:tw-columns-3 lg:tw-columns-4 xl:tw-columns-5';
    }
    return 'tw-columns-1 xs:tw-columns-2 sm:tw-columns-3 md:tw-columns-4 lg:tw-columns-5 xl:tw-columns-6';
};
