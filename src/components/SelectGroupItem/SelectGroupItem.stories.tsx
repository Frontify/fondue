/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { SelectGroupItem, SelectGroupItemProps } from './SelectGroupItem';
import { SelectItem, SelectItemProps } from '@components/SelectItem/SelectItem';
import { IconClock16, IconFaceSad16, IconFocalPoint16, IconNook16 } from '@foundation/Icon';
import { Select } from '@components/Select/Select';

const ITEM_GROUPS_1: SelectItemProps[] = [
    { id: '1', title: 'title prop of Apple', value: 'value prop of Apple', decorator: <IconNook16 /> },
    { id: '2', value: 'value prop of Orange', decorator: <IconClock16 /> },
    { id: '3', title: 'title prop of Pear', value: 'value prop of Pear' },
    { id: '4', title: 'title prop of Kiwi (disabled)', value: 'value prop of Kiwi', disabled: true },
];

const ITEM_GROUPS_2: SelectItemProps[] = [
    { id: '5', title: 'title prop of Cabbage', value: 'value prop of Cabbage', decorator: <IconFocalPoint16 /> },
    { id: '6', value: 'value prop of Carrot' },
    { id: '7', title: 'title prop of Potato', value: 'value prop of Potato' },
    { id: '8', value: 'value prop of Squash', decorator: <IconFaceSad16 /> },
];

export default {
    title: 'Components/SelectGroupItem',
    component: SelectGroupItem,
    tags: ['autodocs'],
    argType: {
        groupTitle: { control: { type: 'string' } },
    },
    args: {
        groupTitle: undefined,
    },
} as Meta<SelectGroupItemProps>;

export const Default: StoryFn<SelectGroupItemProps> = (args) => {
    return (
        <Select>
            <SelectGroupItem {...args} groupTitle="Fruit">
                {...ITEM_GROUPS_1.map((item) => <SelectItem key={item.id} id={item.id} value={item.value} />)}
            </SelectGroupItem>
        </Select>
    );
};

export const WithMultipleGroups: StoryFn<SelectGroupItemProps> = (args) => {
    return (
        <Select>
            <SelectGroupItem {...args} groupTitle="Fruit">
                {...ITEM_GROUPS_1.map((item) => <SelectItem key={item.id} id={item.id} value={item.value} />)}
            </SelectGroupItem>
            <SelectGroupItem {...args} groupTitle="Veggies">
                {...ITEM_GROUPS_2.map((item) => <SelectItem key={item.id} id={item.id} value={item.value} />)}
            </SelectGroupItem>
        </Select>
    );
};
