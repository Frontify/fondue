/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { sharedTypographyArgTypes, sharedTypographyArgs } from '../shared/Shared';

import { Heading as HeadingComponent, type HeadingProps } from './Heading';

/**
 ### *Legacy component warning*
 #### This is a deprecated component. It will be removed in the next major version.
 #### _**Use the [new Heading component](/docs/current_typography-heading--documentation) instead.**_
 */
export default {
    title: 'Legacy Components/Deprecated/Heading',
    component: HeadingComponent,
    argTypes: {
        size: {
            options: ['medium', 'large', 'x-large', 'xx-large'],
            control: { type: 'select' },
        },
        weight: {
            options: ['default', 'strong'],
            control: { type: 'select' },
        },
        as: {
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'],
            control: { type: 'select' },
        },
        color: {
            options: ['default', 'weak', 'x-weak', 'disabled', 'negative', 'positive', 'warning', 'interactive'],
            control: { type: 'select' },
        },
        ...sharedTypographyArgTypes,
    },
    args: {
        children: 'The fox jumps over the lazy dog',
        size: 'medium',
        weight: 'default',
        as: 'span',
        color: 'default',
        ...sharedTypographyArgs,
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<HeadingProps>;

export const DefaultHeading: StoryFn<HeadingProps> = (args) => <HeadingComponent {...args} />;

export const LongHeadingWithNewLines: StoryFn<HeadingProps> = (args) => (
    <div className="tw-w-[200px] tw-p-2 tw-rounded tw-border">
        <HeadingComponent {...args}>
            {`Heading with veryveryveryveryveryextremelyhugelymassivelysuperlengthygiganticwords and limited width.\nThis is to display
            the different types of overflow control available.`}
        </HeadingComponent>
    </div>
);
