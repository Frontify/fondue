/* (c) Copyright Frontify Ltd., all rights reserved. */

const boxShadowFocusDefault = `0 0 0 2px var(--color-surface-default), 0 0 0 6px var(--color-focus-default)`;
export const focusRingUtility = {
    value: {
        boxShadow: boxShadowFocusDefault,
        outline: 'none',
    },
    attributes: {
        color: {
            name: 'color-focus-default',
            type: 'string',
            value: 'ref_colors/focus-ring/default',
        },
        ringWidth: {
            name: 'ring-width-focus-default',
            type: 'string',
            value: '4px',
        },
        offsetColor: {
            name: 'color-surface-default',
            type: 'string',
            value: 'ref_colors/surface/default',
        },
        offsetWidth: {
            name: 'offset-width-focus-default',
            type: 'string',
            value: '2px',
        },
        boxShadow: {
            name: 'box-shadow-focus-default',
            type: 'rawValue',
            value: boxShadowFocusDefault,
        },
    },
};

export const customUtilities = {
    custom: {
        ring: {
            focus: focusRingUtility.attributes,
        },
    },
};
