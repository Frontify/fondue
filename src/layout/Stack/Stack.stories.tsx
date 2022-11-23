/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { merge } from '@utilities/merge';
import React, { FC } from 'react';
import { Stack, StackProps } from './Stack';

const Placeholder: FC<{ width?: 'auto' | 'large' | 'small'; height?: 'large' | 'small' }> = ({
    width = 'auto',
    height = 'large',
}) => (
    <div
        className={merge([
            width === 'auto' && 'tw-w-full',
            width === 'large' && 'tw-w-5/12',
            width === 'small' && 'tw-w-2/12',
            height === 'large' && 'tw-h-16',
            height === 'small' && 'tw-h-8',
            'tw-bg-base tw-opacity-50',
        ])}
    ></div>
);

export default {
    title: 'Layout/Stack',
    component: Stack,
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
        padding: {
            options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
            control: { type: 'select' },
        },
        spacing: {
            options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
            control: { type: 'select' },
        },
        align: {
            options: ['stretch', 'start', 'end', 'center'],
            control: { type: 'select' },
        },
        justify: {
            options: ['start', 'end', 'center', 'around', 'evenly', 'between'],
            control: { type: 'select' },
        },
        direction: {
            options: ['row', 'column'],
            control: { type: 'radio' },
        },
    },
} as Meta<StackProps>;

const Template: StoryFn<StackProps> = (args) => (
    <div className="tw-bg-box-negative-inverse">
        <Stack {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    direction: 'row',
    padding: 'm',
    spacing: 's',
    children: (
        <>
            <Placeholder />
            <Placeholder />
            <Placeholder />
        </>
    ),
};

export const Wrapped = Template.bind({});
Wrapped.args = {
    direction: 'row',
    padding: 'm',
    spacing: 's',
    wrap: false,
    children: (
        <>
            <Placeholder width="large" />
            <Placeholder width="large" />
            <Placeholder width="large" />
        </>
    ),
};

export const Alignment = Template.bind({});
Alignment.args = {
    direction: 'row',
    padding: 'm',
    spacing: 'm',
    align: 'stretch',
    justify: 'start',
    children: (
        <>
            <Placeholder width="small" />
            <Placeholder width="large" height="small" />
            <Placeholder width="small" />
        </>
    ),
};
