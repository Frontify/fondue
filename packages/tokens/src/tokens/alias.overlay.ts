/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    overlay: {
        color: {
            value: '{color.grey.20.value}',
            attributes: { category: 'color', type: 'shadow' },
            modify: [{ type: 'alpha', amount: 0.5 }],
        },
    },
};
