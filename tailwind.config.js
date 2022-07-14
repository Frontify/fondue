/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    presets: [require('@frontify/fondue-tokens/tailwind')],
    content: ['./src/**/*.{js,ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                height: 'height',
            },
        },
    },
};
