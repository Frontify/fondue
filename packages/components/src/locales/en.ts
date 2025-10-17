/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Translations = {
    colorPicker: {
        selectColor: string;
        selectFormat: string;
        hexValue: string;
        redChannel: string;
        greenChannel: string;
        blueChannel: string;
        opacity: string;
    };
    dialog: {
        close: string;
    };
    flyout: {
        close: string;
    };
    select: {
        clear: string;
        toggleMenu: string;
    };
    switch: {
        defaultLabel: string;
    };
    table: {
        sortByDescending: string;
        sortByAscending: string;
        sortDescending: string;
        sortAscending: string;
    };
    badge: {
        dismiss: string;
    };
};

export const en: Translations = {
    colorPicker: {
        selectColor: 'Select Color',
        selectFormat: 'Select a color format',
        hexValue: 'Hex color value',
        redChannel: 'Red Color Channel',
        greenChannel: 'Green Color Channel',
        blueChannel: 'Blue Color Channel',
        opacity: 'Color Opacity',
    },
    dialog: {
        close: 'Close',
    },
    flyout: {
        close: 'Close',
    },
    select: {
        clear: 'clear input',
        toggleMenu: 'toggle menu',
    },
    switch: {
        defaultLabel: 'Switch',
    },
    table: {
        sortByDescending: 'Sort by ${column} descending',
        sortByAscending: 'Sort by ${column} ascending',
        sortDescending: 'Sort descending',
        sortAscending: 'Sort ascending',
    },
    badge: {
        dismiss: 'Dismiss ${label}',
    },
};
