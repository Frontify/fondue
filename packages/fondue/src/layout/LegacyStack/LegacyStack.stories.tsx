/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { type ReactElement } from 'react';

import { merge } from '@utilities/merge';

import { LegacyStack, type LegacyStackProps } from './LegacyStack';

const Placeholder = ({
    width = 'auto',
    height = 'large',
}: {
    width?: 'auto' | 'large' | 'small';
    height?: 'large' | 'small';
}): ReactElement => (
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

/**
 ### This component is deprecated, please use the [new Flex layout component](/docs/current_layout-flex--documentation) instead.
 */
export default {
    title: 'Deprecated/LegacyStack',
    component: LegacyStack,
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
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<LegacyStackProps>;

const Template: StoryFn<LegacyStackProps> = (args): ReactElement => (
    <div className="tw-bg-box-negative-inverse">
        <LegacyStack {...args} />
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
