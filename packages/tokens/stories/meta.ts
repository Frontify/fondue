/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta } from '@storybook/react-vite';

/**
 * Shared by every tokens story: each one is its own file so it shows up as a
 * single entry in the sidebar instead of being nested under a component.
 */
export const tokenStoryMeta = {
    args: {
        textContent: 'Hello World!',
        removeTailwindPrefix: false,
    },
    argTypes: {
        textContent: {
            control: { type: 'text' },
        },
        removeTailwindPrefix: {
            description: 'Remove the frontify tailwind prefix (tw-) from the twailwind class name',
            control: { type: 'boolean' },
        },
    },
    parameters: {
        status: {
            type: 'released',
        },
    },
} satisfies Meta;
