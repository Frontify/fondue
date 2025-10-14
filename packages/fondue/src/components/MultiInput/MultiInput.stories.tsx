/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { Dropdown, DropdownSize } from '@components/Dropdown/Dropdown';
import { MenuItemContentSize } from '@components/MenuItem';
import { TextInput } from '@components/TextInput/TextInput';
import IconIcon from '@foundation/Icon/Generated/IconIcon';
import { IconSize } from '@foundation/Icon/IconSize';

import { MultiInput as MultiInputComponent, MultiInputLayout, type MultiInputProps } from './MultiInput';

/**
 ### This component is deprecated, please use a [new Layout component](/docs/current_layout-grid--documentation) instead.
 */
export default {
    title: 'Components/Multi Input',
    component: MultiInputComponent,
    tags: ['autodocs'],
    args: {
        layout: MultiInputLayout.Columns,
        spanLastItem: false,
    },
    argTypes: {
        layout: {
            options: Object.values(MultiInputLayout),
            control: { type: 'radio' },
        },
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<MultiInputProps>;

export const MultiInputColumns: StoryFn<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState('Some value');
    const [input2, setInput2] = useState('Some value');
    const [input3, setInput3] = useState('Some value');
    const [input4, setInput4] = useState('Some value');

    return (
        <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={(value) => setInput1(value)} />
            <TextInput value={input2} onChange={(value) => setInput2(value)} />
            <TextInput value={input3} onChange={(value) => setInput3(value)} />
            <TextInput value={input4} onChange={(value) => setInput4(value)} />
        </MultiInputComponent>
    );
};

export const MultiInputTwoInputs: StoryFn<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState("Here's a value");
    const [input2, setInput2] = useState("And here's another one");

    return (
        <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={(value) => setInput1(value)} />
            <TextInput value={input2} onChange={(value) => setInput2(value)} />
        </MultiInputComponent>
    );
};

export const MultiInputThreeInputs: StoryFn<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState('Some value');
    const [input2, setInput2] = useState('Some other value');
    const [activeItemId, setActiveItemId] = useState<string | number | undefined>();

    return (
        <MultiInputComponent {...args}>
            <TextInput value={input1} onChange={(value) => setInput1(value)} />
            <TextInput value={input2} onChange={(value) => setInput2(value)} />
            <Dropdown
                onChange={(id) => setActiveItemId(id)}
                activeItemId={activeItemId}
                size={DropdownSize.Small}
                menuBlocks={[
                    {
                        id: 'block1',
                        menuItems: [
                            { id: '1', title: 'This is an option', size: MenuItemContentSize.Small },
                            { id: '2', title: 'Another option', size: MenuItemContentSize.Small },
                            { id: '3', title: 'Third option', size: MenuItemContentSize.Small },
                        ],
                    },
                ]}
            />
        </MultiInputComponent>
    );
};

MultiInputThreeInputs.args = {
    spanLastItem: true,
};

export const MultiInputSpider: StoryFn<MultiInputProps> = (args: MultiInputProps) => {
    const [input1, setInput1] = useState('8px');
    const [input2, setInput2] = useState('8px');
    const [input3, setInput3] = useState('8px');
    const [input4, setInput4] = useState('8px');

    return (
        <MultiInputComponent {...args}>
            <TextInput
                decorator={<IconIcon size={IconSize.Size16} />}
                value={input1}
                onChange={(value) => setInput1(value)}
            />
            <TextInput
                decorator={<IconIcon size={IconSize.Size16} />}
                value={input2}
                onChange={(value) => setInput2(value)}
            />
            <TextInput
                decorator={<IconIcon size={IconSize.Size16} />}
                value={input3}
                onChange={(value) => setInput3(value)}
            />
            <TextInput
                decorator={<IconIcon size={IconSize.Size16} />}
                value={input4}
                onChange={(value) => setInput4(value)}
            />
        </MultiInputComponent>
    );
};

MultiInputSpider.args = {
    layout: MultiInputLayout.Spider,
};
