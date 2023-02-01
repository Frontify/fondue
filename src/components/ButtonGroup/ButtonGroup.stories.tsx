/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { IconCheckMark, IconCross, IconPlus } from '@foundation/Icon/Generated';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ButtonGroup as ButtonGroupComponent, ButtonGroupProps } from './ButtonGroup';

export default {
    title: 'Components/Button Group',
    component: ButtonGroupComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ButtonSize,
            control: { type: 'radio' },
        },
        style: {
            options: ButtonStyle,
            control: { type: 'radio' },
        },
        emphasis: {
            options: ButtonEmphasis,
            control: { type: 'radio' },
        },
    },
    args: {
        size: ButtonSize.Medium,
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default,
    },
} as Meta<ButtonGroupProps>;

export const ButtonGroup: StoryFn = ({ ...args }) => (
    <ButtonGroupComponent size={args.size}>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconPlus />} onClick={action('onClick')}>
            Button Text
        </Button>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconCheckMark />} onClick={action('onClick')}>
            The Second
        </Button>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconCross />} onClick={action('onClick')}>
            The Third
        </Button>
    </ButtonGroupComponent>
);
