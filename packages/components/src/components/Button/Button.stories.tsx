/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconColorFan,
    IconIcon,
    IconTextAlignmentCentre,
    IconTextAlignmentLeft,
    IconTextAlignmentRight,
    IconTextFormatBold,
} from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';

import { Flex } from '../Flex/Flex';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        type: 'button',
        variant: 'default',
        emphasis: 'default',
        size: 'medium',
        rounding: 'medium',
        disabled: false,
        hugWidth: true,
        children: 'Button Text',
        aspect: 'default',
        onPress: action('onPress'),
    },
};
export default meta;

export const Default: Story = {
    name: 'Icon and Text Label',
    render: (args) => (
        <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
    ),
};

export const TextLabelOnly: Story = {
    parameters: {
        manifest: {
            canonical: true,
        },
    },
};

export const WithIcon: Story = {
    name: 'Icon Only',
    args: {
        aspect: 'square',
        children: <IconIcon size={16} />,
    },
};

export const WithRoundedIcon: Story = {
    name: 'Icon Only Rounded',
    args: {
        rounding: 'full',
        title: 'Icon Only Rounded',
        children: <IconIcon size={16} />,
        aspect: 'square',
    },
};

export const WithIconAndLabel: Story = {
    name: 'Icon and Text Label',
    render: (args) => (
        <Button {...args}>
            <IconColorFan size={16} />
            Button Text
        </Button>
    ),
};

const EMPHASES = ['weak', 'default', 'strong'] as const;

const VARIANTS = ['default', 'positive', 'negative', 'danger', 'loud'] as const;

const ALIGNMENTS = [
    { value: 'left', label: 'Align left', Icon: IconTextAlignmentLeft },
    { value: 'center', label: 'Align center', Icon: IconTextAlignmentCentre },
    { value: 'right', label: 'Align right', Icon: IconTextAlignmentRight },
] as const;

type Alignment = (typeof ALIGNMENTS)[number]['value'];

/**
 * The pressed state comes from `aria-pressed`: off (`false`), partly applied (`"mixed"`) and on (`true`), one row per emphasis.
 */
export const PressedState: Story = {
    render: (args) => (
        <Flex direction="column" gap={4}>
            {EMPHASES.map((emphasis) => (
                <Flex key={emphasis} gap={2}>
                    <Button {...args} emphasis={emphasis} aria-pressed={false}>
                        <IconTextFormatBold size={16} />
                        Off
                    </Button>
                    <Button {...args} emphasis={emphasis} aria-pressed="mixed">
                        <IconTextFormatBold size={16} />
                        Mixed
                    </Button>
                    <Button {...args} emphasis={emphasis} aria-pressed>
                        <IconTextFormatBold size={16} />
                        Pressed
                    </Button>
                    <Button {...args} emphasis={emphasis} aria-pressed disabled>
                        <IconTextFormatBold size={16} />
                        Pressed, disabled
                    </Button>
                </Flex>
            ))}
        </Flex>
    ),
};

/**
 * Every variant keeps its own tone when pressed, one row per variant.
 */
export const PressedStatePerVariant: Story = {
    render: (args) => (
        <Flex direction="column" gap={4}>
            {VARIANTS.map((variant) => (
                <Flex key={variant} gap={2}>
                    {EMPHASES.map((emphasis) => (
                        <Flex key={emphasis} gap={2}>
                            <Button {...args} variant={variant} emphasis={emphasis} aria-pressed={false}>
                                {variant} {emphasis}
                            </Button>
                            <Button {...args} variant={variant} emphasis={emphasis} aria-pressed>
                                Pressed
                            </Button>
                        </Flex>
                    ))}
                </Flex>
            ))}
        </Flex>
    ),
};

type AlignmentRadioGroupProps = Story['args'];

const AlignmentRadioGroup = (args: AlignmentRadioGroupProps) => {
    const [alignment, setAlignment] = useState<Alignment>('left');

    return (
        <Flex gap={1} role="radiogroup" aria-label="Text alignment">
            {ALIGNMENTS.map(({ value, label, Icon }) => (
                <Button
                    key={value}
                    {...args}
                    role="radio"
                    aria-checked={alignment === value}
                    aria-label={label}
                    aspect="square"
                    onPress={() => setAlignment(value)}
                >
                    <Icon size={16} />
                </Button>
            ))}
        </Flex>
    );
};

/**
 * Buttons that act as radios in a group show the pressed state on the checked one through `aria-checked`.
 */
export const PressedStateInRadioGroup: Story = {
    args: {
        emphasis: 'weak',
    },
    render: (args) => <AlignmentRadioGroup {...args} />,
};
