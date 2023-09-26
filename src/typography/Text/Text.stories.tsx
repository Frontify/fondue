/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { sharedTypographyArgTypes, sharedTypographyArgs } from '../shared/Shared';
import { Text as TextComponent, TextProps } from './Text';

export default {
    title: 'Typography/Text',
    component: TextComponent,
    argTypes: {
        size: {
            options: ['x-small', 'small', 'medium', 'large'],
            control: { type: 'select' },
        },
        weight: {
            options: ['default', 'strong', 'x-strong'],
            control: { type: 'select' },
        },
        as: {
            options: ['a', 'abbr', 'address', 'em', 'label', 'li', 'span', 'strong', 'time', 'p'],
            control: { type: 'select' },
        },
        color: {
            options: ['default', 'weak', 'x-weak', 'disabled', 'negative', 'positive', 'warning', 'interactive'],
            control: { type: 'select' },
        },
        boxColor: {
            options: [
                'default',
                'base',
                'baseAlt',
                'neutral',
                'neutralInverse',
                'selected',
                'selectedInverse',
                'disabled',
                'disabledInverse',
                'positive',
                'positiveInverse',
                'negative',
                'negativeInverse',
                'warning',
                'warningInverse',
            ],
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
        boxColor: 'default',
        ...sharedTypographyArgs,
    },
} as Meta<TextProps>;

export const DefaultText: StoryFn<TextProps> = (args) => <TextComponent {...args} />;

export const LongTextWithNewLines: StoryFn<TextProps> = (args) => (
    <div className="tw-w-[200px] tw-p-2 tw-rounded tw-border">
        <TextComponent {...args}>
            {`Text with veryveryveryveryveryextremelyhugelymassivelysuperlengthygiganticwords and limited width.\nThis is to display
            the different types of overflow control available.`}
        </TextComponent>
    </div>
);
