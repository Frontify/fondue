/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan, IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

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
        docs: {
            description: {
                component: [
                    "Buttons are interactive elements that let users get things done — from submitting a form to triggering a specific action.",
                    '',
                    "You'll find them everywhere in a UI. Buttons are small but mighty tools for turning intention into action.",
                    '',
                    'A button is made up of key parts that work together to create a clear, actionable element. At least one content element must be included — either a label, an icon, or both. The trailing icon is optional and used when the button triggers a dropdown.',
                    '',
                    '**Variant:** Variants help convey the context or meaning behind a button at a glance. Choose the variant based on the action you want to communicate — `default` for actions that do not require special attention, `negative` for actions that might have negative consequences such as "Cancel", `danger` for severe or irreversible actions such as "Delete", `positive` for actions that confirm or complete tasks like "Approve", and `highlight` (loud) for buttons that require extra visibility — use this very sparingly.',
                    '',
                    '**Emphasis:** Use emphasis to control visual hierarchy and guide attention. Buttons can have `weak`, `default`, or `strong` emphasis. Use `strong` for primary, high-priority actions; `default` for common or neutral actions; and `weak` for secondary or less prominent options.',
                    '',
                    '**Size:** Buttons come in three sizes to support different layout needs. Use `small` when space is tight or the button has a lower visual priority. `medium` is the default and works well in most layouts. Choose `large` when you need to give the button more presence.',
                    '',
                    '**Icon:** Use a leading icon to add visual context or reinforce meaning. Add this when the button needs an extra visual cue.',
                    '',
                    '**Caret:** The caret signals to users that clicking the button will reveal additional options. It\'s usually used in combination with the dropdown component.',
                    '',
                    '**Action vs. navigation:** Buttons should be used for actions or commands only. Use links for navigation purposes. This distinction helps users understand what will happen — buttons trigger an immediate result, while links offer navigation to a new location.',
                    '',
                    '**Full-width usage:** Use full-width buttons sparingly and consistently. They work well on smaller screens like mobile layouts and at the bottom of forms. Avoid them on wider screens where they feel overwhelming, or on low-importance actions where the style implies undue importance.',
                    '',
                    '**Accessible labeling:** Button labels should be straightforward and easy to understand. Use concise, descriptive language that clearly reflects the action being taken. Avoid vague terms like "Go" or "Click here" in favor of specific verbs such as "Submit," "Download," or "Continue." Clear labels not only improve accessibility — they make the entire experience feel more intuitive and trustworthy.',
                ].join('\n'),
            },
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

export const TextLabelOnly: Story = {};

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
