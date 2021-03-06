/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle } from '@components/Button/Button';
import IconCross from '@foundation/Icon/Generated/IconCross';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
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
    },
    args: {
        size: ButtonSize.Medium,
    },
} as Meta<ButtonGroupProps>;

export const ButtonGroup: Story<ButtonGroupProps> = (args: ButtonGroupProps) => (
    <ButtonGroupComponent size={args.size}>
        <Button onClick={action('onClick')}>The First</Button>
        <Button onClick={action('onClick')} style={ButtonStyle.Secondary}>
            The Second
        </Button>
        <Button onClick={action('onClick')} icon={<IconCross />} style={ButtonStyle.Danger}>
            The Third
        </Button>
    </ButtonGroupComponent>
);
