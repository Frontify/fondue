/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle, ButtonEmphasis } from '@components/Button/Button';
import { IconAddSimple, IconReject, IconCheck } from '@foundation/Icon/Generated';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import { ButtonGroup as ButtonGroupComponent, ButtonGroupProps } from './ButtonGroup';

export default {
    title: 'Components/Button Group',
    component: ButtonGroupComponent,
    argTypes: {
        size: {
            options: [ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large],
            control: { type: 'radio' },
        },
        style: {
            options: [ButtonStyle.Default, ButtonStyle.Positive, ButtonStyle.Negative, ButtonStyle.Danger],
            control: { type: 'radio' },
        },
        emphasis: {
            options: [ButtonEmphasis.Default, ButtonEmphasis.Weak, ButtonEmphasis.Strong],
            control: { type: 'radio' },
        },
    },
    args: {
        size: ButtonSize.Medium,
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default,
        inverted: false,
    },
} as Meta<ButtonGroupProps>;

export const ButtonGroup = ({ ...args }) => (
    <ButtonGroupComponent size={args.size}>
        <Button
            style={args.style}
            emphasis={args.emphasis}
            inverted={args.inverted}
            icon={<IconAddSimple />}
            onClick={action('onClick')}
        >
            Button Text
        </Button>
        <Button
            style={args.style}
            emphasis={args.emphasis}
            inverted={args.inverted}
            icon={<IconCheck />}
            onClick={action('onClick')}
        >
            The Second
        </Button>
        <Button
            style={args.style}
            emphasis={args.emphasis}
            inverted={args.inverted}
            icon={<IconReject />}
            onClick={action('onClick')}
        >
            The Third
        </Button>
    </ButtonGroupComponent>
);
