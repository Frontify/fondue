/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    shadow: {
        // Default
        matrix: {
            value: '{shadow.offset-y.value} {shadow.offset-x.value} {shadow.blur.value} {shadow.spread.value} {shadow.color.value}',
            attributes: { type: 'matrix' },
        },
        'offset-x': { value: 0, attributes: { category: 'size', type: 'shadowOffset', item: 'x' } },
        'offset-y': { value: 0.1875, attributes: { category: 'size', type: 'shadowOffset', item: 'y' } },
        spread: { value: 0, attributes: { category: 'size', type: 'shadowSpread' } },
        blur: { value: 0.625, attributes: { category: 'size', type: 'shadowBlur' } },
        color: {
            value: '{color.grey.100.value}',
            attributes: { category: 'color', type: 'shadow' },
            modify: [{ type: 'alpha', amount: 0.5 }],
        },
        // Top shadow
        'top-matrix': {
            value: '{shadow.top-offset-y.value} {shadow.top-offset-x.value} {shadow.blur.value} {shadow.top-spread.value} {shadow.color.value}',
            attributes: { type: 'matrix' },
        },
        'top-offset-x': {
            value: '{shadow.offset-x.value}',
            attributes: { category: 'size', type: 'shadowOffset', item: 'x' },
        },
        'top-offset-y': { value: -0.625, attributes: { category: 'size', type: 'shadowOffset', item: 'y' } },
        'top-spread': { value: -0.3125, attributes: { category: 'size', type: 'shadowSpread' } },
        // Bottom shadow
        'bottom-matrix': {
            value: '{shadow.bottom-offset-y.value} {shadow.bottom-offset-x.value} {shadow.blur.value} {shadow.bottom-spread.value} {shadow.color.value}',
            attributes: { type: 'matrix' },
        },
        'bottom-offset-x': {
            value: '{shadow.offset-x.value}',
            attributes: { category: 'size', type: 'shadowOffset', item: 'x' },
        },
        'bottom-offset-y': { value: 0.625, attributes: { category: 'size', type: 'shadowOffset', item: 'y' } },
        'bottom-spread': { value: -0.3125, attributes: { category: 'size', type: 'shadowSpread' } },
        // Large size
        'large-matrix': {
            value: '{shadow.large-offset-y.value} {shadow.large-offset-x.value} {shadow.large-blur.value} {shadow.large-spread.value} {shadow.large-color.value}',
            attributes: { type: 'matrix' },
        },
        'large-offset-y': { value: 1.5625, attributes: { category: 'size', type: 'shadowOffset', item: 'x' } },
        'large-offset-x': { value: 0, attributes: { category: 'size', type: 'shadowOffset', item: 'y' } },
        'large-spread': { value: 0, attributes: { category: 'size', type: 'shadowSpread' } },
        'large-blur': { value: 5, attributes: { category: 'size', type: 'shadowBlur' } },
        'large-color': {
            value: '{color.grey.100.value}',
            attributes: { category: 'color', type: 'shadow' },
            modify: [{ type: 'alpha', amount: 0.8 }],
        },
        _: {
            value: {
                x: '{shadow.offset-x.value}',
                y: '{shadow.offset-y.value}',
                blur: '{shadow.blur.value}',
                spread: '{shadow.spread.value}',
                color: '{shadow.color.value}',
            },
            attributes: {
                category: 'shadow',
                type: 'style',
            },
        },
        top: {
            value: {
                x: '{shadow.top-offset-x.value}',
                y: '{shadow.top-offset-y.value}',
                blur: '{shadow.blur.value}',
                spread: '{shadow.top-spread.value}',
                color: '{shadow.color.value}',
            },
            attributes: {
                category: 'shadow',
                type: 'style',
            },
        },
        bottom: {
            value: {
                x: '{shadow.bottom-offset-x.value}',
                y: '{shadow.bottom-offset-y.value}',
                blur: '{shadow.blur.value}',
                spread: '{shadow.bottom-spread.value}',
                color: '{shadow.color.value}',
            },
            attributes: {
                category: 'shadow',
                type: 'style',
            },
        },
        big: {
            value: {
                x: '{shadow.large-offset-x.value}',
                y: '{shadow.large-offset-y.value}',
                blur: '{shadow.large-blur.value}',
                spread: '{shadow.large-spread.value}',
                color: '{shadow.large-color.value}',
            },
            attributes: {
                category: 'shadow',
                type: 'style',
            },
        },
    },
};
