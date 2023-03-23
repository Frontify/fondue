/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Box as BoxComponent } from './Box';

type Props = JSX.IntrinsicElements['div'];

export default {
    title: 'Components/Box',
    component: BoxComponent,
    tags: ['autodocs'],
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        className: 'tw-font-bold tw-flex',
    },
} as Meta<Props>;

export const Box: StoryFn<Props> = (args: Props) => {
    return <BoxComponent {...args}>You can pass any props you want into this component.</BoxComponent>;
};
