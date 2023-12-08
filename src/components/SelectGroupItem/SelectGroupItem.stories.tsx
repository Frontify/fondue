/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { SelectGroupItem, SelectGroupItemProps } from './SelectGroupItem';
import { SelectItem, SelectItemProps } from '@components/SelectItem/SelectItem';
import { IconClock16, IconFaceSad16, IconFocalPoint16, IconNook16 } from '@foundation/Icon';
import { Select } from '@components/Select/Select';

const ITEM_GROUPS_1: SelectItemProps[] = [
    { id: '1', value: 'apple', title: 'Apple', decorator: <IconNook16 /> },
    { id: '2', value: 'Orange', decorator: <IconClock16 /> },
    { id: '3', value: 'pear', title: 'Pear' },
    { id: '4', value: 'kiwi', title: 'Kiwi (disabled)', disabled: true },
];

const ITEM_GROUPS_2: SelectItemProps[] = [
    { id: '5', value: 'cabbage', title: 'Cabbage', decorator: <IconFocalPoint16 /> },
    { id: '6', value: 'Carrot', disabled: true },
    { id: '7', value: 'potato', title: 'Potato' },
    { id: '8', value: 'Squash', decorator: <IconFaceSad16 /> },
];

const ITEM_GROUPS_3: SelectItemProps[] = [
    { id: '9', value: 'monkey', title: 'Monkey', decorator: <IconFocalPoint16 /> },
    { id: '10', value: 'fish', title: 'Fish' },
    { id: '11', value: 'dog', title: 'Dog' },
    { id: '12', value: 'horse', title: 'Horse', decorator: <IconFaceSad16 /> },
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
        <Select {...args}>
            <SelectGroupItem groupTitle="Fruits">
                {...ITEM_GROUPS_1.map((item) => <SelectItem {...item} key={item.id} />)}
            </SelectGroupItem>
            <SelectGroupItem groupTitle="Veggies">
                {...ITEM_GROUPS_2.map((item) => <SelectItem {...item} key={item.id} />)}
            </SelectGroupItem>
            <SelectGroupItem groupTitle="Animals">
                {...ITEM_GROUPS_3.map((item) => <SelectItem {...item} key={item.id} />)}
            </SelectGroupItem>
        </Select>
    );
};
