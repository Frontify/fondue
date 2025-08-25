/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentFileBuilderResponse } from '../types';

// We aren't really in a story

export const Setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { ${componentName} } from './${componentName}';

type Story = StoryObj<typeof ${componentName}>;
const meta: Meta<typeof ${componentName}> = {
    component: ${componentName},
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
};
`,
    extension: '.stories.tsx',
});
