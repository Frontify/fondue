/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    heading: {
        // Family
        family: { value: '{body.family.value}', attributes: { category: 'font', type: 'family' } },
        'family-stack': { value: '{body.family-stack.value}', attributes: { category: 'font', type: 'family' } },
        // Weights
        'weight-name': {
            value: '{font.space-grotesk-medium-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-number': {
            value: '{font.space-grotesk-medium-weight-number.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        'weight-strong-name': {
            value: '{font.space-grotesk-bold-weight-name.value}',
            attributes: { category: 'font', type: 'name' },
        },
        'weight-strong-number': {
            value: '{font.space-grotesk-bold-weight-number.value}',
            attributes: { category: 'font', type: 'weight' },
        },
        // Medium Size
        'size-medium': { value: '{body.size-medium.value}', attributes: { category: 'size', type: 'font' } },
        'size-medium-line-height': {
            value: '1',
            attributes: { category: 'size', type: 'lineHeight' },
        },
        // Large Size
        'size-large': { value: '{body.size-large.value}', attributes: { category: 'size', type: 'font' } },
        'size-large-line-height': {
            value: '{body.size-large-line-height.value}',
            attributes: { category: 'size', type: 'lineHeight' },
        },
        // X-Large Size
        'size-x-large': { value: 1.25, attributes: { category: 'size', type: 'font' } },
        'size-x-large-line-height': { value: 1.5, attributes: { category: 'size', type: 'lineHeight' } },
        // XX-Large Size
        'size-xx-large': { value: 1.5, attributes: { category: 'size', type: 'font' } },
        'size-xx-large-line-height': { value: 1.75, attributes: { category: 'size', type: 'lineHeight' } },

        /**
         * STYLES
         * A bit repetitive but the easiest way to format the fonts for Figma
         * ======================================================================== */
        medium: {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-medium.value}',
                lineHeight: '{heading.size-medium-line-height.value}',
                fontWeight: '{heading.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'medium-strong': {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-medium.value}',
                lineHeight: '{heading.size-medium-line-height.value}',
                fontWeight: '{heading.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        large: {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-large.value}',
                lineHeight: '{heading.size-large-line-height.value}',
                fontWeight: '{heading.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'large-strong': {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-large.value}',
                lineHeight: '{heading.size-large-line-height.value}',
                fontWeight: '{heading.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'x-large': {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-x-large.value}',
                lineHeight: '{heading.size-x-large-line-height.value}',
                fontWeight: '{heading.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'x-large-strong': {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-x-large.value}',
                lineHeight: '{heading.size-x-large-line-height.value}',
                fontWeight: '{heading.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'xx-large': {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-xx-large.value}',
                lineHeight: '{heading.size-xx-large-line-height.value}',
                fontWeight: '{heading.weight-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
        'xx-large-strong': {
            value: {
                fontFamily: '{heading.family.value}',
                fontSize: '{heading.size-xx-large.value}',
                lineHeight: '{heading.size-xx-large-line-height.value}',
                fontWeight: '{heading.weight-strong-name.value}',
            },
            attributes: {
                category: 'font',
                type: 'style',
                target: 'figma',
            },
        },
    },
};
