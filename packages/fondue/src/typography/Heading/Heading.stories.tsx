/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { sharedTypographyArgTypes, sharedTypographyArgs } from '../shared/Shared';

import { Heading as HeadingComponent, type HeadingProps } from './Heading';

export default {
    title: 'Typography/Heading',
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
