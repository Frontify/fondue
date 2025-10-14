/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { Portal, type PortalProps } from './Portal';

/**
 ### This component was deprecated, as it is not used anywhere.
 */
export default {
    title: 'Utilities/Portal',
    component: Portal,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<PortalProps>;

const Template: StoryFn<PortalProps> = () => (
    <Portal>
        <p>This content will be rendered outside of the current DOM node</p>
    </Portal>
);

export const Default = Template.bind({});
