/* (c) Copyright Frontify Ltd., all rights reserved. */

export const POPPER_STORY_ARGS = {
    anchor: {
        description:
            'The anchor serves as the point of reference to which the popper container positions itself relatively.',
    },
    placement: {
        options: [
            'top',
            'bottom',
            'top-start',
            'bottom-start',
            'top-end',
            'bottom-end',
            'right',
            'left',
            'right-start',
            'right-end',
            'left-start',
            'left-end',
        ],
        control: { type: 'select' },
    },
    flip: {
        control: { type: 'boolean' },
    },
    enablePortal: {
        control: { type: 'boolean' },
    },
    strategy: {
        options: ['absolute', 'fixed'],
        control: { type: 'radio' },
    },
    open: { control: { type: 'boolean' } },
};
