/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { sharedTypographyArgTypes, sharedTypographyArgs } from '../shared/Shared';
import { Text as TextComponent, TextProps } from './Text';
import { Container } from '@components/Container';
import { SPACING_VALUES } from '@utilities/dimensions';

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
            options: ['', 'neutral', 'selected', 'disabled', 'positive', 'negative', 'warning'],
            control: { type: 'select' },
            defaultValue: '',
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

export const TextChildOfBoxToken: StoryFn<TextProps> = (args) => {
    return (
        <Container color="tw-bg-box-negative" padding={SPACING_VALUES[2]}>
            <TextComponent {...args} boxColor="negative">
                {
                    'Example of the negative box alias token applied on the parent and the corresponding inverse token applied to the text content.'
                }
            </TextComponent>
        </Container>
    );
};
