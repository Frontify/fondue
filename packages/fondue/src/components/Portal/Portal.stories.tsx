/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Portal, PortalProps } from './Portal';

export default {
    title: 'Utilities/Portal',
    component: Portal,
    tags: ['autodocs'],
} as Meta<PortalProps>;

const Template: StoryFn<PortalProps> = () => (
    <Portal>
        <p>This content will be rendered outside of the current DOM node</p>
    </Portal>
);

export const Default = Template.bind({});
