/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    body: {
        // Family
        family: {
            value: ['{font.diatype.value}', '{font.space-grotesk.value}'],
            attributes: { category: 'font', type: 'family' },
        },
        'family-stack': {
            value: [
                '{body.family.value}',
                'Arial',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Helvetica',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
            ],
            attributes: { category: 'font', type: 'family' },
        },
        // Weights
        'weight-name': {
            value: '{font.space-grotesk-regular-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-number': {
            value: '{font.space-grotesk-regular-weight-number.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        'weight-strong-name': {
            value: '{font.space-grotesk-medium-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-strong-number': {
            value: '{font.space-grotesk-medium-weight-number.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        'weight-x-strong-name': {
            value: '{font.space-grotesk-bold-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-x-strong-number': {
            value: '{font.space-grotesk-bold-weight-number.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        // X-Small Size
        'size-x-small': { value: 0.75, attributes: { category: 'size', type: 'font' } },
        'size-x-small-line-height': { value: 1, attributes: { category: 'size', type: 'lineHeight' } },
        // Small Size
        'size-small': { value: 0.813, attributes: { category: 'size', type: 'font' } },
        'size-small-line-height': { value: 1, attributes: { category: 'size', type: 'lineHeight' } },
        // Medium Size
        'size-medium': { value: 0.875, attributes: { category: 'size', type: 'font' } },
        'size-medium-line-height': { value: 1.125, attributes: { category: 'size', type: 'lineHeight' } },
        // Large Size
        'size-large': { value: 1, attributes: { category: 'size', type: 'font' } },
        'size-large-line-height': { value: 1.25, attributes: { category: 'size', type: 'lineHeight' } },
        /**
         * STYLES
         * A bit repetitive but the easiest way to format the fonts for Figma
         * ======================================================================== */
        'x-small': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-x-small.value}',
                lineHeight: '{body.size-x-small-line-height.value}',
                fontWeight: '{body.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'x-small-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-x-small.value}',
                lineHeight: '{body.size-x-small-line-height.value}',
                fontWeight: '{body.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'x-small-x-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-x-small.value}',
                lineHeight: '{body.size-x-small-line-height.value}',
                fontWeight: '{body.weight-x-strong-name.value}',
            },
            attributes: { category: 'font', type: 'style', target: 'figma' },
        },
        small: {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-small.value}',
                lineHeight: '{body.size-small-line-height.value}',
                fontWeight: '{body.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'small-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-small.value}',
                lineHeight: '{body.size-small-line-height.value}',
                fontWeight: '{body.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'small-x-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-small.value}',
                lineHeight: '{body.size-small-line-height.value}',
                fontWeight: '{body.weight-x-strong-name.value}',
            },
            attributes: { category: 'font', type: 'style', target: 'figma' },
        },
        medium: {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-medium.value}',
                lineHeight: '{body.size-medium-line-height.value}',
                fontWeight: '{body.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'medium-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-medium.value}',
                lineHeight: '{body.size-medium-line-height.value}',
                fontWeight: '{body.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'medium-x-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-medium.value}',
                lineHeight: '{body.size-medium-line-height.value}',
                fontWeight: '{body.weight-x-strong-name.value}',
            },
            attributes: { category: 'font', type: 'style', target: 'figma' },
        },
        large: {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-large.value}',
                lineHeight: '{body.size-large-line-height.value}',
                fontWeight: '{body.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'large-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-large.value}',
                lineHeight: '{body.size-large-line-height.value}',
                fontWeight: '{body.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'large-x-strong': {
            value: {
                fontFamily: '{body.family.value}',
                fontSize: '{body.size-large.value}',
                lineHeight: '{body.size-large-line-height.value}',
                fontWeight: '{body.weight-x-strong-name.value}',
            },
            attributes: { category: 'font', type: 'style', target: 'figma' },
        },
    },
};
