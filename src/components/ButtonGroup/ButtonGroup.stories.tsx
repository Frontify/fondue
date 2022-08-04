/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { IconAddSimple, IconCheck, IconReject } from '@foundation/Icon/Generated';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import { ButtonGroup as ButtonGroupComponent, ButtonGroupProps } from './ButtonGroup';

export default {
    title: 'Components/Button Group',
    component: ButtonGroupComponent,
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

export const ButtonGroup = ({ ...args }) => (
    <ButtonGroupComponent size={args.size}>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconAddSimple />} onClick={action('onClick')}>
            Button Text
        </Button>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconCheck />} onClick={action('onClick')}>
            The Second
        </Button>
        <Button style={args.style} emphasis={args.emphasis} icon={<IconReject />} onClick={action('onClick')}>
            The Third
        </Button>
    </ButtonGroupComponent>
);
