/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    code: {
        // Family
        family: { value: '{font.menlo.value}', attributes: { category: 'font', type: 'family' } },
        'family-stack': {
            value: ['{code.family.value}', 'Courier', 'monospace'],
            attributes: { category: 'font', type: 'family' },
        },
        // Weights
        'weight-name': {
            value: '{font.menlo-regular-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-number': {
            value: '{font.menlo-regular-weight-name.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        'weight-strong-name': {
            value: '{font.menlo-bold-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-strong-number': {
            value: '{font.menlo-bold-weight-number.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        // Small Size
        'size-small': { value: 0.813, attributes: { category: 'size', type: 'font' } },
        'size-small-line-height': { value: 1, attributes: { category: 'size', type: 'lineHeight' } },
        // Medium Size
        'size-medium': { value: 0.875, attributes: { category: 'size', type: 'font' } },
        'size-medium-line-height': { value: 1, attributes: { category: 'size', type: 'lineHeight' } },
        // Large Size
        'size-large': { value: 1, attributes: { category: 'size', type: 'font' } },
        'size-large-line-height': { value: 1.25, attributes: { category: 'size', type: 'lineHeight' } },

        /**
         * STYLES
         * A bit repetitive but the easiest way to format the fonts for Figma
         * ======================================================================== */
        small: {
            value: {
                fontFamily: '{code.family.value}',
                fontSize: '{code.size-small.value}',
                lineHeight: '{code.size-small-line-height.value}',
                fontWeight: '{code.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'small-strong': {
            value: {
                fontFamily: '{code.family.value}',
                fontSize: '{code.size-small.value}',
                lineHeight: '{code.size-small-line-height.value}',
                fontWeight: '{code.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        medium: {
            value: {
                fontFamily: '{code.family.value}',
                fontSize: '{code.size-medium.value}',
                lineHeight: '{code.size-medium-line-height.value}',
                fontWeight: '{code.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'medium-strong': {
            value: {
                fontFamily: '{code.family.value}',
                fontSize: '{code.size-medium.value}',
                lineHeight: '{code.size-medium-line-height.value}',
                fontWeight: '{code.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        large: {
            value: {
                fontFamily: '{code.family.value}',
                fontSize: '{code.size-large.value}',
                lineHeight: '{code.size-large-line-height.value}',
                fontWeight: '{code.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'large-strong': {
            value: {
                fontFamily: '{code.family.value}',
                fontSize: '{code.size-large.value}',
                lineHeight: '{code.size-large-line-height.value}',
                fontWeight: '{code.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
    },
};
