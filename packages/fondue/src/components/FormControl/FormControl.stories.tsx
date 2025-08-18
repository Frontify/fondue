/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Checklist, ChecklistDirection } from '@components/Checklist/Checklist';
import { Dropdown, DropdownSize } from '@components/Dropdown/Dropdown';
import { MenuItemContentSize } from '@components/MenuItem';
import { SegmentedControls } from '@components/SegmentedControls/SegmentedControls';
import { TextInput } from '@components/TextInput/TextInput';
import { generateRandomId } from '@utilities/generateRandomId';

import {
    FormControl,
    FormControlDirection,
    type FormControlProps,
    FormControlStyle,
    HelperPosition,
} from './FormControl';

export default {
    title: 'Components/Form Control',
    component: FormControl,
    tags: ['autodocs'],
    args: {
        style: FormControlStyle.Primary,
        disabled: false,
        direction: FormControlDirection.Vertical,
        label: {
            children: 'Input Label',
            required: false,
            htmlFor: generateRandomId(),
            tooltip: { content: 'Tooltip Text' },
        },
        extra: 'Extra Text or Element',
        helper: {
            text: 'Helper Text (before/after) and variant (Primary/Success/Danger)',
            position: HelperPosition.After,
        },
        children: '',
    },
    argTypes: {
        orientation: {
            options: Object.values(FormControlDirection),
            control: 'select',
        },
        children: {
            table: { disable: true },
        },
        style: {
            options: Object.values(FormControlStyle),
            control: 'radio',
        },
    },
} as Meta<FormControlProps>;

export const WithTextInput: StoryFn<FormControlProps> = (args) => {
    const [input, setInput] = useState('');

    return (
        <FormControl clickable {...args}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>
    );
};

export const WithStyleDanger: StoryFn<FormControlProps> = (args) => {
    const [input, setInput] = useState('');

    return (
        <FormControl {...args} style={FormControlStyle.Danger}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>
    );
};

export const WithStylePositive: StoryFn<FormControlProps> = (args) => {
    const [input, setInput] = useState('');

    return (
        <FormControl {...args} style={FormControlStyle.Positive}>
            <TextInput value={input} onChange={setInput} />
        </FormControl>
    );
};

export const WithStyleDisabled: StoryFn<FormControlProps> = (args) => {
    const [input, setInput] = useState('');

    return (
        <FormControl {...args} disabled>
            <TextInput value={input} onChange={setInput} />
        </FormControl>
    );
};

export const WithSegmentedControls: StoryFn<FormControlProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState<string>('a');
    return (
        <FormControl {...args}>
            <SegmentedControls
                items={[
                    { id: '1', value: 'abc' },
                    { id: '2', value: 'def' },
                    { id: '3', value: 'ghi' },
                ]}
                activeItemId={activeItemId}
                onChange={setActiveItemId}
            />
        </FormControl>
    );
};

export const WithDropdown: StoryFn<FormControlProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState<string | number | undefined>();
    return (
        <FormControl {...args}>
            <Dropdown
                onChange={(id) => setActiveItemId(id)}
                activeItemId={activeItemId}
                size={DropdownSize.Small}
                menuBlocks={[
                    {
                        id: 'block1',
                        menuItems: [
                            { id: '1', title: 'Small 1', size: MenuItemContentSize.Small },
                            { id: '2', title: 'Small 2', size: MenuItemContentSize.Small },
                            { id: '3', title: 'Small 3', size: MenuItemContentSize.Small },
                        ],
                    },
                ]}
            />
        </FormControl>
    );
};

export const WithVerticalChecklist: StoryFn<FormControlProps> = (args) => {
    const [activeBoxes, setActiveBoxes] = useState<string[]>([]);
    const checkboxes = Array.from({ length: 5 })
        .fill({})
        .map((_, index) => ({
            id: `checkbox-${index}`,
            value: `checkbox-${index}`,
            label: `Checkbox Nr. ${index}`,
            tooltip: { content: `Random Tooltip ${index}` },
        }));

    return (
        <FormControl {...args}>
            <Checklist
                activeValues={activeBoxes}
                setActiveValues={setActiveBoxes}
                direction={ChecklistDirection.Vertical}
                checkboxes={checkboxes}
            />
        </FormControl>
    );
};
