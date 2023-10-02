/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { BOX_TEST_ID, Box as BoxComponent, BoxProps } from './Box';
import { SPACING_VALUES } from '@utilities/dimensions';

type Props = JSX.IntrinsicElements['div'] | JSX.IntrinsicElements['span'] | BoxProps;

export default {
    title: 'Layout/Box',
    component: BoxComponent,
    tags: ['autodocs'],
    argTypes: {
        className: {
            type: 'string',
        },
        padding: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        paddingX: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        paddingY: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        margin: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        marginX: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        marginY: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
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
