/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Container as ContainerComponent, ContainerProps, PaddingType } from './Container';

const acceptablePaddingInput: PaddingType[] = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

export default {
    title: 'Components/Container',
    component: ContainerComponent,
    tags: ['autodocs'],
    argTypes: {
        padding: {
            options: Object.values(acceptablePaddingInput),
            control: { type: 'select' },
        },
        children: { table: { disable: false } },
    },
    args: {
        minWidth: 50,
        maxWidth: 100,
        padding: 12,
        children: <div>This is a container</div>,
    },
} as Meta<ContainerProps>;

export const Container: StoryFn<ContainerProps> = (args: ContainerProps) => <ContainerComponent {...args} />;
