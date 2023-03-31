/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Box as BoxComponent } from './Box';

type Props = JSX.IntrinsicElements['div'];

export default {
    title: 'Layout/Box',
    component: BoxComponent,
    tags: ['autodocs'],
    argTypes: {
        className: {
            type: 'string',
        },
        'data-test-id': {
            type: 'string',
        },
        'aria-label': {
            type: 'string',
        },
    },
    args: {
        className: 'tw-font-bold tw-flex',
    },
} as Meta<Props>;

export const Box: StoryFn<Props> = (args: Props) => {
    return (
        <BoxComponent {...args}>
            You can pass any props you want into this component. In the controls you can find examples with camelCased,
            aria and data attributes.
        </BoxComponent>
    );
};
