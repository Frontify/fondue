/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    line: {
        // Color
        color: {
            value: '{color.grey.0.value}',
            attributes: { category: 'color' },
            modify: [{ type: 'alpha', amount: 0.1 }],
        },
        'color-weak': {
            value: '{color.grey.0.value}',
            attributes: { category: 'color' },
            modify: [{ type: 'alpha', amount: 0.05 }],
        },
        'color-strong': {
            value: '{color.grey.0.value}',
            attributes: { category: 'color' },
            modify: [{ type: 'alpha', amount: 0.3 }],
        },
        'color-x-strong': {
            value: '{color.grey.0.value}',
            attributes: { category: 'color' },
            modify: [{ type: 'alpha', amount: 0.5 }],
        },
        'color-xx-strong': { value: '{color.grey.0.value}', attributes: { category: 'color' } },
        'color-mighty': {
            value: '{color.grey.100.value}',
            attributes: { category: 'color' },
            modify: [{ type: 'alpha', amount: 0.15 }],
        },
    },
};
