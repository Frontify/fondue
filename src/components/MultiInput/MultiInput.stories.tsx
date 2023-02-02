/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, DropdownSize } from '@components/Dropdown/Dropdown';
import { MenuItemContentSize } from '@components/MenuItem';
import { TextInput } from '@components/TextInput/TextInput';
import { IconSize } from '@foundation/Icon/IconSize';
import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { MultiInput as MultiInputComponent, MultiInputLayout, MultiInputProps } from './MultiInput';
import { IconIcon } from '@foundation/Icon';

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
