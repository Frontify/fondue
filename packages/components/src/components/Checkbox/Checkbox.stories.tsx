/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type FormEvent, useState, useId } from 'react';
import { action } from 'storybook/actions';

import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';

import { Checkbox, CheckboxComponent } from './Checkbox';

type Story = StoryObj<typeof CheckboxComponent>;
const meta: Meta<typeof CheckboxComponent> = {
    title: 'Components/Checkbox',
    component: CheckboxComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
        docs: {
            description: {
                component: [
                    'A checkbox is an input for selecting from predefined options.',
                    '',
                    "On its own, it's a quick yes-or-no choice — but group a few together, and it becomes a flexible way for users to pick multiple options from a list.",
                    '',
                    'Behind every checkbox is a label and a box — and sometimes a bit more. At minimum, a checkbox must include the checkbox element itself. Additional elements, such as a label, required indicator, or tooltip icon, are optional and can be included to provide extra context or guidance. The interactive area encompasses the checkbox and its associated label, ensuring a larger and more accessible tap target.',
                    '',
                    '**Emphasis:** Use emphasis to draw attention to checkboxes in high-priority contexts. The default style is subtle and fits well in standard forms or lists. Use the highlight style when you need to visually differentiate a checkbox — for example in key user decisions.',
                    '',
                    '**Size:** Choose a checkbox size based on the surrounding UI and interaction context. The default size works well in most layouts. Use the large size in touch-friendly environments or where increased visual weight is needed.',
                    '',
                    '**Selection state:** Checkboxes support three visual states: selected, unselected, and indeterminate. Selected shows an option has been chosen. Unselected shows the option is not currently chosen. Indeterminate is used when a parent checkbox represents a partially selected group — it\'s a visual cue only and doesn\'t affect the checkbox\'s actual value. Use these states to reflect user input accurately and provide clarity in complex selection patterns.',
                    '',
                    '**Label:** Whenever possible, checkboxes should include a visible label that clearly describes the associated option. Labels improve usability, accessibility, and support larger tap targets. In certain UI patterns — such as selecting cards, images, or other visually rich content — checkboxes may be used without direct labels. In these cases, ensure the checkbox\'s meaning is still clear from surrounding context or supporting elements.',
                    '',
                    '**Tooltip:** Use a tooltip icon when additional context is needed to explain the checkbox label or its consequences. Keep tooltip content concise, relevant, and avoid relying on it for critical information.',
                    '',
                    '**Required:** Use a required indicator when a checkbox must be selected to complete a task or submit a form. The indicator should appear next to the label.',
                ].join('\n'),
            },
        },
    },
    args: {
        disabled: false,
        required: false,
        readOnly: false,
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);
        const id = useId();
        const checkboxId = `checkbox-${id}`;
        const labelId = `label-${id}`;

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <Flex gap={2} align="center">
                <Checkbox {...args} id={checkboxId} aria-labelledby={labelId} value={value} onChange={handleToggle} />
                <Label id={labelId} htmlFor={checkboxId} required={args.required}>
                    Checkbox
                </Label>
            </Flex>
        );
    },
};
export default meta;

export const Default: Story = {};

export const Indeterminate: Story = {
    args: {
        value: 'indeterminate',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const ReadOnly: Story = {
    args: {
        readOnly: true,
        value: true,
    },
};

export const WithTooltip: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.value);
        const id = useId();
        const checkboxId = `checkbox-${id}`;
        const labelId = `label-${id}`;

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <Flex gap={2}>
                <Checkbox {...args} id={checkboxId} aria-labelledby={labelId} value={value} onChange={handleToggle} />
                <Label id={labelId} htmlFor={checkboxId} required={args.required}>
                    Checkbox
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconQuestionMarkCircle size="16" />
                        </Tooltip.Trigger>

                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
            </Flex>
        );
    },
};

export const WithoutLabel: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.value);

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <div className="tw-flex tw-gap-2 tw-items-center">
                <Checkbox {...args} id="checkbox" aria-labelledby="label" value={value} onChange={handleToggle} />
            </div>
        );
    },
};

export const Checklist: Story = {
    render: (args) => {
        return (
            <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-1" aria-labelledby="label-1" value onChange={() => undefined} />
                    <Label id="label-1" htmlFor="checkbox-1">
                        Checkbox 1
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox
                        {...args}
                        id="checkbox-2"
                        aria-labelledby="label-2"
                        value={false}
                        onChange={() => undefined}
                    />
                    <Label id="label-2" htmlFor="checkbox-2">
                        Checkbox 2
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox
                        {...args}
                        id="checkbox-3"
                        aria-labelledby="label-3"
                        value="indeterminate"
                        onChange={() => undefined}
                    />
                    <Label id="label-3" htmlFor="checkbox-3">
                        Checkbox 3
                    </Label>
                </Flex>
            </Flex>
        );
    },
};

export const WithErrorAndHelpText: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.value);
        const id = useId();
        const checkboxId = `checkbox-${id}`;
        const labelId = `label-${id}`;
        const helpTextId = `helptext-${id}`;

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <Flex direction="column" gap={2}>
                <Flex gap={2} align="center">
                    <Checkbox
                        {...args}
                        id={checkboxId}
                        aria-labelledby={labelId}
                        aria-describedby={helpTextId}
                        value={value}
                        onChange={handleToggle}
                        status="error"
                    />
                    <Label id={labelId} htmlFor={checkboxId}>
                        I agree to the terms and conditions.
                    </Label>
                </Flex>
                <Text id={helpTextId} size="small" color="negative">
                    Please check this box to continue.
                </Text>
            </Flex>
        );
    },
};
