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
        children: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        className: 'tw-font-bold tw-flex',
        children:
            'You can pass any props you want into this component. In the controls you can find examples with camelCased, aria and data attributes.',
    },
} as Meta<Props>;

const BoxTemplate: StoryFn<Props> = (args: Props) => {
    return <BoxComponent {...args} />;
};

export const Box = BoxTemplate.bind({});

export const BoxWithAliasTokens = BoxTemplate.bind({});
BoxWithAliasTokens.args = {
    className:
        'tw-bg-box-positive hover:tw-bg-box-positive-hover tw-text-box-positive-inverse hover:tw-text-box-positive-inverse-hover',
};

export const BoxWithNestedBoxAsSpan = BoxTemplate.bind({});
BoxWithNestedBoxAsSpan.args = {
    className:
        'tw-flex tw-bg-box-positive hover:tw-bg-box-positive-hover tw-text-box-positive-inverse hover:tw-text-box-positive-inverse-hover',
    children: (
        <BoxComponent as="span" className="tw-p-4">
            I am a Box component rendered as a span element inside another Box with display: flex.
        </BoxComponent>
    ),
};
