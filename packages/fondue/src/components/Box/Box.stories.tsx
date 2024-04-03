/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { SPACING_VALUES } from '@utilities/dimensions';

import { BOX_TEST_ID, Box as BoxComponent, type BoxProps } from './Box';

type Props = JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['span'] | BoxProps;

const spacingSelect = {
    options: Object.values(SPACING_VALUES),
    control: { type: 'select' },
    defaultValue: '',
};

export default {
    title: 'Layout/Box',
    component: BoxComponent,
    tags: ['autodocs'],
    argTypes: {
        className: {
            type: 'string',
        },
        paddingX: spacingSelect,
        paddingY: spacingSelect,
        padding: spacingSelect,
        marginX: spacingSelect,
        marginY: spacingSelect,
        margin: spacingSelect,
        'data-test-id': {
            type: 'string',
        },
        'aria-label': {
            type: 'string',
        },
        as: {
            options: ['div', 'span'],
            control: {
                type: 'select',
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        className: 'tw-font-bold tw-flex',
        'data-test-id': BOX_TEST_ID,
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
        <BoxComponent as="span">
            I am a Box component rendered as a span element inside another Box with display: flex.
        </BoxComponent>
    ),
    padding: 16,
};
