/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import IconCheckMark from '@foundation/Icon/Generated/IconCheckMark';
import IconCross from '@foundation/Icon/Generated/IconCross';
import IconPlus from '@foundation/Icon/Generated/IconPlus';

import { ButtonGroup as ButtonGroupComponent, type ButtonGroupProps } from './ButtonGroup';
/**
 ### This component is deprecated, please use the [Flex layout component](/docs/current_layout-flex--documentation) as a wrapper arount the `Button` component instead.
 */
export default {
    title: 'Components/Button Group',
    component: ButtonGroupComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: Object.values(ButtonSize),
            control: { type: 'radio' },
        },
        style: {
            options: Object.values(ButtonStyle),
            control: { type: 'radio' },
        },
        emphasis: {
            options: Object.values(ButtonEmphasis),
            control: { type: 'radio' },
        },
    },
    args: {
        size: ButtonSize.Medium,
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default,
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
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
